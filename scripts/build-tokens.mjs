#!/usr/bin/env node
// Genera tokens/tokens.css, tokens/tailwind.preset.js y tokens/contrast.json
// a partir de tokens/tokens.json. Node puro, sin dependencias.
// Uso: node scripts/build-tokens.mjs [--check]
//   --check: falla si algún derivado no coincide con su mezcla o si algún
//            par de texto documentado baja de WCAG AA.

import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const tokens = JSON.parse(readFileSync(join(root, 'tokens/tokens.json'), 'utf8'));
const CHECK = process.argv.includes('--check');
const errors = [];

// ---------- utilidades de color ----------
const hexToRgb = (hex) => [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16));
const rgbToHex = (rgb) => '#' + rgb.map((v) => Math.round(v).toString(16).padStart(2, '0')).join('').toUpperCase();
// Mezcla lineal en sRGB, equivalente a color-mix(in srgb, base, with amount).
const mix = (base, withHex, amount) =>
  rgbToHex(hexToRgb(base).map((v, i) => v * (1 - amount) + hexToRgb(withHex)[i] * amount));
const luminance = (hex) => {
  const [r, g, b] = hexToRgb(hex).map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};
export const contrast = (a, b) => {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return Math.round(((hi + 0.05) / (lo + 0.05)) * 100) / 100;
};

// ---------- resolución de referencias {a.b.c} ----------
const get = (path) => path.split('.').reduce((o, k) => o?.[k], tokens);
const resolve = (v) => {
  if (typeof v === 'string' && /^\{.+\}$/.test(v)) {
    const t = get(v.slice(1, -1));
    if (!t) throw new Error(`Referencia rota: ${v}`);
    return resolve(t.$value);
  }
  return v;
};
const refName = (v) => (typeof v === 'string' && /^\{color\./.test(v) ? v.slice(7, -1) : null);

// ---------- colores primitivos y derivados ----------
const colors = {};
const pending = [];
for (const [name, t] of Object.entries(tokens.color)) {
  if (name.startsWith('$')) continue;
  const ext = t.$extensions?.doga ?? {};
  if (ext.status === 'pending') { pending.push(name); continue; }
  if (ext.mix) {
    const { base, with: w, amount } = ext.mix;
    const computed = mix(tokens.color[base].$value, tokens.color[w].$value, amount);
    if (computed !== t.$value.toUpperCase()) {
      errors.push(`Derivado ${name}: tokens.json dice ${t.$value}, la mezcla da ${computed}`);
    }
    colors[name] = computed;
  } else {
    colors[name] = t.$value.toUpperCase();
  }
}

const semantic = (mode) =>
  Object.fromEntries(
    Object.entries(tokens.semantic[mode])
      .filter(([k]) => !k.startsWith('$'))
      .map(([k, t]) => [k, { ref: refName(t.$value), hex: resolve(t.$value) }])
  );
const dark = semantic('dark');
const light = semantic('light');

// ---------- contraste ----------
// Pares documentados en la sección 4.4 + todos los pares semánticos texto/fondo.
const named = [
  ['white', 'blue', 'Cuerpo', 'body'],
  ['yellow', 'blue', 'Titulares, links', 'large'],
  ['blue', 'yellow', 'Texto de CTA', 'body'],
  ['black', 'yellow', 'Alternativa de CTA', 'body'],
  ['black', 'grey', 'Cuerpo modo claro', 'body'],
  ['black', 'white', 'Cuerpo modo claro', 'body'],
  ['slate', 'white', 'Secundario', 'body'],
  ['slate', 'grey', 'Secundario sobre grey', 'body'],
  ['gray', 'blue', 'Captions', 'body'],
  ['gray', 'blue-700', 'Captions sobre bg-secondary', 'body'],
  ['grey', 'blue', 'Texto secundario oscuro', 'body'],
  ['yellow', 'black', 'Titulares sobre black', 'large'],
  ['white', 'black', 'Cuerpo sobre black', 'body'],
  ['blue', 'white', 'Titulares modo claro', 'large'],
  ['blue', 'grey', 'Titulares sobre grey', 'large'],
  ['blue', 'yellow-600', 'CTA hover', 'body'],
  ['error', 'white', 'Error modo claro', 'body'],
  ['error', 'grey', 'Error sobre grey', 'body'],
  ['yellow', 'white', 'PROHIBIDO', 'forbidden'],
  ['yellow', 'grey', 'PROHIBIDO', 'forbidden'],
  ['error', 'blue', 'No usar como texto (ver TODO error)', 'forbidden'],
];
const threshold = { body: 4.5, large: 3, forbidden: Infinity };
const pairs = named.map(([fg, bg, use, kind]) => {
  const ratio = contrast(colors[fg], colors[bg]);
  const pass = kind === 'forbidden' ? false : ratio >= threshold[kind];
  if (kind !== 'forbidden' && !pass) errors.push(`Contraste ${fg} sobre ${bg}: ${ratio}:1 < ${threshold[kind]}`);
  return { fg, bg, fgHex: colors[fg], bgHex: colors[bg], ratio, use, kind, pass };
});

// Pares semánticos por modo: cada texto contra cada fondo en que puede aparecer.
const semanticPairs = [];
for (const [mode, s] of [['dark', dark], ['light', light]]) {
  const combos = [
    ['text-primary', 'bg-primary', 'body'],
    ['text-primary', 'bg-secondary', 'body'],
    ['text-secondary', 'bg-primary', 'body'],
    ['text-secondary', 'bg-secondary', 'body'],
    ['text-muted', 'bg-primary', 'body'],
    ['text-muted', 'bg-secondary', 'body'],
    ['text-headline', 'bg-primary', 'large'],
    ['text-headline', 'bg-secondary', 'large'],
    ['text-on-accent', 'bg-accent', 'body'],
    ['cta-text', 'cta-bg', 'body'],
    ['cta-text', 'cta-bg-hover', 'body'],
    ['text-error', 'bg-primary', 'body'],
    ['text-error', 'bg-secondary', 'body'],
    ['focus-ring', 'bg-primary', 'ui'],
    ['border-accent', 'bg-primary', 'ui'],
  ];
  for (const [fg, bg, kind] of combos) {
    const ratio = contrast(s[fg].hex, s[bg].hex);
    const min = kind === 'ui' ? 3 : threshold[kind];
    const pass = ratio >= min;
    // En modo claro, border-accent (yellow) sobre white es decorativo; no bloquea.
    const blocking = !(mode === 'light' && fg === 'border-accent');
    if (!pass && blocking) errors.push(`Semántico ${mode}: ${fg} sobre ${bg} = ${ratio}:1 < ${min}`);
    semanticPairs.push({ mode, fg, bg, fgHex: s[fg].hex, bgHex: s[bg].hex, ratio, min, pass, blocking });
  }
}
// Bordes de input (WCAG 1.4.11, 3:1). Informativo: la spec fija estos valores.
const nonText = [
  ['blue-500', 'blue', 'Borde default de input, modo oscuro'],
  ['blue-500', 'blue-700', 'Borde default sobre bg-secondary, modo oscuro'],
  ['grey-300', 'white', 'Borde default de input, modo claro'],
  ['error', 'blue', 'Borde de error, modo oscuro'],
  ['error', 'white', 'Borde de error, modo claro'],
].map(([a, b, use]) => ({ a, b, use, ratio: contrast(colors[a], colors[b]), pass: contrast(colors[a], colors[b]) >= 3 }));

// ---------- CSS ----------
const fam = (arr) => arr.map((f) => (/\s/.test(f) ? `'${f}'` : f)).join(', ');
const lines = [];
const out = (s = '') => lines.push(s);

out('/* GENERADO por scripts/build-tokens.mjs desde tokens/tokens.json. No editar a mano. */');
out('/* DOGA Construction Design System. Modo oscuro por defecto; modo claro con [data-theme="light"]. */');
out();
out('/* TODO(DOGA): subir archivo de fuente Trash Hand con licencia web a /assets/fonts/TrashHand.woff2 */');
out('@font-face {');
out("  font-family: 'Trash Hand';");
out("  src: url('/assets/fonts/TrashHand.woff2') format('woff2');");
out('  font-weight: 400;');
out('  font-style: normal;');
out('  font-display: swap;');
out('}');
out();
out(':root {');
out('  /* Primitivos */');
for (const [k, v] of Object.entries(colors)) out(`  --doga-${k}: ${v};`);
for (const k of pending) out(`  --doga-${k}: initial; /* TODO(DOGA): confirmar HEX. No usar aún. */`);
out();
out('  /* Tipografía */');
for (const [k, t] of Object.entries(tokens.font.family)) if (!k.startsWith('$')) out(`  --font-${k}: ${fam(t.$value)};`);
for (const [k, t] of Object.entries(tokens.font.weight)) if (!k.startsWith('$')) out(`  --weight-${k}: ${t.$value};`);
for (const [k, t] of Object.entries(tokens.type)) {
  if (k.startsWith('$')) continue;
  const v = t.$value;
  out(`  --type-${k}: ${v.fontSize};`);
  out(`  --type-${k}-weight: ${resolve(v.fontWeight)};`);
  out(`  --type-${k}-leading: ${v.lineHeight};`);
  out(`  --type-${k}-tracking: ${v.letterSpacing};`);
  out(`  --type-${k}-transform: ${v.textTransform};`);
}
out();
out('  /* Espaciado */');
for (const [k, t] of Object.entries(tokens.space)) if (!k.startsWith('$')) out(`  --space-${k}: ${t.$value};`);
out();
out('  /* Radios */');
for (const [k, t] of Object.entries(tokens.radius)) if (!k.startsWith('$')) out(`  --radius-${k}: ${t.$value};`);
out();
out('  /* Bordes */');
for (const [k, t] of Object.entries(tokens.border.width)) if (!k.startsWith('$')) out(`  --border-width-${k}: ${t.$value};`);
out();
out('  /* Elevación. Sistema plano: única sombra permitida. */');
out(`  --shadow-overlay: ${tokens.shadow.overlay.$value};`);
out();
out('  /* Foco */');
out(`  --focus-width: ${tokens.focus['outline-width'].$value};`);
out(`  --focus-offset: ${tokens.focus['outline-offset'].$value};`);
out();
out('  /* Layout */');
for (const [k, t] of Object.entries(tokens.layout)) if (!k.startsWith('$')) out(`  --layout-${k}: ${resolve(t.$value)};`);
for (const [k, t] of Object.entries(tokens.breakpoint)) if (!k.startsWith('$')) out(`  --breakpoint-${k}: ${t.$value};`);
out();
out('  /* Tamaños de componente */');
for (const [k, t] of Object.entries(tokens.size)) if (!k.startsWith('$')) out(`  --size-${k}: ${t.$value};`);
for (const [k, t] of Object.entries(tokens.opacity)) if (!k.startsWith('$')) out(`  --opacity-${k}: ${t.$value};`);
out();
const semBlock = (s) => {
  for (const [k, { ref, hex }] of Object.entries(s)) out(`  --${k}: ${ref ? `var(--doga-${ref})` : hex};`);
};
out('  /* Semánticos. Modo oscuro (default de marca) */');
out('  color-scheme: dark;');
semBlock(dark);
out('}');
out();
out('[data-theme="light"] {');
out('  color-scheme: light;');
semBlock(light);
out('}');
out();
out('/* Foco visible en todos los interactivos (sección 6.5). */');
out(':where(a, button, input, select, textarea, summary, [tabindex]):focus-visible {');
out('  outline: var(--focus-width) solid var(--focus-ring);');
out('  outline-offset: var(--focus-offset);');
out('}');
writeFileSync(join(root, 'tokens/tokens.css'), lines.join('\n') + '\n');

// ---------- Tailwind preset ----------
// Todos los valores apuntan a CSS custom properties: el tema (claro/oscuro)
// cambia sin recompilar y ningún componente tiene valores literales.
const v = (name) => `var(--${name})`;
const semKeys = Object.keys(dark);
const pick = (prefix) =>
  Object.fromEntries(semKeys.filter((k) => k.startsWith(prefix)).map((k) => [k.slice(prefix.length), v(k)]));

const preset = {
  theme: {
    // Reemplazo total (no extend): la paleta por defecto de Tailwind no existe.
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      doga: Object.fromEntries([...Object.keys(colors).filter((k) => k !== 'error'), ...pending].map((k) => [k, v(`doga-${k}`)])),
    },
    screens: Object.fromEntries(Object.entries(tokens.breakpoint).filter(([k]) => !k.startsWith('$')).map(([k, t]) => [k, t.$value])),
    spacing: {
      0: '0px',
      px: '1px',
      ...Object.fromEntries(Object.keys(tokens.space).filter((k) => !k.startsWith('$')).map((k) => [k, v(`space-${k}`)])),
    },
    borderRadius: {
      none: '0px',
      ...Object.fromEntries(Object.keys(tokens.radius).filter((k) => !k.startsWith('$')).map((k) => [k, v(`radius-${k}`)])),
    },
    borderWidth: {
      0: '0px',
      DEFAULT: v('border-width-default'),
      ...Object.fromEntries(Object.keys(tokens.border.width).map((k) => [k, v(`border-width-${k}`)])),
    },
    boxShadow: { none: 'none', overlay: v('shadow-overlay') },
    fontFamily: Object.fromEntries(Object.keys(tokens.font.family).filter((k) => !k.startsWith('$')).map((k) => [k, v(`font-${k}`)])),
    fontWeight: Object.fromEntries(Object.keys(tokens.font.weight).filter((k) => !k.startsWith('$')).map((k) => [k, v(`weight-${k}`)])),
    fontSize: Object.fromEntries(
      Object.keys(tokens.type).filter((k) => !k.startsWith('$')).map((k) => [
        k,
        [v(`type-${k}`), { lineHeight: v(`type-${k}-leading`), letterSpacing: v(`type-${k}-tracking`), fontWeight: v(`type-${k}-weight`) }],
      ])
    ),
    extend: {
      backgroundColor: { ...pick('bg-'), cta: v('cta-bg'), 'cta-hover': v('cta-bg-hover') },
      textColor: { ...pick('text-'), cta: v('cta-text') },
      borderColor: { DEFAULT: v('border-default'), ...pick('border-') },
      outlineColor: { focus: v('focus-ring') },
      outlineWidth: { focus: v('focus-width') },
      outlineOffset: { focus: v('focus-offset') },
      maxWidth: { container: v('layout-container'), measure: v('layout-measure'), email: v('size-email') },
      height: Object.fromEntries(Object.keys(tokens.size).filter((k) => !k.startsWith('$')).map((k) => [k, v(`size-${k}`)])),
      minHeight: Object.fromEntries(Object.keys(tokens.size).filter((k) => !k.startsWith('$')).map((k) => [k, v(`size-${k}`)])),
      width: Object.fromEntries(Object.keys(tokens.size).filter((k) => !k.startsWith('$')).map((k) => [k, v(`size-${k}`)])),
      opacity: { 'hero-overlay': v('opacity-hero-overlay') },
    },
  },
};
writeFileSync(
  join(root, 'tokens/tailwind.preset.js'),
  `// GENERADO por scripts/build-tokens.mjs desde tokens/tokens.json. No editar a mano.\n` +
    `// Uso: module.exports = { presets: [require('./tokens/tailwind.preset.js')], content: [...] }\n` +
    `// Requiere cargar tokens/tokens.css en la app (define las CSS custom properties).\n` +
    `/** @type {import('tailwindcss').Config} */\n` +
    `module.exports = ${JSON.stringify(preset, null, 2)};\n`
);

// ---------- reporte de contraste ----------
writeFileSync(join(root, 'tokens/contrast.json'), JSON.stringify({ pairs, semanticPairs, nonText }, null, 2) + '\n');

console.log(`tokens.css, tailwind.preset.js y contrast.json generados.`);
console.log(`Pares documentados: ${pairs.filter((p) => p.kind !== 'forbidden' && p.pass).length} OK, ${pairs.filter((p) => p.kind === 'forbidden').length} prohibidos (documentados).`);
for (const n of nonText) if (!n.pass) console.log(`AVISO 1.4.11: ${n.use} ${n.a}/${n.b} = ${n.ratio}:1`);
if (errors.length) {
  console.error('\nErrores:\n- ' + errors.join('\n- '));
  if (CHECK) process.exit(1);
}
