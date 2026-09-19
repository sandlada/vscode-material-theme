# MD3 Themes for VSCode

[Material Design 3](https://m3.material.io/) (Material You) color themes
for [VSCode](https://code.visualstudio.com/).

> Status: the full default-contrast matrix ships in `themes/`
> (291 files: 9 variants x 12 HCT hues, Monochrome hue `0` only, x
> light/dark/dark-oled). Picker names are `MD3:{Variant} {hue}
> {Light|Dark|Dark OLED}`. Marketplace publishing is not done yet;
> expect colors and file layout to stay frozen, but packaging to change
> before the first stable release.

## Introduction

Ported from
[`@sandlada/opencode-material-theme`](https://github.com/sandlada/opencode-material-theme)
(static MD3 themes for the OpenCode TUI). That project ships one
 dual-appearance JSON per theme; VSCode needs split files instead
 (`uiTheme: vs` for light, `vs-dark` for dark), so each combo ships
 exactly three files:

 `md3-{variant}-{hue}-{light|dark|dark-oled}[-high|-reduced]-color-theme.json`

 There is NO `light-oled`: `mcu-helper` resolves OLED only against the
 dark scheme, so a light OLED file would be hex-identical to plain
 light and is never emitted. The dark OLED file is pitch-black on the
 editor surface (`background` + `surface` -> `#000000`, every other
 role unchanged). Picker names are `MD3:{Variant} {hue}
 {Light|Dark|Dark OLED}` (the `:` lives only in the display name —
 file stems stay colon-free for Windows/git).

Every file follows the
[Color Theme guide](https://code.visualstudio.com/api/extension-guides/color-theme)
shape (`$schema: vscode://schemas/color-theme`, `colors` +
`tokenColors` + `semanticTokenColors` with `semanticHighlighting: true`).
All colors are resolved from MD3 dynamic-color roles
(`@sandlada/mcu-helper` + `@material/material-color-utilities`,
`specVersion: '2025'`, `platform: 'phone'`); no hand-picked hex.
Generation is fail-closed: schema drift, unknown roles, and contrast
violations (text 4.5, muted 3.0; reduced text 3.0 by design) abort the
run instead of shipping an unreadable theme.

 Supported variants: `Monochrome`, `Neutral`, `TonalSpot`
 (`tonal-spot`), `Vibrant`, `Expressive`, `Fidelity`, `Content`,
 `Rainbow`, `FruitSalad` (`fruit-salad`). `Monochrome` ships only hue
 `0` (a single source, still all three appearances). Matrix hue sources
 are fixed HCT `C75 T50`; single runs also accept any lowercase
 `--source '#rrggbb'`.

## Installation

Prerequisites: [Bun](https://bun.sh/) (the generator is Bun-only;
plain Node cannot resolve the extensionless ESM imports in
`@material/material-color-utilities`).

```sh
cd vscode-material-theme
bun install
```

Then run the extension from source (no Marketplace release yet):

1. Open the folder in VSCode.
2. Press `F5` (`Run Extension` in `.vscode/launch.json`) to open an
   Extension Development Host.
3. Run `Preferences: Color Theme` and pick an `MD3 ...` theme.

To try a packaged build later: `vsce package` produces a `*.vsix`,
installable via `Extensions: Install from VSIX...`. Marketplace
publishing (`vsce publish`, category `Themes`) is still TBD.

## Usage

 Pick a theme with `Preferences: Color Theme` (`Ctrl+K Ctrl+T`).
 Only the themes registered under `contributes.themes` in
 `package.json` appear there — the full 291-file matrix
 (`Monochrome` hue `0` x light/dark/dark-oled plus 8 variants x 12
 hues x light/dark/dark-oled).
 Tune live with `workbench.colorCustomizations` +
 `editor.tokenColorCustomizations`, then freeze results back into a file
 with `Developer: Generate Color Theme From Current Settings`.

 Regenerate the full matrix into `./themes/` (rewrites
 `contributes.themes` to match):

 ```sh
 bun scripts/generate-vscode-matrix.mjs --out ./themes
 ```

 Generate a one-off light/dark pair or dark-OLED single into `./themes/`:

```sh
# Fixed HCT hue source (file stem uses the hue number)
bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150 --out ./themes

# Arbitrary hex source (file stem uses the hex)
bun scripts/generate-vscode-theme.mjs --variant Fidelity --source '#068f12' --out ./themes

# Non-default contrast and spec
bun scripts/generate-vscode-theme.mjs --variant TonalSpot --hue 150 --out ./themes --contrast high
bun scripts/generate-vscode-theme.mjs --variant Content --hue 90 --out ./themes --contrast reduced --spec 2021

 # OLED single instead of the plain pair (dark only; no light OLED)
 bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150 --out ./themes --oled
 ```

 Flags: `--variant` (one of the 9 above, PascalCase, required),
 `--hue 0-360` xor `--source '#rrggbb'` (lowercase, required),
 `--out` (required), `--oled` (value-less flag; emits ONLY the
 `*-dark-oled-*` file),
`--contrast default|high|reduced` (default
`default`; `-high` = `contrastLevel: 1`, `-reduced` = `-1`),
`--spec 2025|2021`, `--chroma` / `--tone` (hue-source tuning,
 defaults `75` / `50`). The matrix driver rewrites `contributes.themes`
 automatically; after a one-off single run, register the new files in
 `package.json` under `contributes.themes` (`label`, `uiTheme`,
 `path`) so the picker sees them.

 Not yet available: `hc-black` / `hc-light` high-contrast entries.
 Do not use `scripts/generate-md3-tokens.mjs` or
 `scripts/generate-md3-matrix.mjs` — they are OpenCode-era legacy for
 `./tui` output.

## License

MIT, copyright Kai-Orion & Sandlada. See `LICENSE`.
