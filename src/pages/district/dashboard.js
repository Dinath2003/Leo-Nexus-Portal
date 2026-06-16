// ============================================
// LEO NEXUS PORTAL — DISTRICT DASHBOARD
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';

export function renderDistrictDashboard() {
  const app = document.getElementById('app');
  const stats = store.getDistrictStats();
  const leaderboard = store.getLeaderboard();
  const announcements = store.getAll('announcements')
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);
  const events = store.getAll('events')
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 3);
  const projects = store.getAll('projects')
    .filter(p => p.status === 'in_progress')
    .slice(0, 3);

  // Compile recent activity from announcements, events, projects
  const activities = [
    ...announcements.map(a => ({
      icon: 'megaphone',
      color: a.priority === 'urgent' ? '#ef4444' : a.priority === 'important' ? '#f59e0b' : '#14b8a6',
      title: a.title,
      subtitle: `by ${a.author}`,
      date: a.createdAt,
      type: 'Announcement'
    })),
    ...store.getAll('events').map(e => ({
      icon: 'calendar-days',
      color: '#3d8bff',
      title: e.name,
      subtitle: e.venue,
      date: e.date,
      type: 'Event'
    })),
    ...store.getAll('projects').filter(p => p.status === 'completed').map(p => ({
      icon: 'check-circle',
      color: '#14b8a6',
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
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Welcome Banner -->
          <div class="card stagger-enter" style="background: linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,212,255,0.08)); border: 1px solid rgba(0,212,255,0.2); margin-bottom: 1.5rem;">
            <div class="card-body" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:1rem;">
              <div>
                <h2 style="margin:0 0 0.25rem; font-size:1.5rem;">Welcome back, ${auth.currentUser?.name || 'Governor'} 👋</h2>
                <p style="margin:0; color:var(--color-text-secondary);">Here's what's happening across your district today.</p>
              </div>
              <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                <button class="btn btn-primary" onclick="location.hash='/district/reports'">
                  <i data-lucide="bar-chart-3" style="width:16px;height:16px"></i> View Reports
                </button>
                <button class="btn btn-secondary" onclick="location.hash='/district/announcements'">
                  <i data-lucide="megaphone" style="width:16px;height:16px"></i> Announce
                </button>
              </div>
            </div>
          </div>

          <!-- Stats Grid -->
          <div class="stats-grid stagger-enter">
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background: rgba(0,102,255,0.12);">
                <i data-lucide="building-2" style="color:#0066ff"></i>
              </div>
              <div class="stat-value">${stats.totalClubs.toLocaleString()}</div>
              <div class="stat-label">Total Clubs</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${stats.activeClubs} active
              </div>
            </div>

            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background: rgba(0,212,255,0.12);">
                <i data-lucide="users" style="color:#00d4ff"></i>
              </div>
              <div class="stat-value">${stats.activeMembers.toLocaleString()}</div>
              <div class="stat-label">Active Members</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> of ${stats.totalMembers} total
              </div>
            </div>

            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background: rgba(20,184,166,0.12);">
                <i data-lucide="folder-check" style="color:#14b8a6"></i>
              </div>
              <div class="stat-value">${stats.completedProjects.toLocaleString()}</div>
              <div class="stat-label">Completed Projects</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${completionRate}% completion
              </div>
            </div>

            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background: rgba(139,92,246,0.12);">
                <i data-lucide="trophy" style="color:#8b5cf6"></i>
              </div>
              <div class="stat-value">${stats.avgPoints.toLocaleString()}</div>
              <div class="stat-label">Avg Club Points</div>
              <div class="stat-change positive">
                <i data-lucide="target" style="width:12px;height:12px"></i> out of 100
              </div>
            </div>
          </div>

          <!-- Charts Row -->
          <div class="grid-2 stagger-enter" style="margin-top:1.5rem;">
            <!-- Leaderboard Chart -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="bar-chart-3" style="width:18px;height:18px;color:var(--color-primary)"></i>
                  Club Performance Leaderboard
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:280px;">
                  <canvas id="leaderboard-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="activity" style="width:18px;height:18px;color:var(--color-cyan)"></i>
                  Recent Activity
                </h3>
              </div>
              <div class="card-body" style="padding:0;">
                <div style="max-height:310px; overflow-y:auto;">
                  ${activities.map(act => `
                    <div style="display:flex; align-items:flex-start; gap:0.75rem; padding:0.85rem 1.25rem; border-bottom:1px solid var(--color-border);">
                      <div style="width:32px; height:32px; border-radius:8px; background:${act.color}15; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                        <i data-lucide="${act.icon}" style="width:15px;height:15px;color:${act.color}"></i>
                      </div>
                      <div style="flex:1; min-width:0;">
                        <div style="font-size:0.82rem; font-weight:500; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${act.title}</div>
                        <div style="font-size:0.72rem; color:var(--color-text-muted); margin-top:2px;">${act.subtitle}</div>
                      </div>
                      <div style="flex-shrink:0;">
                        <span class="badge badge-${act.type === 'Announcement' ? 'warning' : act.type === 'Event' ? 'primary' : 'success'}" style="font-size:0.65rem;">${act.type}</span>
                        <div style="font-size:0.65rem; color:var(--color-text-muted); margin-top:4px; text-align:right;">${new Date(act.date).toLocaleDateString('en-US', { month:'short', day:'numeric' })}</div>
                      </div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>
          </div>

          <!-- Quick Actions & Upcoming Events -->
          <div class="grid-2 stagger-enter" style="margin-top:1.5rem;">
            <!-- Quick Actions -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="zap" style="width:18px;height:18px;color:#f59e0b"></i>
                  Quick Actions
                </h3>
              </div>
              <div class="card-body">
                <div style="display:grid; grid-template-columns: 1fr 1fr; gap:0.75rem;">
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/clubs" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="plus-circle" style="width:18px;height:18px;color:#0066ff"></i>
                    <span>Add New Club</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/users" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="user-plus" style="width:18px;height:18px;color:#00d4ff"></i>
                    <span>Add User</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/announcements" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="send" style="width:18px;height:18px;color:#14b8a6"></i>
                    <span>Send Announcement</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/events" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="calendar-plus" style="width:18px;height:18px;color:#8b5cf6"></i>
                    <span>Create Event</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/points" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="award" style="width:18px;height:18px;color:#f59e0b"></i>
                    <span>Update Points</span>
                  </button>
                  <button class="btn btn-secondary quick-action-btn" data-action="/district/reports" style="justify-content:flex-start; gap:0.5rem; padding:0.75rem 1rem;">
                    <i data-lucide="file-text" style="width:18px;height:18px;color:#ef4444"></i>
                    <span>Generate Report</span>
                  </button>
                </div>
              </div>
            </div>

            <!-- Upcoming Events -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="calendar-days" style="width:18px;height:18px;color:#3d8bff"></i>
                  Upcoming Events
                </h3>
                <a href="#/district/events" class="btn btn-ghost btn-sm">View All</a>
              </div>
              <div class="card-body" style="padding:0;">
                ${events.map(evt => {
                  const d = new Date(evt.date);
                  const totalRegs = (evt.registrations || []).reduce((sum, r) => sum + r.participants.length, 0);
                  return `
                  <div style="display:flex; align-items:center; gap:1rem; padding:0.85rem 1.25rem; border-bottom:1px solid var(--color-border);">
                    <div style="width:48px; height:52px; border-radius:10px; background:linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,212,255,0.08)); display:flex; flex-direction:column; align-items:center; justify-content:center; flex-shrink:0; border:1px solid rgba(0,212,255,0.15);">
                      <span style="font-size:0.65rem; text-transform:uppercase; color:var(--color-primary); font-weight:600;">${d.toLocaleDateString('en-US',{month:'short'})}</span>
                      <span style="font-size:1.1rem; font-weight:700; color:var(--color-text-primary);">${d.getDate()}</span>
                    </div>
                    <div style="flex:1; min-width:0;">
                      <div style="font-weight:600; font-size:0.85rem; color:var(--color-text-primary); white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${evt.name}</div>
                      <div style="font-size:0.72rem; color:var(--color-text-muted); margin-top:2px;">
                        <i data-lucide="map-pin" style="width:11px;height:11px;display:inline-block;vertical-align:middle;margin-right:3px"></i>${evt.venue}
                      </div>
                    </div>
                    <div style="text-align:right; flex-shrink:0;">
                      <span class="badge badge-${evt.status === 'open' ? 'success' : 'warning'}">${evt.status}</span>
                      <div style="font-size:0.7rem; color:var(--color-text-muted); margin-top:4px;">${totalRegs}/${evt.capacity} reg.</div>
                    </div>
                  </div>`;
                }).join('')}
                ${events.length === 0 ? '<div style="padding:2rem; text-align:center; color:var(--color-text-muted);">No upcoming events</div>' : ''}
              </div>
            </div>
          </div>

          <!-- Top Clubs Table -->
          <div class="card stagger-enter hover-lift" style="margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title">
                <i data-lucide="medal" style="width:18px;height:18px;color:#f59e0b"></i>
                Top Performing Clubs
              </h3>
              <a href="#/district/points" class="btn btn-ghost btn-sm">View All</a>
            </div>
            <div class="card-body" style="padding:0;">
              <div class="data-table-wrapper">
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
                      const clubProjects = store.getClubProjects(club.id).length;
                      const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i+1}`;
                      return `
                        <tr style="cursor:pointer;" onclick="location.hash='/district/clubs'">
                          <td style="font-weight:700; font-size:1.1rem;">${medal}</td>
                          <td>
                            <div style="font-weight:600;">${club.name}</div>
                            <div style="font-size:0.72rem; color:var(--color-text-muted);">${club.code}</div>
                          </td>
                          <td>${club.zone}</td>
                          <td>${club.memberCount}</td>
                          <td>${clubProjects}</td>
                          <td><span style="font-weight:700; color:var(--color-primary);">${club.totalPoints}</span></td>
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

  // Initialize Leaderboard Chart
  createChart('leaderboard-chart', 'bar', {
    labels: leaderboard.map(c => c.name.replace('Leo Club of ', '')),
    datasets: [{
      label: 'Total Points',
      data: leaderboard.map(c => c.totalPoints)
    }]
  }, {
    indexAxis: 'y',
    plugins: {
      legend: { display: false }
    },
    scales: {
      x: { beginAtZero: true }
    }
  });

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
