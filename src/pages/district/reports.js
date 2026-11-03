// ============================================
// LEO NEXUS PORTAL — DISTRICT REPORTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { renderTable } from '../../components/table.js';
import { showModal } from '../../components/modal.js';
import { PROJECT_CATEGORIES_DATA, PROJECT_AWARD_GROUPS } from '../../data/projectCategories.js';

export function renderDistrictReports() {
  const app = document.getElementById('app');
  const stats = store.getDistrictStats();
  const clubs = store.getAll('clubs');
  const members = store.getAll('members');
  const projects = store.getAll('projects');
  const leaderboard = store.getLeaderboard();

  // Selected filters state
  let selectedMonth = 'all';
  let selectedCategoryGroup = 'all';
  let financeSearchTerm = '';
  let financeSortBy = 'balance_desc';

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

  // Finance overview per club
  const financeByClub = clubs.map(c => {
    const summary = store.getClubFinanceSummary(c.id);
    const total = summary.income + summary.expenses;
    const ratio = total > 0 ? Math.round((summary.income / total) * 100) : 50;
    return {
      id: c.id,
      name: c.name.replace('Leo Club of ', ''),
      fullName: c.name,
      code: c.code,
      zone: c.zone || 'A1',
      income: summary.income,
      expenses: summary.expenses,
      balance: summary.balance,
      ratio
    };
  });

  // Project status breakdown
  const projectStatuses = {
    completed: projects.filter(p => p.status === 'completed').length,
    in_progress: projects.filter(p => p.status === 'in_progress').length,
    planned: projects.filter(p => p.status === 'planned').length,
  };

  // Project categories legacy pie
  const projectCategories = {};
  projects.forEach(p => {
    projectCategories[p.category] = (projectCategories[p.category] || 0) + 1;
  });

  function getFilteredFinanceList() {
    let list = financeByClub.filter(f => {
      if (!financeSearchTerm) return true;
      const q = financeSearchTerm.toLowerCase();
      return f.name.toLowerCase().includes(q) || f.code.toLowerCase().includes(q) || f.zone.toLowerCase().includes(q);
    });

    list.sort((a, b) => {
      if (financeSortBy === 'balance_desc') return b.balance - a.balance;
      if (financeSortBy === 'balance_asc') return a.balance - b.balance;
      if (financeSortBy === 'income_desc') return b.income - a.income;
      if (financeSortBy === 'expense_desc') return b.expenses - a.expenses;
      if (financeSortBy === 'name_asc') return a.name.localeCompare(b.name);
      return 0;
    });

    return list;
  }

  function renderFinanceLedgerHtml() {
    const list = getFilteredFinanceList();
    const surplusCount = financeByClub.filter(f => f.balance > 0).length;
    const deficitCount = financeByClub.filter(f => f.balance < 0).length;

    return `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Financial Summary Banner -->
        <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap:10px;">
          <div style="padding:10px 12px; border-radius:8px; background:rgba(20,184,166,0.08); border:1px solid rgba(20,184,166,0.2);">
            <div style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Total Inflow</div>
            <div style="font-size:14px; font-weight:800; color:#14b8a6; margin-top:2px;">Rs. ${totalIncome.toLocaleString()}</div>
          </div>
          <div style="padding:10px 12px; border-radius:8px; background:rgba(239,68,68,0.08); border:1px solid rgba(239,68,68,0.2);">
            <div style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Total Outflow</div>
            <div style="font-size:14px; font-weight:800; color:#ef4444; margin-top:2px;">Rs. ${totalExpenses.toLocaleString()}</div>
          </div>
          <div style="padding:10px 12px; border-radius:8px; background:rgba(0,102,255,0.08); border:1px solid rgba(0,102,255,0.2);">
            <div style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Net Reserve</div>
            <div style="font-size:14px; font-weight:800; color:var(--color-primary); margin-top:2px;">Rs. ${(totalIncome - totalExpenses).toLocaleString()}</div>
          </div>
          <div style="padding:10px 12px; border-radius:8px; background:rgba(245,158,11,0.08); border:1px solid rgba(245,158,11,0.2);">
            <div style="font-size:10px; color:var(--color-text-muted); text-transform:uppercase; font-weight:700;">Club Health</div>
            <div style="font-size:12px; font-weight:700; color:var(--color-text-primary); margin-top:3px;">
              <span style="color:#10b981;">${surplusCount} Surplus</span> · <span style="color:#ef4444;">${deficitCount} Deficit</span>
            </div>
          </div>
        </div>

        <!-- Controls: Search & Sort -->
        <div style="display:flex; justify-content:space-between; align-items:center; gap:12px; flex-wrap:wrap;">
          <div style="position:relative; flex:1; min-width:180px;">
            <i data-lucide="search" style="position:absolute; left:10px; top:50%; transform:translateY(-50%); width:14px; height:14px; color:var(--color-text-muted);"></i>
            <input type="text" id="finance-search-input" value="${financeSearchTerm}" placeholder="Search club by name, code, zone..." 
              style="width:100%; height:32px; font-size:12px; padding-left:32px; border-radius:6px; background:var(--color-bg-secondary); border:1px solid var(--color-glass-border); color:var(--color-text-primary);" />
          </div>
          <div style="display:flex; align-items:center; gap:6px;">
            <span style="font-size:11px; color:var(--color-text-muted); white-space:nowrap;">Sort by:</span>
            <select id="finance-sort-select" style="height:32px; font-size:12px; border-radius:6px; background:var(--color-bg-secondary); border:1px solid var(--color-glass-border); color:var(--color-text-primary); padding:2px 8px;">
              <option value="balance_desc" ${financeSortBy === 'balance_desc' ? 'selected' : ''}>Highest Balance</option>
              <option value="balance_asc" ${financeSortBy === 'balance_asc' ? 'selected' : ''}>Lowest Balance</option>
              <option value="income_desc" ${financeSortBy === 'income_desc' ? 'selected' : ''}>Highest Income</option>
              <option value="expense_desc" ${financeSortBy === 'expense_desc' ? 'selected' : ''}>Highest Expense</option>
              <option value="name_asc" ${financeSortBy === 'name_asc' ? 'selected' : ''}>Club Name (A–Z)</option>
            </select>
          </div>
        </div>

        <!-- High-Clarity Financial Table -->
        <div class="data-table-wrapper" style="max-height:280px; overflow-y:auto; border:1px solid var(--color-glass-border); border-radius:8px;">
          <table class="data-table" style="font-size:12px; margin:0;">
            <thead style="position:sticky; top:0; background:var(--color-bg-primary); z-index:1;">
              <tr>
                <th>Club & Code</th>
                <th style="text-align:right;">Income</th>
                <th style="text-align:right;">Expenses</th>
                <th style="text-align:right;">Net Balance</th>
                <th style="width:110px; text-align:center;">Health Ratio</th>
              </tr>
            </thead>
            <tbody>
              ${list.length === 0 ? `
                <tr><td colspan="5" style="text-align:center; color:var(--color-text-muted); padding:20px;">No clubs match your search</td></tr>
              ` : list.map(item => {
                const isPositive = item.balance >= 0;
                return `
                  <tr>
                    <td>
                      <div style="font-weight:600; color:var(--color-text-primary); line-height:1.2;">${item.name}</div>
                      <div style="font-size:10px; color:var(--color-text-muted);">${item.code} · Zone ${item.zone}</div>
                    </td>
                    <td style="text-align:right; font-weight:600; color:#10b981;">
                      Rs. ${item.income.toLocaleString()}
                    </td>
                    <td style="text-align:right; font-weight:600; color:#ef4444;">
                      Rs. ${item.expenses.toLocaleString()}
                    </td>
                    <td style="text-align:right;">
                      <span class="badge ${isPositive ? 'badge-success' : 'badge-danger'}" style="font-weight:700; font-size:11px;">
                        ${isPositive ? '+' : ''}Rs. ${item.balance.toLocaleString()}
                      </span>
                    </td>
                    <td style="text-align:center;">
                      <div style="width:100%; background:rgba(239,68,68,0.25); height:6px; border-radius:3px; overflow:hidden;" title="Income Ratio: ${item.ratio}%">
                        <div style="width:${item.ratio}%; background:#10b981; height:100%;"></div>
                      </div>
                      <div style="font-size:9px; color:var(--color-text-muted); margin-top:2px;">${item.ratio}% Inflow</div>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  function getProjectCategoryStats() {
    const stats = store.getMonthlyCategoryCompletionStats(selectedMonth);
    return stats;
  }

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
              <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">ANALYTICS & INTELLIGENCE</span>
              <h1 style="margin:0;">District Reports</h1>
              <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Comprehensive analytics, financial intelligence, and monthly category tracking</p>
            </div>
            <div class="page-header-actions">
              <button class="btn btn-secondary" id="print-report-btn">
                <i data-lucide="printer" style="width:16px;height:16px"></i> Print Report
              </button>
            </div>
          </div>

          <!-- Overview Stats -->
          <div class="stats-grid stagger-enter" style="margin-top:1rem;">
            <div class="card stat-card hover-lift">
              <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="building-2" style="color:#0066ff"></i></div>
              <div class="stat-value">${stats.activeClubs}/${stats.totalClubs}</div>
              <div class="stat-label">Active Clubs</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${Math.round((stats.activeClubs/stats.totalClubs)*100)}% active
              </div>
            </div>
            <div class="card stat-card hover-lift">
              <div class="stat-icon" style="background:rgba(0,212,255,0.12);"><i data-lucide="users" style="color:#00d4ff"></i></div>
              <div class="stat-value">${stats.totalMembers.toLocaleString()}</div>
              <div class="stat-label">Total Members</div>
              <div class="stat-change positive">
                <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${stats.activeMembers} active
              </div>
            </div>
            <div class="card stat-card hover-lift">
              <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="wallet" style="color:#14b8a6"></i></div>
              <div class="stat-value">Rs. ${(totalIncome - totalExpenses).toLocaleString()}</div>
              <div class="stat-label">Net Balance</div>
              <div class="stat-change ${totalIncome - totalExpenses >= 0 ? 'positive' : 'negative'}">
                <i data-lucide="${totalIncome - totalExpenses >= 0 ? 'trending-up' : 'trending-down'}" style="width:12px;height:12px"></i>
                Income: Rs. ${totalIncome.toLocaleString()}
              </div>
            </div>
            <div class="card stat-card hover-lift">
              <div class="stat-icon" style="background:rgba(139,92,246,0.12);"><i data-lucide="folder-kanban" style="color:#8b5cf6"></i></div>
              <div class="stat-value">${stats.totalProjects}</div>
              <div class="stat-label">Total Projects</div>
              <div class="stat-change positive">
                <i data-lucide="check-circle" style="width:12px;height:12px"></i> ${stats.completedProjects} completed
              </div>
            </div>
          </div>

          <!-- Charts Row 1: Membership Growth & Clear Financial Ledger (No Bar Chart) -->
          <div class="grid-2 stagger-enter" style="margin-top:1.5rem; align-items:start;">
            <!-- Membership Trends -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="trending-up" style="width:18px;height:18px;color:var(--color-primary)"></i>
                  Membership Growth Trend
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:340px;">
                  <canvas id="membership-trend-chart"></canvas>
                </div>
              </div>
            </div>

            <!-- Clear Financial Overview by Club (Replaced Bar Chart with Ledger) -->
            <div class="card hover-lift" id="finance-ledger-container">
              <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
                <h3 class="card-title">
                  <i data-lucide="wallet" style="width:18px;height:18px;color:#14b8a6"></i>
                  Financial Overview by Club
                </h3>
                <span class="badge badge-success" style="font-size:10px;">Clear Ledger Mode</span>
              </div>
              <div class="card-body" id="finance-ledger-body">
                ${renderFinanceLedgerHtml()}
              </div>
            </div>
          </div>

          <!-- Section: PROJECT CATEGORY COMPLETION ANALYSIS AFTER EACH MONTH -->
          <div class="card stagger-enter hover-lift" style="margin-top:1.5rem; border:1px solid rgba(0, 102, 255, 0.2);">
            <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; border-bottom:1px solid var(--color-glass-border); padding:16px 20px;">
              <div>
                <div style="display:flex; align-items:center; gap:8px;">
                  <span class="badge badge-warning" style="font-size:10px; font-weight:700;">MONTHLY AUDIT</span>
                  <h3 class="card-title" style="margin:0; font-size:1.15rem; display:flex; align-items:center; gap:8px;">
                    <i data-lucide="award" style="width:20px;height:20px;color:#f59e0b;"></i>
                    Project Category Completion Chart & Verification Matrix
                  </h3>
                </div>
                <p style="margin:4px 0 0; color:var(--color-text-muted); font-size:0.8rem;">
                  Monthly verification across all 37 official categories, auto-ticked upon sub-criteria and proof submission.
                </p>
              </div>

              <!-- Month Selector Dropdown -->
              <div style="display:flex; align-items:center; gap:8px;">
                <label for="proj-cat-month-select" style="font-size:12px; font-weight:600; color:var(--color-text-secondary); white-space:nowrap;">
                  <i data-lucide="calendar" style="width:14px;height:14px;display:inline-block;vertical-align:middle;"></i> Select Month:
                </label>
                <select id="proj-cat-month-select" class="form-input" style="height:36px; font-size:13px; font-weight:700; width:190px;">
                  <option value="all" ${selectedMonth === 'all' ? 'selected' : ''}>All Months (Cumulative)</option>
                  <option value="2026-06" ${selectedMonth === '2026-06' ? 'selected' : ''}>June 2026</option>
                  <option value="2026-07" ${selectedMonth === '2026-07' ? 'selected' : ''}>July 2026</option>
                  <option value="2026-08" ${selectedMonth === '2026-08' ? 'selected' : ''}>August 2026</option>
                </select>
              </div>
            </div>

            <div class="card-body" id="category-completion-section-content" style="padding:20px;">
              <!-- Dynamic content rendered by renderCategoryCompletionSection() -->
            </div>
          </div>

          <!-- Charts Row 2: Projects Overview -->
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

            <!-- Legacy Project Categories -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="tag" style="width:18px;height:18px;color:#f59e0b"></i>
                  Project Service Distribution
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
                Club Performance Comparison
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

  // Function to render the Project Category Completion Section dynamically
  function updateCategoryCompletionSection() {
    const container = document.getElementById('category-completion-section-content');
    if (!container) return;

    const catStats = getProjectCategoryStats();
    const gStats = catStats.groupStats;

    const pAwardsRate = Math.min(100, Math.round((gStats.project_awards.completedSum / (24 * Math.max(1, catStats.totalClubs))) * 100));
    const jAwardsRate = Math.min(100, Math.round((gStats.joint_project_awards.completedSum / (6 * Math.max(1, catStats.totalClubs))) * 100));
    const lGlobalRate = Math.min(100, Math.round((gStats.lions_global_service.completedSum / (7 * Math.max(1, catStats.totalClubs))) * 100));

    // Filter categories by selected group
    let displayedCategories = PROJECT_CATEGORIES_DATA;
    if (selectedCategoryGroup !== 'all') {
      displayedCategories = displayedCategories.filter(c => c.groupId === selectedCategoryGroup);
    }

    container.innerHTML = `
      <!-- 3 Award Groups KPI Cards -->
      <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap:16px; margin-bottom:20px;">
        <!-- Group 1: Project Awards -->
        <div class="card hover-lift" style="padding:16px; border:1px solid rgba(0, 102, 255, 0.25); background:rgba(0, 102, 255, 0.03);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="badge badge-primary" style="font-size:10px;">Categories 1 – 24</span>
              <h4 style="margin:6px 0 2px; font-size:1rem; font-weight:700; color:var(--color-text-primary);">Project Awards</h4>
              <p style="margin:0; font-size:11px; color:var(--color-text-muted);">Club service excellence & thematic programs</p>
            </div>
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(0, 102, 255, 0.12); display:flex; align-items:center; justify-content:center; color:var(--color-primary);">
              <i data-lucide="award" style="width:20px;height:20px;"></i>
            </div>
          </div>
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:baseline;">
            <div style="font-size:1.4rem; font-weight:800; color:var(--color-primary);">${gStats.project_awards.completedSum} <span style="font-size:11px; font-weight:500; color:var(--color-text-muted);">Completions</span></div>
            <div style="font-size:11px; font-weight:600; color:var(--color-text-secondary);">${gStats.project_awards.activeClubCount} Clubs Active</div>
          </div>
          <div style="margin-top:8px; background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
            <div style="width:${pAwardsRate}%; background:var(--color-primary); height:100%;"></div>
          </div>
        </div>

        <!-- Group 2: Joint Project Awards -->
        <div class="card hover-lift" style="padding:16px; border:1px solid rgba(245, 158, 11, 0.25); background:rgba(245, 158, 11, 0.03);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="badge badge-warning" style="font-size:10px;">Categories 25 – 30</span>
              <h4 style="margin:6px 0 2px; font-size:1rem; font-weight:700; color:var(--color-text-primary);">Joint Project Awards</h4>
              <p style="margin:0; font-size:11px; color:var(--color-text-muted);">Collaborations with Lions, NGOs & Leos</p>
            </div>
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(245, 158, 11, 0.12); display:flex; align-items:center; justify-content:center; color:#f59e0b;">
              <i data-lucide="users" style="width:20px;height:20px;"></i>
            </div>
          </div>
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:baseline;">
            <div style="font-size:1.4rem; font-weight:800; color:#f59e0b;">${gStats.joint_project_awards.completedSum} <span style="font-size:11px; font-weight:500; color:var(--color-text-muted);">Completions</span></div>
            <div style="font-size:11px; font-weight:600; color:var(--color-text-secondary);">${gStats.joint_project_awards.activeClubCount} Clubs Active</div>
          </div>
          <div style="margin-top:8px; background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
            <div style="width:${jAwardsRate}%; background:#f59e0b; height:100%;"></div>
          </div>
        </div>

        <!-- Group 3: Lions Global Service Challenge Awards -->
        <div class="card hover-lift" style="padding:16px; border:1px solid rgba(20, 184, 166, 0.25); background:rgba(20, 184, 166, 0.03);">
          <div style="display:flex; justify-content:space-between; align-items:flex-start;">
            <div>
              <span class="badge badge-success" style="font-size:10px;">Categories 31 – 37</span>
              <h4 style="margin:6px 0 2px; font-size:1rem; font-weight:700; color:var(--color-text-primary);">Lions Global Service Challenge</h4>
              <p style="margin:0; font-size:11px; color:var(--color-text-muted);">Diabetes, Hunger, Vision, Environment, Youth</p>
            </div>
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(20, 184, 166, 0.12); display:flex; align-items:center; justify-content:center; color:#14b8a6;">
              <i data-lucide="globe" style="width:20px;height:20px;"></i>
            </div>
          </div>
          <div style="margin-top:14px; display:flex; justify-content:space-between; align-items:baseline;">
            <div style="font-size:1.4rem; font-weight:800; color:#14b8a6;">${gStats.lions_global_service.completedSum} <span style="font-size:11px; font-weight:500; color:var(--color-text-muted);">Completions</span></div>
            <div style="font-size:11px; font-weight:600; color:var(--color-text-secondary);">${gStats.lions_global_service.activeClubCount} Clubs Active</div>
          </div>
          <div style="margin-top:8px; background:rgba(255,255,255,0.08); height:6px; border-radius:3px; overflow:hidden;">
            <div style="width:${lGlobalRate}%; background:#14b8a6; height:100%;"></div>
          </div>
        </div>
      </div>

      <!-- Completion Chart & Matrix Grid -->
      <div style="display:grid; grid-template-columns: 1fr 2fr; gap:20px; align-items:start;">
        <!-- Chart Canvas Card -->
        <div class="card" style="padding:16px; border:1px solid var(--color-glass-border);">
          <h4 style="margin:0 0 12px; font-size:0.95rem; font-weight:700; display:flex; align-items:center; gap:6px;">
            <i data-lucide="bar-chart-2" style="width:16px;height:16px;color:var(--color-primary);"></i>
            Award Groups Breakdown (${selectedMonth === 'all' ? 'Cumulative' : selectedMonth})
          </h4>
          <div class="chart-container" style="height:260px; position:relative;">
            <canvas id="project-category-completion-chart"></canvas>
          </div>
          <div style="margin-top:12px; font-size:11px; color:var(--color-text-muted); text-align:center;">
            Total category submissions audited: <strong style="color:var(--color-text-primary);">${catStats.totalSubmissions}</strong>
          </div>
        </div>

        <!-- 37 Category Inspection Table -->
        <div class="card" style="padding:16px; border:1px solid var(--color-glass-border);">
          <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              <button type="button" class="btn btn-xs cat-filter-btn ${selectedCategoryGroup === 'all' ? 'btn-primary' : 'btn-secondary'}" data-group="all">All (37)</button>
              <button type="button" class="btn btn-xs cat-filter-btn ${selectedCategoryGroup === 'project_awards' ? 'btn-primary' : 'btn-secondary'}" data-group="project_awards">Project Awards (1–24)</button>
              <button type="button" class="btn btn-xs cat-filter-btn ${selectedCategoryGroup === 'joint_project_awards' ? 'btn-primary' : 'btn-secondary'}" data-group="joint_project_awards">Joint (25–30)</button>
              <button type="button" class="btn btn-xs cat-filter-btn ${selectedCategoryGroup === 'lions_global_service' ? 'btn-primary' : 'btn-secondary'}" data-group="lions_global_service">Global Challenge (31–37)</button>
            </div>
            <span style="font-size:11px; color:var(--color-text-muted);">Showing ${displayedCategories.length} categories</span>
          </div>

          <div class="data-table-wrapper" style="max-height:280px; overflow-y:auto; border:1px solid var(--color-glass-border); border-radius:6px;">
            <table class="data-table" style="font-size:12px; margin:0;">
              <thead style="position:sticky; top:0; background:var(--color-bg-primary); z-index:1;">
                <tr>
                  <th style="width:40px;">#</th>
                  <th>Project Category</th>
                  <th style="width:110px;">Award Group</th>
                  <th style="width:100px; text-align:center;">Completed</th>
                  <th style="width:90px; text-align:center;">Action</th>
                </tr>
              </thead>
              <tbody>
                ${displayedCategories.map(cat => {
                  const stat = catStats.categoryStats[cat.id];
                  const count = stat ? stat.completedClubCount : 0;
                  const groupInfo = PROJECT_AWARD_GROUPS[cat.groupId];
                  return `
                    <tr>
                      <td style="font-weight:700; color:var(--color-text-muted);">${cat.number}</td>
                      <td>
                        <div style="font-weight:600; color:var(--color-text-primary); line-height:1.3;">
                          ${cat.name}
                        </div>
                        <div style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">
                          ${cat.subCriteria.length} sub-criteria ${cat.subCriteria.some(s => s.compulsory) ? '· Compulsory MyLion required' : ''}
                        </div>
                      </td>
                      <td>
                        <span class="badge ${groupInfo.badgeClass}" style="font-size:10px;">${groupInfo.name.split(' ')[0]}</span>
                      </td>
                      <td style="text-align:center;">
                        ${count > 0 ? `
                          <span class="badge badge-success" style="font-weight:700;">
                            <i data-lucide="check" style="width:10px;height:10px;display:inline-block;vertical-align:middle;"></i> ${count} Clubs
                          </span>
                        ` : `
                          <span style="color:var(--color-text-muted); font-size:11px;">0 Clubs</span>
                        `}
                      </td>
                      <td style="text-align:center;">
                        <button type="button" class="btn btn-ghost btn-xs inspect-category-btn" data-cat-id="${cat.id}" style="color:var(--color-primary); padding:2px 8px; font-weight:600;">
                          Inspect
                        </button>
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    `;

    lucide.createIcons();

    // Attach Category Group Filter Clicks
    container.querySelectorAll('.cat-filter-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        selectedCategoryGroup = e.currentTarget.getAttribute('data-group');
        updateCategoryCompletionSection();
      });
    });

    // Attach Category Inspect Modal Clicks
    container.querySelectorAll('.inspect-category-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const catId = e.currentTarget.getAttribute('data-cat-id');
        openCategoryInspectorModal(catId, selectedMonth);
      });
    });

    // Recreate Category Completion Chart
    createChart('project-category-completion-chart', 'bar', {
      labels: ['Project Awards (1–24)', 'Joint Projects (25–30)', 'Global Challenge (31–37)'],
      datasets: [
        {
          label: 'Completed Projects',
          data: [
            gStats.project_awards.completedSum,
            gStats.joint_project_awards.completedSum,
            gStats.lions_global_service.completedSum
          ],
          backgroundColor: [
            'rgba(0, 102, 255, 0.75)',
            'rgba(245, 158, 11, 0.75)',
            'rgba(20, 184, 166, 0.75)'
          ],
          borderColor: ['#0066ff', '#f59e0b', '#14b8a6'],
          borderWidth: 1.5,
          borderRadius: 6
        }
      ]
    }, {
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, ticks: { precision: 0 } }
      }
    });
  }

  function openCategoryInspectorModal(catId, month) {
    const cat = PROJECT_CATEGORIES_DATA.find(c => c.id === catId);
    if (!cat) return;

    const catStats = store.getMonthlyCategoryCompletionStats(month);
    const stat = catStats.categoryStats[cat.id];
    const completingClubs = stat ? stat.completingClubs : [];

    const bodyHtml = `
      <div style="display:flex; flex-direction:column; gap:16px;">
        <!-- Header Info -->
        <div style="background:rgba(0,102,255,0.06); padding:12px 14px; border-radius:8px; border:1px solid rgba(0,102,255,0.15);">
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="badge ${PROJECT_AWARD_GROUPS[cat.groupId].badgeClass}">
              ${PROJECT_AWARD_GROUPS[cat.groupId].name} (${PROJECT_AWARD_GROUPS[cat.groupId].range})
            </span>
            <span style="font-size:11px; font-weight:700; color:var(--color-primary);">Month: ${month === 'all' ? 'All Months' : month}</span>
          </div>
          <h3 style="margin:8px 0 4px; font-size:1.1rem; color:var(--color-text-primary);">${cat.number}. ${cat.name}</h3>
          <p style="margin:0; font-size:11px; color:var(--color-text-muted);">
            Auto-ticked whenever sub-criteria are fulfilled with verified proof attachments.
          </p>
        </div>

        <!-- Official Sub-criteria Checklist -->
        <div>
          <h4 style="margin:0 0 8px; font-size:13px; font-weight:700; color:var(--color-text-primary); display:flex; align-items:center; gap:6px;">
            <i data-lucide="list-checks" style="width:14px;height:14px;color:var(--color-primary);"></i>
            Official Sub-Criteria (${cat.subCriteria.length})
          </h4>
          <div style="display:flex; flex-direction:column; gap:6px;">
            ${cat.subCriteria.map((sub, idx) => `
              <div style="display:flex; align-items:flex-start; gap:8px; padding:6px 10px; border-radius:6px; background:var(--color-bg-secondary); border:1px solid var(--color-glass-border); font-size:12px;">
                <span style="font-weight:700; color:var(--color-text-muted); min-width:18px;">${idx + 1}.</span>
                <span style="color:var(--color-text-secondary); line-height:1.35; flex:1;">${sub.text}</span>
                ${sub.compulsory ? '<span class="badge badge-warning" style="font-size:9px; font-weight:800;">COMPULSORY</span>' : ''}
              </div>
            `).join('')}
          </div>
        </div>

        <!-- Clubs who Completed this Category -->
        <div>
          <h4 style="margin:0 0 8px; font-size:13px; font-weight:700; color:var(--color-text-primary); display:flex; align-items:center; gap:6px;">
            <i data-lucide="check-circle-2" style="width:14px;height:14px;color:#10b981;"></i>
            Clubs Completed this Category (${completingClubs.length})
          </h4>
          ${completingClubs.length === 0 ? `
            <div style="padding:16px; text-align:center; color:var(--color-text-muted); font-size:12px; border:1px dashed var(--color-glass-border); border-radius:6px;">
              No clubs have completed this category for the selected period yet.
            </div>
          ` : `
            <div style="display:flex; flex-direction:column; gap:8px; max-height:200px; overflow-y:auto;">
              ${completingClubs.map(cc => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 12px; border-radius:6px; background:rgba(16,185,129,0.06); border:1px solid rgba(16,185,129,0.2);">
                  <div>
                    <div style="font-weight:700; font-size:12px; color:var(--color-text-primary);">${cc.clubName}</div>
                    <div style="font-size:10px; color:var(--color-text-muted);">Verified for Month: ${cc.month} · ${new Date(cc.submittedAt).toLocaleDateString()}</div>
                  </div>
                  <span class="badge badge-success" style="font-size:10px; font-weight:700;">✓ Auto-Ticked & Verified</span>
                </div>
              `).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    showModal(`Category Details: #${cat.number}`, bodyHtml, { showFooter: false, size: 'lg' });
  }

  // Initial render of the category completion section
  updateCategoryCompletionSection();

  // Attach Month Selector Event Listener
  document.getElementById('proj-cat-month-select')?.addEventListener('change', (e) => {
    selectedMonth = e.target.value;
    updateCategoryCompletionSection();
  });

  // Attach Financial Ledger Live Search & Sort
  function attachFinanceLedgerEvents() {
    const searchInput = document.getElementById('finance-search-input');
    const sortSelect = document.getElementById('finance-sort-select');

    searchInput?.addEventListener('input', (e) => {
      financeSearchTerm = e.target.value;
      const ledgerBody = document.getElementById('finance-ledger-body');
      if (ledgerBody) {
        ledgerBody.innerHTML = renderFinanceLedgerHtml();
        lucide.createIcons();
        attachFinanceLedgerEvents();
      }
    });

    sortSelect?.addEventListener('change', (e) => {
      financeSortBy = e.target.value;
      const ledgerBody = document.getElementById('finance-ledger-body');
      if (ledgerBody) {
        ledgerBody.innerHTML = renderFinanceLedgerHtml();
        lucide.createIcons();
        attachFinanceLedgerEvents();
      }
    });
  }
  attachFinanceLedgerEvents();

  // Membership Trend Line Chart
  createChart('membership-trend-chart', 'line', {
    labels: months,
    datasets: [{
      label: 'Total Members',
      data: memberJoinsByMonth,
      borderColor: '#0066ff',
      backgroundColor: 'rgba(0, 102, 255, 0.1)',
      fill: true
    }]
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

  // Legacy Project Categories Pie
  createChart('project-categories-chart', 'pie', {
    labels: Object.keys(projectCategories),
    datasets: [{
      data: Object.values(projectCategories),
      backgroundColor: [
        '#0066ff', '#14b8a6', '#f59e0b', '#8b5cf6', '#ec4899', '#3b82f6', '#10b981', '#6366f1'
      ]
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
