/**
 * Semantic git-diff + problem colors from fixed MD3 tonal palettes.
 *
 * Git diff states and diagnostics carry MEANING (added = green, deleted =
 * red, error = red, ...), so they must NOT resolve through DynamicScheme
 * roles: a hue-330 theme would paint "added" pink and "error" magenta.
 * They resolve from the shared global palette bank
 * (`src/vscode-palette-bank.js`, the same bank syntax uses) at FROZEN
 * tones, so the semantic colors are identical across all 291 shipped
 * themes (only light/dark + tier differ). Monochrome themes keep the same
 * colorful semantics, mirroring the documented syntax "option A".
 *
 * Named palettes (HCT hue at chroma 75; `gray` = neutral palette `C0`):
 *   red 30, amber 60, green 150, blue 240, purple 300.
 *
 * Frozen tones per appearance / contrast group / tier
 * (probe-measured worst case over the 97-combo matrix against
 * {@link SEMANTIC_BACKGROUND_IDS}):
 *
 * | group   | light text | light muted | dark text  | dark muted |
 * |---------|------------|-------------|------------|------------|
 * | default | T30 >= 6.8 | T50 >= 3.3  | T70 >= 5.3 | T60 >= 3.9 |
 * | high    | T30 >= 5.4 | T40 >= 3.8  | T80 >= 5.4 | T70 >= 4.0 |
 * | reduced | T30        | T50         | T70        | T60        |
 *
 * (reduced keeps the default tones: only the floors drop to 3.0, exactly
 * like the syntax bank's reduced rule.) FROZEN by design: a semantic color
 * must not shift with the variant. The generator re-verifies every value
 * against the real scheme and aborts when a tone cannot hold its floor; a
 * future variant that breaks a tone is retuned here, never silently
 * re-tinted.
 *
 * `alpha` values (e.g. overview ruler marks at `99`, mirroring VSCode's
 * own `hi(gutterColor, .6)`) are applied by the generator; the guard
 * checks the OPAQUE tone, which is the stricter test.
 *
 * @typedef {'light' | 'dark'} SemanticAppearance
 * @typedef {'text' | 'muted'} SemanticTier
 * @typedef {{ palette: string, tier: SemanticTier, alpha?: string }} SemanticColorValue
 */

import { calculateContrastRatio } from '@sandlada/mcu-helper';
import { buildPaletteBank, paletteFloors } from './vscode-palette-bank.js';

/** Named palette -> HCT hue (`'neutral'` = the grayscale palette). */
export const SEMANTIC_PALETTE_HUES = Object.freeze({
    red: 30,
    amber: 60,
    green: 150,
    blue: 240,
    purple: 300,
    gray: 'neutral'
});

/** Frozen tone per appearance / contrast group / tier (see header). */
export const SEMANTIC_TONES = Object.freeze({
    light: Object.freeze({
        default: Object.freeze({ text: 30, muted: 50 }),
        high: Object.freeze({ text: 30, muted: 40 }),
        reduced: Object.freeze({ text: 30, muted: 50 })
    }),
    dark: Object.freeze({
        default: Object.freeze({ text: 70, muted: 60 }),
        high: Object.freeze({ text: 80, muted: 70 }),
        reduced: Object.freeze({ text: 70, muted: 60 })
    })
});

/**
 * Workbench IDs whose ROLE value is a background every semantic color must
 * survive on. All four are neutral container steps; the union is the worst
 * case in both appearances (`surfaceContainerHighest`/`High` are the
 * darkest light / lightest dark neutrals). Gutter bars + ruler marks live
 * on `editor.background`, git labels + problem text on the side bar / list
 * selection / panel surfaces — one conservative set covers all of them.
 */
export const SEMANTIC_BACKGROUND_IDS = Object.freeze([
    'editor.background',
    'sideBar.background',
    'list.activeSelectionBackground',
    'list.inactiveSelectionBackground'
]);

/** @param {unknown} value @returns {boolean} */
export function isSemanticColorValue(value) {
    return typeof value === 'object' && value !== null && typeof (/** @type {SemanticColorValue} */ (value).palette) === 'string';
}

/** @param {string} palette @param {Record<number, Record<number, number>>} bank @param {Record<number, number>} neutralBank */
function tonesForPalette(palette, bank, neutralBank) {
    const hue = SEMANTIC_PALETTE_HUES[palette];
    if (hue === undefined) {
        throw new Error(`unknown semantic palette '${palette}' (expected ${Object.keys(SEMANTIC_PALETTE_HUES).join('|')})`);
    }
    if (hue === 'neutral') return neutralBank;
    const tones = bank[hue];
    if (!tones) throw new Error(`semantic palette hue '${hue}' missing from bank`);
    return tones;
}

/**
 * Resolve one `{ palette, tier }` value to an ARGB int at the frozen tone.
 * @param {SemanticColorValue} value
 * @param {SemanticAppearance} appearance
 * @param {string} contrastGroup
 * @returns {number}
 */
export function resolveSemanticColor(value, appearance, contrastGroup) {
    const { bank, neutralBank } = buildPaletteBank();
    const groupTones = SEMANTIC_TONES[appearance];
    if (!groupTones) throw new Error(`unknown appearance '${appearance}' (expected light|dark)`);
    const tonesByTier = groupTones[contrastGroup];
    if (!tonesByTier) throw new Error(`unknown contrast group '${contrastGroup}' (expected default|high|reduced)`);
    const tone = tonesByTier[value.tier];
    if (tone === undefined) throw new Error(`unknown semantic tier '${value.tier}' (expected text|muted)`);
    const argb = tonesForPalette(value.palette, bank, neutralBank)[tone];
    if (argb === undefined) throw new Error(`tone ${tone} missing from semantic palette '${value.palette}'`);
    return argb;
}

/**
 * Resolve every semantic value of a mapping `colors` map.
 * @param {SemanticAppearance} appearance
 * @param {string} contrastGroup
 * @param {Record<string, unknown>} colors workbench ID -> mapping value
 * @returns {Record<string, number>} workbench ID -> ARGB int (semantic IDs only)
 */
export function resolveSemanticColors(appearance, contrastGroup, colors) {
    const resolved = {};
    for (const [key, value] of Object.entries(colors)) {
        if (isSemanticColorValue(value)) resolved[key] = resolveSemanticColor(/** @type {SemanticColorValue} */ (value), appearance, contrastGroup);
    }
    return resolved;
}

/**
 * Fail closed when a frozen semantic tone does not hold its floor on the
 * real scheme backgrounds (opaque tone, see header). Throws with every
 * violation listed; the generator turns this into a hard abort.
 * @param {SemanticAppearance} appearance
 * @param {Record<string, number>} schemeAppearance one DynamicScheme half (ARGB ints)
 * @param {Record<string, unknown>} colors mapping values (role backgrounds + tiers)
 * @param {Record<string, number>} semanticColors output of {@link resolveSemanticColors}
 * @param {string} contrastGroup
 * @param {string} label
 */
export function guardSemanticContrast(appearance, schemeAppearance, colors, semanticColors, contrastGroup, label) {
    const violations = [];
    const floors = paletteFloors(contrastGroup);
    const backgrounds = [];
    for (const id of SEMANTIC_BACKGROUND_IDS) {
        const role = colors[id];
        if (typeof role !== 'string') {
            violations.push(`semantic background '${id}' must be an opaque role string, got ${JSON.stringify(role)}`);
            continue;
        }
        const int = schemeAppearance[role];
        if (int === undefined) {
            violations.push(`semantic background role '${role}' (${id}) missing from generated scheme`);
            continue;
        }
        backgrounds.push([id, int]);
    }
    const tonesByTier = (SEMANTIC_TONES[appearance] ?? {})[contrastGroup] ?? {};
    for (const [key, argb] of Object.entries(semanticColors)) {
        const value = /** @type {SemanticColorValue} */ (colors[key]);
        const floor = floors[value.tier];
        const tone = tonesByTier[value.tier];
        for (const [bgId, bgInt] of backgrounds) {
            const ratio = calculateContrastRatio(argb, bgInt);
            if (ratio < floor) {
                violations.push(`semantic ${key} (${value.palette} T${tone}) ratio ${ratio.toFixed(2)} < ${floor} on ${bgId}`);
            }
        }
    }
    if (violations.length > 0) {
        throw new Error(`unreadable ${label} semantic palettes (retune src/vscode-semantic-palettes.js):\n  ${violations.join('\n  ')}`);
    }
}
