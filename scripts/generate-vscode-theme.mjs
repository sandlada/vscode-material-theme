/**
 * Generate MD3 VSCode color-theme files from a source color.
 *
 * Appearances are exactly three: `light`, `dark`, `dark-oled`
 * (there is NO `light-oled`: `mcu-helper` resolves OLED only against the
 * dark scheme, so a light OLED file would be hex-identical to plain light).
 *
 * - Without `--oled`: emits the plain pair
 *   `md3-{variant}-{hue}-{light|dark}[-high|-reduced]-color-theme.json`
 *   e.g. `md3-expressive-150-dark-color-theme.json`
 * - With `--oled`: emits ONLY the dark OLED single file
 *   `md3-{variant}-{hue}-dark-oled[-high|-reduced]-color-theme.json`
 *   (pitch-black: `background` + `surface` -> `#000000`, all other roles
 *   unchanged).
 *
 * Picker `name`/`label` format is `MD3:{Variant} {hue} {Light|Dark|Dark OLED}`
 * (colon lives ONLY in the display name — never in file stems — because
 * `a:b` file names are NTFS alternate-data-streams on Windows and git
 * cannot check them out).
 * e.g. `MD3:Expressive 150 Dark OLED`.
 *
 * Must run with Bun (`bun scripts/generate-vscode-theme.mjs ...`):
 * plain Node cannot resolve `@material/material-color-utilities`
 * extensionless ESM imports.
 *
 * Usage:
 *   bun scripts/generate-vscode-theme.mjs --variant Expressive --source '#068f12' --out ./themes [--contrast default|high|reduced] [--spec 2025|2021] [--oled]
 *   bun scripts/generate-vscode-theme.mjs --variant Expressive --hue 150 --chroma 75 --tone 50 --out ./themes [...]
 * (--hue derives the source via HCT and names the file by hue number;
 * monochrome only uses hue 0.)
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { Hct } from '@material/material-color-utilities';
import { calculateContrastRatio, createTheme, formatHex, MaterialContrastLevel, MaterialVariant } from '@sandlada/mcu-helper';
import { VSCODE_COLOR_KEYS, VSCODE_SEMANTIC_KEYS, VSCODE_TOKEN_RULES } from '../src/vscode-schema.js';
import { resolveVscodeMapping } from '../src/vscode-mapping.js';
import { guardSemanticContrast, resolveSemanticColors, SEMANTIC_DIFF_WASH_IDS } from '../src/vscode-semantic-palettes.js';
import { resolveSyntaxPalettes, SYNTAX_TIER_BY_RULE } from '../src/vscode-syntax-palettes.js';

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

/** PascalCase variant -> kebab-case filename segment. */
const VARIANT_SLUGS = Object.freeze({
    Monochrome: 'monochrome',
    Neutral: 'neutral',
    TonalSpot: 'tonal-spot',
    Vibrant: 'vibrant',
    Expressive: 'expressive',
    Fidelity: 'fidelity',
    Content: 'content',
    Rainbow: 'rainbow',
    FruitSalad: 'fruit-salad'
});

// Suffix '' = default contrast (no suffix in the theme name).
const CONTRASTS = Object.freeze({
    default: { level: MaterialContrastLevel.Default, slug: '', group: 'default', textFloor: 4.5 },
    // Reduced is a soft low-contrast aesthetic by design: WCAG large-text
    // floor (3.0) instead of body-text floor (4.5).
    reduced: { level: MaterialContrastLevel.Reduced, slug: '-reduced', group: 'reduced', textFloor: 3.0 },
    high: { level: MaterialContrastLevel.High, slug: '-high', group: 'high', textFloor: 4.5 }
});

const APPEARANCES = Object.freeze([
    { name: 'light', label: 'Light', uiTheme: 'vs' },
    { name: 'dark', label: 'Dark', uiTheme: 'vs-dark' }
]);

function fail(message) {
    console.error(`error: ${message}`);
    process.exit(1);
}

function parseArgs(argv) {
    const args = { contrast: 'default', spec: '2025', chroma: '75', tone: '50', oled: false };
    for (let i = 0; i < argv.length; i += 1) {
        const flag = argv[i];
        if (flag === '--oled') {
            args.oled = true;
            continue;
        }
        const value = argv[i + 1];
        if (value === undefined || value.startsWith('--')) fail(`missing value for ${flag}`);
        if (flag === '--variant') args.variant = value;
        else if (flag === '--source') args.source = value;
        else if (flag === '--hue') args.hue = value;
        else if (flag === '--chroma') args.chroma = value;
        else if (flag === '--tone') args.tone = value;
        else if (flag === '--out') args.out = value;
        else if (flag === '--contrast') args.contrast = value;
        else if (flag === '--spec') args.spec = value;
        else fail(`unknown flag ${flag}`);
        i += 1;
    }
    if (!args.variant) fail('--variant is required');
    if (!args.out) fail('--out is required');
    if (!(args.variant in VARIANTS)) fail(`unknown variant '${args.variant}' (expected ${Object.keys(VARIANTS).join('|')})`);
    if (args.source !== undefined && args.hue !== undefined) fail('--source and --hue are mutually exclusive');
    if (args.source === undefined && args.hue === undefined) fail('one of --source or --hue is required');
    if (args.source !== undefined && !/^#[0-9a-f]{6}$/.test(args.source)) {
        fail(`--source must be lowercase '#rrggbb', got '${args.source}'`);
    }
    if (args.hue !== undefined) {
        args.hue = Number(args.hue);
        args.chroma = Number(args.chroma);
        args.tone = Number(args.tone);
        if (!Number.isInteger(args.hue) || args.hue < 0 || args.hue > 360) fail(`--hue must be an integer 0-360, got '${args.hue}'`);
        if (!(args.chroma >= 0 && args.chroma <= 150)) fail(`--chroma must be 0-150, got '${args.chroma}'`);
        if (!(args.tone >= 0 && args.tone <= 100)) fail(`--tone must be 0-100, got '${args.tone}'`);
        // Fixed-C/T hue source; HCT clamps out-of-gamut hues deterministically.
        args.source = formatHex(Hct.from(args.hue, args.chroma, args.tone).toInt());
    }
    if (!(args.contrast in CONTRASTS)) fail(`unknown contrast '${args.contrast}' (expected default|high|reduced)`);
    if (args.spec !== '2025' && args.spec !== '2021') fail(`unknown spec '${args.spec}' (expected 2025|2021)`);
    return args;
}

/**
 * Resolve one mapping value to static hex. Three shapes:
 * - role string -> DynamicScheme role hex;
 * - `{ role, alpha }` -> role hex + alpha suffix;
 * - `{ palette, tier, alpha? }` -> fixed semantic palette (frozen tone,
 *   resolved in `semanticInts`) + alpha suffix.
 */
function toHex(appearance, key, value, semanticInts) {
    if (typeof value === 'string') {
        if (!(value in appearance)) fail(`mapping role '${value}' missing from generated scheme`);
        return formatHex(appearance[value]);
    }
    if (value.palette !== undefined) {
        const int = semanticInts[key];
        if (typeof int !== 'number') fail(`semantic palette '${key}' unresolved (no frozen tone for '${value.palette}')`);
        return `${formatHex(int)}${value.alpha ?? ''}`;
    }
    if (!(value.role in appearance)) fail(`mapping role '${value.role}' missing from generated scheme`);
    return `${formatHex(appearance[value.role])}${value.alpha}`;
}

// Foreground/background pairs checked by the contrast guard. Each pair is
// [foreground ID, background ID or 'editor' (== editor.background)].
const TEXT_PAIRS = Object.freeze([
    ['editor.foreground', 'editor'],
    ['foreground', 'editor'],
    ['descriptionForeground', 'editor'],
    ['errorForeground', 'editor'],
    ['icon.foreground', 'editor'],
    ['textLink.foreground', 'editor'],
    ['editorError.foreground', 'editor'],
    ['editorInfo.foreground', 'editor'],
    ['editorLineNumber.activeForeground', 'editor'],
    ['sideBar.foreground', 'sideBar.background'],
    ['sideBarTitle.foreground', 'sideBar.background'],
    ['sideBarSectionHeader.foreground', 'sideBarSectionHeader.background'],
    ['activityBar.foreground', 'activityBar.activeBackground'],
    ['modernActivityBarItem.activeForeground', 'modernActivityBarItem.activeBackground'],
    ['activityBar.inactiveForeground', 'activityBar.background'],
    ['activityBarBadge.foreground', 'activityBarBadge.background'],
    ['tab.activeForeground', 'tab.activeBackground'],
    ['tab.inactiveForeground', 'tab.inactiveBackground'],
    ['tab.hoverForeground', 'tab.hoverBackground'],
    ['tab.selectedForeground', 'tab.selectedBackground'],
    ['tab.unfocusedActiveForeground', 'tab.unfocusedActiveBackground'],
    ['tab.unfocusedHoverForeground', 'tab.unfocusedHoverBackground'],
    ['tab.unfocusedInactiveForeground', 'tab.unfocusedInactiveBackground'],
    ['modernEditorTab.activeForeground', 'modernEditorTab.activeBackground'],
    ['modernEditorTab.hoverForeground', 'modernEditorTab.hoverBackground'],
    ['modernTab.activeForeground', 'modernTab.activeBackground'],
    ['modernTab.hoverForeground', 'modernTab.hoverBackground'],
    ['statusBar.foreground', 'statusBar.background'],
    ['statusBar.debuggingForeground', 'statusBar.debuggingBackground'],
    ['titleBar.activeForeground', 'titleBar.activeBackground'],
    ['titleBar.inactiveForeground', 'titleBar.inactiveBackground'],
    ['panelTitle.activeForeground', 'panel.background'],
    ['panelTitle.inactiveForeground', 'panel.background'],
    ['input.foreground', 'input.background'],
    ['dropdown.foreground', 'dropdown.background'],
    ['button.foreground', 'button.background'],
    ['button.secondaryForeground', 'button.secondaryBackground'],
    ['badge.foreground', 'badge.background'],
    ['list.activeSelectionForeground', 'list.activeSelectionBackground'],
    ['list.inactiveSelectionForeground', 'list.inactiveSelectionBackground'],
    ['list.hoverForeground', 'list.hoverBackground'],
    ['list.highlightForeground', 'editor'],
    ['list.errorForeground', 'editor'],
    ['list.warningForeground', 'editor'],
    ['quickInput.foreground', 'quickInput.background'],
    ['notifications.foreground', 'notifications.background'],
    ['terminal.foreground', 'terminal.background'],
    ['terminal.foreground', 'terminal.selectionBackground'],
    ['editor.foreground', 'editor.inactiveSelectionBackground'],
    ['menu.foreground', 'menu.background'],
    ['menu.selectionForeground', 'menu.selectionBackground'],
    // Quick-input focused row: `quickInputList.focusForeground` derives
    // from `list.activeSelectionForeground` (onSurface), so guard that on
    // the explicit `quickInputList.focusBackground` step.
    ['list.activeSelectionForeground', 'quickInputList.focusBackground'],
    ['gitDecoration.addedResourceForeground', 'editor'],
    ['gitDecoration.modifiedResourceForeground', 'editor'],
    ['gitDecoration.deletedResourceForeground', 'editor'],
    ['gitDecoration.untrackedResourceForeground', 'editor']
]);

const MUTED_PAIRS = Object.freeze([
    ['input.placeholderForeground', 'input.background'],
    ['editorLineNumber.foreground', 'editor']
]);

// Blended-selection checks: [foreground ID, wash ID, underlying background
// ID]. Blending is an sRGB lerp approximation. Floor is 3.0 (transient
// highlight text, user-accepted): these pairs probe measured ranges like
// 3.97-8.51 and only fail closed on real disasters.
const BLEND_PAIRS = Object.freeze([
    ['editor.foreground', 'editor.selectionBackground', 'editor.background'],
    ['editor.foreground', 'editor.inactiveSelectionBackground', 'editor.background'],
    ['input.foreground', 'selection.background', 'input.background'],
    ['list.activeSelectionForeground', 'list.activeSelectionBackground', 'sideBar.background'],
    ['terminal.foreground', 'terminal.selectionBackground', 'terminal.background']
]);

function hexToRgb(hex) {
    return [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
}

function blendInt(fgInt, bgInt, alphaHex) {
    const a = parseInt(alphaHex, 16) / 255;
    const f = [(fgInt >> 16) & 255, (fgInt >> 8) & 255, fgInt & 255];
    const b = [(bgInt >> 16) & 255, (bgInt >> 8) & 255, bgInt & 255];
    const mixed = f.map((v, i) => Math.round(v * a + b[i] * (1 - a)));
    return (255 << 24) | (mixed[0] << 16) | (mixed[1] << 8) | mixed[2];
}

/**
 * Fail closed when any mapped foreground is unreadable on its background.
 * Translucent washes (`{ role, alpha }`) are verified by construction
 * (neutral/tinted role + editor foreground shining through) and skipped.
 */
function guardContrast(appearance, mapping, label, textFloor) {
    const violations = [];
    // NOTE: calculateContrastRatio takes ARGB ints (as stored in the
    // scheme), not hex strings.
    const intOf = (id) => {
        if (id === 'editor') return appearance[mapping.colors['editor.background']];
        const value = mapping.colors[id];
        if (typeof value !== 'string') return null;
        return appearance[value];
    };
    const check = (fgInt, bgInt, floor, tier, what) => {
        if (fgInt === null || bgInt === null) return;
        const ratio = calculateContrastRatio(fgInt, bgInt);
        if (ratio < floor) violations.push(`${tier} ${what} ratio ${ratio.toFixed(2)} < ${floor}`);
    };
    for (const [fg, bg] of TEXT_PAIRS) check(intOf(fg), intOf(bg), textFloor, 'text', `${fg} on ${bg}`);
    for (const [fg, bg] of MUTED_PAIRS) check(intOf(fg), intOf(bg), 3.0, 'muted', `${fg} on ${bg}`);
    for (const [fg, wash, bg] of BLEND_PAIRS) {
        const washValue = mapping.colors[wash];
        if (typeof washValue === 'string') continue;
        check(intOf(fg), blendInt(appearance[washValue.role], intOf(bg), washValue.alpha), 3.0, 'blend', `${fg} on ${wash} over ${bg}`);
    }
    // Syntax readability is guarded separately by guardSyntaxContrast
    // (palette tones vs editor + selection backgrounds). Selection
    // readability of the UI foreground stays covered here via
    // BLEND_PAIRS + TEXT_PAIRS.
    if (violations.length > 0) {
        fail(`unreadable ${label} mapping (override in src/vscode-mapping.js):\n  ${violations.join('\n  ')}`);
    }
}

/**
 * Fail closed when any `scrollbarSlider.*` value is not translucent.
 *
 * VSCode fades the scrollbar in ABOVE the overview-ruler canvas
 * (`.visible` in `scrollbars.css` carries `z-index: 11`), so an opaque
 * slider hides git diff / problem marks (user-reported defect). VSCode's
 * own defaults are translucent (`#797979` @ 40%); every state is capped at
 * alpha `b3` (70%) so >=30% of a mark always bleeds through.
 */
const SLIDER_MAX_ALPHA = 0xb3;
const SLIDER_KEYS = Object.freeze(['scrollbarSlider.background', 'scrollbarSlider.hoverBackground', 'scrollbarSlider.activeBackground']);

function guardSliderTranslucency(mapping, label) {
    const violations = [];
    for (const key of SLIDER_KEYS) {
        const value = mapping.colors[key];
        const alpha = typeof value === 'object' && value !== null ? value.alpha : undefined;
        if (typeof value === 'string' || !/^[0-9a-f]{2}$/.test(alpha ?? '') || parseInt(alpha, 16) > SLIDER_MAX_ALPHA) {
            violations.push(`${key} must be { role, alpha } with alpha <= b3, got ${JSON.stringify(value)}`);
        }
    }
    if (violations.length > 0) {
        fail(`opaque scrollbar slider in ${label} (overview-ruler marks would be hidden):\n  ${violations.join('\n  ')}`);
    }
}

/**
 * Fail closed when any palette syntax color is unreadable on the editor
 * surface or inside the opaque selection steps. This re-verifies (in the
 * generator, against hex-free ARGB ints) what `resolveSyntaxPalettes`
 * already guarantees by construction, so a module/generator skew aborts
 * instead of shipping.
 */
function guardSyntaxContrast(tokenColors, tokenTones, editorBg, selectionBgs, contrastGroup, label) {
    const textFloor = contrastGroup === 'reduced' ? 3.0 : 4.5;
    const violations = [];
    for (const rule of VSCODE_TOKEN_RULES) {
        const argb = tokenColors[rule.key];
        if (argb === undefined) {
            violations.push(`syntax missing rule ${rule.key}`);
            continue;
        }
        const tier = SYNTAX_TIER_BY_RULE[rule.key];
        const floor = tier === 'muted' ? 3.0 : textFloor;
        const worst = Math.min(...[editorBg, ...selectionBgs].map((bg) => calculateContrastRatio(argb, bg)));
        if (worst < floor) {
            violations.push(`syntax ${rule.key} (T${tokenTones[rule.key]}) ratio ${worst.toFixed(2)} < ${floor}`);
        }
    }
    if (violations.length > 0) {
        fail(`unreadable ${label} syntax (retune src/vscode-syntax-palettes.js):\n  ${violations.join('\n  ')}`);
    }
}

/**
 * Fail closed when fixed red/green diff washes hide text.
 *
 * Each wash is a translucent palette tint (`{ palette, tier: 'wash', alpha }`)
 * over `editor.background`. The editor foreground AND every syntax token
 * must survive on the blend (the diff editor shows code), and inserted vs
 * removed blends must stay distinguishable (RGB distance floor catches a
 * gray regression where all four IDs collapse to one neutral).
 */
function guardDiffWashContrast({ schemeAppearance, mapping, semanticInts, editorBg, editorFgInt, syntax, contrastGroup, label }) {
    const textFloor = contrastGroup === 'reduced' ? 3.0 : 4.5;
    const violations = [];
    const blends = {};
    for (const id of SEMANTIC_DIFF_WASH_IDS) {
        const value = mapping.colors[id];
        const washArgb = semanticInts[id];
        if (typeof value !== 'object' || value === null || value.tier !== 'wash' || typeof washArgb !== 'number') {
            violations.push(`diff wash '${id}' must be { palette, tier: 'wash', alpha }, got ${JSON.stringify(value)}`);
            continue;
        }
        const blended = blendInt(washArgb, editorBg, value.alpha);
        blends[id] = blended;
        const fgRatio = calculateContrastRatio(editorFgInt, blended);
        if (fgRatio < textFloor) {
            violations.push(`diff wash ${id} (blend) editor.foreground ratio ${fgRatio.toFixed(2)} < ${textFloor}`);
        }
        for (const rule of VSCODE_TOKEN_RULES) {
            const argb = syntax.tokenColors[rule.key];
            if (argb === undefined) {
                violations.push(`diff wash ${id} syntax missing rule ${rule.key}`);
                continue;
            }
            const tier = SYNTAX_TIER_BY_RULE[rule.key];
            const floor = tier === 'muted' ? 3.0 : textFloor;
            const ratio = calculateContrastRatio(argb, blended);
            if (ratio < floor) {
                violations.push(`diff wash ${id} (blend) syntax ${rule.key} ratio ${ratio.toFixed(2)} < ${floor}`);
                break;
            }
        }
    }
    const rgbDistance = (a, b) => {
        const dr = ((a >> 16) & 255) - ((b >> 16) & 255);
        const dg = ((a >> 8) & 255) - ((b >> 8) & 255);
        const db = (a & 255) - (b & 255);
        return Math.sqrt(dr * dr + dg * dg + db * db);
    };
    for (const [a, b] of [['diffEditor.insertedLineBackground', 'diffEditor.removedLineBackground'], ['diffEditor.insertedTextBackground', 'diffEditor.removedTextBackground']]) {
        if (blends[a] !== undefined && blends[b] !== undefined) {
            const distance = rgbDistance(blends[a], blends[b]);
            if (distance < 40) {
                violations.push(`diff wash ${a} vs ${b} distance ${distance.toFixed(0)} < 40 (inserted vs removed indistinguishable)`);
            }
        }
    }
    // Silence unused-var lint for the resolved scheme half (kept for symmetry
    // with the other guards): the blend inputs are pre-resolved ints.
    void schemeAppearance;
    if (violations.length > 0) {
        fail(`unreadable ${label} diff washes (retune wash tones in src/vscode-semantic-palettes.js):\n  ${violations.join('\n  ')}`);
    }
}

/** Build one VSCode color-theme file object for a single appearance. */
function buildThemeFile(name, appearance, mapping, syntaxHex, semanticInts) {
    const colors = {};
    for (const key of VSCODE_COLOR_KEYS) colors[key] = toHex(appearance, key, mapping.colors[key], semanticInts);
    const tokenColors = VSCODE_TOKEN_RULES.map((rule) => {
        const setting = { foreground: syntaxHex.tokenColors[rule.key] };
        if (rule.fontStyle) setting.fontStyle = rule.fontStyle;
        return { name: rule.key, scope: rule.scopes, settings: setting };
    });
    const semanticTokenColors = {};
    for (const key of VSCODE_SEMANTIC_KEYS) semanticTokenColors[key] = syntaxHex.semanticColors[key];
    return {
        $schema: 'vscode://schemas/color-theme',
        name,
        colors,
        tokenColors,
        semanticHighlighting: true,
        semanticTokenColors
    };
}

async function emitOne(scheme, appearanceName, stem, themeName, mapping, contrast, args) {
    guardContrast(scheme[appearanceName], mapping, `${stem} (${appearanceName})`, contrast.textFloor);
    guardSliderTranslucency(mapping, `${stem} (${appearanceName})`);
    // Semantic (fixed-palette) diff/problem colors: frozen tones resolved
    // once per file, then re-verified against the real scheme backgrounds.
    let semanticInts;
    try {
        semanticInts = resolveSemanticColors(appearanceName, contrast.group, mapping.colors);
        guardSemanticContrast(appearanceName, scheme[appearanceName], mapping.colors, semanticInts, contrast.group, `${stem} (${appearanceName})`);
    } catch (error) {
        fail(error.message);
    }
    // Syntax backgrounds mirror the mapping: editor surface + the two
    // opaque neutral selection steps syntax must survive inside of.
    const editorRole = mapping.colors['editor.background'];
    const selectionRole = mapping.colors['editor.selectionBackground'];
    const inactiveRole = mapping.colors['editor.inactiveSelectionBackground'];
    if (typeof editorRole !== 'string' || typeof selectionRole !== 'string' || typeof inactiveRole !== 'string') {
        fail(`syntax background roles must be opaque strings for ${stem} (${appearanceName})`);
    }
    const editorBg = scheme[appearanceName][editorRole];
    const selectionBgs = [scheme[appearanceName][selectionRole], scheme[appearanceName][inactiveRole]];
    let syntax;
    try {
        syntax = resolveSyntaxPalettes(appearanceName, contrast.group, [editorBg, ...selectionBgs]);
    } catch (error) {
        fail(`${stem} (${appearanceName}) ${error.message}`);
    }
    guardSyntaxContrast(syntax.tokenColors, syntax.tokenTones, editorBg, selectionBgs, contrast.group, `${stem} (${appearanceName})`);
    const editorFgRole = mapping.colors['editor.foreground'];
    if (typeof editorFgRole !== 'string') {
        fail(`editor foreground must be an opaque role string for ${stem} (${appearanceName})`);
    }
    guardDiffWashContrast({
        schemeAppearance: scheme[appearanceName],
        mapping,
        semanticInts,
        editorBg,
        editorFgInt: scheme[appearanceName][editorFgRole],
        syntax,
        contrastGroup: contrast.group,
        label: `${stem} (${appearanceName})`
    });
    const syntaxHex = {
        tokenColors: Object.fromEntries(Object.entries(syntax.tokenColors).map(([k, v]) => [k, formatHex(v)])),
        semanticColors: Object.fromEntries(Object.entries(syntax.semanticColors).map(([k, v]) => [k, formatHex(v)]))
    };
    // Semantic tokens must track their TextMate counterparts exactly.
    const counterpart = { newOperator: 'keywordControl', stringLiteral: 'string', customLiteral: 'function', numberLiteral: 'number' };
    for (const [semantic, rule] of Object.entries(counterpart)) {
        if (syntaxHex.semanticColors[semantic] !== syntaxHex.tokenColors[rule]) {
            fail(`${stem} (${appearanceName}) semantic '${semantic}' diverged from token '${rule}'`);
        }
    }
    const outFile = join(args.out, `${stem}-color-theme.json`);
    await writeFile(outFile, `${JSON.stringify(buildThemeFile(themeName, scheme[appearanceName], mapping, syntaxHex, semanticInts), null, 2)}\n`, 'utf8');
    console.log(`wrote ${outFile}`);
}

function themeDisplayName(variant, hueOrSource, appearanceLabel, contrastSlug) {
    const contrastLabel = contrastSlug === '' ? '' : contrastSlug === '-high' ? ' High' : ' Reduced';
    return `MD3:${variant} ${hueOrSource} ${appearanceLabel}${contrastLabel}`;
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const contrast = CONTRASTS[args.contrast];
    // Each resolved (appearance, contrast group) mapping must cover the
    // schema exactly: no missing key, no extra key.
    const wantedAppearances = args.oled ? ['dark'] : APPEARANCES.map((a) => a.name);
    for (const name of wantedAppearances) {
        const mapping = resolveVscodeMapping(name, contrast.group, args.variant);
        const missing = VSCODE_COLOR_KEYS.filter((k) => !(k in mapping.colors));
        const extra = Object.keys(mapping.colors).filter((k) => !VSCODE_COLOR_KEYS.includes(k));
        if (missing.length > 0 || extra.length > 0) {
            fail(`${name} mapping/schema drift (colors missing: ${missing.join(',') || 'none'}; extra: ${extra.join(',') || 'none'})`);
        }
    }

    const slug = args.hue === undefined
        ? `md3-${VARIANT_SLUGS[args.variant]}-${args.source}`
        : `md3-${VARIANT_SLUGS[args.variant]}-${args.hue}`;
    const hueOrSource = args.hue === undefined ? args.source : String(args.hue);
    if (args.hue !== undefined) console.log(`hue ${args.hue} (C${args.chroma} T${args.tone}) -> source ${args.source}`);
    await mkdir(args.out, { recursive: true });
    const scheme = createTheme({
        variant: VARIANTS[args.variant],
        contrastLevel: contrast.level,
        specVersion: args.spec,
        platform: 'phone',
        oled: args.oled
    })(args.source);
    if (args.oled) {
        // OLED emits ONLY the dark file. Light OLED would be hex-identical
        // to plain light (mcu-helper resolves OLED against dark only), so
        // it is never emitted: per-combo appearances are light / dark /
        // dark-oled.
        const mapping = resolveVscodeMapping('dark', contrast.group, args.variant);
        const stem = `${slug}-dark-oled${contrast.slug}`;
        const themeName = themeDisplayName(args.variant, hueOrSource, 'Dark OLED', contrast.slug);
        await emitOne(scheme, 'dark', stem, themeName, mapping, contrast, args);
        return;
    }
    for (const { name, label } of APPEARANCES) {
        const mapping = resolveVscodeMapping(name, contrast.group, args.variant);
        const stem = `${slug}-${name}${contrast.slug}`;
        const themeName = themeDisplayName(args.variant, hueOrSource, label, contrast.slug);
        await emitOne(scheme, name, stem, themeName, mapping, contrast, args);
    }
}

await main();
