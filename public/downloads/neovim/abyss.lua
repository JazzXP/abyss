-- abyss — deep teal-black with a lime accent
-- Install: copy to ~/.config/nvim/colors/abyss.lua, then `:colorscheme abyss`

vim.cmd("highlight clear")
if vim.fn.exists("syntax_on") == 1 then
	vim.cmd("syntax reset")
end
vim.o.termguicolors = true
vim.o.background = "dark"
vim.g.colors_name = "abyss"

local c = {
	-- surfaces (derived from base-100/200/300 + neutral)
	bg_dark = "#000611", -- base-300
	bg = "#00111d", -- base-200
	bg_alt = "#001e29", -- base-100
	cursorline = "#001823",
	selection = "#00313b",
	neutral = "#003843",
	border = "#0a4a57",

	-- text
	fg = "#ffd6a7", -- base-content
	fg_bright = "#fff2e0",
	dim = "#82a6ac",
	comment = "#4e7a81",
	accent = "#505050",

	-- brand
	primary = "#bdff00",
	primary_d = "#427600",
	secondary = "#cebef4",
	secondary_d = "#564775",

	-- semantic
	info = "#00bafe",
	success = "#01df72",
	warning = "#ffbf00",
	error = "#f04e4f",

	-- extras
	teal = "#47d6cf",
	orange = "#fb9d59",
	pink = "#f383bb",

	-- diff tints
	diff_add = "#04301f",
	diff_delete = "#3a1018",
	diff_change = "#00303f",
	diff_text = "#00506a",
}

local function hi(group, spec)
	vim.api.nvim_set_hl(0, group, spec)
end

local groups = {
	-- Editor ---------------------------------------------------------------
	Normal = { fg = c.fg, bg = c.bg },
	NormalNC = { fg = c.fg, bg = c.bg },
	NormalFloat = { fg = c.fg, bg = c.bg_alt },
	FloatBorder = { fg = c.border, bg = c.bg_alt },
	FloatTitle = { fg = c.primary, bg = c.bg_alt, bold = true },
	Cursor = { fg = c.bg, bg = c.primary },
	lCursor = { link = "Cursor" },
	CursorIM = { link = "Cursor" },
	TermCursor = { link = "Cursor" },
	CursorLine = { bg = c.cursorline },
	CursorColumn = { bg = c.cursorline },
	ColorColumn = { bg = c.bg_alt },
	LineNr = { fg = c.comment },
	CursorLineNr = { fg = c.primary, bold = true },
	SignColumn = { fg = c.comment, bg = c.bg },
	FoldColumn = { fg = c.comment, bg = c.bg },
	Folded = { fg = c.dim, bg = c.bg_alt },
	EndOfBuffer = { fg = c.bg },
	NonText = { fg = c.neutral },
	Whitespace = { fg = c.neutral },
	SpecialKey = { fg = c.neutral },
	Conceal = { fg = c.comment },
	VertSplit = { fg = c.neutral },
	WinSeparator = { fg = c.neutral },
	MatchParen = { fg = c.primary, bg = c.neutral, bold = true },
	Visual = { bg = c.selection },
	VisualNOS = { bg = c.selection },
	Search = { fg = c.bg, bg = c.primary },
	CurSearch = { fg = c.bg, bg = c.orange, bold = true },
	IncSearch = { fg = c.bg, bg = c.orange, bold = true },
	Substitute = { fg = c.bg, bg = c.pink },
	Directory = { fg = c.info },
	Title = { fg = c.primary, bold = true },
	Question = { fg = c.success },
	MoreMsg = { fg = c.success },
	ModeMsg = { fg = c.fg_bright, bold = true },
	ErrorMsg = { fg = c.error, bold = true },
	WarningMsg = { fg = c.warning },
	WildMenu = { fg = c.bg, bg = c.primary },
	QuickFixLine = { bg = c.selection, bold = true },
	SpellBad = { sp = c.error, undercurl = true },
	SpellCap = { sp = c.warning, undercurl = true },
	SpellLocal = { sp = c.info, undercurl = true },
	SpellRare = { sp = c.secondary, undercurl = true },

	-- Popup menu -----------------------------------------------------------
	Pmenu = { fg = c.fg, bg = c.bg_alt },
	PmenuSel = { fg = c.fg_bright, bg = c.neutral, bold = true },
	PmenuSbar = { bg = c.neutral },
	PmenuThumb = { bg = c.comment },

	-- Statusline / tabline / winbar ---------------------------------------
	StatusLine = { fg = c.fg, bg = c.bg_alt },
	StatusLineNC = { fg = c.comment, bg = c.bg_dark },
	TabLine = { fg = c.comment, bg = c.bg_dark },
	TabLineFill = { bg = c.bg_dark },
	TabLineSel = { fg = c.primary, bg = c.bg, bold = true },
	WinBar = { fg = c.dim, bg = c.bg },
	WinBarNC = { fg = c.comment, bg = c.bg },

	-- Diff -----------------------------------------------------------------
	DiffAdd = { bg = c.diff_add },
	DiffDelete = { fg = c.error, bg = c.diff_delete },
	DiffChange = { bg = c.diff_change },
	DiffText = { bg = c.diff_text },
	Added = { fg = c.success },
	Changed = { fg = c.info },
	Removed = { fg = c.error },

	-- Legacy syntax --------------------------------------------------------
	Comment = { fg = c.comment, italic = true },
	Constant = { fg = c.orange },
	String = { fg = c.teal },
	Character = { fg = c.teal },
	Number = { fg = c.orange },
	Boolean = { fg = c.orange },
	Float = { fg = c.orange },
	Identifier = { fg = c.fg },
	Function = { fg = c.primary },
	Statement = { fg = c.secondary },
	Conditional = { fg = c.secondary },
	Repeat = { fg = c.secondary },
	Label = { fg = c.secondary },
	Operator = { fg = c.dim },
	Keyword = { fg = c.secondary, italic = true },
	Exception = { fg = c.secondary },
	PreProc = { fg = c.pink },
	Include = { fg = c.pink },
	Define = { fg = c.pink },
	Macro = { fg = c.pink },
	PreCondit = { fg = c.pink },
	Type = { fg = c.info },
	StorageClass = { fg = c.info },
	Structure = { fg = c.info },
	Typedef = { fg = c.info },
	Special = { fg = c.pink },
	SpecialChar = { fg = c.pink },
	Tag = { fg = c.secondary },
	Delimiter = { fg = c.dim },
	SpecialComment = { fg = c.comment, bold = true },
	Debug = { fg = c.warning },
	Underlined = { underline = true },
	Ignore = { fg = c.comment },
	Error = { fg = c.error },
	Todo = { fg = c.bg, bg = c.warning, bold = true },

	-- Diagnostics ----------------------------------------------------------
	DiagnosticError = { fg = c.error },
	DiagnosticWarn = { fg = c.warning },
	DiagnosticInfo = { fg = c.info },
	DiagnosticHint = { fg = c.teal },
	DiagnosticOk = { fg = c.success },
	DiagnosticVirtualTextError = { fg = c.error, bg = "#2a0d14" },
	DiagnosticVirtualTextWarn = { fg = c.warning, bg = "#2a2200" },
	DiagnosticVirtualTextInfo = { fg = c.info, bg = "#00263a" },
	DiagnosticVirtualTextHint = { fg = c.teal, bg = "#002a30" },
	DiagnosticUnderlineError = { sp = c.error, undercurl = true },
	DiagnosticUnderlineWarn = { sp = c.warning, undercurl = true },
	DiagnosticUnderlineInfo = { sp = c.info, undercurl = true },
	DiagnosticUnderlineHint = { sp = c.teal, undercurl = true },
	DiagnosticUnnecessary = { fg = c.comment },

	-- LSP ------------------------------------------------------------------
	LspReferenceText = { bg = c.neutral },
	LspReferenceRead = { bg = c.neutral },
	LspReferenceWrite = { bg = c.neutral, underline = true },
	LspSignatureActiveParameter = { fg = c.primary, bold = true },
	LspInlayHint = { fg = c.comment, bg = c.bg_alt, italic = true },
	LspCodeLens = { fg = c.comment },

	["@lsp.type.class"] = { link = "Type" },
	["@lsp.type.enum"] = { link = "Type" },
	["@lsp.type.interface"] = { link = "Type" },
	["@lsp.type.struct"] = { link = "Type" },
	["@lsp.type.typeParameter"] = { fg = c.info, italic = true },
	["@lsp.type.namespace"] = { fg = c.pink },
	["@lsp.type.parameter"] = { fg = c.fg, italic = true },
	["@lsp.type.property"] = { fg = c.fg },
	["@lsp.type.variable"] = {},
	["@lsp.type.macro"] = { link = "Macro" },
	["@lsp.mod.deprecated"] = { strikethrough = true },

	-- Treesitter -----------------------------------------------------------
	["@variable"] = { fg = c.fg },
	["@variable.builtin"] = { fg = c.pink, italic = true },
	["@variable.parameter"] = { fg = c.fg, italic = true },
	["@variable.member"] = { fg = c.fg },
	["@constant"] = { fg = c.orange },
	["@constant.builtin"] = { fg = c.orange, italic = true },
	["@constant.macro"] = { fg = c.pink },
	["@module"] = { fg = c.pink },
	["@label"] = { fg = c.secondary },
	["@string"] = { fg = c.teal },
	["@string.escape"] = { fg = c.pink },
	["@string.regexp"] = { fg = c.pink },
	["@string.special"] = { fg = c.pink },
	["@string.special.url"] = { fg = c.info, underline = true },
	["@character"] = { fg = c.teal },
	["@number"] = { fg = c.orange },
	["@boolean"] = { fg = c.orange },
	["@type"] = { fg = c.info },
	["@type.builtin"] = { fg = c.info, italic = true },
	["@attribute"] = { fg = c.pink },
	["@property"] = { fg = c.fg },
	["@function"] = { fg = c.primary },
	["@function.builtin"] = { fg = c.primary, italic = true },
	["@function.call"] = { fg = c.primary },
	["@function.macro"] = { fg = c.pink },
	["@function.method"] = { fg = c.primary },
	["@function.method.call"] = { fg = c.primary },
	["@constructor"] = { fg = c.info },
	["@operator"] = { fg = c.dim },
	["@keyword"] = { fg = c.secondary, italic = true },
	["@keyword.function"] = { fg = c.secondary, italic = true },
	["@keyword.return"] = { fg = c.secondary, italic = true },
	["@keyword.operator"] = { fg = c.secondary },
	["@keyword.import"] = { fg = c.pink },
	["@keyword.exception"] = { fg = c.secondary },
	["@punctuation.delimiter"] = { fg = c.dim },
	["@punctuation.bracket"] = { fg = c.dim },
	["@punctuation.special"] = { fg = c.pink },
	["@comment"] = { fg = c.comment, italic = true },
	["@comment.error"] = { fg = c.bg, bg = c.error, bold = true },
	["@comment.warning"] = { fg = c.bg, bg = c.warning, bold = true },
	["@comment.todo"] = { fg = c.bg, bg = c.info, bold = true },
	["@comment.note"] = { fg = c.bg, bg = c.teal, bold = true },
	["@markup.strong"] = { fg = c.fg_bright, bold = true },
	["@markup.italic"] = { italic = true },
	["@markup.strikethrough"] = { strikethrough = true },
	["@markup.underline"] = { underline = true },
	["@markup.heading"] = { fg = c.primary, bold = true },
	["@markup.link"] = { fg = c.info },
	["@markup.link.url"] = { fg = c.info, underline = true },
	["@markup.link.label"] = { fg = c.secondary },
	["@markup.raw"] = { fg = c.teal },
	["@markup.list"] = { fg = c.primary },
	["@markup.quote"] = { fg = c.dim, italic = true },
	["@diff.plus"] = { fg = c.success },
	["@diff.minus"] = { fg = c.error },
	["@diff.delta"] = { fg = c.info },
	["@tag"] = { fg = c.secondary },
	["@tag.attribute"] = { fg = c.primary },
	["@tag.delimiter"] = { fg = c.dim },

	-- Telescope ------------------------------------------------------------
	TelescopeNormal = { fg = c.fg, bg = c.bg_alt },
	TelescopeBorder = { fg = c.border, bg = c.bg_alt },
	TelescopeTitle = { fg = c.primary, bold = true },
	TelescopePromptNormal = { fg = c.fg, bg = c.neutral },
	TelescopePromptBorder = { fg = c.neutral, bg = c.neutral },
	TelescopePromptTitle = { fg = c.bg, bg = c.primary, bold = true },
	TelescopePreviewTitle = { fg = c.bg, bg = c.success, bold = true },
	TelescopeResultsTitle = { fg = c.bg_alt, bg = c.bg_alt },
	TelescopeSelection = { fg = c.fg_bright, bg = c.selection, bold = true },
	TelescopeMatching = { fg = c.primary, bold = true },
	TelescopePromptPrefix = { fg = c.primary },

	-- Completion (nvim-cmp / blink.cmp) -----------------------------------
	CmpItemAbbr = { fg = c.fg },
	CmpItemAbbrDeprecated = { fg = c.comment, strikethrough = true },
	CmpItemAbbrMatch = { fg = c.primary, bold = true },
	CmpItemAbbrMatchFuzzy = { fg = c.primary },
	CmpItemMenu = { fg = c.comment },
	CmpItemKindFunction = { fg = c.primary },
	CmpItemKindMethod = { fg = c.primary },
	CmpItemKindVariable = { fg = c.fg },
	CmpItemKindKeyword = { fg = c.secondary },
	CmpItemKindClass = { fg = c.info },
	CmpItemKindInterface = { fg = c.info },
	CmpItemKindSnippet = { fg = c.pink },
	CmpItemKindText = { fg = c.teal },
	BlinkCmpMenu = { link = "Pmenu" },
	BlinkCmpMenuSelection = { link = "PmenuSel" },
	BlinkCmpLabelMatch = { fg = c.primary, bold = true },

	-- Gitsigns -------------------------------------------------------------
	GitSignsAdd = { fg = c.success },
	GitSignsChange = { fg = c.info },
	GitSignsDelete = { fg = c.error },
	GitSignsCurrentLineBlame = { fg = c.comment, italic = true },

	-- Indent guides --------------------------------------------------------
	IblIndent = { fg = "#00202c" },
	IblScope = { fg = c.comment },
	IndentBlanklineChar = { fg = "#00202c" },

	-- Which-key ------------------------------------------------------------
	WhichKey = { fg = c.primary },
	WhichKeyGroup = { fg = c.secondary },
	WhichKeyDesc = { fg = c.fg },
	WhichKeySeparator = { fg = c.comment },
	WhichKeyFloat = { bg = c.bg_alt },

	-- File trees -----------------------------------------------------------
	NvimTreeNormal = { fg = c.fg, bg = c.bg_dark },
	NvimTreeFolderName = { fg = c.info },
	NvimTreeOpenedFolderName = { fg = c.info, bold = true },
	NvimTreeRootFolder = { fg = c.primary, bold = true },
	NvimTreeGitDirty = { fg = c.warning },
	NvimTreeGitNew = { fg = c.success },
	NvimTreeGitDeleted = { fg = c.error },
	NeoTreeNormal = { fg = c.fg, bg = c.bg_dark },
	NeoTreeNormalNC = { fg = c.fg, bg = c.bg_dark },
	NeoTreeDirectoryName = { fg = c.info },
	NeoTreeRootName = { fg = c.primary, bold = true },
	NeoTreeGitAdded = { fg = c.success },
	NeoTreeGitModified = { fg = c.warning },
	NeoTreeGitDeleted = { fg = c.error },

	-- Flash / leap ---------------------------------------------------------
	FlashLabel = { fg = c.bg, bg = c.pink, bold = true },
	FlashMatch = { fg = c.fg_bright, bg = c.neutral },
	FlashCurrent = { fg = c.bg, bg = c.primary },
	LeapLabelPrimary = { fg = c.bg, bg = c.pink, bold = true },
	LeapMatch = { fg = c.primary, bold = true },

	-- Snacks Explorer ------------------------------------------------------
	SnacksPickerGitStatusUntracked = { fg = c.dim }, -- untracked files, and the "?" marker
	SnacksPickerGitStatusIgnored = { fg = c.comment },
	SnacksPickerPathIgnored = { fg = c.comment }, -- git-ignored files and folders
	SnacksPickerPathHidden = { fg = c.dim }, -- dotfiles
	SnacksPickerDir = { fg = c.comment }, -- directory prefix in file paths
}

for group, spec in pairs(groups) do
	hi(group, spec)
end

-- :terminal colours (match the Ghostty palette)
vim.g.terminal_color_0 = "#00262e"
vim.g.terminal_color_1 = "#f04e4f"
vim.g.terminal_color_2 = "#01df72"
vim.g.terminal_color_3 = "#ffbf00"
vim.g.terminal_color_4 = "#00bafe"
vim.g.terminal_color_5 = "#cebef4"
vim.g.terminal_color_6 = "#47d6cf"
vim.g.terminal_color_7 = "#ffd6a7"
vim.g.terminal_color_8 = "#234f56"
vim.g.terminal_color_9 = "#ff6a68"
vim.g.terminal_color_10 = "#4df58c"
vim.g.terminal_color_11 = "#ffd21e"
vim.g.terminal_color_12 = "#5acfff"
vim.g.terminal_color_13 = "#e0d1ff"
vim.g.terminal_color_14 = "#7feae3"
vim.g.terminal_color_15 = "#fff2e0"
