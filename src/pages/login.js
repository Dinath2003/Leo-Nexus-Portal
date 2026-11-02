// ============================================
// LEO NEXUS PORTAL — LANDING & LOGIN PAGE
// Modern SaaS / LeBank Inspired Design
// ============================================

import { auth } from '../auth.js';
import { router } from '../router.js';

export function renderLogin() {
  const app = document.getElementById('app');

  app.innerHTML = `
    <div class="login-layout">

      <!-- Top Navigation Bar (LeBank Header) -->
      <header class="landing-nav">
        <a href="#/login" class="landing-nav-brand">
          <div class="landing-nav-logo">
            <i data-lucide="anchor"></i>
          </div>
          <span class="landing-nav-title">Leo Nexus</span>
        </a>

        <nav class="landing-nav-menu">
          <a class="landing-nav-link" href="#features-section">Features</a>
          <a class="landing-nav-link" href="#products-section">Solutions</a>
          <a class="landing-nav-link" href="#highlights-section">Leadership</a>
          <a class="landing-nav-link" href="#testimonials-section">Testimonials</a>
        </nav>

        <div style="display:flex; align-items:center; gap:12px;">
          <button class="btn btn-dark btn-sm" id="nav-signin-btn">
            Sign In
          </button>
        </div>
      </header>

      <!-- Hero Section (Split Layout) -->
      <section class="landing-hero">
        <div class="hero-left">
          <div class="section-badge">
            <i data-lucide="sparkles" style="width:13px;height:13px"></i> Next-Gen District Portal
          </div>

          <h1 class="hero-headline">
            Smarter Management<br />
            <span>in Your Hands</span>
          </h1>

          <p class="hero-subtitle">
            Leadership isn't just administrative duties. It's the power to build a brighter future, support our communities, and create lasting impact across Leo District 306.
          </p>

          <!-- Interactive Login Card -->
          <div class="hero-login-card" id="login-card-container">
            <div class="hero-role-toggle">
              <button type="button" class="active" data-role="district" id="role-district">
                <i data-lucide="shield" style="width:13px;height:13px;margin-right:4px;vertical-align:-2px"></i>
                District Officer
              </button>
              <button type="button" data-role="club" id="role-club">
                <i data-lucide="building-2" style="width:13px;height:13px;margin-right:4px;vertical-align:-2px"></i>
                Club Executive
              </button>
              <button type="button" data-role="member" id="role-member">
                <i data-lucide="user" style="width:13px;height:13px;margin-right:4px;vertical-align:-2px"></i>
                Club Member
              </button>
            </div>

            <form id="login-form">
              <div class="form-group" style="margin-bottom:14px;">
                <label class="form-label" for="login-email">Email Address</label>
                <div style="position:relative">
                  <i data-lucide="mail" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:var(--color-text-muted); pointer-events:none;"></i>
                  <input type="email" class="form-input" id="login-email" placeholder="name@leo.org" required value="admin@leo.org" style="padding-left:42px;" />
                </div>
              </div>

              <div class="form-group" style="margin-bottom:16px;">
                <label class="form-label" for="login-password">Password</label>
                <div style="position:relative">
                  <i data-lucide="lock" style="position:absolute; left:14px; top:50%; transform:translateY(-50%); width:16px; height:16px; color:var(--color-text-muted); pointer-events:none;"></i>
                  <input type="password" class="form-input" id="login-password" placeholder="Enter password" required value="admin123" style="padding-left:42px;" />
                </div>
              </div>

              <div class="login-error" id="login-error" style="margin-bottom:14px;"></div>

              <div style="display:flex; gap:10px; align-items:center;">
                <button type="submit" class="btn btn-primary" style="flex:1; justify-content:center; padding:12px 24px;">
                  Sign In to Portal <i data-lucide="arrow-right" style="width:16px;height:16px;"></i>
                </button>
              </div>

              <!-- Fast 1-Click Demo Credentials -->
              <div class="hero-credentials-hint">
                <span>Quick demo:</span>
                <span class="hero-credential-pill" data-email="admin@leo.org" data-pass="admin123" data-role="district">District Gov</span>
                <span class="hero-credential-pill" data-email="president@colombo.leo.org" data-pass="colombo123" data-role="club">Club Pres</span>
                <span class="hero-credential-pill" data-email="member@colombo.leo.org" data-pass="member123" data-role="member">Member</span>
              </div>
            </form>
          </div>

          <!-- Social Proof & Counters -->
          <div class="hero-metrics">
            <div class="hero-metric-item">
              <h4>100+</h4>
              <p>Active Leo Clubs</p>
            </div>
            <div class="hero-metric-item">
              <h4>3,500+</h4>
              <p>Empowered Youth Leaders</p>
            </div>
            <div class="hero-metric-item">
              <h4>Rs. 14M+</h4>
              <p>Community Impact</p>
            </div>
          </div>
        </div>

        <!-- Hero Right (LeBank 3D Token & Graphical Showcase) -->
        <div class="hero-right">
          <div class="showcase-card-main">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
              <span class="section-badge" style="background:rgba(255,255,255,0.2); color:white; border-color:rgba(255,255,255,0.3);">
                MD 306 CERTIFIED
              </span>
              <div class="showcase-badge-circle">
                <i data-lucide="arrow-up-right" style="width:20px;height:20px"></i>
              </div>
            </div>

            <div class="showcase-center-figure">
              <div class="showcase-giant-stat">100%</div>
              <div class="showcase-giant-label">Youth Leadership & Service</div>
            </div>

            <div class="showcase-bottom-bar">
              <div>
                <div style="font-size:11px; opacity:0.8; text-transform:uppercase; letter-spacing:0.05em;">District Operations</div>
                <div style="font-size:15px; font-weight:700;">Real-Time Sync Active</div>
              </div>
              <div style="width:10px; height:10px; border-radius:50%; background:#22c55e; box-shadow:0 0 10px #22c55e;"></div>
            </div>
          </div>

          <!-- Floating Stat Card Overlay -->
          <div class="showcase-floating-stat">
            <div class="floating-icon">
              <i data-lucide="trending-up" style="width:22px;height:22px"></i>
            </div>
            <div>
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Community Growth</div>
              <div style="font-size:1.1rem; font-weight:800; color:var(--color-text-primary);">+24.6% This Term</div>
            </div>
          </div>
        </div>
      </section>

      <!-- Trusted By District Strip -->
      <section class="landing-partners">
        <div class="partners-label">
          Trusted by Leo Multiple District 306 Sri Lanka
        </div>
        <div class="partners-grid">
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 A1</span>
          </div>
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 A2</span>
          </div>
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 B1</span>
          </div>
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 B2</span>
          </div>
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 C1</span>
          </div>
          <div class="partner-logo-item">
            <i data-lucide="shield-check" style="width:18px;height:18px;color:var(--color-primary)"></i>
            <span>DISTRICT 306 C2</span>
          </div>
        </div>
      </section>

      <!-- 3-Column Product Showcase ("Management Built for What's Next") -->
      <section class="landing-features-showcase" id="products-section">
        <div class="features-header-row">
          <div class="features-header-left">
            <div class="section-badge">OUR MODULES</div>
            <h2>Management built for what's next</h2>
            <p style="color:var(--color-text-secondary); max-width:540px; margin-top:6px;">
              Powerful tools to help you govern, track, and serve — all in one place. Simple, transparent, and designed for Leos.
            </p>
          </div>
          <div class="features-header-right">
            <button class="btn-nav-circle" aria-label="Previous"><i data-lucide="arrow-left" style="width:18px;height:18px"></i></button>
            <button class="btn-nav-circle active" aria-label="Next"><i data-lucide="arrow-right" style="width:18px;height:18px"></i></button>
          </div>
        </div>

        <div class="features-cards-grid">
          <!-- Card 1: Smart Finance -->
          <div class="feature-product-card">
            <div>
              <div class="feature-card-top">
                <div class="feature-squircle-icon">
                  <i data-lucide="wallet" style="width:24px;height:24px"></i>
                </div>
                <div class="btn-nav-circle" style="width:36px;height:36px;"><i data-lucide="arrow-up-right" style="width:16px;height:16px"></i></div>
              </div>
              <h3>Smart Treasury & Finance</h3>
              <p>Keep track of club income, expenditures, and dues with complete clarity and automated balance sheets.</p>
            </div>
            <div class="feature-card-mockup">
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Treasury Balance</div>
              <div style="font-size:1.5rem; font-weight:800; color:var(--color-text-primary); margin:4px 0 8px;">Rs. 428,500</div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--color-success-text); font-weight:700;">
                <span>+14.2% Inflow</span>
                <span>Audited & Verified</span>
              </div>
            </div>
          </div>

          <!-- Card 2: Performance Points -->
          <div class="feature-product-card">
            <div>
              <div class="feature-card-top">
                <div class="feature-squircle-icon">
                  <i data-lucide="trophy" style="width:24px;height:24px"></i>
                </div>
                <div class="btn-nav-circle" style="width:36px;height:36px;"><i data-lucide="arrow-up-right" style="width:16px;height:16px"></i></div>
              </div>
              <h3>Performance & Points</h3>
              <p>Submit monthly reports, track criteria achievements, and monitor your club's position on the district leaderboard.</p>
            </div>
            <div class="feature-card-mockup">
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">District Rank #1</div>
              <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary); margin:4px 0 8px;">1,450 Points</div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--color-text-secondary); font-weight:600;">
                <span>94% Criteria Met</span>
                <span>Term 2026/2027</span>
              </div>
            </div>
          </div>

          <!-- Card 3: Events & Projects -->
          <div class="feature-product-card">
            <div>
              <div class="feature-card-top">
                <div class="feature-squircle-icon">
                  <i data-lucide="calendar-days" style="width:24px;height:24px"></i>
                </div>
                <div class="btn-nav-circle" style="width:36px;height:36px;"><i data-lucide="arrow-up-right" style="width:16px;height:16px"></i></div>
              </div>
              <h3>Events & Community Impact</h3>
              <p>Coordinate regional conferences, manage delegate registrations, and document community project outcomes.</p>
            </div>
            <div class="feature-card-mockup">
              <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Delegates Registered</div>
              <div style="font-size:1.5rem; font-weight:800; color:var(--color-text-primary); margin:4px 0 8px;">2,840 Leos</div>
              <div style="display:flex; justify-content:space-between; font-size:11px; color:var(--color-text-muted); font-weight:600;">
                <span>Annual Conference</span>
                <span>June 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Signature Dark Feature Section (LeBank Midnight Container) -->
      <section class="landing-dark-section" id="features-section">
        <div class="dark-section-inner">
          <div class="dark-section-left">
            <span class="section-badge" style="background:rgba(37,99,235,0.25); color:#60a5fa; border-color:rgba(37,99,235,0.4);">
              DISTRICT INTEGRITY
            </span>
            <h2>Your service,<br/>made more meaningful</h2>
            <p>
              Leo Nexus equips leaders with real-time tracking, seamless record-keeping, and full transparency to maximize community reach with minimal overhead.
            </p>

            <div class="dark-checklist">
              <div class="dark-checklist-item">
                <div class="dark-checklist-icon">
                  <i data-lucide="shield" style="width:20px;height:20px"></i>
                </div>
                <div class="dark-checklist-content">
                  <h4>Role-Protected &amp; Secure</h4>
                  <p>Fine-grained access control tailored for District Governors, Club Presidents, Treasurers, and Members.</p>
                </div>
              </div>

              <div class="dark-checklist-item">
                <div class="dark-checklist-icon">
                  <i data-lucide="bar-chart-2" style="width:20px;height:20px"></i>
                </div>
                <div class="dark-checklist-content">
                  <h4>Live District Insights</h4>
                  <p>Instant visualization of projects across all zones and regions with zero delayed paperwork.</p>
                </div>
              </div>

              <div class="dark-checklist-item">
                <div class="dark-checklist-icon">
                  <i data-lucide="target" style="width:20px;height:20px"></i>
                </div>
                <div class="dark-checklist-content">
                  <h4>Built for Youth Excellence</h4>
                  <p>Automated criteria reminders and goal progression tracking designed for leadership development.</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right side dark mockup frame -->
          <div class="dark-section-right">
            <div class="dark-mockup-frame">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px;">
                <span style="font-size:12px; font-weight:700; color:white;">District Command</span>
                <span class="badge badge-success" style="font-size:10px;">LIVE</span>
              </div>
              <div style="background:rgba(255,255,255,0.06); border-radius:14px; padding:16px; margin-bottom:12px;">
                <div style="font-size:11px; color:#94a3b8; text-transform:uppercase;">Total Projects</div>
                <div style="font-size:1.6rem; font-weight:800; color:white; margin:2px 0;">42 Active</div>
                <div style="font-size:12px; color:#38bdf8;">18 Zones Participating</div>
              </div>
              <div style="background:rgba(255,255,255,0.06); border-radius:14px; padding:16px;">
                <div style="font-size:11px; color:#94a3b8; text-transform:uppercase;">Community Reach</div>
                <div style="font-size:1.6rem; font-weight:800; color:white; margin:2px 0;">32,500+</div>
                <div style="font-size:12px; color:#4ade80;">Beneficiaries Impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Testimonials / Loved by Leo Leaders -->
      <section class="landing-features-showcase" id="testimonials-section" style="padding-top:0;">
        <div class="features-header-row">
          <div>
            <div class="section-badge">TESTIMONIALS</div>
            <h2>Loved by hundreds of Leo leaders</h2>
          </div>
        </div>

        <div class="features-cards-grid">
          <div class="card" style="padding:28px;">
            <i data-lucide="quote" style="width:28px;height:28px;color:var(--color-primary);margin-bottom:12px;"></i>
            <p style="font-size:var(--text-sm); line-height:1.7; margin-bottom:20px;">
              "Leo Nexus has transformed how our district monitors club performance. Submissions that used to take weeks of emails now resolve in minutes."
            </p>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="avatar" style="background:#2563eb;">DG</div>
              <div>
                <div style="font-weight:700; font-size:14px;">District Governor</div>
                <div style="font-size:11px; color:var(--color-text-muted);">Leo District 306</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding:28px;">
            <i data-lucide="quote" style="width:28px;height:28px;color:var(--color-primary);margin-bottom:12px;"></i>
            <p style="font-size:var(--text-sm); line-height:1.7; margin-bottom:20px;">
              "The treasury management tool makes our club financial audits completely painless. Transparency between our board and members is at an all-time high."
            </p>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="avatar" style="background:#0d9488;">CP</div>
              <div>
                <div style="font-weight:700; font-size:14px;">Club President</div>
                <div style="font-size:11px; color:var(--color-text-muted);">Leo Club of Colombo</div>
              </div>
            </div>
          </div>

          <div class="card" style="padding:28px;">
            <i data-lucide="quote" style="width:28px;height:28px;color:var(--color-primary);margin-bottom:12px;"></i>
            <p style="font-size:var(--text-sm); line-height:1.7; margin-bottom:20px;">
              "As a club member, seeing my event registrations, points contributions, and upcoming projects in one clean dashboard motivates me to serve more."
            </p>
            <div style="display:flex; align-items:center; gap:12px;">
              <div class="avatar" style="background:#7c3aed;">LM</div>
              <div>
                <div style="font-weight:700; font-size:14px;">Leo Member</div>
                <div style="font-size:11px; color:var(--color-text-muted);">Leo Club of Millennium</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Bottom Modern Footer -->
      <footer class="landing-footer">
        <div class="footer-container">
          <div class="footer-brand-col">
            <div class="landing-nav-brand">
              <div class="landing-nav-logo">
                <i data-lucide="anchor"></i>
              </div>
              <span class="landing-nav-title">Leo Nexus Portal</span>
            </div>
            <p>
              The premier centralized management portal for Leo District 306, supporting youth leadership and impactful community service.
            </p>
          </div>

          <div class="footer-col">
            <h5>Portals</h5>
            <ul class="footer-links">
              <li><a href="#/login" class="login-role-shortcut" data-role="district">District Administration</a></li>
              <li><a href="#/login" class="login-role-shortcut" data-role="club">Club Executive Portal</a></li>
              <li><a href="#/login" class="login-role-shortcut" data-role="member">Member Gateway</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>Resources</h5>
            <ul class="footer-links">
              <li><a href="#/calendar">District Calendar</a></li>
              <li><a href="#/district/reports">Performance Reports</a></li>
              <li><a href="#/district/points">Points Criteria Guidelines</a></li>
            </ul>
          </div>

          <div class="footer-col">
            <h5>District 306</h5>
            <ul class="footer-links">
              <li><a href="#/district/profile">District Leadership</a></li>
              <li><a href="#/district/md-profile">Multiple District 306</a></li>
              <li><a href="#/district/clubs">Club Directory</a></li>
            </ul>
          </div>
        </div>

        <div class="footer-bottom-bar">
          <div>&copy; 2026 Leo Nexus Portal — Leo Multiple District 306 Sri Lanka. All rights reserved.</div>
          <div style="display:flex; gap:16px;">
            <a href="#/login" style="color:var(--color-text-muted);">Terms of Service</a>
            <a href="#/login" style="color:var(--color-text-muted);">Privacy Policy</a>
            <a href="#/login" style="color:var(--color-text-muted);">Security Guidelines</a>
          </div>
        </div>
      </footer>

    </div>
  `;

  if (window.lucide) lucide.createIcons();

  // ── Role toggle logic & demo logins ────────────────────────────────────────
  const roleDistrict = document.getElementById('role-district');
  const roleClub     = document.getElementById('role-club');
  const roleMember   = document.getElementById('role-member');
  const emailInput   = document.getElementById('login-email');
  const passInput    = document.getElementById('login-password');

  function setRole(role) {
    [roleDistrict, roleClub, roleMember].forEach(b => b?.classList.remove('active'));
    if (role === 'district') {
      roleDistrict?.classList.add('active');
      emailInput.value = 'admin@leo.org';
      passInput.value  = 'admin123';
    } else if (role === 'club') {
      roleClub?.classList.add('active');
      emailInput.value = 'president@colombo.leo.org';
      passInput.value  = 'colombo123';
    } else if (role === 'member') {
      roleMember?.classList.add('active');
      emailInput.value = 'member@colombo.leo.org';
      passInput.value  = 'member123';
    }
  }

  roleDistrict?.addEventListener('click', () => setRole('district'));
  roleClub?.addEventListener('click', () => setRole('club'));
  roleMember?.addEventListener('click', () => setRole('member'));

  // Quick 1-click credential pills
  document.querySelectorAll('.hero-credential-pill').forEach(pill => {
    pill.addEventListener('click', () => {
      const email = pill.getAttribute('data-email');
      const pass  = pill.getAttribute('data-pass');
      const role  = pill.getAttribute('data-role');
      if (email && pass) {
        emailInput.value = email;
        passInput.value  = pass;
        setRole(role);
      }
    });
  });

  // Nav sign-in button smooth scroll to form
  document.getElementById('nav-signin-btn')?.addEventListener('click', () => {
    document.getElementById('login-card-container')?.scrollIntoView({ behavior: 'smooth' });
    emailInput?.focus();
  });

  // Footer role shortcuts
  document.querySelectorAll('.login-role-shortcut').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const role = link.getAttribute('data-role');
      setRole(role);
      document.getElementById('login-card-container')?.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ── Form submission ────────────────────────────────────────────────────────
  const form = document.getElementById('login-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const email    = emailInput.value.trim();
    const password = passInput.value;
    const result   = auth.login(email, password);

    if (result.success) {
      let target = '/club/dashboard';
      if (auth.isDistrictUser)   target = '/district/dashboard';
      else if (auth.isClubMember) target = '/member/dashboard';
      router.navigate(target);
    } else {
      const errorEl = document.getElementById('login-error');
      if (errorEl) {
        errorEl.textContent = result.error;
        errorEl.classList.add('show');
        setTimeout(() => errorEl.classList.remove('show'), 3500);
      }
    }
  });

  return () => {};
}
