# MD3 Themes for VSCode

[Material Design 3](https://m3.material.io/) (Material You) color themes
for [VSCode](https://code.visualstudio.com/).

Ported from
[`@sandlada/opencode-material-theme`](https://github.com/sandlada/opencode-material-theme)
(static MD3 themes for the OpenCode TUI). That project ships 194
dual-appearance JSONs (9 variants x 12 hues, plain + OLED); this project
will ship VSCode color-theme JSON instead (`vscode://schemas/color-theme`,
`colors` + `tokenColors` + `semanticTokenColors`, split light/dark files
with `uiTheme: vs` / `vs-dark`).

> Status: project + AGENTS port only. No theme files generated yet
> (`暂不生成主题`). See `AGENTS.md` for the VSCode contract, the proposed
> naming scheme, and the legacy OpenCode mapping to carry over.

## References

- Color Theme guide:
  `https://code.visualstudio.com/api/extension-guides/color-theme`
- Built-in themes manifest:
  `https://github.com/microsoft/vscode/tree/main/extensions/theme-defaults`
- Built-in theme files:
  `https://github.com/microsoft/vscode/tree/main/extensions/theme-defaults/themes`

## Install / Use

TBD. Distribution will be VSCode Marketplace (`vsce publish`, category
`Themes`) and/or `*.vsix` from GitHub Releases — not the old
`bin/install.mjs` copy-into-`~/.config/opencode/themes` path.

## Regenerate from source

TBD. The future VSCode generator keeps the MD3 stack
(`@sandlada/mcu-helper` + `@material/material-color-utilities`,
`specVersion: '2025'`, `platform: 'phone'`, HCT `C75 T50` hue sources)
but must emit split light/dark `*-color-theme.json` files into
`./themes/` with a fail-closed contrast guard. Current `src/` +
`scripts/` are still the OpenCode-era legacy; do not run them for VSCode
output.

## License

MIT, copyright Kai-Orion & Sandlada.
