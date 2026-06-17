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
                <option value="treasurer.dist@leo.org|treasurer123" style="background:var(--color-bg);">District Treasurer</option>
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
      
      if (email.startsWith('president.dist') || email.startsWith('vp.dist') || email.startsWith('secretary.dist') || email.startsWith('membership.dist') || email.startsWith('treasurer.dist') || email.startsWith('admin')) {
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
  const stars = [];
  const starCount = 100;
  const shootingStars = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.addEventListener('resize', resize);

  class Star {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.radius = Math.random() * 1.2 + 0.3;
      this.alpha = Math.random() * 0.8 + 0.2;
      this.twinkleSpeed = Math.random() * 0.015 + 0.005;
      this.direction = Math.random() > 0.5 ? 1 : -1;
      
      const colors = ['255, 255, 255', '224, 242, 254', '238, 242, 255'];
      this.baseColor = colors[Math.floor(Math.random() * colors.length)];
      
      this.speedX = (Math.random() - 0.5) * 0.02;
      this.speedY = (Math.random() - 0.5) * 0.02;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0) this.x = canvas.width;
      if (this.x > canvas.width) this.x = 0;
      if (this.y < 0) this.y = canvas.height;
      if (this.y > canvas.height) this.y = 0;

      this.alpha += this.twinkleSpeed * this.direction;
      if (this.alpha >= 1) {
        this.alpha = 1;
        this.direction = -1;
      } else if (this.alpha <= 0.15) {
        this.alpha = 0.15;
        this.direction = 1;
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.baseColor}, ${this.alpha})`;
      ctx.fill();
    }
  }

  class ShootingStar {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height * 0.4;
      this.length = Math.random() * 50 + 25;
      this.speed = Math.random() * 2.5 + 1.2;
      this.angle = (Math.PI / 4) + (Math.random() - 0.5) * 0.05;
      this.alpha = 1;
      this.active = Math.random() < 0.005;
    }

    update() {
      if (!this.active) {
        if (Math.random() < 0.0005) {
          this.reset();
          this.active = true;
        }
        return;
      }

      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed;
      this.alpha -= 0.02;

      if (this.alpha <= 0 || this.x > canvas.width || this.y > canvas.height) {
        this.active = false;
      }
    }

    draw() {
      if (!this.active) return;

      ctx.beginPath();
      const grad = ctx.createLinearGradient(
        this.x, this.y,
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      
      grad.addColorStop(0, `rgba(0, 212, 255, ${this.alpha})`);
      grad.addColorStop(1, `rgba(0, 212, 255, 0)`);

      ctx.strokeStyle = grad;
      ctx.lineWidth = 1.0;
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(
        this.x - Math.cos(this.angle) * this.length,
        this.y - Math.sin(this.angle) * this.length
      );
      ctx.stroke();
    }
  }

  for (let i = 0; i < starCount; i++) {
    stars.push(new Star());
  }
  for (let i = 0; i < 2; i++) {
    shootingStars.push(new ShootingStar());
  }

  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
      s.update();
      s.draw();
    });

    shootingStars.forEach(ss => {
      ss.update();
      ss.draw();
    });

    animationId = requestAnimationFrame(animate);
  }

  animate();

  // Return cleanup function
  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
}
