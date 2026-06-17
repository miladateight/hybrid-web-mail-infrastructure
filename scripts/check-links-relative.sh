#!/usr/bin/env bash
set -Eeuo pipefail

root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
failed=0

while IFS= read -r -d '' file; do
  source_dir="$(dirname "$file")"
  while IFS= read -r target; do
    case "$target" in
      ''|http:*|https:*|mailto:*|tel:*|\#*) continue ;;
    esac

    clean="${target%%#*}"
    clean="${clean%%\?*}"
    [[ -z "$clean" ]] && continue

    if [[ "$clean" == /* ]]; then
      resolved="$root/${clean#/}"
    else
      resolved="$source_dir/$clean"
    fi

    if [[ ! -e "$resolved" ]]; then
      printf 'Missing link target: %s -> %s\n' "${file#"$root"/}" "$target"
      failed=1
    fi
  done < <(
    {
      grep -Eo 'href="[^"]+"' "$file" 2>/dev/null | sed -E 's/^href="([^"]+)"$/\1/'
      grep -Eo '\[[^]]+\]\([^)]+\)' "$file" 2>/dev/null | sed -E 's/^.*\]\(([^)]+)\)$/\1/'
    } | sort -u
  )
done < <(find "$root" -path "$root/.git" -prune -o -type f \( -name '*.html' -o -name '*.md' \) -print0)

if [[ "$failed" -ne 0 ]]; then
  exit 1
fi

printf 'Relative link check passed.\n'
