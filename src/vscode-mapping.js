/**
 * M3 -> VSCode color-theme mapping (source of truth, v1).
 *
 * Maps every {@link VSCODE_COLOR_KEYS} workbench ID, every
 * {@link VSCODE_TOKEN_RULE_KEYS} TextMate rule, and every
 * {@link VSCODE_SEMANTIC_KEYS} semantic token to one Material Design 3
 * dynamic-color role (camelCase, as returned by
 * `createTheme(opts)(source)` `light`/`dark` maps) or, for git diff +
 * problem semantics, to one fixed tonal-palette value.
 *
 * Values are one of three shapes:
 * - role string — a DynamicScheme role, resolved per variant/appearance
 *   (all chrome + text);
 * - `{ role, alpha }` — a translucent role (2-digit hex alpha). The alpha
 *   form is for IDs whose theme-color reference says the color "must not
 *   be opaque" (annotations shine through: selections, find/hover/range
 *   highlights, bracket match, drop backgrounds, diff washes) PLUS the
 *   `scrollbarSlider.*` trio: VSCode fades the scrollbar in ABOVE the
 *   overview-ruler canvas (`.visible` carries `z-index: 11`), so an
 *   opaque slider hides git diff / problem marks (user-reported defect).
 *   VSCode's own defaults are translucent (`#797979` @ 40% etc.); the
 *   generator caps sliders at alpha `b3`.
 * - `{ palette, tier, alpha? }` — a FIXED tonal-palette color
 *   (`src/vscode-semantic-palettes.js`) for git diff + problem semantics
 *   only. These must NOT follow the theme hue (a hue-330 theme would paint
 *   "added" pink), so they resolve from the shared palette bank at frozen
 *   tones and are identical across all shipped themes.
 *
 * Lessons carried over from `src/md3-mapping.js` (OpenCode-era, kept as
 * the readability reference):
 * - Only symbolic M3 roles, never hand-picked hex. Chrome hues follow the
 *   source color by design (no guaranteed red/green/cyan for chrome —
 *   which is why git diff + problem semantics use the fixed palette layer
 *   instead; ANSI colors stay out of schema V1 for the same reason).
 * - `*Container`/`on*Container` pair roles are variant roulette across
 *   modes, contrast levels, and variants; high contrast turns every
 *   `on*Container` into a background-matching extreme. `on*Container`
 *   foregrounds therefore never appear in BASE; the last standard-contrast
 *   consumers (warning foregrounds) moved to the fixed `amber` palette.
 * - Washes stay neutral (`surfaceContainer*`): vivid variants push
 *   `tertiaryContainer`/`errorContainer` too saturated for washes, and
 *   tinted diff washes failed on some variant. Diff hue survives through
 *   git-decoration + diff token text roles.
 * - Selection backgrounds are opaque neutral steps (`surfaceContainerHighest`
 *   active / `surfaceContainerHigh` inactive), NOT tinted and NOT translucent:
 *   any mid-luminance tint washes syntax tokens out (translucent `primary@66`
 *   left nearly every token at ~3.3 and comments <3.0 in all 6 test themes;
 *   opaque `primaryContainer` fails dark outright, e.g. Expressive-dark 1.02).
 *   On neutral opaque the text tokens hold >=4.5 and muted comments hold
 *   >=3.28 across variants/modes (6-theme probe), and token colors survive
 *   inside the selection (no `editor.selectionForeground` override). List active/inactive follow
 *   the same Highest/High steps so the two states stay distinct.
 * - Top-level popups (quick input, context menus, dropdown lists,
 *   notifications) use the brightest surface role — `surfaceBright` in both
 *   appearances (light: equals `surface` T98, keeps the theme tint instead
 *   of stark `surfaceContainerLowest` white; dark: T24, above every
 *   container step). Popup-internal selections step DOWN in dark
 *   (`surfaceContainerHigh`) because `surfaceBright` outranks
 *   `surfaceContainerHighest`; light keeps `surfaceContainerHighest`.
 * - Diff/problem semantics are FIXED palettes, never DynamicScheme roles:
 *   meaning (added = green, deleted = red, error = red) must survive every
 *   variant, including Monochrome. Gutter bars + overview ruler marks +
 *   explorer labels all draw from the same named palettes (red 30,
 *   amber 60, green 150, blue 240, purple 300, gray neutral); ruler marks
 *   are the palette color at alpha `99` (VSCode's `hi(gutterColor, .6)`).
 * - Roles are restricted to the 55 roles present in BOTH `specVersion`
 *   `'2021'` and `'2025'` (the 2025-only `*Dim` roles are never used),
 *   so one mapping stays valid across spec versions.
 *
 * @typedef {string | { role: string, alpha: string } | { palette: string, tier: 'text' | 'muted', alpha?: string }} VscodeColorValue
 * @typedef {Record<string, VscodeColorValue>} VscodeColorMap workbench ID -> M3 role / fixed palette
 * @typedef {Record<string, string>} VscodeTokenMap token rule -> M3 role
 * @typedef {Record<string, string>} VscodeSemanticMap semantic token -> M3 role
 * @typedef {'light' | 'dark'} VscodeAppearance
 * @typedef {'default' | 'reduced' | 'high'} VscodeContrastGroup
 */

/** Appearance- and contrast-neutral workbench entries. */
export const VSCODE_COLOR_BASE = Object.freeze({
    // Base chrome + text
    focusBorder: 'primary',
    foreground: 'onSurface',
    disabledForeground: 'outline',
    descriptionForeground: 'onSurfaceVariant',
    // Diagnostics text: FIXED red/amber/blue palettes, not scheme roles —
    // an error must read red in every variant (semantic layer header).
    errorForeground: { palette: 'red', tier: 'text' },
    'icon.foreground': 'onSurface',
    'widget.border': 'outlineVariant',
    'widget.shadow': 'shadow',
    'selection.background': 'surfaceContainerHighest',
    'sash.hoverBorder': 'primary',
    // Buttons + checkboxes
    'button.background': 'primary',
    'button.foreground': 'onPrimary',
    'button.border': 'outlineVariant',
    'button.separator': 'outlineVariant',
    'button.hoverBackground': 'primary',
    'button.secondaryBackground': 'surfaceContainerHighest',
    'button.secondaryForeground': 'onSurface',
    'button.secondaryHoverBackground': 'surfaceContainerHighest',
    'checkbox.background': 'surfaceContainerHighest',
    'checkbox.border': 'outline',
    // Dropdowns + inputs
    'dropdown.background': 'surfaceContainerHighest',
    'dropdown.border': 'outlineVariant',
    'dropdown.foreground': 'onSurface',
    'input.background': 'surfaceContainerHighest',
    'input.border': 'outlineVariant',
    'input.foreground': 'onSurface',
    'input.placeholderForeground': 'onSurfaceVariant',
    // Scrollbar slider: MUST stay translucent (generator caps alpha at
    // `b3`). VSCode fades the scrollbar in ABOVE the overview-ruler canvas,
    // so an opaque slider hides git diff / problem marks (user-reported
    // defect); VSCode's own defaults are translucent (`#797979` @ 40%).
    'scrollbarSlider.background': { role: 'onSurfaceVariant', alpha: '66' },
    'scrollbarSlider.hoverBackground': { role: 'onSurfaceVariant', alpha: '99' },
    'scrollbarSlider.activeBackground': { role: 'onSurfaceVariant', alpha: 'b3' },
    'badge.background': 'primary',
    'badge.foreground': 'onPrimary',
    'progressBar.background': 'primary',
    // Lists + trees (selection foreground is onSurface on the neutral
    // selection step; active Highest vs inactive High keeps states distinct)
    'list.activeSelectionBackground': 'surfaceContainerHighest',
    'list.activeSelectionForeground': 'onSurface',
    'list.inactiveSelectionBackground': 'surfaceContainerHigh',
    'list.inactiveSelectionForeground': 'onSurface',
    'list.hoverBackground': 'surfaceContainerHigh',
    'list.hoverForeground': 'onSurface',
    'list.focusOutline': 'primary',
    'list.highlightForeground': 'primary',
    'list.errorForeground': { palette: 'red', tier: 'text' },
    'list.warningForeground': { palette: 'amber', tier: 'text' },
    // Activity bar
    'activityBar.background': 'surfaceContainer',
    'activityBar.foreground': 'onSurface',
    'activityBar.inactiveForeground': 'onSurfaceVariant',
    'activityBar.border': 'outlineVariant',
    'activityBar.activeBorder': 'primary',
    'activityBarBadge.background': 'primary',
    'activityBarBadge.foreground': 'onPrimary',
    // Side bar
    'sideBar.background': 'surfaceContainer',
    'sideBar.foreground': 'onSurface',
    'sideBar.border': 'outlineVariant',
    'sideBarTitle.foreground': 'onSurface',
    'sideBarSectionHeader.background': 'surfaceContainer',
    'sideBarSectionHeader.foreground': 'onSurfaceVariant',
    'sideBarSectionHeader.border': 'outlineVariant',
    // Editor groups + tabs
    'editorGroup.border': 'outlineVariant',
    'editorGroupHeader.tabsBackground': 'surfaceContainer',
    'editorGroupHeader.tabsBorder': 'outlineVariant',
    'tab.activeBackground': 'surface',
    'tab.activeForeground': 'onSurface',
    'tab.activeBorderTop': 'primary',
    'tab.inactiveBackground': 'surfaceContainerHigh',
    'tab.inactiveForeground': 'onSurfaceVariant',
    'tab.hoverBackground': 'surfaceContainerHighest',
    'tab.border': 'outlineVariant',
    'tab.unfocusedActiveBackground': 'surfaceContainer',
    // Editor core
    'editor.background': 'surface',
    'editor.foreground': 'onSurface',
    'editorLineNumber.activeForeground': 'onSurface',
    'editorCursor.foreground': 'primary',
    'editor.selectionBackground': 'surfaceContainerHighest',
    'editor.inactiveSelectionBackground': 'surfaceContainerHigh',
    'editor.lineHighlightBackground': 'surfaceContainer',
    'editorWhitespace.foreground': 'outlineVariant',
    'editorIndentGuide.background': 'outlineVariant',
    'editorIndentGuide.activeBackground': 'outline',
    'editorBracketMatch.border': 'outline',
    // Diagnostics + git gutter bars: FIXED palettes (semantic layer), never
    // scheme roles; the secondary bars are the staged half (translucent
    // `99`, like VSCode's own `.5`/`.7` defaults).
    'editorError.foreground': { palette: 'red', tier: 'text' },
    'editorWarning.foreground': { palette: 'amber', tier: 'text' },
    'editorInfo.foreground': { palette: 'blue', tier: 'text' },
    'editorGutter.addedBackground': { palette: 'green', tier: 'text' },
    'editorGutter.modifiedBackground': { palette: 'blue', tier: 'text' },
    'editorGutter.deletedBackground': { palette: 'red', tier: 'text' },
    'editorGutter.addedSecondaryBackground': { palette: 'green', tier: 'text', alpha: '99' },
    'editorGutter.modifiedSecondaryBackground': { palette: 'blue', tier: 'text', alpha: '99' },
    'editorGutter.deletedSecondaryBackground': { palette: 'red', tier: 'text', alpha: '99' },
    // Overview ruler marks (scrollbar strip): same palette language as the
    // gutter bars, alpha `99` mirrors VSCode's `hi(gutterColor, .6)`.
    'editorOverviewRuler.addedForeground': { palette: 'green', tier: 'text', alpha: '99' },
    'editorOverviewRuler.modifiedForeground': { palette: 'blue', tier: 'text', alpha: '99' },
    'editorOverviewRuler.deletedForeground': { palette: 'red', tier: 'text', alpha: '99' },
    'editorOverviewRuler.errorForeground': { palette: 'red', tier: 'text', alpha: '99' },
    'editorOverviewRuler.warningForeground': { palette: 'amber', tier: 'text', alpha: '99' },
    'editorOverviewRuler.infoForeground': { palette: 'blue', tier: 'text', alpha: '99' },
    // Git decorations (explorer labels): one fixed palette per state; states
    // share palettes where VSCode does (added/untracked green, info/modified
    // blue, deleted/conflicting/stageDeleted red).
    'gitDecoration.addedResourceForeground': { palette: 'green', tier: 'text' },
    'gitDecoration.modifiedResourceForeground': { palette: 'blue', tier: 'text' },
    'gitDecoration.deletedResourceForeground': { palette: 'red', tier: 'text' },
    'gitDecoration.renamedResourceForeground': { palette: 'purple', tier: 'text' },
    'gitDecoration.untrackedResourceForeground': { palette: 'green', tier: 'text' },
    'gitDecoration.ignoredResourceForeground': { palette: 'gray', tier: 'muted' },
    'gitDecoration.conflictingResourceForeground': { palette: 'red', tier: 'text' },
    'gitDecoration.stageModifiedResourceForeground': { palette: 'amber', tier: 'text' },
    'gitDecoration.stageDeletedResourceForeground': { palette: 'red', tier: 'text' },
    'gitDecoration.submoduleResourceForeground': { palette: 'blue', tier: 'text' },
    // Terminal (panel or editor area): shares the editor surface, like the
    // panel views below.
    'terminal.background': 'surface',
    'terminal.foreground': 'onSurface',
    'terminalCursor.foreground': 'primary',
    'terminal.selectionBackground': 'surfaceContainerHighest',
    // Status bar + title bar
    'statusBar.background': 'surfaceContainer',
    'statusBar.foreground': 'onSurface',
    'statusBar.border': 'outlineVariant',
    'statusBarItem.hoverBackground': 'surfaceContainerHigh',
    'statusBar.debuggingBackground': 'error',
    'statusBar.debuggingForeground': 'onError',
    'statusBar.noFolderBackground': 'surfaceContainer',
    'titleBar.activeBackground': 'surfaceContainer',
    'titleBar.activeForeground': 'onSurface',
    'titleBar.inactiveBackground': 'surfaceContainerLow',
    'titleBar.inactiveForeground': 'onSurfaceVariant',
    'titleBar.border': 'outlineVariant',
    // Panel views (Problems / Output / Debug Console / Terminal / Ports)
    // share the editor surface so the editing area + panel read as ONE
    // continuous sheet; `panel.border` (outlineVariant) keeps the separator.
    'panel.background': 'surface',
    'panel.border': 'outlineVariant',
    'panelTitle.activeBorder': 'primary',
    'panelTitle.activeForeground': 'onSurface',
    'panelTitle.inactiveForeground': 'onSurfaceVariant',
    // Quick input + notifications (popup layer, see `*_POPUP` constants)
    'quickInput.foreground': 'onSurface',
    'notifications.border': 'outlineVariant',
    'notifications.foreground': 'onSurface',
    // Markdown text UI
    'textLink.foreground': 'primary',
    'textLink.activeForeground': 'primary',
    'textBlockQuote.background': 'surfaceContainerHigh',
    'textBlockQuote.border': 'outlineVariant',
    // Code blocks sit directly on the editor surface: `surfaceContainerLowest`
    // (one step below `surface`) instead of `surfaceContainerHigh` — High
    // reads as a saturated tint box in vivid variants (e.g. Expressive).
    // NOTE: on OLED dark the editor is already `#000000`, so the block
    // boundary disappears there and only token colors mark code spans.
    'textCodeBlock.background': 'surfaceContainerLowest',
    // Menus (context/right-click): subtle border, neutral selection step
    // shared with list selection. Body role is appearance-scoped
    // (top-level popup, see `VSCODE_COLOR_*_ELEVATED` below).
    'menu.foreground': 'onSurface',
    'menu.selectionForeground': 'onSurface',
    'menu.separatorBackground': 'outlineVariant',
    'menu.border': 'outlineVariant'
});

/**
 * Top-level popup layer (z-highest surfaces + their inset selection steps):
 * quick input / command palette, context menus, dropdown lists, notification
 * toasts. Elevation is z-order, so the top-most surface uses the brightest
 * surface role — `surfaceBright` in BOTH appearances (light: T98, i.e. the
 * app surface tone itself, no stark white and no recessed container tint;
 * dark: T24, above every container step).
 *
 * Because dark `surfaceBright` (T24) sits ABOVE `surfaceContainerHighest`
 * (T22), a popup-internal selection must step DOWN or it becomes invisible
 * (delta L 2): dark uses `surfaceContainerHigh` (T17, clear of the popup
 * surface and of `list.hoverBackground`), light uses
 * `surfaceContainerHighest` (T90). Sidebar/list selections on the container
 * surfaces keep their own steps — they are not popups.
 * Mode constants, applied to every contrast group.
 */
export const VSCODE_COLOR_LIGHT_POPUP = Object.freeze({
    'dropdown.listBackground': 'surfaceBright',
    'menu.background': 'surfaceBright',
    'quickInput.background': 'surfaceBright',
    'notifications.background': 'surfaceBright',
    'menu.selectionBackground': 'surfaceContainerHighest',
    'quickInputList.focusBackground': 'surfaceContainerHighest'
});

export const VSCODE_COLOR_DARK_POPUP = Object.freeze({
    'dropdown.listBackground': 'surfaceBright',
    'menu.background': 'surfaceBright',
    'quickInput.background': 'surfaceBright',
    'notifications.background': 'surfaceBright',
    'menu.selectionBackground': 'surfaceContainerHigh',
    'quickInputList.focusBackground': 'surfaceContainerHigh'
});

/** Translucent washes + drop feedback (both appearances, all contrasts).
 * Alpha `66` follows the `dark_modern.json` match-highlight convention.
 * Selection is intentionally NOT here (opaque neutral steps, see header). */
export const VSCODE_COLOR_WASH = Object.freeze({
    'editor.findMatchBackground': { role: 'primary', alpha: '66' },
    'editor.findMatchHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editor.hoverHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editor.rangeHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editorBracketMatch.background': { role: 'secondaryContainer', alpha: '66' },
    'editorGroup.dropBackground': { role: 'primary', alpha: '66' }
});

/** Standard-contrast light-only diff washes (neutral containers). */
export const VSCODE_COLOR_LIGHT_STD = Object.freeze({
    'diffEditor.insertedTextBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.removedTextBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.insertedLineBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.removedLineBackground': { role: 'surfaceContainerHigh', alpha: '66' }
});

/** Standard-contrast dark-only diff washes (neutral containers). */
export const VSCODE_COLOR_DARK_STD = Object.freeze({
    'diffEditor.insertedTextBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.removedTextBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.insertedLineBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.removedLineBackground': { role: 'surfaceContainerHighest', alpha: '66' }
});

/**
 * Reduced-only entries (both appearances). Reduced softens `outline`
 * below the muted floor, so outline-only text steps up to
 * `onSurfaceVariant`. Borders keep `outline` (decorative, unchecked).
 */
export const VSCODE_COLOR_REDUCED = Object.freeze({
    'editorLineNumber.foreground': 'onSurfaceVariant'
});

/** Base line-number color (muted text); see REDUCED above. */
export const VSCODE_COLOR_LINE_NUMBER_BASE = Object.freeze({
    'editorLineNumber.foreground': 'outline'
});

/**
 * Monochrome-only entries (both appearances). The monochrome scheme has
 * no hue to carry washes, so diff washes use the strongest neutral step
 * in both appearances.
 */
export const VSCODE_COLOR_MONOCHROME = Object.freeze({
    'diffEditor.insertedTextBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.removedTextBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.insertedLineBackground': { role: 'surfaceContainerHighest', alpha: '66' },
    'diffEditor.removedLineBackground': { role: 'surfaceContainerHighest', alpha: '66' }
});

/**
 * High-contrast entries (both appearances). `*Container` diff washes fall
 * back to one neutral step (the warning foregrounds that used to override
 * here are fixed-palette `amber` now, see header).
 */
export const VSCODE_COLOR_HIGH = Object.freeze({
    'diffEditor.insertedTextBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.removedTextBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.insertedLineBackground': { role: 'surfaceContainerHigh', alpha: '66' },
    'diffEditor.removedLineBackground': { role: 'surfaceContainerHigh', alpha: '66' }
});

/** Token rule -> M3 role at standard contrast (both appearances). */
export const VSCODE_TOKEN_BASE = Object.freeze({
    comment: 'outline',
    string: 'tertiary',
    value: 'tertiary',
    stringRegexp: 'error',
    number: 'onSecondaryContainer',
    constant: 'secondary',
    keyword: 'secondary',
    keywordControl: 'primary',
    operator: 'onSurfaceVariant',
    function: 'primary',
    type: 'secondary',
    variable: 'tertiary',
    // JSON keys / CSS properties / HTML attributes / Python dict keys.
    // Must differ from `string` (keys and string values would be one wash:
    // both were `tertiary`). `primary` mirrors Dark+ accent-keys semantics;
    // grammar scope is `string.json support.type.property-name.json`, so the
    // longer `support.type.property-name` selector keeps winning over `string`.
    property: 'primary',
    tag: 'secondary',
    interpolation: 'secondary',
    markupHeading: 'primary',
    markupBold: 'primary',
    markupItalic: 'primary',
    markupInserted: 'tertiary',
    markupDeleted: 'error',
    markupChanged: 'secondary',
    markdownRaw: 'tertiary',
    markdownQuote: 'outline',
    // Link URLs (`markup.underline.link.markdown`, incl. autolinks): accent
    // + underline, mirroring `dark_vs.json` underline semantics and the
    // `textLink` workbench color. Without this they fall back to editor fg.
    link: 'primary',
    diffHeader: 'secondary',
    invalid: 'error'
});

/**
 * Reduced-only token entries. Mirrors the OpenCode reduced rule: the two
 * outline-only text rules step up to `onSurfaceVariant`.
 */
export const VSCODE_TOKEN_REDUCED = Object.freeze({
    comment: 'onSurfaceVariant',
    markdownQuote: 'onSurfaceVariant'
});

/**
 * High-contrast token entries. Mirrors the OpenCode high rule: every
 * `on*Container` text role becomes a bg-safe extreme, while `*Container`
 * fills become text-safe mid-tones.
 */
export const VSCODE_TOKEN_HIGH = Object.freeze({
    string: 'primaryContainer',
    number: 'secondary',
    type: 'primary'
});

/** Monochrome-only token entries (both appearances). */
export const VSCODE_TOKEN_MONOCHROME = Object.freeze({
    type: 'secondary'
});

/**
 * Per-(variant, appearance) `property` (JSON keys, CSS props, ...) overrides.
 *
 * No single role separates keys from strings AND editor foreground across
 * variants (measured @hue150, RGB distance; contrast all >= 4.5):
 * - `primary` is near-`onSurface` in Expressive dark (22) and collides
 *   nowhere else as badly, but washes out where it matters most;
 * - `secondary` collides with `tertiary` strings in Expressive (36/45);
 * - pastel variants (TonalSpot/Neutral light) collide under every text role.
 * Winners below maximize min(dist to fg, dist to strings); residuals
 * (Neutral/TonalSpot light) are documented, not solvable with text roles.
 * Key: `${variantName}:${appearance}` (PascalCase variant, as passed in).
 */
export const VSCODE_TOKEN_PROPERTY_TWEAKS = Object.freeze({
    'Monochrome:light': { property: 'secondary' },
    'Neutral:dark': { property: 'secondary' },
    'Neutral:light': { property: 'onSurfaceVariant' },
    'TonalSpot:dark': { property: 'onSurfaceVariant' },
    'TonalSpot:light': { property: 'onSurfaceVariant' },
    'Vibrant:light': { property: 'onSurfaceVariant' },
    'Expressive:dark': { property: 'onSurfaceVariant' },
    'Expressive:light': { property: 'onSurfaceVariant' }
});

/**
 * Workbench `colors` source of truth. Token/semantic constants below are
 * LEGACY (kept for reference; the generator resolves syntax from
 * `src/vscode-syntax-palettes.js` instead, which is contrast-guarded).
 *
 * @param {VscodeAppearance} appearance
 * @param {VscodeContrastGroup} contrastGroup
 * @param {string} variantName PascalCase MCU variant name (`Monochrome`, …)
 * @returns {{ colors: Record<string, VscodeColorValue>, tokenRoles: VscodeTokenMap, semanticRoles: VscodeSemanticMap }}
 *   one resolved map per emitted file (token/semantic maps unused by generator).
 */
export function resolveVscodeMapping(appearance, contrastGroup, variantName) {
    const monoColor = variantName === 'Monochrome' ? VSCODE_COLOR_MONOCHROME : {};
    const monoToken = variantName === 'Monochrome' ? VSCODE_TOKEN_MONOCHROME : {};
    const propTweak = VSCODE_TOKEN_PROPERTY_TWEAKS[`${variantName}:${appearance}`] ?? {};
    const modeWash = appearance === 'light' ? VSCODE_COLOR_LIGHT_STD : VSCODE_COLOR_DARK_STD;
    const modePopup = appearance === 'light' ? VSCODE_COLOR_LIGHT_POPUP : VSCODE_COLOR_DARK_POPUP;
    if (contrastGroup === 'high') {
        const tokenRoles = Object.freeze({ ...VSCODE_TOKEN_BASE, ...VSCODE_TOKEN_HIGH, ...monoToken, ...propTweak });
        return {
            colors: Object.freeze({ ...VSCODE_COLOR_BASE, ...modePopup, ...VSCODE_COLOR_LINE_NUMBER_BASE, ...VSCODE_COLOR_WASH, ...VSCODE_COLOR_HIGH, ...monoColor }),
            tokenRoles,
            semanticRoles: Object.freeze({
                newOperator: tokenRoles.keywordControl,
                stringLiteral: tokenRoles.string,
                customLiteral: tokenRoles.function,
                numberLiteral: tokenRoles.number
            })
        };
    }
    const tokenRoles = contrastGroup === 'reduced'
        ? Object.freeze({ ...VSCODE_TOKEN_BASE, ...VSCODE_TOKEN_REDUCED, ...monoToken, ...propTweak })
        : Object.freeze({ ...VSCODE_TOKEN_BASE, ...monoToken, ...propTweak });
    const reducedColor = contrastGroup === 'reduced' ? VSCODE_COLOR_REDUCED : {};
    return {
        colors: Object.freeze({ ...VSCODE_COLOR_BASE, ...modePopup, ...VSCODE_COLOR_LINE_NUMBER_BASE, ...VSCODE_COLOR_WASH, ...modeWash, ...reducedColor, ...monoColor }),
        tokenRoles,
        semanticRoles: Object.freeze({
            newOperator: tokenRoles.keywordControl,
            stringLiteral: tokenRoles.string,
            customLiteral: tokenRoles.function,
            numberLiteral: tokenRoles.number
        })
    };
}
