// app.js — Three.js parametric pasta point cloud visualization
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { PASTA } from './data.js';

// ── DOM refs ─────────────────────────────────────────────
const canvas        = document.getElementById('three-canvas');
const overlay       = document.getElementById('fade-overlay');
const sidebarName   = document.getElementById('pasta-name');
const sidebarPage   = document.getElementById('pasta-page');
const sidebarDesc   = document.getElementById('pasta-desc');
const sidebarProfile= document.getElementById('pasta-profile');
const sidebarProps  = document.getElementById('pasta-props');
const sidebarEqs    = document.getElementById('pasta-eqs');
const sidebarRanges = document.getElementById('pasta-ranges');
const sidebarSpecs  = document.getElementById('pasta-specs');
const prevBtn       = document.getElementById('btn-prev');
const nextBtn       = document.getElementById('btn-next');
const thumbStrip    = document.getElementById('thumb-strip');

// ── Three.js setup ───────────────────────────────────────
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x1a1a1a);

const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, 1, 0.01, 100);
camera.position.set(1.5, 1.5, 2.5);
camera.lookAt(0, 0, 0);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.06;
controls.minDistance   = 0.5;
controls.maxDistance   = 10;

// Point material — cream/warm white
const material = new THREE.PointsMaterial({
  color: 0xF0EAD6,
  size: 0.015,
  sizeAttenuation: true
});

// ── Generate point clouds ────────────────────────────────
function generateGeometry(pasta) {
  const { iMax, jMax } = pasta.ranges;
  const count = (iMax + 1) * (jMax + 1);
  const positions = new Float32Array(count * 3);
  let idx = 0;

  for (let j = 0; j <= jMax; j++) {
    for (let i = 0; i <= iMax; i++) {
      positions[idx++] = pasta.Pi(i, j);    // x
      positions[idx++] = pasta.K(i, j);     // y
      positions[idx++] = pasta.Theta(i, j); // z
    }
  }

  // Normalize: center at origin, scale so longest axis = 2
  let minX = Infinity, maxX = -Infinity;
  let minY = Infinity, maxY = -Infinity;
  let minZ = Infinity, maxZ = -Infinity;

  for (let i = 0; i < positions.length; i += 3) {
    if (!isFinite(positions[i]) || !isFinite(positions[i+1]) || !isFinite(positions[i+2])) continue;
    if (positions[i]   < minX) minX = positions[i];
    if (positions[i]   > maxX) maxX = positions[i];
    if (positions[i+1] < minY) minY = positions[i+1];
    if (positions[i+1] > maxY) maxY = positions[i+1];
    if (positions[i+2] < minZ) minZ = positions[i+2];
    if (positions[i+2] > maxZ) maxZ = positions[i+2];
  }

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;
  const cz = (minZ + maxZ) / 2;
  const span = Math.max(maxX - minX, maxY - minY, maxZ - minZ) || 1;
  const scale = 2 / span;

  for (let i = 0; i < positions.length; i += 3) {
    if (!isFinite(positions[i])) { positions[i] = 0; positions[i+1] = 0; positions[i+2] = 0; continue; }
    positions[i]   = (positions[i]   - cx) * scale;
    positions[i+1] = (positions[i+1] - cy) * scale;
    positions[i+2] = (positions[i+2] - cz) * scale;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  return geo;
}

// Pre-generate all geometries
const geometries = PASTA.map(generateGeometry);

// ── Current state ────────────────────────────────────────
let currentIndex  = 0;
let points        = null;
let autoRotate    = true;
let idleTimer     = null;

function addPoints(index) {
  if (points) { scene.remove(points); }
  points = new THREE.Points(geometries[index], material);
  scene.add(points);
}

// ── Sidebar update ───────────────────────────────────────
function updateSidebar(index) {
  const p = PASTA[index];

  sidebarName.textContent  = p.name;
  sidebarPage.textContent  = p.page;
  sidebarDesc.textContent  = p.description;
  sidebarProfile.textContent = `> ${p.profile}`;

  // Properties
  const propDefs = [
    { key: 'hollow',      label: 'HOLLOW CROSS-SECTION' },
    { key: 'striated',    label: 'STRIATED SURFACE' },
    { key: 'smooth',      label: 'SMOOTH SURFACE' },
    { key: 'smoothEdges', label: 'SMOOTH EDGES' },
  ];
  sidebarProps.innerHTML = propDefs
    .filter(def => p.properties[def.key])
    .map(def => `<div class="prop-item">✓ ${def.label}</div>`)
    .join('');

  // Equations
  sidebarEqs.innerHTML =
    `<div class="eq-line">${p.eqPi}</div>` +
    `<div class="eq-line">${p.eqTheta}</div>` +
    `<div class="eq-line">${p.eqK}</div>`;
  sidebarRanges.textContent = p.eqRanges;

  // Specs
  const specEntries = Object.entries(p.specs)
    .map(([k, v]) => `<div class="spec-row"><span class="spec-key">${k.toUpperCase()}</span><span class="spec-val">${v}</span></div>`)
    .join('');
  sidebarSpecs.innerHTML = specEntries;

  // Thumbnail highlight
  document.querySelectorAll('.thumb-item').forEach((el, i) => {
    el.classList.toggle('active', i === index);
  });
}

// ── Navigation with fade ─────────────────────────────────
let isTransitioning = false;

function navigateTo(index) {
  if (isTransitioning || index === currentIndex) return;
  isTransitioning = true;

  // Fade out
  overlay.classList.add('visible');

  setTimeout(() => {
    currentIndex = index;
    addPoints(currentIndex);
    updateSidebar(currentIndex);
    // Reset camera gently
    camera.position.set(1.5, 1.5, 2.5);
    controls.target.set(0, 0, 0);
    controls.update();

    // Fade in
    overlay.classList.remove('visible');
    setTimeout(() => { isTransitioning = false; }, 350);
  }, 300);
}

// ── Build thumbnails ─────────────────────────────────────
PASTA.forEach((p, i) => {
  const el = document.createElement('div');
  el.className = 'thumb-item' + (i === 0 ? ' active' : '');
  el.innerHTML = `<span class="thumb-name">${p.name}</span><span class="thumb-page">${p.page}</span>`;
  el.addEventListener('click', () => navigateTo(i));
  thumbStrip.appendChild(el);
});

// ── Prev / Next buttons ──────────────────────────────────
prevBtn.addEventListener('click', () => {
  navigateTo((currentIndex - 1 + PASTA.length) % PASTA.length);
});
nextBtn.addEventListener('click', () => {
  navigateTo((currentIndex + 1) % PASTA.length);
});

// Keyboard navigation
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft')  navigateTo((currentIndex - 1 + PASTA.length) % PASTA.length);
  if (e.key === 'ArrowRight') navigateTo((currentIndex + 1) % PASTA.length);
});

// ── Auto-rotate idle logic ───────────────────────────────
renderer.domElement.addEventListener('mousedown', () => {
  autoRotate = false;
  clearTimeout(idleTimer);
});
renderer.domElement.addEventListener('mouseup', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { autoRotate = true; }, 2000);
});
renderer.domElement.addEventListener('touchstart', () => {
  autoRotate = false;
  clearTimeout(idleTimer);
}, { passive: true });
renderer.domElement.addEventListener('touchend', () => {
  clearTimeout(idleTimer);
  idleTimer = setTimeout(() => { autoRotate = true; }, 2000);
}, { passive: true });

// ── Resize handler ───────────────────────────────────────
function onResize() {
  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
}

const resizeObserver = new ResizeObserver(onResize);
resizeObserver.observe(canvas);
onResize();

// ── Animation loop ───────────────────────────────────────
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const delta = clock.getDelta();

  if (autoRotate && points) {
    points.rotation.y += 0.003;
  }

  controls.update();
  renderer.render(scene, camera);
}

// ── Init ─────────────────────────────────────────────────
addPoints(0);
updateSidebar(0);
autoRotate = true;
animate();
