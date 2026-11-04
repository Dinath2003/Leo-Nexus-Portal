// ============================================
// LEO NEXUS PORTAL — DYNAMIC THEME & BG MANAGER
// Modern SaaS / LeBank Aesthetic
// ============================================

import { showModal } from './modal.js';
import { showToast } from './toast.js';

// ─── Module-level state ──────────────────────────────────────────────────────
let animationFrameId = null;
let canvas = null;
let ctx    = null;

// Particle arrays
let embers = [];
let flames = [];

// Cursor-driven wind
let targetWind = 0;
let wind       = 0;

// ─── Moving Gravity Point ─────────────────────────────────────────────────────
const grav = {
  x: 0, y: 0,
  tx: 0, ty: 0,
  cx: 0, cy: 0,
  t: 0,
  strength: 0.011,
  orbitRX: 0,
  orbitRY: 0,
  cursorWeight: 0.22,
};

// ─── Theme config ─────────────────────────────────────────────────────────────
const config = {
  mode:        'light', // 'light' (default LeBank) or 'dark' (Midnight)
  liveBg:      false,   // Ambient canvas particles (disabled)
  cardTilt:    false,   // Motion disabled
  accent:      'blue'
};

// ─── Wind + cursor tracking ───────────────────────────────────────────────────
window.addEventListener('mousemove', (e) => {
  if (!canvas) return;
  targetWind = ((e.clientX / window.innerWidth) - 0.5) * 2.5;
  grav.cx = e.clientX;
  grav.cy = e.clientY;
});
window.addEventListener('mouseleave', () => {
  targetWind = 0;
  if (canvas) { grav.cx = canvas.width / 2; grav.cy = canvas.height / 2; }
});

// ─── Public API ───────────────────────────────────────────────────────────────
export function initTheme() {
  config.mode     = localStorage.getItem('theme_mode')         || 'light';
  config.liveBg   = false;
  config.cardTilt = false;
  config.accent   = localStorage.getItem('theme_accent_color') || 'blue';

  applyThemeSettings();
  setupSettingsBtn();
}

// ─── Global 3D Card Tilt (Motion Disabled) ────────────────────────────────────
let cardTiltObserver = null;
const tiltedCards    = new WeakSet();

export function initCardTilt() {
  // Motion effects disabled per user requirements
  return;
}

export function destroyCardTilt() {
  cardTiltObserver?.disconnect();
  cardTiltObserver = null;
}

function attachTilt(card) {
  if (tiltedCards.has(card)) return;
  tiltedCards.add(card);

  card.style.transformStyle = 'preserve-3d';
  card.style.willChange     = 'transform';

  let tRX = 0, tRY = 0;
  let cRX = 0, cRY = 0;
  let hovering = false;
  let rafId    = null;

  function onMove(e) {
    if (!config.cardTilt) return;
    const rect = card.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const dx   = (e.clientX - cx) / (rect.width  / 2);
    const dy   = (e.clientY - cy) / (rect.height / 2);

    tRY =  dx * 6;  // subtle modern tilt
    tRX = -dy * 4;
    hovering = true;
  }

  function onLeave() {
    tRX = 0; tRY = 0;
    hovering = false;
  }

  function loop() {
    cRX += (tRX - cRX) * 0.12;
    cRY += (tRY - cRY) * 0.12;

    const scale = hovering ? 1.015 : 1.0;
    card.style.transform = `perspective(1000px) rotateX(${cRX}deg) rotateY(${cRY}deg) scale(${scale})`;

    rafId = requestAnimationFrame(loop);
  }

  card.addEventListener('mousemove', onMove);
  card.addEventListener('mouseleave', onLeave);
  loop();
}

function applyThemeSettings() {
  document.body.setAttribute('data-theme', config.mode);
  document.body.classList.toggle('dark-theme', config.mode === 'dark');
  document.body.setAttribute('data-accent', config.accent);

  if (config.liveBg) startLiveBg();
  else               stopLiveBg();
}

// ─── Canvas life-cycle (Motion Disabled) ──────────────────────────────────────
function startLiveBg() {
  stopLiveBg();
}

function stopLiveBg() {
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
  if (canvas) { canvas.remove(); canvas = null; ctx = null; }
  embers = [];
  flames = [];
}

const rand  = (min, max) => Math.random() * (max - min) + min;
const randI = (min, max) => Math.floor(rand(min, max));

function accentHues() {
  switch (config.accent) {
    case 'blue':   return [215, 225, 240];
    case 'teal':   return [175, 185, 195];
    case 'purple': return [265, 280, 295];
    default:       return [200, 215, 230];
  }
}

function seedParticles() {
  const W = canvas.width;
  const H = canvas.height;
  embers = Array.from({ length: 60 }, () => new Ember(W, H, true));
  flames = Array.from({ length: 20 }, () => new FlameBody(W, H, true));
}

class Ember {
  constructor(W, H, init = false) {
    this.W = W; this.H = H;
    this.reset(init);
  }

  reset(init = false) {
    const W = canvas ? canvas.width  : this.W;
    const H = canvas ? canvas.height : this.H;

    this.baseX     = rand(0, W);
    this.x         = this.baseX;
    this.y         = init ? rand(H * 0.2, H) : rand(H - 40, H);
    this.size      = rand(1.5, 3.5);
    this.vy        = rand(-0.8, -2.0);
    this.life      = 0;
    this.maxLife   = randI(180, 360);
    this.alpha     = 1;
    this.phase     = rand(0, Math.PI * 2);
    this.frequency = rand(0.01, 0.025);
  }

  update() {
    const W = canvas.width;
    const H = canvas.height;

    this.life++;
    this.y    += this.vy;
    this.phase += this.frequency;

    const sway     = Math.sin(this.phase) * 10;
    const windPush = wind * (H - this.y) * 0.3;
    this.x = this.baseX + sway + windPush;

    const dx   = grav.x - this.x;
    const dy   = grav.y - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy) || 1;
    const pull = (grav.strength * 200) / Math.max(dist, 55);
    this.baseX += (dx / dist) * pull * 1.2;
    this.y     += (dy / dist) * pull * 0.4;

    this.alpha = 1 - (this.life / this.maxLife);

    if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) {
      this.reset();
    }
  }

  draw() {
    const ageRatio = this.life / this.maxLife;
    const hues     = accentHues();
    const isDark   = config.mode === 'dark';

    let hue = ageRatio < 0.5 ? hues[0] : hues[1];
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    const opacity = isDark ? this.alpha * 0.7 : this.alpha * 0.35;
    ctx.fillStyle = `hsla(${hue}, 90%, 60%, ${opacity})`;
    ctx.fill();
  }
}

class FlameBody {
  constructor(W, H, init = false) {
    this.W = W; this.H = H;
    this.reset(init);
  }

  reset(init = false) {
    const W = canvas ? canvas.width  : this.W;
    const H = canvas ? canvas.height : this.H;

    this.baseX     = rand(0, W);
    this.x         = this.baseX;
    this.y         = init ? rand(H * 0.6, H) : rand(H - 60, H);
    this.r         = rand(30, 75);
    this.vy        = rand(-0.6, -1.8);
    this.life      = 0;
    this.maxLife   = randI(90, 180);
    this.alpha     = rand(0.2, 0.45);
    this.phase     = rand(0, Math.PI * 2);
    this.frequency = rand(0.01, 0.02);
  }

  update() {
    const H = canvas.height;
    this.life++;
    this.y    += this.vy;
    this.phase += this.frequency;

    const sway     = Math.sin(this.phase) * 14;
    const windPush = wind * (H - this.y) * 0.35;
    this.x = this.baseX + sway + windPush;

    this.alpha = (1 - (this.life / this.maxLife)) * 0.35;
    if (this.life >= this.maxLife || this.y < -this.r) {
      this.reset();
    }
  }

  draw() {
    const hues   = accentHues();
    const isDark = config.mode === 'dark';
    const grad   = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
    const op     = isDark ? this.alpha * 0.6 : this.alpha * 0.25;
    grad.addColorStop(0, `hsla(${hues[0]}, 90%, 65%, ${op})`);
    grad.addColorStop(1, `hsla(${hues[2]}, 80%, 40%, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

function render() {
  if (!canvas || !ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  wind += (targetWind - wind) * 0.04;

  grav.t += 0.008;
  const orbitX = canvas.width  / 2 + Math.sin(grav.t * 0.7) * grav.orbitRX;
  const orbitY = canvas.height / 2 + Math.cos(grav.t * 0.5) * grav.orbitRY;

  grav.tx = orbitX * (1 - grav.cursorWeight) + grav.cx * grav.cursorWeight;
  grav.ty = orbitY * (1 - grav.cursorWeight) + grav.cy * grav.cursorWeight;
  grav.x += (grav.tx - grav.x) * 0.05;
  grav.y += (grav.ty - grav.y) * 0.05;

  flames.forEach(f => { f.update(); f.draw(); });
  embers.forEach(e => { e.update(); e.draw(); });

  animationFrameId = requestAnimationFrame(render);
}

// ─── Settings Button & Modal ──────────────────────────────────────────────────
function setupSettingsBtn() {
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-control-btn');
    if (btn) openThemeSettingsModal();
  });
}

function openThemeSettingsModal() {
  const modalHtml = `
    <div style="display:flex; flex-direction:column; gap:24px;">

      <!-- Theme Mode Switcher -->
      <div>
        <label class="form-label" style="margin-bottom:10px; display:block;">Appearance Mode</label>
        <div style="display:grid; grid-template-columns: 1fr 1fr; gap:12px;">
          <button class="btn theme-mode-btn ${config.mode === 'light' ? 'btn-primary' : 'btn-secondary'}" data-mode="light" style="justify-content:center; padding:12px 18px;">
            <i data-lucide="sun" style="width:18px;height:18px"></i>
            Light (LeBank Modern)
          </button>
          <button class="btn theme-mode-btn ${config.mode === 'dark' ? 'btn-primary' : 'btn-secondary'}" data-mode="dark" style="justify-content:center; padding:12px 18px;">
            <i data-lucide="moon" style="width:18px;height:18px"></i>
            Midnight Dark
          </button>
        </div>
      </div>

      <!-- Accent Palette -->
      <div>
        <label class="form-label" style="margin-bottom:10px; display:block;">Primary Accent Color</label>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
          ${[
            { id: 'blue',   label: 'Royal Blue',    color: '#2563eb' },
            { id: 'cyan',   label: 'Sky Cyan',      color: '#0284c7' },
            { id: 'teal',   label: 'Emerald Teal',  color: '#0d9488' },
            { id: 'purple', label: 'Violet Indigo', color: '#7c3aed' }
          ].map(opt => {
            const active = config.accent === opt.id;
            return `
              <button class="btn accent-selector-btn" data-accent="${opt.id}"
                style="height:60px; border-radius:14px;
                       border:2px solid ${active ? 'var(--color-primary)' : 'var(--color-border)'};
                       background:${active ? 'var(--color-primary-alpha)' : 'var(--color-surface)'};
                       display:flex; flex-direction:column; align-items:center;
                       justify-content:center; gap:6px; cursor:pointer; padding:8px;">
                <span style="width:18px; height:18px; border-radius:50%;
                             background:${opt.color}; box-shadow:0 0 10px ${opt.color}60;"></span>
                <span style="font-size:10px; font-weight:700; color:var(--color-text-primary);">
                  ${opt.label}
                </span>
              </button>`;
          }).join('')}
        </div>
      </div>

      <!-- Motion Effects Status -->
      <div style="display:flex; justify-content:space-between; align-items:center;
                  padding:14px 18px; background:var(--color-surface-muted);
                  border:1px solid var(--color-border); border-radius:16px;">
        <div>
          <div style="font-size:14px; font-weight:700; color:var(--color-text-primary);">
            Motion & Animation Effects
          </div>
          <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">
            All motion effects, page transitions, and card tilts are disabled for clean static rendering
          </div>
        </div>
        <span class="badge" style="background:rgba(100,116,139,0.12); color:var(--color-text-muted); font-size:12px; font-weight:700; padding:4px 12px; border-radius:20px;">
          Disabled
        </span>
      </div>
    </div>
  `;

  showModal('Display & Appearance Settings', modalHtml, { showFooter: false, size: 'md' });

  setTimeout(() => {
    // Mode switcher
    document.querySelectorAll('.theme-mode-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        config.mode = btn.dataset.mode;
        localStorage.setItem('theme_mode', config.mode);
        applyThemeSettings();
        document.querySelectorAll('.theme-mode-btn').forEach(b => {
          if (b.dataset.mode === config.mode) {
            b.classList.remove('btn-secondary');
            b.classList.add('btn-primary');
          } else {
            b.classList.remove('btn-primary');
            b.classList.add('btn-secondary');
          }
        });
        showToast('success', 'Theme Updated', `Switched to ${config.mode === 'light' ? 'Light (LeBank)' : 'Midnight Dark'} mode.`);
      });
    });

    // Accent selectors
    document.querySelectorAll('.accent-selector-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        config.accent = btn.dataset.accent;
        localStorage.setItem('theme_accent_color', config.accent);
        applyThemeSettings();
        document.querySelectorAll('.accent-selector-btn').forEach(b => {
          const active = b.dataset.accent === config.accent;
          b.style.borderColor = active ? 'var(--color-primary)' : 'var(--color-border)';
          b.style.background = active ? 'var(--color-primary-alpha)' : 'var(--color-surface)';
        });
        showToast('success', 'Accent Updated', `Color switched to ${config.accent}.`);
      });
    });

    // Motion toggles disabled
  }, 100);
}
