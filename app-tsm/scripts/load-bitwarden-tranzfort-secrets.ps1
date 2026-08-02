# Load TranZfort Supabase keys from Bitwarden Secrets Manager into TSM env.
# Canonical vault: TranZfort prod inventory (tranzfort-lab docs/TODO-18-june.md).
# TSM maps Bitwarden keys -> app-tsm env names (never commit values).
#
# Setup (one-time):
#   Bitwarden > Secrets Manager > Machine accounts > dispatch > Create access token
#   $env:BWS_ACCESS_TOKEN = '<token>'   # never commit; never paste in chat
#   Install CLI: iwr https://bws.bitwarden.com/install | iex
#
# Usage (from app-tsm/):
#   . .\scripts\load-bitwarden-tranzfort-secrets.ps1
#   . .\scripts\load-bitwarden-tranzfort-secrets.ps1 -WriteEnvLocal
#   npm run sync:tranzfort
#
# Mapping:
#   SUPABASE_URL                 -> TRANZFORT_SUPABASE_URL
#   SUPABASE_SERVICE_ROLE(_KEY)  -> TRANZFORT_SERVICE_KEY
#   SUPABASE_ANON_KEY            -> TRANZFORT_ANON_KEY

param(
  [switch]$WriteEnvLocal,
  [switch]$Quiet,
  [string]$EnvLocalPath = ""
)

$ErrorActionPreference = 'Stop'

function Write-SecretLog([string]$Message) {
  if (-not $Quiet) { Write-Host $Message }
}

function Set-EnvIfEmpty {
  param([string]$Name, [string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
  if (-not [string]::IsNullOrWhiteSpace([Environment]::GetEnvironmentVariable($Name, 'Process'))) {
    return $false
  }
  Set-Item -Path "env:$Name" -Value $Value
  return $true
}

function Set-EnvForce {
  param([string]$Name, [string]$Value)
  if ([string]::IsNullOrWhiteSpace($Value)) { return $false }
  Set-Item -Path "env:$Name" -Value $Value
  return $true
}

function Get-BwsPath {
  $cmd = Get-Command bws -ErrorAction SilentlyContinue
  if ($cmd) { return $cmd.Source }
  $candidates = @(
    (Join-Path $env:LOCALAPPDATA 'Programs\Bitwarden\bws.exe'),
    (Join-Path $env:LOCALAPPDATA 'Microsoft\WinGet\Links\bws.exe')
  )
  foreach ($p in $candidates) {
    if (Test-Path $p) { return $p }
  }
  return $null
}

function Find-SecretByExactKey {
  param(
    [Parameter(Mandatory = $true)]$SecretList,
    [Parameter(Mandatory = $true)][string]$Name
  )
  $items = @()
  if ($SecretList -is [System.Collections.IEnumerable] -and $SecretList -isnot [string]) {
    foreach ($x in $SecretList) { $items += ,$x }
  } else {
    $items = @($SecretList)
  }
  foreach ($item in $items) {
    if ($null -eq $item) { continue }
    $keyProp = $item | Select-Object -ExpandProperty key -ErrorAction SilentlyContinue
    if ([string]$keyProp -ne $Name) { continue }
    $valueProp = $item | Select-Object -ExpandProperty value -ErrorAction SilentlyContinue
    $value = [string]$valueProp
    if (-not [string]::IsNullOrWhiteSpace($value)) { return $value.Trim() }
  }
  return $null
}

function Upsert-EnvLocalLine {
  param(
    [string]$Path,
    [string]$Key,
    [string]$Value
  )
  $lines = @()
  if (Test-Path $Path) {
    $lines = Get-Content -Path $Path -Encoding utf8
  }
  $found = $false
  $out = foreach ($line in $lines) {
    if ($line -match "^\s*#?\s*$([regex]::Escape($Key))\s*=") {
      $found = $true
      "$Key=$Value"
    } else {
      $line
    }
  }
  if (-not $found) {
    $out = @($out) + @("", "# TranZfort (from Bitwarden - do not commit)", "$Key=$Value")
  }
  Set-Content -Path $Path -Value $out -Encoding utf8
}

$token = $env:BWS_ACCESS_TOKEN
if ([string]::IsNullOrWhiteSpace($token)) {
  throw @'
BWS_ACCESS_TOKEN is not set.

1. Bitwarden > Secrets Manager > Machine accounts > "dispatch" > Create access token
2. In this shell only:  $env:BWS_ACCESS_TOKEN = "<token>"
3. Re-run:  . .\scripts\load-bitwarden-tranzfort-secrets.ps1

Never commit the token or paste secret values into chat / git.
'@
}

$bws = Get-BwsPath
if (-not $bws) {
  throw 'bws CLI not found. Install: iwr https://bws.bitwarden.com/install | iex'
}

$raw = & $bws secret list -o json
if ($LASTEXITCODE -ne 0) {
  throw "bws secret list failed (exit $LASTEXITCODE)"
}
# bws may return JSON as a string[] of lines - join before ConvertFrom-Json.
$jsonText = if ($raw -is [string]) { $raw } else { [string]::Join("`n", @($raw)) }
$parsed = ConvertFrom-Json -InputObject $jsonText
$secrets = New-Object System.Collections.Generic.List[object]
if ($null -eq $parsed) {
  throw 'bws secret list JSON parsed to null.'
} elseif ($parsed -is [System.Array]) {
  foreach ($p in $parsed) { [void]$secrets.Add($p) }
} else {
  # PS sometimes returns a single object; also handle ICollection
  foreach ($p in @($parsed)) { [void]$secrets.Add($p) }
}
if ($secrets.Count -lt 1) {
  throw 'bws secret list returned no secrets. Check machine account project access.'
}
$firstKey = [string]$secrets[0].key
Write-SecretLog "Bitwarden secrets visible: $($secrets.Count); firstKey=$firstKey"
$url = Find-SecretByExactKey -SecretList $secrets -Name 'SUPABASE_URL'
if ([string]::IsNullOrWhiteSpace($url)) { $url = Find-SecretByExactKey -SecretList $secrets -Name 'TRANZFORT_SUPABASE_URL' }
$serviceKey = Find-SecretByExactKey -SecretList $secrets -Name 'SUPABASE_SERVICE_ROLE_KEY'
if ([string]::IsNullOrWhiteSpace($serviceKey)) { $serviceKey = Find-SecretByExactKey -SecretList $secrets -Name 'SUPABASE_SERVICE_ROLE' }
if ([string]::IsNullOrWhiteSpace($serviceKey)) { $serviceKey = Find-SecretByExactKey -SecretList $secrets -Name 'TRANZFORT_SERVICE_KEY' }
$anonKey = Find-SecretByExactKey -SecretList $secrets -Name 'SUPABASE_ANON_KEY'
if ([string]::IsNullOrWhiteSpace($anonKey)) { $anonKey = Find-SecretByExactKey -SecretList $secrets -Name 'TRANZFORT_ANON_KEY' }

if ([string]::IsNullOrWhiteSpace($url)) {
  throw 'Bitwarden vault has no SUPABASE_URL (or TRANZFORT_SUPABASE_URL). Check machine account "dispatch" project access.'
}
$serviceOk = -not [string]::IsNullOrWhiteSpace($serviceKey) -and $serviceKey.Length -ge 100 -and $serviceKey.StartsWith('eyJ')
$anonOk = -not [string]::IsNullOrWhiteSpace($anonKey) -and $anonKey.Length -ge 100 -and $anonKey.StartsWith('eyJ')
if (-not $serviceOk) {
  Write-SecretLog "WARN: SUPABASE_SERVICE_ROLE missing or truncated (len=$($serviceKey.Length)). Bridge live publish needs the full service_role JWT."
}
if (-not $anonOk) {
  Write-SecretLog 'WARN: SUPABASE_ANON_KEY missing/invalid - L1 live password login will not work.'
}

$setUrl = Set-EnvForce -Name 'TRANZFORT_SUPABASE_URL' -Value $url
$setKey = $false
if ($serviceOk) { $setKey = Set-EnvForce -Name 'TRANZFORT_SERVICE_KEY' -Value $serviceKey }
$setAnon = $false
if ($anonOk) { $setAnon = Set-EnvForce -Name 'TRANZFORT_ANON_KEY' -Value $anonKey }

Set-EnvIfEmpty -Name 'SUPABASE_URL' -Value $url | Out-Null
if ($serviceOk) { Set-EnvIfEmpty -Name 'SUPABASE_SERVICE_ROLE_KEY' -Value $serviceKey | Out-Null }
if ($anonOk) { Set-EnvIfEmpty -Name 'SUPABASE_ANON_KEY' -Value $anonKey | Out-Null }

Write-SecretLog "Loaded TRANZFORT_SUPABASE_URL from Bitwarden (set=$setUrl, len=$($url.Length))."
Write-SecretLog "Loaded TRANZFORT_SERVICE_KEY from Bitwarden (set=$setKey)."
Write-SecretLog "Loaded TRANZFORT_ANON_KEY from Bitwarden (set=$setAnon)."

if ($WriteEnvLocal) {
  $root = Split-Path -Parent $PSScriptRoot
  if ([string]::IsNullOrWhiteSpace($EnvLocalPath)) {
    $EnvLocalPath = Join-Path $root '.env.local'
  }
  Upsert-EnvLocalLine -Path $EnvLocalPath -Key 'TRANZFORT_SUPABASE_URL' -Value $url
  if ($serviceOk) {
    Upsert-EnvLocalLine -Path $EnvLocalPath -Key 'TRANZFORT_SERVICE_KEY' -Value $serviceKey
  } else {
    Upsert-EnvLocalLine -Path $EnvLocalPath -Key 'TRANZFORT_SERVICE_KEY' -Value ''
  }
  if ($anonOk) {
    Upsert-EnvLocalLine -Path $EnvLocalPath -Key 'TRANZFORT_ANON_KEY' -Value $anonKey
  }
  Write-SecretLog "Wrote TRANZFORT_* into $EnvLocalPath (gitignored). Restart npm run dev to pick up."
}

Write-SecretLog 'Bitwarden -> TranZfort env ready (values not printed).'
