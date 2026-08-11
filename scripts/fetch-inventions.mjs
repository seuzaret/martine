#!/usr/bin/env node
/* ============================================================
   Télécharge les images des inventions depuis Wikimedia Commons.
   - Recherche via l'API MediaWiki
   - Filtre les licences libres (PD, CC0, CC BY, CC BY-SA)
   - Télécharge la version 800px de large dans public/assets/inventions/
   - Génère credits.md (attributions) et preview.html (grille visuelle)
   Usage : node scripts/fetch-inventions.mjs
   ============================================================ */

import { writeFileSync, mkdirSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTDIR = resolve(__dirname, '..', 'public', 'assets', 'inventions');
mkdirSync(OUTDIR, { recursive: true });

/* ------------------------------------------------------------
   LISTE DES INVENTIONS À RÉCUPÉRER
   ------------------------------------------------------------ */
const ITEMS = [
  // ch1 Paléolithique
  { id: 'lascaux', chapter: 1, title: 'Peinture rupestre de Lascaux', query: 'Lascaux painting horse' },
  { id: 'mains-negatives', chapter: 1, title: 'Mains négatives (Gargas)', query: 'Gargas hands cave' },
  { id: 'venus-brassempouy', chapter: 1, title: 'Dame de Brassempouy', query: 'Venus Brassempouy' },
  { id: 'flute-hohle-fels', chapter: 1, title: 'Flûte préhistorique de Hohle Fels', query: 'Hohle Fels flute' },
  // ch2 Néolithique
  { id: 'cairn-barnenez', chapter: 2, title: 'Cairn de Barnenez', query: 'Cairn de Barnenez' },
  { id: 'otzi-tatouages', chapter: 2, title: 'Reconstitution d\'Ötzi', query: 'Otzi Iceman reconstruction museum' },
  { id: 'poterie-neolithique', chapter: 2, title: 'Poterie néolithique décorée', query: 'Neolithic pottery decorated' },
  // ch3 Mésopotamie/Égypte
  { id: 'tablette-cuneiforme', chapter: 3, title: 'Tablette cunéiforme', query: 'Cuneiform tablet Sumer' },
  { id: 'sceau-cylindre', chapter: 3, title: 'Sceau-cylindre mésopotamien', query: 'Cylinder seal Mesopotamia' },
  { id: 'hieroglyphes', chapter: 3, title: 'Hiéroglyphes égyptiens (Livre des Morts)', query: 'Egyptian Book of Dead hieroglyphs' },
  { id: 'alphabet-phenicien', chapter: 3, title: 'Alphabet phénicien', query: 'Phoenician alphabet inscription' },
  // ch4 Antiquité
  { id: 'fresque-pompei', chapter: 4, title: 'Fresque de Pompéi', query: 'Pompeii fresco villa mysteries' },
  { id: 'tablette-cire', chapter: 4, title: 'Tablette de cire romaine', query: 'Roman wax tablet stylus' },
  { id: 'volumen', chapter: 4, title: 'Rouleau de papyrus', query: 'papyrus roll ancient Egypt' },
  { id: 'bibliotheque-alexandrie', chapter: 4, title: 'Bibliothèque d\'Alexandrie (gravure)', query: 'Library of Alexandria engraving' },
  { id: 'inscription-romaine', chapter: 4, title: 'Inscription monumentale romaine', query: 'Roman monumental inscription Augustus' },
  // ch5 Moyen Âge
  { id: 'tapisserie-bayeux', chapter: 5, title: 'Tapisserie de Bayeux', query: 'Bayeux tapestry Hastings' },
  { id: 'codex-medieval', chapter: 5, title: 'Codex médiéval', query: 'Medieval codex manuscript' },
  { id: 'manuscrit-enlumine', chapter: 5, title: 'Manuscrit enluminé (Très Riches Heures)', query: 'Tres Riches Heures Berry' },
  { id: 'vitrail-chartres', chapter: 5, title: 'Vitrail médiéval (Chartres)', query: 'Chartres stained glass window' },
  // ch6 Époque moderne
  { id: 'presse-gutenberg', chapter: 6, title: 'Presse de Gutenberg', query: 'Gutenberg printing press' },
  { id: 'bible-gutenberg', chapter: 6, title: 'Bible de Gutenberg', query: 'Gutenberg Bible page' },
  { id: 'gazette-1631', chapter: 6, title: 'La Gazette de Renaudot (1631)', query: 'Theophraste Renaudot Gazette de France' },
  { id: 'telegraphe-chappe', chapter: 6, title: 'Télégraphe optique de Chappe', query: 'Chappe semaphore telegraph signals' },
  { id: 'pile-volta', chapter: 6, title: 'Pile de Volta', query: 'Voltaic pile 1800' },
  // ch7 XIXe siècle
  { id: 'morse-key', chapter: 7, title: 'Manipulateur Morse', query: 'Morse telegraph key 19th' },
  { id: 'cable-transatlantique', chapter: 7, title: 'Câble transatlantique (Great Eastern)', query: 'Great Eastern transatlantic cable' },
  { id: 'daguerreotype', chapter: 7, title: 'Daguerréotype', query: 'Daguerreotype portrait 1840' },
  { id: 'phonographe-edison', chapter: 7, title: 'Phonographe Edison', query: 'Edison phonograph cylinder 1877' },
  { id: 'cinematographe-lumiere', chapter: 7, title: 'Cinématographe Lumière', query: 'Cinematographe Lumiere 1895' },
  { id: 'telephone-bell', chapter: 7, title: 'Téléphone à colonne (Bell)', query: 'Candlestick telephone Bell' },
  { id: 'tsf-marconi', chapter: 7, title: 'Émetteur TSF de Marconi', query: 'Marconi wireless transmitter 1901' },
  // ch8 XXe siècle guerre
  { id: 'radio-1920', chapter: 8, title: 'Premières radios grand public (1920)', query: '1920s radio receiver crystal set' },
  { id: 'poste-tsf-1940', chapter: 8, title: 'Poste TSF français années 40', query: '1940s radio receiver bakelite' },
  { id: 'eniac', chapter: 8, title: 'ENIAC (1946)', query: 'ENIAC computer 1946' },
  // ch9 Médias de masse
  { id: 'tv-1969', chapter: 9, title: 'Premiers téléviseurs', query: 'vintage television set 1950' },
  { id: 'cassette-philips', chapter: 9, title: 'Cassette audio Philips', query: 'Philips compact cassette' },
  { id: 'boombox-1985', chapter: 9, title: 'Radio-cassette double platine', query: 'Boombox dual cassette 1980s' },
  { id: 'cd-rom', chapter: 9, title: 'CD-Rom', query: 'CD-R compact disc recordable' },
  { id: 'disquette', chapter: 9, title: 'Disquette 3½ »', query: '3.5 inch floppy disk' },
];

/* ------------------------------------------------------------
   Détection des licences compatibles.
   Wikimedia renvoie un `LicenseShortName` très varié : on
   accepte tout ce qui contient PD, Public domain, CC0, CC BY,
   CC BY-SA — et on rejette Fair use, Non-free, © etc.
   ------------------------------------------------------------ */
function isFree(license) {
  if (!license) return false;
  const s = String(license).toLowerCase().trim();
  if (/fair\s?use|non.?free|©|all\s?rights|copyrighted/.test(s)) return false;
  return /public\s?domain|\bpd\b|pd-|\bcc0\b|cc.?by|cc.by.?sa/.test(s);
}

function stripHtml(s) {
  if (!s) return '';
  return String(s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

/* ------------------------------------------------------------
   Appelle l'API Wikimedia Commons pour une recherche donnée.
   Renvoie {url, license, author, sourcePage} pour la 1ère image
   sous licence libre, sinon null.
   ------------------------------------------------------------ */
async function searchCommons(query, retries = 2) {
  const api = new URL('https://commons.wikimedia.org/w/api.php');
  api.searchParams.set('action', 'query');
  api.searchParams.set('format', 'json');
  api.searchParams.set('generator', 'search');
  api.searchParams.set('gsrsearch', query);
  api.searchParams.set('gsrnamespace', '6');
  api.searchParams.set('gsrlimit', '5'); // on teste plusieurs candidats
  api.searchParams.set('prop', 'imageinfo');
  api.searchParams.set('iiprop', 'url|extmetadata|mime');
  api.searchParams.set('iiurlwidth', '800');

  let res;
  for (let attempt = 0; attempt <= retries; attempt++) {
    res = await fetch(api, { headers: { 'User-Agent': 'MartineJeu/1.0 (educational)' } });
    if (res.status === 429) {
      const wait = 15000 * (attempt + 1);
      process.stdout.write(`(429, pause ${wait/1000}s) `);
      await new Promise((r) => setTimeout(r, wait));
      continue;
    }
    break;
  }
  if (!res.ok) throw new Error(`API ${res.status}`);
  const data = await res.json();
  const pages = data?.query?.pages ? Object.values(data.query.pages) : [];
  // Trier par index de recherche (ordre de pertinence)
  pages.sort((a, b) => (a.index || 999) - (b.index || 999));

  for (const p of pages) {
    const info = p.imageinfo?.[0];
    if (!info) continue;
    if (info.mime && !info.mime.startsWith('image/')) continue;
    const meta = info.extmetadata || {};
    const license = meta.LicenseShortName?.value || meta.License?.value || '';
    if (!isFree(license)) continue;
    const author = stripHtml(meta.Artist?.value);
    const credit = stripHtml(meta.Credit?.value);
    return {
      url: info.thumburl || info.url,
      ext: (info.mime || 'image/jpeg').split('/')[1],
      license,
      author: author || 'auteur inconnu',
      credit,
      sourcePage: `https://commons.wikimedia.org/wiki/${encodeURIComponent(p.title)}`,
      licenseUrl: meta.LicenseUrl?.value || '',
    };
  }
  return null;
}

/* ------------------------------------------------------------
   Boucle principale
   ------------------------------------------------------------ */
/* On persiste les métadonnées dans _credits.json — comme ça les runs
   suivants peuvent skipper les fichiers existants sans perdre leurs infos. */
const CREDITS_JSON = resolve(OUTDIR, '_credits.json');
const credits = existsSync(CREDITS_JSON) ? JSON.parse(readFileSync(CREDITS_JSON, 'utf8')) : [];
const knownIds = new Set(credits.map((c) => c.id));
/* Un fichier existant (n'importe quelle extension) = déjà récupéré, on skippe. */
const existing = new Set(readdirSync(OUTDIR).map((f) => f.replace(/\.[^.]+$/, '')));
for (const item of ITEMS) {
  if (existing.has(item.id)) { console.log(`▸ ${item.id} … (déjà présent, skip)`); continue; }
  try {
    process.stdout.write(`▸ ${item.id} — "${item.query}" … `);
    const found = await searchCommons(item.query);
    if (!found) { console.log('❌ aucun résultat libre'); continue; }
    // Télécharger l'image — retry sur 429 et validation du content-type
    let imgRes, buf;
    for (let attempt = 0; attempt < 3; attempt++) {
      imgRes = await fetch(found.url, { headers: { 'User-Agent': 'MartineJeu/1.0 (educational)' } });
      const ct = imgRes.headers.get('content-type') || '';
      if (imgRes.status === 429 || !ct.startsWith('image/')) {
        const wait = 10000 * (attempt + 1);
        process.stdout.write(`(dl bloqué, pause ${wait/1000}s) `);
        await new Promise((r) => setTimeout(r, wait));
        continue;
      }
      buf = Buffer.from(await imgRes.arrayBuffer());
      break;
    }
    if (!buf || buf.length < 2000) { console.log(`❌ téléchargement raté (${buf?.length || 0} B)`); continue; }
    let ext = found.ext === 'jpeg' ? 'jpg' : found.ext;
    if (ext === 'svg+xml') ext = 'svg';
    ext = ext.replace(/[^a-z0-9]/gi, '') || 'jpg';
    const filename = `${item.id}.${ext}`;
    writeFileSync(resolve(OUTDIR, filename), buf);
    credits.push({ ...item, ...found, filename });
    writeFileSync(CREDITS_JSON, JSON.stringify(credits, null, 2));
    console.log(`✔ ${filename} (${found.license})`);
    // délai généreux pour ne pas saturer Wikimedia
    await new Promise((r) => setTimeout(r, 1500));
  } catch (e) {
    console.log(`⚠ erreur : ${e.message}`);
  }
}

/* ------------------------------------------------------------
   Générer credits.md
   ------------------------------------------------------------ */
let md = `# Crédits des images — inventions de communication\n\n`;
md += `Toutes les images ci-dessous proviennent de Wikimedia Commons et sont sous licence LIBRE (CC0, PD, CC-BY ou CC-BY-SA).\n\n`;
md += `**Si tu utilises ces images :** merci de conserver ce fichier de crédits et de l'afficher dans le colophon du jeu (menu « À propos »).\n\n`;
md += `Généré automatiquement par \`scripts/fetch-inventions.mjs\`.\n\n---\n\n`;
const byChapter = {};
for (const c of credits) { (byChapter[c.chapter] ||= []).push(c); }
for (const chap of Object.keys(byChapter).sort()) {
  md += `## Chapitre ${chap}\n\n`;
  for (const c of byChapter[chap]) {
    md += `- **${c.title}** — \`assets/inventions/${c.filename}\`\n`;
    md += `  - Auteur : ${c.author}\n`;
    md += `  - Licence : ${c.license}${c.licenseUrl ? ` ([lien](${c.licenseUrl}))` : ''}\n`;
    md += `  - Source : [${c.sourcePage.replace(/^https?:\/\//, '')}](${c.sourcePage})\n\n`;
  }
}
writeFileSync(resolve(OUTDIR, 'credits.md'), md);

/* ------------------------------------------------------------
   Générer preview.html
   ------------------------------------------------------------ */
let html = `<!doctype html><html lang="fr"><head><meta charset="utf-8"><title>Aperçu des images d'inventions</title>
<style>
  body { font-family: system-ui, sans-serif; background:#1a1408; color:#efe6d2; padding:20px; margin:0; }
  h1 { color:#ffd166; }
  h2 { color:#e0a848; border-bottom:1px solid #5a4028; padding-bottom:6px; margin-top:32px; }
  .grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:20px; }
  .card { background:#2a1e10; border:1px solid #5a4028; border-radius:8px; overflow:hidden; }
  .card img { display:block; width:100%; height:220px; object-fit:cover; background:#0a0604; }
  .card .info { padding:10px 12px; font-size:13px; line-height:1.4; }
  .card .title { color:#ffd166; font-weight:600; margin-bottom:4px; }
  .card .meta { color:#a89878; font-size:11.5px; }
  .card a { color:#7fb0e0; text-decoration:none; }
  .card a:hover { text-decoration:underline; }
  .stats { color:#a89878; font-size:13px; }
</style></head><body>
<h1>Aperçu des images d'inventions de communication</h1>
<p class="stats">${credits.length} image(s) récupérée(s) sur ${ITEMS.length} demandée(s). <a href="credits.md" style="color:#7fb0e0">Voir les crédits complets</a>.</p>
`;
for (const chap of Object.keys(byChapter).sort()) {
  html += `<h2>Chapitre ${chap}</h2><div class="grid">`;
  for (const c of byChapter[chap]) {
    html += `
<div class="card">
  <img src="${c.filename}" alt="${c.title}">
  <div class="info">
    <div class="title">${c.title}</div>
    <div class="meta">Auteur : ${c.author}<br>Licence : ${c.license}<br><a href="${c.sourcePage}" target="_blank">source Commons</a></div>
  </div>
</div>`;
  }
  html += `</div>`;
}
html += `</body></html>`;
writeFileSync(resolve(OUTDIR, 'preview.html'), html);

console.log(`\n=== Terminé ===`);
console.log(`Images : ${credits.length} / ${ITEMS.length}`);
console.log(`Sortie : ${OUTDIR}`);
console.log(`Ouvre preview.html dans ton navigateur pour valider.`);
