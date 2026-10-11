# abyss site

![abyss logo](abyss.svg)

A static site for the abyss theme: a preview, the palette, and a downloads grid with install steps.
No build step and no dependencies. Plain HTML, CSS and JS.

```
public/index.html          the page
public/assets/style.css    styles
public/assets/app.js       renders the preview, palette and downloads from data/site.js
public/data/site.js        palette and the list of tools (edit this to add downloads)
public/downloads/          every file offered for download, one folder per tool
scripts/build-zip.sh       rebuilds downloads/abyss-all.zip
wrangler.jsonc             wrangler config
```

## Run it locally

```sh
npx wrangler dev
```

Opening `index.html` straight from disk also works, except the **View** button, because browsers
block `fetch()` on `file://` pages. Download links and everything else are fine.

## Add a tool (tmux, for example)

1. Put the files in `downloads/tmux/`.
2. Open `data/site.js` and copy any entry in `"tools"`, then edit it:

   ```js
   {
     "id": "tmux",
     "name": "tmux",
     "category": "Terminal",            // one of the "categories" at the top of the file
     "description": "Status line, pane borders and message colours.",
     "files": [
       { "label": "abyss.tmux.conf", "path": "downloads/tmux/abyss.tmux.conf", "view": true, "download": true }
     ],
     "install": [
       "mkdir -p ~/.config/tmux",
       "cp abyss.tmux.conf ~/.config/tmux/",
       "",
       "# in ~/.tmux.conf",
       "source-file ~/.config/tmux/abyss.tmux.conf"
     ],
     "note": "Optional. One line shown under the install steps."
   }
   ```

   Set `"view": false` for binaries and zips. Set `"status": "soon"` (and leave `files` empty) to list
   a tool as coming soon.
3. Run `./scripts/build-zip.sh` to refresh `downloads/abyss-all.zip`.

A new category needs adding to `"categories"` in `data/site.js`. To give it a colour, add a
`.card[data-cat="Name"] { --cat: ... }` rule in `assets/style.css`.

## Credits

The colour tokens come from the abyss theme in [daisyUI](https://daisyui.com) (MIT licence). The tool
configs are mappings of that palette.
