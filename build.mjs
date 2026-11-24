// Gera index.html a partir de src/deck.html, embutindo as fontes WOFF2 de ./fonts em base64.
// Uso: node build.mjs
import { readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(fileURLToPath(import.meta.url));
const RANGES = {
  latin: 'U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD',
  'latin-ext': 'U+0100-02BA, U+02BD-02C5, U+02C7-02CC, U+02CE-02D7, U+02DD-02FF, U+0304, U+0308, U+0329, U+1D00-1DBF, U+1E00-1E9F, U+1EF2-1EFF, U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF',
};
const FAMILIES = [['Inter', 'inter'], ['Space Grotesk', 'space-grotesk']];
const WEIGHTS = [400, 600, 700];

let css = '';
for (const [family, slug] of FAMILIES) {
  for (const w of WEIGHTS) {
    for (const subset of ['latin-ext', 'latin']) {
      const file = join(root, 'fonts', `${slug}-${subset}-${w}-normal.woff2`);
      const b64 = readFileSync(file).toString('base64');
      css += `@font-face{font-family:'${family}';font-style:normal;font-weight:${w};font-display:block;` +
        `src:url(data:font/woff2;base64,${b64}) format('woff2');unicode-range:${RANGES[subset]};}\n`;
    }
  }
}

const tpl = readFileSync(join(root, 'src', 'deck.html'), 'utf8');
if (!tpl.includes('/*@@FONTS@@*/')) throw new Error('placeholder de fontes não encontrado');
const out = tpl.replace('/*@@FONTS@@*/', () => css);
writeFileSync(join(root, 'index.html'), out);
console.log(`index.html gerado: ${(out.length / 1024).toFixed(0)} KB`);
