// Gera roteiro/Roteiro_VenceHoje.pdf a partir do pitch atual.
// Lê as notas (NOTES) e o CONFIG de src/deck.html, as tabelas de VenceHoje_pitch_v2.md,
// tira prints de cada slide/clique do index.html e imprime o PDF no Edge (headless).
// Uso: node roteiro/gerar-roteiro.mjs        (rode `node build.mjs` antes se mudou o deck)
//      node roteiro/gerar-roteiro.mjs --sem-prints   (reaproveita as imagens já geradas)
import { spawn } from 'node:child_process';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { tmpdir } from 'node:os';

const DIR = dirname(fileURLToPath(import.meta.url));
const ROOT = join(DIR, '..');
const IMG = join(DIR, 'img');
const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
].find(existsSync);
if (!EDGE) throw new Error('Edge/Chrome não encontrado');

/* ---------- dados do deck ---------- */
const deck = readFileSync(join(ROOT, 'src', 'deck.html'), 'utf8');
const grab = (start, end) => {
  const i = deck.indexOf(start); if (i < 0) throw new Error('não achei ' + start);
  const j = deck.indexOf(end, i);
  return deck.slice(i + start.length - 1, j + end.length - 1); // do "{"/"[" até o fechamento, sem o ";"
};
const CONFIG = new Function('return ' + grab('const CONFIG = {', '\n};'))();
const NOTES = new Function('return ' + grab('const NOTES = [', '\n];'))();

/* ---------- dados da especificação (.md) ---------- */
const md = readFileSync(join(ROOT, 'VenceHoje_pitch_v2.md'), 'utf8');
const section = (title) => {
  const i = md.indexOf(title); if (i < 0) return '';
  const rest = md.slice(i + title.length);
  const j = rest.search(/\n## /);
  return j < 0 ? rest : rest.slice(0, j);
};
const table = (txt) => txt.split('\n').filter(l => l.trim().startsWith('|') && !/^\|\s*-/.test(l.trim()))
  .map(l => l.trim().slice(1, -1).split('|').map(c => c.trim())).slice(1);
const inline = (s) => esc(s).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/`(.+?)`/g, '<code>$1</code>');
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

const timeline = table(section('## 2. Linha do tempo'));
const papeis = table(section('## 3. Papéis'));
const perguntas = table(section('## 8. Perguntas prováveis da banca'));
const planoB = section('## 7. Plano B').split('\n').filter(l => /^\d+\./.test(l)).map(l => l.replace(/^\d+\.\s*/, ''));

/* ---------- prints ---------- */
// passos internos (cliques) de cada slide = maior "step" usado nas notas
const steps = NOTES.map((n, i) => ({ s: i + 1, max: Math.max(0, ...n.segs.map(g => g.step)) }));
if (!process.argv.includes('--sem-prints')) await capture();

async function capture() {
  mkdirSync(IMG, { recursive: true });
  const port = 9300 + Math.floor(Math.random() * 600);
  const prof = join(tmpdir(), 'vh-roteiro-' + port);
  const p = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', '--window-size=1600,900', 'about:blank'], { stdio: 'ignore' });
  try {
    const cdp = await connect(port);
    await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 900, deviceScaleFactor: 1, mobile: false });
    await cdp.send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
    const url = pathToFileURL(join(ROOT, 'index.html')).href;
    // tempo de espera para as animações terminarem (S2 tem contador, S3 tem o rebobinar)
    const wait = { 1: 3000, 2: 5000, 3: 4500 };
    for (const { s, max } of steps) for (let k = 0; k <= max; k++) {
      await cdp.send('Page.navigate', { url: 'about:blank' }); await sleep(200);
      await cdp.send('Page.navigate', { url: `${url}#${s}${k ? '.' + k : ''}` });
      await sleep(k ? 2500 : (wait[s] || 3500));
      const r = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 82 });
      writeFileSync(join(IMG, `s${s}_${k}.jpg`), Buffer.from(r.result.data, 'base64'));
    }
    console.log('prints ok');
  } finally { p.kill(); }
}

/* ---------- HTML ---------- */
const img = (s, k) => `img/s${s}_${k}.jpg`;
const cutInfo = {}; // B1..B5 -> texto do plano B
planoB.forEach((t, i) => { cutInfo['B' + (i + 1)] = t; });
const saving = (t) => (t.match(/\(([−-]\s*\d+\s*s)\)/) || [, ''])[1];

const notesHtml = (h) => h.replace(/<span class="cut" data-cut="([^"]+)">/g, (_, c) => {
  const b = c.split(' ')[0];
  return `<span class="cut"><span class="cutlbl">Plano B · ${esc(b)}${saving(cutInfo[b] || '') ? ' (' + saving(cutInfo[b]) + ')' : ''}</span>`;
});

const quemSlide = (n) => esc(n.quem);
const fontFace = ['inter', 'space-grotesk'].flatMap(f => [400, 600, 700].map(w =>
  `@font-face{font-family:'${f === 'inter' ? 'Inter' : 'Space Grotesk'}';font-weight:${w};src:url('../fonts/${f}-latin-${w}-normal.woff2') format('woff2');}`)).join('\n');

const slidePages = NOTES.map((n, i) => {
  const s = i + 1, max = steps[i].max;
  const [num, ...rest] = n.t.split(' — ');
  const head = `<header class="sh"><span class="sn">${esc(num)}</span><h2>${esc(rest.join(' — '))}</h2>
    <div class="meta"><span><i>Tempo</i>${esc(n.tempo)}</span><span><i>Quem</i>${quemSlide(n)}</span><span class="etq"><i>Etiqueta ao entrar</i>${esc(n.etq)}</span></div></header>`;
  let body;
  if (max === 0) {
    body = `<img class="big" src="${img(s, 0)}" alt="">
      <div class="segs">${n.segs.map(g => `<p>${notesHtml(g.h)}</p>`).join('')}</div>`;
  } else {
    const label = (k) => k === 0 ? 'Ao entrar' : `Depois do clique ${k}`;
    body = Array.from({ length: max + 1 }, (_, k) => `<div class="step">
        <figure><img src="${img(s, k)}" alt=""><figcaption>${label(k)}</figcaption></figure>
        <div class="segs">${n.segs.filter(g => g.step === k).map(g => `<p>${notesHtml(g.h)}</p>`).join('')}</div>
      </div>`).join('');
  }
  return `<section class="page slide-page">${head}${body}</section>`;
}).join('\n');

const equipe = CONFIG.equipe.map(p => `${p.nome} ${p.sobrenome}`).join(' · ');
const today = new Date().toLocaleDateString('pt-BR');
const tl = timeline.map(r => `<tr>${r.map((c, j) => `<td${j === 0 ? ' class="b"' : ''}>${inline(c)}</td>`).join('')}</tr>`).join('');
const pp = papeis.map(r => `<tr><td class="b">${inline(r[0])}</td><td class="blank"></td>${r.slice(1).map(c => `<td>${inline(c)}</td>`).join('')}</tr>`).join('');

const cfg = CONFIG;
const html = `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><title>Roteiro · VenceHoje</title>
<style>
${fontFace}
:root{--verde:#0F3D26;--verde2:#1E7B53;--lima:#A6E05A;--creme:#F4F6F1;--alerta:#D94B3D;--alertaE:#A8322A;--tinta:#1B2A22;--cinza:#5C6B62;--linha:#D9E0DA}
@page{size:A4;margin:13mm 13mm 15mm}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:400 10.2pt/1.45 Inter,system-ui,sans-serif;color:var(--tinta)}
h1,h2,h3,.sn{font-family:'Space Grotesk',Inter,sans-serif}
.page{break-after:page}
.page:last-child{break-after:auto}
/* capa */
.cover{background:var(--verde);color:#fff;border-radius:6mm;padding:10mm 12mm;margin-bottom:5mm;position:relative;overflow:hidden}
.cover h1{font-size:30pt;line-height:1.05;margin:0 0 3mm}
.cover h1 em{font-style:normal;color:var(--lima)}
.cover p{margin:0;opacity:.9}
.cover .tag{position:absolute;right:12mm;top:12mm;background:var(--lima);color:var(--verde);font:700 11pt 'Space Grotesk';padding:2.5mm 5mm 2.5mm 7mm;border-radius:2mm;clip-path:polygon(4mm 0,100% 0,100% 100%,4mm 100%,0 50%)}
.cover .facts{display:flex;gap:9mm;margin-top:5mm}
.cover .facts b{display:block;font:700 17pt 'Space Grotesk';color:var(--lima)}
.cover .facts span{font-size:8.5pt;opacity:.85}
h3{font-size:13pt;margin:5mm 0 2mm;color:var(--verde)}
h3:first-child{margin-top:0}
table{width:100%;border-collapse:collapse;font-size:9pt}
th,td{text-align:left;padding:1.8mm 2.2mm;border-bottom:1px solid var(--linha);vertical-align:top}
th{font-weight:600;color:var(--cinza);font-size:8pt;text-transform:uppercase;letter-spacing:.04em;border-bottom:1.5px solid var(--verde)}
td.b{font-weight:600;white-space:nowrap}
td.blank{min-width:30mm;border-bottom:1px solid var(--tinta)}
.note{font-size:8.6pt;color:var(--cinza);margin:2mm 0 0}
/* operação */
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:6mm}
.card{border:1px solid var(--linha);border-radius:3mm;padding:4mm 4.5mm}
.card h4{margin:0 0 2mm;font:600 10.5pt 'Space Grotesk';color:var(--verde)}
.card ul,.card ol{margin:0;padding-left:4.5mm}
.card li{margin:.8mm 0}
kbd{font:600 8.4pt Inter;background:var(--creme);border:1px solid var(--linha);border-bottom-width:2px;border-radius:1.2mm;padding:.2mm 1.6mm;white-space:nowrap}
.legend{display:flex;flex-wrap:wrap;gap:3mm 6mm;font-size:9pt;margin-top:1mm}
/* slides */
.sh{display:grid;grid-template-columns:auto 1fr;gap:1mm 4mm;align-items:center;border-bottom:2px solid var(--verde);padding-bottom:3mm;margin-bottom:4mm}
.sn{grid-row:span 2;background:var(--verde);color:var(--lima);font-size:20pt;font-weight:700;border-radius:2.5mm;padding:2mm 4mm;line-height:1}
.sh h2{margin:0;font-size:16pt;color:var(--verde);line-height:1.15}
.meta{display:flex;gap:6mm;font-size:9.2pt;font-weight:600}
.meta i{display:block;font-style:normal;font-weight:500;font-size:7.2pt;color:var(--cinza);text-transform:uppercase;letter-spacing:.05em}
.meta .etq{color:var(--verde2)}
img.big{width:100%;border-radius:2.5mm;border:1px solid var(--linha);display:block;margin-bottom:4mm}
.step{display:grid;grid-template-columns:72mm 1fr;gap:5mm;padding:3mm 0;border-bottom:1px dashed var(--linha);break-inside:avoid}
.step:last-child{border-bottom:0}
.step figure{margin:0}
.step img{width:100%;border-radius:2mm;border:1px solid var(--linha);display:block}
figcaption{font-size:7.6pt;font-weight:600;color:var(--cinza);text-transform:uppercase;letter-spacing:.05em;margin-top:1mm}
.segs p{margin:0 0 2.4mm}
.who{font-weight:700;color:var(--verde)}
.act{color:var(--cinza);font-style:italic}
.act b{font-style:normal;color:var(--tinta)}
.click{display:inline-block;font:700 8pt Inter;background:var(--verde);color:var(--lima);border-radius:1.2mm;padding:.3mm 1.8mm;margin:0 .5mm;letter-spacing:.02em;white-space:nowrap}
.cut{background:#FFF1C9;border-radius:1mm;padding:0 .6mm;box-decoration-break:clone;-webkit-box-decoration-break:clone}
.cutlbl{font:700 6.8pt Inter;color:#7A5A00;background:#FFE08A;border-radius:.8mm;padding:0 1.2mm;margin-right:1mm;vertical-align:1px;text-transform:uppercase;letter-spacing:.03em}
/* banca */
.qa td:first-child{width:38%;font-weight:600}
ol.pb{margin:0;padding-left:5mm}
ol.pb li{margin:1.4mm 0}
.nums{display:grid;grid-template-columns:repeat(3,1fr);gap:3mm}
.num{background:var(--creme);border-radius:2.5mm;padding:3mm 3.5mm}
.num b{display:block;font:700 13pt 'Space Grotesk';color:var(--verde)}
.num span{font-size:8.2pt;color:var(--cinza)}
</style></head><body>

<section class="page">
  <div class="cover">
    <div class="tag">VENCE EM 2:50</div>
    <p style="font-weight:600;color:var(--lima);letter-spacing:.06em;text-transform:uppercase;font-size:8.5pt;margin-bottom:3mm">Roteiro do apresentador</p>
    <h1>Vence<em>Hoje</em><br>Pitch de 3 minutos</h1>
    <p>${esc(equipe)}</p>
    <div class="facts">
      <div><b>2:50</b><span>tempo-alvo (10 s de folga)</span></div>
      <div><b>9 slides</b><span>S3, S8 e S9 têm cliques internos</span></div>
      <div><b>5 pessoas</b><span>encenação + apresentação</span></div>
    </div>
  </div>

  <h3>Linha do tempo</h3>
  <table><thead><tr><th>Bloco</th><th>Tempo</th><th>Duração</th><th>Quem fala</th><th>Slides</th><th>Etiqueta ao entrar</th></tr></thead><tbody>${tl}</tbody></table>

  <h3>Papéis</h3>
  <table><thead><tr><th>Pessoa</th><th>Nome</th><th>Na cena</th><th>Apresenta</th><th>Adereço</th></tr></thead><tbody>${pp}</tbody></table>
  <p class="note">A coluna Nome está em branco porque os papéis ainda não foram distribuídos. Preencha à mão.</p>
</section>

<section class="page">
  <h3>Como passar os slides (P5)</h3>
  <div class="grid2">
    <div class="card"><h4>Teclas</h4><ul>
      <li><kbd>→</kbd> <kbd>Espaço</kbd> <kbd>PageDown</kbd> ou clique esquerdo: avança (inclusive os cliques internos)</li>
      <li><kbd>←</kbd> <kbd>PageUp</kbd> ou clique direito: volta</li>
      <li><kbd>T</kbd> inicia ou pausa a etiqueta · <kbd>R</kbd> zera a etiqueta</li>
      <li><kbd>F</kbd> tela cheia · <kbd>Home</kbd> volta ao S1</li>
      <li><kbd>N</kbd> abre a janela de notas (roteiro + próximo clique)</li>
    </ul></div>
    <div class="card"><h4>A etiqueta (contagem regressiva)</h4><ul>
      <li>Começa em <b>2:50</b> e só corre depois de <kbd>T</kbd>, no início do S1.</li>
      <li>Nos últimos 20 s fica vermelha e pulsa.</li>
      <li>No S9 vai para o centro e se ajusta para <b>0:15</b>, mesmo se vocês estiverem adiantados ou atrasados.</li>
      <li>O clique final leva a 0:00 e carimba “VENCE HOJE”.</li>
    </ul></div>
    <div class="card"><h4>Antes de subir ao palco</h4><ol>
      <li>Abra o <b>index.html</b> local (funciona sem internet). Reserva: pitch-vence-hoje.vercel.app</li>
      <li>Se o PC estiver com as animações do Windows desligadas, coloque <code>movimento: "completo"</code> no CONFIG ou ative os efeitos de animação.</li>
      <li>Aperte <kbd>F</kbd> (tela cheia) e confira o S1 parado em 19:58.</li>
      <li>Se usar notas, aperte <kbd>N</kbd> e arraste a janela para o notebook.</li>
      <li>Teste o passador: ele deve mandar <kbd>→</kbd>/<kbd>←</kbd> ou PageDown/PageUp.</li>
      <li>Adereços: avental, pão com etiqueta, placa “LIXO”, celulares.</li>
    </ol></div>
    <div class="card"><h4>Como ler este roteiro</h4>
      <div class="legend">
        <span><span class="who">P4</span> quem fala</span>
        <span><span class="act">[ação em cena]</span></span>
        <span><span class="click">CLIQUE</span> P5 avança</span>
      </div>
      <p style="margin:3mm 0 0"><span class="cut"><span class="cutlbl">Plano B · B1</span>trecho que pode ser cortado</span>: se o ensaio passar de 3:00, corte nesta ordem (B1 → B5).</p>
      <p class="note">Os prints mostram a tela em cada momento. A etiqueta aparece em 2:50 porque foi capturada parada; no pitch ela corre.</p>
    </div>
  </div>
</section>

${slidePages}

<section class="page">
  <h3>Plano B de tempo (se passar de 3:00)</h3>
  <ol class="pb">${planoB.map(t => `<li>${inline(t)}</li>`).join('')}</ol>

  <h3>Números para ter na ponta da língua</h3>
  <div class="nums">
    <div class="num"><b>≈ 20 mi t/ano</b><span>alimento desperdiçado no Brasil (PNUMA/UNEP, 2024)</span></div>
    <div class="num"><b>${esc(cfg.mercado.tam.valor)}</b><span>TAM · ${esc(cfg.mercado.tam.detalhe)}</span></div>
    <div class="num"><b>${esc(cfg.mercado.sam.valor)}</b><span>SAM · ${esc(cfg.mercado.sam.detalhe)}</span></div>
    <div class="num"><b>${esc(cfg.mercado.som.valor)}</b><span>SOM · ${esc(cfg.mercado.som.detalhe)}</span></div>
    <div class="num"><b>${esc(cfg.receita.comissao)}</b><span>comissão ${esc(cfg.receita.comissaoRotulo)}, em fatura mensal</span></div>
    <div class="num"><b>${esc(cfg.receita.premiumValor + cfg.receita.premiumPeriodo)}</b><span>${esc(cfg.receita.premiumNome)}: ${esc(cfg.receita.premiumItens.join(' + '))}</span></div>
    <div class="num"><b>R$ 125</b><span>ticket médio por loja/mês = R$ 135 mi ÷ 90 mil ÷ 12</span></div>
    <div class="num"><b>200 × 125 × 12</b><span>= R$ 300 mil/ano (conta do SOM)</span></div>
    <div class="num"><b>Joinville</b><span>área inicial: padarias, hortifrútis, mercados de bairro</span></div>
  </div>
  <p class="note">Pesquisa · lojistas: ${cfg.pesquisa.lojistas.map(x => `${x.pct}% ${esc(x.rotulo)}`).join(' · ')}. Consumidores: ${cfg.pesquisa.consumidores.map(x => `${x.pct}% ${esc(x.rotulo)}`).join(' · ')}. Não citar o número de entrevistados.</p>
</section>

<section class="page">
  <h3>Perguntas prováveis da banca</h3>
  <table class="qa"><thead><tr><th>Pergunta</th><th>Resposta em uma frase</th></tr></thead><tbody>
  ${perguntas.map(r => `<tr><td>${inline(r[0])}</td><td>${inline(r[1])}</td></tr>`).join('')}
  </tbody></table>
  <p class="note">TAM é o faturamento do setor; SAM e SOM são receita potencial do VenceHoje (o rodapé do S8 deixa isso explícito).</p>
</section>
</body></html>`;

const htmlPath = join(DIR, 'roteiro.html');
writeFileSync(htmlPath, html);

/* ---------- PDF ---------- */
{
  const port = 9300 + Math.floor(Math.random() * 600);
  const prof = join(tmpdir(), 'vh-roteiro-pdf-' + port);
  const p = spawn(EDGE, ['--headless=new', `--remote-debugging-port=${port}`, `--user-data-dir=${prof}`, '--no-first-run', 'about:blank'], { stdio: 'ignore' });
  try {
    const cdp = await connect(port);
    await cdp.send('Page.navigate', { url: pathToFileURL(htmlPath).href });
    await sleep(1500);
    await cdp.send('Runtime.evaluate', { expression: 'document.fonts.ready.then(()=>1)', awaitPromise: true });
    const r = await cdp.send('Page.printToPDF', {
      printBackground: true, preferCSSPageSize: true, displayHeaderFooter: true,
      headerTemplate: '<span></span>',
      footerTemplate: `<div style="width:100%;font:7pt Arial;color:#8a978f;padding:0 13mm;display:flex;justify-content:space-between"><span>VenceHoje · roteiro do pitch · gerado em ${today}</span><span><span class="pageNumber"></span>/<span class="totalPages"></span></span></div>`,
    });
    if (!r.result) throw new Error(JSON.stringify(r.error));
    const out = join(DIR, 'Roteiro_VenceHoje.pdf');
    writeFileSync(out, Buffer.from(r.result.data, 'base64'));
    console.log('PDF gerado:', out);
  } finally { p.kill(); }
}

/* ---------- util ---------- */
function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }
async function connect(port) {
  let ts;
  for (let i = 0; i < 60; i++) {
    try { ts = await (await fetch(`http://127.0.0.1:${port}/json`)).json(); if (ts.some(t => t.type === 'page')) break; } catch {}
    await sleep(250);
  }
  const ws = new WebSocket(ts.find(t => t.type === 'page').webSocketDebuggerUrl);
  await new Promise(r => ws.onopen = r);
  let id = 0; const pend = {};
  ws.onmessage = e => { const m = JSON.parse(e.data); if (m.id && pend[m.id]) { pend[m.id](m); delete pend[m.id]; } };
  return { send: (method, params = {}) => new Promise(r => { const i = ++id; pend[i] = r; ws.send(JSON.stringify({ id: i, method, params })); }) };
}
