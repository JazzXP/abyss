# abyss — LS_COLORS for lsd (and ls, tree, fd, and anything else that reads it)
#
# Source this from ~/.zshrc or ~/.bashrc:
#   source ~/.config/lsd/abyss.ls_colors.sh
#
# lsd takes file NAME colours from LS_COLORS (colors.yaml only covers the
# columns). Entries are 24-bit colour, so they need a truecolor terminal.
#
# Directories are bold blue, executables bold green, symlinks lavender and
# broken symlinks bold red. Extensions are grouped to match the yazi flavor:
#   images teal | audio/video amber | archives pink | documents orange
#   text/markdown lime | config lavender | logs and build junk muted
# Plain files keep your terminal's foreground colour.

export LS_COLORS='di=1;38;2;0;186;254:ln=38;2;206;190;244:or=1;38;2;240;78;79:mi=38;2;240;78;79:ex=1;38;2;1;223;114:pi=38;2;255;191;0:so=38;2;243;131;187:do=38;2;243;131;187:bd=38;2;251;157;89:cd=38;2;251;157;89:su=1;38;2;240;78;79:sg=1;38;2;240;78;79:tw=1;38;2;0;186;254:ow=1;38;2;0;186;254:st=1;38;2;0;186;254:*.jpg=38;2;71;214;207:*.jpeg=38;2;71;214;207:*.png=38;2;71;214;207:*.gif=38;2;71;214;207:*.webp=38;2;71;214;207:*.svg=38;2;71;214;207:*.bmp=38;2;71;214;207:*.ico=38;2;71;214;207:*.tiff=38;2;71;214;207:*.avif=38;2;71;214;207:*.heic=38;2;71;214;207:*.mp3=38;2;255;191;0:*.flac=38;2;255;191;0:*.wav=38;2;255;191;0:*.ogg=38;2;255;191;0:*.m4a=38;2;255;191;0:*.aac=38;2;255;191;0:*.mp4=38;2;255;191;0:*.mkv=38;2;255;191;0:*.mov=38;2;255;191;0:*.avi=38;2;255;191;0:*.webm=38;2;255;191;0:*.zip=38;2;243;131;187:*.tar=38;2;243;131;187:*.gz=38;2;243;131;187:*.tgz=38;2;243;131;187:*.xz=38;2;243;131;187:*.bz2=38;2;243;131;187:*.zst=38;2;243;131;187:*.7z=38;2;243;131;187:*.rar=38;2;243;131;187:*.pdf=38;2;251;157;89:*.doc=38;2;251;157;89:*.docx=38;2;251;157;89:*.xls=38;2;251;157;89:*.xlsx=38;2;251;157;89:*.ppt=38;2;251;157;89:*.pptx=38;2;251;157;89:*.odt=38;2;251;157;89:*.rtf=38;2;251;157;89:*.epub=38;2;251;157;89:*.md=38;2;189;255;0:*.markdown=38;2;189;255;0:*.rst=38;2;189;255;0:*.txt=38;2;189;255;0:*.json=38;2;206;190;244:*.yaml=38;2;206;190;244:*.yml=38;2;206;190;244:*.toml=38;2;206;190;244:*.ini=38;2;206;190;244:*.conf=38;2;206;190;244:*.cfg=38;2;206;190;244:*.lock=38;2;206;190;244:*.log=38;2;78;122;129:*.tmp=38;2;78;122;129:*.bak=38;2;78;122;129:*.swp=38;2;78;122;129:*.o=38;2;78;122;129:*.pyc=38;2;78;122;129:*.class=38;2;78;122;129'
