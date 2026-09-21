/**
 * VSCode color-theme schema (source of truth, v1).
 *
 * Curated subset derived from the built-in `theme-defaults` reference:
 * - workbench color IDs from `dark_modern.json` / `dark_vs.json`
 *   (full ID list is https://code.visualstudio.com/api/references/theme-color)
 * - TextMate `tokenColors` rules from `dark_vs.json` + `dark_plus.json`
 *   (scopes documented at
 *   https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
 * - semantic tokens from `dark_plus.json` / `dark_vs.json`
 *   (`newOperator`, `stringLiteral`, `customLiteral`, `numberLiteral`)
 *
 * Rules:
 * - Every emitted theme file must fill every key in this schema exactly
 *   (fail closed on drift: no missing key, no extra key). The subset is
 *   deliberately smaller than the full theme-color reference; any ID not
 *   listed here falls back to VSCode defaults at runtime, which is safe.
 * - `fontStyle` lives in the schema (presentation, not a color role);
 *   every foreground color comes from `src/vscode-mapping.js`, never
 *   hand-picked hex.
 * - Scopes follow `dark_vs.json` + `dark_plus.json`, including the
 *   per-language `storage.type.*` tail for type rules. Text that matches
 *   no rule keeps the editor foreground (same as the built-ins).
 *
 * @typedef {string} VscodeColorKey one of {@link VSCODE_COLOR_KEYS}
 * @typedef {string} VscodeTokenRuleKey one of {@link VSCODE_TOKEN_RULE_KEYS}
 * @typedef {string} VscodeSemanticKey one of {@link VSCODE_SEMANTIC_KEYS}
 */

/** Base chrome + text (10). */
export const VSCODE_BASE_KEYS = Object.freeze([
    'focusBorder',
    'foreground',
    'disabledForeground',
    'descriptionForeground',
    'errorForeground',
    'icon.foreground',
    'widget.border',
    'widget.shadow',
    'selection.background',
    'sash.hoverBorder'
]);

/** Buttons + checkboxes (10). */
export const VSCODE_BUTTON_KEYS = Object.freeze([
    'button.background',
    'button.foreground',
    'button.border',
    'button.separator',
    'button.hoverBackground',
    'button.secondaryBackground',
    'button.secondaryForeground',
    'button.secondaryHoverBackground',
    'checkbox.background',
    'checkbox.border'
]);

/** Dropdowns + inputs (8). */
export const VSCODE_INPUT_KEYS = Object.freeze([
    'dropdown.background',
    'dropdown.border',
    'dropdown.foreground',
    'dropdown.listBackground',
    'input.background',
    'input.border',
    'input.foreground',
    'input.placeholderForeground'
]);

/** Scrollbar + badges + progress (6). */
export const VSCODE_BADGE_KEYS = Object.freeze([
    'scrollbarSlider.background',
    'scrollbarSlider.hoverBackground',
    'scrollbarSlider.activeBackground',
    'badge.background',
    'badge.foreground',
    'progressBar.background'
]);

/** Lists + trees (10). */
export const VSCODE_LIST_KEYS = Object.freeze([
    'list.activeSelectionBackground',
    'list.activeSelectionForeground',
    'list.inactiveSelectionBackground',
    'list.inactiveSelectionForeground',
    'list.hoverBackground',
    'list.hoverForeground',
    'list.focusOutline',
    'list.highlightForeground',
    'list.errorForeground',
    'list.warningForeground'
]);

/** Activity bar (7). */
export const VSCODE_ACTIVITY_KEYS = Object.freeze([
    'activityBar.background',
    'activityBar.foreground',
    'activityBar.inactiveForeground',
    'activityBar.border',
    'activityBar.activeBorder',
    'activityBarBadge.background',
    'activityBarBadge.foreground'
]);

/** Side bar (7). */
export const VSCODE_SIDEBAR_KEYS = Object.freeze([
    'sideBar.background',
    'sideBar.foreground',
    'sideBar.border',
    'sideBarTitle.foreground',
    'sideBarSectionHeader.background',
    'sideBarSectionHeader.foreground',
    'sideBarSectionHeader.border'
]);

/** Editor groups + tabs (12). */
export const VSCODE_TABS_KEYS = Object.freeze([
    'editorGroup.border',
    'editorGroup.dropBackground',
    'editorGroupHeader.tabsBackground',
    'editorGroupHeader.tabsBorder',
    'tab.activeBackground',
    'tab.activeForeground',
    'tab.activeBorderTop',
    'tab.inactiveBackground',
    'tab.inactiveForeground',
    'tab.hoverBackground',
    'tab.border',
    'tab.unfocusedActiveBackground'
]);

/** Editor core (26). IDs whose reference says "must not be opaque" are
 * emitted translucent by the generator (see mapping `{ role, alpha }`).
 * The three `editorGutter.*SecondaryBackground` IDs are the staged half of
 * the git gutter bars (VSCode draws primary + secondary when both exist). */
export const VSCODE_EDITOR_KEYS = Object.freeze([
    'editor.background',
    'editor.foreground',
    'editorLineNumber.foreground',
    'editorLineNumber.activeForeground',
    'editorCursor.foreground',
    'editor.selectionBackground',
    'editor.inactiveSelectionBackground',
    'editor.lineHighlightBackground',
    'editorWhitespace.foreground',
    'editorIndentGuide.background',
    'editorIndentGuide.activeBackground',
    'editorBracketMatch.background',
    'editorBracketMatch.border',
    'editor.findMatchBackground',
    'editor.findMatchHighlightBackground',
    'editor.hoverHighlightBackground',
    'editor.rangeHighlightBackground',
    'editorError.foreground',
    'editorWarning.foreground',
    'editorInfo.foreground',
    'editorGutter.addedBackground',
    'editorGutter.modifiedBackground',
    'editorGutter.deletedBackground',
    'editorGutter.addedSecondaryBackground',
    'editorGutter.modifiedSecondaryBackground',
    'editorGutter.deletedSecondaryBackground'
]);

/** Overview ruler marks (6): scrollbar-strip mirrors of the git diff +
 * problem states. Fixed-palette derived (never scheme roles, see
 * `src/vscode-semantic-palettes.js`) and translucent (`99`, mirroring
 * VSCode's own `hi(gutterColor, .6)`), because the scrollbar slider fades
 * in ABOVE this canvas — see the `scrollbarSlider.*` mapping note. */
export const VSCODE_OVERVIEW_RULER_KEYS = Object.freeze([
    'editorOverviewRuler.addedForeground',
    'editorOverviewRuler.modifiedForeground',
    'editorOverviewRuler.deletedForeground',
    'editorOverviewRuler.errorForeground',
    'editorOverviewRuler.warningForeground',
    'editorOverviewRuler.infoForeground'
]);

/** Diff editor washes (4). Neutral containers by construction (see
 * `src/vscode-mapping.js`); hue lives in git decorations + token colors. */
export const VSCODE_DIFF_KEYS = Object.freeze([
    'diffEditor.insertedTextBackground',
    'diffEditor.removedTextBackground',
    'diffEditor.insertedLineBackground',
    'diffEditor.removedLineBackground'
]);

/** Git decorations (10). Diff hue lives here as text, from the fixed
 * semantic palettes (never scheme roles: a hue-330 theme must not paint
 * "added" pink or "deleted" teal). */
export const VSCODE_GIT_KEYS = Object.freeze([
    'gitDecoration.addedResourceForeground',
    'gitDecoration.modifiedResourceForeground',
    'gitDecoration.deletedResourceForeground',
    'gitDecoration.renamedResourceForeground',
    'gitDecoration.untrackedResourceForeground',
    'gitDecoration.ignoredResourceForeground',
    'gitDecoration.conflictingResourceForeground',
    'gitDecoration.stageModifiedResourceForeground',
    'gitDecoration.stageDeletedResourceForeground',
    'gitDecoration.submoduleResourceForeground'
]);

/** Terminal (4). ANSI colors are intentionally out of schema V1 and fall
 * back to VSCode defaults (M3 has no guaranteed red/green/cyan). */
export const VSCODE_TERMINAL_KEYS = Object.freeze([
    'terminal.background',
    'terminal.foreground',
    'terminalCursor.foreground',
    'terminal.selectionBackground'
]);

/** Status bar + title bar (12). */
export const VSCODE_STATUS_KEYS = Object.freeze([
    'statusBar.background',
    'statusBar.foreground',
    'statusBar.border',
    'statusBarItem.hoverBackground',
    'statusBar.debuggingBackground',
    'statusBar.debuggingForeground',
    'statusBar.noFolderBackground',
    'titleBar.activeBackground',
    'titleBar.activeForeground',
    'titleBar.inactiveBackground',
    'titleBar.inactiveForeground',
    'titleBar.border'
]);

/** Panel + quick input + notifications (11). */
export const VSCODE_PANEL_KEYS = Object.freeze([
    'panel.background',
    'panel.border',
    'panelTitle.activeBorder',
    'panelTitle.activeForeground',
    'panelTitle.inactiveForeground',
    'quickInput.background',
    'quickInput.foreground',
    'quickInputList.focusBackground',
    'notifications.background',
    'notifications.border',
    'notifications.foreground'
]);

/** Markdown text UI (5). */
export const VSCODE_TEXT_KEYS = Object.freeze([
    'textLink.foreground',
    'textLink.activeForeground',
    'textBlockQuote.background',
    'textBlockQuote.border',
    'textCodeBlock.background'
]);

/** Context/right-click menus (6). `menu.background` is `surface` so menus
 * read as part of the theme instead of VSCode's neutral fallback. */
export const VSCODE_MENU_KEYS = Object.freeze([
    'menu.background',
    'menu.foreground',
    'menu.selectionBackground',
    'menu.selectionForeground',
    'menu.separatorBackground',
    'menu.border'
]);

/** All workbench color IDs every emitted file must fill (154). */
export const VSCODE_COLOR_KEYS = Object.freeze([
    ...VSCODE_BASE_KEYS,
    ...VSCODE_BUTTON_KEYS,
    ...VSCODE_INPUT_KEYS,
    ...VSCODE_BADGE_KEYS,
    ...VSCODE_LIST_KEYS,
    ...VSCODE_ACTIVITY_KEYS,
    ...VSCODE_SIDEBAR_KEYS,
    ...VSCODE_TABS_KEYS,
    ...VSCODE_EDITOR_KEYS,
    ...VSCODE_OVERVIEW_RULER_KEYS,
    ...VSCODE_DIFF_KEYS,
    ...VSCODE_GIT_KEYS,
    ...VSCODE_TERMINAL_KEYS,
    ...VSCODE_STATUS_KEYS,
    ...VSCODE_PANEL_KEYS,
    ...VSCODE_TEXT_KEYS,
    ...VSCODE_MENU_KEYS
]);

/**
 * TextMate token rules (26). Scopes follow `dark_vs.json` +
 * `dark_plus.json`. Foregrounds come from `src/vscode-syntax-palettes.js`
 * (global MD3 palette bank); `fontStyle` stays frozen here.
 */
export const VSCODE_TOKEN_RULES = Object.freeze([
    { key: 'comment', fontStyle: '', scopes: ['comment'] },
    { key: 'string', fontStyle: '', scopes: ['string', 'string.tag', 'string.value', 'meta.embedded.assembly', 'meta.preprocessor.string'] },
    { key: 'value', fontStyle: '', scopes: ['support.constant.property-value', 'support.constant.font-name', 'support.constant.media-type', 'support.constant.media', 'constant.other.color.rgb-value', 'constant.other.rgb-value', 'support.constant.color', 'punctuation.definition.group.regexp', 'punctuation.definition.group.assertion.regexp', 'punctuation.definition.character-class.regexp', 'punctuation.character.set.begin.regexp', 'punctuation.character.set.end.regexp', 'keyword.operator.negation.regexp', 'support.other.parenthesis.regexp'] },
    { key: 'stringRegexp', fontStyle: '', scopes: ['string.regexp', 'constant.regexp', 'constant.character.character-class.regexp', 'constant.other.character-class.set.regexp', 'constant.other.character-class.regexp', 'constant.character.set.regexp'] },
    { key: 'number', fontStyle: '', scopes: ['constant.numeric', 'keyword.operator.plus.exponent', 'keyword.operator.minus.exponent', 'meta.preprocessor.numeric'] },
    { key: 'constant', fontStyle: '', scopes: ['constant.language', 'variable.other.constant', 'variable.other.enummember', 'constant.character', 'constant.other.option'] },
    { key: 'keyword', fontStyle: '', scopes: ['keyword', 'keyword.operator.wordlike', 'keyword.other.unit', 'storage', 'storage.modifier', 'meta.preprocessor', 'entity.name.function.preprocessor', 'punctuation.definition.list.begin.markdown'] },
    { key: 'keywordControl', fontStyle: '', scopes: ['keyword.control', 'source.cpp keyword.operator.new', 'keyword.operator.delete', 'keyword.other.using', 'keyword.other.directive.using', 'keyword.other.operator', 'entity.name.operator'] },
    { key: 'operator', fontStyle: '', scopes: ['keyword.operator'] },
    { key: 'function', fontStyle: '', scopes: ['entity.name.function', 'support.function', 'support.constant.handlebars', 'source.powershell variable.other.member', 'entity.name.operator.custom-literal', 'keyword.operator.or.regexp', 'keyword.control.anchor.regexp'] },
    {
        key: 'type', fontStyle: '', scopes: ['support.class', 'support.type', 'entity.name.type', 'entity.name.namespace', 'entity.other.attribute', 'entity.name.scope-resolution', 'entity.name.class', 'storage.type', 'meta.type.cast.expr', 'meta.type.new.expr', 'support.constant.math', 'support.constant.dom', 'support.constant.json', 'entity.other.inherited-class', 'punctuation.separator.namespace.ruby', 'storage.type.numeric.go', 'storage.type.byte.go', 'storage.type.boolean.go', 'storage.type.string.go', 'storage.type.uintptr.go', 'storage.type.error.go', 'storage.type.rune.go', 'storage.type.cs', 'storage.type.generic.cs', 'storage.type.modifier.cs', 'storage.type.variable.cs', 'storage.type.annotation.java', 'storage.type.generic.java', 'storage.type.java', 'storage.type.object.array.java', 'storage.type.primitive.array.java', 'storage.type.primitive.java', 'storage.type.token.java', 'storage.type.groovy', 'storage.type.annotation.groovy', 'storage.type.parameters.groovy', 'storage.type.generic.groovy', 'storage.type.object.array.groovy', 'storage.type.primitive.array.groovy', 'storage.type.primitive.groovy']
    },
    { key: 'variable', fontStyle: '', scopes: ['variable', 'meta.definition.variable.name', 'support.variable', 'entity.name.variable', 'constant.other.placeholder', 'meta.object-literal.key'] },
    { key: 'property', fontStyle: '', scopes: ['entity.other.attribute-name', 'support.type.property-name', 'support.type.vendored.property-name', 'variable.other.property', 'meta.structure.dictionary.key.python'] },
    { key: 'tag', fontStyle: '', scopes: ['entity.name.tag', 'entity.name.tag.css', 'entity.name.tag.less', 'punctuation.definition.tag', 'keyword.operator.quantifier.regexp', 'constant.character.escape'] },
    { key: 'interpolation', fontStyle: '', scopes: ['punctuation.definition.template-expression.begin', 'punctuation.definition.template-expression.end', 'punctuation.section.embedded'] },
    { key: 'markupHeading', fontStyle: 'bold', scopes: ['markup.heading', 'header'] },
    { key: 'markupBold', fontStyle: 'bold', scopes: ['markup.bold'] },
    { key: 'markupItalic', fontStyle: 'italic', scopes: ['markup.italic', 'emphasis'] },
    { key: 'markupInserted', fontStyle: '', scopes: ['markup.inserted'] },
    { key: 'markupDeleted', fontStyle: '', scopes: ['markup.deleted'] },
    { key: 'markupChanged', fontStyle: '', scopes: ['markup.changed'] },
    { key: 'markdownRaw', fontStyle: '', scopes: ['markup.inline.raw'] },
    { key: 'markdownQuote', fontStyle: '', scopes: ['punctuation.definition.quote.begin.markdown'] },
    // URLs (inline, autolink `<http..>`, email): `markup.underline` carries
    // the underline style in `dark_vs.json`; foreground comes from mapping.
    { key: 'link', fontStyle: 'underline', scopes: ['markup.underline.link.markdown'] },
    { key: 'diffHeader', fontStyle: '', scopes: ['meta.diff.header'] },
    { key: 'invalid', fontStyle: '', scopes: ['invalid'] }
]);

/** Token rule keys in schema order. */
export const VSCODE_TOKEN_RULE_KEYS = Object.freeze(VSCODE_TOKEN_RULES.map((r) => r.key));

/** Semantic tokens (4). Each tracks its TextMate counterpart (see `src/vscode-syntax-palettes.js`). */
export const VSCODE_SEMANTIC_KEYS = Object.freeze([
    'newOperator',
    'stringLiteral',
    'customLiteral',
    'numberLiteral'
]);

/** @param {string} key @returns {key is VscodeColorKey} */
export function isVscodeColorKey(key) {
    return VSCODE_COLOR_KEYS.includes(key);
}

/** @param {string} key @returns {key is VscodeTokenRuleKey} */
export function isVscodeTokenRule(key) {
    return VSCODE_TOKEN_RULE_KEYS.includes(key);
}

/** @param {string} key @returns {key is VscodeSemanticKey} */
export function isVscodeSemanticToken(key) {
    return VSCODE_SEMANTIC_KEYS.includes(key);
}
