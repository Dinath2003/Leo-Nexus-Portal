// ============================================
// LEO NEXUS PORTAL — DISTRICT & MULTIPLE DISTRICT PROFILES
// ============================================

import { auth } from '../auth.js';
import { store } from '../store.js';
import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderHeader, initHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { showModal } from '../components/modal.js';

export function renderDistrictProfile() {
  const app = document.getElementById('app');
  
  function render() {
    const profile = store.getDistrictProfile();
    const isAdmin = auth.isAdmin;

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
                <h1>${profile.title || 'District Profile'}</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Official portal coordinates and leadership cabinet for the Leoistic Year 2026/2027</p>
              </div>
              ${isAdmin ? `
                <div class="page-header-actions">
                  <button class="btn btn-primary edit-profile-btn" id="edit-district-btn">
                    <i data-lucide="pencil" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i> Edit Profile
                  </button>
                </div>
              ` : ''}
            </div>

            <!-- District Banner -->
            <div class="card stagger-enter hover-lift water-effect" style="background: linear-gradient(135deg, rgba(7,14,47,0.8) 0%, rgba(0,102,255,0.15) 100%); border:1px solid var(--color-border); padding: 32px; display:flex; flex-wrap:wrap; align-items:center; gap:24px; position:relative; overflow:hidden;">
              <div style="position:absolute; top:0; right:0; width:300px; height:100%; background:radial-gradient(circle at center, var(--color-cyan-alpha), transparent); opacity:0.2; pointer-events:none;"></div>
              <div style="width:96px; height:96px; border-radius:24px; background:rgba(0,102,255,0.1); border:2px solid var(--color-primary); display:flex; align-items:center; justify-content:center;">
                <i data-lucide="globe" style="width:48px; height:48px; color:var(--color-primary);"></i>
              </div>
              <div style="flex:1; min-width:260px;">
                <h2 style="margin:0; font-size:22px; font-weight:800;">"${profile.tagline || ''}"</h2>
                <p style="margin:8px 0 0; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                  ${profile.description || ''}
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
                      <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${profile.dg || 'Not Appointed'}</div>
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:var(--color-cyan-alpha); color:var(--color-cyan); display:flex; align-items:center; justify-content:center; font-weight:700;">DP</div>
                    <div>
                      <div style="font-size:11px; color:var(--color-text-muted);">Leo District President</div>
                      <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${profile.dp || 'Not Appointed'}</div>
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:rgba(139,92,246,0.1); color:#8b5cf6; display:flex; align-items:center; justify-content:center; font-weight:700;">VP</div>
                    <div>
                      <div style="font-size:11px; color:var(--color-text-muted);">Leo District Vice President</div>
                      <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${profile.dvp || 'Not Appointed'}</div>
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:rgba(245,158,11,0.1); color:#f59e0b; display:flex; align-items:center; justify-content:center; font-weight:700;">DS</div>
                    <div>
                      <div style="font-size:11px; color:var(--color-text-muted);">Leo District Secretary</div>
                      <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${profile.ds || 'Not Appointed'}</div>
                    </div>
                  </div>
                  <div style="display:flex; align-items:center; gap:12px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:rgba(20,184,166,0.1); color:#14b8a6; display:flex; align-items:center; justify-content:center; font-weight:700;">DT</div>
                    <div>
                      <div style="font-size:11px; color:var(--color-text-muted);">Leo District Treasurer</div>
                      <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${profile.dt || 'Not Appointed'}</div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- District Goals -->
              <div class="card hover-lift">
                <div class="card-header"><h3 class="card-title"><i data-lucide="target" style="color:#f59e0b"></i> Core Strategic Goals</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                  ${(profile.goals || []).map((g) => `
                    <div>
                      <div style="font-size:13px; font-weight:600; color:var(--color-text-primary);">${g.title || ''}</div>
                      <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-secondary); line-height:1.5;">${g.desc || ''}</p>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- District Council Card -->
            <div class="card stagger-enter hover-lift" style="margin-top: 24px;">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="shield" style="color:var(--color-primary)"></i> District Council Structure</h3>
              </div>
              <div class="card-body" style="display:grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap:20px;">
                <div style="padding:12px; border: 1px solid var(--color-border); border-radius:10px; background:rgba(255,255,255,0.01);">
                  <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Immediate Past District President (IPDP)</div>
                  <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:4px;">${profile.council?.ipdp || 'Not Appointed'}</div>
                </div>
                <div style="padding:12px; border: 1px solid var(--color-border); border-radius:10px; background:rgba(255,255,255,0.01);">
                  <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">District Advisor</div>
                  <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:4px;">${profile.council?.advisor || 'Not Appointed'}</div>
                </div>
                <div style="padding:12px; border: 1px solid var(--color-border); border-radius:10px; background:rgba(255,255,255,0.01);">
                  <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">District Coordinators</div>
                  <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:4px;">${profile.council?.coordinators || 'None'}</div>
                </div>
                <div style="padding:12px; border: 1px solid var(--color-border); border-radius:10px; background:rgba(255,255,255,0.01);">
                  <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Region Chairpersons</div>
                  <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:4px;">${profile.council?.regions || 'None'}</div>
                </div>
                <div style="padding:12px; border: 1px solid var(--color-border); border-radius:10px; background:rgba(255,255,255,0.01);">
                  <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Zone Chairpersons</div>
                  <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:4px;">${profile.council?.zones || 'None'}</div>
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
    setupDistrictEventListeners(profile);
  }

  function setupDistrictEventListeners(profile) {
    document.getElementById('edit-district-btn')?.addEventListener('click', () => {
      const editFormHtml = `
        <form id="edit-district-form">
          <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">General Information</div>
          <div class="form-group">
            <label class="form-label">District Title *</label>
            <input type="text" class="form-input" id="edit-dist-title" value="${profile.title || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Tagline *</label>
            <input type="text" class="form-input" id="edit-dist-tagline" value="${profile.tagline || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-textarea" id="edit-dist-desc" rows="3" required>${profile.description || ''}</textarea>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">Cabinet Directory</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Governor (DG)</label>
              <input type="text" class="form-input" id="edit-dist-dg" value="${profile.dg || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District President (DP)</label>
              <input type="text" class="form-input" id="edit-dist-dp" value="${profile.dp || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Vice President (DVP)</label>
              <input type="text" class="form-input" id="edit-dist-dvp" value="${profile.dvp || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District Secretary (DS)</label>
              <input type="text" class="form-input" id="edit-dist-ds" value="${profile.ds || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Treasurer (DT)</label>
              <input type="text" class="form-input" id="edit-dist-dt" value="${profile.dt || ''}" />
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">Core Strategic Goals</div>
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div>
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 1 Title</label>
              <input type="text" class="form-input" id="edit-dist-g1-title" value="${profile.goals?.[0]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 1 Description</label>
              <textarea class="form-textarea" id="edit-dist-g1-desc" rows="2">${profile.goals?.[0]?.desc || ''}</textarea>
            </div>
            <div style="border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 12px;">
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 2 Title</label>
              <input type="text" class="form-input" id="edit-dist-g2-title" value="${profile.goals?.[1]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 2 Description</label>
              <textarea class="form-textarea" id="edit-dist-g2-desc" rows="2">${profile.goals?.[1]?.desc || ''}</textarea>
            </div>
            <div style="border-top: 1px dashed rgba(255,255,255,0.08); padding-top: 12px;">
              <label class="form-label" style="font-weight: 600; color:var(--color-text-primary);">Goal 3 Title</label>
              <input type="text" class="form-input" id="edit-dist-g3-title" value="${profile.goals?.[2]?.title || ''}" />
              <label class="form-label" style="font-size:11px; margin-top:4px;">Goal 3 Description</label>
              <textarea class="form-textarea" id="edit-dist-g3-desc" rows="2">${profile.goals?.[2]?.desc || ''}</textarea>
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">District Council Structure</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Immediate Past District President (IPDP)</label>
              <input type="text" class="form-input" id="edit-dist-ipdp" value="${profile.council?.ipdp || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">District Advisor</label>
              <input type="text" class="form-input" id="edit-dist-advisor" value="${profile.council?.advisor || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">District Coordinators</label>
              <input type="text" class="form-input" id="edit-dist-coordinators" value="${profile.council?.coordinators || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Region Chairpersons</label>
              <input type="text" class="form-input" id="edit-dist-regions" value="${profile.council?.regions || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Zone Chairpersons</label>
              <input type="text" class="form-input" id="edit-dist-zones" value="${profile.council?.zones || ''}" />
            </div>
          </div>
        </form>
      `;

      showModal('Edit District Profile', editFormHtml, {
        submitText: 'Save Changes',
        size: 'lg',
        onSubmit: (close) => {
          const title = document.getElementById('edit-dist-title').value.trim();
          const tagline = document.getElementById('edit-dist-tagline').value.trim();
          const description = document.getElementById('edit-dist-desc').value.trim();
          const dg = document.getElementById('edit-dist-dg').value.trim();
          const dp = document.getElementById('edit-dist-dp').value.trim();
          const dvp = document.getElementById('edit-dist-dvp').value.trim();
          const ds = document.getElementById('edit-dist-ds').value.trim();
          const dt = document.getElementById('edit-dist-dt').value.trim();
          
          const g1Title = document.getElementById('edit-dist-g1-title').value.trim();
          const g1Desc = document.getElementById('edit-dist-g1-desc').value.trim();
          const g2Title = document.getElementById('edit-dist-g2-title').value.trim();
          const g2Desc = document.getElementById('edit-dist-g2-desc').value.trim();
          const g3Title = document.getElementById('edit-dist-g3-title').value.trim();
          const g3Desc = document.getElementById('edit-dist-g3-desc').value.trim();

          const ipdp = document.getElementById('edit-dist-ipdp').value.trim();
          const advisor = document.getElementById('edit-dist-advisor').value.trim();
          const coordinators = document.getElementById('edit-dist-coordinators').value.trim();
          const regions = document.getElementById('edit-dist-regions').value.trim();
          const zones = document.getElementById('edit-dist-zones').value.trim();

          if (!title || !tagline || !description) {
            showToast('error', 'Validation Error', 'Title, tagline, and description are required.');
            return;
          }

          store.updateDistrictProfile({
            title,
            tagline,
            description,
            dg,
            dp,
            dvp,
            ds,
            dt,
            goals: [
              { title: g1Title, desc: g1Desc },
              { title: g2Title, desc: g2Desc },
              { title: g3Title, desc: g3Desc }
            ],
            council: {
              ipdp,
              advisor,
              coordinators,
              regions,
              zones
            }
          });

          showToast('success', 'Profile Updated', 'District Profile details updated successfully.');
          close();
          render();
        }
      });
    });
  }

  render();
}

export function renderMDProfile() {
  const app = document.getElementById('app');
  
  function render() {
    const profile = store.getMDProfile();
    const isAdmin = auth.isAdmin;

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
                <h1>${profile.title || 'Multiple District Profile'}</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">${profile.subtitle || ''}</p>
              </div>
              ${isAdmin ? `
                <div class="page-header-actions">
                  <button class="btn btn-primary edit-profile-btn" id="edit-md-btn">
                    <i data-lucide="pencil" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i> Edit Profile
                  </button>
                </div>
              ` : ''}
            </div>

            <!-- MD Map / Info Grid -->
            <div class="grid-2 stagger-enter">
              <div class="card hover-lift">
                <div class="card-header"><h3 class="card-title"><i data-lucide="shield" style="color:var(--color-primary)"></i> National Council Structure</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                  <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6; margin:0;">
                    ${profile.description || ''}
                  </p>
                  
                  <div style="margin-top:8px; display:flex; flex-direction:column; gap:10px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                      <span>Council Chairperson</span>
                      <strong style="color:var(--color-text-primary);">${profile.councilChairperson || 'Not Appointed'}</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                      <span>Sponsoring Lion Chairperson</span>
                      <strong style="color:var(--color-text-primary);">${profile.sponsoringLionChairperson || 'Not Appointed'}</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                      <span>Active Districts</span>
                      <strong style="color:var(--color-primary);">${profile.activeDistricts || 'None'}</strong>
                    </div>
                    <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:13px;">
                      <span>Total Members Nationwide</span>
                      <strong style="color:#14b8a6;">${profile.totalMembers || '0'}</strong>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card hover-lift">
                <div class="card-header"><h3 class="card-title"><i data-lucide="help-circle" style="color:var(--color-cyan)"></i> Frequently Contacted Coordinates</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:16px; font-size:13px; color:var(--color-text-secondary); line-height:1.6;">
                  <div>
                    <strong>Multiple District Secretariat:</strong>
                    <div style="margin-top:4px;">${profile.secretariat || ''}</div>
                  </div>
                  <div>
                    <strong>Official Channels:</strong>
                    <div style="margin-top:4px;">Email: ${profile.email || ''}</div>
                    <div>Web: ${profile.web || ''}</div>
                  </div>
                  <div>
                    <strong>Annual Publications:</strong>
                    <div style="margin-top:4px;">${profile.publications || ''}</div>
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
    setupMDEventListeners(profile);
  }

  function setupMDEventListeners(profile) {
    document.getElementById('edit-md-btn')?.addEventListener('click', () => {
      const editFormHtml = `
        <form id="edit-md-form">
          <div style="font-weight: 700; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">General Information</div>
          <div class="form-group">
            <label class="form-label">Multiple District Title *</label>
            <input type="text" class="form-input" id="edit-md-title" value="${profile.title || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Subtitle *</label>
            <input type="text" class="form-input" id="edit-md-subtitle" value="${profile.subtitle || ''}" required />
          </div>
          <div class="form-group">
            <label class="form-label">Description *</label>
            <textarea class="form-textarea" id="edit-md-desc" rows="3" required>${profile.description || ''}</textarea>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">National Council Structure</div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Council Chairperson</label>
              <input type="text" class="form-input" id="edit-md-cc" value="${profile.councilChairperson || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Sponsoring Lion Chairperson</label>
              <input type="text" class="form-input" id="edit-md-slc" value="${profile.sponsoringLionChairperson || ''}" />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Active Districts</label>
              <input type="text" class="form-input" id="edit-md-districts" value="${profile.activeDistricts || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Total Members Nationwide</label>
              <input type="text" class="form-input" id="edit-md-members" value="${profile.totalMembers || ''}" />
            </div>
          </div>

          <div style="font-weight: 700; margin-top: 20px; margin-bottom: 12px; font-size: 14px; border-bottom: 1px solid rgba(255,255,255,0.08); padding-bottom: 4px; color: var(--color-primary);">Frequently Contacted Coordinates</div>
          <div class="form-group">
            <label class="form-label">Multiple District Secretariat</label>
            <input type="text" class="form-input" id="edit-md-secretariat" value="${profile.secretariat || ''}" />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Official Email</label>
              <input type="email" class="form-input" id="edit-md-email" value="${profile.email || ''}" />
            </div>
            <div class="form-group">
              <label class="form-label">Web Address</label>
              <input type="text" class="form-input" id="edit-md-web" value="${profile.web || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Annual Publications</label>
            <textarea class="form-textarea" id="edit-md-pubs" rows="2">${profile.publications || ''}</textarea>
          </div>
        </form>
      `;

      showModal('Edit Multiple District Profile', editFormHtml, {
        submitText: 'Save Changes',
        size: 'lg',
        onSubmit: (close) => {
          const title = document.getElementById('edit-md-title').value.trim();
          const subtitle = document.getElementById('edit-md-subtitle').value.trim();
          const description = document.getElementById('edit-md-desc').value.trim();
          const councilChairperson = document.getElementById('edit-md-cc').value.trim();
          const sponsoringLionChairperson = document.getElementById('edit-md-slc').value.trim();
          const activeDistricts = document.getElementById('edit-md-districts').value.trim();
          const totalMembers = document.getElementById('edit-md-members').value.trim();
          const secretariat = document.getElementById('edit-md-secretariat').value.trim();
          const email = document.getElementById('edit-md-email').value.trim();
          const web = document.getElementById('edit-md-web').value.trim();
          const publications = document.getElementById('edit-md-pubs').value.trim();

          if (!title || !subtitle || !description) {
            showToast('error', 'Validation Error', 'Title, subtitle, and description are required.');
            return;
          }

          store.updateMDProfile({
            title,
            subtitle,
            description,
            councilChairperson,
            sponsoringLionChairperson,
            activeDistricts,
            totalMembers,
            secretariat,
            email,
            web,
            publications
          });

          showToast('success', 'Profile Updated', 'Multiple District Profile details updated successfully.');
          close();
          render();
        }
      });
    });
  }

  render();
}
