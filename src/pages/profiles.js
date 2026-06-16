// ============================================
// LEO NEXUS PORTAL — DISTRICT & MULTIPLE DISTRICT PROFILES
// ============================================

import { auth } from '../auth.js';
import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderHeader, initHeader } from '../components/header.js';

export function renderDistrictProfile() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('District Profile', ['Info', 'District'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Page Header -->
          <div class="page-header stagger-enter">
            <div>
              <h1>Leo District 306 B2</h1>
              <p style="color:var(--color-text-muted);margin-top:4px;">Official portal coordinates and leadership cabinet for the Leoistic Year 2026/2027</p>
            </div>
          </div>

          <!-- District Banner -->
          <div class="card stagger-enter hover-lift water-effect" style="background: linear-gradient(135deg, rgba(7,14,47,0.8) 0%, rgba(0,102,255,0.15) 100%); border:1px solid var(--color-border); padding: 32px; display:flex; flex-wrap:wrap; align-items:center; gap:24px; position:relative; overflow:hidden;">
            <div style="position:absolute; top:0; right:0; width:300px; height:100%; background:radial-gradient(circle at center, var(--color-cyan-alpha), transparent); opacity:0.2; pointer-events:none;"></div>
            <div style="width:96px; height:96px; border-radius:24px; background:rgba(0,102,255,0.1); border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center;">
              <i data-lucide="globe" style="width:48px; height:48px; color:var(--color-primary);"></i>
            </div>
            <div style="flex:1; min-width:260px;">
              <h2 style="margin:0; font-size:22px; font-weight:800;">"Serve with Passion, Lead with Integrity"</h2>
              <p style="margin:8px 0 0; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                Leo District 306 B2 Sri Lanka spans over a wide network of active Leo clubs in Colombo, Gampaha, and the North-Western province. We guide and empower young leaders to execute sustainable service projects that make a difference.
              </p>
            </div>
          </div>

          <div class="grid-2 stagger-enter" style="animation-delay:0.1s; margin-top:24px;">
            <!-- District Cabinet -->
            <div class="card hover-lift">
              <div class="card-header"><h3 class="card-title"><i data-lucide="award" style="color:var(--color-primary)"></i> Cabinet Directory</h3></div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:var(--color-primary-alpha); color:var(--color-primary); display:flex; align-items:center; justify-content:center; font-weight:700;">DG</div>
                  <div>
                    <div style="font-size:11px; color:var(--color-text-muted);">District Governor (Lions Club)</div>
                    <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">Lion Samantha Perera PMJF</div>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:var(--color-cyan-alpha); color:var(--color-cyan); display:flex; align-items:center; justify-content:center; font-weight:700;">DP</div>
                  <div>
                    <div style="font-size:11px; color:var(--color-text-muted);">Leo District President</div>
                    <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">Leo Rahul De Silva</div>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:rgba(245,158,11,0.1); color:#f59e0b; display:flex; align-items:center; justify-content:center; font-weight:700;">DS</div>
                  <div>
                    <div style="font-size:11px; color:var(--color-text-muted);">Leo District Secretary</div>
                    <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">Leo Mithila Gunawardena</div>
                  </div>
                </div>
                <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                  <div style="width:36px; height:36px; border-radius:50%; background:rgba(20,184,166,0.1); color:#14b8a6; display:flex; align-items:center; justify-content:center; font-weight:700;">DT</div>
                  <div>
                    <div style="font-size:11px; color:var(--color-text-muted);">Leo District Treasurer</div>
                    <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">Leo Shehan Kuruppu</div>
                  </div>
                </div>
              </div>
            </div>

            <!-- District Goals -->
            <div class="card hover-lift">
              <div class="card-header"><h3 class="card-title"><i data-lucide="target" style="color:#f59e0b"></i> Core Strategic Goals</h3></div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                <div>
                  <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">1. Membership Growth & Retention</div>
                  <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Targeting 15% net membership growth and introducing leadership training modules to reduce drop-out rates.</p>
                </div>
                <div>
                  <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">2. Environmental Stewardship</div>
                  <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Planting 5,000 trees district-wide and organizing coordinated beach cleanups in coastal areas.</p>
                </div>
                <div>
                  <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">3. Joint Service Collaborations</div>
                  <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-secondary); line-height:1.5;">Encouraging clubs to partner on large-scale medical camps, computer literacy workshops, and library donation projects.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  initSidebar();
  initHeader();
}

export function renderMDProfile() {
  const app = document.getElementById('app');
  
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Multiple District Profile', ['Info', 'MD Profile'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Page Header -->
          <div class="page-header stagger-enter">
            <div>
              <h1>Leo Multiple District 306</h1>
              <p style="color:var(--color-text-muted);margin-top:4px;">National administrative structure and Multiple District Council coordinates</p>
            </div>
          </div>

          <!-- MD Map / Info Grid -->
          <div class="grid-2 stagger-enter">
            <div class="card hover-lift">
              <div class="card-header"><h3 class="card-title"><i data-lucide="shield" style="color:var(--color-primary)"></i> National Council Structure</h3></div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6; margin:0;">
                  Leo Multiple District 306 Sri Lanka unites six individual sub-districts under one unified council. It is led by the Multiple District Council Chairperson and coordinates nationwide community campaigns.
                </p>
                
                <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                    <span>Council Chairperson</span>
                    <strong style="color:var(--color-text-primary);">Leo Senath Jayawickrama</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                    <span>Sponsoring Lion Chairperson</span>
                    <strong style="color:var(--color-text-primary);">Lion Dr. Lasantha Goonewardene</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                    <span>Active Districts</span>
                    <strong style="color:var(--color-primary);">6 Districts (A1, A2, B1, B2, C1, C2)</strong>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:13px;">
                    <span>Total Members Nationwide</span>
                    <strong style="color:#14b8a6;">8,500+ Leos</strong>
                  </div>
                </div>
              </div>
            </div>

            <div class="card hover-lift">
              <div class="card-header"><h3 class="card-title"><i data-lucide="help-circle" style="color:var(--color-cyan)"></i> Frequently Contacted Coordinates</h3></div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                <div>
                  <strong>Multiple District Secretariat:</strong>
                  <div style="margin-top:4px;">Lions Activity Center, No 41, Albert Crescent, Colombo 07.</div>
                </div>
                <div>
                  <strong>Official Channels:</strong>
                  <div style="margin-top:4px;">Email: md306@leosrilanka.org</div>
                  <div>Web: www.leosrilanka.org</div>
                </div>
                <div>
                  <strong>Annual Publications:</strong>
                  <div style="margin-top:4px;">"The Sri Lankan Leo" Magazine — published quarterly celebrating club service achievements nationwide.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  initSidebar();
  initHeader();
}
