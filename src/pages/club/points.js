// ============================================
// LEO NEXUS PORTAL — CLUB POINTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { showModal } from '../../components/modal.js';
import { showToast } from '../../components/toast.js';

let activeTab = 'overview'; // module level state

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

// Progress bar color based on percentage
function getBarColor(pct) {
  if (pct >= 80) return '#14b8a6';
  if (pct >= 50) return '#3d8bff';
  if (pct >= 25) return '#f59e0b';
  return '#ef4444';
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

  // Group criteria by category for reference or forms
  const groupedCriteria = {};
  pointCriteria.forEach(c => {
    if (!groupedCriteria[c.category]) {
      groupedCriteria[c.category] = [];
    }
    groupedCriteria[c.category].push(c);
  });

  // Build Tab Header HTML
  const tabHeaderHtml = `
    <div class="tabs-header stagger-enter" style="display:flex; border-bottom:1px solid var(--color-glass-border); padding-bottom:8px; gap:8px; margin-bottom: 24px; flex-wrap: wrap;">
      <button class="tab-btn ${activeTab === 'overview' ? 'active' : ''} btn btn-ghost btn-sm" data-tab="overview" style="font-weight:600; padding:8px 16px; border-radius:6px; display:flex; align-items:center; gap:6px;">
        <i data-lucide="trophy" style="width:14px;height:14px;"></i> Overview & Ledger
      </button>
      <button class="tab-btn ${activeTab === 'submit' ? 'active' : ''} btn btn-ghost btn-sm" data-tab="submit" style="font-weight:600; padding:8px 16px; border-radius:6px; display:flex; align-items:center; gap:6px;">
        <i data-lucide="clipboard-check" style="width:14px;height:14px;"></i> Submit Monthly Points
      </button>
      <button class="tab-btn ${activeTab === 'history' ? 'active' : ''} btn btn-ghost btn-sm" data-tab="history" style="font-weight:600; padding:8px 16px; border-radius:6px; display:flex; align-items:center; gap:6px;">
        <i data-lucide="history" style="width:14px;height:14px;"></i> Submission History
      </button>
    </div>
  `;

  let tabContentHtml = '';

  if (activeTab === 'overview') {
    // ------------------------------------
    // TAB: OVERVIEW & LEDGER
    // ------------------------------------
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

    // Calculate ledger
    const ledger = store.getClubPointsLedger(clubId);

    let ledgerTableHtml = `
      <div class="data-table-wrapper">
        <table class="data-table">
          <thead>
            <tr>
              <th style="width:140px;">Month</th>
              <th>Description</th>
              <th style="width:150px;">Points Added</th>
              <th style="width:180px;">Cumulative Total</th>
              <th style="width:120px;">Status</th>
              <th style="width:140px;">Processed Date</th>
            </tr>
          </thead>
          <tbody>
            ${ledger.map(item => {
              const dateStr = item.date ? new Date(item.date).toLocaleDateString() : 'N/A';
              const sign = item.addedPoints > 0 ? '+' : '';
              return `
                <tr>
                  <td style="font-weight:700;">${item.month}</td>
                  <td style="color:var(--color-text-secondary); font-size:0.85rem;">${item.description}</td>
                  <td style="font-weight:700; color:${item.addedPoints > 0 ? 'var(--color-success)' : (item.addedPoints < 0 ? 'var(--color-danger)' : 'var(--color-text-muted)')}; font-size:1rem;">
                    ${sign}${item.addedPoints.toLocaleString()}
                  </td>
                  <td style="font-weight:700; color:var(--color-primary); font-size:1rem;">${item.cumulativePoints.toLocaleString()}</td>
                  <td><span class="badge badge-success">Approved</span></td>
                  <td style="color:var(--color-text-muted); font-size:0.8rem;">${dateStr}</td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>
    `;

    tabContentHtml = `
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
          <div style="display:gap:20px;flex-wrap:wrap;display:flex;">
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

      <!-- Monthly Cumulative Ledger Table -->
      <div class="card stagger-enter" style="animation-delay:0.3s; margin-top:1.5rem;">
        <div class="card-header" style="display:flex; justify-content:space-between; align-items:center;">
          <h3 class="card-title" style="display:flex; align-items:center; gap:6px;"><i data-lucide="line-chart" style="width:18px;height:18px;color:#14b8a6"></i> Monthly Cumulative Ledger</h3>
          <span style="font-size:11.5px; color:var(--color-text-muted);">Points Carry Forward History</span>
        </div>
        <div class="card-body" style="padding:0; overflow-x:auto;">
          ${ledgerTableHtml}
        </div>
      </div>

      <!-- Point Criteria Reference Table -->
      <div class="card stagger-enter" style="animation-delay:0.4s; margin-top:1.5rem;">
        <div class="card-header">
          <h3 class="card-title"><i data-lucide="book-open" style="width:18px;height:18px"></i> Point Criteria Reference (Grouped)</h3>
        </div>
        <div class="card-body" style="padding:0; overflow-x:auto;">
          ${criteriaTableHtml}
        </div>
      </div>
    `;
  } else if (activeTab === 'submit') {
    // ------------------------------------
    // TAB: SUBMIT MONTHLY POINTS
    // ------------------------------------
    let checklistHtml = '';
    
    for (const [categoryName, items] of Object.entries(groupedCriteria)) {
      const isCultural = categoryName.toUpperCase().includes('CULTURAL') || categoryName.includes('CUL');
      const isTechnical = categoryName.toUpperCase().includes('TECHNICAL') || categoryName.includes('TECH');

      let headerBg = 'rgba(0,102,255,0.08)';
      let headerColor = 'var(--color-cyan-glow)';
      let headerBorder = '1px solid var(--color-glass-border)';
      let catIcon = 'folder';

      if (isCultural) {
        headerBg = 'rgba(245,158,11,0.12)';
        headerColor = '#f59e0b';
        headerBorder = '1px solid rgba(245,158,11,0.25)';
        catIcon = 'palette';
      } else if (isTechnical) {
        headerBg = 'rgba(14,165,233,0.12)';
        headerColor = '#0ea5e9';
        headerBorder = '1px solid rgba(14,165,233,0.25)';
        catIcon = 'code-2';
      }

      checklistHtml += `
        <div class="criteria-category-section" style="margin-bottom:24px; border:${headerBorder}; border-radius:10px; overflow:hidden;">
          <div style="background:${headerBg}; padding:12px var(--space-4); font-weight:700; color:${headerColor}; font-size:0.9rem; border-bottom:${headerBorder}; display:flex; align-items:center; gap:8px;">
            <i data-lucide="${catIcon}" style="width:16px;height:16px;"></i>
            <span>${categoryName}</span>
          </div>
          <div class="data-table-wrapper">
            <table class="data-table">
              <thead>
                <tr>
                  <th style="width: 50px; text-align:center;">Claim</th>
                  <th>Description</th>
                  <th style="width: 120px;">Points Value</th>
                  <th style="width: 120px;">Rule Type</th>
                  <th style="width: 160px;">Multiplier / Qty</th>
                </tr>
              </thead>
              <tbody>
                ${items.map(item => {
                  const isFlat = Math.abs(item.maxPoints) === Math.abs(item.perUnit);
                  const isDeduction = item.maxPoints < 0;
                  return `
                    <tr class="submit-crit-row" data-crit-id="${item.id}">
                      <td style="text-align:center; vertical-align:middle;">
                        <input type="checkbox" class="submit-crit-checkbox" data-crit-id="${item.id}" style="width:18px; height:18px; cursor:pointer;" />
                      </td>
                      <td style="font-size:0.85rem; color:var(--color-text-secondary); white-space:normal; line-height:1.4;">
                        <div>${item.description}</div>
                        <!-- Per-claim conditional proof upload box -->
                        <div class="crit-proof-container" data-crit-id="${item.id}" style="display:none; margin-top:8px; padding:8px 10px; border-radius:6px; background:rgba(0,102,255,0.04); border:1px dashed var(--color-glass-border);">
                          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:6px;">
                            <span style="font-size:11px; font-weight:700; color:var(--color-primary); display:flex; align-items:center; gap:4px;">
                              <i data-lucide="paperclip" style="width:12px;height:12px;"></i> Upload Proof for this Claim *
                            </span>
                          </div>
                          <div style="display:flex; gap:6px; flex-wrap:wrap; align-items:center;">
                            <input type="file" class="crit-proof-file-input" data-crit-id="${item.id}" multiple accept="image/*,.pdf,.doc,.docx" style="display:none;" />
                            <button type="button" class="btn btn-secondary btn-xs upload-crit-proof-btn" data-crit-id="${item.id}" style="height:28px; font-size:11px; display:flex; align-items:center; gap:4px;">
                              <i data-lucide="upload" style="width:12px;height:12px;"></i> Upload File (Image/PDF)
                            </button>
                            <input type="url" class="form-input crit-proof-link-input" data-crit-id="${item.id}" placeholder="Or paste proof URL..." style="height:28px; font-size:11px; flex:1; min-width:140px;" />
                            <button type="button" class="btn btn-secondary btn-xs add-crit-proof-link-btn" data-crit-id="${item.id}" style="height:28px; font-size:11px;">Add Link</button>
                          </div>
                          <div class="crit-staged-proofs-list" data-crit-id="${item.id}" style="display:flex; flex-direction:column; gap:4px; margin-top:6px;"></div>
                        </div>
                      </td>
                      <td>
                        <span style="font-weight:700; color:${isDeduction ? 'var(--color-danger)' : 'var(--color-primary)'};">
                          ${isDeduction ? '' : '+'}${item.maxPoints.toLocaleString()} max
                        </span>
                      </td>
                      <td style="font-size:0.8rem; color:var(--color-text-muted);">
                        ${isFlat ? 'Flat rate' : `Unit-based`}
                      </td>
                      <td>
                        ${isFlat ? `<span style="font-size:0.85rem; color:var(--color-text-muted);">Not Applicable</span>` : `
                          <div class="qty-container" style="display:none; align-items:center; gap:6px;">
                            <input type="number" class="submit-crit-qty form-input" data-crit-id="${item.id}" value="1" min="1" style="width:70px; height:28px; padding:2px 6px; font-size:12px;" />
                            <span style="font-size:11px; color:var(--color-text-muted);">${item.unit}s</span>
                          </div>
                        `}
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

    tabContentHtml = `
      <div class="stagger-enter" style="display:grid; grid-template-columns: 2fr 1fr; gap:24px; align-items:start;">
        <!-- Left: Form checklist -->
        <div>
          <h2 style="font-size:1.3rem; margin-bottom:8px; font-weight:700; color:var(--color-text-primary);">Monthly Performance Points Checklist</h2>
          <p style="color:var(--color-text-muted); font-size:0.85rem; margin-bottom:20px;">
            Tick the achievements your club has completed during the month. Provide counts for unit-based criteria. All claims are subject to verification and approval by the Leo District.
          </p>
          <form id="submit-monthly-points-form">
            ${checklistHtml}
          </form>
        </div>

        <!-- Right: Sticky submit summary widget -->
        <div style="position:sticky; top:20px;">
          <div class="card hover-lift" style="border:1px solid rgba(0, 102, 255, 0.25);">
            <div class="card-header" style="background:rgba(0, 102, 255, 0.05); border-bottom:1px solid var(--color-glass-border);">
              <h3 class="card-title" style="font-size:1.05rem; display:flex; align-items:center; gap:6px;">
                <i data-lucide="send" style="width:16px; height:16px; color:var(--color-primary);"></i> Submit Points Claim
              </h3>
            </div>
            <div class="card-body" style="padding:20px; display:flex; flex-direction:column; gap:16px;">
              <!-- Warning Banner -->
              <div id="submission-warning-banner" style="display:none; padding:12px 14px; border-radius:8px; background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.25); color:#f87171; font-size:0.8rem; line-height:1.4;"></div>

              <div class="form-group" style="margin:0;">
                <label class="form-label" style="font-size:12px; margin-bottom:6px;">Select Points Month *</label>
                <select class="form-input" id="submit-month-select" style="height:38px; font-size:13px; font-weight:600;">
                  <option value="2026-06" selected>June 2026</option>
                  <option value="2026-07">July 2026</option>
                  <option value="2026-08">August 2026</option>
                </select>
              </div>

              <div style="border-top:1px solid var(--color-glass-border); padding-top:16px; display:flex; justify-content:space-between; align-items:center;">
                <span style="font-size:13px; color:var(--color-text-secondary);">Total Checked Items</span>
                <span id="est-checked-count" style="font-weight:700; color:var(--color-text-primary); font-size:13px;">0 items</span>
              </div>

              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
                <span style="font-size:13px; color:var(--color-text-secondary);">Est. Points Claimed</span>
                <span id="est-points-count" style="font-weight:800; color:var(--color-primary); font-size:1.2rem;">0 pts</span>
              </div>

              <button class="btn btn-primary" id="submit-points-form-btn" style="width:100%; height:42px; display:flex; align-items:center; justify-content:center; gap:8px;">
                <i data-lucide="check-square" style="width:16px; height:16px;"></i> Submit to District
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  } else if (activeTab === 'history') {
    // ------------------------------------
    // TAB: SUBMISSION HISTORY
    // ------------------------------------
    const submissions = store.getAll('pointsSubmissions').filter(s => s.clubId === clubId);
    
    // Sort submissions reverse-chronologically
    submissions.sort((a, b) => b.submittedAt.localeCompare(a.submittedAt));

    let historyTableHtml = '';
    
    if (submissions.length === 0) {
      historyTableHtml = `
        <div style="padding:48px; text-align:center; color:var(--color-text-muted);">
          <i data-lucide="inbox" style="width:40px; height:40px; margin-bottom:12px; color:var(--color-text-muted); opacity:0.5;"></i>
          <p style="font-size:0.9rem;">No monthly point checklist submissions recorded yet.</p>
        </div>
      `;
    } else {
      historyTableHtml = `
        <div class="data-table-wrapper">
          <table class="data-table">
            <thead>
              <tr>
                <th>Submitted Date</th>
                <th>Month</th>
                <th>Submitted By</th>
                <th>Claimed Points</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              ${submissions.map(sub => {
                const dateStr = new Date(sub.submittedAt).toLocaleString();
                let badgeClass = 'badge-secondary';
                if (sub.status === 'approved') badgeClass = 'badge-success';
                else if (sub.status === 'rejected') badgeClass = 'badge-danger';
                else if (sub.status === 'pending') badgeClass = 'badge-warning';

                return `
                  <tr>
                    <td>${dateStr}</td>
                    <td style="font-weight:700;">${sub.month}</td>
                    <td>${sub.submittedBy}</td>
                    <td style="font-weight:700; color:var(--color-primary);">${sub.totalPoints.toLocaleString()} pts</td>
                    <td>
                      <span class="badge ${badgeClass}">${sub.status.toUpperCase()}</span>
                    </td>
                    <td>
                      <button class="btn btn-ghost btn-xs view-sub-details-btn" data-sub-id="${sub.id}">
                        <i data-lucide="eye" style="width:12px;height:12px;margin-right:3px;vertical-align:-1px;"></i> Details
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
        <div class="card-header">
          <h3 class="card-title"><i data-lucide="history" style="width:18px;height:18px;color:var(--color-primary)"></i> Monthly Point Submissions History</h3>
        </div>
        <div class="card-body" style="padding:0; overflow-x:auto;">
          ${historyTableHtml}
        </div>
      </div>
    `;
  }

  // Draw full page layout
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
              <h1 style="margin:0;">Club Performance Points</h1>
              <p style="color:var(--color-text-muted);margin-top:4px;">Submit monthly point checklists and review standings</p>
            </div>
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
      renderClubPoints();
    });
  });

  // Overview Tab Specifics
  if (activeTab === 'overview') {
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
  }

  // Submit Tab Specifics
  if (activeTab === 'submit') {
    const monthSelect = document.getElementById('submit-month-select');
    let stagedAttachmentsByCrit = {};

    function renderCritStagedProofs(critId) {
      const container = document.querySelector(`.crit-staged-proofs-list[data-crit-id="${critId}"]`);
      if (!container) return;
      const list = stagedAttachmentsByCrit[critId] || [];
      if (list.length === 0) {
        container.innerHTML = `<span style="font-size:10px; color:var(--color-text-muted); font-style:italic;">No proof attached for this claim yet.</span>`;
        return;
      }
      container.innerHTML = list.map((att, idx) => `
        <div style="display:flex; align-items:center; justify-content:space-between; padding:4px 6px; border-radius:4px; background:rgba(0,0,0,0.3); border:1px solid var(--color-glass-border); font-size:11px;">
          <div style="display:flex; align-items:center; gap:6px; overflow:hidden; min-width:0;">
            <i data-lucide="${att.isLink ? 'link' : (att.type?.startsWith('image') ? 'image' : 'file-text')}" style="width:12px;height:12px;color:var(--color-primary);flex-shrink:0;"></i>
            <span style="white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:var(--color-text-primary); font-size:11px;">${att.name}</span>
            <span style="color:var(--color-text-muted); font-size:10px; flex-shrink:0;">(${att.size})</span>
          </div>
          <button type="button" class="btn btn-ghost btn-xs remove-crit-proof-btn" data-crit-id="${critId}" data-idx="${idx}" style="color:var(--color-danger); padding:1px 3px;">
            <i data-lucide="x" style="width:11px;height:11px;"></i>
          </button>
        </div>
      `).join('');

      if (window.lucide) lucide.createIcons({ nodes: [container] });

      container.querySelectorAll('.remove-crit-proof-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const cId = btn.dataset.critId;
          const i = parseInt(btn.dataset.idx);
          if (stagedAttachmentsByCrit[cId]) {
            stagedAttachmentsByCrit[cId].splice(i, 1);
            renderCritStagedProofs(cId);
          }
        });
      });
    }

    // Bind upload triggers for each criterion row
    document.querySelectorAll('.upload-crit-proof-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const critId = btn.dataset.critId;
        const fileInput = document.querySelector(`.crit-proof-file-input[data-crit-id="${critId}"]`);
        fileInput?.click();
      });
    });

    document.querySelectorAll('.crit-proof-file-input').forEach(fileInput => {
      fileInput.addEventListener('change', (e) => {
        const critId = fileInput.dataset.critId;
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;
        if (!stagedAttachmentsByCrit[critId]) stagedAttachmentsByCrit[critId] = [];

        let pending = files.length;
        files.forEach(file => {
          const reader = new FileReader();
          reader.onload = (evt) => {
            stagedAttachmentsByCrit[critId].push({
              id: 'file_' + Math.random().toString(36).substr(2, 9),
              name: file.name,
              type: file.type || 'document',
              size: (file.size / 1024 > 1024) ? (file.size / (1024 * 1024)).toFixed(1) + ' MB' : Math.round(file.size / 1024) + ' KB',
              url: evt.target.result,
              isLink: false
            });
            pending--;
            if (pending === 0) {
              renderCritStagedProofs(critId);
            }
          };
          reader.readAsDataURL(file);
        });
        fileInput.value = '';
      });
    });

    document.querySelectorAll('.add-crit-proof-link-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const critId = btn.dataset.critId;
        const linkInput = document.querySelector(`.crit-proof-link-input[data-crit-id="${critId}"]`);
        const urlVal = linkInput?.value?.trim();
        if (!urlVal) {
          showToast('error', 'Validation Error', 'Please enter a valid proof URL.');
          return;
        }
        if (!stagedAttachmentsByCrit[critId]) stagedAttachmentsByCrit[critId] = [];
        stagedAttachmentsByCrit[critId].push({
          id: 'link_' + Math.random().toString(36).substr(2, 9),
          name: urlVal.length > 25 ? urlVal.substring(0, 25) + '...' : urlVal,
          type: 'link',
          size: 'External Link',
          url: urlVal,
          isLink: true
        });
        linkInput.value = '';
        renderCritStagedProofs(critId);
      });
    });

    // Checklist checkbox changes — toggle proof container visibility
    document.querySelectorAll('.submit-crit-checkbox').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const critId = cb.dataset.critId;
        const row = document.querySelector(`.submit-crit-row[data-crit-id="${critId}"]`);
        const qtyContainer = row.querySelector('.qty-container');
        const proofContainer = row.querySelector(`.crit-proof-container[data-crit-id="${critId}"]`);
        
        if (cb.checked) {
          row.style.background = 'rgba(0, 102, 255, 0.03)';
          if (qtyContainer) qtyContainer.style.display = 'flex';
          if (proofContainer) {
            proofContainer.style.display = 'block';
            renderCritStagedProofs(critId);
          }
        } else {
          row.style.background = '';
          if (qtyContainer) {
            qtyContainer.style.display = 'none';
            const qtyInput = qtyContainer.querySelector('.submit-crit-qty');
            if (qtyInput) qtyInput.value = '1';
          }
          if (proofContainer) {
            proofContainer.style.display = 'none';
            delete stagedAttachmentsByCrit[critId];
            renderCritStagedProofs(critId);
          }
        }
        updateSubmitSummary();
      });
    });

    // Checklist quantity input changes
    document.querySelectorAll('.submit-crit-qty').forEach(qty => {
      qty.addEventListener('input', (e) => {
        const val = parseInt(qty.value);
        if (isNaN(val) || val < 1) {
          qty.value = '1';
        }
        updateSubmitSummary();
      });
    });

    // Month selector changes
    monthSelect?.addEventListener('change', checkMonthSubmission);

    // Initial check on month
    checkMonthSubmission();

    function updateSubmitSummary() {
      let totalPointsClaimed = 0;
      let checkedCount = 0;

      document.querySelectorAll('.submit-crit-checkbox').forEach(cb => {
        if (cb.checked) {
          checkedCount++;
          const critId = cb.dataset.critId;
          const crit = pointCriteria.find(c => c.id === critId);
          if (crit) {
            const isFlat = Math.abs(crit.maxPoints) === Math.abs(crit.perUnit);
            if (isFlat) {
              totalPointsClaimed += crit.maxPoints;
            } else {
              const qtyInput = document.querySelector(`.submit-crit-qty[data-crit-id="${critId}"]`);
              const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
              const calcPoints = crit.perUnit * qty;
              if (crit.maxPoints > 0) {
                totalPointsClaimed += Math.min(crit.maxPoints, calcPoints);
              } else {
                totalPointsClaimed += Math.max(crit.maxPoints, calcPoints);
              }
            }
          }
        }
      });

      const countLabel = document.getElementById('est-checked-count');
      const pointsLabel = document.getElementById('est-points-count');
      if (countLabel) countLabel.textContent = `${checkedCount} items`;
      if (pointsLabel) pointsLabel.textContent = `${totalPointsClaimed.toLocaleString()} pts`;
    }

    function checkMonthSubmission() {
      const month = monthSelect.value;
      const submissions = store.getAll('pointsSubmissions');
      const existing = submissions.find(s => s.clubId === clubId && s.month === month && s.status !== 'rejected');
      
      const banner = document.getElementById('submission-warning-banner');
      const submitBtn = document.getElementById('submit-points-form-btn');
      
      if (existing) {
        banner.style.display = 'block';
        banner.style.background = existing.status === 'approved' ? 'rgba(16,185,129,0.1)' : 'rgba(245,158,11,0.1)';
        banner.style.border = existing.status === 'approved' ? '1px solid rgba(16,185,129,0.2)' : '1px solid rgba(245,158,11,0.2)';
        banner.style.color = existing.status === 'approved' ? '#34d399' : '#fbbf24';
        banner.innerHTML = `
          <div style="display:flex;align-items:center;gap:8px;">
            <i data-lucide="alert-triangle" style="width:16px;height:16px;"></i>
            <span>A submission for <strong>${month}</strong> is already <strong>${existing.status}</strong>. You cannot submit another form for this month.</span>
          </div>
        `;
        if (window.lucide) lucide.createIcons({ nodes: [banner] });
        submitBtn.disabled = true;
      } else {
        banner.style.display = 'none';
        submitBtn.disabled = false;
      }
    }

    // Submit handler
    const formSubmitBtn = document.getElementById('submit-points-form-btn');
    formSubmitBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      
      const month = monthSelect.value;
      const checkedCriteria = [];
      const pointsClaimed = {};

      document.querySelectorAll('.submit-crit-checkbox').forEach(cb => {
        if (cb.checked) {
          const critId = cb.dataset.critId;
          const crit = pointCriteria.find(c => c.id === critId);
          if (crit) {
            checkedCriteria.push(critId);
            const isFlat = Math.abs(crit.maxPoints) === Math.abs(crit.perUnit);
            if (isFlat) {
              pointsClaimed[critId] = crit.maxPoints;
            } else {
              const qtyInput = document.querySelector(`.submit-crit-qty[data-crit-id="${critId}"]`);
              const qty = qtyInput ? parseInt(qtyInput.value) || 1 : 1;
              const calcPoints = crit.perUnit * qty;
              if (crit.maxPoints > 0) {
                pointsClaimed[critId] = Math.min(crit.maxPoints, calcPoints);
              } else {
                pointsClaimed[critId] = Math.max(crit.maxPoints, calcPoints);
              }
            }
          }
        }
      });

      if (checkedCriteria.length === 0) {
        showToast('error', 'Validation Error', 'You must claim at least one criterion before submitting.');
        return;
      }

      try {
        const submittedBy = auth.currentUser?.name || 'Club President';
        store.submitMonthlyPoints(clubId, club?.name || 'Club', month, checkedCriteria, pointsClaimed, submittedBy, stagedAttachmentsByCrit);
        showToast('success', 'Form Submitted', `Monthly points checklist for ${month} has been submitted successfully.`);
        activeTab = 'history';
        renderClubPoints();
      } catch (err) {
        showToast('error', 'Submission Failed', err.message);
      }
    });
  }

  // History Tab Specifics
  if (activeTab === 'history') {
    document.querySelectorAll('.view-sub-details-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const subId = btn.dataset.subId;
        const sub = store.getById('pointsSubmissions', subId);
        if (!sub) return;

        let itemsHtml = `
          <div class="data-table-wrapper">
            <table class="data-table" style="font-size:0.8rem;">
              <thead>
                <tr>
                  <th>Criteria Category / Description</th>
                  <th style="width:120px;">Claimed Points</th>
                </tr>
              </thead>
              <tbody>
        `;

        sub.checkedCriteria.forEach(critId => {
          const crit = pointCriteria.find(c => c.id === critId);
          const pts = sub.pointsClaimed[critId] || 0;
          const critProofs = Array.isArray(sub.proofAttachments) 
            ? (sub.proofAttachments || [])
            : (sub.proofAttachments?.[critId] || []);

          let critProofsHtml = '';
          if (critProofs.length > 0) {
            critProofsHtml = `
              <div style="margin-top:6px; display:flex; gap:6px; flex-wrap:wrap;">
                ${critProofs.map(att => `
                  <a href="${att.url}" target="_blank" download="${att.name}" style="display:inline-flex; align-items:center; gap:4px; padding:2px 6px; border-radius:4px; background:rgba(0,212,255,0.08); border:1px solid rgba(0,212,255,0.2); color:var(--color-primary); font-size:11px; text-decoration:none;" title="Download / Open">
                    <i data-lucide="${att.isLink ? 'link' : 'paperclip'}" style="width:11px;height:11px;"></i>
                    <span>${att.name}</span>
                  </a>
                `).join('')}
              </div>
            `;
          }

          itemsHtml += `
            <tr>
              <td>
                <div style="font-size:0.75rem; color:var(--color-primary); font-weight:600;">${crit?.category || 'General'}</div>
                <div style="font-size:0.85rem; color:var(--color-text-primary); margin-top:2px;">${crit?.description || critId}</div>
                ${critProofsHtml}
              </td>
              <td style="font-weight:700; color:${pts >= 0 ? 'var(--color-success)' : 'var(--color-danger)'}; vertical-align:top;">
                ${pts >= 0 ? '+' : ''}${pts.toLocaleString()}
              </td>
            </tr>
          `;
        });

        let approvalDetailsHtml = '';
        if (sub.status === 'approved') {
          approvalDetailsHtml = `
            <div style="margin-top:16px; padding:12px; border-radius:8px; background:rgba(20,184,166,0.06); border:1px solid rgba(20,184,166,0.2);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:12px; font-weight:700; color:#14b8a6;">Approved by District</span>
                <span style="font-size:11px; color:var(--color-text-muted);">${new Date(sub.reviewedAt).toLocaleString()}</span>
              </div>
              <p style="font-size:13px; font-weight:600; color:var(--color-text-primary); margin-bottom:4px;">Reviewed by: ${sub.reviewedBy}</p>
              <p style="font-size:12px; color:var(--color-text-secondary); font-style:italic;">"${sub.comment || 'No comment provided.'}"</p>
            </div>
          `;
        } else if (sub.status === 'rejected') {
          approvalDetailsHtml = `
            <div style="margin-top:16px; padding:12px; border-radius:8px; background:rgba(239,68,68,0.06); border:1px solid rgba(239,68,68,0.2);">
              <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:6px;">
                <span style="font-size:12px; font-weight:700; color:var(--color-danger);">Rejected by District</span>
                <span style="font-size:11px; color:var(--color-text-muted);">${new Date(sub.reviewedAt).toLocaleString()}</span>
              </div>
              <p style="font-size:13px; font-weight:600; color:var(--color-text-primary); margin-bottom:4px;">Reviewed by: ${sub.reviewedBy}</p>
              <p style="font-size:12px; color:var(--color-text-secondary); font-style:italic;">"${sub.comment || 'No comment provided.'}"</p>
            </div>
          `;
        }

        const modalHtml = `
          <div style="display:flex; flex-direction:column; gap:16px; max-height:500px; overflow-y:auto; padding-right:4px;">
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px; font-size:13px;">
              <div>
                <span style="color:var(--color-text-muted);">Submitted By:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.submittedBy}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Submission Month:</span>
                <strong style="display:block; color:var(--color-text-primary); margin-top:2px;">${sub.month}</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Points Claimed:</span>
                <strong style="display:block; color:var(--color-primary); margin-top:2px; font-size:1.1rem;">${sub.totalPoints.toLocaleString()} pts</strong>
              </div>
              <div>
                <span style="color:var(--color-text-muted);">Submission ID:</span>
                <code style="display:block; color:var(--color-text-secondary); margin-top:2px; font-size:11px;">${sub.id}</code>
              </div>
            </div>

            <h4 style="font-size:14px; font-weight:700; color:var(--color-text-primary); margin:8px 0 0 0;">Checked Points Breakdown</h4>
            ${itemsHtml}

            ${approvalDetailsHtml}
          </div>
        `;

        showModal(`Submission Details - ${sub.month}`, modalHtml, {
          showFooter: false
        });
      });
    });
  }

  return () => {
    destroyAllCharts();
  };
}

export function setPointsActiveTab(tab) {
  activeTab = tab;
}
