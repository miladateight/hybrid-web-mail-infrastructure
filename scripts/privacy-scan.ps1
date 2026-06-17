Set-StrictMode -Version Latest
$ErrorActionPreference = "Stop"

$Root = Resolve-Path (Join-Path $PSScriptRoot "..")
$Failed = $false

$BlockedTerms = @(
  ("neek" + "co"),
  ("nee" + "kan"),
  ("nik" + "an"),
  ("neek" + "-intl"),
  ("neek" + "co" + "." + "com"),
  ("neek" + "co" + "." + "ir"),
  ("neek" + "-intl" + "." + "com"),
  ("نی" + "کان"),
  ("نیک" + " " + "کو"),
  ("نیک" + [char]0x200c + "کو"),
  ("نی" + "کان" + " " + "انرژی" + " " + "کیان")
)

$Patterns = [ordered]@{
  "IPv4" = '(^|[^0-9])([0-9]{1,3}\.){3}[0-9]{1,3}([^0-9]|$)'
  "IPv6" = '\b([0-9a-fA-F]{1,4}:){2,}[0-9a-fA-F]{1,4}\b'
  "Email" = '[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
  "Private key header" = '-----BEGIN [A-Z ]*PRIVATE KEY-----'
  "Password assignment" = '(password|passwd|pwd)\s*[:=]'
  "Token assignment" = '(^|[^-])(token|api[_-]?key|secret)\s*[:=]'
  "WireGuard key" = '(PrivateKey|PublicKey|PresharedKey)\s*='
  "SSH key" = 'ssh-(rsa|ed25519)'
  "Hostname" = '\b[A-Za-z0-9-]+\.(local|lan|corp)\b'
}

function Report-Match {
  param([string]$Path, [string]$Category)
  Write-Output "$Path | $Category"
  $script:Failed = $true
}

function Test-SafeScannerFile {
  param([string]$Path)
  return ($Path -like "*\.git\*" -or $Path -like "*\scripts\privacy-scan.sh" -or $Path -like "*\scripts\privacy-scan.ps1")
}

Get-ChildItem -Path $Root -File -Recurse -Force | ForEach-Object {
  $Path = $_.FullName
  if (Test-SafeScannerFile -Path $Path) { return }

  if ($_.Name -match '^(?:\.env|id_rsa|id_ed25519)$|(\.backup|\.bak|\.sql|\.sqlite|\.db|\.rsc|\.pem|\.key|\.pfx|\.p12|\.log)$') {
    Report-Match -Path $Path -Category "Sensitive filename"
  }

  $Text = Get-Content -LiteralPath $Path -Raw -ErrorAction SilentlyContinue
  if ($null -eq $Text) { return }

  foreach ($Term in $BlockedTerms) {
    if ($Text.IndexOf($Term, [StringComparison]::OrdinalIgnoreCase) -ge 0) {
      Report-Match -Path $Path -Category "Prohibited company identifier"
    }
  }

  foreach ($Category in $Patterns.Keys) {
    if ($Text -match $Patterns[$Category]) {
      Report-Match -Path $Path -Category $Category
    }
  }
}

if ($Failed) {
  Write-Output "Privacy scan failed. Values are intentionally not printed."
  exit 1
}

Write-Output "Privacy scan passed."
