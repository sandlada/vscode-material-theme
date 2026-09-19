# 编程语言配色（RULE）

规范性规则见 `AGENTS.md` 与 `src/vscode-syntax-palettes.js`；本文件只保留表格。

## Bank 参数

| 项 | 值 |
|---|---|
| Hues | `0, 30, …, 330`（步长 `30`，12 个） |
| Chroma | `75`（`TonalPalette.fromHueAndChroma(h, 75)`） |
| Tones | `0, 10, …, 100`（步长 `10`，11 个） |
| 总量 | 132 个 ARGB int，全局单例，9 variant 共用 |
| 中性 bank | `fromHueAndChroma(0, 0)`，只给 `comment`、`markdownQuote`、`operator` |
| 错误 hue | `0`，只给 `markupDeleted`、`invalid` |

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
| `markupDeleted` | 0 | text |
| `markupChanged` | 210 | text |
| `markdownRaw` | 150 | text |
| `markdownQuote` | neutral | muted |
| `link` | 240 | text |
| `diffHeader` | 210 | text |
| `invalid` | 0 | text |

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

## 已知残留（v1 接受）

| Pair | RGB 距离 | 条件 |
|---|---|---|
| `type` ~ `variable` 等 teal 簇（180/210/240） | ~25–28 | 明背景 |
| `keyword` ~ `tag`（270/300） | ~32 | 暗背景 |
| `type` ~ `string` | ~37 | high-light（text 压到 T30） |

## 文件索引

| 文件 | 职责 |
|---|---|
| `src/vscode-syntax-palettes.js` | Bank + 上表（source of truth） |
| `src/vscode-schema.js` | 26 scopes + `fontStyle`（冻结） |
| `src/vscode-mapping.js` | UI `colors`（token 常量 legacy） |
| `scripts/generate-vscode-theme.mjs` | 生成 + UI/语法双 guard |
| `scripts/probe-syntax-palettes.mjs` | 探针（只读） |
