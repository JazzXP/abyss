# abyss — fzf colours
# Source this from ~/.zshrc or ~/.bashrc, AFTER any other FZF_DEFAULT_OPTS lines:
#   source ~/.config/fzf/abyss.fzf.sh
#
# Appends to FZF_DEFAULT_OPTS, so your other fzf options are kept.

export FZF_DEFAULT_OPTS="${FZF_DEFAULT_OPTS:-} \
--color=bg:#00111d,bg+:#00313b,fg:#ffd6a7,fg+:#fff2e0 \
--color=hl:#bdff00,hl+:#bdff00 \
--color=info:#cebef4,prompt:#bdff00,pointer:#f383bb,marker:#01df72,spinner:#47d6cf \
--color=header:#82a6ac,label:#82a6ac,query:#fff2e0 \
--color=border:#0a4a57,separator:#003843,scrollbar:#0a4a57,gutter:#00111d \
--color=preview-bg:#00111d,preview-border:#0a4a57"
