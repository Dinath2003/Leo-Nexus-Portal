// ============================================
// LEO NEXUS PORTAL — DYNAMIC THEME & BG MANAGER
// ============================================

import { showModal } from './modal.js';
import { showToast } from './toast.js';

let animationFrameId = null;
let particles = [];
let shootingStars = [];
let canvas = null;
let ctx = null;

// Default configuration
const config = {
  liveBg: true,
  glassEffect: true,
  accent: 'cyan'
};

export function initTheme() {
  // Load saved preferences
  config.liveBg = localStorage.getItem('theme_live_bg') !== 'false';
  config.glassEffect = localStorage.getItem('theme_glass_effect') !== 'false';
  config.accent = localStorage.getItem('theme_accent_color') || 'cyan';

  applyThemeSettings();
  setupSettingsBtn();
}

function applyThemeSettings() {
  // Apply glass effect class
  if (config.glassEffect) {
    document.body.classList.add('glass-effect-enabled');
    document.body.classList.remove('glass-effect-disabled');
  } else {
    document.body.classList.add('glass-effect-disabled');
    document.body.classList.remove('glass-effect-enabled');
  }

  // Apply accent attribute
  document.body.setAttribute('data-accent', config.accent);

  // Handle live background canvas
  if (config.liveBg) {
    startLiveBg();
  } else {
    stopLiveBg();
  }
}

function startLiveBg() {
  if (canvas) return; // Already running

  canvas = document.createElement('canvas');
  canvas.id = 'ambient-particles-canvas';
  Object.assign(canvas.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    zIndex: '-1'
  });

  document.body.appendChild(canvas);
  ctx = canvas.getContext('2d');
  
  // Set canvas bounds
  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  resize();
  window.addEventListener('resize', resize);

  // Initialize star particles
  particles = [];
  const starCount = 120;
  for (let i = 0; i < starCount; i++) {
    particles.push(new Star(canvas.width, canvas.height));
  }

  // Initialize shooting stars
  shootingStars = [];
  const shootingStarCount = 2;
  for (let i = 0; i < shootingStarCount; i++) {
    shootingStars.push(new ShootingStar(canvas.width, canvas.height));
  }

  // Animation Loop
  const animate = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw subtle gradient overlay representing outer space deep darkness
    const gradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 10, canvas.width/2, canvas.height/2, canvas.width);
    gradient.addColorStop(0, 'rgba(8, 10, 32, 0.25)');
    gradient.addColorStop(1, 'rgba(3, 4, 12, 0.9)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update(canvas.width, canvas.height);
      p.draw(ctx);
    });

    shootingStars.forEach(s => {
      s.update(canvas.width, canvas.height);
      s.draw(ctx);
    });

    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
}

function stopLiveBg() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  if (canvas) {
    canvas.remove();
    canvas = null;
    ctx = null;
  }
  particles = [];
  shootingStars = [];
}

// Twinkling Star class
class Star {
  constructor(w, h) {
    this.reset(w, h, true);
  }

  reset(w, h, initial = false) {
    this.x = Math.random() * w;
    this.y = Math.random() * h;
    this.radius = Math.random() * 1.2 + 0.3; // Tiny points of light
    this.alpha = Math.random() * 0.8 + 0.2;
    this.twinkleSpeed = Math.random() * 0.015 + 0.005;
    this.direction = Math.random() > 0.5 ? 1 : -1;
    
    const colors = [
      '255, 255, 255', // White
      '224, 242, 254', // Cyan tint
      '238, 242, 255', // Blue tint
      '253, 244, 245'  // Warm white
    ];
    this.baseColor = colors[Math.floor(Math.random() * colors.length)];
    
    // Tiny drift
    this.speedX = (Math.random() - 0.5) * 0.03;
    this.speedY = (Math.random() - 0.5) * 0.03;
  }

  update(w, h) {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.x < 0) this.x = w;
    if (this.x > w) this.x = 0;
    if (this.y < 0) this.y = h;
    if (this.y > h) this.y = 0;

    this.alpha += this.twinkleSpeed * this.direction;
    if (this.alpha >= 1) {
      this.alpha = 1;
      this.direction = -1;
    } else if (this.alpha <= 0.15) {
      this.alpha = 0.15;
      this.direction = 1;
    }
  }

  draw(context) {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    
    let color = this.baseColor;
    let glow = false;
    
    // Subset of stars glow in the active accent color
    if (this.radius > 0.95) {
      glow = true;
      if (config.accent === 'cyan') color = '0, 212, 255';
      else if (config.accent === 'blue') color = '0, 102, 255';
      else if (config.accent === 'teal') color = '20, 184, 166';
      else if (config.accent === 'purple') color = '139, 92, 246';
    }

    context.fillStyle = `rgba(${color}, ${this.alpha})`;
    if (glow) {
      context.shadowBlur = this.radius * 2.5;
      context.shadowColor = `rgba(${color}, ${this.alpha * 0.7})`;
    }
    context.fill();
    context.shadowBlur = 0;
  }
}

// Shooting Star class
class ShootingStar {
  constructor(w, h) {
    this.reset(w, h);
  }

  reset(w, h) {
    this.x = Math.random() * w;
    this.y = Math.random() * h * 0.4; // Top section
    this.length = Math.random() * 60 + 30;
    this.speed = Math.random() * 3 + 1.5;
    this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.05; // Diagonal streak
    this.alpha = 1;
    this.active = Math.random() < 0.005; // Sparsely active
  }

  update(w, h) {
    if (!this.active) {
      if (Math.random() < 0.0005) { // Chance to fire
        this.reset(w, h);
        this.active = true;
      }
      return;
    }

    this.x += Math.cos(this.angle) * this.speed;
    this.y += Math.sin(this.angle) * this.speed;
    this.alpha -= 0.02;

    if (this.alpha <= 0 || this.x > w || this.y > h) {
      this.active = false;
    }
  }

  draw(context) {
    if (!this.active) return;

    context.beginPath();
    const grad = context.createLinearGradient(
      this.x, this.y,
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    
    let color = '255, 255, 255';
    if (config.accent === 'cyan') color = '0, 212, 255';
    else if (config.accent === 'blue') color = '0, 102, 255';
    else if (config.accent === 'teal') color = '20, 184, 166';
    else if (config.accent === 'purple') color = '139, 92, 246';

    grad.addColorStop(0, `rgba(${color}, ${this.alpha})`);
    grad.addColorStop(1, `rgba(${color}, 0)`);

    context.strokeStyle = grad;
    context.lineWidth = 1.2;
    context.moveTo(this.x, this.y);
    context.lineTo(
      this.x - Math.cos(this.angle) * this.length,
      this.y - Math.sin(this.angle) * this.length
    );
    context.stroke();
  }
}

function setupSettingsBtn() {
  // Wait for Header render to bind settings button click
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('#theme-control-btn');
    if (btn) {
      openThemeSettingsModal();
    }
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
            { id: 'cyan', label: 'Neon Cyan', color: '#00d4ff' },
            { id: 'blue', label: 'Electric Blue', color: '#0066ff' },
            { id: 'teal', label: 'Emerald Teal', color: '#14b8a6' },
            { id: 'purple', label: 'Violet Purple', color: '#8b5cf6' }
          ].map(opt => {
            const active = config.accent === opt.id;
            return `
              <button class="btn accent-selector-btn" data-accent="${opt.id}" style="height:56px; border-radius:12px; border:2px solid ${active ? 'var(--color-text-white)' : 'rgba(255,255,255,0.06)'}; background: rgba(255,255,255,0.02); display:flex; flex-direction:column; align-items:center; justify-content:center; gap:6px; cursor:pointer;">
                <span style="width:16px; height:16px; border-radius:50%; background:${opt.color}; box-shadow:0 0 10px ${opt.color}80;"></span>
                <span style="font-size:10px; font-weight:700; color:${active ? 'var(--color-text-primary)' : 'var(--color-text-muted)'};">${opt.label}</span>
              </button>
            `;
          }).join('')}
        </div>
      </div>

      <!-- Live Background Toggle -->
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:12px;">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">Ambient Starry Sky</div>
          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">Render twinkling stars and diagonal shooting stars</div>
        </div>
        <label class="switch-container" style="position:relative; display:inline-block; width:44px; height:24px;">
          <input type="checkbox" id="toggle-live-bg" ${config.liveBg ? 'checked' : ''} style="opacity:0; width:0; height:0;" />
          <span class="switch-slider" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:rgba(255,255,255,0.1); border:1px solid var(--color-border); border-radius:24px; transition:0.3s;"></span>
        </label>
      </div>

      <!-- Glassmorphic toggle -->
      <div style="display:flex; justify-content:space-between; align-items:center; padding:12px 16px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:12px;">
        <div>
          <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">Glassmorphism Effects</div>
          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">Translucent backdrops with active blur styling</div>
        </div>
        <label class="switch-container" style="position:relative; display:inline-block; width:44px; height:24px;">
          <input type="checkbox" id="toggle-glass" ${config.glassEffect ? 'checked' : ''} style="opacity:0; width:0; height:0;" />
          <span class="switch-slider" style="position:absolute; cursor:pointer; top:0; left:0; right:0; bottom:0; background-color:rgba(255,255,255,0.1); border:1px solid var(--color-border); border-radius:24px; transition:0.3s;"></span>
        </label>
      </div>
    </div>

    <!-- Toggle styling overrides -->
    <style>
      .switch-container input:checked + .switch-slider {
        background-color: var(--color-primary) !important;
        box-shadow: 0 0 10px var(--color-primary);
      }
      .switch-slider:before {
        position: absolute;
        content: "";
        height: 16px;
        width: 16px;
        left: 3px;
        bottom: 3px;
        background-color: white;
        transition: 0.3s;
        border-radius: 50%;
      }
      .switch-container input:checked + .switch-slider:before {
        transform: translateX(20px);
      }
    </style>
  `;

  showModal('Customize Dashboard Theme', modalHtml, {
    showFooter: false,
    size: 'md'
  });

  // Attach event handlers inside modal
  setTimeout(() => {
    // 1. Accent selectors
    document.querySelectorAll('.accent-selector-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const accent = btn.dataset.accent;
        config.accent = accent;
        localStorage.setItem('theme_accent_color', accent);
        applyThemeSettings();
        
        // Highlight active button
        document.querySelectorAll('.accent-selector-btn').forEach(b => {
          b.style.borderColor = b.dataset.accent === accent ? 'var(--color-text-white)' : 'rgba(255,255,255,0.06)';
          b.querySelector('span:last-child').style.color = b.dataset.accent === accent ? 'var(--color-text-primary)' : 'var(--color-text-muted)';
        });
        showToast('success', 'Theme Accent Updated', `Switched accent theme to ${accent}.`);
      });
    });

    // 2. Live BG Toggle
    document.getElementById('toggle-live-bg')?.addEventListener('change', (e) => {
      const active = e.target.checked;
      config.liveBg = active;
      localStorage.setItem('theme_live_bg', active);
      applyThemeSettings();
      showToast('success', 'Background Updated', `Live ambient background is now ${active ? 'Enabled' : 'Disabled'}.`);
    });

    // 3. Glassmorphic Toggle
    document.getElementById('toggle-glass')?.addEventListener('change', (e) => {
      const active = e.target.checked;
      config.glassEffect = active;
      localStorage.setItem('theme_glass_effect', active);
      applyThemeSettings();
      showToast('success', 'Visual Style Updated', `Glassmorphism effects are now ${active ? 'Enabled' : 'Disabled'}.`);
    });
  }, 200);
}
