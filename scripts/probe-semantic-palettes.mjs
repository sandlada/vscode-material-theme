/**
 * Probe the semantic git-diff / problem palettes (read-only).
 *
 * - Dumps the frozen palette hexes per appearance + tier (incl. wash).
 * - Sweeps 9 variants x 12 hues x 3 contrast groups x (light, dark,
 *   dark-oled) and re-verifies every semantic value against the real
 *   scheme backgrounds through `guardSemanticContrast`, plus the diff-wash
 *   blend readability (`editor.foreground` + all syntax rules on the
 *   alpha blend over `editor.background`) and inserted-vs-removed RGB
 *   distance.
 * - Reports the worst ratio per palette across the matrix.
 * - Reports RGB distances between the palette tones (states sharing a
 *   palette are intentional: added == untracked green, info == modified
 *   blue, deleted == conflicting red, ...).
 * - Reports the overview-ruler mark residual through the translucent
 *   scrollbar slider (mark @ `99` under slider @ `66`/`99`/`b3`).
 *
 * Must run with Bun (`bun scripts/probe-semantic-palettes.mjs`).
 */
import { Hct } from '@material/material-color-utilities';
import { calculateContrastRatio, createTheme, formatHex, MaterialContrastLevel, MaterialVariant } from '@sandlada/mcu-helper';
import { resolveVscodeMapping } from '../src/vscode-mapping.js';
import {
    SEMANTIC_BACKGROUND_IDS,
    SEMANTIC_DIFF_WASH_IDS,
    SEMANTIC_PALETTE_HUES,
    SEMANTIC_TONES,
    guardSemanticContrast,
    resolveSemanticColor,
    resolveSemanticColors
} from '../src/vscode-semantic-palettes.js';
import { SYNTAX_TIER_BY_RULE, resolveSyntaxPalettes } from '../src/vscode-syntax-palettes.js';

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

const HUES = Object.freeze([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
const SLIDER_STATES = Object.freeze(['background', 'hoverBackground', 'activeBackground']);
const MARK_ALPHA = '99';

function argbToRgb(argb) {
    return [(argb >> 16) & 255, (argb >> 8) & 255, argb & 255];
}

function rgbDistance(a, b) {
    const [ar, ag, ab] = argbToRgb(a);
    const [br, bg, bb] = argbToRgb(b);
    return Math.sqrt((ar - br) ** 2 + (ag - bg) ** 2 + (ab - bb) ** 2);
}

/** sRGB lerp, same approximation as the generator's `blendInt`. */
function blend(fgInt, bgInt, alphaHex) {
    const a = parseInt(alphaHex, 16) / 255;
    const fg = argbToRgb(fgInt);
    const bg = argbToRgb(bgInt);
    const mixed = fg.map((v, i) => Math.round(v * a + bg[i] * (1 - a)));
    return (255 << 24) | (mixed[0] << 16) | (mixed[1] << 8) | mixed[2];
}

function paletteValues(tier) {
    return Object.keys(SEMANTIC_PALETTE_HUES).map((palette) => ({ palette, tier }));
}

function main() {
    let failures = 0;

    console.log('== frozen palette hex per appearance / group (text / muted / wash) ==');
    for (const appearance of ['light', 'dark']) {
        for (const group of ['default', 'high', 'reduced']) {
            const text = paletteValues('text').map((v) => `${v.palette}:${formatHex(resolveSemanticColor(v, appearance, group))}`);
            const muted = paletteValues('muted').map((v) => `${v.palette}:${formatHex(resolveSemanticColor(v, appearance, group))}`);
            const tones = SEMANTIC_TONES[appearance][group];
            console.log(`${appearance.padEnd(5)} ${group.padEnd(7)} text T${tones.text}  ${text.join(' ')}`);
            console.log(`${' '.repeat(13)} muted T${tones.muted} ${muted.join(' ')}`);
            const washGreen = formatHex(resolveSemanticColor({ palette: 'green', tier: 'wash' }, appearance, group));
            const washRed = formatHex(resolveSemanticColor({ palette: 'red', tier: 'wash' }, appearance, group));
            console.log(`${' '.repeat(13)} wash T${tones.wash}   green:${washGreen} red:${washRed} (line @66 / text @99)`);
        }
    }

    console.log('== RGB distances (text tone, default contrast, per appearance) ==');
    for (const appearance of ['light', 'dark']) {
        const values = paletteValues('text');
        const pairs = [];
        for (let i = 0; i < values.length; i += 1) {
            for (let j = i + 1; j < values.length; j += 1) {
                const a = resolveSemanticColor(values[i], appearance, 'default');
                const b = resolveSemanticColor(values[j], appearance, 'default');
                pairs.push({ name: `${values[i].palette}~${values[j].palette}`, distance: rgbDistance(a, b) });
            }
        }
        pairs.sort((a, b) => a.distance - b.distance);
        const close = pairs.filter((p) => p.distance < 40);
        const min = pairs[0];
        const suffix = close.length > 0 ? ` CLOSE[${close.map((p) => `${p.name}=${p.distance.toFixed(0)}`).join(',')}]` : '';
        console.log(`${appearance.padEnd(5)} min ${min.name}=${min.distance.toFixed(0)}${suffix}`);
    }

    const worst = new Map();
    const sliderResidual = new Map();
    const washWorst = new Map();
    let washMinDistance = Infinity;
    let washMinWhere = '';
    console.log('== matrix sweep (9 variants x 12 hues x 3 contrast groups x light/dark/dark-oled) ==');
    for (const [variantName, variant] of Object.entries(VARIANTS)) {
        const hues = variantName === 'Monochrome' ? [0] : HUES;
        for (const hue of hues) {
            const source = formatHex(Hct.from(hue, 75, 50).toInt());
            for (const [contrastName, contrastLevel] of Object.entries(CONTRASTS)) {
                for (const oled of [false, true]) {
                    const scheme = createTheme({ variant, contrastLevel, specVersion: '2025', platform: 'phone', oled })(source);
                    const appearances = oled ? [['dark', scheme.dark, 'dark-oled']] : [['light', scheme.light, 'light'], ['dark', scheme.dark, 'dark']];
                    for (const [appearance, schemeAppearance, appearanceLabel] of appearances) {
                        const group = contrastName;
                        const mapping = resolveVscodeMapping(appearance, group, variantName);
                        const label = `${variantName} ${hue} ${appearanceLabel} ${contrastName}`;
                        let semantic;
                        try {
                            semantic = resolveSemanticColors(appearance, group, mapping.colors);
                            guardSemanticContrast(appearance, schemeAppearance, mapping.colors, semantic, group, label);
                        } catch (error) {
                            failures += 1;
                            console.log(`FAIL ${label}: ${error.message}`);
                            continue;
                        }
                        // Worst ratio per palette+tier over the real backgrounds.
                        // Wash-tier blends are backgrounds themselves: skip the
                        // opaque check here (verified by blend below).
                        const backgrounds = SEMANTIC_BACKGROUND_IDS.map((id) => schemeAppearance[mapping.colors[id]]);
                        for (const [key, argb] of Object.entries(semantic)) {
                            const value = mapping.colors[key];
                            if (value.tier === 'wash') continue;
                            const worstRatio = Math.min(...backgrounds.map((bg) => calculateContrastRatio(argb, bg)));
                            const worstKey = `${appearanceLabel}|${value.palette}|${value.tier}`;
                            const current = worst.get(worstKey);
                            if (current === undefined || worstRatio < current.ratio) {
                                worst.set(worstKey, { ratio: worstRatio, where: label });
                            }
                        }
                        // Diff-wash blend readability: editor fg + every syntax
                        // rule on the alpha blend over editor.background, plus
                        // inserted-vs-removed RGB distance.
                        try {
                            const editorRole = mapping.colors['editor.background'];
                            const editorFgRole = mapping.colors['editor.foreground'];
                            const editorBg = schemeAppearance[editorRole];
                            const editorFg = schemeAppearance[editorFgRole];
                            const selRole = mapping.colors['editor.selectionBackground'];
                            const inaRole = mapping.colors['editor.inactiveSelectionBackground'];
                            const syntax = resolveSyntaxPalettes(appearance, group, [editorBg, schemeAppearance[selRole], schemeAppearance[inaRole]]);
                            // NOTE: syntax tones are chosen for editor + opaque
                            // selection steps (generator); the wash blend
                            // itself is checked below.
                            const textFloor = group === 'reduced' ? 3.0 : 4.5;
                            const blends = {};
                            for (const id of SEMANTIC_DIFF_WASH_IDS) {
                                const washValue = mapping.colors[id];
                                const washArgb = semantic[id];
                                const blended = blend(washArgb, editorBg, washValue.alpha);
                                blends[id] = blended;
                                const fgRatio = calculateContrastRatio(editorFg, blended);
                                const fgKey = `${appearanceLabel}|wash-fg`;
                                const fgCur = washWorst.get(fgKey);
                                if (fgCur === undefined || fgRatio < fgCur.ratio) washWorst.set(fgKey, { ratio: fgRatio, where: `${label} ${id}` });
                                if (fgRatio < textFloor) throw new Error(`wash ${id} blend fg ${fgRatio.toFixed(2)} < ${textFloor}`);
                                for (const [rule, tokenArgb] of Object.entries(syntax.tokenColors)) {
                                    const tier = SYNTAX_TIER_BY_RULE[rule];
                                    const floor = tier === 'muted' ? 3.0 : textFloor;
                                    const ratio = calculateContrastRatio(tokenArgb, blended);
                                    const wKey = `${appearanceLabel}|wash-${rule}`;
                                    const wCur = washWorst.get(wKey);
                                    if (wCur === undefined || ratio < wCur.ratio) washWorst.set(wKey, { ratio, where: `${label} ${id}` });
                                    if (ratio < floor) throw new Error(`wash ${id} blend syntax ${rule} ${ratio.toFixed(2)} < ${floor}`);
                                }
                            }
                            for (const [a, b] of [['diffEditor.insertedLineBackground', 'diffEditor.removedLineBackground'], ['diffEditor.insertedTextBackground', 'diffEditor.removedTextBackground']]) {
                                const distance = rgbDistance(blends[a], blends[b]);
                                if (distance < washMinDistance) {
                                    washMinDistance = distance;
                                    washMinWhere = `${label} ${a} vs ${b}`;
                                }
                                if (distance < 40) throw new Error(`wash ${a} vs ${b} distance ${distance.toFixed(0)} < 40`);
                            }
                        } catch (error) {
                            failures += 1;
                            console.log(`FAIL ${label} (wash): ${error.message}`);
                            continue;
                        }
                        // Overview-ruler mark residual under the translucent slider.
                        if (contrastName === 'default') {
                            const surface = schemeAppearance[mapping.colors['editor.background']];
                            const markAlpha = MARK_ALPHA;
                            for (const state of SLIDER_STATES) {
                                const slider = mapping.colors[`scrollbarSlider.${state}`];
                                const sliderColor = schemeAppearance[slider.role];
                                const sliderAlpha = slider.alpha;
                                const track = blend(sliderColor, surface, sliderAlpha);
                                for (const value of paletteValues('text')) {
                                    const mark = blend(resolveSemanticColor(value, appearance, 'default'), surface, markAlpha);
                                    const residual = calculateContrastRatio(blend(sliderColor, mark, sliderAlpha), track);
                                    const residualKey = `${appearanceLabel}|${state}`;
                                    const current = sliderResidual.get(residualKey);
                                    if (current === undefined || residual < current.residual) {
                                        sliderResidual.set(residualKey, { residual, where: `${label} ${value.palette}` });
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }

    console.log('== worst semantic ratio per palette+tier (floor: text 4.5/3.0 reduced, muted 3.0; wash verified by blend, not opaque) ==');
    for (const [key, { ratio, where }] of [...worst.entries()].sort()) {
        console.log(`${key.padEnd(28)} ${ratio.toFixed(2).padStart(6)}  (${where})`);
    }

    console.log('== worst wash-blend ratio per appearance|check (fg floor 4.5/3.0 reduced, syntax muted 3.0) ==');
    for (const [key, { ratio, where }] of [...washWorst.entries()].sort()) {
        console.log(`${key.padEnd(28)} ${ratio.toFixed(2).padStart(6)}  (${where})`);
    }
    console.log(`== min inserted-vs-removed wash distance (floor 40) ==\nmin ${washMinDistance.toFixed(0)}  (${washMinWhere})`);

    console.log('== ruler mark residual through slider (higher = more visible; default contrast) ==');
    for (const [key, { residual, where }] of [...sliderResidual.entries()].sort()) {
        const flag = residual < 1.2 ? ' LOW' : '';
        console.log(`${key.padEnd(20)} ${residual.toFixed(2).padStart(5)}${flag}  (${where})`);
    }

    console.log(failures === 0 ? 'probe: all combos passed' : `probe: ${failures} failures`);
    if (failures > 0) process.exit(1);
}

main();
