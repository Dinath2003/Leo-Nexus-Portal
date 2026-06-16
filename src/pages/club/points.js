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
  const maxPossible = pointCriteria.reduce((sum, pc) => sum + pc.maxPoints, 0);
  const allClubs = store.getAll('clubs');
  const districtAvg = allClubs.length > 0
    ? Math.round(allClubs.reduce((sum, c) => sum + store.getTotalClubPoints(c.id), 0) / allClubs.length)
    : 0;

  // Points per category
  const categoryPoints = pointCriteria.map(pc => {
    const current = clubPointsData?.points?.[pc.id] || 0;
    const pct = pc.maxPoints > 0 ? Math.round((current / pc.maxPoints) * 100) : 0;
    return { ...pc, current, pct };
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
                <div style="width:90px;height:90px;border-radius:50%;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg, var(--color-primary-alpha), rgba(0,212,255,0.15));border:3px solid var(--color-primary);position:relative;">
                  <span style="font-size:32px;font-weight:800;color:var(--color-primary);">${totalPoints}</span>
                </div>
                <div>
                  <div style="font-size:28px;font-weight:700;color:var(--color-text-primary);">Total Points</div>
                  <div style="font-size:14px;color:var(--color-text-muted);margin-top:4px;">Out of ${maxPossible} possible points</div>
                  <div style="margin-top:8px;width:200px;height:8px;background:var(--color-border);border-radius:4px;overflow:hidden;">
                    <div style="width:${Math.round((totalPoints / maxPossible) * 100)}%;height:100%;background:linear-gradient(90deg, var(--color-primary), #00d4ff);border-radius:4px;transition:width 1s ease;"></div>
                  </div>
                  <div style="font-size:12px;color:var(--color-text-muted);margin-top:4px;">${Math.round((totalPoints / maxPossible) * 100)}% of maximum</div>
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
                  <div style="font-size:28px;font-weight:700;color:#8b5cf6;">${districtAvg}</div>
                  <div style="font-size:14px;font-weight:600;color:#8b5cf6;">Dist. Avg</div>
                  <div style="font-size:11px;color:var(--color-text-muted);margin-top:2px;">
                    ${totalPoints >= districtAvg
                      ? `<span style="color:#14b8a6;">+${totalPoints - districtAvg} above</span>`
                      : `<span style="color:#ef4444;">${totalPoints - districtAvg} below</span>`
                    }
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="grid-2 stagger-enter" style="animation-delay:0.2s;">
            <!-- Points Breakdown with Progress Bars -->
            <div class="card hover-lift">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="bar-chart" style="width:18px;height:18px"></i> Points Breakdown</h3>
              </div>
              <div class="card-body">
                <div style="display:flex;flex-direction:column;gap:16px;">
                  ${categoryPoints.map(cp => `
                    <div>
                      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px;">
                        <span style="font-size:13px;color:var(--color-text-primary);font-weight:500;">${cp.category}</span>
                        <span style="font-size:13px;font-weight:600;color:${getBarColor(cp.pct)};">${cp.current} / ${cp.maxPoints}</span>
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
                <h3 class="card-title"><i data-lucide="radar" style="width:18px;height:18px"></i> Performance Radar</h3>
              </div>
              <div class="card-body">
                <div class="chart-container" style="height:340px;">
                  <canvas id="points-radar-chart"></canvas>
                </div>
              </div>
            </div>
          </div>

          <!-- Point Criteria Reference Table -->
          <div class="card stagger-enter" style="animation-delay:0.3s">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="book-open" style="width:18px;height:18px"></i> Point Criteria Reference</h3>
            </div>
            <div class="card-body">
              ${renderTable(
                [
                  { label: 'Category', key: 'category', render: row => `<span style="font-weight:500;">${row.category}</span>` },
                  { label: 'Description', key: 'description', render: row => `<span style="font-size:13px;color:var(--color-text-secondary);">${row.description}</span>` },
                  { label: 'Per Unit', key: 'perUnit', render: row => `${row.perUnit} pts / ${row.unit}` },
                  { label: 'Max Points', key: 'maxPoints', render: row => `<span class="badge badge-primary">${row.maxPoints}</span>` },
                  { label: 'Current', key: 'current', render: row => {
                    const current = clubPointsData?.points?.[row.id] || 0;
                    const pct = row.maxPoints > 0 ? Math.round((current / row.maxPoints) * 100) : 0;
                    return `
                      <div style="display:flex;align-items:center;gap:8px;">
                        <span style="font-weight:600;color:${getBarColor(pct)};">${current}</span>
                        <div style="width:60px;height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">
                          <div style="width:${pct}%;height:100%;background:${getBarColor(pct)};border-radius:3px;"></div>
                        </div>
                      </div>
                    `;
                  }},
                ],
                pointCriteria,
                { emptyMessage: 'No point criteria defined' }
              )}
            </div>
          </div>

          <!-- Comparison with Leaderboard -->
          <div class="card stagger-enter" style="animation-delay:0.4s">
            <div class="card-header">
              <h3 class="card-title"><i data-lucide="trophy" style="width:18px;height:18px"></i> Club Rankings</h3>
            </div>
            <div class="card-body">
              <div style="display:flex;flex-direction:column;gap:8px;">
                ${leaderboard.map((c, i) => {
                  const isCurrentClub = c.id === clubId;
                  const rankEmoji = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
                  const pct = maxPossible > 0 ? Math.round((c.totalPoints / maxPossible) * 100) : 0;
                  return `
                    <div style="display:flex;align-items:center;gap:14px;padding:12px 16px;border-radius:10px;${isCurrentClub ? 'background:var(--color-primary-alpha);border:1px solid rgba(0,102,255,0.3);' : 'background:var(--color-bg);border:1px solid var(--color-border);'}">
                      <span style="font-size:18px;width:32px;text-align:center;">${rankEmoji}</span>
                      <div style="flex:1;">
                        <div style="font-size:14px;font-weight:${isCurrentClub ? '700' : '500'};color:var(--color-text-primary);">
                          ${c.name} ${isCurrentClub ? '<span style="font-size:11px;color:var(--color-primary);">(You)</span>' : ''}
                        </div>
                        <div style="margin-top:4px;width:100%;height:6px;background:var(--color-border);border-radius:3px;overflow:hidden;">
                          <div style="width:${pct}%;height:100%;background:${isCurrentClub ? 'linear-gradient(90deg, var(--color-primary), #00d4ff)' : 'var(--color-text-muted)'};border-radius:3px;opacity:${isCurrentClub ? 1 : 0.4};"></div>
                        </div>
                      </div>
                      <span style="font-size:16px;font-weight:700;color:${isCurrentClub ? 'var(--color-primary)' : 'var(--color-text-secondary)'};">${c.totalPoints}</span>
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

  // Radar Chart
  const radarLabels = categoryPoints.map(cp => {
    // Shorten labels for radar
    const words = cp.category.split(' ');
    return words.length > 2 ? words.slice(0, 2).join(' ') : cp.category;
  });

  // District average per-category
  const avgCategoryPoints = pointCriteria.map(pc => {
    const total = allClubs.reduce((sum, c) => {
      const cpd = store.getClubPoints(c.id);
      return sum + (cpd?.points?.[pc.id] || 0);
    }, 0);
    return allClubs.length > 0 ? Math.round(total / allClubs.length) : 0;
  });

  createChart('points-radar-chart', 'radar', {
    labels: radarLabels,
    datasets: [
      {
        label: club?.name?.replace('Leo Club of ', '') || 'Your Club',
        data: categoryPoints.map(cp => cp.current),
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
        max: 30,
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
