// ============================================
// LEO NEXUS PORTAL — CLUB POINTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { renderTable } from '../../components/table.js';

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

export function renderClubPoints() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
  const club = auth.userClub;

  const clubPointsData = store.getClubPoints(clubId);
  const totalPoints = store.getTotalClubPoints(clubId);
  const pointCriteria = store.getAll('pointCriteria');
  const leaderboard = store.getLeaderboard();
  const clubRank = leaderboard.findIndex(c => c.id === clubId) + 1;

  // Calculate max possible and district average
  const maxPossible = Object.values(categoryMaxPoints).reduce((a, b) => a + b, 0);
  const allClubs = store.getAll('clubs');
  const districtAvg = allClubs.length > 0
    ? Math.round(allClubs.reduce((sum, c) => sum + store.getTotalClubPoints(c.id), 0) / allClubs.length)
    : 0;

  // Aggregated points percentages
  const clubPcts = getCategoryPercentages(clubPointsData?.points || {});
  const categoryProgress = Object.entries(categoryMaxPoints).map(([cat, max]) => {
    const current = getAggregatedPoints(clubPointsData?.points || {})[cat] || 0;
    const pct = clubPcts[cat] || 0;
    return {
      category: cat,
      current,
      maxPoints: max,
      pct
    };
  });

  // Rank badge
  const rankBadges = {
    1: { icon: '🥇', color: '#fbbf24', label: 'Gold' },
    2: { icon: '🥈', color: '#94a3b8', label: 'Silver' },
    3: { icon: '🥉', color: '#d97706', label: 'Bronze' },
  };
  const rankInfo = rankBadges[clubRank] || { icon: '#' + clubRank, color: 'var(--color-primary)', label: '' };

  // Progress bar color based on percentage
  function getBarColor(pct) {
    if (pct >= 80) return '#14b8a6';
    if (pct >= 50) return '#3d8bff';
    if (pct >= 25) return '#f59e0b';
    return '#ef4444';
  }

  // Group criteria by category
  const groupedCriteria = {};
  pointCriteria.forEach(c => {
    if (!groupedCriteria[c.category]) {
      groupedCriteria[c.category] = [];
    }
    groupedCriteria[c.category].push(c);
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
            <th style="width: 180px;">Your Club Points</th>
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
      const currentPoints = clubPointsData?.points?.[item.id] || 0;
      const displayPoints = item.maxPoints < 0
        ? `<span style="font-weight:700;color:var(--color-danger);">${item.maxPoints.toLocaleString()}</span>`
        : `<span style="font-weight:700;color:var(--color-primary);">${item.maxPoints.toLocaleString()}</span>`;

      const unitDisplay = Math.abs(item.maxPoints) === Math.abs(item.perUnit)
        ? `Flat`
        : `${item.perUnit.toLocaleString()} pts / ${item.unit}`;

      const pct = item.maxPoints < 0
        ? (currentPoints === 0 ? 0 : Math.round((currentPoints / item.maxPoints) * 100))
        : (item.maxPoints > 0 ? Math.round((currentPoints / item.maxPoints) * 100) : 0);
      
      const pctCapped = Math.max(0, Math.min(100, pct));
      const scoreColor = item.maxPoints < 0 && currentPoints < 0
        ? 'var(--color-danger)'
        : (currentPoints > 0 ? 'var(--color-success)' : 'var(--color-text-muted)');

      criteriaTableHtml += `
        <tr>
          <td style="font-weight:600; text-align:center;">${itemNum}</td>
          <td style="font-size:0.85rem; color:var(--color-text-secondary); white-space:normal; line-height:1.4;">${item.description}</td>
          <td>${displayPoints}</td>
          <td>${unitDisplay}</td>
          <td>
            <div style="display:flex;align-items:center;gap:8px;">
              <span style="font-weight:700;color:${scoreColor};min-width:60px;">${currentPoints.toLocaleString()}</span>
              <div style="width:60px;height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">
                <div style="width:${pctCapped}%;height:100%;background:${getBarColor(pctCapped)};border-radius:3px;"></div>
              </div>
            </div>
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
        ${renderHeader('Points', ['Club', 'Points'])}
        <div class="page-content page-enter">
          <div class="ambient-bg">
            <div class="ambient-orb orb-1"></div>
            <div class="ambient-orb orb-2"></div>
          </div>

          <!-- Page Header -->
          <div class="page-header stagger-enter">
            <div>
              <h1>Club Performance Points</h1>
              <p style="color:var(--color-text-muted);margin-top:4px;">Track your club's achievements and ranking</p>
            </div>
          </div>

          <!-- Hero Points Display -->
          <div class="card stagger-enter hover-lift water-effect" style="animation-delay:0.1s;overflow:hidden;position:relative;">
            <div style="position:absolute;top:0;right:0;width:200px;height:200px;background:radial-gradient(circle at center, var(--color-primary-alpha), transparent);opacity:0.3;"></div>
            <div class="card-body" style="padding:32px;display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:24px;">
              <div style="display:flex;align-items:center;gap:24px;">
                <div style="width:110px;height:110px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, var(--color-primary-alpha), rgba(0,212,255,0.15));border:3px solid var(--color-primary);position:relative;">
                  <span style="font-size:24px;font-weight:800;color:var(--color-primary);">${totalPoints.toLocaleString()}</span>
                </div>
                <div>
                  <div style="font-size:28px;font-weight:700;color:var(--color-text-primary);">Total Points</div>
                  <div style="font-size:14px;color:var(--color-text-muted);margin-top:4px;">Out of ${maxPossible.toLocaleString()} possible points</div>
                  <div style="margin-top:8px;width:200px;height:8px;background:var(--color-border);border-radius:4px;overflow:hidden;">
                    <div style="width:${Math.max(0, Math.min(100, Math.round((totalPoints / Math.max(1, maxPossible)) * 100)))}%;height:100%;background:linear-gradient(90deg, var(--color-primary), #00d4ff);border-radius:4px;transition:width 1s ease;"></div>
                  </div>
                  <div style="font-size:12px;color:var(--color-text-muted);margin-top:4px;">${Math.max(0, Math.min(100, Math.round((totalPoints / Math.max(1, maxPossible)) * 100)))}% of maximum</div>
                </div>
              </div>
              <div style="display:flex;gap:20px;flex-wrap:wrap;">
                <div style="text-align:center;padding:16px 24px;background:${rankInfo.color}15;border-radius:14px;border:1px solid ${rankInfo.color}30;">
                  <div style="font-size:32px;margin-bottom:4px;">${typeof rankInfo.icon === 'string' && rankInfo.icon.startsWith('#') ? '' : rankInfo.icon}</div>
                  <div style="font-size:28px;font-weight:700;color:${rankInfo.color};">${typeof rankInfo.icon === 'string' && rankInfo.icon.startsWith('#') ? rankInfo.icon : ''}</div>
                  <div style="font-size:14px;font-weight:700;color:${rankInfo.color};">Rank #${clubRank}</div>
                  <div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">of ${allClubs.length} clubs</div>
                </div>
                <div style="text-align:center;padding:16px 24px;background:rgba(139,92,246,0.08);border-radius:14px;border:1px solid rgba(139,92,246,0.2);">
                  <div style="font-size:28px;font-weight:700;color:#8b5cf6;">${districtAvg.toLocaleString()}</div>
                  <div style="font-size:14px;font-weight:600;color:#8b5cf6;">Dist. Avg</div>
                  <div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">
                    ${totalPoints >= districtAvg
                      ? `<span style="color:#14b8a6;">+${(totalPoints - districtAvg).toLocaleString()} above</span>`
                      : `<span style="color:#ef4444;">${(totalPoints - districtAvg).toLocaleString()} below</span>`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-2 stagger-enter" style="animation-delay:0.2s; margin-top:1.5rem;">
            <!-- Points Breakdown with Progress Bars -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="bar-chart" style="width:18px;height:18px"></i> Category Performance Breakdown</h3>
              </div>
              <div class="card-body">
                <div style="display:flex;flex-direction:column;gap:16px;">
                  ${categoryProgress.map(cp => `
                    <div>
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <span style="font-size:13px;color:var(--color-text-primary);font-weight:500;">${cp.category}</span>
                        <span style="font-size:13px;font-weight:600;color:${getBarColor(cp.pct)};">${cp.current.toLocaleString()} / ${cp.maxPoints.toLocaleString()}</span>
                      </div>
                      <div style="width:100%;height:10px;background:var(--color-border);border-radius:5px;overflow:hidden;">
                        <div style="width:${cp.pct}%;height:100%;background:${getBarColor(cp.pct)};border-radius:5px;transition:width 1s ease;"></div>
                      </div>
                      <div style="font-size:11px;color:var(--color-text-muted);margin-top:3px;">${cp.pct}% achieved</div>
                    </div>
                  `).join('')}
                </div>
              </div>
            </div>

            <!-- Radar Chart -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="radar" style="width:18px;height:18px"></i> Performance Radar (%)</h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:340px;">
                  <canvas id="points-radar-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Point Criteria Reference Table -->
          <div class="card stagger-enter" style="animation-delay:0.3s; margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="book-open" style="width:18px;height:18px"></i> Point Criteria Reference (Grouped)</h3>
            </div>
            <div class="card-body" style="padding:0; overflow-x:auto;">
              ${criteriaTableHtml}
            </div>
          </div>

          <!-- Comparison with Leaderboard -->
          <div class="card stagger-enter" style="animation-delay:0.4s; margin-top:1.5rem;">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="trophy" style="width:18px;height:18px"></i> Club Rankings</h3>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${leaderboard.map((c, i) => {
                  const isClub = c.id === clubId;
                  const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
                  const maxVal = Math.max(1, maxPossible);
                  const pct = Math.max(0, Math.min(100, Math.round((c.totalPoints / maxVal) * 100)));
                  return `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:10px;${isClub ? 'background:var(--color-primary-alpha);border:1px solid rgba(0,102,255,0.3);' : 'background:var(--color-bg);border:1px solid var(--color-border);'}">
                      <span style="font-size:18px;width:32px;text-align:center;">${rankEmoji}</span>
                      <div style="flex:1;">
                        <div style="font-size:14px;font-weight:${isClub ? '700' : '500'};color:var(--color-text-primary);">
                          ${c.name} ${isClub ? '<span style="font-size:11px;color:var(--color-primary);">(You)</span>' : ''}
                        </div>
                        <div style="margin-top:4px;width:100%;height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">
                          <div style="width:${pct}%;height:100%;background:${isClub ? 'linear-gradient(90deg, var(--color-primary), var(--color-cyan))' : 'var(--color-text-muted)'};border-radius:3px;opacity:${isClub ? 1 : 0.4};"></div>
                        </div>
                      </div>
                      <span style="font-size:16px;font-weight:700;color:${isClub ? 'var(--color-primary)' : 'var(--color-text-secondary)'};">${c.totalPoints.toLocaleString()}</span>
                    </div>
                  `;
                }).join('')}
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

  // Radar Chart Labels
  const radarLabels = Object.keys(categoryMaxPoints);

  // District average per-category
  const avgCategoryPoints = radarLabels.map(cat => {
    let sum = 0;
    allClubs.forEach(c => {
      const cpd = store.getClubPoints(c.id);
      const cPcts = getCategoryPercentages(cpd?.points || {});
      sum += cPcts[cat] || 0;
    });
    return allClubs.length > 0 ? Math.round(sum / allClubs.length) : 0;
  });

  createChart('points-radar-chart', 'radar', {
    labels: radarLabels.map(l => l.split(':')[0]),
    datasets: [
      {
        label: club?.name?.replace('Leo Club of ', '') || 'Your Club',
        data: radarLabels.map(cat => clubPcts[cat] || 0),
        borderColor: '#0066ff',
        backgroundColor: '#0066ff20',
        borderWidth: 2,
        pointRadius: 4,
        pointBackgroundColor: '#0066ff',
      },
      {
        label: 'District Average',
        data: avgCategoryPoints,
        borderColor: '#8b5cf6',
        backgroundColor: '#8b5cf620',
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: '#8b5cf6',
        borderDash: [5, 5],
      }
    ]
  }, {
    scales: {
      r: {
        min: 0,
        max: 100,
        suggestedMax: 100,
        beginAtZero: true,
      }
    },
    plugins: {
      legend: { display: true, position: 'top' }
    }
  });

  return () => {
    destroyAllCharts();
  };
}
