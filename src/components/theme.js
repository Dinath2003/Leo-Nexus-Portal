// ============================================
// LEO NEXUS PORTAL — DYNAMIC THEME & BG MANAGER
// Background animation ported from Leo Calendar ocean.js
// Fire system adapted to Blue/Cyan storm theme.
// ============================================

import { showModal } from './modal.js';
import { showToast } from './toast.js';

// ─── Module-level state ──────────────────────────────────────────────────────
let animationFrameId = null;
let canvas = null;
let ctx    = null;

// Particle arrays (Leo Calendar pattern)
let embers = [];
let flames = [];

// Cursor-driven wind (same physics as Leo Calendar)
let targetWind = 0;
let wind       = 0;

// ─── Theme config ─────────────────────────────────────────────────────────────
const config = {
  liveBg:      true,
  glassEffect: true,
  accent:      'cyan'
};

// ─── Wind tracking (attached once at module load) ────────────────────────────
window.addEventListener('mousemove', (e) => {
  if (!canvas) return;
  // Identical formula to Leo Calendar ocean.js
  targetWind = ((e.clientX / window.innerWidth) - 0.5) * 2.5;
});
window.addEventListener('mouseleave', () => { targetWind = 0; });

// ─── Public API ───────────────────────────────────────────────────────────────
export function initTheme() {
  config.liveBg      = localStorage.getItem('theme_live_bg')       !== 'false';
  config.glassEffect = localStorage.getItem('theme_glass_effect')  !== 'false';
  config.accent      = localStorage.getItem('theme_accent_color')  || 'cyan';

  applyThemeSettings();
  setupSettingsBtn();
}

function applyThemeSettings() {
  document.body.classList.toggle('glass-effect-enabled',  config.glassEffect);
  document.body.classList.toggle('glass-effect-disabled', !config.glassEffect);
  document.body.setAttribute('data-accent', config.accent);

  if (config.liveBg) startLiveBg();
  else               stopLiveBg();
}

// ─── Canvas life-cycle ────────────────────────────────────────────────────────
function startLiveBg() {
  if (canvas) return; // already running

  canvas = document.createElement('canvas');
  canvas.id = 'ambient-particles-canvas';
  Object.assign(canvas.style, {
    position:      'fixed',
    top:           '0',
    left:          '0',
    width:         '100%',
    height:        '100%',
    pointerEvents: 'none',
    zIndex:        '-1'
  });
  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');

  // Size + re-seed on resize (same as Leo Calendar)
  const resize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    seedParticles();
  };
  resize();
  window.addEventListener('resize', resize);

  // Kick off the render loop
  render();
}

function stopLiveBg() {
  if (animationFrameId) { cancelAnimationFrame(animationFrameId); animationFrameId = null; }
  if (canvas) { canvas.remove(); canvas = null; ctx = null; }
  embers = [];
  flames = [];
}

// ─── Helpers (same as Leo Calendar) ──────────────────────────────────────────
const rand  = (min, max) => Math.random() * (max - min) + min;
const randI = (min, max) => Math.floor(rand(min, max));

// Accent-colour helpers — returns [hueBase, hueShift] for HSL
function accentHues() {
  // Each returns [young-hue, mid-hue, old-hue] to mirror Leo Calendar's
  // age-based gold→amber→maroon shift, but in blue/cyan territory.
  switch (config.accent) {
    case 'blue':   return [210, 220, 240];   // cyan → blue → deep navy
    case 'teal':   return [175, 185, 195];   // bright teal → teal → deep teal
    case 'purple': return [270, 285, 300];   // violet → purple → deep magenta
    default:       return [190, 205, 220];   // cyan (default): bright → mid → navy
  }
}

// ─── Seed particle pools (mirrors Leo Calendar counts) ───────────────────────
function seedParticles() {
  const W = canvas.width;
  const H = canvas.height;

  embers = Array.from({ length: 120 }, () => new Ember(W, H, true));
  flames = Array.from({ length: 45  }, () => new FlameBody(W, H, true));
}

// ─── 1. Ember / Spark (port of Leo Calendar Ember class, blue palette) ───────
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
    // Identical to Leo Calendar: init anywhere, else near bottom
    this.y         = init ? rand(H * 0.2, H) : rand(H - 40, H);
    this.size      = rand(1.2, 3.8);
    this.vy        = rand(-1.2, -3.2);
    this.life      = 0;
    this.maxLife   = randI(150, 320);
    this.alpha     = 1;
    this.phase     = rand(0, Math.PI * 2);
    this.frequency = rand(0.01, 0.035);
  }

  update() {
    const W = canvas.width;
    const H = canvas.height;

    this.life++;
    this.y    += this.vy;
    this.phase += this.frequency;

    // Leo Calendar formula exactly:
    const sway     = Math.sin(this.phase) * 12;
    const windPush = wind * (H - this.y) * 0.45;
    this.x = this.baseX + sway + windPush;

    this.alpha = 1 - (this.life / this.maxLife);

    if (this.life >= this.maxLife || this.y < -10 || this.x < -10 || this.x > W + 10) {
      this.reset();
    }
  }

  draw() {
    const ageRatio = this.life / this.maxLife;
    const hues     = accentHues();

    // Mirrors Leo Calendar's age-based hue shift (gold→amber→maroon → cyan→blue→navy)
    let hue;
    if (ageRatio < 0.35)       hue = hues[0];
    else if (ageRatio < 0.75)  hue = hues[1];
    else                       hue = hues[2];

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${this.alpha})`;
    ctx.fill();
  }
}

// ─── 2. Flame Body (port of Leo Calendar FlameBody class, blue palette) ──────
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
    // Leo Calendar: init in lower 40%, else near very bottom
    this.y         = init ? rand(H * 0.6, H) : rand(H - 60, H);
    this.r         = rand(30, 85);
    this.vy        = rand(-1.0, -2.5);
    this.life      = 0;
    this.maxLife   = randI(80, 160);
    this.alpha     = rand(0.35, 0.65);
    this.phase     = rand(0, Math.PI * 2);
    this.frequency = rand(0.01, 0.025);
  }

  update() {
    const H = canvas.height;

    this.life++;
    this.y    += this.vy;
    this.phase += this.frequency;

    // Leo Calendar formula exactly:
    const sway     = Math.sin(this.phase) * 18;
    const windPush = wind * (H - this.y) * 0.5;
    this.x = this.baseX + sway + windPush;

    const progress    = this.life / this.maxLife;
    this.currentR     = this.r * (1 - progress * 0.78);
    this.currentAlpha = this.alpha * (1 - progress);

    if (this.life >= this.maxLife || this.y < H - H * 0.6 || this.x < -this.r || this.x > canvas.width + this.r) {
      this.reset();
    }
  }

  draw() {
    const ageRatio = this.life / this.maxLife;
    const hues     = accentHues();

    // Age-based hue shift mirrors Leo Calendar (bright core → dark outer edges)
    let hue;
    if (ageRatio < 0.25)       hue = hues[0];
    else if (ageRatio < 0.60)  hue = hues[1];
    else                       hue = hues[2];

    // Radial gradient identical to Leo Calendar:
    const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.currentR);
    grad.addColorStop(0,    `hsla(${hue},     100%, 60%, ${this.currentAlpha * 0.55})`);
    grad.addColorStop(0.35, `hsla(${hue - 15}, 90%, 42%, ${this.currentAlpha * 0.25})`);
    grad.addColorStop(1,    `hsla(${hues[2]},  80%, 25%, 0)`);

    ctx.beginPath();
    ctx.arc(this.x, this.y, this.currentR, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();
  }
}

// ─── Background & glow (ported from Leo Calendar, blue palette) ───────────────
function drawBackground() {
  const W = canvas.width;
  const H = canvas.height;

  // Deep dark background matching Leo Calendar's fire-pit gradient style
  // but in deep-navy / indigo to suit the blue fire look
  const grad = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, Math.max(W, H));
  grad.addColorStop(0, '#020510'); // deep navy core
  grad.addColorStop(1, '#010204'); // near-black edge
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);
}

function drawGroundGlow() {
  const W = canvas.width;
  const H = canvas.height;
  const hues = accentHues();

  // Leo Calendar flicker formula exactly:
  const flicker    = Math.sin(Date.now() * 0.006) * 0.05 + Math.cos(Date.now() * 0.013) * 0.03 + 0.95;
  const baseGlowH  = H * 0.22 * flicker;

  const grad = ctx.createLinearGradient(0, H, 0, H - baseGlowH);
  // Leo Calendar used rgba(118,35,47) maroon → rgba(234,170,0) gold
  // We use deep blue → bright cyan equivalent:
  grad.addColorStop(0,   `hsla(${hues[2]}, 100%, 25%, ${0.48 * flicker})`);   // deep colour base
  grad.addColorStop(0.4, `hsla(${hues[0]},  90%, 60%, ${0.16 * flicker})`);   // bright colour mid
  grad.addColorStop(1,   `rgba(0, 0, 0, 0)`);

  ctx.fillStyle = grad;
  ctx.fillRect(0, H - baseGlowH, W, baseGlowH);
}

// ─── Main render loop (mirrors Leo Calendar render() exactly) ─────────────────
function render() {
  if (!canvas || !ctx) return;

  // Leo Calendar wind interpolation formula:
  wind += (targetWind - wind) * 0.065;

  drawBackground();

  // Leo Calendar's key technique: 'screen' blend for glowing overlap
  ctx.save();
  ctx.globalCompositeOperation = 'screen';

  flames.forEach(f => { f.update(); f.draw(); });
  embers.forEach(e => { e.update(); e.draw(); });

  ctx.restore();

  // Ground glow drawn after 'screen' pass, in normal mode
  drawGroundGlow();

  animationFrameId = requestAnimationFrame(render);
}

// ─── Settings UI ──────────────────────────────────────────────────────────────
function setupSettingsBtn() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('#theme-control-btn')) openThemeSettingsModal();
  });
}

export function openThemeSettingsModal() {
  const modalHtml = `
    <div style="display:flex; flex-direction:column; gap:20px;">

      <!-- Accent Palette -->
      <div>
        <label class="form-label" style="margin-bottom:10px; font-weight:600;">Accent Color Theme</label>
        <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:10px;">
          ${[
            { id: 'cyan',   label: 'Neon Cyan',      color: '#00d4ff' },
            { id: 'blue',   label: 'Electric Blue',   color: '#0066ff' },
            { id: 'teal',   label: 'Emerald Teal',    color: '#14b8a6' },
            { id: 'purple', label: 'Violet Purple',   color: '#8b5cf6' }
          ].map(opt => {
            const active = config.accent === opt.id;
            return `
              <button class="btn accent-selector-btn" data-accent="${opt.id}"
                style="height:56px; border-radius:12px;
                       border:2px solid ${active ? 'var(--color-text-white)' : 'rgba(255,255,255,0.06)'};
                       background:rgba(255,255,255,0.02);
                       display:flex; flex-direction:column; align-items:center;
                       justify-content:center; gap:6px; cursor:pointer;">
                <span style="width:16px; height:16px; border-radius:50%;
                             background:${opt.color}; box-shadow:0 0 10px ${opt.color}80;"></span>
                <span style="font-size:10px; font-weight:700;
                             color:${active ? 'var(--color-text-primary)' : 'var(--color-text-muted)'};">
                  ${opt.label}
                </span>
              </button>`;
          }).join('')}
        </div>
      </div>

      <!-- Live Background Toggle -->
      <div style="display:flex; justify-content:space-between; align-items:center;
                  padding:12px 16px; background:rgba(255,255,255,0.02);
                  border:1px solid var(--color-border); border-radius:12px;">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">
            Ambient Fire Background
          </div>
          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">
            Interactive blue fire embers rising with cursor wind
          </div>
        </div>
        <label class="switch-container" style="position:relative; display:inline-block; width:44px; height:24px;">
          <input type="checkbox" id="toggle-live-bg" ${config.liveBg ? 'checked' : ''}
                 style="opacity:0; width:0; height:0;" />
          <span class="switch-slider"
                style="position:absolute; cursor:pointer; inset:0;
                       background-color:rgba(255,255,255,0.1);
                       border:1px solid var(--color-border);
                       border-radius:24px; transition:0.3s;"></span>
        </label>
      </div>

      <!-- Glassmorphic toggle -->
      <div style="display:flex; justify-content:space-between; align-items:center;
                  padding:12px 16px; background:rgba(255,255,255,0.02);
                  border:1px solid var(--color-border); border-radius:12px;">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">
            Glassmorphism Effects
          </div>
          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">
            Translucent backdrops with active blur styling
          </div>
        </div>
        <label class="switch-container" style="position:relative; display:inline-block; width:44px; height:24px;">
          <input type="checkbox" id="toggle-glass" ${config.glassEffect ? 'checked' : ''}
                 style="opacity:0; width:0; height:0;" />
          <span class="switch-slider"
                style="position:absolute; cursor:pointer; inset:0;
                       background-color:rgba(255,255,255,0.1);
                       border:1px solid var(--color-border);
                       border-radius:24px; transition:0.3s;"></span>
        </label>
      </div>
    </div>

    <style>
      .switch-container input:checked + .switch-slider {
        background-color: var(--color-primary) !important;
        box-shadow: 0 0 10px var(--color-primary);
      }
      .switch-slider:before {
        position: absolute; content: "";
        height: 16px; width: 16px;
        left: 3px; bottom: 3px;
        background-color: white;
        transition: 0.3s; border-radius: 50%;
      }
      .switch-container input:checked + .switch-slider:before {
        transform: translateX(20px);
      }
    </style>
  `;

  showModal('Customize Dashboard Theme', modalHtml, { showFooter: false, size: 'md' });

  setTimeout(() => {
    // Accent selectors
    document.querySelectorAll('.accent-selector-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        config.accent = btn.dataset.accent;
        localStorage.setItem('theme_accent_color', config.accent);
        applyThemeSettings();
        document.querySelectorAll('.accent-selector-btn').forEach(b => {
          b.style.borderColor = b.dataset.accent === config.accent
            ? 'var(--color-text-white)' : 'rgba(255,255,255,0.06)';
          b.querySelector('span:last-child').style.color = b.dataset.accent === config.accent
            ? 'var(--color-text-primary)' : 'var(--color-text-muted)';
        });
        showToast('success', 'Theme Updated', `Accent switched to ${config.accent}.`);
      });
    });

    // Live BG toggle
    document.getElementById('toggle-live-bg')?.addEventListener('change', (e) => {
      config.liveBg = e.target.checked;
      localStorage.setItem('theme_live_bg', config.liveBg);
      applyThemeSettings();
      showToast('success', 'Background Updated',
        `Ambient fire background is now ${config.liveBg ? 'Enabled' : 'Disabled'}.`);
    });

    // Glass toggle
    document.getElementById('toggle-glass')?.addEventListener('change', (e) => {
      config.glassEffect = e.target.checked;
      localStorage.setItem('theme_glass_effect', config.glassEffect);
      applyThemeSettings();
      showToast('success', 'Visual Style Updated',
        `Glassmorphism effects are now ${config.glassEffect ? 'Enabled' : 'Disabled'}.`);
    });
  }, 200);
}
