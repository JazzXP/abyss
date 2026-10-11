/* abyss site: renders the preview, palette and downloads from data/site.js */
(function () {
  'use strict';

  var D = window.ABYSS || { site: {}, categories: [], palette: { groups: [], ansi: [] }, tools: [] };
  var $ = function (s, r) { return (r || document).querySelector(s); };

  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
  function h(tag, attrs, children) {
    var e = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === 'class') e.className = attrs[k];
      else if (k === 'text') e.textContent = attrs[k];
      else if (k === 'html') e.innerHTML = attrs[k];
      else if (attrs[k] === true) e.setAttribute(k, '');
      else if (attrs[k] !== false && attrs[k] != null) e.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) e.appendChild(c); });
    return e;
  }

  /* ---------- Clipboard and toast ---------- */
  var toastEl = $('#toast'), toastTimer;
  function toast(msg, isErr) {
    toastEl.textContent = msg;
    toastEl.classList.toggle('err', !!isErr);
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 1800);
  }
  function fallbackCopy(text) {
    try {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;opacity:0;left:-9999px;top:0';
      document.body.appendChild(ta); ta.select();
      var ok = document.execCommand('copy');
      document.body.removeChild(ta);
      return ok;
    } catch (e) { return false; }
  }
  function copy(text, label) {
    var done = function (ok) {
      if (ok) toast('Copied ' + (label || '')); else toast('Could not copy. Select the text and copy it by hand.', true);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(function () { done(true); }, function () { done(fallbackCopy(text)); });
    } else {
      done(fallbackCopy(text));
    }
  }

  /* ---------- Header, hero numbers, footer ---------- */
  var zip = (D.site && D.site.zip) || 'downloads/abyss-all.zip';
  ['zip-top', 'zip-hero'].forEach(function (id) { var a = document.getElementById(id); if (a) a.setAttribute('href', zip); });
  if (D.site && D.site.repo) { var rl = $('#repo-link'); if (rl) rl.setAttribute('href', D.site.repo); }

  var colourCount = D.palette.groups.reduce(function (n, g) { return n + g.colors.length; }, 0);
  var readyTools = D.tools.filter(function (t) { return t.status !== 'soon'; });
  $('#stats').innerHTML =
    '<span><b>' + readyTools.length + '</b>tools</span>' +
    '<span><b>' + colourCount + '</b>colours</span>' +
    '<span><b>' + D.palette.ansi.length + '</b>ANSI slots</span>' +
    '<span><b>24-bit</b>colour</span>';

  /* ---------- Preview window ---------- */
  // «class|text» marks a coloured span. Everything else is escaped as plain text.
  function mk(line) {
    var out = '', last = 0, re = /«([\w -]+)\|([^»]*)»/g, m;
    while ((m = re.exec(line))) {
      out += esc(line.slice(last, m.index)) + '<span class="' + m[1] + '">' + esc(m[2]) + '</span>';
      last = re.lastIndex;
    }
    return out + esc(line.slice(last));
  }
  function row(cls, html) { return '<span class="ln' + (cls ? ' ' + cls : '') + '">' + html + '</span>'; }

  function perms(p) {
    return p.split('').map(function (c) {
      var k = c === 'r' ? 'amber' : c === 'w' ? 'red' : c === 'x' ? 'green' : c === 'd' ? 'blue' : 'mute';
      return '«' + k + '|' + c + '»';
    }).join('');
  }
  function lsRow(p, size, sizeCls, date, dateCls, name, nameCls) {
    return perms(p) + ' «lav|sdickinson» «dim|staff» «' + sizeCls + '|' + size.padStart(7) + '» «' + dateCls + '|' + date + '» «' + nameCls + '|' + name + '»';
  }

  var TABS = [
    {
      id: 'shell', label: 'ls + git', build: function () {
        var lines = [
          '«pl pl-path| ~/code/abyss »«pl pl-git| main ↑1 ✎ 2 »',
          '«lime|❯» «lime|lsd» «teal|-l»',
          lsRow('drwxr-xr-x', '160 B', 'green', 'Sat Oct 10 18:46', 'teal', 'downloads/', 'blue bold'),
          lsRow('.rw-r--r--', '14 KB', 'amber', 'Sat Oct 10 18:46', 'teal', 'abyss.lua', 'hi'),
          lsRow('.rwxr-xr-x', '482 B', 'green', 'Sat Oct 10 07:35', 'teal', 'install.sh', 'green bold'),
          lsRow('.rw-r--r--', '3.9 KB', 'green', 'Sun Oct 11 15:30', 'lime', 'README.md', 'lime'),
          lsRow('.rw-r--r--', '32 KB', 'amber', 'Fri Oct  2 09:12', 'mute', 'abyss-all.zip', 'pink'),
          '',
          '«lime|❯» «lime|git» status -sb',
          '«dim|##» «lime|main»«dim|...»«teal|origin/main» «blue|[ahead 1]»',
          '«red| M» downloads/ghostty/abyss',
          '«red| M» downloads/neovim/abyss.lua',
          '«green|A » downloads/jq/abyss.jq-colors.sh',
          '«red|??» downloads/tmux/'
        ];
        return lines.map(function (l) { return row('', mk(l)); }).join('');
      }
    },
    {
      id: 'diff', label: 'delta', build: function () {
        var d = [
          ['hdr', '«fname|Δ downloads/neovim/abyss.lua»'],
          ['', '«lav|abyss.lua»«mute| • 4: »'],
          ['', '«gut2|   4»«sep|│»«gut2|   4»«sep|│»  «hi|bg        »«o|=» «s|"#00111d"»«o|,» «c|-- base-200»'],
          ['del', '«gut2|   5»«sep|│»«gut2|    »«sep|│»«red|-» «hi|fg        »«o|=» «s del-em|"#fff2e0"»«o|,»'],
          ['add', '«gut2|    »«sep|│»«gut2|   5»«sep|│»«green|+» «hi|fg        »«o|=» «s add-em|"#ffd6a7"»«o|,» «c|-- base-content»'],
          ['', '«gut2|   6»«sep|│»«gut2|   6»«sep|│»  «hi|primary   »«o|=» «s|"#bdff00"»«o|,» «c|-- lime»'],
          ['', '«gut2|   7»«sep|│»«gut2|   7»«sep|│»  «hi|secondary »«o|=» «s|"#cebef4"»«o|,»'],
          ['del', '«gut2|   8»«sep|│»«gut2|    »«sep|│»«red|-» «hi|warning   »«o|=» «s del-em|"#ffbf0a"»«o|,»'],
          ['add', '«gut2|    »«sep|│»«gut2|   8»«sep|│»«green|+» «hi|warning   »«o|=» «s add-em|"#ffbf00"»«o|,»'],
          ['', '«gut2|   9»«sep|│»«gut2|   9»«sep|│»  «hi|error     »«o|=» «s|"#f04e4f"»«o|,»']
        ];
        return d.map(function (r) { return row(r[0], mk(r[1])); }).join('');
      }
    },
    {
      id: 'code', label: 'Neovim', build: function () {
        var src = [
          '«k|type» «t|Zone» «o|=» «s|"sunlit"» «o||» «s|"twilight"» «o||» «s|"midnight"» «o||» «s|"abyss"»«p|;»',
          '',
          '«c|// the ocean\'s own zones, by depth in metres»',
          '«k|export function» «f|zone»«o|(»metres«o|:» «t|number»«o|):» «t|Zone» «o|{»',
          '  «k|if» «o|(»metres «o|<» «n|200»«o|)» «k|return» «s|"sunlit"»«o|;»',
          '  «k|if» «o|(»metres «o|<» «n|1000»«o|)» «k|return» «s|"twilight"»«o|;»',
          '  «k|return» metres «o|<» «n|4000» «o|?» «s|"midnight"» «o|:» «s|"abyss"»«o|;»',
          '«o|}»',
          '',
          '«b|console»«o|.»«f|log»«o|(»«f|zone»«o|(»«n|4200»«o|));» «c|// "abyss"»'
        ];
        var cur = 7;
        var body = src.map(function (l, i) {
          var n = i + 1, isCur = n === cur;
          var html = '<span class="gut">' + n + '</span>' + mk(l) + (isCur ? '<span class="blk"></span>' : '');
          return row(isCur ? 'cur' : '', html);
        }).join('');
        return body + '<div class="status"><span class="mode">NORMAL</span><span class="mid">zone.ts</span><span>typescript</span><span>utf-8</span><span>7:48</span></div>';
      }
    },
    {
      id: 'json', label: 'jq', build: function () {
        var lines = [
          '«lime|❯» «lime|curl» «teal|-s» api.example.com/dive «o||» «lime|jq» «teal|.»',
          '«o|{»',
          '  «key|"zone"»«o|:» «s|"abyss"»«o|,»',
          '  «key|"depth_m"»«o|:» «n|4200»«o|,»',
          '  «key|"lit"»«o|:» «b|false»«o|,»',
          '  «key|"last_seen"»«o|:» «mute|null»«o|,»',
          '  «key|"creatures"»«o|:» «o|[»«s|"anglerfish"»«o|,» «s|"gulper eel"»«o|]»',
          '«o|}»'
        ];
        return lines.map(function (l) { return row('', mk(l)); }).join('');
      }
    }
  ];

  var tabsEl = $('#tabs'), bodyEl = $('#win-body'), activeTab = 0;
  function showTab(i, focus) {
    activeTab = i;
    Array.prototype.forEach.call(tabsEl.children, function (b, j) {
      var on = j === i;
      b.setAttribute('aria-selected', on ? 'true' : 'false');
      b.tabIndex = on ? 0 : -1;
      if (on && focus) b.focus();
    });
    var t = TABS[i];
    bodyEl.innerHTML = '<div class="code">' + t.build() + '</div>';
    bodyEl.setAttribute('aria-labelledby', 'tab-' + t.id);
  }
  TABS.forEach(function (t, i) {
    var b = h('button', { 'class': 'tab', role: 'tab', id: 'tab-' + t.id, type: 'button', text: t.label });
    b.addEventListener('click', function () { showTab(i); });
    b.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); showTab((activeTab + 1) % TABS.length, true); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); showTab((activeTab + TABS.length - 1) % TABS.length, true); }
    });
    tabsEl.appendChild(b);
  });
  showTab(0);

  /* ---------- Palette ---------- */
  var sw = $('#swatches');
  D.palette.groups.forEach(function (g) {
    var grid = h('div', { 'class': 'swatches', style: '--n:' + Math.min(g.colors.length, 6) });
    g.colors.forEach(function (c) {
      var b = h('button', { 'class': 'sw', type: 'button', 'aria-label': 'Copy ' + c.name + ', ' + c.hex }, [
        h('span', { 'class': 'chip', style: 'background:' + c.hex }),
        h('span', { 'class': 'meta' }, [
          h('span', { 'class': 'nm', text: c.name }),
          h('span', { 'class': 'hx', text: c.hex }),
          h('span', { 'class': 'rl', text: c.role }),
          h('span', { 'class': 'ok', text: c.oklch || 'derived shade' })
        ])
      ]);
      b.addEventListener('click', function () { copy(c.hex, c.hex); });
      grid.appendChild(b);
    });
    sw.appendChild(h('div', { 'class': 'pal-group' }, [h('h3', { text: g.name }), grid]));
  });
  var ansiNames = ['black', 'red', 'green', 'yellow', 'blue', 'magenta', 'cyan', 'white'];
  D.palette.ansi.forEach(function (hex, i) {
    var name = (i > 7 ? 'bright ' : '') + ansiNames[i % 8];
    var b = h('button', { type: 'button', style: 'background:' + hex, title: i + ' ' + name + ' ' + hex, 'aria-label': 'Copy ANSI ' + i + ', ' + name + ', ' + hex });
    b.addEventListener('click', function () { copy(hex, hex); });
    $('#ansi').appendChild(b);
    $('#ansi-labels').appendChild(h('span', { text: String(i) }));
  });

  /* ---------- Downloads ---------- */
  var state = { q: '', cat: 'All' };
  var grid = $('#grid'), chips = $('#chips'), line = $('#result-line');

  function chipBtn(label, count) {
    var b = h('button', { 'class': 'chip-btn', type: 'button', 'aria-pressed': 'false' }, [document.createTextNode(label), h('span', { 'class': 'ct', text: String(count) })]);
    b.dataset.cat = label;
    b.addEventListener('click', function () { state.cat = label; render(); });
    return b;
  }
  var cats = D.categories.filter(function (c) { return D.tools.some(function (t) { return t.category === c; }); });
  D.tools.forEach(function (t) { if (cats.indexOf(t.category) < 0) cats.push(t.category); });
  chips.appendChild(chipBtn('All', D.tools.length));
  cats.forEach(function (c) { chips.appendChild(chipBtn(c, D.tools.filter(function (t) { return t.category === c; }).length)); });

  function matches(t) {
    if (state.cat !== 'All' && t.category !== state.cat) return false;
    if (!state.q) return true;
    var hay = [t.name, t.category, t.description, t.id].concat((t.files || []).map(function (f) { return f.label; })).join(' ').toLowerCase();
    return state.q.toLowerCase().split(/\s+/).every(function (w) { return hay.indexOf(w) >= 0; });
  }

  var DL_ICON = '<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M8 2v8m0 0 3-3m-3 3L5 7M3 13h10" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  function glyph(name) {
    var w = name.replace(/[^A-Za-z0-9 ]/g, ' ').trim().split(/\s+/);
    return (w.length > 1 ? w[0][0] + w[1][0] : name.slice(0, 2)).toLowerCase();
  }

  function card(t) {
    var soon = t.status === 'soon' || !(t.files && t.files.length);
    var c = h('article', { 'class': 'card' + (soon ? ' soon' : ''), id: 'tool-' + t.id, 'data-cat': t.category });
    c.appendChild(h('div', { 'class': 'card-head' }, [
      h('span', { 'class': 'glyph', 'aria-hidden': 'true', text: glyph(t.name) }),
      h('h3', { text: t.name }),
      h('span', { 'class': 'pill', text: soon ? 'Coming soon' : t.category })
    ]));
    c.appendChild(h('p', { 'class': 'desc', text: t.description }));

    if (!soon) {
      var files = h('div', { 'class': 'files' });
      t.files.forEach(function (f) {
        var acts = h('div', { 'class': 'acts' });
        if (f.view !== false) {
          var v = h('button', { 'class': 'btn btn-sm', type: 'button', text: 'View', 'aria-label': 'View ' + f.label });
          v.addEventListener('click', function () { openViewer(f); });
          acts.appendChild(v);
        }
        if (f.download !== false) {
          acts.appendChild(h('a', { 'class': 'btn btn-sm', href: f.path, download: f.label, 'aria-label': 'Download ' + f.label, html: DL_ICON + 'Download' }));
        }
        files.appendChild(h('div', { 'class': 'file' }, [h('code', { text: f.label, title: f.label }), acts]));
      });
      c.appendChild(files);

      if (t.install && t.install.length) {
        var text = t.install.join('\n');
        var det = h('details', { 'class': 'install' }, [h('summary', { text: 'Install' })]);
        var box = h('div', { 'class': 'codebox' });
        box.appendChild(h('pre', {}, [h('code', { text: text })]));
        var cb = h('button', { 'class': 'btn btn-sm', type: 'button', text: 'Copy', 'aria-label': 'Copy install steps for ' + t.name });
        cb.addEventListener('click', function () { copy(text, 'install steps'); });
        box.appendChild(cb);
        det.appendChild(box);
        if (t.note) det.appendChild(h('p', { 'class': 'note', html: '<b>Note</b>' + esc(t.note) }));
        c.appendChild(det);
      }
    }
    return c;
  }

  function render() {
    Array.prototype.forEach.call(chips.children, function (b) { b.setAttribute('aria-pressed', b.dataset.cat === state.cat ? 'true' : 'false'); });
    var list = D.tools.filter(matches);
    if (state.q) {
      // name matches first, then everything else in the original order
      var ql = state.q.toLowerCase();
      list = list.map(function (t, i) { return { t: t, i: i, r: t.name.toLowerCase().indexOf(ql) >= 0 || t.id.indexOf(ql) >= 0 ? 0 : 1 }; })
        .sort(function (a, b) { return a.r - b.r || a.i - b.i; })
        .map(function (x) { return x.t; });
    }
    grid.innerHTML = '';
    if (!list.length) grid.appendChild(h('div', { 'class': 'empty', text: 'Nothing matches. Clear the search or pick another category.' }));
    list.forEach(function (t) { grid.appendChild(card(t)); });
    line.textContent = list.length === D.tools.length ? D.tools.length + ' tools' : list.length + ' of ' + D.tools.length + ' tools';
  }
  $('#q').addEventListener('input', function (e) { state.q = e.target.value.trim(); render(); });
  render();

  // Deep link to a tool card, e.g. #tool-bat, then open its install steps
  function goToHash() {
    var m = /^#tool-([\w-]+)$/.exec(location.hash);
    if (!m) return;
    var el = document.getElementById('tool-' + m[1]);
    if (!el) { state.cat = 'All'; state.q = ''; render(); el = document.getElementById('tool-' + m[1]); }
    if (el) { el.scrollIntoView(); var d = el.querySelector('details'); if (d) d.open = true; }
  }
  window.addEventListener('hashchange', goToHash);
  goToHash();

  /* ---------- File viewer ---------- */
  var dlg = $('#viewer'), vName = $('#viewer-name'), vBody = $('#viewer-body'), vDl = $('#viewer-dl'), vCopy = $('#viewer-copy');
  var viewerText = '', viewerFile = null;
  function openViewer(f) {
    viewerFile = f; viewerText = '';
    vName.textContent = f.label;
    vDl.setAttribute('href', f.path); vDl.setAttribute('download', f.label);
    vBody.className = 'dlg-body dlg-msg'; vBody.textContent = 'Loading…';
    if (typeof dlg.showModal === 'function') { if (!dlg.open) dlg.showModal(); } else { dlg.setAttribute('open', ''); }
    fetch(f.path, { cache: 'no-store' }).then(function (r) {
      if (!r.ok) throw new Error('HTTP ' + r.status);
      return r.text();
    }).then(function (txt) {
      if (viewerFile !== f) return;
      viewerText = txt; vBody.className = 'dlg-body'; vBody.textContent = txt;
    }).catch(function () {
      if (viewerFile !== f) return;
      vBody.className = 'dlg-body dlg-msg';
      vBody.textContent = location.protocol === 'file:'
        ? 'Browsers block reading files from a file:// page. Serve the folder (for example: python3 -m http.server) or use Download.'
        : 'Could not load this file. Use Download instead.';
    });
  }
  vCopy.addEventListener('click', function () { if (viewerText) copy(viewerText, viewerFile ? viewerFile.label : ''); else toast('Nothing to copy yet', true); });
  $('#viewer-close').addEventListener('click', function () { dlg.close(); });
  dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });

  /* ---------- Depth gauge ---------- */
  var gm = $('#gauge-mk'), gr = $('#gauge-rd'), ticking = false, MAX = 10935;
  function gauge() {
    ticking = false;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    var p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    gm.style.top = (p * 100) + '%';
    gr.textContent = (Math.round(p * MAX / 5) * 5).toLocaleString('en-US') + ' m';
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(gauge); } }, { passive: true });
  window.addEventListener('resize', gauge);
  gauge();
})();
