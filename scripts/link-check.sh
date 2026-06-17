#!/usr/bin/env bash
set -euo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

check_link() {
  local source="$1"
  local target="$2"
  case "$target" in
    http:*|https:*|mailto:*|"#"*) return 0 ;;
  esac
  local clean="${target%%#*}"
  [[ -z "$clean" ]] && return 0
  if [[ ! -e "$root/$clean" ]]; then
    printf 'Missing link target: %s -> %s\n' "$source" "$target"
    failed=1
  fi
}

while IFS= read -r file; do
  while IFS= read -r href; do
    check_link "$file" "$href"
  done < <(grep -Eo 'href="[^"]+"' "$file" | sed -E 's/^href="([^"]+)"/\1/')
done < <(find "$root" -type f \( -name '*.html' -o -name '*.md' \))

exit "$failed"
