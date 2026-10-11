#!/bin/bash
# Claude Code status line
# path -> git branch/status -> Claude model info
#
# Nerd Font glyphs: built with `printf -v` using \uXXXX escapes (exactly 4
# hex digits, no braces). Bash's printf builtin does NOT support the
# \u{XXXX} brace form -- that prints as literal backslash/u/brace text, not
# a glyph. Codepoints below are all in the Private Use Area
# (U+E000-U+F8FF), so the plain 4-hex-digit \uXXXX form is correct.

input=$(cat)

dir=$(echo "$input" | jq -r '.workspace.current_dir')
model=$(echo "$input" | jq -r '.model.display_name')
effort=$(echo "$input" | jq -r '.effort.level // "N/A"')
style=$(echo "$input" | jq -r '.output_style.name // "default"')
context_tokens=$(echo "$input" | jq -r '.context_window.total_input_tokens // empty')
context_pct=$(echo "$input" | jq -r '.context_window.used_percentage // 0')
cost=$(echo "$input" | jq -r '.cost.total_cost_usd // "0.00"')

short_dir=$(basename "$dir")

placeholder_marker_for_icon_block2
# unused-corrupted-1
printf -v icon_folder '' # nf-fa-folder_open
printf -v icon_branch '' # nf-oct-git_branch
icon_model=""            # nf-fa-microchip
icon_tokens=""           # nf-fa-hashtag
sep=""                   # nf-pl-right_hard_divider (powerline arrow)

# Git branch + dirty indicator (skip optional locks, stay fast)
git_info=""
if git -C "$dir" --no-optional-locks rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  branch=$(git -C "$dir" --no-optional-locks symbolic-ref --short HEAD 2>/dev/null || git -C "$dir" --no-optional-locks rev-parse --short HEAD 2>/dev/null)
  if [ -n "$branch" ]; then
    if ! git -C "$dir" --no-optional-locks diff --quiet 2>/dev/null || ! git -C "$dir" --no-optional-locks diff --cached --quiet 2>/dev/null; then
      dirty="*"
    else
      dirty=""
    fi
    printf -v git_info " \033[1;37m${sep}\033[0m \033[1;35m${icon_branch} %s%s\033[0m" "$branch" "$dirty"
  fi
fi

# Nord-inspired colors, brightened for legibility against dark/light terminal backgrounds
printf "\033[1;34m${icon_model} %s [%s]\033[0m" "$model" "$effort"
if [ "$style" != "default" ]; then
  printf " \033[0;37m(%s)\033[0m" "$style"
fi
if [ -n "$context_tokens" ]; then
  formatted_tokens=$(printf "%'d" "$context_tokens" 2>/dev/null || echo "$context_tokens")
  printf " \033[1;37m${sep}\033[0m \033[1;36m${icon_tokens} %s tok (%d%%)\033[0m" "$formatted_tokens" "$context_pct"
fi
printf " \033[1;37m${sep}\033[0m \033[1;32m$%2.2f\033[0m" "$cost"
printf " \033[1;37m${sep}\033[0m \033[1;33m${icon_folder} %s\033[0m" "$short_dir"
if [ -n "$git_info" ]; then
  printf "%s" "$git_info"
fi
printf "\n"
