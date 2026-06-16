// ============================================
// LEO NEXUS PORTAL — MEMBER DASHBOARD
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';

export function renderMemberDashboard() {
  const app = document.getElementById('app');
  const user = auth.currentUser;
  const clubId = auth.userClubId;

  // Resolve member record
  const member = store.getAll('members').find(m => m.email.toLowerCase() === user.email.toLowerCase()) || {
    id: 'm5',
    name: user.name,
    email: user.email,
    phone: '+94 77 100 0005'
  };

  function render() {
    const club = store.getById('clubs', clubId);
    const announcements = store.getClubAnnouncements(clubId);
    const memberPayments = store.getAll('memberPayments').filter(p => p.memberId === member.id);

    // Dues stats
    const totalDuesPaid = memberPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
    const totalDuesPending = memberPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
    const registeredEventsCount = memberPayments.length;

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Dashboard', ['Overview', 'Dashboard'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Welcome Banner -->
            <div class="card stagger-enter" style="background: linear-gradient(135deg, rgba(7,14,47,0.8) 0%, rgba(0,102,255,0.15) 100%); border: 1px solid var(--color-border); padding: 24px; position:relative; overflow:hidden;">
              <div style="position:absolute; top:0; right:0; width:250px; height:100%; background:radial-gradient(circle at center, var(--color-primary-alpha), transparent); opacity:0.3; pointer-events:none;"></div>
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                <div>
                  <h1 style="margin:0; font-size:24px; font-weight:800; color:var(--color-text-primary);">Welcome back, ${user.name}!</h1>
                  <p style="margin:6px 0 0; font-size:13px; color:var(--color-text-secondary);">Member of <strong>${club?.name || 'Leo Club'}</strong> | Region 1 - Zone A</p>
                </div>
                <!-- Mock QR Code -->
                <div style="display:flex; align-items:center; gap:12px; background:rgba(255,255,255,0.03); border:1px solid var(--color-border); padding:10px; border-radius:12px;">
                  <div style="text-align:right;">
                    <div style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase;">My Member ID</div>
                    <div style="font-size:13px; font-weight:700; color:var(--color-primary);">${member.id}</div>
                  </div>
                  <div style="width:36px; height:36px; background:#fff; padding:2px; border-radius:6px;">
                    <svg style="width:100%; height:100%;" viewBox="0 0 24 24" fill="none" stroke="#000" stroke-width="2">
                      <rect x="2" y="2" width="6" height="6" />
                      <rect x="16" y="2" width="6" height="6" />
                      <rect x="2" y="16" width="6" height="6" />
                      <rect x="9" y="9" width="6" height="6" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid stagger-enter" style="margin-top:20px; animation-delay:0.05s;">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12); color:#14b8a6;"><i data-lucide="check-circle"></i></div>
                <div class="stat-value" style="color:#14b8a6;">Rs. ${totalDuesPaid.toLocaleString()}</div>
                <div class="stat-label">Event Fees Paid</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12); color:#ef4444;"><i data-lucide="alert-circle"></i></div>
                <div class="stat-value" style="color:#ef4444;">Rs. ${totalDuesPending.toLocaleString()}</div>
                <div class="stat-label">Outstanding Dues</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:var(--color-primary-alpha); color:var(--color-primary);"><i data-lucide="calendar"></i></div>
                <div class="stat-value">${registeredEventsCount}</div>
                <div class="stat-label">Registered Events</div>
              </div>
            </div>

            <div class="grid-2 stagger-enter" style="margin-top:24px; animation-delay:0.1s;">
              <!-- Recent Announcements -->
              <div class="card hover-lift">
                <div class="card-header"><h3 class="card-title"><i data-lucide="megaphone" style="color:#ef4444"></i> District Announcements</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                  ${announcements.length === 0 ? `
                    <div style="text-align:center; padding:20px; color:var(--color-text-muted);">No active announcements</div>
                  ` : announcements.slice(0, 3).map(a => `
                    <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px; display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
                      <div>
                        <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${a.title}</div>
                        <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">Author: ${a.author} | Date: ${new Date(a.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span class="badge badge-${a.priority === 'urgent' ? 'danger' : 'warning'}" style="font-size:10px;">${a.priority}</span>
                    </div>
                  `).join('')}
                  <a href="#/member/announcements" style="font-size:13px; font-weight:600; color:var(--color-primary); text-decoration:none; margin-top:8px; display:inline-block;">View All Announcements →</a>
                </div>
              </div>

              <!-- My Registrations -->
              <div class="card hover-lift">
                <div class="card-header"><h3 class="card-title"><i data-lucide="list" style="color:var(--color-primary)"></i> Registered Activities</h3></div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                  ${memberPayments.length === 0 ? `
                    <div style="text-align:center; padding:20px; color:var(--color-text-muted); margin-bottom:8px;">No event sign-ups yet</div>
                  ` : memberPayments.slice(0, 3).map(p => {
                    const evt = store.getById('events', p.eventId);
                    return `
                      <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px; display:flex; justify-content:space-between; align-items:center;">
                        <div>
                          <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${evt?.name || p.eventId}</div>
                          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">Venue: ${evt?.venue} | Reference: ${p.reference || '—'}</div>
                        </div>
                        <span class="badge ${p.status==='paid'?'badge-success':'badge-warning'}">${p.status==='paid'?'Paid':'Pending'}</span>
                      </div>
                    `;
                  }).join('')}
                  <a href="#/member/events" style="font-size:13px; font-weight:600; color:var(--color-primary); text-decoration:none; margin-top:8px; display:inline-block;">Register or Pay for Events →</a>
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

  render();
}
