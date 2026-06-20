Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

node (Join-Path $PSScriptRoot "link-check.js")
if ($LASTEXITCODE -ne 0) {
  exit $LASTEXITCODE
}
