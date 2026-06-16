// ============================================
// LEO NEXUS PORTAL — DISTRICT REPORTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { renderTable } from '../../components/table.js';

export function renderDistrictReports() {
  const app = document.getElementById('app');
  const stats = store.getDistrictStats();
  const clubs = store.getAll('clubs');
  const members = store.getAll('members');
  const projects = store.getAll('projects');
  const leaderboard = store.getLeaderboard();

  // Membership by club
  const membershipByClub = clubs.map(c => ({
    name: c.name.replace('Leo Club of ', ''),
    active: store.getClubMembers(c.id).filter(m => m.status === 'active').length,
    inactive: store.getClubMembers(c.id).filter(m => m.status === 'inactive').length,
    total: store.getClubMembers(c.id).length || c.memberCount,
  }));

  // Finance overview per club
  const financeByClub = clubs.map(c => {
    const summary = store.getClubFinanceSummary(c.id);
    return {
      name: c.name.replace('Leo Club of ', ''),
      income: summary.income,
      expenses: summary.expenses,
      balance: summary.balance,
    };
  });

  // Project status breakdown
  const projectStatuses = {
    completed: projects.filter(p => p.status === 'completed').length,
    in_progress: projects.filter(p => p.status === 'in_progress').length,
    planned: projects.filter(p => p.status === 'planned').length,
  };

  // Membership trends (simulate monthly data from join dates)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];
  const memberJoinsByMonth = months.map((m, i) => {
    const monthNum = i + 1;
    return members.filter(mem => {
      const d = new Date(mem.joinDate);
      return d.getMonth() + 1 <= monthNum;
    }).length;
  });

  // Total district finances
  const allFinances = store.getAll('finances');
  const totalIncome = allFinances.filter(f => f.type === 'income').reduce((s, f) => s + f.amount, 0);
  const totalExpenses = allFinances.filter(f => f.type === 'expense').reduce((s, f) => s + f.amount, 0);

  // Project categories
  const projectCategories = {};
  projects.forEach(p => {
    projectCategories[p.category] = (projectCategories[p.category] || 0) + 1;
  });

  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Reports', ['Performance', 'Reports'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Page Header -->
          <div class="page-header stagger-enter">
            <div>
              <h1 style="margin:0;">District Reports</h1>
              <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Comprehensive analytics and performance insights</p>
            </div>
            <div class="page-header-actions">
              <button class="btn btn-secondary" id="print-report-btn">
                <i data-lucide="printer" style="width:16px;height:16px"></i> Print Report
              </button>
            </div>
          </div>

          <!-- Overview Stats -->
          <div class="stats-grid stagger-enter" style="margin-top:1rem;">
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="building-2" style="color:#0066ff"></i></div>
              <div class="stat-value">${stats.activeClubs}/${stats.totalClubs}</div>
              <div class="stat-label">Active Clubs</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${Math.round((stats.activeClubs/stats.totalClubs)*100)}% active
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(0,212,255,0.12);"><i data-lucide="users" style="color:#00d4ff"></i></div>
              <div class="stat-value">${stats.totalMembers.toLocaleString()}</div>
              <div class="stat-label">Total Members</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${stats.activeMembers} active
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="wallet" style="color:#14b8a6"></i></div>
              <div class="stat-value">Rs. ${(totalIncome - totalExpenses).toLocaleString()}</div>
              <div class="stat-label">Net Balance</div>
              <div class="stat-change ${totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'}">
                <i data-lucide="${totalIncome - totalExpenses >= 0 ? 'trending-up' : 'trending-down'}" style="width:12px;height:12px"></i>
                Income: Rs. ${totalIncome.toLocaleString()}
              </div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(139,92,246,0.12);"><i data-lucide="folder-kanban" style="color:#8b5cf6"></i></div>
              <div class="stat-value">${stats.totalProjects}</div>
              <div class="stat-label">Total Projects</div>
              <div class="stat-change positive">
                <i data-lucide="check-circle" style="width:12px;height:12px"></i> ${stats.completedProjects} completed
              </div>
            </div>
          </div>

          <!-- Charts Row 1 -->
          <div class="grid-2 stagger-enter" style="margin-top:1.5rem;">
            <!-- Membership Trends -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="trending-up" style="width:18px;height:18px;color:var(--color-primary)"></i>
                  Membership Growth Trend
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:280px;">
                  <canvas id="membership-trend-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Financial Overview -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="wallet" style="width:18px;height:18px;color:#14b8a6"></i>
                  Financial Overview by Club
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:280px;">
                  <canvas id="finance-overview-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Charts Row 2 -->
          <div class="grid-2 stagger-enter" style="margin-top:1.5rem;">
            <!-- Project Status -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="pie-chart" style="width:18px;height:18px;color:#8b5cf6"></i>
                  Project Completion Rates
                </h3>
              </div>
              <div class="card-body">
                <div style="display:flex; align-items:center; gap:2rem;">
                  <div class="chart-container" style="height:220px; width:220px; flex-shrink:0;">
                    <canvas id="project-status-chart"></canvas>
                  </div>
                  <div style="display:flex; flex-direction:column; gap:1rem;">
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <div style="width:12px; height:12px; border-radius:3px; background:#14b8a6;"></div>
                      <div>
                        <div style="font-weight:600; color:var(--color-text-primary);">${projectStatuses.completed}</div>
                        <div style="font-size:0.72rem; color:var(--color-text-muted);">Completed</div>
                      </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <div style="width:12px; height:12px; border-radius:3px; background:#0066ff;"></div>
                      <div>
                        <div style="font-weight:600; color:var(--color-text-primary);">${projectStatuses.in_progress}</div>
                        <div style="font-size:0.72rem; color:var(--color-text-muted);">In Progress</div>
                      </div>
                    </div>
                    <div style="display:flex; align-items:center; gap:0.75rem;">
                      <div style="width:12px; height:12px; border-radius:3px; background:#f59e0b;"></div>
                      <div>
                        <div style="font-weight:600; color:var(--color-text-primary);">${projectStatuses.planned}</div>
                        <div style="font-size:0.72rem; color:var(--color-text-muted);">Planned</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Project Categories -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="tag" style="width:18px;height:18px;color:#f59e0b"></i>
                  Projects by Category
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:250px;">
                  <canvas id="project-categories-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Club Comparison Table -->
          <div class="card stagger-enter hover-lift" style="margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title">
                <i data-lucide="git-compare" style="width:18px;height:18px;color:var(--color-cyan)"></i>
                Club Comparison
              </h3>
            </div>
            <div class="card-body" style="padding:0;">
              ${renderTable(
                [
                  { label: 'Rank', width: '50px', render: (row, i) => {
                    const idx = leaderboard.findIndex(l => l.id === row.id);
                    return `<span style="font-weight:700;font-size:1rem;">${idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : '#'+(idx+1)}</span>`;
                  }},
                  { label: 'Club', render: row => `
                    <div>
                      <div style="font-weight:600;">${row.name}</div>
                      <div style="font-size:0.7rem;color:var(--color-text-muted);">${row.code} · ${row.zone}</div>
                    </div>
                  `},
                  { label: 'Members', render: row => {
                    const m = store.getClubMembers(row.id);
                    const active = m.filter(x=>x.status==='active').length;
                    return `<span>${active}</span> <span style="font-size:0.7rem;color:var(--color-text-muted);">/ ${m.length || row.memberCount}</span>`;
                  }},
                  { label: 'Projects', render: row => {
                    const p = store.getClubProjects(row.id);
                    const done = p.filter(x=>x.status==='completed').length;
                    return `<span>${done}</span> <span style="font-size:0.7rem;color:var(--color-text-muted);">/ ${p.length}</span>`;
                  }},
                  { label: 'Finance', render: row => {
                    const s = store.getClubFinanceSummary(row.id);
                    return s.balance !== 0
                      ? `<span style="color:${s.balance>=0?'var(--color-success)':'var(--color-danger)'};font-weight:600;">Rs. ${s.balance.toLocaleString()}</span>`
                      : '<span style="color:var(--color-text-muted);">—</span>';
                  }},
                  { label: 'Points', render: row => `<span style="font-weight:700; color:var(--color-primary); font-size:1rem;">${store.getTotalClubPoints(row.id)}</span>` },
                  { label: 'Status', render: row => `<span class="badge badge-${row.status==='active'?'success':'danger'}">${row.status}</span>` },
                ],
                leaderboard,
                { emptyMessage: 'No clubs to compare' }
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  `;

  lucide.createIcons();
  initSidebar();
  initHeader();

  // Membership Trend Line Chart
  createChart('membership-trend-chart', 'line', {
    labels: months,
    datasets: [{
      label: 'Total Members',
      data: memberJoinsByMonth,
    }]
  });

  // Finance Overview Bar Chart
  const finClubs = financeByClub.filter(f => f.income > 0 || f.expenses > 0);
  createChart('finance-overview-chart', 'bar', {
    labels: finClubs.map(f => f.name),
    datasets: [
      {
        label: 'Income',
        data: finClubs.map(f => f.income),
        backgroundColor: 'rgba(20, 184, 166, 0.7)',
        borderColor: '#14b8a6',
      },
      {
        label: 'Expenses',
        data: finClubs.map(f => f.expenses),
        backgroundColor: 'rgba(239, 68, 68, 0.7)',
        borderColor: '#ef4444',
      }
    ]
  }, {
    plugins: { legend: { display: true, position: 'top' } }
  });

  // Project Status Doughnut
  createChart('project-status-chart', 'doughnut', {
    labels: ['Completed', 'In Progress', 'Planned'],
    datasets: [{
      data: [projectStatuses.completed, projectStatuses.in_progress, projectStatuses.planned],
      backgroundColor: ['rgba(20,184,166,0.8)', 'rgba(0,102,255,0.8)', 'rgba(245,158,11,0.8)'],
      borderColor: ['#14b8a6', '#0066ff', '#f59e0b'],
    }]
  }, {
    cutout: '65%',
    plugins: { legend: { display: false } }
  });

  // Project Categories Pie
  createChart('project-categories-chart', 'pie', {
    labels: Object.keys(projectCategories),
    datasets: [{
      data: Object.values(projectCategories),
    }]
  });

  // Print
  document.getElementById('print-report-btn')?.addEventListener('click', () => {
    window.print();
  });

  return () => {
    destroyAllCharts();
  };
}
