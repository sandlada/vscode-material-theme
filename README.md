# MD3 Themes for VSCode

[Material Design 3](https://m3.material.io/) (Material You) color themes
for [VSCode](https://code.visualstudio.com/).

> Status: under active development. The single-run generator works
> (plain + OLED pairs) and sample themes ship in `themes/`, but the full
> matrix sweep and Marketplace publishing are not done yet. Expect theme
> names, colors, and file layout to change before the first stable
> release.

## Introduction

Ported from
[`@sandlada/opencode-material-theme`](https://github.com/sandlada/opencode-material-theme)
(static MD3 themes for the OpenCode TUI). That project ships one
dual-appearance JSON per theme; VSCode needs split files instead
(`uiTheme: vs` for light, `vs-dark` for dark), so each run of the
generator emits a light/dark pair:

`md3-{variant}-{hue}-{light|dark}[-oled][-high|-reduced]-color-theme.json`

OLED pairs add the `-oled` segment (`...-dark-oled-color-theme.json`,
picker label `... Dark OLED`). The dark OLED file is pitch-black
(`background` + `surface` -> `#000000`, every other role unchanged);
the light OLED file is hex-identical to the plain light file by
construction (`mcu-helper` resolves OLED only against the dark scheme)
and ships under its own stem so both appearances stay selectable.

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
`Rainbow`, `FruitSalad` (`fruit-salad`). Matrix hue sources are fixed
HCT `C75 T50`; single runs also accept any lowercase `--source '#rrggbb'`.

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
`package.json` appear there — currently 8 samples
(`Expressive` / `Fidelity` / `TonalSpot` x hue `150` x light/dark, plus
the `Expressive` 150 light-OLED / dark-OLED pair).
Tune live with `workbench.colorCustomizations` +
`editor.tokenColorCustomizations`, then freeze results back into a file
with `Developer: Generate Color Theme From Current Settings`.

Generate a new light/dark pair into `./themes/`:

```sh
# Fixed HCT hue source (file stem uses the hue number)
bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150 --out ./themes

# Arbitrary hex source (file stem uses the hex)
bun scripts/generate-vscode-theme.mjs --variant Fidelity --source '#068f12' --out ./themes

# Non-default contrast and spec
bun scripts/generate-vscode-theme.mjs --variant TonalSpot --hue 150 --out ./themes --contrast high
bun scripts/generate-vscode-theme.mjs --variant Content --hue 90 --out ./themes --contrast reduced --spec 2021

# OLED pair instead of the plain pair
bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150 --out ./themes --oled
```

Flags: `--variant` (one of the 9 above, PascalCase, required),
`--hue 0-360` xor `--source '#rrggbb'` (lowercase, required),
`--out` (required), `--oled` (value-less flag; emits the `-oled` pair),
`--contrast default|high|reduced` (default
`default`; `-high` = `contrastLevel: 1`, `-reduced` = `-1`),
`--spec 2025|2021`, `--chroma` / `--tone` (hue-source tuning,
defaults `75` / `50`). After generating, register the new files in
`package.json` under `contributes.themes` (`label`, `uiTheme`,
`path`) so the picker sees them.

Not yet available: the full-theme matrix driver (`--out ./themes`
sweep) and `hc-black` / `hc-light` high-contrast
entries. Do not use `scripts/generate-md3-tokens.mjs` or
`scripts/generate-md3-matrix.mjs` — they are OpenCode-era legacy for
`./tui` output.

## License

MIT, copyright Kai-Orion & Sandlada. See `LICENSE`.
