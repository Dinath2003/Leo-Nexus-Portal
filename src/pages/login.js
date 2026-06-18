// ============================================
// LEO NEXUS PORTAL — LOGIN PAGE
// Blue fire + glassmorphism + 3D tilt + gravity point
// ============================================

import { auth } from '../auth.js';
import { router } from '../router.js';

export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-layout">
      <div class="login-bg">
        <canvas id="particle-canvas"></canvas>
      </div>
      <div class="login-content" id="login-content-3d">
        <div class="login-card" id="login-card-3d">

          <!-- Glassmorphism shimmer layer -->
          <div class="login-card-shimmer" aria-hidden="true"></div>
          <!-- Floating orb reflections -->
          <div class="login-card-orb login-card-orb-1" aria-hidden="true"></div>
          <div class="login-card-orb login-card-orb-2" aria-hidden="true"></div>

          <div class="login-branding">
            <div class="login-logo">
              <i data-lucide="anchor"></i>
            </div>
            <div class="login-subtitle">Welcome to</div>
            <h1>Leo Nexus<br/>Portal</h1>
            <p class="login-desc">District &amp; Club Management System</p>
          </div>

          <form class="login-form" id="login-form">
            <div class="login-role-toggle">
              <button type="button" class="active" data-role="district" id="role-district">
                <i data-lucide="shield" style="width:14px;height:14px;margin-right:6px;vertical-align:-2px"></i>
                District
              </button>
              <button type="button" data-role="club" id="role-club">
                <i data-lucide="building-2" style="width:14px;height:14px;margin-right:6px;vertical-align:-2px"></i>
                Club
              </button>
            </div>

            <div class="form-group">
              <label class="form-label" for="login-email">Email Address</label>
              <div style="position:relative">
                <i data-lucide="mail" class="input-icon"></i>
                <input type="email" class="form-input" id="login-email" placeholder="Enter your email" required value="admin@leo.org" style="padding-left:44px" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <div style="position:relative">
                <i data-lucide="lock" class="input-icon"></i>
                <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required value="admin123" style="padding-left:44px" />
              </div>
            </div>

            <div class="login-error" id="login-error"></div>

            <button type="submit" class="btn btn-primary btn-lg" style="width:100%;margin-top:var(--space-2)">
              <i data-lucide="log-in" style="width:18px;height:18px"></i>
              Sign In
            </button>
          </form>

          <div style="margin-top:var(--space-4);border-top:1px solid var(--color-border);padding-top:var(--space-4);">
            <label class="form-label" for="demo-account-select" style="text-align:left;display:block;margin-bottom:6px;font-size:var(--text-xs);color:var(--color-text-muted);">Quick-Login Selector (Demo Roles):</label>
            <select class="form-select" id="demo-account-select" style="font-size:12px;padding:8px 12px;background:rgba(255,255,255,0.03);color:var(--color-text-primary);border-color:var(--color-border);border-radius:8px;width:100%;">
              <option value="" style="background:var(--color-bg);">-- Choose Demo Role --</option>
              <optgroup label="Super Admin" style="background:var(--color-bg);">
                <option value="admin@leo.org|admin123" style="background:var(--color-bg);">Super Admin (Leo Lion Dinath Wijesooriya)</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // ── Role toggle ────────────────────────────────────────────────────────────
  const roleDistrict = document.getElementById('role-district');
  const roleClub     = document.getElementById('role-club');
  const emailInput   = document.getElementById('login-email');
  const passInput    = document.getElementById('login-password');
  const demoSelect   = document.getElementById('demo-account-select');

  roleDistrict.addEventListener('click', () => {
    roleDistrict.classList.add('active');
    roleClub.classList.remove('active');
    emailInput.value = 'admin@leo.org';
    passInput.value  = 'admin123';
    if (demoSelect) demoSelect.value = '';
  });

  roleClub.addEventListener('click', () => {
    roleClub.classList.add('active');
    roleDistrict.classList.remove('active');
    emailInput.value = '';
    passInput.value  = '';
    if (demoSelect) demoSelect.value = '';
  });

  demoSelect?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val) {
      const [email, password] = val.split('|');
      emailInput.value = email;
      passInput.value  = password;
      if (email.startsWith('president.dist') || email.startsWith('vp.dist') ||
          email.startsWith('secretary.dist') || email.startsWith('membership.dist') ||
          email.startsWith('treasurer.dist')  || email.startsWith('admin')) {
        roleDistrict.classList.add('active');
        roleClub.classList.remove('active');
      } else {
        roleClub.classList.add('active');
        roleDistrict.classList.remove('active');
      }
    }
  });

  // ── Form submission ────────────────────────────────────────────────────────
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email    = emailInput.value.trim();
    const password = passInput.value;
    const result   = auth.login(email, password);
    if (result.success) {
      let target = '/club/dashboard';
      if (auth.isDistrictUser)  target = '/district/dashboard';
      else if (auth.isClubMember) target = '/member/dashboard';
      router.navigate(target);
    } else {
      const errorEl = document.getElementById('login-error');
      errorEl.textContent = result.error;
      errorEl.classList.add('show');
      setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
  });

  // ── Boot effects ───────────────────────────────────────────────────────────
  const cleanupFire  = initParticles();
  const cleanup3D    = init3DTilt();

  // Return combined cleanup for router
  return () => {
    cleanupFire?.();
    cleanup3D?.();
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// 3D TILT + GLASSMORPHISM SHIMMER
// Mouse-driven perspective tilt on the login card with spring easing.
// ─────────────────────────────────────────────────────────────────────────────
function init3DTilt() {
  const card    = document.getElementById('login-card-3d');
  const content = document.getElementById('login-content-3d');
  if (!card || !content) return null;

  // Spring state
  let targetRX = 0, targetRY = 0;
  let currentRX = 0, currentRY = 0;
  let rafId = null;
  let isHovering = false;

  // Set perspective on the wrapper
  content.style.perspective = '1000px';
  content.style.perspectiveOrigin = '50% 50%';

  function onMouseMove(e) {
    const rect   = card.getBoundingClientRect();
    const cx     = rect.left + rect.width  / 2;
    const cy     = rect.top  + rect.height / 2;
    const dx     = (e.clientX - cx) / (rect.width  / 2);  // -1 … +1
    const dy     = (e.clientY - cy) / (rect.height / 2);  // -1 … +1
    targetRY =  dx * 14;   // tilt left-right  (max ±14°)
    targetRX = -dy * 10;   // tilt up-down     (max ±10°)
    isHovering = true;
  }

  function onMouseLeave() {
    targetRX = 0;
    targetRY = 0;
    isHovering = false;
  }

  function springLoop() {
    // Spring lerp toward target (stiffness = 0.10)
    currentRX += (targetRX - currentRX) * 0.10;
    currentRY += (targetRY - currentRY) * 0.10;

    const scale = isHovering ? 1.02 : 1.0;

    card.style.transform =
      `perspective(1000px) rotateX(${currentRX}deg) rotateY(${currentRY}deg) scale(${scale})`;

    // Dynamic specular: move shimmer opposite to tilt for "light catching" effect
    const shimmer = card.querySelector('.login-card-shimmer');
    if (shimmer) {
      const shiftX = -currentRY * 3;  // px offset
      const shiftY =  currentRX * 3;
      shimmer.style.background = `
        radial-gradient(
          ellipse 80% 60% at ${50 + shiftX}% ${50 + shiftY}%,
          rgba(255,255,255,0.07) 0%,
          rgba(255,255,255,0.02) 40%,
          transparent 70%
        )
      `;
    }

    rafId = requestAnimationFrame(springLoop);
  }

  card.addEventListener('mousemove', onMouseMove);
  card.addEventListener('mouseleave', onMouseLeave);
  springLoop();

  return () => {
    card.removeEventListener('mousemove', onMouseMove);
    card.removeEventListener('mouseleave', onMouseLeave);
    cancelAnimationFrame(rafId);
    card.style.transform = '';
  };
}

// ─────────────────────────────────────────────────────────────────────────────
// BLUE FIRE ANIMATION — Leo Calendar ocean.js port
// + Moving Gravity Point that orbits autonomously and attracts particles
// ─────────────────────────────────────────────────────────────────────────────
function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  let animId;

  // ── Wind (Leo Calendar formula) ───────────────────────────────────────────
  let targetWind = 0;
  let wind = 0;

  // ── Gravity Point — orbits screen in a slow Lissajous figure ─────────────
  // The point is fully autonomous (no cursor needed) but also gently pulled
  // toward the cursor when the mouse moves.
  const grav = {
    x: 0, y: 0,             // current rendered position
    tx: 0, ty: 0,           // target (orbit)
    cx: 0, cy: 0,           // cursor influence target
    t: 0,                   // orbit time
    strength: 0.012,        // how strongly particles are pulled
    orbitRX: 0,             // orbit radii (set after resize)
    orbitRY: 0,
    cursorInfluence: 0.25,  // weight of cursor vs orbit
  };

  const rand  = (min, max) => Math.random() * (max - min) + min;
  const randI = (min, max) => Math.floor(rand(min, max));

  // ── Resize ────────────────────────────────────────────────────────────────
  function resize() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    grav.orbitRX  = canvas.width  * 0.32;
    grav.orbitRY  = canvas.height * 0.22;
    grav.cx = canvas.width  / 2;
    grav.cy = canvas.height / 2;
    seed();
  }
  window.addEventListener('resize', resize);

  // ── Mouse listeners ───────────────────────────────────────────────────────
  function onMouseMove(e) {
    targetWind = ((e.clientX / window.innerWidth) - 0.5) * 2.5;
    grav.cx = e.clientX;
    grav.cy = e.clientY;
  }
  function onMouseLeave() {
    targetWind = 0;
    grav.cx = canvas.width  / 2;
    grav.cy = canvas.height / 2;
  }
  window.addEventListener('mousemove', onMouseMove);
  window.addEventListener('mouseleave', onMouseLeave);

  // ── Particle pools ────────────────────────────────────────────────────────
  let embers = [];
  let flames = [];
  let comets = [];

  function seed() {
    embers = Array.from({ length: 120 }, () => new Ember(true));
    flames = Array.from({ length: 45  }, () => new FlameBody(true));
    comets = Array.from({ length: 8   }, () => new Comet(true));
  }

  // ── Ember (Leo Calendar Ember, blue palette + gravity pull) ───────────────
  class Ember {
    constructor(init = false) { this.reset(init); }

    reset(init = false) {
      const W = canvas.width, H = canvas.height;
      this.baseX     = rand(0, W);
      this.x         = this.baseX;
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
      const H = canvas.height;
      this.life++;
      this.y    += this.vy;
      this.phase += this.frequency;

      // Leo Calendar sway + wind
      const sway     = Math.sin(this.phase) * 12;
      const windPush = wind * (H - this.y) * 0.45;
      this.x = this.baseX + sway + windPush;

      // ── Gravity pull toward gravity point ─────────────────────────────────
      const dx   = grav.x - this.x;
      const dy   = grav.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      // Pull diminishes with distance; stronger close-in, fades beyond 300px
      const pull = (grav.strength * 300) / Math.max(dist, 60);
      this.baseX += dx / dist * pull * 1.8;
      this.y     += dy / dist * pull * 0.6;

      this.alpha = 1 - (this.life / this.maxLife);
      if (this.life >= this.maxLife || this.y < -10 ||
          this.x < -10 || this.x > canvas.width + 10) this.reset();
    }

    draw() {
      const t   = this.life / this.maxLife;
      const hue = t < 0.35 ? 190 : t < 0.75 ? 210 : 225;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${hue}, 100%, 65%, ${this.alpha})`;
      ctx.fill();
    }
  }

  // ── Flame Body (Leo Calendar FlameBody, blue palette + gravity pull) ──────
  class FlameBody {
    constructor(init = false) { this.reset(init); }

    reset(init = false) {
      const W = canvas.width, H = canvas.height;
      this.baseX     = rand(0, W);
      this.x         = this.baseX;
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

      const sway     = Math.sin(this.phase) * 18;
      const windPush = wind * (H - this.y) * 0.5;
      this.x = this.baseX + sway + windPush;

      // Gravity pull (gentler for blobs)
      const dx   = grav.x - this.x;
      const dy   = grav.y - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const pull = (grav.strength * 200) / Math.max(dist, 80);
      this.baseX += dx / dist * pull * 1.2;
      this.y     += dy / dist * pull * 0.4;

      const p           = this.life / this.maxLife;
      this.currentR     = this.r * (1 - p * 0.78);
      this.currentAlpha = this.alpha * (1 - p);

      if (this.life >= this.maxLife || this.y < H - H * 0.6 ||
          this.x < -this.r || this.x > canvas.width + this.r) this.reset();
    }

    draw() {
      const t   = this.life / this.maxLife;
      const hue = t < 0.25 ? 190 : t < 0.60 ? 210 : 225;
      const g   = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.currentR);
      g.addColorStop(0,    `hsla(${hue},      100%, 60%, ${this.currentAlpha * 0.55})`);
      g.addColorStop(0.35, `hsla(${hue - 15},  90%, 42%, ${this.currentAlpha * 0.25})`);
      g.addColorStop(1,    `hsla(225,           80%, 25%, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.currentR, 0, Math.PI * 2);
      ctx.fillStyle = g;
      ctx.fill();
    }
  }

  // ── Background (Leo Calendar fire-pit, deep navy) ─────────────────────────
  function drawBg() {
    const W = canvas.width, H = canvas.height;
    const g = ctx.createRadialGradient(W / 2, H, 0, W / 2, H, Math.max(W, H));
    g.addColorStop(0, '#020510');
    g.addColorStop(1, '#010204');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  // ── Ground glow (Leo Calendar flicker, blue palette) ─────────────────────
  function drawGroundGlow() {
    const W = canvas.width, H = canvas.height;
    const flicker = Math.sin(Date.now() * 0.006) * 0.05 + Math.cos(Date.now() * 0.013) * 0.03 + 0.95;
    const glowH   = H * 0.22 * flicker;
    const g = ctx.createLinearGradient(0, H, 0, H - glowH);
    g.addColorStop(0,   `hsla(225, 100%, 25%, ${0.48 * flicker})`);
    g.addColorStop(0.4, `hsla(190,  90%, 60%, ${0.16 * flicker})`);
    g.addColorStop(1,   `rgba(0, 0, 0, 0)`);
    ctx.fillStyle = g;
    ctx.fillRect(0, H - glowH, W, glowH);
  }

  // ── Comet / Meteor class ─────────────────────────────────────────────────
  // Comets fall from top to bottom at a slight diagonal angle,
  // leaving a long glowing gradient tail behind them.
  class Comet {
    constructor(init = false) { this.reset(init); }

    reset(init = false) {
      const W = canvas.width, H = canvas.height;

      // Spawn off the top edge (or random height when seeding initially)
      this.x    = rand(W * 0.05, W * 0.95);
      this.y    = init ? rand(-H, 0) : rand(-120, -20);

      // Downward velocity with a slight rightward or leftward drift
      const angle  = rand(-0.22, 0.22);   // radians from vertical
      const speed  = rand(4.5, 10);       // px per frame
      this.vx      = Math.sin(angle) * speed;
      this.vy      = Math.cos(angle) * speed;

      // Visual properties
      this.tailLen = rand(120, 280);      // gradient tail length in px
      this.size    = rand(1.5, 3.2);      // nucleus radius
      this.alpha   = rand(0.55, 0.95);    // max opacity
      this.life    = 0;
      this.maxLife = randI(60, 140);      // frames alive after entering screen
      this.hue     = rand(185, 220);      // cyan → blue range
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;

      const H = canvas.height, W = canvas.width;
      // Remove once far below screen or life expired
      if (this.y > H + this.tailLen || this.x < -this.tailLen || this.x > W + this.tailLen
          || this.life > this.maxLife) {
        this.reset(false);
      }
    }

    draw() {
      // Fade in over first 20 frames, fade out at end of life
      const lifeFrac = this.life / this.maxLife;
      const fadeIn   = Math.min(this.life / 20, 1);
      const fadeOut  = lifeFrac > 0.75 ? 1 - (lifeFrac - 0.75) / 0.25 : 1;
      const opacity  = this.alpha * fadeIn * fadeOut;
      if (opacity <= 0.01) return;

      // Direction vector reversed (tail points opposite to motion)
      const len  = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
      const nx   = -this.vx / len;  // unit normal along tail
      const ny   = -this.vy / len;

      // Tail endpoint
      const tx = this.x + nx * this.tailLen;
      const ty = this.y + ny * this.tailLen;

      // Gradient from bright nucleus → transparent tail
      const grad = ctx.createLinearGradient(this.x, this.y, tx, ty);
      grad.addColorStop(0,    `hsla(${this.hue},  100%, 90%, ${opacity})`);
      grad.addColorStop(0.05, `hsla(${this.hue},  100%, 70%, ${opacity * 0.85})`);
      grad.addColorStop(0.25, `hsla(${this.hue},   95%, 55%, ${opacity * 0.40})`);
      grad.addColorStop(0.6,  `hsla(${this.hue + 15}, 80%, 35%, ${opacity * 0.12})`);
      grad.addColorStop(1,    `hsla(${this.hue + 25}, 60%, 20%, 0)`);

      // Draw tail as a tapered stroke
      ctx.save();
      ctx.strokeStyle  = grad;
      ctx.lineWidth    = this.size * 2;
      ctx.lineCap      = 'round';
      ctx.shadowBlur   = 14;
      ctx.shadowColor  = `hsla(${this.hue}, 100%, 80%, ${opacity * 0.7})`;
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(tx, ty);
      ctx.stroke();
      ctx.restore();

      // Bright nucleus dot
      ctx.save();
      ctx.shadowBlur  = 20;
      ctx.shadowColor = `hsla(${this.hue}, 100%, 90%, ${opacity})`;
      const nGrad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2.5);
      nGrad.addColorStop(0,   `hsla(0, 0%, 100%, ${opacity})`);
      nGrad.addColorStop(0.4, `hsla(${this.hue}, 100%, 85%, ${opacity * 0.75})`);
      nGrad.addColorStop(1,   `hsla(${this.hue}, 100%, 60%, 0)`);
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 2.5, 0, Math.PI * 2);
      ctx.fillStyle = nGrad;
      ctx.fill();
      ctx.restore();
    }
  }

  // ── Gravity Point Orb visual ──────────────────────────────────────────────
  function drawGravityOrb() {
    const pulse = 0.65 + Math.sin(Date.now() * 0.004) * 0.35;
    const r     = 28 + Math.sin(Date.now() * 0.007) * 8;

    // Outer diffuse halo
    const outer = ctx.createRadialGradient(grav.x, grav.y, 0, grav.x, grav.y, r * 3.5);
    outer.addColorStop(0,   `rgba(0, 200, 255, ${0.18 * pulse})`);
    outer.addColorStop(0.5, `rgba(0, 100, 200, ${0.08 * pulse})`);
    outer.addColorStop(1,   `rgba(0,  50, 150, 0)`);
    ctx.beginPath();
    ctx.arc(grav.x, grav.y, r * 3.5, 0, Math.PI * 2);
    ctx.fillStyle = outer;
    ctx.fill();

    // Core bright orb
    const core = ctx.createRadialGradient(grav.x, grav.y, 0, grav.x, grav.y, r);
    core.addColorStop(0,   `rgba(200, 240, 255, ${0.9  * pulse})`);
    core.addColorStop(0.3, `rgba( 80, 180, 255, ${0.7  * pulse})`);
    core.addColorStop(0.7, `rgba(  0, 100, 220, ${0.35 * pulse})`);
    core.addColorStop(1,   `rgba(  0,  50, 160, 0)`);
    ctx.beginPath();
    ctx.arc(grav.x, grav.y, r, 0, Math.PI * 2);
    ctx.fillStyle = core;
    ctx.fill();

    // Tiny bright nucleus
    ctx.beginPath();
    ctx.arc(grav.x, grav.y, 3.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * pulse})`;
    ctx.shadowBlur  = 14;
    ctx.shadowColor = 'rgba(100, 220, 255, 0.9)';
    ctx.fill();
    ctx.shadowBlur = 0;
  }

  // ── Update gravity point position (Lissajous orbit + cursor blend) ────────
  function updateGravityPoint() {
    const W = canvas.width, H = canvas.height;
    // Slow autonomous orbit
    grav.t += 0.006;
    const orbitX = W / 2 + Math.cos(grav.t * 1.0) * grav.orbitRX;
    const orbitY = H / 2 + Math.sin(grav.t * 1.3) * grav.orbitRY;

    // Blend orbit and cursor position
    grav.tx = orbitX * (1 - grav.cursorInfluence) + grav.cx * grav.cursorInfluence;
    grav.ty = orbitY * (1 - grav.cursorInfluence) + grav.cy * grav.cursorInfluence;

    // Spring toward target
    grav.x += (grav.tx - grav.x) * 0.04;
    grav.y += (grav.ty - grav.y) * 0.04;
  }

  // ── Render loop (Leo Calendar structure, + gravity orb + comets) ──────────
  function render() {
    wind += (targetWind - wind) * 0.065;

    updateGravityPoint();

    drawBg();

    // Comets drawn first in normal blend so they appear behind fire
    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    comets.forEach(c => { c.update(); c.draw(); });
    ctx.restore();

    // Gravity orb drawn before fire 'screen' pass
    drawGravityOrb();

    ctx.save();
    ctx.globalCompositeOperation = 'screen';
    flames.forEach(f => { f.update(); f.draw(); });
    embers.forEach(e => { e.update(); e.draw(); });
    ctx.restore();

    drawGroundGlow();
    animId = requestAnimationFrame(render);
  }

  // ── Boot ──────────────────────────────────────────────────────────────────
  resize();
  render();

  return () => {
    cancelAnimationFrame(animId);
    window.removeEventListener('resize', resize);
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseleave', onMouseLeave);
  };
}
