/**
 * Global MD3 tonal-palette bank (shared by the syntax + semantic layers).
 *
 * Extracted from `src/vscode-syntax-palettes.js` (v1) so BOTH palette
 * consumers draw from ONE global bank:
 *
 *   `TonalPalette.fromHueAndChroma(h, 75)` (B+D combo)
 *   `createPaletteTones({ tones: [0..100 step 10] })(palette)`
 *
 * - 12 hues: `0-330` step `30`, chroma fixed `75`.
 * - 11 tones per hue: `0-100` step `10` (132 ARGB ints total).
 * - Neutral palette: `fromHueAndChroma(0, 0)` (grayscale).
 * - Variant / appearance / contrast independent by construction: a
 *   consumer only picks the TONE (adaptive walk in
 *   `src/vscode-syntax-palettes.js`, frozen table in
 *   `src/vscode-semantic-palettes.js`).
 *
 * Color language at C75 (HCT hue -> what it reads as):
 * `0` magenta, `30` red, `60` amber, `90` lime, `120`/`150` green,
 * `180` teal, `210` cyan, `240` azure, `270` blue, `300` violet,
 * `330` magenta-pink.
 *
 * @typedef {'light' | 'dark'} PaletteAppearance
 * @typedef {'text' | 'muted'} PaletteTier
 * @typedef {'default' | 'reduced' | 'high'} PaletteContrastGroup
 */

import { TonalPalette } from '@material/material-color-utilities';
import { createPaletteTones } from '@sandlada/mcu-helper';

/** 12 palette hues (HCT hue numbers). */
export const PALETTE_HUES = Object.freeze([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);

/** 11 tones per palette (HCT tone numbers). */
export const PALETTE_TONES = Object.freeze([0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]);

/** Fixed chroma for the 12 chromatic palettes. */
export const PALETTE_CHROMA = 75;

let cachedBank = null;

/**
 * Build (once, cached) the global palette bank.
 * @returns {{ bank: Record<number, Record<number, number>>, neutralBank: Record<number, number> }}
 *   hue -> tone -> ARGB int, plus the grayscale neutral bank.
 */
export function buildPaletteBank() {
    if (cachedBank) return cachedBank;
    const getTones = createPaletteTones({ tones: [...PALETTE_TONES] });
    const bank = {};
    for (const hue of PALETTE_HUES) {
        bank[hue] = getTones(TonalPalette.fromHueAndChroma(hue, PALETTE_CHROMA));
    }
    const neutralBank = getTones(TonalPalette.fromHueAndChroma(0, 0));
    cachedBank = { bank, neutralBank };
    return cachedBank;
}

/**
 * Text floor per contrast group (reduced is a soft aesthetic by design).
 * Muted floor is always 3.0.
 * @param {PaletteContrastGroup} contrastGroup
 */
export function paletteFloors(contrastGroup) {
    if (contrastGroup === 'reduced') return Object.freeze({ text: 3.0, muted: 3.0 });
    if (contrastGroup === 'default' || contrastGroup === 'high') return Object.freeze({ text: 4.5, muted: 3.0 });
    throw new Error(`unknown contrast group '${contrastGroup}' (expected default|reduced|high)`);
}
