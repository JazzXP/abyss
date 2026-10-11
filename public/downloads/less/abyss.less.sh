# abyss — colours for less (and man pages, which page through less)
#
# Source this from ~/.zshrc or ~/.bashrc:
#   source ~/.config/less/abyss.less.sh
#
# less has no theme files; it takes colours from LESS_TERMCAP_* variables.
# These use 24-bit colour escapes, so they need a truecolor terminal (Ghostty is).

# Bold (man page headings and options): lime
export LESS_TERMCAP_md=$'\e[1;38;2;189;255;0m'
# Blink (rarely used): pink
export LESS_TERMCAP_mb=$'\e[1;38;2;243;131;187m'
# Underline (man page arguments and file names): teal
export LESS_TERMCAP_us=$'\e[4;38;2;71;214;207m'
# Standout (the status line and search matches): amber on neutral teal
export LESS_TERMCAP_so=$'\e[1;38;2;255;191;0;48;2;0;56;67m'
# Reset after each of the above
export LESS_TERMCAP_me=$'\e[0m'
export LESS_TERMCAP_ue=$'\e[0m'
export LESS_TERMCAP_se=$'\e[0m'

# Makes newer groff emit bold/underline as overstrike sequences, which less
# renders using the LESS_TERMCAP_* colours above. Without it, man output
# carries its own SGR codes and these colours are ignored.
export GROFF_NO_SGR=1

# -R passes colour escapes through (needed for coloured git/diff output)
export LESS="${LESS:--R}"
