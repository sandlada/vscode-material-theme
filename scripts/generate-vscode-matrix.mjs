/**
 * Sweep the full MD3 VSCode theme matrix into `./themes/`.
 *
 * Combos: 9 variants x 12 HCT hues (`0-330` step `30`, Monochrome hue `0`
 * only) = 97 combos. Per combo exactly three files:
 * `light`, `dark`, `dark-oled` (NO `light-oled` — it would be hex-identical
 * to plain light). Default contrast run = 291 files.
 *
 * Each file's picker `name` is `MD3:{Variant} {hue} {Light|Dark|Dark OLED}`
 * (+ ` High`/` Reduced` for non-default contrast). File stems stay
 * colon-free (`md3-{variant}-{hue}-{light|dark|dark-oled}...`) because
 * `a:b` file names are NTFS alternate-data-streams on Windows.
 *
 * Must run with Bun (`bun scripts/generate-vscode-matrix.mjs --out ./themes`).
 * Fails fast: any single-run contrast/guard failure aborts the sweep.
 * Rewrites `package.json` `contributes.themes` to match the emitted files.
 *
 * Usage:
 *   bun scripts/generate-vscode-matrix.mjs --out ./themes [--contrast default|high|reduced] [--spec 2025|2021]
 */

import { mkdir, readdir, rm, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = dirname(HERE);
const SINGLE = join(HERE, 'generate-vscode-theme.mjs');

const VARIANTS = Object.freeze([
    'Monochrome',
    'Neutral',
    'TonalSpot',
    'Vibrant',
    'Expressive',
    'Fidelity',
    'Content',
    'Rainbow',
    'FruitSalad'
]);

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

const HUES = Object.freeze([0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330]);
const CONTRAST_SLUGS = Object.freeze({ default: '', high: '-high', reduced: '-reduced' });
const CONTRAST_LABELS = Object.freeze({ default: '', high: ' High', reduced: ' Reduced' });

function fail(message) {
    console.error(`error: ${message}`);
    process.exit(1);
}

function parseArgs(argv) {
    const args = { contrast: 'default', spec: '2025' };
    for (let i = 0; i < argv.length; i += 1) {
        const flag = argv[i];
        const value = argv[i + 1];
        if (value === undefined || value.startsWith('--')) fail(`missing value for ${flag}`);
        if (flag === '--out') args.out = value;
        else if (flag === '--contrast') args.contrast = value;
        else if (flag === '--spec') args.spec = value;
        else fail(`unknown flag ${flag}`);
        i += 1;
    }
    if (!args.out) fail('--out is required');
    if (!(args.contrast in CONTRAST_SLUGS)) fail(`unknown contrast '${args.contrast}' (expected default|high|reduced)`);
    if (args.spec !== '2025' && args.spec !== '2021') fail(`unknown spec '${args.spec}' (expected 2025|2021)`);
    return args;
}

async function runSingle(variant, hue, out, contrast, spec, oled) {
    const cmd = ['bun', SINGLE, '--variant', variant, '--hue', String(hue), '--out', out, '--contrast', contrast, '--spec', spec];
    if (oled) cmd.push('--oled');
    const proc = Bun.spawnSync(cmd, { cwd: ROOT, stdout: 'inherit', stderr: 'inherit' });
    if (proc.exitCode !== 0) fail(`single-run failed for ${variant} ${hue}${oled ? ' (oled)' : ''} (exit ${proc.exitCode})`);
}

async function main() {
    const args = parseArgs(process.argv.slice(2));
    const outDir = resolve(ROOT, args.out);
    const contrastSlug = CONTRAST_SLUGS[args.contrast];
    const contrastLabel = CONTRAST_LABELS[args.contrast];
    await mkdir(outDir, { recursive: true });

    // Drop stale matrix output (incl. legacy `*-light-oled-*` files, which
    // are no longer emitted) so `themes/` exactly matches this sweep.
    for (const entry of await readdir(outDir)) {
        if (entry.startsWith('md3-') && entry.endsWith('-color-theme.json')) {
            await rm(join(outDir, entry));
        }
    }

    const entries = [];
    for (const variant of VARIANTS) {
        const hues = variant === 'Monochrome' ? [0] : [...HUES];
        for (const hue of hues) {
            await runSingle(variant, hue, args.out, args.contrast, args.spec, false);
            await runSingle(variant, hue, args.out, args.contrast, args.spec, true);
            const slug = `md3-${VARIANT_SLUGS[variant]}-${hue}`;
            entries.push(
                {
                    label: `MD3:${variant} ${hue} Light${contrastLabel}`,
                    uiTheme: 'vs',
                    path: `./themes/${slug}-light${contrastSlug}-color-theme.json`
                },
                {
                    label: `MD3:${variant} ${hue} Dark${contrastLabel}`,
                    uiTheme: 'vs-dark',
                    path: `./themes/${slug}-dark${contrastSlug}-color-theme.json`
                },
                {
                    label: `MD3:${variant} ${hue} Dark OLED${contrastLabel}`,
                    uiTheme: 'vs-dark',
                    path: `./themes/${slug}-dark-oled${contrastSlug}-color-theme.json`
                }
            );
        }
    }

    // Register every emitted file in the extension manifest so the picker
    // sees the full matrix.
    const pkgPath = join(ROOT, 'package.json');
    const pkg = JSON.parse(await readFile(pkgPath, 'utf8'));
    pkg.contributes = pkg.contributes ?? {};
    pkg.contributes.themes = entries;
    await writeFile(pkgPath, `${JSON.stringify(pkg, null, 2)}\n`, 'utf8');
    console.log(`wrote ${entries.length} themes to ${outDir} + package.json`);
}

await main();
