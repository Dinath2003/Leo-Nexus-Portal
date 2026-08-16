// ============================================
// LEO NEXUS PORTAL — DISTRICT PROJECTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';

// Render form HTML with tabbed sections (General, Budget, Report)
function getProjectFormHtml(data = {}) {
  const budgetDetails = data.budgetDetails || [];
  const report = data.report || { summary: '', outcomes: '', submittedAt: '' };

  return `
    <div class="modal-tabs" style="display:flex; gap:0.5rem; margin-bottom:1.25rem; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:8px;">
      <button type="button" class="btn btn-secondary btn-sm modal-tab active" data-target="tab-general">
        <i data-lucide="info" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Core Details
      </button>
      <button type="button" class="btn btn-ghost btn-sm modal-tab" data-target="tab-budget">
        <i data-lucide="wallet" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Project Budget
      </button>
      <button type="button" class="btn btn-ghost btn-sm modal-tab" data-target="tab-report">
        <i data-lucide="file-text" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Project Report
      </button>
    </div>

    <!-- Tab 1: Core details -->
    <div class="modal-tab-content" id="tab-general">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Project Name *</label>
          <input type="text" class="form-input" id="proj-name" placeholder="Enter project name" value="${data.name || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Category *</label>
          <select class="form-select" id="proj-category">
            ${['Cultural', 'Technical', 'Education', 'Environment', 'Health', 'Leadership', 'Community', 'Sports', 'Other']
            .map(c => `<option value="${c}" ${data.category === c ? 'selected' : ''}>${c}</option>`).join('')}
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Status *</label>
          <select class="form-select" id="proj-status">
            <option value="planned" ${data.status === 'planned' ? 'selected' : ''}>Planned</option>
            <option value="in_progress" ${data.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
            <option value="completed" ${data.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Participants</label>
          <input type="number" class="form-input" id="proj-participants" placeholder="0" value="${data.participants || 0}" min="0" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Start Date *</label>
          <input type="date" class="form-input" id="proj-start" value="${data.startDate || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">End Date</label>
          <input type="date" class="form-input" id="proj-end" value="${data.endDate || ''}" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Total Calculated Budget (Rs.)</label>
        <input type="number" class="form-input" id="proj-budget" placeholder="0" value="${data.budget || 0}" readonly style="background:rgba(255,255,255,0.02); color:var(--color-text-secondary); cursor:not-allowed;" />
        <small style="color:var(--color-text-muted); font-size:11px; margin-top:4px; display:block;">Calculated automatically from your budget plan items.</small>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="proj-description" rows="2" placeholder="Brief project summary...">${data.description || ''}</textarea>
      </div>
    </div>

    <!-- Tab 2: Project Budget Details -->
    <div class="modal-tab-content" id="tab-budget" style="display:none;">
      <p style="font-size:12px; color:var(--color-text-secondary); margin-bottom:12px;">
        Define budgeting levels/items below. Once details are submitted and marked as <strong>Completed</strong>, these levels will automatically sync and insert transaction entries into the <strong>District Wallet</strong>.
      </p>
      
      <div class="data-table-wrapper" style="max-height: 220px; overflow-y: auto; border: 1px solid rgba(255,255,255,0.06); border-radius: 8px;">
        <table class="data-table" style="margin:0;">
          <thead>
            <tr>
              <th>Description</th>
              <th style="width:130px;">Type</th>
              <th style="width:150px;">Amount (Rs.)</th>
              <th style="width:50px;"></th>
            </tr>
          </thead>
          <tbody id="budget-items-tbody">
            <!-- Dynamic rows will be inserted here -->
          </tbody>
        </table>
      </div>
      <div style="margin-top: 10px;">
        <button type="button" class="btn btn-secondary btn-sm" id="add-budget-row-btn" style="padding: 6px 12px; font-size:12px;">
          <i data-lucide="plus" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> Add Budget Line
        </button>
      </div>
    </div>

    <!-- Tab 3: Project Report Details -->
    <div class="modal-tab-content" id="tab-report" style="display:none;">
      <div class="form-group">
        <label class="form-label">Report Narrative / Summary</label>
        <textarea class="form-textarea" id="proj-report-summary" rows="3" placeholder="Provide a detailed description of the project execution, achievements, and challenges...">${report.summary || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Outcomes &amp; Key Results</label>
        <textarea class="form-textarea" id="proj-report-outcomes" rows="2" placeholder="e.g. Conducted eye tests, donated 50 spectacles, improved local awareness...">${report.outcomes || ''}</textarea>
      </div>
      <div class="form-group">
        <label class="form-label">Impact (e.g. Beneficiaries Count Summary)</label>
        <input type="text" class="form-input" id="proj-impact" placeholder="e.g. 150 school children benefited" value="${data.impact || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Report Submission Date</label>
        <input type="date" class="form-input" id="proj-report-date" value="${report.submittedAt || new Date().toISOString().split('T')[0]}" />
      </div>
    </div>
  `;
}

// Read form values and compile budgetDetails list
function getProjectFormData() {
  const name = document.getElementById('proj-name').value.trim();
  const category = document.getElementById('proj-category').value;
  const status = document.getElementById('proj-status').value;
  const participants = parseInt(document.getElementById('proj-participants').value) || 0;
  const startDate = document.getElementById('proj-start').value;
  const endDate = document.getElementById('proj-end').value || '';
  const description = document.getElementById('proj-description').value.trim();
  const impact = document.getElementById('proj-impact').value.trim();

  if (!name) { showToast('error', 'Validation Error', 'Please enter a project name.'); return null; }
  if (!startDate) { showToast('error', 'Validation Error', 'Please select a start date.'); return null; }

  // Compile budget lines
  const budgetDetails = [];
  let totalBudget = 0;
  const rows = document.querySelectorAll('.budget-row');
  for (const row of rows) {
    const desc = row.querySelector('.row-desc').value.trim();
    const type = row.querySelector('.row-type').value;
    const amount = parseFloat(row.querySelector('.row-amount').value) || 0;

    if (!desc) { showToast('error', 'Validation Error', 'Please enter a description for all budget items.'); return null; }
    if (amount <= 0) { showToast('error', 'Validation Error', 'Amount must be greater than zero for all budget items.'); return null; }

    budgetDetails.push({ description: desc, type, amount });
    if (type === 'expense') {
      totalBudget += amount;
    }
  }

  // Compile report details
  const report = {
    summary: document.getElementById('proj-report-summary').value.trim(),
    outcomes: document.getElementById('proj-report-outcomes').value.trim(),
    submittedAt: document.getElementById('proj-report-date').value
  };

  return {
    name,
    category,
    status,
    participants,
    startDate,
    endDate,
    budget: totalBudget,
    description,
    impact,
    budgetDetails,
    report,
    clubId: 'district' // District-level project identifier
  };
}

// Generate the read-only Detailed Report and Budget Modal content
function getReportDetailHtml(project) {
  const budgetDetails = project.budgetDetails || [];
  const report = project.report || {};
  const statusLabels = { completed: 'Completed', in_progress: 'In Progress', planned: 'Planned' };
  const statusBadges = { completed: 'badge-success', in_progress: 'badge-warning', planned: 'badge-primary' };

  return `
    <div style="padding: 0.5rem 0;">
      <!-- Details Card -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap:1rem; margin-bottom:1.5rem; background:rgba(255,255,255,0.02); padding:1rem; border-radius:10px; border:1px solid rgba(255,255,255,0.04);">
        <div>
          <span style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Category</span>
          <div style="font-weight:600; color:var(--color-text-primary); margin-top:2px;">${project.category}</div>
        </div>
        <div>
          <span style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Status</span>
          <div style="margin-top:2px;"><span class="badge ${statusBadges[project.status] || 'badge-primary'}">${statusLabels[project.status] || project.status}</span></div>
        </div>
        <div>
          <span style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Timeline</span>
          <div style="font-size:13px; color:var(--color-text-primary); margin-top:2px;">
            ${new Date(project.startDate).toLocaleDateString()} ${project.endDate ? ' to ' + new Date(project.endDate).toLocaleDateString() : ''}
          </div>
        </div>
        <div>
          <span style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Participants</span>
          <div style="font-weight:600; color:var(--color-text-primary); margin-top:2px;">${project.participants} member(s)</div>
        </div>
      </div>

      <!-- Project Report Section -->
      <h3 style="font-size:14px; font-weight:700; color:var(--color-primary); border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px; margin: 0 0 10px;">Project Report Narrative</h3>
      <div style="margin-bottom:1.5rem;">
        <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6; margin: 0 0 8px;"><strong>Summary &amp; Narrative:</strong> ${report.summary || 'No report narrative submitted.'}</p>
        <p style="font-size:13px; color:var(--color-text-secondary); line-height:1.6; margin: 0 0 8px;"><strong>Key Outcomes:</strong> ${report.outcomes || 'No key outcomes listed.'}</p>
        ${project.impact ? `<div style="padding: 8px 12px; background:rgba(20,184,166,0.08); border: 1px solid rgba(20,184,166,0.15); border-radius:6px; font-size:12px; color:#14b8a6; display:inline-flex; align-items:center; gap:6px; margin-top:4px;"><i data-lucide="zap" style="width:13px;height:13px;"></i> <strong>Impact:</strong> ${project.impact}</div>` : ''}
        ${report.submittedAt ? `<div style="font-size:11px; color:var(--color-text-muted); margin-top:8px;">Report Submitted: ${new Date(report.submittedAt).toLocaleDateString()}</div>` : ''}
      </div>

      <!-- Budget Table Section -->
      <h3 style="font-size:14px; font-weight:700; color:var(--color-cyan); border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:6px; margin: 0 0 10px;">Budget Ledger Items</h3>
      <div class="data-table-wrapper" style="border: 1px solid rgba(255,255,255,0.05); border-radius:8px;">
        <table class="data-table" style="margin:0;">
          <thead>
            <tr>
              <th>Description</th>
              <th>Type</th>
              <th style="text-align:right;">Amount (Rs.)</th>
            </tr>
          </thead>
          <tbody>
            ${budgetDetails.map(item => `
              <tr>
                <td>${item.description}</td>
                <td><span class="badge ${item.type === 'income' ? 'badge-success' : 'badge-danger'}">${item.type}</span></td>
                <td style="text-align:right; font-weight:600; color:${item.type === 'income' ? '#14b8a6' : '#ef4444'};">
                  ${item.type === 'income' ? '+' : '-'} Rs. ${item.amount.toLocaleString()}
                </td>
              </tr>
            `).join('')}
            ${budgetDetails.length === 0 ? '<tr><td colspan="3" style="text-align:center;color:var(--color-text-muted);padding:1.5rem;">No detailed budget items added.</td></tr>' : ''}
          </tbody>
          <tfoot>
            <tr style="background:rgba(255,255,255,0.02); font-weight:700;">
              <td colspan="2" style="border-top:1px solid rgba(255,255,255,0.1);">Total Project Expenditure (Budget)</td>
              <td style="text-align:right; border-top:1px solid rgba(255,255,255,0.1); color:var(--color-danger);">Rs. ${(project.budget || 0).toLocaleString()}</td>
            </tr>
          </tfoot>
        </table>
      </div>
      ${project.status === 'completed' ? `
        <div style="margin-top:12px; display:flex; align-items:center; gap:6px; font-size:12px; color:var(--color-teal);">
          <i data-lucide="check-circle" style="width:14px;height:14px;"></i>
          <span>Synced: Budget items are synchronized with the District Wallet Ledger.</span>
        </div>
      ` : `
        <div style="margin-top:12px; display:flex; align-items:center; gap:6px; font-size:12px; color:var(--color-text-muted);">
          <i data-lucide="info" style="width:14px;height:14px;"></i>
          <span>Note: Wallet synchronization triggers only when project status is changed to "Completed".</span>
        </div>
      `}
    </div>
  `;
}

export function renderDistrictProjects() {
  const app = document.getElementById('app');
  const canCreate = auth.can('create', 'projects');
  const canEdit = auth.can('update', 'projects');
  const canDelete = auth.can('delete', 'projects');

  let activeFilter = 'all';

  const statusConfig = {
    completed: { badge: 'badge-success', label: 'Completed', icon: 'check-circle' },
    in_progress: { badge: 'badge-warning', label: 'In Progress', icon: 'loader' },
    planned: { badge: 'badge-primary', label: 'Planned', icon: 'clock' },
  };

  const categoryIcons = {
    Cultural: 'palette', Technical: 'code-2', Education: 'book-open',
    Environment: 'leaf', Health: 'heart-pulse', Leadership: 'crown',
    Community: 'hand-heart', Sports: 'dumbbell', Culture: 'palette', Other: 'sparkles'
  };

  function render() {
    // Filter down to only 'district' projects
    const projects = store.getAll('projects').filter(p => p.clubId === 'district');
    const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.status === activeFilter);

    // Compute Metrics
    const totalProjects = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in_progress').length;
    const planned = projects.filter(p => p.status === 'planned').length;
    
    // Total budget is sum of budgets of all projects
    const totalBudget = projects.reduce((sum, p) => sum + (parseFloat(p.budget) || 0), 0);

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('District Projects', ['Management', 'Projects (District)'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1>District Projects &amp; Initiatives</h1>
                <p style="color:var(--color-text-muted); margin-top:4px;">Manage large-scale district projects, budget accounts, and project final reports.</p>
              </div>
              <div class="page-header-actions">
                ${canCreate ? '<button class="btn btn-primary" id="add-project-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> Create Project</button>' : ''}
              </div>
            </div>

            <!-- Dashboard Stats Cards -->
            <div class="stats-grid stagger-enter" style="animation-delay:0.05s">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon"><i data-lucide="folder-kanban"></i></div>
                <div class="stat-value">${totalProjects}</div>
                <div class="stat-label">Total Projects</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);color:#14b8a6;"><i data-lucide="check-circle"></i></div>
                <div class="stat-value">${completed}</div>
                <div class="stat-label">Completed &amp; Synced</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);color:var(--color-primary);"><i data-lucide="clock"></i></div>
                <div class="stat-value">${inProgress + planned}</div>
                <div class="stat-label">Active / Planned</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);color:#ef4444;"><i data-lucide="wallet"></i></div>
                <div class="stat-value">Rs. ${totalBudget.toLocaleString()}</div>
                <div class="stat-label">Cumulative Budget</div>
              </div>
            </div>

            <!-- Navigation Tabs & Toolbar -->
            <div class="toolbar stagger-enter" style="animation-delay:0.1s">
              <div class="toolbar-left" style="display:flex; gap:8px;">
                ${[
                  { key: 'all', label: 'All Projects', count: totalProjects },
                  { key: 'completed', label: 'Completed', count: completed },
                  { key: 'in_progress', label: 'In Progress', count: inProgress },
                  { key: 'planned', label: 'Planned', count: planned },
                ].map(tab => `
                  <button class="btn ${activeFilter === tab.key ? 'btn-primary' : 'btn-secondary'} btn-sm filter-tab" data-filter="${tab.key}">
                    ${tab.label} (${tab.count})
                  </button>
                `).join('')}
              </div>
            </div>

            <!-- Projects Grid -->
            <div class="grid-2 stagger-enter" style="animation-delay:0.15s">
              ${filtered.length === 0 ? `
                <div class="card" style="grid-column:1/-1; text-align:center; padding:60px 20px;">
                  <i data-lucide="folder-open" style="width:48px;height:48px;color:var(--color-text-muted);margin-bottom:16px;"></i>
                  <h3 style="color:var(--color-text-secondary);">No ${activeFilter === 'all' ? '' : activeFilter.replace('_', ' ')} projects found</h3>
                  <p style="color:var(--color-text-muted); margin-top:8px;">District projects will appear here once registered.</p>
                </div>
              ` : filtered.map(project => {
                const cfg = statusConfig[project.status] || statusConfig.planned;
                const catIcon = categoryIcons[project.category] || 'sparkles';
                return `
                  <div class="card hover-lift water-effect" style="overflow:hidden; display:flex; flex-direction:column; justify-content:space-between;">
                    <div>
                      <div class="card-header" style="padding-bottom:8px;">
                        <div style="display:flex; align-items:center; gap:10px;">
                          <div style="width:40px; height:40px; border-radius:10px; display:flex; align-items:center; justify-content:center; background:var(--color-primary-alpha); color:var(--color-primary);">
                            <i data-lucide="${catIcon}" style="width:20px; height:20px;"></i>
                          </div>
                          <div>
                            <h3 class="card-title" style="font-size:15px; margin:0;">${project.name}</h3>
                            <span style="font-size:12px; color:var(--color-text-muted);">${project.category}</span>
                          </div>
                        </div>
                        <span class="badge ${cfg.badge}">${cfg.label}</span>
                      </div>
                      <div class="card-body" style="padding-top:8px; padding-bottom:8px;">
                        ${project.description ? `<p style="font-size:13px; color:var(--color-text-secondary); line-height:1.5; margin-bottom:14px;">${project.description}</p>` : ''}
                        <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:14px;">
                          <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--color-text-muted);">
                            <i data-lucide="calendar" style="width:13px; height:13px;"></i>
                            ${new Date(project.startDate).toLocaleDateString()}${project.endDate ? ' - ' + new Date(project.endDate).toLocaleDateString() : ''}
                          </div>
                          <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--color-text-muted);">
                            <i data-lucide="users" style="width:13px; height:13px;"></i>
                            ${project.participants || 0} participants
                          </div>
                          <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:var(--color-text-muted);">
                            <i data-lucide="wallet" style="width:13px; height:13px;"></i>
                            Rs. ${(project.budget || 0).toLocaleString()}
                          </div>
                          ${project.impact ? `
                            <div style="display:flex; align-items:center; gap:6px; font-size:12px; color:#14b8a6;">
                              <i data-lucide="zap" style="width:13px; height:13px;"></i>
                              ${project.impact}
                            </div>
                          ` : ''}
                        </div>
                      </div>
                    </div>
                    <div style="padding: 12px 1.25rem 1.25rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center;">
                      <button class="btn btn-ghost btn-sm view-report-btn" data-id="${project.id}" style="color:var(--color-primary); padding: 4px 8px;">
                        <i data-lucide="file-bar-chart" style="width:14px;height:14px;margin-right:4px;"></i> View Report &amp; Budget
                      </button>
                      <div style="display:flex; gap:6px;">
                        ${canEdit ? `<button class="btn btn-icon btn-ghost edit-project" data-id="${project.id}" title="Edit Project" style="padding:6px;"><i data-lucide="pencil" style="width:14px;height:14px"></i></button>` : ''}
                        ${canDelete ? `<button class="btn btn-icon btn-ghost delete-project" data-id="${project.id}" title="Delete Project" style="color:#ef4444; padding:6px;"><i data-lucide="trash-2" style="width:14px;height:14px"></i></button>` : ''}
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>

          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    initSidebar();
    initHeader();
    setupEventListeners();
  }

  // Hook up event listeners for filters, creations, updates, and reports
  function setupEventListeners() {
    // Filter Tabs
    document.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        render();
      });
    });

    // View Report & Budget Detail
    document.querySelectorAll('.view-report-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = store.getById('projects', btn.dataset.id);
        if (!project) return;
        showModal(`${project.name} — Detailed Statement`, getReportDetailHtml(project), {
          showFooter: true,
          submitText: 'Close',
          onSubmit: (close) => close(),
          size: 'lg'
        });
      });
    });

    // Add Project Modal trigger
    document.getElementById('add-project-btn')?.addEventListener('click', () => {
      showModal('Create District Project', getProjectFormHtml(), {
        submitText: 'Save & Submit',
        size: 'lg',
        onSubmit: (close) => {
          const data = getProjectFormData();
          if (!data) return;
          store.create('projects', data);
          showToast('success', 'Project Registered', `"${data.name}" has been created. Budget successfully sync-queued.`);
          close();
          render();
        }
      });
      setupModalFormHandlers();
    });

    // Edit Project Modal trigger
    document.querySelectorAll('.edit-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = store.getById('projects', btn.dataset.id);
        if (!project) return;

        showModal('Modify District Project', getProjectFormHtml(project), {
          submitText: 'Apply Changes',
          size: 'lg',
          onSubmit: (close) => {
            const data = getProjectFormData();
            if (!data) return;
            store.update('projects', project.id, data);
            showToast('success', 'Project Updated', `"${data.name}" details updated.`);
            close();
            render();
          }
        });
        
        setupModalFormHandlers(project);
      });
    });

    // Delete Project confirmation
    document.querySelectorAll('.delete-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = store.getById('projects', btn.dataset.id);
        if (!project) return;

        showConfirm('Delete District Project', `Are you sure you want to delete "${project.name}"? Synced transactions in the district wallet ledger will also be permanently deleted.`, () => {
          store.delete('projects', project.id);
          showToast('success', 'Project Deleted', 'The district project and its ledger entries have been removed.');
          render();
        });
      });
    });
  }

  // Setup tab toggles and dynamic budget row creation inside form modal
  function setupModalFormHandlers(project = null) {
    // Form tab toggles
    document.querySelectorAll('.modal-tab').forEach(tab => {
      tab.addEventListener('click', (e) => {
        e.preventDefault();
        document.querySelectorAll('.modal-tab').forEach(t => {
          t.classList.remove('active', 'btn-secondary');
          t.classList.add('btn-ghost');
        });
        document.querySelectorAll('.modal-tab-content').forEach(c => c.style.display = 'none');

        tab.classList.add('active', 'btn-secondary');
        tab.classList.remove('btn-ghost');
        
        const target = tab.dataset.target;
        const targetEl = document.getElementById(target);
        if (targetEl) targetEl.style.display = 'block';
      });
    });

    // Add row function helper
    function addBudgetRow(desc = '', type = 'expense', amount = '') {
      const tbody = document.getElementById('budget-items-tbody');
      if (!tbody) return;

      const tr = document.createElement('tr');
      tr.className = 'budget-row';
      tr.innerHTML = `
        <td>
          <input type="text" class="form-input row-desc" value="${desc}" placeholder="e.g. Venue Catering" style="padding:6px 10px; font-size:13px; height: 32px;" required />
        </td>
        <td>
          <select class="form-select row-type" style="padding:6px 10px; font-size:13px; height: 32px; min-width: 110px;">
            <option value="expense" ${type === 'expense' ? 'selected' : ''}>Expense</option>
            <option value="income" ${type === 'income' ? 'selected' : ''}>Income</option>
          </select>
        </td>
        <td>
          <input type="number" class="form-input row-amount" value="${amount}" placeholder="0" min="1" style="padding:6px 10px; font-size:13px; height: 32px;" required />
        </td>
        <td>
          <button type="button" class="btn btn-icon btn-ghost delete-row-btn" style="color:var(--color-danger); padding:4px; height:32px; width:32px;" title="Delete row">
            <i data-lucide="trash-2" style="width:15px;height:15px;"></i>
          </button>
        </td>
      `;

      tbody.appendChild(tr);

      // Recalculate totals on item deletion
      tr.querySelector('.delete-row-btn').addEventListener('click', () => {
        tr.remove();
        updateBudgetTotal();
      });

      // Recalculate totals on amount updates
      tr.querySelector('.row-amount').addEventListener('input', updateBudgetTotal);
      tr.querySelector('.row-type').addEventListener('change', updateBudgetTotal);

      if (window.lucide) lucide.createIcons({ nodes: [tr] });
    }

    // Sum all expense rows and write to total read-only input
    function updateBudgetTotal() {
      const rows = document.querySelectorAll('.budget-row');
      let totalExpense = 0;
      rows.forEach(row => {
        const type = row.querySelector('.row-type').value;
        const amount = parseFloat(row.querySelector('.row-amount').value) || 0;
        if (type === 'expense') {
          totalExpense += amount;
        }
      });
      const budgetInput = document.getElementById('proj-budget');
      if (budgetInput) {
        budgetInput.value = totalExpense;
      }
    }

    // Add Row Click trigger
    document.getElementById('add-budget-row-btn')?.addEventListener('click', () => {
      addBudgetRow('', 'expense', '');
    });

    // Populate initial rows if editing a project
    if (project && project.budgetDetails && project.budgetDetails.length > 0) {
      project.budgetDetails.forEach(item => {
        addBudgetRow(item.description, item.type, item.amount);
      });
    } else {
      // Add one default empty row for convenience on creation
      addBudgetRow('', 'expense', '');
    }

    // Initial total calculation
    updateBudgetTotal();
    
    // Ensure Lucide icons load in the modal content
    const modalEl = document.getElementById('modal-container');
    if (modalEl && window.lucide) {
      lucide.createIcons({ nodes: [modalEl] });
    }
  }

  render();
}
