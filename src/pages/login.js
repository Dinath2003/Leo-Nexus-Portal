// ============================================
// LEO NEXUS PORTAL — LOGIN PAGE
// Full-screen ocean theme with particle animation
// ============================================

import { auth } from '../auth.js';
import { router } from '../router.js';

export function renderLogin() {
  const app = document.getElementById('app');
  app.innerHTML = `
    <div class="login-layout">
      <div class="login-bg">
        <div class="ocean-gradient"></div>
        <canvas id="particle-canvas"></canvas>
        <div class="bubble bubble-1"></div>
        <div class="bubble bubble-2"></div>
        <div class="bubble bubble-3"></div>
        <div class="bubble bubble-4"></div>
        <div class="bubble bubble-5"></div>
        <div class="bubble bubble-6"></div>
        <div class="bubble bubble-7"></div>
        <div class="bubble bubble-8"></div>
      </div>
      <div class="login-content">
        <div class="login-card">
          <div class="login-branding">
            <div class="login-logo">
              <i data-lucide="anchor"></i>
            </div>
            <div class="login-subtitle">Welcome to</div>
            <h1>Leo Nexus<br/>Portal</h1>
            <p class="login-desc">District & Club Management System</p>
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
                <input type="email" class="form-input" id="login-email" placeholder="Enter your email" required value="district@leo.org" style="padding-left:44px" />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label" for="login-password">Password</label>
              <div style="position:relative">
                <i data-lucide="lock" class="input-icon"></i>
                <input type="password" class="form-input" id="login-password" placeholder="Enter your password" required value="district123" style="padding-left:44px" />
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
                <option value="admin@leo.org|admin123" style="background:var(--color-bg);">Super Admin (Admin)</option>
              </optgroup>
              <optgroup label="District Officers" style="background:var(--color-bg);">
                <option value="president.dist@leo.org|president123" style="background:var(--color-bg);">District President</option>
                <option value="vp.dist@leo.org|vp123" style="background:var(--color-bg);">District VP</option>
                <option value="secretary.dist@leo.org|secretary123" style="background:var(--color-bg);">District Secretary</option>
                <option value="membership.dist@leo.org|membership123" style="background:var(--color-bg);">District Membership Chair</option>
              </optgroup>
              <optgroup label="Club Officers (Sapphire)" style="background:var(--color-bg);">
                <option value="president.club@leo.org|president123" style="background:var(--color-bg);">Club President (Kasun)</option>
                <option value="secretary.club@leo.org|secretary123" style="background:var(--color-bg);">Club Secretary (Sanduni)</option>
                <option value="treasurer.club@leo.org|treasurer123" style="background:var(--color-bg);">Club Treasurer (Dinesh)</option>
                <option value="membership.club@leo.org|membership123" style="background:var(--color-bg);">Club Membership Chair (Ishara)</option>
              </optgroup>
              <optgroup label="Club Member" style="background:var(--color-bg);">
                <option value="member.club@leo.org|member123" style="background:var(--color-bg);">Club Member (Tharushi)</option>
              </optgroup>
            </select>
          </div>
        </div>
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // Role toggle
  const roleDistrict = document.getElementById('role-district');
  const roleClub = document.getElementById('role-club');
  const emailInput = document.getElementById('login-email');
  const passInput = document.getElementById('login-password');
  const demoSelect = document.getElementById('demo-account-select');

  roleDistrict.addEventListener('click', () => {
    roleDistrict.classList.add('active');
    roleClub.classList.remove('active');
    emailInput.value = 'district@leo.org';
    passInput.value = 'district123';
    if (demoSelect) demoSelect.value = '';
  });

  roleClub.addEventListener('click', () => {
    roleClub.classList.add('active');
    roleDistrict.classList.remove('active');
    emailInput.value = 'club@leo.org';
    passInput.value = 'club123';
    if (demoSelect) demoSelect.value = '';
  });

  demoSelect?.addEventListener('change', (e) => {
    const val = e.target.value;
    if (val) {
      const [email, password] = val.split('|');
      emailInput.value = email;
      passInput.value = password;
      
      if (email.startsWith('president.dist') || email.startsWith('vp.dist') || email.startsWith('secretary.dist') || email.startsWith('membership.dist') || email.startsWith('admin')) {
        roleDistrict.classList.add('active');
        roleClub.classList.remove('active');
      } else {
        roleClub.classList.add('active');
        roleDistrict.classList.remove('active');
      }
    }
  });

  // Form submission
  const form = document.getElementById('login-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = emailInput.value.trim();
    const password = passInput.value;

    const result = auth.login(email, password);
    if (result.success) {
      let target = '/club/dashboard';
      if (auth.isDistrictUser) {
        target = '/district/dashboard';
      } else if (auth.isClubMember) {
        target = '/member/dashboard';
      }
      router.navigate(target);
    } else {
      const errorEl = document.getElementById('login-error');
      errorEl.textContent = result.error;
      errorEl.classList.add('show');
      setTimeout(() => errorEl.classList.remove('show'), 3000);
    }
  });

  // Particle animation
  initParticles();
}

function initParticles() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let animationId;
  const particles = [];
  const particleCount = 60;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.5 + 0.1;
      this.hue = Math.random() * 40 + 200; // Blue range
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 100%, 70%, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 150, 255, ${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
