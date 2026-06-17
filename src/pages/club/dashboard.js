// ============================================
// LEO NEXUS PORTAL — CLUB DASHBOARD
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { showToast } from '../../components/toast.js';
import { setPointsActiveTab } from './points.js';

export function renderClubDashboard() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
  const club = auth.userClub;

  if (!club) {
    router.navigate('/login');
    return;
  }

  const members = store.getClubMembers(clubId);
  const projects = store.getClubProjects(clubId);
  const finances = store.getClubFinances(clubId);
  const announcements = store.getClubAnnouncements(clubId);
  const eventRegs = store.getClubEventRegistrations(clubId);
  const financeSummary = store.getClubFinanceSummary(clubId);
  const totalPoints = store.getTotalClubPoints(clubId);
  const submissions = store.getAll('pointsSubmissions').filter(s => s.clubId === clubId);
  const currentMonth = '2026-06';
  const currentSubmission = submissions.find(s => s.month === currentMonth && s.status !== 'rejected');

  const activeMembers = members.filter(m => m.status === 'active').length;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const upcomingEvents = eventRegs.filter(er => new Date(er.event.date) > new Date()).length;

  // Recent announcements (last 3)
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const priorityColors = {
    urgent: 'badge-danger',
    important: 'badge-warning',
    normal: 'badge-primary'
  };

  const priorityIcons = {
    urgent: 'alert-triangle',
    important: 'alert-circle',
    normal: 'info'
  };

  // Leaderboard rank
  const leaderboard = store.getLeaderboard();
  const clubRank = leaderboard.findIndex(c => c.id === clubId) + 1;

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Dashboard', ['Dashboard'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Club Header -->
          <div class="page-header stagger-enter">
            <div>
              <h1 style="display:flex;align-items:center;gap:10px;">
                ${club.name}
                <span class="badge ${club.status === 'active' ? 'badge-success' : 'badge-warning'}">${club.status}</span>
              </h1>
              <p style="color:var(--color-text-muted);margin-top:4px;">
                ${club.code} · ${club.zone} · ${club.region} · President: ${club.president}
              </p>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid stagger-enter" style="animation-delay:0.1s">
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon"><i data-lucide="users"></i></div>
              <div class="stat-value">${activeMembers}</div>
              <div class="stat-label">Active Members</div>
              <div class="stat-change positive">
                <i data-lucide="users" style="width:12px;height:12px"></i> ${members.length} total
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon"><i data-lucide="folder-kanban"></i></div>
              <div class="stat-value">${activeProjects}</div>
              <div class="stat-label">Active Projects</div>
              <div class="stat-change positive">
                <i data-lucide="check-circle" style="width:12px;height:12px"></i> ${projects.filter(p => p.status === 'completed').length} completed
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon"><i data-lucide="calendar-days"></i></div>
              <div class="stat-value">${upcomingEvents}</div>
              <div class="stat-label">Upcoming Events</div>
              <div class="stat-change positive">
                <i data-lucide="check" style="width:12px;height:12px"></i> ${eventRegs.filter(er => er.registration).length} registered
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon"><i data-lucide="trophy"></i></div>
              <div class="stat-value">${totalPoints.toLocaleString()}</div>
              <div class="stat-label">Club Points</div>
              <div class="stat-change ${clubRank <= 3 ? 'positive' : ''}">
                <i data-lucide="award" style="width:12px;height:12px"></i> Rank #${clubRank}
              </div>
            </div>
          </div>

          <div class="grid-3 stagger-enter" style="animation-delay:0.2s">
            <!-- Recent Announcements -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="megaphone" style="width:18px;height:18px"></i> Recent Announcements</h3>
                <a href="#/club/announcements" class="btn btn-ghost btn-sm">View All</a>
              </div>
              <div class="card-body">
                ${recentAnnouncements.length === 0 ? '<p style="color:var(--color-text-muted)">No announcements yet.</p>' :
                  recentAnnouncements.map(a => {
                    const isRead = (a.read || []).includes(clubId);
                    return `
                      <div class="announcement-preview" style="padding:12px 0;border-bottom:1px solid var(--color-border);${!isRead ? 'border-left:3px solid var(--color-primary);padding-left:12px;' : ''}">
                        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:8px;">
                          <div>
                            <span class="badge ${priorityColors[a.priority]} btn-sm" style="font-size:10px;margin-bottom:6px;">${a.priority}</span>
                            <h4 style="font-size:14px;color:var(--color-text-primary);margin-bottom:4px;">${a.title}</h4>
                            <p style="font-size:12px;color:var(--color-text-muted);line-height:1.4;">${a.content.substring(0, 100)}...</p>
                          </div>
                        </div>
                        <div style="display:flex;justify-content:space-between;margin-top:6px;">
                          <span style="font-size:11px;color:var(--color-text-muted);">${a.author}</span>
                          <span style="font-size:11px;color:var(--color-text-muted);">${new Date(a.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    `;
                  }).join('')
                }
              </div>
            </div>

            <!-- Club Balance Summary -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="wallet" style="width:18px;height:18px"></i> Financial Summary</h3>
                <a href="#/club/finance" class="btn btn-ghost btn-sm">Details</a>
              </div>
              <div class="card-body">
                <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:16px;margin-bottom:20px;">
                  <div style="text-align:center;padding:16px;background:rgba(20,184,166,0.08);border-radius:12px;">
                    <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Income</div>
                    <div style="font-size:18px;font-weight:700;color:#14b8a6;">Rs. ${financeSummary.income.toLocaleString()}</div>
                  </div>
                  <div style="text-align:center;padding:16px;background:rgba(239,68,68,0.08);border-radius:12px;">
                    <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Expenses</div>
                    <div style="font-size:18px;font-weight:700;color:#ef4444;">Rs. ${financeSummary.expenses.toLocaleString()}</div>
                  </div>
                  <div style="text-align:center;padding:16px;background:rgba(0,102,255,0.08);border-radius:12px;">
                    <div style="font-size:12px;color:var(--color-text-muted);margin-bottom:4px;">Balance</div>
                    <div style="font-size:18px;font-weight:700;color:${financeSummary.balance >= 0 ? '#14b8a6' : '#ef4444'};">Rs. ${financeSummary.balance.toLocaleString()}</div>
                  </div>
                </div>
                <div class="chart-container" style="height:180px;">
                  <canvas id="dashboard-finance-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Club Performance Points Status -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:6px;">
                  <i data-lucide="trophy" style="width:18px;height:18px;color:#fbbf24;"></i> Points & Standing
                </h3>
                <a href="#/club/points" id="dash-points-details-link" class="btn btn-ghost btn-sm">Details</a>
              </div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                  <div style="padding:12px; background:rgba(251,191,36,0.08); border-radius:10px; border:1px solid rgba(251,191,36,0.15); text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); margin-bottom:2px;">District Rank</div>
                    <div style="font-size:18px; font-weight:700; color:#fbbf24;">Rank #${clubRank}</div>
                  </div>
                  <div style="padding:12px; background:rgba(0,102,255,0.08); border-radius:10px; border:1px solid rgba(0,102,255,0.15); text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); margin-bottom:2px;">Total Score</div>
                    <div style="font-size:18px; font-weight:700; color:var(--color-primary);">${totalPoints.toLocaleString()}</div>
                  </div>
                </div>

                <div style="border-top:1px solid var(--color-glass-border); padding-top:14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:12.5px; font-weight:600; color:var(--color-text-secondary);">June 2026 Status</span>
                    ${currentSubmission ? `
                      <span class="badge badge-${currentSubmission.status === 'approved' ? 'success' : 'warning'}" style="font-size:10px;">
                        ${currentSubmission.status.toUpperCase()}
                      </span>
                    ` : `
                      <span class="badge badge-danger" style="font-size:10px; background:#ef444430; border:1px solid #ef444450; color:#f87171;">
                        MISSING
                      </span>
                    `}
                  </div>

                  ${currentSubmission ? `
                    <div style="background:rgba(255,255,255,0.02); padding:10px; border-radius:8px; border:1px solid var(--color-glass-border); font-size:12px;">
                      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="color:var(--color-text-muted);">Claimed:</span>
                        <strong style="color:var(--color-text-primary);">${currentSubmission.totalPoints.toLocaleString()} pts</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span style="color:var(--color-text-muted);">Checked Items:</span>
                        <strong style="color:var(--color-text-primary);">${currentSubmission.checkedCriteria.length} items</strong>
                      </div>
                    </div>
                    <button id="dash-points-history-btn" class="btn btn-ghost btn-sm" style="width:100%; margin-top:12px; height:34px; font-size:12px; display:flex; align-items:center; justify-content:center; gap:6px;">
                      <i data-lucide="eye" style="width:14px; height:14px;"></i> View Submission Details
                    </button>
                  ` : `
                    <div style="background:rgba(239,68,68,0.05); padding:10px; border-radius:8px; border:1px solid rgba(239,68,68,0.15); font-size:12px; color:var(--color-text-secondary); line-height:1.4;">
                      No checklist submitted for June 2026. Submit now to accumulate points.
                    </div>
                    <button id="dash-points-submit-btn" class="btn btn-primary btn-sm" style="width:100%; margin-top:12px; height:34px; font-size:12px; display:flex; align-items:center; justify-content:center; gap:6px;">
                      <i data-lucide="clipboard-check" style="width:14px; height:14px;"></i> Submit Checklist
                    </button>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Links -->
          <div class="stagger-enter" style="animation-delay:0.3s;margin-top:24px;">
            <h3 style="color:var(--color-text-primary);margin-bottom:16px;font-size:16px;">
              <i data-lucide="compass" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;"></i> Quick Links
            </h3>
            <div class="grid-3">
              ${[
                { icon: 'wallet', label: 'Finance', desc: 'Track income & expenses', path: '/club/finance', color: '#14b8a6' },
                { icon: 'users', label: 'Members', desc: 'Manage club members', path: '/club/members', color: '#3d8bff' },
                { icon: 'folder-kanban', label: 'Projects', desc: 'Service projects & activities', path: '/club/projects', color: '#8b5cf6' },
                { icon: 'megaphone', label: 'Announcements', desc: 'District announcements', path: '/club/announcements', color: '#f59e0b' },
                { icon: 'calendar-days', label: 'Events', desc: 'Upcoming events & registration', path: '/club/events', color: '#ef4444' },
                { icon: 'trophy', label: 'Points', desc: 'Performance scoring', path: '/club/points', color: '#00d4ff' },
              ].map(link => `
                <a href="#${link.path}" class="card hover-lift water-effect" style="cursor:pointer;text-decoration:none;padding:20px;">
                  <div style="display:flex;align-items:center;gap:14px;">
                    <div style="width:44px;height:44px;border-radius:12px;display:flex;align-items:center;justify-content:center;background:${link.color}15;color:${link.color};">
                      <i data-lucide="${link.icon}" style="width:22px;height:22px;"></i>
                    </div>
                    <div>
                      <div style="font-weight:600;color:var(--color-text-primary);font-size:14px;">${link.label}</div>
                      <div style="font-size:12px;color:var(--color-text-muted);margin-top:2px;">${link.desc}</div>
                    </div>
                  </div>
                </a>
              `).join('')}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  initSidebar();
  initHeader();

  // Navigation handlers for points tab redirection
  document.getElementById('dash-points-details-link')?.addEventListener('click', (e) => {
    setPointsActiveTab('overview');
  });

  document.getElementById('dash-points-submit-btn')?.addEventListener('click', (e) => {
    setPointsActiveTab('submit');
    router.navigate('/club/points');
  });

  document.getElementById('dash-points-history-btn')?.addEventListener('click', (e) => {
    setPointsActiveTab('history');
    router.navigate('/club/points');
  });

  // Finance mini chart
  const monthlyData = {};
  finances.forEach(f => {
    const month = new Date(f.date).toLocaleString('default', { month: 'short' });
    if (!monthlyData[month]) monthlyData[month] = { income: 0, expenses: 0 };
    if (f.type === 'income') monthlyData[month].income += f.amount;
    else monthlyData[month].expenses += f.amount;
  });

  const months = Object.keys(monthlyData);
  if (months.length > 0) {
    createChart('dashboard-finance-chart', 'bar', {
      labels: months,
      datasets: [
        { label: 'Income', data: months.map(m => monthlyData[m].income), backgroundColor: '#14b8a699', borderColor: '#14b8a6', borderWidth: 1, borderRadius: 6 },
        { label: 'Expenses', data: months.map(m => monthlyData[m].expenses), backgroundColor: '#ef444499', borderColor: '#ef4444', borderWidth: 1, borderRadius: 6 },
      ]
    }, {
      plugins: { legend: { display: true, position: 'top', labels: { boxWidth: 12, padding: 10, font: { size: 11 } } } },
      scales: { y: { ticks: { callback: v => 'Rs.' + (v / 1000) + 'k' } } }
    });
  }

  return () => {
    destroyAllCharts();
  };
}
