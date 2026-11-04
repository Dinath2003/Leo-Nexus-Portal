// ============================================
// LEO NEXUS PORTAL — CLUB PROFILE PAGE (MYLEO STYLE)
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

export function renderClubProfile(params = {}) {
  const app = document.getElementById('app');
  
  // Decide which club to display: 
  // If user is district user and a club ID is passed in params (e.g. from district dashboard), view that club.
  // Otherwise, default to the user's own club.
  let clubId = params.id || auth.userClubId;
  
  // If no clubId exists, fallback to first active club
  if (!clubId) {
    const activeClubs = store.getAll('clubs');
    if (activeClubs.length > 0) {
      clubId = activeClubs[0].id;
    }
  }

  const isMyClub = clubId === auth.userClubId;
  const canEdit = auth.isAdmin || (isMyClub && (auth.currentUser?.role === 'club_president' || auth.currentUser?.role === 'club_admin'));

  function render(activeTab = 'info') {
    const club = store.getById('clubs', clubId);
    if (!club) {
      app.innerHTML = `<div style="padding:40px;text-align:center;"><h2>Club not found</h2></div>`;
      return;
    }

    const clubMembers = store.getClubMembers(club.id);
    const clubProjects = store.getClubProjects(club.id);
    const points = store.getTotalClubPoints(club.id);

    const activeCount = clubMembers.filter(m => m.status === 'active').length;
    const inactiveCount = clubMembers.filter(m => m.status === 'inactive').length;
    const newCount = clubMembers.filter(m => {
      const joinYear = new Date(m.joinDate).getFullYear();
      return joinYear === 2026; // Current Leoistic Year
    }).length;

    // Filter officers
    const officerMembers = clubMembers.filter(m => m.role && m.role.toLowerCase() !== 'member');
    const advisor = club.advisor_name || 'Lio. Johnathan Silva';
    const advisorEmail = club.advisor_email || 'advisor@lions.org';
    const advisorPhone = club.advisor_phone || '+94 77 987 6543';

    const getOfficerIcon = (role = '') => {
      const r = role.toLowerCase();
      if (r.includes('president')) return 'shield';
      if (r.includes('secretary')) return 'file-text';
      if (r.includes('treasurer')) return 'wallet';
      if (r.includes('membership') || r.includes('chair')) return 'users';
      return 'award';
    };
    const getOfficerColor = (role = '') => {
      const r = role.toLowerCase();
      if (r === 'president') return 'var(--color-primary)';
      if (r.includes('president')) return 'var(--color-cyan)';
      if (r.includes('secretary')) return '#10b981';
      if (r.includes('treasurer')) return '#f59e0b';
      if (r.includes('membership')) return '#8b5cf6';
      return 'var(--color-primary)';
    };

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Club Profile', ['Club', 'Profile'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Profile Cover and Header Card -->
            <div class="card stagger-enter" style="padding:0; overflow:hidden; border: 1px solid var(--color-border); border-radius:16px;">
              <!-- Banner -->
              <div style="height:200px; background: linear-gradient(135deg, #070e2f 0%, #004ecc 50%, #00d4ff 100%); position:relative;">
                ${canEdit ? `
                  <button class="btn btn-sm btn-secondary edit-profile-btn" style="position:absolute; bottom:16px; right:16px; background:rgba(255,255,255,0.9); backdrop-filter:blur(8px); border-color:rgba(255,255,255,0.5); color:#0b132b; font-weight:600;">
                    <i data-lucide="edit" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> Edit Profile
                  </button>
                ` : ''}
              </div>

              <!-- Main Info Details -->
              <div style="padding: 0 24px 24px; position:relative; display:flex; flex-wrap:wrap; justify-content:space-between; align-items:flex-end; gap:20px; margin-top:-60px;">
                <div style="display:flex; align-items:flex-end; gap:20px; flex-wrap:wrap;">
                  <!-- Logo Container -->
                  <div style="width:120px; height:120px; border-radius:24px; background:var(--color-dark-surface); border:4px solid var(--color-surface); display:flex; align-items:center; justify-content:center; box-shadow:0 12px 24px rgba(0,0,0,0.15); overflow:hidden; position:relative; z-index:2;">
                    ${club.logoUrl 
                      ? `<img src="${club.logoUrl}" style="width:100%; height:100%; object-fit:cover;" />`
                      : `<i data-lucide="anchor" style="width:48px; height:48px; color:var(--color-primary);"></i>`
                    }
                  </div>

                  <div>
                    <h1 style="margin:0; font-size:24px; font-weight:800; color:var(--color-text-primary); text-shadow: 0 2px 4px rgba(0,0,0,0.5);">${club.name}</h1>
                    <div style="font-size:14px; color:var(--color-text-secondary); margin-top:6px; display:flex; gap:12px; align-items:center; flex-wrap:wrap;">
                      <span class="badge ${club.track === 'Alpha Leo' ? 'badge-warning' : 'badge-primary'}" style="font-size:11px; font-weight:600;">${club.track || 'Omega Leo'}</span>
                      <span style="width:4px; height:4px; border-radius:50%; background:var(--color-text-muted);"></span>
                      <span>District 306 D1</span>
                      <span style="width:4px; height:4px; border-radius:50%; background:var(--color-text-muted);"></span>
                      <span>${club.zone || 'A1'}</span>
                      <span style="width:4px; height:4px; border-radius:50%; background:var(--color-text-muted);"></span>
                      <span>${club.region || 'A'}</span>
                    </div>
                  </div>
                </div>

                <!-- QR code and statistics -->
                <div style="display:flex; gap:20px; align-items:center; flex-wrap:wrap;">
                  <div style="text-align:right;">
                    <div style="font-size:11px; text-transform:uppercase; color:var(--color-text-muted); font-weight:700;">Club QR Code</div>
                    <div style="font-size:12px; font-weight:600; color:var(--color-primary); margin-top:2px;">${club.code}</div>
                  </div>
                  <!-- Mock QR code -->
                  <div style="width:64px; height:64px; border-radius:8px; background:#fff; padding:4px; display:flex; align-items:center; justify-content:center; border:1px solid var(--color-border);">
                    <svg style="width:100%; height:100%;" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
                      <rect x="2" y="2" width="6" height="6" />
                      <rect x="16" y="2" width="6" height="6" />
                      <rect x="2" y="16" width="6" height="6" />
                      <rect x="9" y="9" width="6" height="6" />
                      <line x1="2" y1="11" x2="6" y2="11" />
                      <line x1="11" y1="2" x2="11" y2="6" />
                      <line x1="16" y1="16" x2="22" y2="16" />
                      <line x1="16" y1="20" x2="20" y2="20" />
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Quick Metrics Section -->
              <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); border-top:1px solid var(--color-border); background:rgba(255,255,255,0.01);">
                <div style="padding:16px; border-right:1px solid var(--color-border); text-align:center;">
                  <div style="font-size:24px; font-weight:800; color:var(--color-primary);">${club.memberCount || clubMembers.length}</div>
                  <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Certified Members</div>
                </div>
                <div style="padding:16px; border-right:1px solid var(--color-border); text-align:center;">
                  <div style="font-size:24px; font-weight:800; color:#14b8a6;">${clubProjects.length}</div>
                  <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Projects Completed</div>
                </div>
                <div style="padding:16px; border-right:1px solid var(--color-border); text-align:center;">
                  <div style="font-size:24px; font-weight:800; color:#f59e0b;">${points}</div>
                  <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Performance Points</div>
                </div>
                <div style="padding:16px; text-align:center;">
                  <div style="font-size:18px; font-weight:700; color:var(--color-text-primary);">${club.charter_date ? new Date(club.charter_date).toLocaleDateString('en-US',{year:'numeric',month:'short'}) : '2024'}</div>
                  <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Chartered Date</div>
                </div>
              </div>
            </div>

            <!-- Tabbed Sections Navigation -->
            <div class="tabs-container stagger-enter" style="margin-top:24px; display:flex; gap:8px; border-bottom:1px solid var(--color-border); padding-bottom:8px;">
              <button class="btn tab-btn ${activeTab === 'info' ? 'btn-primary' : 'btn-ghost'}" data-tab="info">Club Information</button>
              <button class="btn tab-btn ${activeTab === 'membership' ? 'btn-primary' : 'btn-ghost'}" data-tab="membership">Membership Dashboard</button>
              <button class="btn tab-btn ${activeTab === 'officers' ? 'btn-primary' : 'btn-ghost'}" data-tab="officers">Officers & Advisors</button>
            </div>

            <!-- Tab Contents -->
            <div class="tab-content-container stagger-enter" style="margin-top:20px; animation-delay:0.1s;">
              ${activeTab === 'info' ? `
                <!-- Club Info Tab -->
                <div class="grid-2">
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="info" style="width:18px;height:18px;color:var(--color-primary);"></i> Profile Details</h3></div>
                    <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Official Club Name</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">${club.name}</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Club Code</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">${club.code}</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Leoistic Year</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">2026/2027</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Charter Date</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">${new Date(club.charter_date).toLocaleDateString('en-US', {day:'numeric', month:'long', year:'numeric'})}</div>
                      </div>
                    </div>
                  </div>

                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="map" style="width:18px;height:18px;color:var(--color-cyan);"></i> Organization & Meeting Details</h3></div>
                    <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Zone / Region</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">${club.zone} / ${club.region}</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Regular Meeting Day</div>
                        <div style="font-size:14px; font-weight:600; color:var(--color-text-primary); margin-top:4px;">${club.meetingDay}</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Club Description</div>
                        <div style="font-size:13px; color:var(--color-text-secondary); margin-top:4px; line-height:1.6;">${club.description}</div>
                      </div>
                      <div>
                        <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Official Contact</div>
                        <div style="font-size:13px; color:var(--color-text-secondary); margin-top:4px;">Email: ${club.email} | Phone: ${club.phone}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'membership' ? `
                <!-- Membership Dashboard Tab -->
                <div class="stats-grid" style="margin-bottom:20px;">
                  <div class="card stat-card" style="border:1px solid rgba(20,184,166,0.2);">
                    <div class="stat-icon" style="color:#14b8a6; background:rgba(20,184,166,0.1);"><i data-lucide="user-check"></i></div>
                    <div class="stat-value" style="color:#14b8a6;">${club.memberCount || activeCount}</div>
                    <div class="stat-label">Certified Members</div>
                  </div>
                  <div class="card stat-card" style="border:1px solid rgba(239,68,68,0.2);">
                    <div class="stat-icon" style="color:#ef4444; background:rgba(239,68,68,0.1);"><i data-lucide="user-minus"></i></div>
                    <div class="stat-value" style="color:#ef4444;">${inactiveCount}</div>
                    <div class="stat-label">Inactive Roster</div>
                  </div>
                  <div class="card stat-card" style="border:1px solid rgba(0,102,255,0.2);">
                    <div class="stat-icon" style="color:var(--color-primary); background:var(--color-primary-alpha);"><i data-lucide="user-plus"></i></div>
                    <div class="stat-value" style="color:var(--color-primary);">${newCount}</div>
                    <div class="stat-label">Inductions (This Year)</div>
                  </div>
                </div>

                ${club.membershipCheckpoints ? `
                  <div class="card hover-lift" style="margin-bottom:20px; padding:16px;">
                    <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; flex-wrap:wrap; gap:8px;">
                      <h4 style="margin:0; font-size:0.95rem; display:flex; align-items:center; gap:8px;">
                        <i data-lucide="line-chart" style="width:16px;height:16px;color:var(--color-primary)"></i>
                        Certified Monthly Membership Progression (2026)
                      </h4>
                      <span class="badge ${club.track === 'Alpha Leo' ? 'badge-warning' : 'badge-primary'}">${club.track || 'Omega Leo'}</span>
                    </div>
                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
                      <div style="padding:10px; background:rgba(255,255,255,0.02); border:1px solid var(--color-glass-border); border-radius:8px; text-align:center;">
                        <div style="font-size:11px; color:var(--color-text-muted);">1 July 2026</div>
                        <div style="font-size:1.3rem; font-weight:800; color:var(--color-text-primary); margin-top:2px;">${club.membershipCheckpoints['2026-07-01'] || '—'}</div>
                      </div>
                      <div style="padding:10px; background:rgba(255,255,255,0.02); border:1px solid var(--color-glass-border); border-radius:8px; text-align:center;">
                        <div style="font-size:11px; color:var(--color-text-muted);">9 August 2026</div>
                        <div style="font-size:1.3rem; font-weight:800; color:var(--color-text-primary); margin-top:2px;">${club.membershipCheckpoints['2026-08-09'] || '—'}</div>
                      </div>
                      <div style="padding:10px; background:rgba(255,255,255,0.02); border:1px solid var(--color-glass-border); border-radius:8px; text-align:center;">
                        <div style="font-size:11px; color:var(--color-text-muted);">1 September 2026</div>
                        <div style="font-size:1.3rem; font-weight:800; color:var(--color-text-primary); margin-top:2px;">${club.membershipCheckpoints['2026-09-01'] || '—'}</div>
                      </div>
                      <div style="padding:10px; background:rgba(255,255,255,0.02); border:1px solid var(--color-glass-border); border-radius:8px; text-align:center;">
                        <div style="font-size:11px; color:var(--color-text-muted);">30 September 2026</div>
                        <div style="font-size:1.3rem; font-weight:800; color:var(--color-text-primary); margin-top:2px;">${club.membershipCheckpoints['2026-09-30'] || '—'}</div>
                      </div>
                      <div style="padding:10px; background:rgba(0,102,255,0.08); border:1px solid rgba(0,102,255,0.3); border-radius:8px; text-align:center;">
                        <div style="font-size:11px; color:var(--color-primary); font-weight:600;">31 October 2026</div>
                        <div style="font-size:1.3rem; font-weight:800; color:var(--color-primary); margin-top:2px;">${club.membershipCheckpoints['2026-10-31'] || club.memberCount}</div>
                      </div>
                    </div>
                  </div>
                ` : ''}

                <div class="card hover-lift">
                  <div class="card-header"><h3 class="card-title"><i data-lucide="users" style="width:18px;height:18px;color:var(--color-primary);"></i> Active Membership Directory</h3></div>
                  <div class="card-body" style="padding:0;">
                    <div class="data-table-wrapper">
                      <table class="data-table">
                        <thead>
                          <tr>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Join Date</th>
                            <th>Email</th>
                            <th>Phone</th>
                            <th>Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${clubMembers.map(m => `
                            <tr>
                              <td>
                                <div style="display:flex;align-items:center;gap:10px;">
                                  <div class="avatar" style="width:28px;height:28px;font-size:10px;">${m.name.split(' ').map(n=>n[0]).join('').slice(0,2)}</div>
                                  <span style="font-weight:600;">${m.name}</span>
                                </div>
                              </td>
                              <td>${m.role}</td>
                              <td>${m.joinDate ? new Date(m.joinDate).toLocaleDateString() : '—'}</td>
                              <td>${m.email || '—'}</td>
                              <td>${m.phone || '—'}</td>
                              <td><span class="badge ${m.status === 'active' ? 'badge-success' : 'badge-danger'}">${m.status}</span></td>
                            </tr>
                          `).join('')}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'officers' ? `
                <!-- Officers Tab -->
                <div class="grid-2">
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="award" style="width:18px;height:18px;color:var(--color-primary);"></i> Current Office Bearers</h3></div>
                    <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                      ${officerMembers.length > 0 ? officerMembers.map(off => `
                        <div style="display:flex; align-items:center; gap:14px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                          <i data-lucide="${getOfficerIcon(off.role)}" style="color:${getOfficerColor(off.role)};"></i>
                          <div>
                            <div style="font-size:11px; color:var(--color-text-muted);">${off.role}</div>
                            <div style="font-size:14px; font-weight:700; color:var(--color-text-primary);">${off.name}</div>
                          </div>
                        </div>
                      `).join('') : `
                        <div style="display:flex; align-items:center; gap:14px; padding:10px 14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                          <i data-lucide="shield" style="color:var(--color-primary);"></i>
                          <div>
                            <div style="font-size:11px; color:var(--color-text-muted);">Club President</div>
                            <div style="font-size:14px; font-weight:700; color:var(--color-text-primary);">${club.president || 'Not Appointed'}</div>
                          </div>
                        </div>
                      `}
                    </div>
                  </div>

                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="user-cog" style="width:18px;height:18px;color:#f59e0b;"></i> Club Advisor Details</h3></div>
                    <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                      <div style="display:flex; align-items:center; gap:14px;">
                        <div style="width:56px; height:56px; border-radius:50%; background:rgba(245,158,11,0.1); color:#f59e0b; display:flex; align-items:center; justify-content:center;">
                          <i data-lucide="user" style="width:28px; height:28px;"></i>
                        </div>
                        <div>
                          <div style="font-size:16px; font-weight:700; color:var(--color-text-primary);">${advisor}</div>
                          <div style="font-size:12px; color:#f59e0b; font-weight:600; margin-top:2px;">Leo Club Advisor</div>
                        </div>
                      </div>
                      <div style="border-top:1px solid var(--color-border); padding-top:16px; display:flex; flex-direction:column; gap:10px; font-size:13px;">
                        <div style="display:flex; align-items:center; gap:8px; color:var(--color-text-secondary);">
                          <i data-lucide="mail" style="width:14px;height:14px;"></i>
                          <span>Email: ${advisorEmail}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px; color:var(--color-text-secondary);">
                          <i data-lucide="phone" style="width:14px;height:14px;"></i>
                          <span>Phone: ${advisorPhone}</span>
                        </div>
                        <div style="display:flex; align-items:center; gap:8px; color:var(--color-text-secondary);">
                          <i data-lucide="building" style="width:14px;height:14px;"></i>
                          <span>Sponsoring Lions Club: ${club.sponsoring_lions_club || 'Lions Club of ' + club.name.replace('Leo Club of ', '')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ` : ''}
            </div>
          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    initSidebar();
    initHeader();
    setupEventListeners(activeTab, club);
  }

  function setupEventListeners(activeTab, club) {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.dataset.tab;
        render(tab);
      });
    });

    // Edit Profile Modal
    document.querySelector('.edit-profile-btn')?.addEventListener('click', () => {
      const editFormHtml = `
        <form id="edit-club-form">
          <div class="form-group">
            <label class="form-label">Club Name *</label>
            <input type="text" class="form-input" id="edit-club-name" value="${club.name}" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Zone *</label>
              <input type="text" class="form-input" id="edit-club-zone" value="${club.zone || 'A1'}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Region *</label>
              <input type="text" class="form-input" id="edit-club-region" value="${club.region || 'A'}" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Meeting Day</label>
              <input type="text" class="form-input" id="edit-club-meeting" value="${club.meetingDay || 'Every Saturday'}" />
            </div>
            <div class="form-group">
              <label class="form-label">Official Phone</label>
              <input type="text" class="form-input" id="edit-club-phone" value="${club.phone || ''}" />
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Official Email</label>
            <input type="email" class="form-input" id="edit-club-email" value="${club.email || ''}" />
          </div>
          <div class="form-group">
            <label class="form-label">Advisor Name</label>
            <input type="text" class="form-input" id="edit-club-advisor" value="${club.advisor_name || 'Lio. Johnathan Silva'}" />
          </div>
          <div class="form-group">
            <label class="form-label">Description</label>
            <textarea class="form-textarea" id="edit-club-desc" rows="3">${club.description || ''}</textarea>
          </div>
        </form>
      `;

      showModal('Edit Club Profile', editFormHtml, {
        submitText: 'Save Changes',
        size: 'lg',
        onSubmit: (close) => {
          const updates = {
            name: document.getElementById('edit-club-name').value.trim(),
            zone: document.getElementById('edit-club-zone').value.trim(),
            region: document.getElementById('edit-club-region').value.trim(),
            meetingDay: document.getElementById('edit-club-meeting').value.trim(),
            phone: document.getElementById('edit-club-phone').value.trim(),
            email: document.getElementById('edit-club-email').value.trim(),
            advisor_name: document.getElementById('edit-club-advisor').value.trim(),
            description: document.getElementById('edit-club-desc').value.trim(),
          };

          if (!updates.name) {
            showToast('error', 'Validation Error', 'Club Name is required.');
            return;
          }

          store.update('clubs', club.id, updates);
          showToast('success', 'Profile Updated', 'Club profile details updated successfully.');
          close();
          render(activeTab);
        }
      });
    });
  }

  render();
}
