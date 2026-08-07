# Download free Unsplash hero images for ZAFTYS blog posts.
# Note: topic-fit industrial heroes (cement tipper, steel coils, planning, TMS desk)
# were generated separately into public/images/blog/. This script refreshes the
# Unsplash empty-return (and optional free stock) set when needed.
# License for Unsplash downloads: https://unsplash.com/license
# Usage: powershell -ExecutionPolicy Bypass -File scripts/download-blog-images.ps1

$ErrorActionPreference = "Stop"
$outDir = Join-Path $PSScriptRoot "..\public\images\blog"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$images = @(
  @{
    Slug = "reduce-empty-return-trips"
    File = "reduce-empty-return-trips.jpg"
    Url = "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1600&q=80"
    Credit = "CHUTTERSNAP"
    Page = "https://unsplash.com/photos/photo-1601584115197-04ecc0da31d7"
    Alt = "White freight truck on the road during daytime - industrial FTL corridor"
  },
  @{
    Slug = "planning-industrial-shipments"
    File = "planning-industrial-shipments.jpg"
    Url = "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1600&q=80"
    Credit = "Jacques Dillies"
    Page = "https://unsplash.com/photos/photo-1586528116311-ad8dd3c8310d"
    Alt = "Warehouse racks with packed goods - industrial shipment planning"
  },
  @{
    Slug = "cement-plant-loading-windows"
    File = "cement-plant-loading-windows.jpg"
    Url = "https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1600&q=80"
    Credit = "Daniel McCullough"
    Page = "https://unsplash.com/photos/photo-1504307651254-35680f356dfd"
    Alt = "Construction site with concrete and industrial equipment - cement logistics"
  },
  @{
    Slug = "steel-coil-transport-basics"
    File = "steel-coil-transport-basics.jpg"
    Url = "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80"
    Credit = "Ant Rozetsky"
    Page = "https://unsplash.com/photos/photo-1513828583688-c52646db42da"
    Alt = "Industrial steel materials and heavy equipment - steel transport context"
  },
  @{
    Slug = "tms-for-heavy-haul"
    File = "tms-for-heavy-haul.jpg"
    Url = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80"
    Credit = "Luke Chesser"
    Page = "https://unsplash.com/photos/photo-1551288049-bebda4e38f71"
    Alt = "Laptop showing analytics dashboard - transport management visibility"
  }
)

foreach ($img in $images) {
  $dest = Join-Path $outDir $img.File
  Write-Host "Downloading $($img.File) ..."
  Invoke-WebRequest -Uri $img.Url -OutFile $dest -UserAgent "Mozilla/5.0 ZAFTYSBlogImageScript/1.0"
  $size = (Get-Item $dest).Length
  if ($size -lt 10000) { throw "File too small ($size bytes) for $($img.File)" }
  Write-Host "  OK ($([math]::Round($size/1KB)) KB)"
}

$lines = @(
  "# Blog hero image attribution",
  "",
  "All images from [Unsplash](https://unsplash.com) under the [Unsplash License](https://unsplash.com/license).",
  "Free to use commercially. Attribution appreciated but not required.",
  "",
  "| Blog slug | File | Photographer | Source |",
  "|-----------|------|--------------|--------|"
)
foreach ($img in $images) {
  $lines += "| $($img.Slug) | ``/images/blog/$($img.File)`` | $($img.Credit) | $($img.Page) |"
}
$lines += ""
$lines += "Re-download: ``powershell -ExecutionPolicy Bypass -File scripts/download-blog-images.ps1``"
$attrPath = Join-Path $outDir "ATTRIBUTION.md"
$lines | Set-Content -Path $attrPath -Encoding UTF8
Write-Host "Wrote $attrPath"
Write-Host "Done."
