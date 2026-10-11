/* abyss — site data
 *
 * To add a tool (tmux, say):
 *   1. Put its files in downloads/<id>/
 *   2. Copy any entry in "tools" below and edit it. "category" must be one of "categories".
 *      Each file is { label, path, view, download }. Set "view": false for binaries and zips.
 *      "install" is a list of lines shown in the install box; use "" for a blank line.
 *   3. Run scripts/build-zip.sh to refresh downloads/abyss-all.zip
 * Set "status": "soon" on an entry to list it as coming soon, with no files.
 *
 * This is a plain script (not fetched JSON) so the page also works from file://.
 */
window.ABYSS = {
  site: {
    name: "abyss",
    repo: "https://github.com/JazzXP/dotfiles",
    zip: "downloads/abyss-all.zip",
  },
  categories: ["Terminal", "Shell", "Editor", "CLI tools", "Apps", "Web"],
  palette: {
    groups: [
      {
        name: "Surfaces",
        colors: [
          {
            name: "base-300",
            hex: "#000611",
            oklch: "oklch(10% 0.08 209)",
            role: "Darkest. Sidebars and inactive tabs.",
          },
          {
            name: "base-200",
            hex: "#00111d",
            oklch: "oklch(15% 0.08 209)",
            role: "Main background.",
          },
          {
            name: "base-100",
            hex: "#001e29",
            oklch: "oklch(20% 0.08 209)",
            role: "Raised surfaces, popups, status bars.",
          },
          {
            name: "neutral",
            hex: "#003843",
            oklch: "oklch(30% 0.08 209)",
            role: "Borders and cursor rows.",
          },
          {
            name: "selection",
            hex: "#00313b",
            oklch: null,
            role: "Selected text and hover.",
          },
          {
            name: "cursorline",
            hex: "#001823",
            oklch: null,
            role: "Current line highlight.",
          },
        ],
      },
      {
        name: "Text",
        colors: [
          {
            name: "base-content",
            hex: "#ffd6a7",
            oklch: "oklch(90% 0.076 70.697)",
            role: "Default foreground.",
          },
          {
            name: "bright",
            hex: "#fff2e0",
            oklch: null,
            role: "Bold text and headings.",
          },
          {
            name: "dim",
            hex: "#82a6ac",
            oklch: null,
            role: "Operators, metadata, hints.",
          },
          {
            name: "comment",
            hex: "#4e7a81",
            oklch: null,
            role: "Comments and line numbers.",
          },
        ],
      },
      {
        name: "Accents",
        colors: [
          {
            name: "primary",
            hex: "#bdff00",
            oklch: "oklch(92% 0.2653 125)",
            role: "Lime. Cursor, functions, active items.",
          },
          {
            name: "secondary",
            hex: "#cebef4",
            oklch: "oklch(83.27% 0.0764 298.3)",
            role: "Lavender. Keywords and tags.",
          },
          {
            name: "accent",
            hex: "#505050",
            oklch: "oklch(43% 0 0)",
            role: "Quiet grey.",
          },
        ],
      },
      {
        name: "Signals",
        colors: [
          {
            name: "info",
            hex: "#00bafe",
            oklch: "oklch(74% 0.16 232.661)",
            role: "Types, links, directories.",
          },
          {
            name: "success",
            hex: "#01df72",
            oklch: "oklch(79% 0.209 151.711)",
            role: "Additions, execute bit, OK.",
          },
          {
            name: "warning",
            hex: "#ffbf00",
            oklch: "oklch(84.8% 0.1962 84.62)",
            role: "Changes, warnings.",
          },
          {
            name: "error",
            hex: "#f04e4f",
            oklch: "oklch(65% 0.1985 24.22)",
            role: "Deletions, errors.",
          },
        ],
      },
      {
        name: "Extras",
        colors: [
          {
            name: "teal",
            hex: "#47d6cf",
            oklch: null,
            role: "Strings and archives.",
          },
          {
            name: "orange",
            hex: "#fb9d59",
            oklch: null,
            role: "Numbers and constants.",
          },
          {
            name: "pink",
            hex: "#f383bb",
            oklch: null,
            role: "Escapes, imports, decorators.",
          },
        ],
      },
    ],
    ansi: [
      "#00262e",
      "#f04e4f",
      "#01df72",
      "#ffbf00",
      "#00bafe",
      "#cebef4",
      "#47d6cf",
      "#ffd6a7",
      "#234f56",
      "#ff6a68",
      "#4df58c",
      "#ffd21e",
      "#5acfff",
      "#e0d1ff",
      "#7feae3",
      "#fff2e0",
    ],
  },
  tools: [
    {
      id: "ghostty",
      name: "Ghostty",
      category: "Terminal",
      description:
        "Sets the 16 ANSI colours, cursor, selection and background. Every app that uses ANSI colours inherits it.",
      files: [
        {
          label: "abyss",
          path: "downloads/ghostty/abyss",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/ghostty/themes",
        "cp abyss ~/.config/ghostty/themes/abyss",
        "",
        "# then in ~/.config/ghostty/config",
        "theme = abyss",
      ],
    },
    {
      id: "herdr",
      name: "herdr",
      category: "Terminal",
      description:
        "A [theme.custom] block that overrides every herdr colour token on top of the default base theme.",
      files: [
        {
          label: "abyss.toml",
          path: "downloads/herdr/abyss.toml",
          view: true,
          download: true,
        },
      ],
      install: [
        "# merge abyss.toml into ~/.config/herdr/config.toml,",
        "# replacing any existing [theme] and [theme.custom] tables, then:",
        "herdr server reload-config",
      ],
    },
    {
      id: "oh-my-posh",
      name: "oh-my-posh",
      category: "Shell",
      description:
        "Prompt with a lime path block, a git block that changes colour with state, language pills and a status-aware chevron.",
      files: [
        {
          label: "abyss.omp.json",
          path: "downloads/oh-my-posh/abyss.omp.json",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/oh-my-posh",
        "cp abyss.omp.json ~/.config/oh-my-posh/",
        "",
        "# zsh (use bash or fish in place of zsh as needed)",
        'eval "$(oh-my-posh init zsh --config ~/.config/oh-my-posh/abyss.omp.json)"',
      ],
      note: "Needs a Nerd Font for the icons.",
    },
    {
      id: "zsh-syntax-highlighting",
      name: "zsh-syntax-highlighting",
      category: "Shell",
      description:
        "Colours the command line as you type: commands in lime, options in teal, strings in teal, errors in red. Also dims zsh-autosuggestions.",
      files: [
        {
          label: "abyss.zsh-syntax-highlighting.zsh",
          path: "downloads/zsh/abyss.zsh-syntax-highlighting.zsh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/zsh",
        "cp abyss.zsh-syntax-highlighting.zsh ~/.config/zsh/",
        "",
        "# in ~/.zshrc, BEFORE the plugin is sourced",
        "source ~/.config/zsh/abyss.zsh-syntax-highlighting.zsh",
      ],
      note: "Does not apply to fast-syntax-highlighting, which uses fast-theme.",
    },
    {
      id: "fzf",
      name: "fzf",
      category: "Shell",
      description:
        "Appends Abyss colours to FZF_DEFAULT_OPTS, so any options you already set are kept.",
      files: [
        {
          label: "abyss.fzf.sh",
          path: "downloads/fzf/abyss.fzf.sh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/fzf",
        "cp abyss.fzf.sh ~/.config/fzf/",
        "",
        "# in ~/.zshrc or ~/.bashrc, after fzf is set up",
        "source ~/.config/fzf/abyss.fzf.sh",
      ],
      note: "The background is solid. Use bg:-1 instead if you run a translucent terminal.",
    },
    {
      id: "less",
      name: "less",
      category: "Shell",
      description:
        "Colours man pages and the less status line through LESS_TERMCAP variables.",
      files: [
        {
          label: "abyss.less.sh",
          path: "downloads/less/abyss.less.sh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/less",
        "cp abyss.less.sh ~/.config/less/",
        "",
        "# in ~/.zshrc or ~/.bashrc",
        "source ~/.config/less/abyss.less.sh",
      ],
      note: "Uses 24-bit colour, so it needs a truecolor terminal.",
    },
    {
      id: "neovim",
      name: "Neovim",
      category: "Editor",
      description:
        "A full colorscheme in one Lua file: Treesitter, LSP semantic tokens, diagnostics, Telescope, completion, gitsigns, file trees and more.",
      files: [
        {
          label: "abyss.lua",
          path: "downloads/neovim/abyss.lua",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/nvim/colors",
        "cp abyss.lua ~/.config/nvim/colors/abyss.lua",
        "",
        "# then, inside Neovim",
        "# :colorscheme abyss",
        "",
        "# LazyVim",
        '# { "LazyVim/LazyVim", opts = { colorscheme = "abyss" } }',
      ],
    },
    {
      id: "bat",
      name: "bat",
      category: "CLI tools",
      description:
        "A TextMate theme for bat, with the same token colours as the Neovim theme. delta and yazi can reuse it for syntax highlighting.",
      files: [
        {
          label: "abyss.tmTheme",
          path: "downloads/bat/abyss.tmTheme",
          view: true,
          download: true,
        },
      ],
      install: [
        'mkdir -p "$(bat --config-dir)/themes"',
        'cp abyss.tmTheme "$(bat --config-dir)/themes/"',
        "bat cache --build",
        "",
        "# try it, or make it the default",
        "bat --theme=abyss somefile",
        "export BAT_THEME=abyss",
      ],
    },
    {
      id: "delta",
      name: "delta",
      category: "CLI tools",
      description:
        "Diff colours for git: dim tints for changed lines, brighter tints for changed words, plus headers, line numbers and blame.",
      files: [
        {
          label: "abyss.gitconfig",
          path: "downloads/delta/abyss.gitconfig",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/git",
        "cp abyss.gitconfig ~/.config/git/",
        "",
        "# add to ~/.gitconfig",
        "[include]",
        "    path = ~/.config/git/abyss.gitconfig",
      ],
      note: "Uses the bat theme for syntax colours. Install that first and run bat cache --build.",
    },
    {
      id: "lazygit",
      name: "lazygit",
      category: "CLI tools",
      description:
        "A gui.theme block: lime active borders, muted inactive ones and a teal-tinted selected line.",
      files: [
        {
          label: "abyss.yml",
          path: "downloads/lazygit/abyss.yml",
          view: true,
          download: true,
        },
      ],
      install: [
        "# merge the gui.theme block into your lazygit config.yml",
        "#   Linux and XDG:  ~/.config/lazygit/config.yml",
        "#   macOS default:  ~/Library/Application Support/lazygit/config.yml",
        "",
        "# or keep it in its own file and load both",
        'LG_CONFIG_FILE="$HOME/.config/lazygit/config.yml,$HOME/.config/lazygit/abyss.yml" lazygit',
      ],
      note: "The markedBaseCommit keys need a recent lazygit. Remove them if yours complains.",
    },
    {
      id: "btop",
      name: "btop",
      category: "CLI tools",
      description:
        "A btop theme with lime-to-amber-to-red CPU gradients and separate ramps for memory and network.",
      files: [
        {
          label: "abyss.theme",
          path: "downloads/btop/abyss.theme",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/btop/themes",
        "cp abyss.theme ~/.config/btop/themes/",
        "",
        "# in btop: Esc > Options > Color theme > abyss",
        "# or in ~/.config/btop/btop.conf",
        'color_theme = "abyss"',
      ],
      note: "Set theme_background = False in btop.conf to keep a translucent terminal.",
    },
    {
      id: "yazi",
      name: "yazi",
      category: "CLI tools",
      description:
        "A yazi flavor covering tabs, modes, the status bar, popups and file-type colours. Includes its own tmtheme.xml for previews.",
      files: [
        {
          label: "abyss.yazi.zip",
          path: "downloads/yazi/abyss.yazi.zip",
          view: false,
          download: true,
        },
        {
          label: "flavor.toml",
          path: "downloads/yazi/abyss.yazi/flavor.toml",
          view: true,
          download: true,
        },
      ],
      install: [
        "# unzip so you end up with a folder named abyss.yazi",
        "unzip abyss.yazi.zip -d ~/.config/yazi/flavors/",
        "",
        "# in ~/.config/yazi/theme.toml",
        "[flavor]",
        'dark = "abyss"',
        'light = "abyss"',
      ],
    },
    {
      id: "lsd",
      name: "lsd",
      category: "CLI tools",
      description:
        "Two files. colors.yaml colours the columns (permissions, size, date, git). The LS_COLORS script colours file names.",
      files: [
        {
          label: "colors.yaml",
          path: "downloads/lsd/colors.yaml",
          view: true,
          download: true,
        },
        {
          label: "abyss.ls_colors.sh",
          path: "downloads/lsd/abyss.ls_colors.sh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/lsd",
        "cp colors.yaml abyss.ls_colors.sh ~/.config/lsd/",
        "",
        "# ~/.config/lsd/config.yaml",
        "color:",
        "  theme: custom",
        "",
        "# in ~/.zshrc or ~/.bashrc",
        "source ~/.config/lsd/abyss.ls_colors.sh",
      ],
      note: "lsd takes file name colours from LS_COLORS, which also colours ls, tree, fd and zsh completion.",
    },
    {
      id: "jq",
      name: "jq",
      category: "CLI tools",
      description:
        "Sets JQ_COLORS. Picks exact 24-bit colour on jq 1.8 and newer, and 256-colour matches on older versions that reject long codes.",
      files: [
        {
          label: "abyss.jq-colors.sh",
          path: "downloads/jq/abyss.jq-colors.sh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.config/zsh",
        "cp abyss.jq-colors.sh ~/.config/zsh/",
        "",
        "# in ~/.zshrc or ~/.bashrc",
        "source ~/.config/zsh/abyss.jq-colors.sh",
      ],
    },
    {
      id: "claude",
      name: "claude code",
      category: "Agent",
      description: "Sets the statusline for Claude Code",
      files: [
        {
          label: "statusline.sh",
          path: "downloads/claude/statusline.sh",
          view: true,
          download: true,
        },
      ],
      install: [
        "mkdir -p ~/.claude",
        "cp statusline.sh ~/.claude/",
        "chmod a+x ~/.claude/statusline.sh",
        "",
        "# in ~/.claude/settings.json",
        `"statusLine": {
  "type": "command",
  "command": "bash ~/.claude/statusline.sh"
},`,
        "",
      ],
    },
    {
      id: "obsidian",
      name: "Obsidian",
      category: "Apps",
      description:
        "A CSS snippet that overrides Obsidian's colour variables: backgrounds, text, headings, links, tags and code blocks.",
      files: [
        {
          label: "abyss.css",
          path: "downloads/obsidian/abyss.css",
          view: true,
          download: true,
        },
      ],
      install: [
        "# copy into your vault",
        'mkdir -p "<your vault>/.obsidian/snippets"',
        'cp abyss.css "<your vault>/.obsidian/snippets/"',
        "",
        "# Settings > Appearance > CSS snippets > refresh, then switch abyss on",
      ],
      note: "Set Appearance > Base color scheme to Dark.",
    },
    {
      id: "tokens",
      name: "Colour tokens",
      category: "Web",
      description:
        "The whole palette as CSS custom properties and as JSON, including the derived shades and the 16 ANSI colours.",
      files: [
        {
          label: "abyss-tokens.css",
          path: "downloads/web/abyss-tokens.css",
          view: true,
          download: true,
        },
        {
          label: "abyss-palette.json",
          path: "downloads/web/abyss-palette.json",
          view: true,
          download: true,
        },
      ],
      install: [
        '@import "./abyss-tokens.css";',
        "",
        "body { background: var(--abyss-base-200); color: var(--abyss-base-content); }",
      ],
    },
  ],
};
