// ============================================
// LEO NEXUS PORTAL — CLUB DASHBOARD
// Modern SaaS / LeBank Inspired Layout
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { setPointsActiveTab } from './points.js';
import { renderCalendarWidget } from '../../components/calendar-widget.js';

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
  const currentSubmission = submissions.find(s => s.month === currentMonth && s.status !== 'rejected' && s.status !== 'reversed');

  const activeMembers = members.filter(m => m.status === 'active').length;
  const activeProjects = projects.filter(p => p.status === 'in_progress').length;
  const upcomingEvents = eventRegs.filter(er => new Date(er.event.date) > new Date()).length;

  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 3);

  const priorityColors = {
    urgent: 'badge-danger',
    important: 'badge-warning',
    normal: 'badge-primary'
  };

  const leaderboard = store.getLeaderboard();
  const clubRank = leaderboard.findIndex(c => c.id === clubId) + 1;

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Dashboard', ['Dashboard'])}
        <div class="page-content page-enter">

          <!-- Welcome Banner (LeBank Modern Hero Card) -->
          <div class="card" style="background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.03) 100%); border-color: rgba(37,99,235,0.18); margin-bottom: 24px; padding: 28px 32px;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:18px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                  <span class="section-badge">Club Portal</span>
                  <span class="badge ${club.status === 'active' ? 'badge-success' : 'badge-warning'}">${club.status}</span>
                </div>
                <h1 style="font-size:1.75rem; font-weight:800; margin:0 0 6px;">
                  ${club.name}
                </h1>
                <p style="margin:0; color:var(--color-text-secondary); font-size:var(--text-sm);">
                  ${club.code} · ${club.zone} · ${club.region} · President: <strong>${club.president}</strong>
                </p>
              </div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="location.hash='/club/projects'">
                  <i data-lucide="plus-circle" style="width:16px;height:16px"></i> New Project
                </button>
                <button class="btn btn-secondary" onclick="location.hash='/club/profile'">
                  <i data-lucide="user" style="width:16px;height:16px"></i> Club Profile
                </button>
              </div>
            </div>
          </div>

          <!-- Stats Grid (Squircle Icons + Bold Figures) -->
          <div class="stats-grid">
            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(37,99,235,0.1); color:#2563eb;">
                <i data-lucide="users"></i>
              </div>
              <div class="stat-value">${activeMembers}</div>
              <div class="stat-label">Active Members</div>
              <div class="stat-change positive">
                <i data-lucide="users" style="width:12px;height:12px"></i> ${members.length} total members
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(2,132,199,0.1); color:#0284c7;">
                <i data-lucide="folder-kanban"></i>
              </div>
              <div class="stat-value">${activeProjects}</div>
              <div class="stat-label">Active Projects</div>
              <div class="stat-change positive">
                <i data-lucide="check-circle" style="width:12px;height:12px"></i> ${projects.filter(p => p.status === 'completed').length} completed
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(16,185,129,0.1); color:#10b981;">
                <i data-lucide="calendar-days"></i>
              </div>
              <div class="stat-value">${upcomingEvents}</div>
              <div class="stat-label">Upcoming Events</div>
              <div class="stat-change positive">
                <i data-lucide="check" style="width:12px;height:12px"></i> ${eventRegs.filter(er => er.registration).length} registered
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(245,158,11,0.1); color:#f59e0b;">
                <i data-lucide="trophy"></i>
              </div>
              <div class="stat-value">${totalPoints.toLocaleString()}</div>
              <div class="stat-label">Club Points</div>
              <div class="stat-change ${clubRank <= 3 ? 'positive' : ''}">
                <i data-lucide="award" style="width:12px;height:12px"></i> District Rank #${clubRank}
              </div>
            </div>
          </div>

          <!-- Signature LeBank High-Impact Dark Container (Club Treasury Pulse) -->
          <div class="feature-dark-container" style="margin-bottom:28px;">
            <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:36px; align-items:center;">
              <div>
                <span class="section-badge" style="background:rgba(37,99,235,0.25); color:#60a5fa; border-color:rgba(37,99,235,0.4); margin-bottom:12px;">
                  TREASURY &amp; SERVICE COMMAND
                </span>
                <h2 style="font-size:1.75rem; font-weight:800; color:white; margin:0 0 10px;">
                  Financial Stability &amp; Points Standing
                </h2>
                <p style="color:#94a3b8; font-size:var(--text-sm); line-height:1.6; margin-bottom:20px;">
                  Maintain complete transparency in dues collection, project budgeting, and monthly criteria score submissions.
                </p>

                <div style="display:flex; flex-wrap:wrap; gap:12px;">
                  <button class="btn btn-primary" onclick="location.hash='/club/finance'">
                    <i data-lucide="wallet" style="width:15px;height:15px"></i> Open Finance Ledger
                  </button>
                  <button class="btn btn-secondary" onclick="location.hash='/club/members'" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:white;">
                    <i data-lucide="users" style="width:15px;height:15px"></i> Manage Roster
                  </button>
                  <button class="btn btn-secondary" onclick="location.hash='/club/points'" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:white;">
                    <i data-lucide="trophy" style="width:15px;height:15px"></i> Submit Points
                  </button>
                </div>
              </div>

              <!-- Right preview summary box inside dark card -->
              <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:var(--radius-xl); padding:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <span style="font-size:12px; font-weight:700; color:#cbd5e1; text-transform:uppercase;">Net Available Funds</span>
                  <span class="badge badge-success" style="font-size:10px;">Verified</span>
                </div>
                <div style="font-size:2rem; font-weight:800; color:white; margin-bottom:12px;">
                  Rs. ${financeSummary.balance.toLocaleString()}
                </div>
                <div style="display:flex; justify-content:space-between; border-top:1px solid rgba(255,255,255,0.1); padding-top:12px; font-size:12px;">
                  <span style="color:#4ade80;">Income: Rs. ${financeSummary.income.toLocaleString()}</span>
                  <span style="color:#f87171;">Expense: Rs. ${financeSummary.expenses.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- 3-Column Feature Cards Grid -->
          <div class="grid-3" style="margin-bottom:28px;">
            <!-- Recent Announcements -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="megaphone" style="width:18px;height:18px;color:var(--color-primary)"></i>
                  Recent Announcements
                </h3>
                <a href="#/club/announcements" class="btn btn-ghost btn-sm">View All</a>
              </div>
              <div class="card-body">
                ${recentAnnouncements.length === 0 ? '<p style="color:var(--color-text-muted)">No announcements yet.</p>' :
                  recentAnnouncements.map(a => {
                    const isRead = (a.read || []).includes(clubId);
                    return `
                      <div style="padding:14px 0; border-bottom:1px solid var(--color-border-subtle); ${!isRead ? 'border-left:3px solid var(--color-primary); padding-left:12px;' : ''}">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                          <div>
                            <span class="badge ${priorityColors[a.priority]}" style="font-size:10px; margin-bottom:6px;">${a.priority}</span>
                            <h4 style="font-size:14px; font-weight:700; color:var(--color-text-primary); margin-bottom:4px;">${a.title}</h4>
                            <p style="font-size:12px; color:var(--color-text-secondary); line-height:1.4;">${a.content.substring(0, 95)}...</p>
                          </div>
                        </div>
                        <div style="display:flex; justify-content:space-between; margin-top:8px; font-size:11px; color:var(--color-text-muted);">
                          <span>${a.author}</span>
                          <span>${new Date(a.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    `;
                  }).join('')
                }
              </div>
            </div>

            <!-- Club Balance Summary -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="wallet" style="width:18px;height:18px;color:#10b981"></i>
                  Treasury Chart
                </h3>
                <a href="#/club/finance" class="btn btn-ghost btn-sm">Details</a>
              </div>
              <div class="card-body">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:16px;">
                  <div style="padding:12px; background:rgba(16,185,129,0.08); border-radius:12px; text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); font-weight:600;">Total Inflow</div>
                    <div style="font-size:16px; font-weight:800; color:#10b981;">Rs. ${financeSummary.income.toLocaleString()}</div>
                  </div>
                  <div style="padding:12px; background:rgba(239,68,68,0.08); border-radius:12px; text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); font-weight:600;">Total Outflow</div>
                    <div style="font-size:16px; font-weight:800; color:#ef4444;">Rs. ${financeSummary.expenses.toLocaleString()}</div>
                  </div>
                </div>
                <div class="chart-container" style="height:170px;">
                  <canvas id="dashboard-finance-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Club Performance Points Status -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="trophy" style="width:18px;height:18px;color:#f59e0b;"></i>
                  Points Standing
                </h3>
                <a href="#/club/points" id="dash-points-details-link" class="btn btn-ghost btn-sm">Details</a>
              </div>
              <div class="card-body" style="display:flex; flex-direction:column; gap:16px;">
                <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px;">
                  <div style="padding:12px; background:rgba(245,158,11,0.08); border-radius:12px; text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); font-weight:600;">District Rank</div>
                    <div style="font-size:18px; font-weight:800; color:#f59e0b;">Rank #${clubRank}</div>
                  </div>
                  <div style="padding:12px; background:var(--color-primary-alpha); border-radius:12px; text-align:center;">
                    <div style="font-size:11px; color:var(--color-text-muted); font-weight:600;">Total Score</div>
                    <div style="font-size:18px; font-weight:800; color:var(--color-primary);">${totalPoints.toLocaleString()}</div>
                  </div>
                </div>

                <div style="border-top:1px solid var(--color-border); padding-top:14px;">
                  <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                    <span style="font-size:13px; font-weight:700; color:var(--color-text-primary);">June 2026 Checklist</span>
                    ${currentSubmission ? `
                      <span class="badge badge-${currentSubmission.status === 'approved' ? 'success' : 'warning'}" style="font-size:10px;">
                        ${currentSubmission.status.toUpperCase()}
                      </span>
                    ` : `
                      <span class="badge badge-danger" style="font-size:10px;">
                        PENDING
                      </span>
                    `}
                  </div>

                  ${currentSubmission ? `
                    <div style="background:var(--color-surface-muted); padding:12px; border-radius:12px; font-size:12px;">
                      <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span style="color:var(--color-text-muted);">Points Claimed:</span>
                        <strong style="color:var(--color-text-primary);">${currentSubmission.totalPoints.toLocaleString()} pts</strong>
                      </div>
                      <div style="display:flex; justify-content:space-between;">
                        <span style="color:var(--color-text-muted);">Criteria Completed:</span>
                        <strong style="color:var(--color-text-primary);">${currentSubmission.checkedCriteria.length} items</strong>
                      </div>
                    </div>
                    <button id="dash-points-history-btn" class="btn btn-secondary btn-sm" style="width:100%; margin-top:12px; justify-content:center;">
                      <i data-lucide="eye" style="width:14px; height:14px;"></i> View Submission Details
                    </button>
                  ` : `
                    <div style="background:var(--color-danger-bg); padding:12px; border-radius:12px; font-size:12px; color:var(--color-danger-text); line-height:1.4;">
                      Checklist not submitted for June 2026. Submit now to earn criteria points.
                    </div>
                    <button id="dash-points-submit-btn" class="btn btn-primary btn-sm" style="width:100%; margin-top:12px; justify-content:center;">
                      <i data-lucide="clipboard-check" style="width:14px; height:14px;"></i> Submit Checklist Now
                    </button>
                  `}
                </div>
              </div>
            </div>
          </div>

          <!-- Calendar Widget -->
          <div style="margin-bottom:28px;">
            ${renderCalendarWidget()}
          </div>

          <!-- Quick Navigation Links (LeBank Rounded Grid) -->
          <div>
            <h3 style="color:var(--color-text-primary); margin-bottom:16px; font-size:16px; font-weight:700;">
              <i data-lucide="compass" style="width:18px;height:18px;vertical-align:middle;margin-right:6px;color:var(--color-primary);"></i> Portal Modules
            </h3>
            <div class="grid-3">
              ${[
                { icon: 'wallet', label: 'Finance & Ledger', desc: 'Track transactions & dues', path: '/club/finance', color: '#10b981' },
                { icon: 'users', label: 'Member Directory', desc: 'Manage member roster & status', path: '/club/members', color: '#2563eb' },
                { icon: 'folder-kanban', label: 'Projects & Impact', desc: 'Community service activities', path: '/club/projects', color: '#7c3aed' },
                { icon: 'megaphone', label: 'Announcements', desc: 'District circulars & updates', path: '/club/announcements', color: '#f59e0b' },
                { icon: 'calendar-days', label: 'Events & Conferences', desc: 'Registration & schedule', path: '/club/events', color: '#ef4444' },
                { icon: 'trophy', label: 'Points & Criteria', desc: 'Score tracking & criteria', path: '/club/points', color: '#0284c7' },
              ].map(link => `
                <a href="#${link.path}" class="card" style="text-decoration:none; padding:22px; cursor:pointer;">
                  <div style="display:flex; align-items:center; gap:14px;">
                    <div style="width:48px; height:48px; border-radius:var(--radius-squircle); display:flex; align-items:center; justify-content:center; background:${link.color}15; color:${link.color}; flex-shrink:0;">
                      <i data-lucide="${link.icon}" style="width:24px;height:24px;"></i>
                    </div>
                    <div>
                      <div style="font-weight:700; color:var(--color-text-primary); font-size:14px;">${link.label}</div>
                      <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">${link.desc}</div>
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
        { label: 'Income', data: months.map(m => monthlyData[m].income), backgroundColor: '#10b981', borderRadius: 6 },
        { label: 'Expenses', data: months.map(m => monthlyData[m].expenses), backgroundColor: '#ef4444', borderRadius: 6 },
      ]
    }, {
      plugins: { legend: { display: true, position: 'top', labels: { boxWidth: 10, padding: 8, font: { size: 11, weight: '600' } } } },
      scales: { y: { ticks: { callback: v => 'Rs.' + (v / 1000) + 'k' } } }
    });
  }

  return () => {
    destroyAllCharts();
  };
}
