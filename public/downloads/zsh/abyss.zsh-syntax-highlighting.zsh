# abyss — zsh-syntax-highlighting styles
#
# Source this from ~/.zshrc BEFORE the plugin is sourced (zsh-syntax-highlighting
# reads ZSH_HIGHLIGHT_STYLES when it loads, and it must stay the last plugin):
#
#   source ~/.config/zsh/abyss.zsh-syntax-highlighting.zsh
#   source /path/to/zsh-syntax-highlighting.zsh
#
# Uses fg=#rrggbb, which needs a truecolor terminal (Ghostty is) and zsh >= 5.7.
# These are for zsh-syntax-highlighting; fast-syntax-highlighting uses a
# different mechanism (`fast-theme`) and is not affected.

typeset -A ZSH_HIGHLIGHT_STYLES

# Commands
ZSH_HIGHLIGHT_STYLES[default]='fg=#ffd6a7'
ZSH_HIGHLIGHT_STYLES[arg0]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[command]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[builtin]='fg=#bdff00,italic'
ZSH_HIGHLIGHT_STYLES[function]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[alias]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[suffix-alias]='fg=#bdff00,underline'
ZSH_HIGHLIGHT_STYLES[global-alias]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[precommand]='fg=#cebef4,italic'
ZSH_HIGHLIGHT_STYLES[commandseparator]='fg=#82a6ac'
ZSH_HIGHLIGHT_STYLES[hashed-command]='fg=#bdff00'
ZSH_HIGHLIGHT_STYLES[reserved-word]='fg=#cebef4,italic'
ZSH_HIGHLIGHT_STYLES[unknown-token]='fg=#f04e4f'

# Paths and expansion
ZSH_HIGHLIGHT_STYLES[path]='fg=#ffd6a7,underline'
ZSH_HIGHLIGHT_STYLES[path_pathseparator]='fg=#82a6ac,underline'
ZSH_HIGHLIGHT_STYLES[path_prefix]='fg=#82a6ac,underline'
ZSH_HIGHLIGHT_STYLES[path_prefix_pathseparator]='fg=#82a6ac,underline'
ZSH_HIGHLIGHT_STYLES[globbing]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[history-expansion]='fg=#f383bb'

# Options and arguments
ZSH_HIGHLIGHT_STYLES[single-hyphen-option]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[double-hyphen-option]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[assign]='fg=#ffd6a7'

# Strings and variables
ZSH_HIGHLIGHT_STYLES[single-quoted-argument]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[double-quoted-argument]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[dollar-quoted-argument]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[back-quoted-argument]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[back-quoted-argument-delimiter]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[single-quoted-argument-unclosed]='fg=#f04e4f'
ZSH_HIGHLIGHT_STYLES[double-quoted-argument-unclosed]='fg=#f04e4f'
ZSH_HIGHLIGHT_STYLES[dollar-double-quoted-argument]='fg=#fb9d59'
ZSH_HIGHLIGHT_STYLES[back-double-quoted-argument]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[back-dollar-quoted-argument]='fg=#f383bb'

# Redirection, comments, brackets
ZSH_HIGHLIGHT_STYLES[redirection]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[comment]='fg=#4e7a81,italic'
ZSH_HIGHLIGHT_STYLES[named-fd]='fg=#fb9d59'
ZSH_HIGHLIGHT_STYLES[numeric-fd]='fg=#fb9d59'
ZSH_HIGHLIGHT_STYLES[rc-quote]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[bracket-error]='fg=#f04e4f,bold'
ZSH_HIGHLIGHT_STYLES[bracket-level-1]='fg=#00bafe'
ZSH_HIGHLIGHT_STYLES[bracket-level-2]='fg=#cebef4'
ZSH_HIGHLIGHT_STYLES[bracket-level-3]='fg=#47d6cf'
ZSH_HIGHLIGHT_STYLES[bracket-level-4]='fg=#fb9d59'
ZSH_HIGHLIGHT_STYLES[bracket-level-5]='fg=#f383bb'
ZSH_HIGHLIGHT_STYLES[cursor-matchingbracket]='standout'

# Autosuggestions (zsh-autosuggestions) — dim, readable on the background
ZSH_AUTOSUGGEST_HIGHLIGHT_STYLE='fg=#4e7a81'
