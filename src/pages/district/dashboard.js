// ============================================
// LEO NEXUS PORTAL — DISTRICT DASHBOARD
// Modern SaaS / LeBank Inspired Layout
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { renderCalendarWidget } from '../../components/calendar-widget.js';

export function renderDistrictDashboard() {
  const app = document.getElementById('app');
  const stats = store.getDistrictStats();
  const leaderboard = store.getLeaderboard();
  const maxLeaderboardPoints = leaderboard.length > 0 ? Math.max(1, leaderboard[0].totalPoints) : 1;
  const announcements = store.getAll('announcements')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const events = store.getAll('events')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  const projects = store.getAll('projects')
    .filter(p => p.status === 'in_progress')
    .slice(0, 3);

  // Compile recent activity
  const activities = [
    ...announcements.map(a => ({
      icon: 'megaphone',
      color: a.priority === 'urgent' ? '#ef4444' : a.priority === 'important' ? '#f59e0b' : '#2563eb',
      title: a.title,
      subtitle: `by ${a.author}`,
      date: a.createdAt,
      type: 'Announcement'
    })),
    ...store.getAll('events').map(e => ({
      icon: 'calendar-days',
      color: '#0284c7',
      title: e.name,
      subtitle: e.venue,
      date: e.date,
      type: 'Event'
    })),
    ...store.getAll('projects').filter(p => p.status === 'completed').map(p => ({
      icon: 'check-circle',
      color: '#10b981',
      title: `${p.name} completed`,
      subtitle: store.getById('clubs', p.clubId)?.name || '',
      date: p.endDate,
      type: 'Project'
    }))
  ].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 6);

  const completionRate = stats.totalProjects > 0
    ? Math.round((stats.completedProjects / stats.totalProjects) * 100)
    : 0;

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Dashboard', ['Overview', 'Dashboard'])}
        <div class="page-content page-enter">

          <!-- Welcome Banner (LeBank Modern Hero Card) -->
          <div class="card" style="background: linear-gradient(135deg, rgba(37,99,235,0.06) 0%, rgba(2,132,199,0.03) 100%); border-color: rgba(37,99,235,0.18); margin-bottom: 24px; padding: 28px 32px;">
            <div style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:18px;">
              <div>
                <div class="section-badge" style="margin-bottom:8px;">
                  <i data-lucide="shield" style="width:12px;height:12px"></i> Executive District Command
                </div>
                <h1 style="font-size:1.75rem; font-weight:800; margin:0 0 6px;">
                  Welcome back, ${auth.currentUser?.name || 'District Governor'} 👋
                </h1>
                <p style="margin:0; color:var(--color-text-secondary); font-size:var(--text-sm);">
                  Real-time operational pulse and performance metrics across Leo District 306.
                </p>
              </div>
              <div style="display:flex; gap:10px; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="location.hash='/district/reports'">
                  <i data-lucide="bar-chart-3" style="width:16px;height:16px"></i> View Reports
                </button>
                <button class="btn btn-secondary" onclick="location.hash='/district/announcements'">
                  <i data-lucide="megaphone" style="width:16px;height:16px"></i> Announce
                </button>
              </div>
            </div>
          </div>

          <!-- Stats Grid (Squircle Icons + Bold Figures) -->
          <div class="stats-grid">
            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(37,99,235,0.1); color:#2563eb;">
                <i data-lucide="building-2"></i>
              </div>
              <div class="stat-value">${stats.totalClubs.toLocaleString()}</div>
              <div class="stat-label">Total Clubs</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${stats.activeClubs} active clubs
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(2,132,199,0.1); color:#0284c7;">
                <i data-lucide="users"></i>
              </div>
              <div class="stat-value">${stats.activeMembers.toLocaleString()}</div>
              <div class="stat-label">Active Members</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> of ${stats.totalMembers} registered
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(16,185,129,0.1); color:#10b981;">
                <i data-lucide="folder-check"></i>
              </div>
              <div class="stat-value">${stats.completedProjects.toLocaleString()}</div>
              <div class="stat-label">Completed Projects</div>
              <div class="stat-change positive">
                <i data-lucide="check-circle" style="width:12px;height:12px"></i> ${completionRate}% success rate
              </div>
            </div>

            <div class="card stat-card">
              <div class="stat-icon" style="background:rgba(124,58,237,0.1); color:#7c3aed;">
                <i data-lucide="trophy"></i>
              </div>
              <div class="stat-value">${stats.avgPoints.toLocaleString()}</div>
              <div class="stat-label">Avg Club Points</div>
              <div class="stat-change positive">
                <i data-lucide="target" style="width:12px;height:12px"></i> of 100 benchmark
              </div>
            </div>
          </div>

          <!-- Signature LeBank High-Impact Dark Container -->
          <div class="feature-dark-container" style="margin-bottom:28px;">
            <div style="display:grid; grid-template-columns: 1.2fr 0.8fr; gap:36px; align-items:center;">
              <div>
                <span class="section-badge" style="background:rgba(37,99,235,0.25); color:#60a5fa; border-color:rgba(37,99,235,0.4); margin-bottom:12px;">
                  DISTRICT PULSE
                </span>
                <h2 style="font-size:1.75rem; font-weight:800; color:white; margin:0 0 10px;">
                  Real-time Governance &amp; Administration
                </h2>
                <p style="color:#94a3b8; font-size:var(--text-sm); line-height:1.6; margin-bottom:20px;">
                  Automated performance metrics, synchronized club records, and instant transparency across all six multiple district councils.
                </p>

                <div style="display:flex; flex-wrap:wrap; gap:12px;">
                  <button class="btn btn-primary" onclick="location.hash='/district/clubs'">
                    <i data-lucide="building-2" style="width:15px;height:15px"></i> Manage Clubs
                  </button>
                  <button class="btn btn-secondary" onclick="location.hash='/district/finance'" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:white;">
                    <i data-lucide="wallet" style="width:15px;height:15px"></i> Treasury Audit
                  </button>
                  <button class="btn btn-secondary" onclick="location.hash='/district/points'" style="background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.2); color:white;">
                    <i data-lucide="award" style="width:15px;height:15px"></i> Points Criteria
                  </button>
                </div>
              </div>

              <!-- Right preview summary box inside dark card -->
              <div style="background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.12); border-radius:var(--radius-xl); padding:24px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
                  <span style="font-size:12px; font-weight:700; color:#cbd5e1; text-transform:uppercase;">Term Health</span>
                  <span class="badge badge-success" style="font-size:10px;">99.4% Synchronized</span>
                </div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:13px; color:#94a3b8;">Active Zones:</span>
                    <span style="font-size:14px; font-weight:700; color:white;">18 Zones</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:13px; color:#94a3b8;">Monthly Submissions:</span>
                    <span style="font-size:14px; font-weight:700; color:#38bdf8;">86 Clubs Filed</span>
                  </div>
                  <div style="display:flex; justify-content:space-between; align-items:center;">
                    <span style="font-size:13px; color:#94a3b8;">District Dues Cleared:</span>
                    <span style="font-size:14px; font-weight:700; color:#4ade80;">91.2%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts & Activity Row -->
          <div class="grid-2" style="margin-bottom:28px;">
            <!-- Club Ranking Board -->
            <div class="card" style="display:flex; flex-direction:column;">
              <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <div>
                  <h3 class="card-title" style="display:flex; align-items:center; gap:8px; margin:0;">
                    <i data-lucide="trophy" style="width:18px;height:18px;color:#f59e0b"></i>
                    Club Ranking Board
                  </h3>
                  <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Official Performance Standings</div>
                </div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="badge badge-primary" style="font-size:10px;">2026/2027</span>
                  <a href="#/district/points" class="btn btn-ghost btn-xs" style="color:var(--color-primary); font-weight:600; padding:4px 8px;">
                    View All <i data-lucide="arrow-right" style="width:12px;height:12px;vertical-align:-1px;"></i>
                  </a>
                </div>
              </div>
              <div class="card-body" style="padding:0; flex:1;">
                <div style="max-height:310px; overflow-y:auto;">
                  ${leaderboard.length === 0 ? `
                    <div style="padding:2rem; text-align:center; color:var(--color-text-muted);">No club rankings available</div>
                  ` : leaderboard.map((club, i) => {
                    const rank = i + 1;
                    const pct = Math.max(8, Math.min(100, Math.round((club.totalPoints / maxLeaderboardPoints) * 100)));
                    const clubProjects = store.getClubCompletedProjectsCount(club.id);
                    
                    let rankBadgeHtml = '';
                    if (rank === 1) {
                      rankBadgeHtml = `
                        <div style="width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg, #fef08a, #f59e0b); color:#78350f; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(245,158,11,0.3); flex-shrink:0;">
                          🥇
                        </div>
                      `;
                    } else if (rank === 2) {
                      rankBadgeHtml = `
                        <div style="width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg, #f1f5f9, #94a3b8); color:#1e293b; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(148,163,184,0.3); flex-shrink:0;">
                          🥈
                        </div>
                      `;
                    } else if (rank === 3) {
                      rankBadgeHtml = `
                        <div style="width:34px; height:34px; border-radius:10px; background:linear-gradient(135deg, #fed7aa, #ea580c); color:#7c2d12; font-weight:800; font-size:13px; display:flex; align-items:center; justify-content:center; box-shadow:0 3px 8px rgba(234,88,12,0.3); flex-shrink:0;">
                          🥉
                        </div>
                      `;
                    } else {
                      rankBadgeHtml = `
                        <div style="width:34px; height:34px; border-radius:10px; background:var(--color-surface-muted); border:1px solid var(--color-border); color:var(--color-text-secondary); font-weight:700; font-size:13px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                          #${rank}
                        </div>
                      `;
                    }

                    return `
                      <div class="ranking-row" style="display:flex; align-items:center; justify-content:space-between; gap:14px; padding:12px 20px; border-bottom:1px solid var(--color-border-subtle); transition:background var(--transition-fast); cursor:pointer;" onclick="location.hash='/district/clubs'">
                        <div style="display:flex; align-items:center; gap:12px; flex:1; min-width:0;">
                          ${rankBadgeHtml}
                          <div style="flex:1; min-width:0;">
                            <div style="display:flex; align-items:center; gap:8px;">
                              <span style="font-weight:700; font-size:13.5px; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">
                                ${club.name}
                              </span>
                            </div>
                            <div style="display:flex; align-items:center; gap:8px; font-size:11.5px; color:var(--color-text-muted); margin-top:2px;">
                              <span>${club.zone}</span>
                              <span>•</span>
                              <span>${club.memberCount} members</span>
                              <span>•</span>
                              <span>${clubProjects} projects</span>
                            </div>
                            <div style="width:100%; max-width:180px; height:5px; background:var(--color-surface-muted); border-radius:9999px; overflow:hidden; margin-top:6px;">
                              <div style="width:${pct}%; height:100%; background:linear-gradient(90deg, var(--color-primary), #38bdf8); border-radius:9999px;"></div>
                            </div>
                          </div>
                        </div>

                        <div style="text-align:right; flex-shrink:0;">
                          <div style="font-size:15px; font-weight:800; color:var(--color-primary);">
                            ${club.totalPoints.toLocaleString()} <span style="font-size:11px; font-weight:600; color:var(--color-text-muted);">pts</span>
                          </div>
                          <span class="badge badge-${club.status === 'active' ? 'success' : 'danger'}" style="font-size:10px; padding:2px 8px; margin-top:3px;">
                            ${club.status}
                          </span>
                        </div>
                      </div>
                    `;
                  }).join('')}
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="activity" style="width:18px;height:18px;color:var(--color-primary)"></i>
                  Recent Activity
                </h3>
              </div>
              <div class="card-body" style="padding:0;">
                <div style="max-height:310px; overflow-y:auto;">
                  ${activities.map(act => `
                    <div style="display:flex; align-items:flex-start; gap:12px; padding:14px 20px; border-bottom:1px solid var(--color-border-subtle);">
                      <div style="width:36px; height:36px; border-radius:10px; background:${act.color}15; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="${act.icon}" style="width:16px;height:16px;color:${act.color}"></i>
                      </div>
                      <div style="flex:1; min-width:0;">
                        <div style="font-size:13px; font-weight:600; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${act.title}</div>
                        <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">${act.subtitle}</div>
                      </div>
                      <div style="flex-shrink:0; text-align:right;">
                        <span class="badge badge-${act.type === 'Announcement' ? 'warning' : act.type === 'Event' ? 'primary' : 'success'}" style="font-size:10px;">${act.type}</span>
                        <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">${new Date(act.date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Upcoming Events Row -->
          <div class="grid-2" style="margin-bottom:28px;">
            <!-- Quick Actions -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="zap" style="width:18px;height:18px;color:#f59e0b"></i>
                  Quick Actions
                </h3>
              </div>
              <div class="card-body">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:10px;">
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/clubs" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="plus-circle" style="width:16px;height:16px;color:#2563eb"></i>
                    <span>Add New Club</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/users" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="user-plus" style="width:16px;height:16px;color:#0284c7"></i>
                    <span>Add User</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/announcements" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="send" style="width:16px;height:16px;color:#0d9488"></i>
                    <span>Send Announcement</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/events" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="calendar-plus" style="width:16px;height:16px;color:#7c3aed"></i>
                    <span>Create Event</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/points" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="award" style="width:16px;height:16px;color:#f59e0b"></i>
                    <span>Update Points</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/reports" style="justify-content:flex-start; gap:8px; padding:12px 14px;">
                    <i data-lucide="file-text" style="width:16px;height:16px;color:#ef4444"></i>
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Upcoming Events -->
            <div class="card">
              <div class="card-header">
                <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                  <i data-lucide="calendar-days" style="width:18px;height:18px;color:#2563eb"></i>
                  Upcoming Events
                </h3>
                <a href="#/district/events" class="btn btn-ghost btn-sm">View All</a>
              </div>
              <div class="card-body" style="padding:0;">
                ${events.map(evt => {
                  const d = new Date(evt.date);
                  const totalRegs = (evt.registrations || []).reduce((sum, r) => sum + r.participants.length, 0);
                  return `
                  <div style="display:flex; align-items:center; gap:14px; padding:14px 20px; border-bottom:1px solid var(--color-border-subtle);">
                    <div style="width:48px; height:52px; border-radius:12px; background:var(--color-primary-alpha); display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0;">
                      <span style="font-size:10px; text-transform:uppercase; color:var(--color-primary); font-weight:700;">${d.toLocaleDateString('en-US',{month:'short'})}</span>
                      <span style="font-size:1.15rem; font-weight:800; color:var(--color-text-primary); line-height:1;">${d.getDate()}</span>
                    </div>
                    <div style="flex:1; min-width:0;">
                      <div style="font-weight:700; font-size:13px; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${evt.name}</div>
                      <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">
                        <i data-lucide="map-pin" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:3px"></i>${evt.venue}
                      </div>
                    </div>
                    <div style="text-align:right; flex-shrink:0;">
                      <span class="badge badge-${evt.status === 'open' ? 'success' : 'warning'}">${evt.status}</span>
                      <div style="font-size:11px; color:var(--color-text-muted); margin-top:4px;">${totalRegs}/${evt.capacity} reg.</div>
                    </div>
                  </div>`;
                }).join('')}
                ${events.length === 0 ? '<div style="padding:2rem; text-align:center; color:var(--color-text-muted);">No upcoming events</div>' : ''}
              </div>
            </div>
          </div>

          <!-- Calendar Widget -->
          <div style="margin-bottom:28px;">
            ${renderCalendarWidget()}
          </div>

          <!-- Top Clubs Table -->
          <div class="card">
            <div class="card-header">
              <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
                <i data-lucide="medal" style="width:18px;height:18px;color:#f59e0b"></i>
                Top Performing Clubs
              </h3>
              <a href="#/district/points" class="btn btn-ghost btn-sm">View Leaderboard</a>
            </div>
            <div class="card-body" style="padding:0;">
              <div class="data-table-wrapper" style="border:none; border-radius:0;">
                <table class="data-table">
                  <thead>
                    <tr>
                      <th style="width:50px">Rank</th>
                      <th>Club Name</th>
                      <th>Zone</th>
                      <th>Members</th>
                      <th>Projects</th>
                      <th>Points</th>
                      <th style="width:120px">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${leaderboard.slice(0, 5).map((club, i) => {
                      const clubProjects = store.getClubCompletedProjectsCount(club.id);
                      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
                      return `
                        <tr style="cursor:pointer;" onclick="location.hash='/district/clubs'">
                          <td style="font-weight:700; font-size:1.1rem;">${medal}</td>
                          <td>
                            <div style="font-weight:700; color:var(--color-text-primary);">${club.name}</div>
                            <div style="font-size:11px; color:var(--color-text-muted);">${club.code}</div>
                          </td>
                          <td>${club.zone}</td>
                          <td>${club.memberCount}</td>
                          <td>${clubProjects}</td>
                          <td><span style="font-weight:800; color:var(--color-primary);">${club.totalPoints}</span></td>
                          <td><span class="badge badge-${club.status === 'active' ? 'success' : 'danger'}">${club.status}</span></td>
                        </tr>`;
                    }).join('')}
                  </tbody>
                </table>
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

  // Quick Action Buttons
  document.querySelectorAll('.quick-action-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = btn.dataset.action;
      if (action) router.navigate(action);
    });
  });

  return () => {
    destroyAllCharts();
  };
}
