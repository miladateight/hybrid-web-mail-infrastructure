#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

blocked_terms=(
  "$(printf '%s%s' 'neek' 'co')"
  "$(printf '%s%s' 'nee' 'kan')"
  "$(printf '%s%s' 'nik' 'an')"
  "$(printf '%s%s' 'neek' '-intl')"
  "$(printf '%s%s%s%s' 'neek' 'co' '.' 'com')"
  "$(printf '%s%s%s%s' 'neek' 'co' '.' 'ir')"
  "$(printf '%s%s%s%s' 'neek' '-intl' '.' 'com')"
  "$(printf '%s%s' 'نی' 'کان')"
  "$(printf '%s %s' 'نیک' 'کو')"
  "$(printf '%s‌%s' 'نیک' 'کو')"
  "$(printf '%s%s %s %s' 'نی' 'کان' 'انرژی' 'کیان')"
)

declare -A patterns=(
  ["IPv4"]='(^|[^0-9])([0-9]{1,3}\.){3}[0-9]{1,3}([^0-9]|$)'
  ["IPv6"]='\b([0-9a-fA-F]{1,4}:){2,}[0-9a-fA-F]{1,4}\b'
  ["Email"]='[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}'
  ["Private key header"]='-----BEGIN [A-Z ]*PRIVATE KEY-----'
  ["Password assignment"]='(password|passwd|pwd)[[:space:]]*[:=]'
  ["Token assignment"]='(^|[^-])(token|api[_-]?key|secret)[[:space:]]*[:=]'
  ["WireGuard key"]='(PrivateKey|PublicKey|PresharedKey)[[:space:]]*='
  ["SSH key"]='ssh-(rsa|ed25519)'
  ["Hostname"]='\b[A-Za-z0-9-]+\.(local|lan|corp)\b'
)

safe_file() {
  local file="$1"
  [[ "$file" == */.git/* ]] && return 0
  [[ "$file" == */scripts/privacy-scan.sh ]] && return 0
  [[ "$file" == */scripts/privacy-scan.ps1 ]] && return 0
  return 1
}

report() {
  printf '%s | %s\n' "$1" "$2"
  failed=1
}

while IFS= read -r -d '' file; do
  if safe_file "$file"; then
    continue
  fi
  name="$(basename "$file")"
  if [[ "$name" =~ ^\.env|\.backup$|\.bak$|\.sql$|\.sqlite$|\.db$|\.rsc$|\.pem$|\.key$|\.pfx$|\.p12$|\.log$|^id_rsa$|^id_ed25519$ ]]; then
    report "$file" "Sensitive filename"
  fi
  lower="$(tr '[:upper:]' '[:lower:]' < "$file" 2>/dev/null || true)"
  for term in "${blocked_terms[@]}"; do
    if grep -Fqi "$term" "$file"; then
      report "$file" "Prohibited company identifier"
    fi
  done
  for category in "${!patterns[@]}"; do
    if grep -Eqi "${patterns[$category]}" "$file"; then
      report "$file" "$category"
    fi
  done
done < <(find "$root" -type f -print0)

if [[ "$failed" -ne 0 ]]; then
  printf 'Privacy scan failed. Values are intentionally not printed.\n'
  exit 1
fi

printf 'Privacy scan passed.\n'
