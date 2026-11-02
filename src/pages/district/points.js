// ============================================
// LEO NEXUS PORTAL — DISTRICT POINTS & CRITERIA
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { destroyAllCharts } from '../../components/charts.js';

let activeTab = 'leaderboard'; // leaderboard or submissions
let filterClub = 'all';
let filterStatus = 'all';

const categoryMaxPoints = {
  'AD 1: Reporting': 1460000,
  'AD 2: Finance': 1720000,
  'AD 3: Meetings & Dev': 1870000,
  'AC 1: Projects Value': 160000,
  'AC 2: PR & Marketing': 450000,
  'AC 3: Special Projects': 1600000,
  'INT: Club Projects': 27500,
  'INT: Other Activities': 241000,
  'INT: Council Meetings': 104000,
  'SP: Events': 980000,
  'SP: Service Hours': 90000
};

function getAggregatedPoints(pointsObj) {
  const aggregated = {
    'AD 1: Reporting': 0,
    'AD 2: Finance': 0,
    'AD 3: Meetings & Dev': 0,
    'AC 1: Projects Value': 0,
    'AC 2: PR & Marketing': 0,
    'AC 3: Special Projects': 0,
    'INT: Club Projects': 0,
    'INT: Other Activities': 0,
    'INT: Council Meetings': 0,
    'SP: Events': 0,
    'SP: Service Hours': 0
  };

  for (const [id, score] of Object.entries(pointsObj || {})) {
    if (id.startsWith('ad1_')) aggregated['AD 1: Reporting'] += score;
    else if (id.startsWith('ad2_')) aggregated['AD 2: Finance'] += score;
    else if (id.startsWith('ad3_')) aggregated['AD 3: Meetings & Dev'] += score;
    else if (id.startsWith('ac1_')) aggregated['AC 1: Projects Value'] += score;
    else if (id.startsWith('ac2_')) aggregated['AC 2: PR & Marketing'] += score;
    else if (id.startsWith('ac3_')) aggregated['AC 3: Special Projects'] += score;
    else if (id.startsWith('int1_') || id.startsWith('int2_')) aggregated['INT: Club Projects'] += score;
    else if (id.startsWith('int3_') || id.startsWith('int4_') || id.startsWith('int5_') || id.startsWith('int6_') || id.startsWith('int7_') || id.startsWith('int8_')) aggregated['INT: Other Activities'] += score;
    else if (id.startsWith('int9_') || id.startsWith('int10_')) aggregated['INT: Council Meetings'] += score;
    else if (id.startsWith('sp1_') || id.startsWith('sp2_')) aggregated['SP: Events'] += score;
    else if (id.startsWith('sp3_')) aggregated['SP: Service Hours'] += score;
  }
  return aggregated;
}

function getCategoryPercentages(pointsObj) {
  const aggregated = getAggregatedPoints(pointsObj);
  const pcts = {};
  for (const [cat, score] of Object.entries(aggregated)) {
    const max = categoryMaxPoints[cat] || 1;
    pcts[cat] = Math.max(0, Math.min(100, Math.round((score / max) * 100)));
  }
  return pcts;
}

function renderModalCategoryGroup(items, pointsObj) {
  const subgrouped = {};
  items.forEach(c => {
    if (!subgrouped[c.category]) subgrouped[c.category] = [];
    subgrouped[c.category].push(c);
  });

  return Object.entries(subgrouped).map(([catName, catItems]) => {
    return `
      <div class="modal-cat-section" data-cat="${catName}" style="border:1px solid var(--color-glass-border); border-radius:10px; overflow:hidden; background:var(--color-bg-secondary); margin-bottom:12px;">
        <div style="background:rgba(255,255,255,0.05); padding:10px 14px; font-weight:700; font-size:12px; color:var(--color-cyan-glow); display:flex; justify-content:space-between; align-items:center; border-bottom:1px solid var(--color-glass-border);">
          <span>${catName}</span>
          <span style="font-size:11px; font-weight:normal; color:var(--color-text-muted);">${catItems.length} items</span>
        </div>
        <div style="padding:14px; display:flex; flex-direction:column; gap:14px; background:rgba(10, 14, 39, 0.2);">
          ${catItems.map(crit => {
            const currentPoints = pointsObj[crit.id] || 0;
            const minPoints = crit.maxPoints < 0 ? crit.maxPoints : 0;
            const maxPoints = crit.maxPoints < 0 ? 0 : crit.maxPoints;
            const borderStyle = crit.maxPoints < 0 ? 'border-left:3px solid var(--color-danger);' : 'border-left:3px solid var(--color-primary);';
            return `
              <div class="form-group crit-input-row" data-search-text="${crit.description.toLowerCase()}" style="margin:0; padding:10px; border-radius:8px; background:rgba(255,255,255,0.02); ${borderStyle}">
                <label class="form-label" style="display:flex; flex-direction:column; margin-bottom:8px; font-size:12px; font-weight:600; line-height:1.4;">
                  <span style="color:var(--color-text-primary);">${crit.description}</span>
                  <span style="font-size:11px; font-weight:normal; color:var(--color-text-muted); margin-top:2px;">
                    Range: [${minPoints.toLocaleString()} to ${maxPoints.toLocaleString()}] • Per unit: ${crit.perUnit.toLocaleString()}
                  </span>
                </label>
                <div style="display:flex; align-items:center; gap:8px;">
                  <input type="number" class="form-input club-crit-input" data-crit-id="${crit.id}" min="${minPoints}" max="${maxPoints}" value="${currentPoints}" style="height:36px; padding:6px 10px; font-size:13px; font-weight:600; background:rgba(0,0,0,0.2); border:1px solid var(--color-glass-border); border-radius:6px; color:white; width:120px;" />
                  <span style="font-size:12px; font-weight:700; color:var(--color-text-muted);">Points</span>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      </div>
    `;
  }).join('');
}

function getCriteriaFormHtml(criteria = null) {
  return `
    <form id="criteria-form">
      <div class="form-group">
        <label class="form-label">Category Name *</label>
        <input type="text" class="form-input" id="crit-category" value="${criteria?.category || ''}" placeholder="e.g. Community Service Projects" required />
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="crit-description" rows="3" placeholder="Describe the criteria...">${criteria?.description || ''}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Maximum Points *</label>
          <input type="number" class="form-input" id="crit-maxPoints" value="${criteria?.maxPoints || ''}" placeholder="e.g. 30" required />
        </div>
        <div class="form-group">
          <label class="form-label">Points Per Unit</label>
          <input type="number" class="form-input" id="crit-perUnit" value="${criteria?.perUnit || ''}" placeholder="e.g. 5" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Unit Name</label>
        <input type="text" class="form-input" id="crit-unit" value="${criteria?.unit || ''}" placeholder="e.g. project, event, report" />
      </div>
    </form>
  `;
}

function getCriteriaFormValues() {
  return {
    category: document.getElementById('crit-category')?.value?.trim(),
    description: document.getElementById('crit-description')?.value?.trim(),
    maxPoints: parseInt(document.getElementById('crit-maxPoints')?.value) || 0,
    perUnit: parseInt(document.getElementById('crit-perUnit')?.value) || 1,
    unit: document.getElementById('crit-unit')?.value?.trim(),
  };
}

export function renderDistrictPoints() {
  const app = document.getElementById('app');
  const criteria = store.getAll('pointCriteria');
  const leaderboard = store.getLeaderboard();
  const clubs = store.getAll('clubs');
  const totalMaxPoints = criteria.reduce((s, c) => s + c.maxPoints, 0);

  // Group criteria by category
  const groupedCriteria = {};
  criteria.forEach(c => {
    if (!groupedCriteria[c.category]) {
      groupedCriteria[c.category] = [];
    }
    groupedCriteria[c.category].push(c);
  });

  // Calculate pending submissions count
  const allSubmissions = store.getAll('pointsSubmissions');
  const pendingCount = allSubmissions.filter(s => s.status === 'pending').length;

  // Build Tab Header HTML
  const tabHeaderHtml = `
    <div class="tabs-header stagger-enter" style="display:flex; border-bottom:1px solid var(--color-glass-border); padding-bottom:8px; gap:8px; margin-bottom: 24px; flex-wrap: wrap;">
      <button class="tab-btn ${activeTab === 'leaderboard' ? 'active' : ''} btn btn-ghost btn-sm" data-tab="leaderboard" style="font-weight:600; padding:8px 16px; border-radius:6px; display:flex; align-items:center; gap:6px;">
        <i data-lucide="trophy" style="width:14px;height:14px;"></i> Standings & Criteria
      </button>
      <button class="tab-btn ${activeTab === 'submissions' ? 'active' : ''} btn btn-ghost btn-sm" data-tab="submissions" style="font-weight:600; padding:8px 16px; border-radius:6px; display:flex; align-items:center; gap:6px;">
        <i data-lucide="clipboard-list" style="width:14px;height:14px;"></i> Club Submissions
        ${pendingCount > 0 ? `<span style="background:var(--color-danger); color:white; font-size:10px; padding:2px 6px; border-radius:10px; font-weight:700; margin-left:4px;">${pendingCount}</span>` : ''}
      </button>
    </div>
  `;

  let tabContentHtml = '';

  if (activeTab === 'leaderboard') {
    // ------------------------------------
    // TAB: STANDINGS & CRITERIA
    // ------------------------------------
    const radarLabels = Object.keys(categoryMaxPoints);
    const topClubs = leaderboard.slice(0, 3);
    const radarDatasets = topClubs.map(club => {
      const cp = club.pointBreakdown;
      const pcts = getCategoryPercentages(cp?.points || {});
      return {
        label: club.name.replace('Leo Club of ', ''),
        data: radarLabels.map(cat => pcts[cat] || 0)
      };
    });

    let criteriaTableHtml = `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width: 50px;">No.</th>
              <th>Description</th>
              <th style="width: 150px;">Max Points</th>
              <th style="width: 180px;">Per Unit</th>
              <th style="width: 100px;">Actions</th>
            </tr>
          </thead>
          <tbody>
    `;

    for (const [categoryName, items] of Object.entries(groupedCriteria)) {
      criteriaTableHtml += `
        <tr style="background: rgba(0, 102, 255, 0.08); font-weight: 700;">
          <td colspan="5" style="padding: 12px var(--space-4); color: var(--color-cyan-glow); font-size: 0.9rem;">
            ${categoryName}
          </td>
        </tr>
      `;
      items.forEach((item, index) => {
        const itemNum = index + 1;
        const displayPoints = item.maxPoints < 0
          ? `<span style="font-weight:700;color:var(--color-danger);">${item.maxPoints.toLocaleString()} (Deduction)</span>`
          : `<span style="font-weight:700;color:var(--color-primary);">${item.maxPoints.toLocaleString()}</span>`;

        const unitDisplay = Math.abs(item.maxPoints) === Math.abs(item.perUnit)
          ? `Flat`
          : `${item.perUnit.toLocaleString()} pts / ${item.unit}`;

        criteriaTableHtml += `
          <tr>
            <td style="font-weight:600; text-align:center;">${itemNum}</td>
            <td style="font-size:0.85rem; color:var(--color-text-secondary); white-space:normal; line-height:1.4;">${item.description}</td>
            <td>${displayPoints}</td>
            <td>${unitDisplay}</td>
            <td class="actions">
              <button class="btn btn-icon btn-ghost btn-sm edit-crit-btn" data-id="${item.id}" title="Edit">
                <i data-lucide="pencil" style="width:14px;height:14px"></i>
              </button>
              <button class="btn btn-icon btn-ghost btn-sm delete-crit-btn" data-id="${item.id}" title="Delete">
                <i data-lucide="trash-2" style="width:14px;height:14px;color:var(--color-danger)"></i>
              </button>
            </td>
          </tr>
        `;
      });
    }

    criteriaTableHtml += `
          </tbody>
        </table>
      </div>
    `;

    tabContentHtml = `
      <!-- Stats -->
      <div class="stats-grid stagger-enter" style="margin-top:1rem;">
        <div class="card stat-card hover-lift water-effect">
          <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="list-checks" style="color:#0066ff"></i></div>
          <div class="stat-value">${criteria.length}</div>
          <div class="stat-label">Criteria</div>
        </div>
        <div class="card stat-card hover-lift water-effect">
          <div class="stat-icon" style="background:rgba(139,92,246,0.12);"><i data-lucide="target" style="color:#8b5cf6"></i></div>
          <div class="stat-value">${totalMaxPoints.toLocaleString()}</div>
          <div class="stat-label">Max Points</div>
        </div>
        <div class="card stat-card hover-lift water-effect">
          <div class="stat-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="trophy" style="color:#f59e0b"></i></div>
          <div class="stat-value">${leaderboard.length > 0 ? leaderboard[0].totalPoints.toLocaleString() : 0}</div>
          <div class="stat-label">Highest Score</div>
        </div>
        <div class="card stat-card hover-lift water-effect">
          <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="bar-chart-3" style="color:#14b8a6"></i></div>
          <div class="stat-value">${store.getDistrictStats().avgPoints.toLocaleString()}</div>
          <div class="stat-label">Average</div>
        </div>
      </div>

      <!-- Top 3 Podium Showcase -->
      ${leaderboard.length >= 3 ? `
        <div class="grid-3 stagger-enter" style="margin-top:1.5rem; align-items:end;">
          <!-- 2nd Place -->
          <div class="card hover-lift" style="text-align:center; padding:24px 20px; border-top:4px solid #94a3b8; position:relative;">
            <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #f1f5f9, #94a3b8); color:#1e293b; font-weight:800; font-size:1.25rem; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:0 4px 12px rgba(148,163,184,0.3);">
              🥈
            </div>
            <span class="badge" style="background:rgba(148,163,184,0.15); color:#475569; font-size:11px; font-weight:700; margin-bottom:8px;">2nd Place</span>
            <h4 style="margin:0 0 4px; font-size:15px; font-weight:700; color:var(--color-text-primary);">${leaderboard[1].name}</h4>
            <div style="font-size:12px; color:var(--color-text-muted); margin-bottom:12px;">${leaderboard[1].zone} • ${leaderboard[1].region}</div>
            <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary);">${leaderboard[1].totalPoints.toLocaleString()} <span style="font-size:12px; font-weight:600; color:var(--color-text-muted);">pts</span></div>
          </div>

          <!-- 1st Place (Featured) -->
          <div class="card hover-lift" style="text-align:center; padding:28px 20px; border-top:4px solid #f59e0b; background:linear-gradient(180deg, rgba(245,158,11,0.04) 0%, var(--color-surface) 100%); transform:translateY(-8px); position:relative; box-shadow:0 12px 28px rgba(245,158,11,0.12);">
            <div style="width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg, #fef08a, #f59e0b); color:#78350f; font-weight:800; font-size:1.5rem; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:0 6px 16px rgba(245,158,11,0.35);">
              🥇
            </div>
            <span class="badge badge-warning" style="font-size:11px; font-weight:700; margin-bottom:8px;">District Leader</span>
            <h3 style="margin:0 0 4px; font-size:17px; font-weight:800; color:var(--color-text-primary);">${leaderboard[0].name}</h3>
            <div style="font-size:12px; color:var(--color-text-muted); margin-bottom:12px;">${leaderboard[0].zone} • ${leaderboard[0].region}</div>
            <div style="font-size:1.75rem; font-weight:900; color:#f59e0b;">${leaderboard[0].totalPoints.toLocaleString()} <span style="font-size:13px; font-weight:600; color:var(--color-text-muted);">pts</span></div>
          </div>

          <!-- 3rd Place -->
          <div class="card hover-lift" style="text-align:center; padding:24px 20px; border-top:4px solid #ea580c; position:relative;">
            <div style="width:48px; height:48px; border-radius:50%; background:linear-gradient(135deg, #fed7aa, #ea580c); color:#7c2d12; font-weight:800; font-size:1.25rem; display:flex; align-items:center; justify-content:center; margin:0 auto 12px; box-shadow:0 4px 12px rgba(234,88,12,0.3);">
              🥉
            </div>
            <span class="badge" style="background:rgba(234,88,12,0.15); color:#9a3412; font-size:11px; font-weight:700; margin-bottom:8px;">3rd Place</span>
            <h4 style="margin:0 0 4px; font-size:15px; font-weight:700; color:var(--color-text-primary);">${leaderboard[2].name}</h4>
            <div style="font-size:12px; color:var(--color-text-muted); margin-bottom:12px;">${leaderboard[2].zone} • ${leaderboard[2].region}</div>
            <div style="font-size:1.5rem; font-weight:800; color:var(--color-primary);">${leaderboard[2].totalPoints.toLocaleString()} <span style="font-size:12px; font-weight:600; color:var(--color-text-muted);">pts</span></div>
          </div>
        </div>
      ` : ''}

      <!-- Club Ranking Board -->
      <div class="card hover-lift stagger-enter" style="margin-top:1.5rem;">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
          <div>
            <h3 class="card-title" style="display:flex; align-items:center; gap:8px; margin:0;">
              <i data-lucide="trophy" style="width:20px;height:20px;color:#f59e0b"></i>
              Official Club Ranking Board
            </h3>
            <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Complete district merit standings based on verified criteria</div>
          </div>
          <span class="badge badge-primary" style="font-size:11px; padding:4px 10px;">
            ${leaderboard.length} Ranked Clubs
          </span>
        </div>
        <div class="card-body" style="padding:0;">
          <div class="data-table-wrapper" style="border:none; border-radius:0;">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width:60px; text-align:center;">Rank</th>
                  <th>Club Information</th>
                  <th>Zone / Region</th>
                  <th>Members</th>
                  <th>Total Points</th>
                  <th style="width:160px;">Progress</th>
                  <th>Status</th>
                  <th style="width:110px; text-align:center;">Actions</th>
                </tr>
              </thead>
              <tbody>
                ${(() => {
                  const topScore = Math.max(1, leaderboard[0]?.totalPoints || 1);
                  return leaderboard.map((club, i) => {
                    const rank = i + 1;
                    const pct = Math.max(5, Math.min(100, Math.round((club.totalPoints / topScore) * 100)));
                    let medalBadge = '';
                    if (rank === 1) {
                      medalBadge = `<span style="font-size:1.25rem;">🥇</span>`;
                    } else if (rank === 2) {
                      medalBadge = `<span style="font-size:1.25rem;">🥈</span>`;
                    } else if (rank === 3) {
                      medalBadge = `<span style="font-size:1.25rem;">🥉</span>`;
                    } else {
                      medalBadge = `<span class="badge" style="background:var(--color-surface-muted); color:var(--color-text-secondary); font-weight:700; font-size:12px;">#${rank}</span>`;
                    }

                    return `
                      <tr>
                        <td style="text-align:center; font-weight:800;">${medalBadge}</td>
                        <td>
                          <div style="font-weight:700; color:var(--color-text-primary); font-size:14px;">${club.name}</div>
                          <div style="font-size:11px; color:var(--color-text-muted);">${club.code}</div>
                        </td>
                        <td>
                          <div style="font-size:13px; font-weight:600;">${club.zone}</div>
                          <div style="font-size:11px; color:var(--color-text-muted);">${club.region}</div>
                        </td>
                        <td>
                          <span style="font-weight:700;">${club.memberCount}</span>
                          <span style="font-size:11px; color:var(--color-text-muted);"> members</span>
                        </td>
                        <td>
                          <span style="font-weight:800; color:var(--color-primary); font-size:1.05rem;">
                            ${club.totalPoints.toLocaleString()}
                          </span>
                          <span style="font-size:11px; font-weight:600; color:var(--color-text-muted);"> pts</span>
                        </td>
                        <td>
                          <div style="width:100%; height:7px; background:var(--color-surface-muted); border-radius:9999px; overflow:hidden;">
                            <div style="height:100%; width:${pct}%; background:linear-gradient(90deg, var(--color-primary), #38bdf8); border-radius:9999px;"></div>
                          </div>
                          <div style="font-size:11px; color:var(--color-text-muted); margin-top:3px; display:flex; justify-content:space-between;">
                            <span>Score Index</span>
                            <span style="font-weight:600;">${pct}%</span>
                          </div>
                        </td>
                        <td>
                          <span class="badge badge-${club.status === 'active' ? 'success' : 'danger'}">
                            ${club.status}
                          </span>
                        </td>
                        <td style="text-align:center;">
                          <button class="btn btn-ghost btn-xs adjust-club-points-btn" data-club-id="${club.id}" data-club-name="${club.name}" style="padding:4px 8px;">
                            <i data-lucide="sliders" style="width:12px;height:12px;margin-right:3px;vertical-align:-1px;"></i> Adjust
                          </button>
                        </td>
                      </tr>
                    `;
                  }).join('');
                })()}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Point Criteria Table -->
      <div class="card stagger-enter hover-lift" style="margin-top:1.5rem;">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
          <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
            <i data-lucide="list-checks" style="width:18px;height:18px;color:var(--color-primary)"></i>
            Point Criteria Reference List (Grouped)
          </h3>
          <span style="font-size:12px; color:var(--color-text-muted);">Evaluation Guidelines</span>
        </div>
        <div class="card-body" style="padding:0; overflow-x:auto;">
          ${criteriaTableHtml}
        </div>
      </div>
    `;
  } else if (activeTab === 'submissions') {
    // ------------------------------------
    // TAB: CLUB SUBMISSIONS (APPROVAL FLOW)
    // ------------------------------------
    
    // Filter logic
    let filteredSubmissions = allSubmissions;
    if (filterClub !== 'all') {
      filteredSubmissions = filteredSubmissions.filter(s => s.clubId === filterClub);
    }
    if (filterStatus !== 'all') {
      filteredSubmissions = filteredSubmissions.filter(s => s.status === filterStatus);
    }

    // Sort submissions: Pending first, then chronologically reverse
    filteredSubmissions.sort((a, b) => {
      if (a.status === 'pending' && b.status !== 'pending') return -1;
      if (a.status !== 'pending' && b.status === 'pending') return 1;
      return b.submittedAt.localeCompare(a.submittedAt);
    });

    const filterClubOptions = clubs.map(c => `
      <option value="${c.id}" ${filterClub === c.id ? 'selected' : ''}>${c.name.replace('Leo Club of ', '')}</option>
    `).join('');

    let submissionsTableHtml = '';
    
    if (filteredSubmissions.length === 0) {
      submissionsTableHtml = `
        <div style="padding:48px; text-align:center; color:var(--color-text-muted);">
          <i data-lucide="inbox" style="width:42px; height:42px; margin-bottom:12px; color:var(--color-text-muted); opacity:0.4;"></i>
          <p style="font-size:0.9rem;">No submissions match the selected filters.</p>
        </div>
      `;
    } else {
      submissionsTableHtml = `
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Club Name</th>
                <th>Month</th>
                <th>Submitted Date</th>
                <th>Submitted By</th>
                <th>Claimed Points</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${filteredSubmissions.map(sub => {
                const dateStr = new Date(sub.submittedAt).toLocaleString();
                let badgeClass = 'badge-secondary';
                if (sub.status === 'approved') badgeClass = 'badge-success';
                else if (sub.status === 'rejected') badgeClass = 'badge-danger';
                else if (sub.status === 'pending') badgeClass = 'badge-warning';

                const isPending = sub.status === 'pending';
                const btnText = isPending ? 'Review & Action' : 'View Details';
                const btnClass = isPending ? 'btn-primary' : 'btn-ghost';
                const btnIcon = isPending ? 'clipboard-check' : 'eye';

                return `
                  <tr>
                    <td style="font-weight:700;">${sub.clubName.replace('Leo Club of ', '')}</td>
                    <td style="font-weight:700; color:var(--color-cyan-glow);">${sub.month}</td>
                    <td>${dateStr}</td>
                    <td>${sub.submittedBy}</td>
                    <td style="font-weight:700; color:var(--color-primary);">${sub.totalPoints.toLocaleString()} pts</td>
                    <td>
                      <span class="badge ${badgeClass}">${sub.status.toUpperCase()}</span>
                    </td>
                    <td>
                      <button class="btn ${btnClass} btn-xs review-sub-btn" data-sub-id="${sub.id}">
                        <i data-lucide="${btnIcon}" style="width:12px;height:12px;margin-right:4px;vertical-align:-1px;"></i> ${btnText}
                      </button>
                    </td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>
        </div>
      `;
    }

    tabContentHtml = `
      <div class="card stagger-enter" style="animation-delay:0.1s;">
        <!-- Card Header with Filters -->
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px; border-bottom:1px solid var(--color-glass-border); padding:16px 20px;">
          <h3 class="card-title" style="display:flex; align-items:center; gap:6px;"><i data-lucide="clipboard-list" style="width:18px;height:18px;color:var(--color-primary);"></i> Monthly Point Submissions</h3>
          
          <!-- Filter Controls -->
          <div style="display:flex; gap:12px; flex-wrap:wrap;">
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:11.5px; color:var(--color-text-secondary); font-weight:600;">Club:</span>
              <select id="filter-club-select" class="form-input" style="height:32px; font-size:12px; padding:2px 8px; width:150px; background:rgba(0,0,0,0.2); border:1px solid var(--color-glass-border);">
                <option value="all" ${filterClub === 'all' ? 'selected' : ''}>All Clubs</option>
                ${filterClubOptions}
              </select>
            </div>
            
            <div style="display:flex; align-items:center; gap:6px;">
              <span style="font-size:11.5px; color:var(--color-text-secondary); font-weight:600;">Status:</span>
              <select id="filter-status-select" class="form-input" style="height:32px; font-size:12px; padding:2px 8px; width:120px; background:rgba(0,0,0,0.2); border:1px solid var(--color-glass-border);">
                <option value="all" ${filterStatus === 'all' ? 'selected' : ''}>All Statuses</option>
                <option value="pending" ${filterStatus === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="approved" ${filterStatus === 'approved' ? 'selected' : ''}>Approved</option>
                <option value="rejected" ${filterStatus === 'rejected' ? 'selected' : ''}>Rejected</option>
              </select>
            </div>
          </div>
        </div>
        
        <div class="card-body" style="padding:0; overflow-x:auto;">
          ${submissionsTableHtml}
        </div>
      </div>
    `;
  }

  // Draw full page layout
  app.innerHTML = `
    <div class="dashboard-layout">
      ${renderSidebar()}
      <div class="main-content">
        ${renderHeader('Points & Criteria', ['Performance', 'Points'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Page Header -->
          <div class="page-header stagger-enter">
            <div>
              <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">DISTRICT STANDINGS</span>
              <h1 style="margin:0;">Points & Criteria</h1>
              <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Manage club performance evaluation criteria and view standings</p>
            </div>
            ${activeTab === 'leaderboard' ? `
            <div class="page-header-actions">
              <button class="btn btn-primary" id="add-criteria-btn">
                <i data-lucide="plus" style="width:16px;height:16px"></i> Add Criteria
              </button>
            </div>
            ` : ''}
          </div>

          <!-- Tab Headers -->
          ${tabHeaderHtml}

          <!-- Tab Content -->
          ${tabContentHtml}

        </div>
      </div>
    </div>
  `;

  // Initialize standard framework components
  lucide.createIcons();
  initSidebar();
  initHeader();

  // ------------------------------------
  // SET UP LISTENERS & ACTIONS
  // ------------------------------------
  
  // Tab click listeners
  document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      activeTab = btn.dataset.tab;
      renderDistrictPoints();
    });
  });

  if (activeTab === 'leaderboard') {
    // Add Criteria
    document.getElementById('add-criteria-btn')?.addEventListener('click', () => {
      showModal('Add Point Criteria', getCriteriaFormHtml(), {
        submitText: 'Add Criteria',
        onSubmit: (close) => {
          const vals = getCriteriaFormValues();
          if (!vals.category || !vals.maxPoints) {
            showToast('error', 'Validation Error', 'Category and max points are required.');
            return;
          }
          store.create('pointCriteria', vals);
          showToast('success', 'Criteria Added', `${vals.category} has been added.`);
          close();
          renderDistrictPoints();
        }
      });
    });

    // Edit Criteria
    document.querySelectorAll('.edit-crit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const crit = store.getById('pointCriteria', btn.dataset.id);
        if (!crit) return;
        showModal('Edit Criteria', getCriteriaFormHtml(crit), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const vals = getCriteriaFormValues();
            if (!vals.category || !vals.maxPoints) {
              showToast('error', 'Validation Error', 'Category and max points are required.');
              return;
            }
            store.update('pointCriteria', crit.id, vals);
            showToast('success', 'Criteria Updated', `${vals.category} has been updated.`);
            close();
            renderDistrictPoints();
          }
        });
      });
    });

    // Delete Criteria
    document.querySelectorAll('.delete-crit-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const crit = store.getById('pointCriteria', btn.dataset.id);
        if (!crit) return;
        showConfirm('Delete Criteria', `Are you sure you want to delete "<strong>${crit.category}</strong>"? This will affect all club point calculations.`, () => {
          store.delete('pointCriteria', crit.id);
          showToast('success', 'Criteria Deleted', `${crit.category} has been removed.`);
          renderDistrictPoints();
        });
      });
    });

    // Adjust Club Points
    document.querySelectorAll('.adjust-club-points-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const clubId = btn.dataset.clubId;
        const clubName = btn.dataset.clubName;
        const cp = store.getClubPoints(clubId);
        const pointsObj = cp?.points || {};

        const formHtml = `
          <div style="display:flex; flex-direction:column; gap:16px; max-height:500px; min-height:400px; width:100%; overflow:hidden;">
            <p style="font-size:13px; color:var(--color-text-secondary); margin:0;">Adjust points for <strong>${clubName}</strong> across criteria categories:</p>
            
            <!-- Tab Headers -->
            <div class="tabs-header" style="display:flex; border-bottom:1px solid var(--color-glass-border); padding-bottom:8px; gap:8px; overflow-x:auto; flex-shrink:0;">
              <button class="tab-btn active btn btn-ghost btn-sm" data-tab="tab-ad" style="font-weight:600; padding:6px 12px; border-radius:6px; white-space:nowrap;">AD: Admin</button>
              <button class="tab-btn btn btn-ghost btn-sm" data-tab="tab-ac" style="font-weight:600; padding:6px 12px; border-radius:6px; white-space:nowrap;">AC: Projects/PR</button>
              <button class="tab-btn btn btn-ghost btn-sm" data-tab="tab-int" style="font-weight:600; padding:6px 12px; border-radius:6px; white-space:nowrap;">INT: Participation</button>
              <button class="tab-btn btn btn-ghost btn-sm" data-tab="tab-sp" style="font-weight:600; padding:6px 12px; border-radius:6px; white-space:nowrap;">SP: Special & Deducts</button>
            </div>

            <!-- Search/Filter -->
            <div style="position:relative; flex-shrink:0;">
              <input type="text" id="modal-crit-search" class="form-input" placeholder="Search criteria in this tab..." style="padding-left:32px; font-size:13px; height:36px;" />
              <i data-lucide="search" style="position:absolute; left:10px; top:11px; width:14px; height:14px; color:var(--color-text-muted);"></i>
            </div>

            <!-- Tab Content Containers -->
            <div class="tabs-content" style="flex:1; overflow-y:auto; padding-right:6px; display:flex; flex-direction:column; gap:16px;">
              <!-- AD Tab -->
              <div id="tab-ad" class="tab-pane active-pane" style="display:flex; flex-direction:column;">
                ${renderModalCategoryGroup(criteria.filter(c => c.id.startsWith('ad')), pointsObj)}
              </div>

              <!-- AC Tab -->
              <div id="tab-ac" class="tab-pane" style="display:none; flex-direction:column;">
                ${renderModalCategoryGroup(criteria.filter(c => c.id.startsWith('ac')), pointsObj)}
              </div>

              <!-- INT Tab -->
              <div id="tab-int" class="tab-pane" style="display:none; flex-direction:column;">
                ${renderModalCategoryGroup(criteria.filter(c => c.id.startsWith('int')), pointsObj)}
              </div>

              <!-- SP Tab -->
              <div id="tab-sp" class="tab-pane" style="display:none; flex-direction:column;">
                ${renderModalCategoryGroup(criteria.filter(c => c.id.startsWith('sp')), pointsObj)}
              </div>
            </div>
          </div>
        `;

        showModal('Adjust Club Performance Points', formHtml, {
          submitText: 'Save Points',
          size: 'lg',
          onSubmit: (close) => {
            const updatedPoints = {};
            let isValid = true;
            document.querySelectorAll('.club-crit-input').forEach(input => {
              const val = parseInt(input.value) || 0;
              const minVal = parseInt(input.min) || 0;
              const maxVal = parseInt(input.max) || 0;
              if (val < minVal || val > maxVal) {
                const critId = input.dataset.critId;
                const crit = criteria.find(c => c.id === critId);
                showToast('error', 'Validation Error', `Points for "${crit.description.substring(0,25)}..." must be between ${minVal} and ${maxVal}.`);
                isValid = false;
                return;
              }
              updatedPoints[input.dataset.critId] = val;
            });

            if (!isValid) return;

            store.updateClubPoints(clubId, updatedPoints);
            showToast('success', 'Points Adjusted', `Performance points for ${clubName} updated successfully.`);
            close();
            renderDistrictPoints();
          }
        });

        // Set up Tab & Search Handlers in modal
        const modal = document.getElementById('modal-container');
        if (modal) {
          if (window.lucide) lucide.createIcons({ nodes: [modal] });

          const tabBtns = modal.querySelectorAll('.tab-btn');
          const tabPanes = modal.querySelectorAll('.tab-pane');
          tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
              tabBtns.forEach(b => b.classList.remove('active'));
              btn.classList.add('active');

              const target = btn.dataset.tab;
              tabPanes.forEach(pane => {
                if (pane.id === target) {
                  pane.style.display = 'flex';
                  pane.classList.add('active-pane');
                } else {
                  pane.style.display = 'none';
                  pane.classList.remove('active-pane');
                }
              });

              const searchInput = modal.querySelector('#modal-crit-search');
              if (searchInput) searchInput.value = '';
              filterModalRows('');
            });
          });

          const searchInput = modal.querySelector('#modal-crit-search');
          searchInput?.addEventListener('input', (e) => {
            filterModalRows(e.target.value.toLowerCase().trim());
          });

          function filterModalRows(query) {
            const activePane = modal.querySelector('.tab-pane.active-pane');
            if (!activePane) return;

            activePane.querySelectorAll('.modal-cat-section').forEach(section => {
              let hasVisibleRow = false;
              section.querySelectorAll('.crit-input-row').forEach(row => {
                const matches = row.dataset.searchText.includes(query);
                if (matches) {
                  row.style.display = 'block';
                  hasVisibleRow = true;
                } else {
                  row.style.display = 'none';
                }
              });

              if (hasVisibleRow) {
                section.style.display = 'block';
              } else {
                section.style.display = 'none';
              }
            });
          }
        }
      });
    });
  }

  // Submissions Tab Specifics
  if (activeTab === 'submissions') {
    const clubFilter = document.getElementById('filter-club-select');
    const statusFilter = document.getElementById('filter-status-select');

    clubFilter?.addEventListener('change', () => {
      filterClub = clubFilter.value;
      renderDistrictPoints();
    });

    statusFilter?.addEventListener('change', () => {
      filterStatus = statusFilter.value;
      renderDistrictPoints();
    });

    document.querySelectorAll('.review-sub-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.dataset.subId;
        const sub = store.getById('pointsSubmissions', subId);
        if (!sub) return;

        const isPending = sub.status === 'pending';

        let itemsHtml = `
          <div class="data-table-wrapper" style="margin-top: 10px;">
            <table class="data-table" style="font-size: 0.8rem;">
              <thead>
                <tr>
                  <th>Criteria Description</th>
                  <th style="width: 150px;">Points Allocated</th>
                </tr>
              </thead>
              <tbody>
        `;

        sub.checkedCriteria.forEach(critId => {
          const crit = criteria.find(c => c.id === critId);
          const pointsClaimed = sub.pointsClaimed[critId] || 0;
          
          const critProofs = Array.isArray(sub.proofAttachments) 
            ? (sub.proofAttachments || [])
            : (sub.proofAttachments?.[critId] || []);

          let critProofsHtml = '';
          if (critProofs.length > 0) {
            critProofsHtml = `
              <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
                ${critProofs.map(att => `
                  <a href="${att.url}" target="_blank" download="${att.name}" style="display:inline-flex; align-items:center; gap:4px; padding:3px 8px; border-radius:4px; background:rgba(0,212,255,0.08); border:1px solid rgba(0,212,255,0.2); color:var(--color-primary); font-size:11px; text-decoration:none;" title="View / Download Proof">
                    <i data-lucide="${att.isLink ? 'link' : 'paperclip'}" style="width:12px;height:12px;"></i>
                    <span>${att.name}</span>
                    <span style="font-size:10px; opacity:0.7;">(${att.size})</span>
                  </a>
                `).join('')}
              </div>
            `;
          } else {
            critProofsHtml = `<div style="font-size:11px; color:var(--color-text-muted); font-style:italic; margin-top:4px;">No proof attached for this claim item.</div>`;
          }

          itemsHtml += `
            <tr>
              <td style="vertical-align:top;">
                <div style="font-size:0.75rem; color:var(--color-primary); font-weight:600;">${crit?.category || 'General'}</div>
                <div style="font-size:0.85rem; color:var(--color-text-primary); margin-top:2px;">${crit?.description || critId}</div>
                ${critProofsHtml}
              </td>
              <td style="vertical-align:top;">
                ${isPending ? `
                  <div style="display:flex; align-items:center; gap:8px;">
                    <input type="number" class="form-input review-crit-input" data-crit-id="${critId}" value="${pointsClaimed}" style="width:100px; height:28px; font-size:12px; font-weight:700; background:rgba(0,0,0,0.2); border:1px solid var(--color-glass-border);" />
                    <span style="font-size:11px; color:var(--color-text-muted);">pts</span>
                  </div>
                ` : `
                  <strong style="color:var(--color-primary); font-size:0.95rem;">${pointsClaimed.toLocaleString()} pts</strong>
                `}
              </td>
            </tr>
          `;
        });

        itemsHtml += `
              </tbody>
            </table>
          </div>
        `;

        const reviewerName = auth.currentUser?.name || 'District Officer';

        const reviewFormHtml = `
          <div style="display:flex; flex-direction:column; gap:16px; max-height:500px; overflow-y:auto; padding-right:6px; min-width: 480px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--color-glass-border);">
              <div>
                <span style="color:var(--color-text-muted);">Submitted By:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.submittedBy}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Submission Month:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.month}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Total Claimed:</span>
                <strong style="display:block; color:var(--color-primary); margin-top:2px; font-size:1.05rem;">${sub.totalPoints.toLocaleString()} pts</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Status:</span>
                <span class="badge badge-warning" style="margin-top:4px;">${sub.status.toUpperCase()}</span>
              </div>
            </div>

            <h4 style="font-size:13px; font-weight:700; color:var(--color-text-primary); margin:8px 0 0 0;">Verify & Adjust Points Claims</h4>
            ${itemsHtml}

            <div class="form-group" style="margin-top:8px;">
              <label class="form-label" style="font-size:12px; margin-bottom:6px;">Review Remarks / Comments</label>
              <textarea id="review-comment" class="form-textarea" rows="3" placeholder="Explain any points adjustments, or provide reasons if rejecting the claim..." style="font-size:12px;"></textarea>
            </div>

            <div style="display:flex; justify-content:flex-end; gap:10px; margin-top:16px; border-top:1px solid var(--color-glass-border); padding-top:16px;">
              <button class="btn btn-secondary review-cancel-btn" style="height:36px;">Cancel</button>
              <button class="btn btn-danger review-reject-btn" data-sub-id="${sub.id}" style="background:var(--color-danger); border:none; color:white; height:36px; display:flex; align-items:center; gap:4px;">
                <i data-lucide="x-circle" style="width:14px;height:14px;"></i> Reject Claim
              </button>
              <button class="btn btn-primary review-approve-btn" data-sub-id="${sub.id}" style="height:36px; display:flex; align-items:center; gap:4px;">
                <i data-lucide="check-circle" style="width:14px;height:14px;"></i> Approve Claim
              </button>
            </div>
          </div>
        `;

        const readOnlyHtml = `
          <div style="display:flex; flex-direction:column; gap:16px; max-height:500px; overflow-y:auto; padding-right:6px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px; background:rgba(255,255,255,0.02); padding:12px; border-radius:8px; border:1px solid var(--color-glass-border);">
              <div>
                <span style="color:var(--color-text-muted);">Submitted By:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.submittedBy}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Submission Month:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.month}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Approved Points:</span>
                <strong style="display:block; color:var(--color-primary); margin-top:2px; font-size:1.05rem;">${sub.totalPoints.toLocaleString()} pts</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Status:</span>
                <span class="badge ${sub.status === 'approved' ? 'badge-success' : 'badge-danger'}" style="margin-top:4px;">${sub.status.toUpperCase()}</span>
              </div>
            </div>

            <h4 style="font-size:13px; font-weight:700; color:var(--color-text-primary); margin:8px 0 0 0;">Points Details</h4>
            ${itemsHtml}

            <div style="padding:12px; border-radius:8px; background:rgba(255,255,255,0.02); border:1px solid var(--color-glass-border);">
              <p style="font-size:12px; color:var(--color-text-muted); margin-bottom:4px;">Review Details:</p>
              <strong style="font-size:13px; color:var(--color-text-primary); display:block;">Reviewed by: ${sub.reviewedBy}</strong>
              <span style="font-size:11px; color:var(--color-text-muted); display:block; margin-top:2px;">Date: ${new Date(sub.reviewedAt).toLocaleString()}</span>
              <p style="font-size:12px; color:var(--color-text-secondary); font-style:italic; margin-top:8px; border-top:1px solid rgba(255,255,255,0.05); padding-top:8px;">
                "${sub.comment || 'No comment provided.'}"
              </p>
            </div>
          </div>
        `;

        const closeReview = showModal(
          isPending ? 'Review Points Claim' : `Submission Details - ${sub.month}`, 
          isPending ? reviewFormHtml : readOnlyHtml, 
          { showFooter: false, size: 'lg' }
        );

        if (isPending) {
          const modalNode = document.getElementById('modal-container');
          if (window.lucide) lucide.createIcons({ nodes: [modalNode] });

          modalNode?.querySelector('.review-cancel-btn')?.addEventListener('click', closeReview);
          
          modalNode?.querySelector('.review-reject-btn')?.addEventListener('click', () => {
            const comment = modalNode.querySelector('#review-comment')?.value?.trim() || '';
            try {
              store.rejectPointsSubmission(sub.id, reviewerName, comment);
              showToast('success', 'Claim Rejected', `Points claim for ${sub.clubName.replace('Leo Club of ', '')} has been rejected.`);
              closeReview();
              renderDistrictPoints();
            } catch (err) {
              showToast('error', 'Rejection Failed', err.message);
            }
          });

          modalNode?.querySelector('.review-approve-btn')?.addEventListener('click', () => {
            const comment = modalNode.querySelector('#review-comment')?.value?.trim() || '';
            const adjustedPoints = {};
            let isValid = true;

            modalNode.querySelectorAll('.review-crit-input').forEach(input => {
              const val = parseInt(input.value);
              const critId = input.dataset.critId;
              const crit = criteria.find(c => c.id === critId);
              const minVal = crit.maxPoints < 0 ? crit.maxPoints : 0;
              const maxVal = crit.maxPoints < 0 ? 0 : crit.maxPoints;

              if (isNaN(val) || val < minVal || val > maxVal) {
                showToast('error', 'Validation Error', `Points for "${crit.description.substring(0, 20)}..." must be between ${minVal} and ${maxVal}.`);
                isValid = false;
                return;
              }
              adjustedPoints[critId] = val;
            });

            if (!isValid) return;

            try {
              store.approvePointsSubmission(sub.id, reviewerName, comment, adjustedPoints);
              showToast('success', 'Claim Approved', `Points claim for ${sub.clubName.replace('Leo Club of ', '')} has been approved and added.`);
              closeReview();
              renderDistrictPoints();
            } catch (err) {
              showToast('error', 'Approval Failed', err.message);
            }
          });
        }
      });
    });
  }

  return () => {
    destroyAllCharts();
  };
}
