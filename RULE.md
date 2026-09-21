# 编程语言配色（RULE）

规范性规则见 `AGENTS.md`、`src/vscode-syntax-palettes.js` 与 `src/vscode-semantic-palettes.js`；本文件只保留表格。

## Bank 参数

| 项 | 值 |
|---|---|
| Hues | `0, 30, …, 330`（步长 `30`，12 个） |
| Chroma | `75`（`TonalPalette.fromHueAndChroma(h, 75)`） |
| Tones | `0, 10, …, 100`（步长 `10`，11 个） |
| 总量 | 132 个 ARGB int，全局单例，9 variant 共用 |
| 中性 bank | `fromHueAndChroma(0, 0)`，只给 `comment`、`markdownQuote`、`operator` |
| 错误 hue | `30`（red family），只给 `markupDeleted`、`invalid`；与语义层 red 共用 |

## Hue / Tier 分配（26 rules）

| Token rule | Hue | Tier |
|---|---|---|
| `comment` | neutral | muted |
| `string` | 150 | text |
| `value` | 150 | text |
| `stringRegexp` | 330 | text |
| `number` | 30 | text |
| `constant` | 60 | text |
| `keyword` | 270 | text |
| `keywordControl` | 240 | text |
| `operator` | neutral | text |
| `function` | 120 | text |
| `type` | 180 | text |
| `variable` | 210 | text |
| `property` | 90 | text |
| `tag` | 300 | text |
| `interpolation` | 300 | text |
| `markupHeading` | 270 | text |
| `markupBold` | 270 | text |
| `markupItalic` | 270 | text |
| `markupInserted` | 150 | text |
| `markupDeleted` | 30 | text |
| `markupChanged` | 210 | text |
| `markdownRaw` | 150 | text |
| `markdownQuote` | neutral | muted |
| `link` | 240 | text |
| `diffHeader` | 210 | text |
| `invalid` | 30 | text |

## Tone 起点

| | text | muted |
|---|---|---|
| light | T40 | T50 |
| dark | T80 | T70 |

light 不达标往深走（−10 至 T0），dark 往浅走（+10 至 T100）；三个背景全过才停：`editor.background`、`editor.selectionBackground`、`editor.inactiveSelectionBackground`。

## 对比度 floor

| | default | reduced | high |
|---|---|---|---|
| text | 4.5 | 3.0 | 4.5 |
| muted | 3.0 | 3.0 | 3.0 |

## 语义跟随（同 hue 同 tone，生成器校验 hex 相等）

| Semantic | 跟随 |
|---|---|
| `newOperator` | `keywordControl` |
| `stringLiteral` | `string` |
| `customLiteral` | `function` |
| `numberLiteral` | `number` |

## 语义 Palette（git diff / problems；不随 variant 变）

来源 `src/vscode-semantic-palettes.js`，bank 与 syntax 共用（`src/vscode-palette-bank.js`，chroma 75；gray = neutral C0）。语义色**禁止**用 DynamicScheme role（hue-330 主题不能把「新增」画成品红）。

| 名称 | HCT hue | 状态 |
|---|---|---|
| red | 30 | deleted / conflicting / stageDeleted / error |
| amber | 60 | warning / stageModified |
| green | 150 | added / untracked |
| blue | 240 | modified / info / submodule |
| purple | 300 | renamed |
| gray | neutral | ignored（muted tier） |

冻结 tone（`SEMANTIC_TONES`，实测最坏值见 `scripts/probe-semantic-palettes.mjs`）：

| group | light text | light muted | dark text | dark muted |
|---|---|---|---|---|
| default | T30 (≥6.8) | T50 (≥3.3) | T70 (≥5.3) | T60 (≥3.9) |
| high | T30 (≥5.4) | T40 (≥3.8) | T80 (≥5.4) | T70 (≥4.0) |
| reduced | T30 | T50 | T70 | T60 |

diff wash（`tier: 'wash'`，`diffEditor.*Background` 专用，不随 variant 变）：light T90 / dark T30，三组 contrast 共用；`inserted*` green 150、`removed*` red 30，line `@66` / text `@99`。light T90 是全矩阵 syntax 全过的最濃可用淺色（T80 綠-on-綠差 0.06，137 失敗）；dark T30 距離 ≥62 且貼近編輯器底色。

- `editorOverviewRuler.*`（含 error/warning/info）＝ palette 色 + alpha `99`（对应 VSCode `hi(color, .6)`）；`editorGutter.*SecondaryBackground` 同样 `99`，其余 gutter / `gitDecoration.*` 不透明。
- guard：text/muted 每个值对 `editor.background` / `sideBar.background` / `list.activeSelectionBackground` / `list.inactiveSelectionBackground` 都要达 floor（text 4.5、muted 3.0、reduced text 3.0）；wash 跳过不透明检查，改由生成器验 blend（`editor.foreground` + 26 syntax 在 `@66`/`@99` blend 上全过，inserted vs removed RGB 距离 ≥40），生成时 fail closed。
- 已验证 `97 combos × 3 contrast × light/dark/dark-oled`（`bun scripts/probe-semantic-palettes.mjs`）：最坏 text 5.33、muted 3.28；wash blend 最差 fg 5.05、syntax text 5.19 / muted 3.61，最小红绿距离 62。

## 滚动条滑块（必须半透明）

`scrollbarSlider.background/hoverBackground/activeBackground` = `onSurfaceVariant` @ alpha `66`/`99`/`b3`。VSCode 的滚动条淡入时在 overview ruler 之上（`.visible` 带 `z-index: 11`），不透明滑块会直接盖掉 git diff / problem 标记（用户回报）；生成器 guard 限制 alpha ≤ `b3`（保留 ≥30% 标记透出）。

## 已知残留（v1 接受）

| Pair | RGB 距离 | 条件 |
|---|---|---|
| `type` ~ `variable` 等 teal 簇（180/210/240） | ~25–28 | 明背景 |
| `keyword` ~ `tag`（270/300） | ~32 | 暗背景 |
| `type` ~ `string` | ~37 | high-light（text 压到 T30） |

## 文件索引

| 文件 | 职责 |
|---|---|
| `src/vscode-palette-bank.js` | 全域 tonal bank（12 hues × 11 tones + neutral） |
| `src/vscode-syntax-palettes.js` | syntax 的 hue/tier + adaptive tone walk |
| `src/vscode-semantic-palettes.js` | 語義 palette + 凍結 tone + guard |
| `src/vscode-schema.js` | 153 workbench IDs + 26 scopes + `fontStyle`（冻结） |
| `src/vscode-mapping.js` | UI `colors`（role / `{role,alpha}` / `{palette,tier,alpha}`） |
| `scripts/generate-vscode-theme.mjs` | 生成 + UI/語法/語義/滑塊 guard |
| `scripts/probe-syntax-palettes.mjs` | syntax 探针（只读） |
| `scripts/probe-semantic-palettes.mjs` | 語義 探针（只读） |
