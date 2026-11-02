// ============================================
// LEO NEXUS PORTAL — CLUB PROJECTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';

function getProjectFormHtml(data = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Project Name *</label>
        <input type="text" class="form-input" id="proj-name" placeholder="Enter project name" value="${data.name || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-select" id="proj-category">
          ${['Education', 'Environment', 'Health', 'Leadership', 'Community', 'Sports', 'Culture', 'Other']
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
        <input type="date" class="form-input" id="proj-start" value="${data.startDate || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">End Date</label>
        <input type="date" class="form-input" id="proj-end" value="${data.endDate || ''}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Budget (Rs.)</label>
      <input type="number" class="form-input" id="proj-budget" placeholder="0" value="${data.budget || ''}" min="0" />
    </div>
    <div class="form-group">
      <label class="form-label">Description</label>
      <textarea class="form-textarea" id="proj-description" rows="2" placeholder="Project description...">${data.description || ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Impact</label>
      <input type="text" class="form-input" id="proj-impact" placeholder="e.g. 200 students benefited" value="${data.impact || ''}" />
    </div>
  `;
}

function getProjectFormData() {
  const name = document.getElementById('proj-name').value.trim();
  const category = document.getElementById('proj-category').value;
  const status = document.getElementById('proj-status').value;
  const participants = parseInt(document.getElementById('proj-participants').value) || 0;
  const startDate = document.getElementById('proj-start').value;
  const endDate = document.getElementById('proj-end').value;
  const budget = parseFloat(document.getElementById('proj-budget').value) || 0;
  const description = document.getElementById('proj-description').value.trim();
  const impact = document.getElementById('proj-impact').value.trim();

  if (!name) { showToast('error', 'Validation Error', 'Please enter a project name.'); return null; }
  if (!startDate) { showToast('error', 'Validation Error', 'Please select a start date.'); return null; }

  return { name, category, status, participants, startDate, endDate, budget, description, impact, clubId: auth.userClubId };
}

export function renderClubProjects() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
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
    const projects = store.getClubProjects(clubId);
    const filtered = activeFilter === 'all' ? projects : projects.filter(p => p.status === activeFilter);

    const totalProjects = projects.length;
    const completed = projects.filter(p => p.status === 'completed').length;
    const inProgress = projects.filter(p => p.status === 'in_progress').length;
    const planned = projects.filter(p => p.status === 'planned').length;

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Projects', ['Club', 'Projects'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">SERVICE IMPACT</span>
                <h1 style="margin:0;">Service Projects</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Track and manage community service initiatives</p>
              </div>
              <div class="page-header-actions">
                ${canCreate ? '<button class="btn btn-primary" id="add-project-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> New Project</button>' : ''}
              </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid stagger-enter" style="animation-delay:0.1s">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon"><i data-lucide="folder-kanban"></i></div>
                <div class="stat-value">${totalProjects}</div>
                <div class="stat-label">Total Projects</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);color:#14b8a6;">
                  <i data-lucide="check-circle"></i>
                </div>
                <div class="stat-value">${completed}</div>
                <div class="stat-label">Completed</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(245,158,11,0.12);color:#f59e0b;">
                  <i data-lucide="loader"></i>
                </div>
                <div class="stat-value">${inProgress}</div>
                <div class="stat-label">In Progress</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);color:var(--color-primary);">
                  <i data-lucide="clock"></i>
                </div>
                <div class="stat-value">${planned}</div>
                <div class="stat-label">Planned</div>
              </div>
            </div>

            <!-- Filter Tabs -->
            <div class="toolbar stagger-enter" style="animation-delay:0.15s">
              <div class="toolbar-left" style="display:flex;gap:8px;">
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

            <!-- Project Cards Grid -->
            <div class="grid-2 stagger-enter" style="animation-delay:0.2s">
              ${filtered.length === 0 ? `
                <div class="card" style="grid-column:1/-1;text-align:center;padding:60px 20px;">
                  <i data-lucide="folder-open" style="width:48px;height:48px;color:var(--color-text-muted);margin-bottom:16px;"></i>
                  <h3 style="color:var(--color-text-secondary);">No ${activeFilter === 'all' ? '' : activeFilter.replace('_', ' ')} projects found</h3>
                  <p style="color:var(--color-text-muted);margin-top:8px;">Projects will appear here once added.</p>
                </div>
              ` : filtered.map(project => {
                const cfg = statusConfig[project.status] || statusConfig.planned;
                const catIcon = categoryIcons[project.category] || 'sparkles';
                return `
                  <div class="card hover-lift water-effect" style="overflow:hidden;">
                    <div class="card-header" style="padding-bottom:8px;">
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div style="width:40px;height:40px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:var(--color-primary-alpha);color:var(--color-primary);">
                          <i data-lucide="${catIcon}" style="width:20px;height:20px;"></i>
                        </div>
                        <div>
                          <h3 class="card-title" style="font-size:15px;margin:0;">${project.name}</h3>
                          <span style="font-size:12px;color:var(--color-text-muted);">${project.category}</span>
                        </div>
                      </div>
                      <span class="badge ${cfg.badge}">${cfg.label}</span>
                    </div>
                    <div class="card-body" style="padding-top:8px;">
                      ${project.description ? `<p style="font-size:13px;color:var(--color-text-secondary);line-height:1.5;margin-bottom:14px;">${project.description}</p>` : ''}
                      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:14px;">
                        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-text-muted);">
                          <i data-lucide="calendar" style="width:13px;height:13px;"></i>
                          ${new Date(project.startDate).toLocaleDateString()}${project.endDate ? ' - ' + new Date(project.endDate).toLocaleDateString() : ''}
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-text-muted);">
                          <i data-lucide="users" style="width:13px;height:13px;"></i>
                          ${project.participants} participants
                        </div>
                        <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:var(--color-text-muted);">
                          <i data-lucide="wallet" style="width:13px;height:13px;"></i>
                          Rs. ${(project.budget || 0).toLocaleString()}
                        </div>
                        ${project.impact ? `
                          <div style="display:flex;align-items:center;gap:6px;font-size:12px;color:#14b8a6;">
                            <i data-lucide="zap" style="width:13px;height:13px;"></i>
                            ${project.impact}
                          </div>
                        ` : ''}
                      </div>
                      ${(canEdit || canDelete) ? `
                        <div style="display:flex;gap:8px;border-top:1px solid var(--color-border);padding-top:12px;">
                          ${canEdit ? `<button class="btn btn-ghost btn-sm edit-project" data-id="${project.id}"><i data-lucide="pencil" style="width:13px;height:13px"></i> Edit</button>` : ''}
                          ${canDelete ? `<button class="btn btn-ghost btn-sm delete-project" data-id="${project.id}" style="color:#ef4444;"><i data-lucide="trash-2" style="width:13px;height:13px"></i> Delete</button>` : ''}
                        </div>
                      ` : ''}
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

  function setupEventListeners() {
    // Filter Tabs
    document.querySelectorAll('.filter-tab').forEach(btn => {
      btn.addEventListener('click', () => {
        activeFilter = btn.dataset.filter;
        render();
      });
    });

    // Add Project
    document.getElementById('add-project-btn')?.addEventListener('click', () => {
      showModal('New Project', getProjectFormHtml(), {
        submitText: 'Create Project',
        onSubmit: (close) => {
          const data = getProjectFormData();
          if (!data) return;
          store.create('projects', data);
          showToast('success', 'Project Created', `"${data.name}" has been added.`);
          close();
          render();
        }
      });
    });

    // Edit Project
    document.querySelectorAll('.edit-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = store.getById('projects', btn.dataset.id);
        if (!project) return;
        showModal('Edit Project', getProjectFormHtml(project), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const data = getProjectFormData();
            if (!data) return;
            store.update('projects', project.id, data);
            showToast('success', 'Project Updated', `"${data.name}" has been updated.`);
            close();
            render();
          }
        });
      });
    });

    // Delete Project
    document.querySelectorAll('.delete-project').forEach(btn => {
      btn.addEventListener('click', () => {
        const project = store.getById('projects', btn.dataset.id);
        showConfirm('Delete Project', `Are you sure you want to delete "${project?.name || 'this project'}"? This action cannot be undone.`, () => {
          store.delete('projects', btn.dataset.id);
          showToast('success', 'Project Deleted', 'The project has been removed.');
          render();
        });
      });
    });
  }

  render();
}
