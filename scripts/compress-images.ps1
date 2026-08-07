# Compress marketing site images (quality-safe).
# Usage: powershell -ExecutionPolicy Bypass -File scripts/compress-images.ps1
#
# Rules:
# - JPG/JPEG: resize long edge, re-encode at quality; keep original if result is larger
# - PNG logos: max width cap; keep original if result is larger
# - Backups under .image-backups/ (timestamped) only for files actually changed

$ErrorActionPreference = "Stop"
Add-Type -AssemblyName System.Drawing

$root = Split-Path -Parent $PSScriptRoot
$backupRoot = Join-Path $root (".image-backups\" + (Get-Date -Format "yyyyMMdd-HHmmss"))

function Save-Jpeg($bitmap, $path, [long]$quality) {
  $codec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() | Where-Object { $_.MimeType -eq "image/jpeg" }
  $enc = [System.Drawing.Imaging.Encoder]::Quality
  $params = New-Object System.Drawing.Imaging.EncoderParameters 1
  $params.Param[0] = New-Object System.Drawing.Imaging.EncoderParameter $enc, $quality
  $tmp = "$path.__tmp.jpg"
  $bitmap.Save($tmp, $codec, $params)
  return $tmp
}

function Save-Png($bitmap, $path) {
  $tmp = "$path.__tmp.png"
  $bitmap.Save($tmp, [System.Drawing.Imaging.ImageFormat]::Png)
  return $tmp
}

function Compress-One([string]$relPath, [int]$maxEdge, [long]$jpegQuality = 82, [int]$minBytesToTouch = 80000) {
  $full = Join-Path $root $relPath
  if (-not (Test-Path $full)) { Write-Warning "Missing $relPath"; return }

  $ext = [IO.Path]::GetExtension($full).ToLowerInvariant()
  $before = (Get-Item $full).Length
  $img = [System.Drawing.Image]::FromFile($full)
  $w = $img.Width
  $h = $img.Height
  $long = [Math]::Max($w, $h)

  $needsResize = $long -gt $maxEdge
  $needsReencode = $before -gt $minBytesToTouch -or $needsResize

  if (-not $needsReencode) {
    $img.Dispose()
    Write-Host ("SKIP  {0,7:N0} KB  {1}x{2}  {3}" -f ($before/1KB), $w, $h, $relPath)
    return
  }

  $nw = $w
  $nh = $h
  if ($needsResize) {
    $scale = $maxEdge / [double]$long
    $nw = [Math]::Max(1, [int][Math]::Round($w * $scale))
    $nh = [Math]::Max(1, [int][Math]::Round($h * $scale))
  }

  $bmp = New-Object System.Drawing.Bitmap $nw, $nh
  $g = [System.Drawing.Graphics]::FromImage($bmp)
  $g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
  $g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
  $g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
  $g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
  $g.DrawImage($img, 0, 0, $nw, $nh)
  $g.Dispose()
  $img.Dispose()

  if ($ext -eq ".png") {
    $tmp = Save-Png $bmp $full
  } else {
    $tmp = Save-Jpeg $bmp $full $jpegQuality
  }
  $bmp.Dispose()

  $after = (Get-Item $tmp).Length
  if ($after -ge $before -and -not $needsResize) {
    Remove-Item $tmp -Force
    Write-Host ("KEEP  {0,7:N0} KB (re-encode larger)  {1}x{2}  {3}" -f ($before/1KB), $w, $h, $relPath)
    return
  }
  if ($after -ge $before -and $needsResize) {
    # Resized but larger file is still usually better for decode; keep if dimensions shrunk a lot
    $areaRatio = ($nw * $nh) / [double]($w * $h)
    if ($areaRatio -gt 0.85) {
      Remove-Item $tmp -Force
      Write-Host ("KEEP  {0,7:N0} KB (no win)  {1}x{2}  {3}" -f ($before/1KB), $w, $h, $relPath)
      return
    }
  }

  $bakDir = Join-Path $backupRoot (Split-Path $relPath -Parent)
  New-Item -ItemType Directory -Force -Path $bakDir | Out-Null
  Copy-Item $full (Join-Path $backupRoot $relPath) -Force
  Move-Item -Force $tmp $full

  $saved = $before - $after
  Write-Host ("OK    {0,7:N0} -> {1,7:N0} KB ({2,6:N0} KB saved)  {3}x{4}  {5}" -f ($before/1KB), ($after/1KB), ($saved/1KB), $nw, $nh, $relPath)
}

Write-Host "Compressing marketing images..."
Write-Host "Backups (changed files only): $backupRoot"
Write-Host ""

# Heroes in src/assets - max 1920 long edge
Get-ChildItem (Join-Path $root "src\assets\*") -Include *.jpg,*.jpeg -File -ErrorAction SilentlyContinue | ForEach-Object {
  $rel = $_.FullName.Substring($root.Length + 1)
  Compress-One $rel 1920 80 100000
}

# Public content images - max 1600
Get-ChildItem (Join-Path $root "public\images") -Recurse -Include *.jpg,*.jpeg -File -ErrorAction SilentlyContinue | ForEach-Object {
  $rel = $_.FullName.Substring($root.Length + 1)
  Compress-One $rel 1600 82 90000
}

# Logos - keep crisp but shrink monster PNGs
Compress-One "src\assets\logo-header.png" 800 82 50000
Compress-One "src\assets\logo-footer.png" 800 82 40000

# OG image
if (Test-Path (Join-Path $root "public\og-image.png")) {
  Compress-One "public\og-image.png" 1200 82 50000
}

Write-Host ""
Write-Host "Done."
