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
          <input type="number" class="form-input" id="crit-maxPoints" value="${criteria?.maxPoints || ''}" placeholder="e.g. 30" min="1" required />
        </div>
        <div class="form-group">
          <label class="form-label">Points Per Unit</label>
          <input type="number" class="form-input" id="crit-perUnit" value="${criteria?.perUnit || ''}" placeholder="e.g. 5" min="1" />
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

  // Prepare radar chart data
  const radarLabels = criteria.map(c => c.category.length > 20 ? c.category.substring(0, 20) + '...' : c.category);
  const topClubs = leaderboard.slice(0, 3);
  const radarDatasets = topClubs.map(club => {
    const cp = club.pointBreakdown;
    return {
      label: club.name.replace('Leo Club of ', ''),
      data: criteria.map(c => cp?.points?.[c.id] || 0)
    };
  });

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
              <div class="stat-value">${totalMaxPoints}</div>
              <div class="stat-label">Max Points</div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="trophy" style="color:#f59e0b"></i></div>
              <div class="stat-value">${leaderboard.length > 0 ? leaderboard[0].totalPoints : 0}</div>
              <div class="stat-label">Highest Score</div>
            </div>
            <div class="card stat-card hover-lift water-effect">
              <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="bar-chart-3" style="color:#14b8a6"></i></div>
              <div class="stat-value">${store.getDistrictStats().avgPoints}</div>
              <div class="stat-label">Average</div>
            </div>
          </div>

          <!-- Point Criteria Table -->
          <div class="card stagger-enter hover-lift" style="margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title">
                <i data-lucide="list-checks" style="width:18px;height:18px;color:var(--color-primary)"></i>
                Point Criteria
              </h3>
            </div>
            <div class="card-body" style="padding:0;">
              ${renderTable(
                [
                  { label: 'Category', render: row => `<span style="font-weight:600;color:var(--color-text-primary);">${row.category}</span>` },
                  { label: 'Description', render: row => `<span style="font-size:0.8rem;color:var(--color-text-secondary);">${row.description ? (row.description.length > 60 ? row.description.substring(0,60)+'...' : row.description) : '—'}</span>` },
                  { label: 'Max Points', render: row => `<span style="font-weight:700;color:var(--color-primary);">${row.maxPoints}</span>` },
                  { label: 'Per Unit', render: row => `${row.perUnit} pts / ${row.unit}` },
                ],
                criteria,
                {
                  emptyMessage: 'No criteria defined',
                  actions: (row) => `
                    <button class="btn btn-icon btn-ghost btn-sm edit-crit-btn" data-id="${row.id}" title="Edit">
                      <i data-lucide="pencil" style="width:14px;height:14px"></i>
                    </button>
                    <button class="btn btn-icon btn-ghost btn-sm delete-crit-btn" data-id="${row.id}" title="Delete">
                      <i data-lucide="trash-2" style="width:14px;height:14px;color:var(--color-danger)"></i>
                    </button>
                  `
                }
              )}
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
                        const pct = totalMaxPoints > 0 ? Math.round((club.totalPoints / totalMaxPoints) * 100) : 0;
                        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}`;
                        return `
                          <tr>
                            <td style="font-weight:700; font-size:1rem;">${medal}</td>
                            <td>
                              <div style="font-weight:600;">${club.name.replace('Leo Club of ', '')}</div>
                              <div style="font-size:0.7rem; color:var(--color-text-muted);">${club.zone}</div>
                            </td>
                            <td><span style="font-weight:700; color:var(--color-primary); font-size:1rem;">${club.totalPoints}</span></td>
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
                  Points Distribution
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
      labels: radarLabels,
      datasets: radarDatasets
    }, {
      plugins: { legend: { display: true, position: 'bottom' } },
      scales: {
        r: { suggestedMax: Math.max(...criteria.map(c => c.maxPoints)) }
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
        <div style="display:flex; flex-direction:column; gap:12px; max-height:400px; overflow-y:auto; padding-right:6px;">
          <p style="font-size:13px; color:var(--color-text-secondary); margin-bottom:8px;">Adjust points for <strong>${clubName}</strong> across criteria categories:</p>
          ${criteria.map(crit => {
            const currentPoints = pointsObj[crit.id] || 0;
            return `
              <div class="form-group" style="margin-bottom:12px;">
                <label class="form-label" style="display:flex; justify-content:space-between;">
                  <span>${crit.category}</span>
                  <span style="color:var(--color-text-muted); font-weight:normal;">Max: ${crit.maxPoints}</span>
                </label>
                <input type="number" class="form-input club-crit-input" data-crit-id="${crit.id}" min="0" max="${crit.maxPoints}" value="${currentPoints}" />
              </div>
            `;
          }).join('')}
        </div>
      `;

      showModal('Adjust Club Performance Points', formHtml, {
        submitText: 'Save Points',
        onSubmit: (close) => {
          const updatedPoints = {};
          let isValid = true;
          document.querySelectorAll('.club-crit-input').forEach(input => {
            const val = parseInt(input.value) || 0;
            const maxVal = parseInt(input.max) || 0;
            if (val < 0 || val > maxVal) {
              showToast('error', 'Validation Error', `Points must be between 0 and ${maxVal}.`);
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
    });
  });

  return () => {
    destroyAllCharts();
  };
}
