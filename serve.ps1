$root = Join-Path $PSScriptRoot "site"
# ポートは環境変数 PORT があればそちらを使う（未指定なら5500）
if ($env:PORT) { $port = [int]$env:PORT } else { $port = 5500 }
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")
$listener.Start()
Write-Host "Serving $root on http://localhost:$port/"

$mime = @{
  ".html"="text/html; charset=utf-8"; ".css"="text/css"; ".js"="application/javascript";
  ".png"="image/png"; ".jpg"="image/jpeg"; ".svg"="image/svg+xml"; ".ico"="image/x-icon";
  ".webp"="image/webp"; ".avif"="image/avif"; ".gif"="image/gif";
  ".woff2"="font/woff2"; ".woff"="font/woff";
  ".txt"="text/plain; charset=utf-8"; ".xml"="application/xml"; ".json"="application/json";
  ".map"="application/json"; ".webmanifest"="application/manifest+json"
}

while ($listener.IsListening) {
  $context = $listener.GetContext()
  $req = $context.Request
  $res = $context.Response
  $path = $req.Url.LocalPath
  if ($path -eq "/") { $path = "/index.html" }
  $filePath = Join-Path $root ($path.TrimStart("/") -replace "/", [IO.Path]::DirectorySeparatorChar)
  # /lp/manga/ のようなディレクトリ指定は index.html を返す（LPは trailingSlash 形式で書き出されるため）
  if (Test-Path $filePath -PathType Container) { $filePath = Join-Path $filePath "index.html" }
  if (-not (Test-Path $filePath) -and (Test-Path "$filePath.html")) { $filePath = "$filePath.html" }
  if (Test-Path $filePath -PathType Leaf) {
    $ext = [IO.Path]::GetExtension($filePath)
    $ct = $mime[$ext]
    if (-not $ct) { $ct = "application/octet-stream" }
    $bytes = [IO.File]::ReadAllBytes($filePath)
    $res.ContentType = $ct
    $res.ContentLength64 = $bytes.Length
    $res.OutputStream.Write($bytes, 0, $bytes.Length)
  } else {
    $res.StatusCode = 404
    $msg = [Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
    $res.OutputStream.Write($msg, 0, $msg.Length)
  }
  $res.OutputStream.Close()
}
