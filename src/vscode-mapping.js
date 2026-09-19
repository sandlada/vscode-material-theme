/**
 * M3 -> VSCode color-theme mapping (source of truth, v1).
 *
 * Maps every {@link VSCODE_COLOR_KEYS} workbench ID, every
 * {@link VSCODE_TOKEN_RULE_KEYS} TextMate rule, and every
 * {@link VSCODE_SEMANTIC_KEYS} semantic token to one Material Design 3
 * dynamic-color role (camelCase, as returned by
 * `createTheme(opts)(source)` `light`/`dark` maps).
 *
 * Values are either a role string or `{ role, alpha }` (alpha is a 2-digit
 * hex suffix). The alpha form is ONLY for IDs whose theme-color reference
 * says the color "must not be opaque" (annotations shine through:
 * selections, find/hover/range highlights, bracket match, drop
 * backgrounds, diff washes). All other IDs are opaque static hex.
 *
 * Lessons carried over from `src/md3-mapping.js` (OpenCode-era, kept as
 * the readability reference):
 * - Only symbolic M3 roles, never hand-picked hex. Hues follow the source
 *   color by design (no guaranteed red/green/cyan; ANSI colors stay out
 *   of schema V1 for the same reason).
 * - `*Container`/`on*Container` pair roles are variant roulette across
 *   modes, contrast levels, and variants; high contrast turns every
 *   `on*Container` into a background-matching extreme. Therefore
 *   `on*Container` foregrounds only appear in the STD group (with HIGH
 *   overrides), never in BASE.
 * - Washes stay neutral (`surfaceContainer*`): vivid variants push
 *   `tertiaryContainer`/`errorContainer` too saturated for washes, and
 *   tinted diff washes failed on some variant. Diff hue survives through
 *   git-decoration + diff token text roles.
 * - Roles are restricted to the 55 roles present in BOTH `specVersion`
 *   `'2021'` and `'2025'` (the 2025-only `*Dim` roles are never used),
 *   so one mapping stays valid across spec versions.
 *
 * @typedef {string | { role: string, alpha: string }} VscodeColorValue
 * @typedef {Record<string, string>} VscodeColorMap workbench ID -> M3 role
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
    errorForeground: 'error',
    'icon.foreground': 'onSurface',
    'widget.border': 'outlineVariant',
    'widget.shadow': 'shadow',
    'selection.background': 'secondaryContainer',
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
    'dropdown.listBackground': 'surfaceContainerHigh',
    'input.background': 'surfaceContainerHighest',
    'input.border': 'outlineVariant',
    'input.foreground': 'onSurface',
    'input.placeholderForeground': 'onSurfaceVariant',
    // Scrollbar + badges + progress
    'scrollbarSlider.background': 'surfaceContainerHighest',
    'scrollbarSlider.hoverBackground': 'outlineVariant',
    'scrollbarSlider.activeBackground': 'outline',
    'badge.background': 'primary',
    'badge.foreground': 'onPrimary',
    'progressBar.background': 'primary',
    // Lists + trees (selection/warning foregrounds are STD: on*Container)
    'list.activeSelectionBackground': 'secondaryContainer',
    'list.inactiveSelectionBackground': 'surfaceContainerHighest',
    'list.inactiveSelectionForeground': 'onSurface',
    'list.hoverBackground': 'surfaceContainerHigh',
    'list.hoverForeground': 'onSurface',
    'list.focusOutline': 'primary',
    'list.highlightForeground': 'primary',
    'list.errorForeground': 'error',
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
    'editor.selectionBackground': 'secondaryContainer',
    'editor.lineHighlightBackground': 'surfaceContainer',
    'editorWhitespace.foreground': 'outlineVariant',
    'editorIndentGuide.background': 'outlineVariant',
    'editorIndentGuide.activeBackground': 'outline',
    'editorBracketMatch.border': 'outline',
    'editorError.foreground': 'error',
    'editorInfo.foreground': 'secondary',
    'editorGutter.addedBackground': 'tertiary',
    'editorGutter.modifiedBackground': 'secondary',
    'editorGutter.deletedBackground': 'error',
    // Git decorations (diff hue lives here as text)
    'gitDecoration.addedResourceForeground': 'tertiary',
    'gitDecoration.modifiedResourceForeground': 'secondary',
    'gitDecoration.deletedResourceForeground': 'error',
    'gitDecoration.untrackedResourceForeground': 'tertiary',
    // Terminal
    'terminal.background': 'surfaceContainer',
    'terminal.foreground': 'onSurface',
    'terminalCursor.foreground': 'primary',
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
    // Panel + quick input + notifications
    'panel.background': 'surfaceContainer',
    'panel.border': 'outlineVariant',
    'panelTitle.activeBorder': 'primary',
    'panelTitle.activeForeground': 'onSurface',
    'panelTitle.inactiveForeground': 'onSurfaceVariant',
    'quickInput.background': 'surfaceContainerHigh',
    'quickInput.foreground': 'onSurface',
    'notifications.background': 'surfaceContainerHigh',
    'notifications.border': 'outlineVariant',
    'notifications.foreground': 'onSurface',
    // Markdown text UI
    'textLink.foreground': 'primary',
    'textLink.activeForeground': 'primary',
    'textBlockQuote.background': 'surfaceContainerHigh',
    'textBlockQuote.border': 'outlineVariant',
    'textCodeBlock.background': 'surfaceContainerHigh'
});

/**
 * Standard-contrast entries shared by both appearances. `on*Container`
 * foregrounds are only safe at default/reduced contrast; high contrast
 * needs HIGH overrides (every `on*Container` matches the background).
 */
export const VSCODE_COLOR_STD = Object.freeze({
    'list.activeSelectionForeground': 'onSecondaryContainer',
    'list.warningForeground': 'onErrorContainer',
    'editorWarning.foreground': 'onErrorContainer'
});

/** Translucent washes + drop feedback (both appearances, all contrasts).
 * Alpha `66` follows the `dark_modern.json` match-highlight convention. */
export const VSCODE_COLOR_WASH = Object.freeze({
    'editor.inactiveSelectionBackground': { role: 'secondaryContainer', alpha: '66' },
    'editor.findMatchBackground': { role: 'primary', alpha: '66' },
    'editor.findMatchHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editor.hoverHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editor.rangeHighlightBackground': { role: 'secondaryContainer', alpha: '66' },
    'editorBracketMatch.background': { role: 'secondaryContainer', alpha: '66' },
    'editorGroup.dropBackground': { role: 'primary', alpha: '66' },
    'terminal.selectionBackground': { role: 'secondaryContainer', alpha: '66' }
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
 * High-contrast entries (both appearances). `on*Container` foregrounds
 * match the background here, so they step to bg-safe extremes, while
 * `*Container` diff washes fall back to one neutral step.
 */
export const VSCODE_COLOR_HIGH = Object.freeze({
    'list.activeSelectionForeground': 'onSurface',
    'list.warningForeground': 'errorContainer',
    'editorWarning.foreground': 'errorContainer',
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
    property: 'tertiary',
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
 * @param {VscodeAppearance} appearance
 * @param {VscodeContrastGroup} contrastGroup
 * @param {string} variantName PascalCase MCU variant name (`Monochrome`, …)
 * @returns {{ colors: Record<string, VscodeColorValue>, tokenRoles: VscodeTokenMap, semanticRoles: VscodeSemanticMap }}
 *   one resolved map per emitted file. Semantic roles track their TextMate
 *   counterparts by construction (`stringLiteral` == `string`,
 *   `numberLiteral` == `number`, `customLiteral` == `function`,
 *   `newOperator` == `keywordControl`).
 */
export function resolveVscodeMapping(appearance, contrastGroup, variantName) {
    const monoColor = variantName === 'Monochrome' ? VSCODE_COLOR_MONOCHROME : {};
    const monoToken = variantName === 'Monochrome' ? VSCODE_TOKEN_MONOCHROME : {};
    const modeWash = appearance === 'light' ? VSCODE_COLOR_LIGHT_STD : VSCODE_COLOR_DARK_STD;
    if (contrastGroup === 'high') {
        const tokenRoles = Object.freeze({ ...VSCODE_TOKEN_BASE, ...VSCODE_TOKEN_HIGH, ...monoToken });
        return {
            colors: Object.freeze({ ...VSCODE_COLOR_BASE, ...VSCODE_COLOR_LINE_NUMBER_BASE, ...VSCODE_COLOR_WASH, ...VSCODE_COLOR_HIGH, ...monoColor }),
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
        ? Object.freeze({ ...VSCODE_TOKEN_BASE, ...VSCODE_TOKEN_REDUCED, ...monoToken })
        : Object.freeze({ ...VSCODE_TOKEN_BASE, ...monoToken });
    const reducedColor = contrastGroup === 'reduced' ? VSCODE_COLOR_REDUCED : {};
    return {
        colors: Object.freeze({ ...VSCODE_COLOR_BASE, ...VSCODE_COLOR_LINE_NUMBER_BASE, ...VSCODE_COLOR_WASH, ...VSCODE_COLOR_STD, ...modeWash, ...reducedColor, ...monoColor }),
        tokenRoles,
        semanticRoles: Object.freeze({
            newOperator: tokenRoles.keywordControl,
            stringLiteral: tokenRoles.string,
            customLiteral: tokenRoles.function,
            numberLiteral: tokenRoles.number
        })
    };
}
