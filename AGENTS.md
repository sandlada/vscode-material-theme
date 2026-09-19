# AGENTS.md

## Project

VSCode extension providing Material Design 3 (Material You) color themes.
Ported from `@sandlada/opencode-material-theme` (static MD3 themes for the
OpenCode TUI). Output is VSCode color-theme JSON, not CSS. No
runtime/dynamic generation.

Current phase: schema + mapping done (`src/vscode-schema.js`,
`src/vscode-mapping.js`). Do NOT generate theme files yet; the VSCode
single-run + matrix generators are still TBD. `src/tui-schema.js`,
`src/md3-mapping.js`, `scripts/` are OpenCode-era legacy (readability
reference only).

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
  semantics (dark-only pitch-black; light half identical to plain).
- Hard lessons from `src/md3-mapping.js`: `*Container`/`on*Container`
  pair roles are variant roulette (flip across modes, contrast levels,
  and variants; high contrast turns every `on*Container` into a
  background-matching extreme); washes must be neutral containers, diff
  hue lives in text. Any VSCode mapping needs the same guard pass.
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

## Theme naming contract (proposed; no files generated yet)

VSCode has no dual-appearance file (`uiTheme` is per file), so the
OpenCode one-file-two-appearances rule cannot carry over. Proposal
(pending implementation; keep it stable once generation starts):

- File: `md3-{variant}-{hue}-{appearance}[-oled][-high|-reduced]-color-theme.json`
- All lowercase, single hyphens. `{variant}` is kebab-case (`tonal-spot`,
  `fruit-salad`, else lowercase); `{hue}` is the HCT hue number (`0-330`
  step `30`; `monochrome` only ships hue `0`).
- `{appearance}` is `light` (`uiTheme: vs`) or `dark` (`uiTheme: vs-dark`).
  `oled` only applies to `dark` files (pitch-black dark; the `light` half
  of the old dual file becomes the plain `light` file by construction).
- Matrix sources stay fixed HCT `C75 T50` (`Hct.from(hue, 75, 50)`).
  One-off hex sources use
  `md3-{variant}-{#hex}-{appearance}[-oled][-high|-reduced]-color-theme.json`
  instead.
- `''` (default contrast) = no suffix; `-high` = `contrastLevel: 1`
  (`uiTheme` stays `vs`/`vs-dark`; reserve `hc-black`/`hc-light` for a
  later dedicated HC pass if ever); `-reduced` = `contrastLevel: -1`.
- `name` inside each file (== picker label) mirrors the stem, e.g.
  `MD3 Expressive 120 Dark OLED` for `md3-expressive-120-dark-oled-color-theme.json`.
- NEVER use `:` in names/stems (`MD3:...`): Windows turns `a:b` into an
  NTFS alternate-data-stream file that git cannot check out.
- Matrix size if fully swept at default contrast: 97 combos
  (9 variants x 12 hues, monochrome hue `0` only) x plain/oled x
  light/dark = 388 files. Decide subset policy before generating; do not
  hand-generate one-offs outside the matrix script.

## Workflow (order matters; VSCode generation NOT started)

1. `src/vscode-schema.js` — DONE (v1 source of truth): 138 workbench
   color IDs (curated from `dark_modern.json`/`dark_vs.json`, incl. 6
   `menu.*` IDs so context menus use `surface` + `outlineVariant`
   border instead of the neutral fallback) + 25
   TextMate rules (scopes from `dark_vs.json`/`dark_plus.json`,
   `fontStyle` fixed here) + 4 semantic tokens (`newOperator`,
   `stringLiteral`, `customLiteral`, `numberLiteral`). Every emitted
   file must fill it exactly (fail closed on drift). IDs outside it
   fall back to VSCode defaults at runtime. `src/tui-schema.js` is
   LEGACY (OpenCode 50 `theme.*` keys); do not extend.
2. `src/vscode-mapping.js` — DONE (v1 source of truth):
   `resolveVscodeMapping(appearance, group, variant)` ->
   `{ colors, tokenRoles, semanticRoles }` (`BASE` + `STD`/`WASH`/
   `LIGHT_STD`/`DARK_STD`/`REDUCED`/`HIGH`/`MONOCHROME`, mirroring the
   `src/md3-mapping.js` structure). Reuses the neutral-wash + text-hue
   + container-roulette rules; roles restricted to the 55 roles shared
   by spec `2021`+`2025`; translucent `{ role, alpha }` only where the
   theme-color reference demands non-opaque. Borders stay `outlineVariant`
   throughout (a `outline` pass on chrome separators was previewed and
   reverted: too heavy, `outline` runs much darker than `outlineVariant`).
   Selection is opaque neutral
   (`surfaceContainerHighest` active / `surfaceContainerHigh` inactive):
   any mid-luminance tint washes syntax tokens out (translucent
   `primary@66` left nearly every token at ~3.3 and comments <3.0;
   opaque `primaryContainer` fails dark outright, e.g. Expressive-dark
   1.02); on neutral, text tokens hold >=4.5 and muted comments >=3.28
   with token colors surviving inside the selection. Semantic roles track
   their TextMate counterparts by construction. Verified: exact schema
   coverage x 54 combos (2 appearances x 3 groups x 9 variants), all
   roles in both spec sets, contrast sanity (text 4.5 / muted 3.0) on
   probed hues. `src/md3-mapping.js` is LEGACY (readability reference
   only).
3. `scripts/generate-vscode-theme.mjs` — DONE (v1 single-run VSCode
   generator; Bun-only, same reason as above). One run emits a light/dark
   pair (`md3-{variant}-{hue}-{light|dark}[-high|-reduced]-color-theme.json`,
   `vscode://schemas/color-theme`, static hex only, `oled: false`).
   Fails closed on mapping/schema drift + unknown roles + contrast
   violations (text 4.5, muted 3.0; reduced text 3.0 by design; alpha
   washes verified by construction). Usage:
   `bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150
   --out ./themes` (or `--source '#rrggbb'` instead of `--hue`).
   `scripts/generate-md3-tokens.mjs` is LEGACY (OpenCode dual-appearance);
   do not run for VSCode output.
4. `scripts/generate-md3-matrix.mjs --out ./tui` — LEGACY matrix driver
   (194 files). Do not run. The VSCode matrix driver is TBD (`--out
   ./themes`, split files, `include` strategy TBD, fail fast on guard).

## Generation stack (preserved for the future VSCode generator)

- Deps: `@sandlada/mcu-helper` + peer `@material/material-color-utilities`.
- `mcu-helper` is curried/functional: `createTheme(opts)(sourceHex)` ->
  `{ light, dark, palettes }` (ARGB ints, camelCase tokens).
- Default opts: `specVersion: '2025'` (59 tokens; `'2021'` is 55),
  `platform: 'phone'`, `contrastLevel: 0`. Only change variant/source
  per theme (plus the contrast the filename suffix declares); keep
  spec/platform consistent across all themes. Matrix hue sources are
  `Hct.from(hue, 75, 50)` (single runs may use any `--source` hex).
- Name suffixes map to opts: `oled` -> `oled: true` (dark file only);
  `-high` / `-reduced` -> `contrastLevel: 1` / `-1`; `''` ->
  `contrastLevel: 0`, no suffix.
- Never hand-pick colors: every workbench/token/semantic value must come
  from a resolved M3 role map, one resolved map per emitted file.
  Translucent `{ role, alpha }` values are still role-derived (alpha is a
  fixed `66` suffix, only where the theme-color reference demands
  non-opaque).

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
