# abyss — jq output colours
#
# Source this from ~/.zshrc or ~/.bashrc:
#   source ~/.config/zsh/abyss.jq-colors.sh
#
# JQ_COLORS takes colon-separated SGR codes, in this order:
#   null : false : true : numbers : strings : arrays : objects : object keys
#
#   null          #4e7a81  muted
#   false / true  #f383bb  pink
#   numbers       #fb9d59  orange
#   strings       #47d6cf  teal
#   arrays        #82a6ac  dim
#   objects       #82a6ac  dim
#   object keys   #cebef4  lavender (bold)
#
# jq's support for this varies by version, so the right form is picked below:
#   jq >= 1.8     exact 24-bit colours, plus the object-keys field
#   jq 1.7.1      256-colour approximations (1.7.x rejects any colour code
#                 longer than ~12 characters, so 24-bit codes are refused
#                 with "Failed to set $JQ_COLORS" on every run), plus keys
#   jq <= 1.7     256-colour approximations, no object-keys field (added in 1.7.1)

if command -v jq >/dev/null 2>&1; then
  _abyss_jq_v=$(jq --version 2>/dev/null)
  _abyss_jq_v=${_abyss_jq_v#jq-}
  _abyss_jq_v=${_abyss_jq_v%%-*}
  IFS=. read -r _abyss_maj _abyss_min _abyss_pat <<EOF
$_abyss_jq_v
EOF
  _abyss_pat=${_abyss_pat%%[!0-9]*}
  _abyss_maj=${_abyss_maj:-0}
  _abyss_min=${_abyss_min:-0}
  _abyss_pat=${_abyss_pat:-0}

  if [ "$_abyss_maj" -gt 1 ] || { [ "$_abyss_maj" -eq 1 ] && [ "$_abyss_min" -ge 8 ]; }; then
    # 24-bit, 8 fields
    export JQ_COLORS="38;2;78;122;129:38;2;243;131;187:38;2;243;131;187:38;2;251;157;89:38;2;71;214;207:38;2;130;166;172:38;2;130;166;172:1;38;2;206;190;244"
  elif [ "$_abyss_maj" -eq 1 ] && [ "$_abyss_min" -eq 7 ] && [ "$_abyss_pat" -ge 1 ]; then
    # 256-colour, 8 fields
    export JQ_COLORS="38;5;66:38;5;211:38;5;211:38;5;215:38;5;80:38;5;109:38;5;109:1;38;5;183"
  else
    # 256-colour, 7 fields
    export JQ_COLORS="38;5;66:38;5;211:38;5;211:38;5;215:38;5;80:38;5;109:38;5;109"
  fi
  unset _abyss_jq_v _abyss_maj _abyss_min _abyss_pat
fi
