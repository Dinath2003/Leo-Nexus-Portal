// ============================================
// LEO NEXUS PORTAL — MEMBER DASHBOARD
// Modern SaaS / LeBank Inspired Layout
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { renderCalendarWidget } from '../../components/calendar-widget.js';

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

            <!-- Welcome Banner (LeBank Modern Hero Card) -->
            <div class="card" style="background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.03) 100%); border-color: rgba(37,99,235,0.18); margin-bottom: 24px; padding: 28px 32px;">
              <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:18px;">
                <div>
                  <div class="section-badge" style="margin-bottom:8px;">
                    <i data-lucide="user-check" style="width:12px;height:12px"></i> Active Member Profile
                  </div>
                  <h1 style="font-size:1.75rem; font-weight:800; margin:0 0 6px;">
                    Welcome back, ${user.name}! 👋
                  </h1>
                  <p style="margin:0; color:var(--color-text-secondary); font-size:var(--text-sm);">
                    Member of <strong>${club?.name || 'Leo Club'}</strong> | Region ${club?.region || 'A'} · Zone ${club?.zone || 'A1'}
                  </p>
                </div>
                <!-- Member ID Card Badge -->
                <div style="display:flex; align-items:center; gap:14px; background:var(--color-surface); border:1px solid var(--color-border); padding:12px 18px; border-radius:var(--radius-xl); box-shadow:var(--shadow-sm);">
                  <div style="text-align:right;">
                    <div style="font-size:11px; font-weight:700; color:var(--color-text-muted); text-transform:uppercase;">Member ID</div>
                    <div style="font-size:15px; font-weight:800; color:var(--color-primary);">${member.id}</div>
                  </div>
                  <div style="width:40px; height:40px; background:var(--color-surface-muted); border-radius:10px; display:flex; align-items:center; justify-content:center; color:var(--color-primary);">
                    <i data-lucide="qr-code" style="width:24px;height:24px;"></i>
                  </div>
                </div>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid">
              <div class="card stat-card">
                <div class="stat-icon" style="background:rgba(16,185,129,0.1); color:#10b981;">
                  <i data-lucide="check-circle"></i>
                </div>
                <div class="stat-value" style="color:#10b981;">Rs. ${totalDuesPaid.toLocaleString()}</div>
                <div class="stat-label">Event Fees Paid</div>
                <div class="stat-change positive">
                  <i data-lucide="check" style="width:12px;height:12px"></i> Up to date
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon" style="background:rgba(239,68,68,0.1); color:#ef4444;">
                  <i data-lucide="alert-circle"></i>
                </div>
                <div class="stat-value" style="color:#ef4444;">Rs. ${totalDuesPending.toLocaleString()}</div>
                <div class="stat-label">Outstanding Dues</div>
                <div class="stat-change ${totalDuesPending > 0 ? 'negative' : 'positive'}">
                  <i data-lucide="credit-card" style="width:12px;height:12px"></i> ${totalDuesPending > 0 ? 'Payment Required' : 'All Clear'}
                </div>
              </div>

              <div class="card stat-card">
                <div class="stat-icon" style="background:var(--color-primary-alpha); color:var(--color-primary);">
                  <i data-lucide="calendar"></i>
                </div>
                <div class="stat-value">${registeredEventsCount}</div>
                <div class="stat-label">Registered Activities</div>
                <div class="stat-change positive">
                  <i data-lucide="calendar-check" style="width:12px;height:12px"></i> Confirmed
                </div>
              </div>
            </div>

            <div class="grid-2" style="margin-bottom:28px;">
              <!-- Recent Announcements -->
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="megaphone" style="width:18px;height:18px;color:var(--color-primary)"></i>
                    District Announcements
                  </h3>
                  <a href="#/member/announcements" class="btn btn-ghost btn-sm">View All</a>
                </div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                  ${announcements.length === 0 ? `
                    <div style="text-align:center; padding:20px; color:var(--color-text-muted);">No active announcements</div>
                  ` : announcements.slice(0, 3).map(a => `
                    <div style="padding:14px; background:var(--color-surface-muted); border:1px solid var(--color-border-subtle); border-radius:var(--radius-lg); display:flex; justify-content:space-between; align-items:flex-start; gap:10px;">
                      <div>
                        <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${a.title}</div>
                        <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">Author: ${a.author} · Date: ${new Date(a.createdAt).toLocaleDateString()}</div>
                      </div>
                      <span class="badge badge-${a.priority === 'urgent' ? 'danger' : 'warning'}" style="font-size:10px;">${a.priority}</span>
                    </div>
                  `).join('')}
                </div>
              </div>

              <!-- My Registrations -->
              <div class="card">
                <div class="card-header">
                  <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                    <i data-lucide="list-checks" style="width:18px;height:18px;color:var(--color-primary)"></i>
                    Registered Activities
                  </h3>
                  <a href="#/member/events" class="btn btn-ghost btn-sm">Browse Events</a>
                </div>
                <div class="card-body" style="display:flex; flex-direction:column; gap:12px;">
                  ${memberPayments.length === 0 ? `
                    <div style="text-align:center; padding:20px; color:var(--color-text-muted);">No event sign-ups yet</div>
                  ` : memberPayments.slice(0, 3).map(p => {
                    const evt = store.getById('events', p.eventId);
                    return `
                      <div style="padding:14px; background:var(--color-surface-muted); border:1px solid var(--color-border-subtle); border-radius:var(--radius-lg); display:flex; justify-content:space-between; align-items:center;">
                        <div>
                          <div style="font-size:13px; font-weight:700; color:var(--color-text-primary);">${evt?.name || p.eventId}</div>
                          <div style="font-size:11px; color:var(--color-text-muted); margin-top:2px;">Venue: ${evt?.venue || 'TBA'} · Ref: ${p.reference || '—'}</div>
                        </div>
                        <span class="badge ${p.status==='paid'?'badge-success':'badge-warning'}">${p.status==='paid'?'Paid':'Pending'}</span>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Calendar Widget -->
            <div style="margin-bottom:28px;">
              ${renderCalendarWidget()}
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
