/* ── Data ─────────────────────────────────────────── */
const PASTAS = [
  { name:"Spaghetti",    icon:"🍝", cat:"long",    driedMin:8,  freshMin:2, desc:"Italy's most iconic strand pasta. Thin and round, perfect with smooth tomato or oil-based sauces.", sauces:["Carbonara","Aglio e olio","Amatriciana"], origin:"Naples, 13th c.", surface:55, ridges:10, hollow:0,  length:95, weight:70 },
  { name:"Fettuccine",   icon:"🍜", cat:"long",    driedMin:10, freshMin:3, desc:"Wide flat ribbons from central Italy. Their broad surface clings beautifully to creamy sauces.", sauces:["Alfredo","Bolognese","Porcini cream"], origin:"Rome/Lazio", surface:75, ridges:5,  hollow:0,  length:90, weight:75 },
  { name:"Linguine",     icon:"🍝", cat:"long",    driedMin:9,  freshMin:3, desc:"Slightly flattened strands meaning 'little tongues'. The go-to for seafood sauces.", sauces:["Vongole","Pesto","Seafood"], origin:"Genoa", surface:60, ridges:5,  hollow:0,  length:90, weight:65 },
  { name:"Pappardelle",  icon:"🍜", cat:"long",    driedMin:7,  freshMin:2, desc:"Broad egg pasta ribbons ideal for hearty ragù and wild game sauces.", sauces:["Wild boar ragù","Lamb ragù","Truffle"], origin:"Tuscany", surface:85, ridges:5,  hollow:0,  length:85, weight:80 },
  { name:"Tagliatelle",  icon:"🍜", cat:"long",    driedMin:9,  freshMin:2, desc:"The classic egg pasta of Emilia-Romagna, traditionally served with Bolognese.", sauces:["Bolognese","Porcini","Butter"], origin:"Bologna", surface:78, ridges:5,  hollow:0,  length:87, weight:78 },
  { name:"Penne Rigate", icon:"🖊️", cat:"short",   driedMin:11, freshMin:null, desc:"Tube pasta with diagonal cuts and ridges that trap sauce both inside and out.", sauces:["Arrabbiata","Vodka sauce","Pesto"], origin:"Sicily/Campania", surface:80, ridges:90, hollow:85, length:30, weight:75 },
  { name:"Rigatoni",     icon:"🫙", cat:"short",   driedMin:12, freshMin:null, desc:"Large ridged tubes named for the Italian word 'rigato' (ridged). Great for chunky sauces.", sauces:["Sausage ragù","Four cheese","Amatriciana"], origin:"Rome", surface:85, ridges:95, hollow:90, length:35, weight:80 },
  { name:"Fusilli",      icon:"🌀", cat:"short",   driedMin:11, freshMin:null, desc:"Corkscrew-shaped pasta whose spirals trap sauce in every turn.", sauces:["Pesto","Tomato","Creamy veg"], origin:"Southern Italy", surface:90, ridges:70, hollow:30, length:25, weight:65 },
  { name:"Farfalle",     icon:"🦋", cat:"short",   driedMin:13, freshMin:null, desc:"Bow-tie (butterfly) pasta. Whimsical shape popular in salads and light sauces.", sauces:["Salmon cream","Light tomato","Caprese"], origin:"Lombardy", surface:65, ridges:40, hollow:0,  length:20, weight:55 },
  { name:"Orecchiette",  icon:"👂", cat:"short",   driedMin:12, freshMin:4,   desc:"'Little ears' from Puglia — the concave shape cups sauce perfectly.", sauces:["Broccoli rabe","Cime di rapa","Sausage"], origin:"Puglia", surface:72, ridges:30, hollow:50, length:15, weight:60 },
  { name:"Conchiglie",   icon:"🐚", cat:"short",   driedMin:12, freshMin:null, desc:"Shell-shaped pasta that scoops up chunky sauces and small vegetables.", sauces:["Chunky tomato","Ricotta","Tuna"], origin:"Southern Italy", surface:75, ridges:60, hollow:70, length:22, weight:65 },
  { name:"Ravioli",      icon:"🟧", cat:"stuffed", driedMin:null, freshMin:4, desc:"The king of stuffed pasta — little parcels of filling sealed in thin egg dough.", sauces:["Sage butter","Light tomato","Cream"], origin:"Liguria/Emilia", surface:60, ridges:20, hollow:0,  length:25, weight:90 },
  { name:"Tortellini",   icon:"⭕", cat:"stuffed", driedMin:null, freshMin:5, desc:"Ring-shaped stuffed pasta traditionally filled with pork, prosciutto, or cheese.", sauces:["Brodo","Cream","Parmigiano"], origin:"Bologna/Modena", surface:55, ridges:15, hollow:0,  length:18, weight:85 },
  { name:"Agnolotti",    icon:"🔷", cat:"stuffed", driedMin:null, freshMin:4, desc:"Piemontese stuffed pasta — small squares pinched at the edges, filled with roasted meat.", sauces:["Meat juices","Butter","Truffle"], origin:"Piedmont", surface:50, ridges:10, hollow:0,  length:20, weight:88 },
  { name:"Lasagne",      icon:"🟫", cat:"sheet",   driedMin:null, freshMin:10, desc:"Wide flat sheets layered with ragù, béchamel, and cheese. The ultimate comfort pasta.", sauces:["Bolognese + béchamel","Vegetable","Seafood"], origin:"Emilia-Romagna", surface:95, ridges:5,  hollow:0,  length:100, weight:80 },
  { name:"Cannelloni",   icon:"🌯", cat:"sheet",   driedMin:null, freshMin:12, desc:"Large tubes stuffed with ricotta or meat, baked in sauce.", sauces:["Tomato + béchamel","Spinach ricotta"], origin:"Southern Italy", surface:70, ridges:10, hollow:100,length:60, weight:75 },
  { name:"Pastina",      icon:"⭐", cat:"soup",    driedMin:5,  freshMin:null, desc:"Tiny star-shaped pasta, the classic Italian comfort for soup and broth.", sauces:["Brodo","Butter","Milk"], origin:"Italy-wide", surface:40, ridges:5,  hollow:0,  length:5,  weight:30 },
  { name:"Orzo",         icon:"🌾", cat:"soup",    driedMin:9,  freshMin:null, desc:"Rice-shaped pasta used in soups, salads, and risotto-style dishes.", sauces:["Brodo","Lemon herbs","Pesto"], origin:"Italy/Greece", surface:35, ridges:5,  hollow:0,  length:8,  weight:35 },
];

const PAIRINGS = [
  { sauce:"Carbonara",      icon:"🥚", pastas:"Spaghetti, Rigatoni, Mezze maniche",  color:"#FFF3D4", text:"#8B5E00" },
  { sauce:"Bolognese",      icon:"🥩", pastas:"Tagliatelle, Pappardelle, Rigatoni",  color:"#FFE8E8", text:"#8B1A0A" },
  { sauce:"Pesto",          icon:"🌿", pastas:"Trofie, Linguine, Fusilli",            color:"#E8F5E8", text:"#2D5A1B" },
  { sauce:"Aglio e Olio",   icon:"🧄", pastas:"Spaghetti, Linguine, Vermicelli",      color:"#FFFBDD", text:"#7A6500" },
  { sauce:"Alfredo",        icon:"🧈", pastas:"Fettuccine, Tagliatelle, Pappardelle", color:"#FFF9F0", text:"#8B5E00" },
  { sauce:"Arrabbiata",     icon:"🌶️", pastas:"Penne, Rigatoni, Spaghetti",           color:"#FFE8E8", text:"#8B0000" },
  { sauce:"Vongole",        icon:"🐚", pastas:"Linguine, Spaghetti, Vermicelli",       color:"#E0F4FF", text:"#004D7A" },
  { sauce:"Sage Butter",    icon:"🌱", pastas:"Ravioli, Tortellini, Gnocchi",          color:"#E8F5E8", text:"#1B5E20" },
];

const TIMELINE = [
  { year:"~1000 AD", title:"Arab Origins", desc:"Dried pasta first documented in Sicily, brought by Arab traders during their rule of the island." },
  { year:"1154",     title:"First Written Record", desc:"Arab geographer Al-Idrisi records a pasta-like food called 'itriyya' made in Sicily and exported across the Mediterranean." },
  { year:"1279",     title:"Marco Polo Myth Debunked", desc:"A Genoese soldier's inventory lists pasta — predating Marco Polo's return from China and disproving the popular myth." },
  { year:"1400s",    title:"Industrial Pasta", desc:"The first pasta factories emerge in Naples, capitalizing on the city's ideal climate for drying pasta outdoors." },
  { year:"1700s",    title:"Tomatoes Join the Party", desc:"Tomatoes — originally feared as poisonous — become accepted in Italian cuisine, revolutionizing pasta sauces." },
  { year:"1827",     title:"First Pasta Machine", desc:"Mechanical pasta extrusion begins, making pasta affordable for the masses beyond the wealthy classes." },
  { year:"1900s",    title:"Global Spread", desc:"Italian immigrants carry pasta traditions worldwide. American pasta consumption explodes with Chef Boyardee and canned goods." },
  { year:"Today",    title:"Artisanal Revival", desc:"Bronze-die extrusion and slow drying techniques see a renaissance as food lovers seek rougher texture for better sauce adhesion." },
];

/* ── Counters ─────────────────────────────────────── */
function animateCounters() {
  document.querySelectorAll('.stat-num').forEach(el => {
    const target = +el.dataset.target;
    let start = 0;
    const step = target / 60;
    const tick = () => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start).toLocaleString();
      if (start < target) requestAnimationFrame(tick);
    };
    tick();
  });
}

/* ── Pasta Grid ───────────────────────────────────── */
function buildGrid() {
  const grid = document.getElementById('pastaGrid');
  PASTAS.forEach(p => {
    const card = document.createElement('div');
    card.className = 'pasta-card';
    card.dataset.cat = p.cat;
    const timeStr = p.driedMin ? `${p.driedMin} min dried` : p.freshMin ? `${p.freshMin} min fresh` : '';
    card.innerHTML = `
      <span class="pasta-icon">${p.icon}</span>
      <div class="pasta-name">${p.name}</div>
      <div class="pasta-meta">${p.cat}</div>
      <div class="pasta-time">${timeStr}</div>`;
    card.addEventListener('click', () => openModal(p));
    grid.appendChild(card);
  });
}

function setupFilters() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const f = btn.dataset.filter;
      document.querySelectorAll('.pasta-card').forEach(card => {
        card.classList.toggle('hidden', f !== 'all' && card.dataset.cat !== f);
      });
    });
  });
}

/* ── Modal ────────────────────────────────────────── */
function openModal(p) {
  const overlay = document.createElement('div');
  overlay.className = 'modal-overlay';
  const sauceTags = p.sauces.map(s => `<span class="modal-tag">${s}</span>`).join('');
  const timeHtml = [
    p.driedMin ? `<strong>${p.driedMin} min</strong> dried` : null,
    p.freshMin ? `<strong>${p.freshMin} min</strong> fresh` : null,
  ].filter(Boolean).join(' &nbsp;·&nbsp; ');

  overlay.innerHTML = `
    <div class="modal">
      <button class="modal-close">✕</button>
      <span class="modal-icon">${p.icon}</span>
      <h3>${p.name}</h3>
      <span class="modal-cat">${p.cat} pasta &mdash; ${p.origin}</span>
      <p>${p.desc}</p>
      <p style="font-size:.9rem;color:#999;">Cook time: ${timeHtml}</p>
      <div class="modal-tags">${sauceTags}</div>
    </div>`;
  overlay.querySelector('.modal-close').addEventListener('click', () => overlay.remove());
  overlay.addEventListener('click', e => { if (e.target === overlay) overlay.remove(); });
  document.body.appendChild(overlay);
}

/* ── Bar Chart ────────────────────────────────────── */
function buildBarChart() {
  const chart = document.getElementById('barChart');
  const maxMin = 14;
  const chartH = 240;

  const toShow = PASTAS.filter(p => p.driedMin || p.freshMin).slice(0, 12);

  toShow.forEach(p => {
    const group = document.createElement('div');
    group.className = 'bar-group';

    const pair = document.createElement('div');
    pair.className = 'bar-pair';

    if (p.driedMin) {
      const b = document.createElement('div');
      b.className = 'bar dried';
      b.style.height = '0';
      b.dataset.tip = `${p.name} dried: ${p.driedMin} min`;
      pair.appendChild(b);
      setTimeout(() => { b.style.height = (p.driedMin / maxMin * chartH) + 'px'; }, 200);
    }
    if (p.freshMin) {
      const b = document.createElement('div');
      b.className = 'bar fresh';
      b.style.height = '0';
      b.dataset.tip = `${p.name} fresh: ${p.freshMin} min`;
      pair.appendChild(b);
      setTimeout(() => { b.style.height = (p.freshMin / maxMin * chartH) + 'px'; }, 200);
    }

    const lbl = document.createElement('div');
    lbl.className = 'bar-label';
    lbl.textContent = p.name;

    group.appendChild(pair);
    group.appendChild(lbl);
    chart.appendChild(group);
  });
}

/* ── Sauce Pairings ───────────────────────────────── */
function buildPairings() {
  const grid = document.getElementById('pairingGrid');
  PAIRINGS.forEach(s => {
    const card = document.createElement('div');
    card.className = 'pairing-card';
    card.style.background = s.color;
    card.style.color = s.text;
    card.innerHTML = `
      <div class="pairing-sauce">${s.icon} ${s.sauce}</div>
      <div class="pairing-pastas">${s.pastas}</div>`;
    grid.appendChild(card);
  });
}

/* ── Radar Chart ──────────────────────────────────── */
const RADAR_LABELS = ['Surface Area','Ridges','Hollow','Length','Weight'];
let activeRadar = PASTAS[0];

function buildRadarControls() {
  const container = document.getElementById('radarControls');
  const subset = PASTAS.slice(0, 8);
  subset.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'radar-btn' + (p === activeRadar ? ' active' : '');
    btn.textContent = p.name;
    btn.addEventListener('click', () => {
      activeRadar = p;
      container.querySelectorAll('.radar-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      drawRadar();
      buildPropertyBars();
    });
    container.appendChild(btn);
  });
}

function drawRadar() {
  const canvas = document.getElementById('radarCanvas');
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const cx = W / 2, cy = H / 2;
  const R = Math.min(W, H) / 2 - 40;
  const N = RADAR_LABELS.length;
  const p = activeRadar;
  const values = [p.surface, p.ridges, p.hollow, p.length, p.weight].map(v => v / 100);

  ctx.clearRect(0, 0, W, H);

  // grid rings
  for (let r = 1; r <= 4; r++) {
    ctx.beginPath();
    for (let i = 0; i < N; i++) {
      const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
      const rr = R * r / 4;
      const x = cx + Math.cos(angle) * rr;
      const y = cy + Math.sin(angle) * rr;
      i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.strokeStyle = 'rgba(255,255,255,.12)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // spokes
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(angle) * R, cy + Math.sin(angle) * R);
    ctx.strokeStyle = 'rgba(255,255,255,.12)';
    ctx.stroke();
  }

  // labels
  ctx.font = '13px sans-serif';
  ctx.fillStyle = 'rgba(253,246,236,.7)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    const lx = cx + Math.cos(angle) * (R + 26);
    const ly = cy + Math.sin(angle) * (R + 26);
    ctx.fillText(RADAR_LABELS[i], lx, ly);
  }

  // data polygon
  ctx.beginPath();
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = R * values[i];
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.fillStyle = 'rgba(245,166,35,.25)';
  ctx.fill();
  ctx.strokeStyle = '#F5A623';
  ctx.lineWidth = 2;
  ctx.stroke();

  // dots
  for (let i = 0; i < N; i++) {
    const angle = (i / N) * Math.PI * 2 - Math.PI / 2;
    const r = R * values[i];
    ctx.beginPath();
    ctx.arc(cx + Math.cos(angle) * r, cy + Math.sin(angle) * r, 5, 0, Math.PI * 2);
    ctx.fillStyle = '#F5A623';
    ctx.fill();
  }

  // center label
  ctx.font = 'bold 16px Georgia,serif';
  ctx.fillStyle = 'rgba(253,246,236,.9)';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(activeRadar.name, cx, cy);
}

function buildPropertyBars() {
  const container = document.getElementById('propertyList');
  container.innerHTML = '';
  const p = activeRadar;
  const props = [
    { label: 'Surface Area', val: p.surface },
    { label: 'Ridges', val: p.ridges },
    { label: 'Hollow Core', val: p.hollow },
    { label: 'Length', val: p.length },
    { label: 'Density', val: p.weight },
  ];
  props.forEach(pr => {
    const row = document.createElement('div');
    row.className = 'prop-row';
    row.innerHTML = `
      <span class="prop-label">${pr.label}</span>
      <div class="prop-bar-wrap">
        <div class="prop-bar" style="width:${pr.val}%"></div>
      </div>`;
    container.appendChild(row);
  });
}

/* ── Timeline ─────────────────────────────────────── */
function buildTimeline() {
  const tl = document.getElementById('timeline');
  TIMELINE.forEach(t => {
    const item = document.createElement('div');
    item.className = 'tl-item';
    item.innerHTML = `
      <div class="tl-year">${t.year}</div>
      <div class="tl-title">${t.title}</div>
      <p class="tl-desc">${t.desc}</p>`;
    tl.appendChild(item);
  });
}

/* ── Intersection Observer for lazy animation ─────── */
function setupObserver() {
  const observed = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        if (e.target.id === 'barChart') buildBarChart();
        if (e.target.id === 'radarCanvas') { drawRadar(); buildPropertyBars(); }
        observed.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });

  observed.observe(document.getElementById('barChart'));
  observed.observe(document.getElementById('radarCanvas'));

  // counter
  const statsObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { animateCounters(); statsObs.disconnect(); }
  }, { threshold: 0.5 });
  statsObs.observe(document.querySelector('.stats-bar'));
}

/* ── Init ─────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildGrid();
  setupFilters();
  buildPairings();
  buildRadarControls();
  buildTimeline();
  setupObserver();
});
