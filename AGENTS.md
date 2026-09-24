# AGENTS.md

## Project

VSCode extension providing Material Design 3 (Material You) color themes.
Ported from `@sandlada/opencode-material-theme` (static MD3 themes for the
OpenCode TUI). Output is VSCode color-theme JSON, not CSS. No
runtime/dynamic generation.

Current phase: schema + mapping + single-run + matrix DONE
(`src/vscode-schema.js`, `src/vscode-mapping.js`,
`scripts/generate-vscode-theme.mjs`, `scripts/generate-vscode-matrix.mjs`).
Semantic palette layer DONE (`src/vscode-palette-bank.js` shared bank +
`src/vscode-semantic-palettes.js`: git diff + problems are fixed palettes,
not scheme roles) and `scrollbarSlider.*` translucency fix DONE
(overview-ruler marks must show through the fading scrollbar).
`themes/` holds the full 291-file default-contrast matrix
(97 combos x light/dark/dark-oled). The OpenCode-era peers
(`src/tui-schema.js`, `src/md3-mapping.js`,
`scripts/generate-md3-*.mjs`) were removed; port history lives in git,
and the surviving design notes are in `src/vscode-mapping.js`.

References (do not re-derive the VSCode contract from memory):

- Color Theme guide:
  `https://code.visualstudio.com/api/extension-guides/color-theme`
- Built-in themes manifest:
  `https://github.com/microsoft/vscode/tree/main/extensions/theme-defaults`
- Built-in theme files:
  `https://github.com/microsoft/vscode/tree/main/extensions/theme-defaults/themes`
- Workbench color IDs:
  `https://code.visualstudio.com/api/references/theme-color`
- TextMate syntax-theming rules:
  `https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide`

## Origin / what the port keeps vs drops

Source project (`opencode-material-theme`):

- 194 static JSONs: 9 variants x 12 hues (`0-330` step `30`, `monochrome`
  hue `0` only) x plain/oled, at default contrast.
- Matrix sources are fixed HCT `C75 T50` (`Hct.from(hue, 75, 50)`; MCU
  clamps out-of-gamut hues deterministically). One-off hex sources allowed.
- One file carries BOTH appearances (OpenCode switches light/dark itself
  via `{ dark, light }` values); `oled` marks a second file whose dark
  half is pitch-black.
- 50 `theme.*` keys via `src/tui-schema.js`; M3 role -> TUI key via
  `src/md3-mapping.js` (`BASE` + `STD`/`LIGHT_STD`/`DARK_STD`/`REDUCED`/
  `HIGH`/`MONOCHROME`, `resolveMapping(mode, group, variant)`).
- Fail-closed generation (schema drift, unknown roles, contrast guards:
  text 4.5, muted/wash 3.0; reduced text 3.0 by design; guard runs against
  BOTH halves).

Keeps for VSCode:

- MD3 token system (`DynamicScheme` + tonal palettes via
  `@sandlada/mcu-helper` + peer
  `@material/material-color-utilities`); same default opts
  (`specVersion: '2025'`, `platform: 'phone'`, `contrastLevel: 0`,
  only variant/source/contrast vary per theme).
- Variant set + kebab slugs (`monochrome`, `neutral`, `tonal-spot`,
  `vibrant`, `expressive`, `fidelity`, `content`, `rainbow`,
  `fruit-salad`); HCT hue sources; contrast suffix semantics (`''` =
  default, `-high` = `contrastLevel: 1`, `-reduced` = `-1`); OLED
  semantics (only `dark-oled` ships: the dark OLED file is pitch-black
  on the editor surface; there is NO `light-oled` — `mcu-helper`
  resolves OLED only against the dark scheme, so light OLED would be
  hex-identical to plain light and is never emitted).
- Hard lessons from `src/md3-mapping.js`: `*Container`/`on*Container`
  pair roles are variant roulette (flip across modes, contrast levels,
  and variants; high contrast turns every `on*Container` into a
  background-matching extreme); washes must be neutral containers, diff
  hue lives in text. Any VSCode mapping needs the same guard pass.
- Git diff + problem semantics are FIXED palettes (red `30`, amber `60`,
  green `150`, blue `240`, purple `300`, gray neutral) at frozen tones
  (`src/vscode-semantic-palettes.js`): meaning must survive every variant,
  so they are never mapped to DynamicScheme roles. Ruler marks + gutter
  bars + explorer labels all draw from the same named palettes.
- Fail-closed habit: schema drift + unknown roles + measured contrast
  violations must abort generation, never ship an unreadable theme.

Drops for VSCode:

- OpenCode theme JSON shape (`$schema: https://opencode.ai/theme.json`,
  `defs` + `theme` with `{ dark, light }` per key); per-mode `defs` refs.
- `tui/` output dir, `/theme` + `tui.json` selection, `COLORTERM`
  truecolor note, `bin/install.mjs` copy-into-`~/.config/opencode/themes`
  distribution.

## VSCode theme JSON contract (must follow)

From the Color Theme guide + `theme-defaults`:

- Manifest (`package.json`): `contributes.themes[]` entries with `label`,
  `uiTheme` (`vs` = light, `vs-dark` = dark, `hc-black` / `hc-light` =
  high contrast), and `path` (`./themes/*.json`). Reference shape is
  `extensions/theme-defaults/package.json` (10 entries: Light/Dark 2026,
  Dark+/Light+, Dark/Light Modern, VS Dark/Light, HC black/light).
  Set extension `categories` to `Themes` and mention `theme` in the
  description so users find it on the Marketplace.
- Theme file shape (verified against `dark_vs.json`, `dark_plus.json`,
  `dark_modern.json`, `hc_black.json`):
  `{ '$schema': 'vscode://schemas/color-theme', 'name': ..., 'include'?: ...,
  'colors': {...}, 'tokenColors': [...], 'semanticHighlighting'?: bool,
  'semanticTokenColors'?: {...} }`.
- `colors`: workbench color IDs -> `#RGB`/`#RGBA`/`#RRGGBB`/`#RRGGBBAA`
  (alpha `00` = transparent; non-opaque required where annotations must
  shine through). Full ID list is the theme-color reference
  (`focusBorder`, `foreground`, `activityBar.*`, `sideBar.*`,
  `editor.*`, `tab.*`, `statusBar.*`, `titleBar.*`, `list.*`,
  `terminal.*`, `contrastBorder`, `contrastActiveBorder`, ...).
- `tokenColors`: TextMate rules, `[{ 'name'?, 'scope': string|string[],
  'settings': { 'foreground'?, 'background'?, 'fontStyle'? } }]`; scopes
  are grammars scopes (`comment`, `keyword.control`, `string`,
  `variable`, `entity.name.function`, `entity.name.type`,
  `markup.inserted/deleted`, ...). `dark_plus.json` is the reference for
  the modern rule set (function/type/keyword/variable/regexp splits).
- `semanticHighlighting: true` + `semanticTokenColors` for language-server
  tokens (`newOperator`, `stringLiteral`, `customLiteral`,
  `numberLiteral`, ...); users can override per theme via
  `editor.tokenColorCustomizations['[Name]']`.
- `include` chains a base file (e.g. `dark_modern.json` includes
  `./dark_plus.json`); useful if light/dark share a token rule skeleton.
- Give files the `-color-theme.json` suffix: the official guide promises
  hovers, completion, color decorators, and pickers for that suffix.
- Dev loop (per guide): tune via `workbench.colorCustomizations` +
  `editor.tokenColorCustomizations` live, then `Developer: Generate Color
  Theme From Current Settings`; test with F5 (Extension Development
  Host) + `Preferences: Color Theme` picker; publish with `vsce`,
  category `Themes`.

## Theme naming contract (v2, frozen by generation)

VSCode has no dual-appearance file (`uiTheme` is per file), so the
OpenCode one-file-two-appearances rule cannot carry over:

- File: `md3-{variant}-{hue}-{light|dark|dark-oled}[-high|-reduced]-color-theme.json`
- All lowercase, single hyphens. `{variant}` is kebab-case (`tonal-spot`,
  `fruit-salad`, else lowercase); `{hue}` is the HCT hue number (`0-330`
  step `30`; `monochrome` only ships hue `0`, i.e. a single source but
  still all three appearances).
- Per combo exactly three appearances: `light` (`uiTheme: vs`), `dark`
  (`uiTheme: vs-dark`), `dark-oled` (`uiTheme: vs-dark`, pitch-black
  editor surface). There is NO `light-oled`.
- Matrix sources stay fixed HCT `C75 T50` (`Hct.from(hue, 75, 50)`).
  One-off hex sources use
  `md3-{variant}-{#hex}-{light|dark|dark-oled}[-high|-reduced]-color-theme.json`
  instead.
- `''` (default contrast) = no suffix; `-high` = `contrastLevel: 1`
  (`uiTheme` stays `vs`/`vs-dark`; reserve `hc-black`/`hc-light` for a
  later dedicated HC pass if ever); `-reduced` = `contrastLevel: -1`.
- Picker `name` inside each file (== `label` in `package.json`) is
  `MD3:{Variant} {hue} {Light|Dark|Dark OLED}` (+ ` High`/` Reduced`
  for non-default contrast), e.g. `MD3:Expressive 120 Dark OLED` for
  `md3-expressive-120-dark-oled-color-theme.json`. The `:` lives ONLY
  in the display name.
- NEVER use `:` in file stems (`MD3:...` stems): Windows turns `a:b`
  into an NTFS alternate-data-stream file that git cannot check out.
- Matrix size at default contrast: 97 combos
  (9 variants x 12 hues, monochrome hue `0` only) x light/dark/dark-oled
  = 291 files. Regenerate only via `scripts/generate-vscode-matrix.mjs`;
  do not hand-generate one-offs outside the single-run script.

## Workflow (order matters; single-run + matrix DONE)

1. `src/vscode-schema.js` — DONE (v1 source of truth): 179 workbench
   color IDs (curated from `dark_modern.json`/`dark_vs.json`, incl. 6
   `menu.*` IDs so context menus use `surface` + `outlineVariant`
   border instead of the neutral fallback, 6
   `editorOverviewRuler.*` marks, 10 `gitDecoration.*` states, 3
   `editorGutter.*SecondaryBackground` staged bars, `quickInputList.focusBackground`,
   8 `tab.selected*`/`tab.unfocused*`/`tab.hoverForeground` IDs so selected/hover/unfocused
   tab text never falls back to the unreadable VSCode defaults)
   + 26
   TextMate rules (scopes from `dark_vs.json`/`dark_plus.json`,
   `fontStyle` fixed here; `link` covers `markup.underline.link.markdown`
   with `underline`, mirroring `dark_vs.json`) + 4 semantic tokens (`newOperator`,
   `stringLiteral`, `customLiteral`, `numberLiteral`). Every emitted
   file must fill it exactly (fail closed on drift). IDs outside it
   fall back to VSCode defaults at runtime. `src/tui-schema.js` was
   removed (OpenCode 50 `theme.*` keys live in git history); do not
   resurrect it.
2. `src/vscode-mapping.js` — DONE (v1 source of truth):
   `resolveVscodeMapping(appearance, group, variant)` ->
   `{ colors, tokenRoles, semanticRoles }` (`BASE` + `WASH`/
   `LIGHT_STD`/`DARK_STD`/`REDUCED`/`HIGH`/`MONOCHROME`, mirroring the
   removed `src/md3-mapping.js` structure — see git history). Reuses the neutral-wash + text-hue
   + container-roulette rules; roles restricted to the 55 roles shared
   by spec `2021`+`2025`; translucent `{ role, alpha }` only where the
   theme-color reference demands non-opaque, PLUS `scrollbarSlider.*`
   (`onSurfaceVariant` @ `66`/`99`/`b3`) which must stay translucent:
   VSCode fades the scrollbar in ABOVE the overview-ruler canvas, so an
   opaque slider hides git diff / problem marks (user-reported; generator
   caps alpha at `b3`). Git diff + problem semantics use the third value
   shape `{ palette, tier, alpha? }` (fixed palettes, NEVER scheme roles —
   a hue-330 theme must not paint "added" pink; see
   `src/vscode-semantic-palettes.js`; ruler marks are palette @ `99`).
   Top-level popups (quick input, menus, dropdown lists, notifications) use
   the brightest surface role — `surfaceBright` in both appearances
   (`VSCODE_COLOR_LIGHT_POPUP` / `..._DARK_POPUP`; light T98 = the app
   surface tone, dark T24 above every container step), with popup-internal
   selections stepping DOWN in dark (`surfaceContainerHigh`, because
   `surfaceBright` outranks `surfaceContainerHighest`): see
   `menu.selectionBackground` + `quickInputList.focusBackground`.
   Panel views (Problems / Output / Debug Console / Terminal / Ports) share
   the editor `surface` so the editing area + panel read as one continuous
   sheet; `panel.border` = `outlineVariant` keeps the separator.
   Borders stay `outlineVariant`
   throughout (a `outline` pass on chrome separators was previewed and
   reverted: too heavy, `outline` runs much darker than `outlineVariant`).
   Selection is opaque neutral
   (`surfaceContainerHighest` active / `surfaceContainerHigh` inactive):
   any mid-luminance tint washes syntax tokens out (translucent
   `primary@66` left nearly every token at ~3.3 and comments <3.0;
   opaque `primaryContainer` fails dark outright, e.g. Expressive-dark
   1.02); on neutral, text tokens hold >=4.5 and muted comments >=3.28
   with token colors surviving inside the selection. `property` (JSON keys,
   CSS props) defaults to `primary` but carries per-variant/appearance
   tweaks (`VSCODE_TOKEN_PROPERTY_TWEAKS`): no single role separates keys
   from strings + editor fg everywhere (`primary` is near-`onSurface` in
   Expressive dark, `secondary` collides with `tertiary` strings in
   Expressive; pastel variants collide under every text role — measured
   RGB sweep, 582 cells x 0 contrast failures, residuals documented in
   mapping). Semantic roles track
   their TextMate counterparts by construction. Verified: exact schema
   coverage x 54 combos (2 appearances x 3 groups x 9 variants), all
   roles in both spec sets, contrast sanity (text 4.5 / muted 3.0) on
   probed hues.
3. `scripts/generate-vscode-theme.mjs` — DONE (v1 single-run VSCode
   generator; Bun-only, same reason as above). Without `--oled` emits the
   plain light/dark pair
   (`md3-{variant}-{hue}-{light|dark}[-high|-reduced]-color-theme.json`,
   `vscode://schemas/color-theme`, static hex only); with `--oled` emits
   ONLY the dark OLED single file
   (`md3-{variant}-{hue}-dark-oled[-high|-reduced]-color-theme.json`,
   pitch-black `background` + `surface` -> `#000000`). There is NO
   light OLED output (hex-identical to plain light, never emitted).
   Picker names are `MD3:{Variant} {hue} {Light|Dark|Dark OLED}`.
   Fails closed on mapping/schema drift + unknown roles + contrast
   violations (text 4.5, muted 3.0; reduced text 3.0 by design; alpha
   washes verified by construction), on semantic palette tones against the
   real scheme backgrounds (`src/vscode-semantic-palettes.js`), and on
   opaque `scrollbarSlider.*` values (alpha <= `b3`, overview-ruler marks
   must show through). Usage:
   `bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150
   --out ./themes` (or `--source '#rrggbb'` instead of `--hue`;
   add `--oled` for the dark OLED file).
4. `scripts/generate-vscode-matrix.mjs` — DONE (v1 VSCode matrix driver;
   `--out ./themes`, fail fast on guard). Sweeps 9 variants x 12 HCT
   hues (`0-330` step `30`, `monochrome` hue `0` only) = 97 combos x
   light/dark/dark-oled = 291 files at default contrast, then rewrites
   `package.json` `contributes.themes` to match. Usage:
   `bun scripts/generate-vscode-matrix.mjs --out ./themes`
   (`--contrast high|reduced` + `--spec 2021` supported for one-off
   sweeps; default-contrast matrix is the shipped set).

## Generation stack (frozen v1; used by both VSCode generators)

- Deps: `@sandlada/mcu-helper` + peer `@material/material-color-utilities`.
- `mcu-helper` is curried/functional: `createTheme(opts)(sourceHex)` ->
  `{ light, dark, palettes }` (ARGB ints, camelCase tokens).
- Default opts: `specVersion: '2025'` (59 tokens; `'2021'` is 55),
  `platform: 'phone'`, `contrastLevel: 0`. Only change variant/source
  per theme (plus the contrast the filename suffix declares); keep
  spec/platform consistent across all themes. Matrix hue sources are
  `Hct.from(hue, 75, 50)` (single runs may use any `--source` hex).
- Name suffixes map to opts: `dark-oled` -> `oled: true` (dark file is
  pitch-black; there is no light OLED — light OLED would be hex-identical
  to plain light and is never emitted);
  `-high` / `-reduced` -> `contrastLevel: 1` / `-1`; `''` ->
  `contrastLevel: 0`, no suffix.
- Never hand-pick colors: every workbench/token/semantic value must come
  from a resolved M3 role, a tonal palette, or a fixed alpha over one of
  them (one resolved map per emitted file). Translucent `{ role, alpha }`
  values are still role-derived (alpha `66` for reference-mandated washes;
  `66`/`99`/`b3` for `scrollbarSlider.*`, which must stay translucent).
  Semantic git/problem values are FIXED tonal-palette values
  (`{ palette, tier, alpha? }`), variant-independent by design; the shared
  bank lives in `src/vscode-palette-bank.js`.

## Repo conventions

- `.editorconfig`: LF, UTF-8, space indent 4, single quotes in `*.{ts,js}`,
  `trim_trailing_whitespace` (off for `*.md`).
- `.gitattributes` enforces `eol=lf` for source/config/docs.
- `.gitignore` must NOT swallow docs: `*.md` ignore needs `!AGENTS.md`
  alongside `!README.md` (else the agent contract is uncommittable).
- MIT License, copyright `Kai-Orion & Sandlada`.
- Extension scaffold (TBD): `package.json` (`engines.vscode`,
  `categories: ['Themes']`, `contributes.themes`), `themes/` output
  (`*-color-theme.json`), `vsce` packaging; F5 Extension Development
  Host for manual checks.
- `mcu-helper` upstream uses `npm install` / `npm test` / `npm run compile`.

## Distribution (VSCode Marketplace; TBD, no publish yet)

- Old OpenCode path is retired: npm package
  `@sandlada/opencode-material-theme` + `bin/install.mjs`
  (`opencode-md3-themes install/list/--dry-run/--variant/--hue/--oled/--dir`,
  XDG else `~/.config`) does NOT apply to VSCode.
- New path (pending): VSCode Marketplace (`vsce publish`, category
  `Themes`) and/or `*.vsix` from GitHub Releases; npm `files` should
  ship ONLY `themes/` + docs + `README.md` + `LICENSE` once generation
  exists. Do not design the installer until the theme file contract is
  frozen.
- README is English; screenshots live in `docs/` once themes exist.
