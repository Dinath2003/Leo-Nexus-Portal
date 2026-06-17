// ============================================
// LEO NEXUS PORTAL — DISTRICT POINTS & CRITERIA
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { renderTable } from '../../components/table.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';

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

  // Prepare radar chart data
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

  // Grouped table HTML
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
              <h1 style="margin:0;">Points & Criteria</h1>
              <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Manage club performance evaluation criteria and view standings</p>
            </div>
            <div class="page-header-actions">
              <button class="btn btn-primary" id="add-criteria-btn">
                <i data-lucide="plus" style="width:16px;height:16px"></i> Add Criteria
              </button>
            </div>
          </div>

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

          <!-- Point Criteria Table -->
          <div class="card stagger-enter hover-lift" style="margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title">
                <i data-lucide="list-checks" style="width:18px;height:18px;color:var(--color-primary)"></i>
                Point Criteria Reference List (Grouped)
              </h3>
            </div>
            <div class="card-body" style="padding:0; overflow-x:auto;">
              ${criteriaTableHtml}
            </div>
          </div>

          <div class="grid-2 stagger-enter" style="margin-top:1.5rem;">
            <!-- Leaderboard -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="trophy" style="width:18px;height:18px;color:#f59e0b"></i>
                  Club Leaderboard
                </h3>
              </div>
              <div class="card-body" style="padding:0;">
                <div class="data-table-wrapper">
                  <table class="data-table">
                    <thead>
                      <tr>
                        <th style="width:45px">#</th>
                        <th>Club</th>
                        <th>Points</th>
                        <th style="width:120px">Progress</th>
                        <th style="width:100px">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${leaderboard.map((club, i) => {
                        const maxVal = Math.max(1, totalMaxPoints);
                        const pct = Math.max(0, Math.min(100, Math.round((club.totalPoints / maxVal) * 100)));
                        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`;
                        return `
                          <tr>
                            <td style="font-weight:700; font-size:1rem;">${medal}</td>
                            <td>
                              <div style="font-weight:600;">${club.name.replace('Leo Club of ', '')}</div>
                              <div style="font-size:0.7rem; color:var(--color-text-muted);">${club.zone}</div>
                            </td>
                            <td><span style="font-weight:700; color:var(--color-primary); font-size:1rem;">${club.totalPoints.toLocaleString()}</span></td>
                            <td>
                              <div style="background:var(--color-bg-secondary); border-radius:4px; height:6px; overflow:hidden;">
                                <div style="height:100%; width:${pct}%; background:linear-gradient(90deg, var(--color-primary), var(--color-cyan)); border-radius:4px;"></div>
                              </div>
                              <div style="font-size:0.65rem; color:var(--color-text-muted); margin-top:2px;">${pct}%</div>
                            </td>
                            <td>
                              <button class="btn btn-ghost btn-xs adjust-club-points-btn" data-club-id="${club.id}" data-club-name="${club.name}">
                                <i data-lucide="sliders" style="width:12px;height:12px;margin-right:2px;vertical-align:-1px;"></i> Adjust
                              </button>
                            </td>
                          </tr>`;
                      }).join('')}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <!-- Radar Chart -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title">
                  <i data-lucide="radar" style="width:18px;height:18px;color:var(--color-cyan)"></i>
                  Normalized Points Distribution (%)
                </h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:320px;">
                  <canvas id="points-radar-chart"></canvas>
                </div>
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

  // Radar Chart
  if (radarDatasets.length > 0) {
    createChart('points-radar-chart', 'radar', {
      labels: radarLabels.map(l => l.split(':')[0]),
      datasets: radarDatasets
    }, {
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: {
        r: { min: 0, max: 100, suggestedMax: 100, beginAtZero: true }
      }
    });
  }

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

  return () => {
    destroyAllCharts();
  };
}

