/**
 * VSCode syntax colors from MD3 tonal palettes (source of truth, v1).
 *
 * Unlike workbench `colors` (which resolve MD3 dynamic-color roles per
 * variant via `src/vscode-mapping.js`), syntax `tokenColors` + semantic
 * tokens resolve DIRECTLY from tonal palettes:
 *
 *   `TonalPalette.fromHueAndChroma(h, 75)` (B+D combo)
 *   `createPaletteTones({ tones: [0..100 step 10] })(palette)`
 *
 * - 12 hues: `0-330` step `30`, chroma fixed `75`.
 * - 11 tones per hue: `0-100` step `10` (132 ARGB ints total).
 * - ONE global bank shared by all 9 variants (syntax hue is
 *   variant-independent by design). Only the ADAPTIVE tone step varies
 *   per emitted file, because backgrounds (`editor.background`,
 *   selection steps) are variant-dependent DynamicScheme roles.
 * - `comment` / `markdownQuote` / `operator` use the neutral palette
 *   (`fromHueAndChroma(0, 0)`, grayscale); `operator` stays text floor
 *   (structural, must not disappear), the other two are muted floor.
 * - `markupDeleted` / `invalid` use the fixed error hue (`0`, chroma 75).
 * - Monochrome themes use the same global bank (option A): syntax stays
 *   colorful even when the UI chrome is gray. Documented, not a bug.
 * - Fail closed: unknown rule, unknown appearance/group, or a tone walk
 *   that exhausts `0..100` without meeting the floor throws (the
 *   generator turns this into a hard abort, never a fallback hex).
 *
 * @typedef {'light' | 'dark'} SyntaxAppearance
 * @typedef {'default' | 'reduced' | 'high'} SyntaxContrastGroup
 */

import { TonalPalette } from '@material/material-color-utilities';
import { calculateContrastRatio, createPaletteTones } from '@sandlada/mcu-helper';
import { VSCODE_SEMANTIC_KEYS, VSCODE_TOKEN_RULE_KEYS } from './vscode-schema.js';

/** 12 palette hues (HCT hue numbers). */
export const SYNTAX_HUES = Object.freeze([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);

/** 11 tones per palette (HCT tone numbers). */
export const SYNTAX_TONES = Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

/** Fixed chroma for the 12 chromatic palettes. */
export const SYNTAX_CHROMA = 75;

/**
 * Token rule -> palette hue, or `'neutral'` for the grayscale palette.
 *
 * Allocation goals (v1, to be frozen after the probe sweep):
 * - `string` (150 green) vs `property` (90 lime) >= 60 hue apart, so JSON
 *   keys never wash into string values (the old `tertiary` collision).
 * - High-frequency families each own a hue: number 30, constant 60,
 *   type 180, keyword 270, keywordControl 240, function 120, tag 300.
 * - Warm-end hues reserved: 0 = error family only, 330 = regexp only.
 * - Low-drama roles share cool/neutral: variable/markupChanged/diffHeader
 *   follow 210, interpolation follows tag (300), value/raw/inserted follow
 *   string (150), headings/bold/italic follow keyword (270), link follows
 *   keywordControl (240).
 */
export const SYNTAX_HUE_BY_RULE = Object.freeze({
    comment: 'neutral',
    string: 150,
    value: 150,
    stringRegexp: 330,
    number: 30,
    constant: 60,
    keyword: 270,
    keywordControl: 240,
    operator: 'neutral',
    function: 120,
    type: 180,
    variable: 210,
    property: 90,
    tag: 300,
    interpolation: 300,
    markupHeading: 270,
    markupBold: 270,
    markupItalic: 270,
    markupInserted: 150,
    markupDeleted: 0,
    markupChanged: 210,
    markdownRaw: 150,
    markdownQuote: 'neutral',
    link: 240,
    diffHeader: 210,
    invalid: 0
});

/** Token rule -> contrast tier (`muted` = 3.0 floor, else text floor). */
export const SYNTAX_TIER_BY_RULE = Object.freeze({
    comment: 'muted',
    markdownQuote: 'muted',
    string: 'text',
    value: 'text',
    stringRegexp: 'text',
    number: 'text',
    constant: 'text',
    keyword: 'text',
    keywordControl: 'text',
    operator: 'text',
    function: 'text',
    type: 'text',
    variable: 'text',
    property: 'text',
    tag: 'text',
    interpolation: 'text',
    markupHeading: 'text',
    markupBold: 'text',
    markupItalic: 'text',
    markupInserted: 'text',
    markupDeleted: 'text',
    markupChanged: 'text',
    markdownRaw: 'text',
    markdownQuote: 'muted',
    link: 'text',
    diffHeader: 'text',
    invalid: 'text'
});

/** Adaptive tone walk start points per appearance and tier. */
export const SYNTAX_START_TONE = Object.freeze({
    light: Object.freeze({ text: 40, muted: 50 }),
    dark: Object.freeze({ text: 80, muted: 70 })
});

/** Semantic token -> TextMate rule it tracks (same hue + tone). */
export const SYNTAX_SEMANTIC_SOURCE = Object.freeze({
    newOperator: 'keywordControl',
    stringLiteral: 'string',
    customLiteral: 'function',
    numberLiteral: 'number'
});

let cachedBank = null;

/**
 * Build (once, cached) the global palette bank.
 * @returns {{ bank: Record<number, Record<number, number>>, neutralBank: Record<number, number> }}
 *   hue -> tone -> ARGB int, plus the grayscale neutral bank.
 */
export function buildPaletteBank() {
    if (cachedBank) return cachedBank;
    const getTones = createPaletteTones({ tones: [...SYNTAX_TONES] });
    const bank = {};
    for (const hue of SYNTAX_HUES) {
        bank[hue] = getTones(TonalPalette.fromHueAndChroma(hue, SYNTAX_CHROMA));
    }
    const neutralBank = getTones(TonalPalette.fromHueAndChroma(0, 0));
    cachedBank = { bank, neutralBank };
    return cachedBank;
}

/**
 * Text floor per contrast group (reduced is a soft aesthetic by design).
 * Muted floor is always 3.0.
 */
export function syntaxFloors(contrastGroup) {
    if (contrastGroup === 'reduced') return Object.freeze({ text: 3.0, muted: 3.0 });
    if (contrastGroup === 'default' || contrastGroup === 'high') return Object.freeze({ text: 4.5, muted: 3.0 });
    throw new Error(`unknown contrast group '${contrastGroup}' (expected default|reduced|high)`);
}

/**
 * Resolve one rule to an ARGB int with an adaptive tone walk.
 * Light walks toward 0 (darker), dark walks toward 100 (lighter).
 * @param {number | 'neutral'} hue
 * @param {'text' | 'muted'} tier
 */
function resolveOne(hue, tier, appearance, floors, backgrounds, bank, neutralBank, rule) {
    if (appearance !== 'light' && appearance !== 'dark') {
        throw new Error(`unknown appearance '${appearance}' (expected light|dark)`);
    }
    const floor = floors[tier];
    const tonesFor = hue === 'neutral' ? neutralBank : bank[hue];
    if (!tonesFor) throw new Error(`unknown palette hue '${hue}' for rule '${rule}'`);
    let tone = SYNTAX_START_TONE[appearance][tier];
    if (tone === undefined) throw new Error(`unknown tier '${tier}' for rule '${rule}'`);
    for (;;) {
        const argb = tonesFor[tone];
        if (argb === undefined) throw new Error(`tone ${tone} missing from palette hue '${hue}'`);
        const worst = Math.min(...backgrounds.map((bg) => calculateContrastRatio(argb, bg)));
        if (worst >= floor) return { argb, tone };
        if (appearance === 'light') {
            if (tone === 0) break;
            tone -= 10;
        } else {
            if (tone === 100) break;
            tone += 10;
        }
    }
    const ratios = backgrounds.map((bg) => {
        const probe = hue === 'neutral' ? neutralBank : bank[hue];
        const edge = appearance === 'light' ? probe[0] : probe[100];
        return calculateContrastRatio(edge, bg).toFixed(2);
    });
    throw new Error(`palette tone unreachable for rule '${rule}' (hue ${hue}, ${appearance}, floor ${floor}, bg ratios ${ratios.join('/')})`);
}

/**
 * Resolve every TextMate rule + semantic token to ARGB ints.
 * @param {SyntaxAppearance} appearance
 * @param {SyntaxContrastGroup} contrastGroup
 * @param {number[]} backgrounds ARGB ints the syntax must survive on:
 *   `[editorBg, selectionBg, inactiveSelectionBg]`
 * @returns {{ tokenColors: Record<string, number>, tokenTones: Record<string, number>, semanticColors: Record<string, number> }}
 */
export function resolveSyntaxPalettes(appearance, contrastGroup, backgrounds) {
    if (!Array.isArray(backgrounds) || backgrounds.length === 0) {
        throw new Error('resolveSyntaxPalettes requires a non-empty backgrounds array');
    }
    const floors = syntaxFloors(contrastGroup);
    const { bank, neutralBank } = buildPaletteBank();
    const missing = VSCODE_TOKEN_RULE_KEYS.filter((k) => !(k in SYNTAX_HUE_BY_RULE));
    const extra = Object.keys(SYNTAX_HUE_BY_RULE).filter((k) => !VSCODE_TOKEN_RULE_KEYS.includes(k));
    if (missing.length > 0 || extra.length > 0) {
        throw new Error(`syntax palette drift (rules missing: ${missing.join(',') || 'none'}; extra: ${extra.join(',') || 'none'})`);
    }
    const tokenColors = {};
    const tokenTones = {};
    for (const rule of VSCODE_TOKEN_RULE_KEYS) {
        const hue = SYNTAX_HUE_BY_RULE[rule];
        const tier = SYNTAX_TIER_BY_RULE[rule];
        if (tier !== 'text' && tier !== 'muted') throw new Error(`unknown tier '${tier}' for rule '${rule}'`);
        const { argb, tone } = resolveOne(hue, tier, appearance, floors, backgrounds, bank, neutralBank, rule);
        tokenColors[rule] = argb;
        tokenTones[rule] = tone;
    }
    const semanticColors = {};
    for (const key of VSCODE_SEMANTIC_KEYS) {
        const source = SYNTAX_SEMANTIC_SOURCE[key];
        if (!source || !(source in tokenColors)) throw new Error(`unknown semantic source '${source}' for '${key}'`);
        semanticColors[key] = tokenColors[source];
    }
    return { tokenColors, tokenTones, semanticColors };
}
