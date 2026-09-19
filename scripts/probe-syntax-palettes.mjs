/**
 * Probe the global syntax palette bank (read-only, no files written).
 *
 * - Dumps the 12x11 hex bank (`fromHueAndChroma(h, 75)`, tones 0..100 step 10).
 * - Resolves `resolveSyntaxPalettes` against real DynamicScheme backgrounds
 *   for a variant x appearance x contrast sweep and reports tones + worst
 *   contrast per rule.
 * - Flags low RGB-distance pairs among text-tier chromatic rules (the
 *   `property vs string` class of collisions).
 *
 * Must run with Bun (`bun scripts/probe-syntax-palettes.mjs`).
 */
import { Hct } from '@material/material-color-utilities';
import { calculateContrastRatio, createTheme, formatHex, MaterialContrastLevel, MaterialVariant } from '@sandlada/mcu-helper';
import { buildPaletteBank, resolveSyntaxPalettes, SYNTAX_HUES, SYNTAX_TONES } from '../src/vscode-syntax-palettes.js';

const VARIANTS = Object.freeze({
    Monochrome: MaterialVariant.Monochrome,
    Neutral: MaterialVariant.Neutral,
    TonalSpot: MaterialVariant.TonalSpot,
    Vibrant: MaterialVariant.Vibrant,
    Expressive: MaterialVariant.Expressive,
    Fidelity: MaterialVariant.Fidelity,
    Content: MaterialVariant.Content,
    Rainbow: MaterialVariant.Rainbow,
    FruitSalad: MaterialVariant.FruitSalad
});

const CONTRASTS = Object.freeze({
    default: MaterialContrastLevel.Default,
    reduced: MaterialContrastLevel.Reduced,
    high: MaterialContrastLevel.High
});

function argbToRgb(argb) {
    return [(argb >> 16) & 255, (argb >> 8) & 255, argb & 255];
}

function rgbDistance(a, b) {
    const dr = ((a >> 16) & 255) - ((b >> 16) & 255);
    const dg = ((a >> 8) & 255) - ((b >> 8) & 255);
    const db = (a & 255) - (b & 255);
    return Math.sqrt(dr * dr + dg * dg + db * db);
}

function backgroundsFor(scheme, appearance) {
    // Mirrors src/vscode-mapping.js: editor.background=surface,
    // selection=surfaceContainerHighest, inactive=surfaceContainerHigh.
    const map = scheme[appearance];
    return [map.surface, map.surfaceContainerHighest, map.surfaceContainerHigh];
}

function main() {
    const { bank, neutralBank } = buildPaletteBank();
    console.log('== bank hex (hue x tone) ==');
    for (const hue of SYNTAX_HUES) {
        const row = SYNTAX_TONES.map((t) => formatHex(bank[hue][t])).join(' ');
        console.log(`h${String(hue).padStart(3)}: ${row}`);
    }
    console.log(`neutral: ${SYNTAX_TONES.map((t) => formatHex(neutralBank[t])).join(' ')}`);

    const hueSource = formatHex(Hct.from(150, 75, 50).toInt());
    const watchPairs = [
        ['property', 'string'],
        ['function', 'string'],
        ['type', 'string'],
        ['keyword', 'keywordControl'],
        ['tag', 'function'],
        ['variable', 'operator'],
        ['number', 'constant']
    ];
    let failures = 0;
    for (const [variantName, variant] of Object.entries(VARIANTS)) {
        for (const [contrastName, level] of Object.entries(CONTRASTS)) {
            const scheme = createTheme({ variant, contrastLevel: level, specVersion: '2025', platform: 'phone', oled: false })(hueSource);
            for (const appearance of ['light', 'dark']) {
                const bgs = backgroundsFor(scheme, appearance);
                let resolved;
                try {
                    const group = contrastName === 'default' ? 'default' : contrastName;
                    resolved = resolveSyntaxPalettes(appearance, group, bgs);
                } catch (error) {
                    failures += 1;
                    console.log(`FAIL ${variantName}/${appearance}/${contrastName}: ${error.message}`);
                    continue;
                }
                const floor = contrastName === 'reduced' ? 3.0 : 4.5;
                const lines = [];
                for (const [rule, argb] of Object.entries(resolved.tokenColors)) {
                    const worst = Math.min(...bgs.map((bg) => calculateContrastRatio(argb, bg)));
                    if (worst < (rule === 'comment' || rule === 'markdownQuote' ? 3.0 : floor)) {
                        failures += 1;
                        lines.push(`  UNDER ${rule} tone ${resolved.tokenTones[rule]} ratio ${worst.toFixed(2)}`);
                    }
                }
                const distFlags = [];
                for (const [a, b] of watchPairs) {
                    const d = rgbDistance(resolved.tokenColors[a], resolved.tokenColors[b]);
                    if (d < 40) distFlags.push(`${a}~${b}=${d.toFixed(0)}`);
                }
                const toneSummary = Object.entries(resolved.tokenTones).map(([k, v]) => `${k}:${v}`).join(' ');
                console.log(`OK ${variantName}/${appearance}/${contrastName} tones {${toneSummary}}${distFlags.length > 0 ? ` CLOSE[${distFlags.join(',')}]` : ''}`);
                for (const line of lines) console.log(line);
            }
        }
    }
    console.log(failures === 0 ? 'probe: all combos passed' : `probe: ${failures} failures`);
    if (failures > 0) process.exit(1);
}

main();
