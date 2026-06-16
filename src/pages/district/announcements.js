// ============================================
// LEO NEXUS PORTAL — DISTRICT ANNOUNCEMENTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';

const priorityConfig = {
  urgent: { label: 'Urgent', class: 'badge-danger', icon: 'alert-triangle', color: '#ef4444' },
  important: { label: 'Important', class: 'badge-warning', icon: 'alert-circle', color: '#f59e0b' },
  normal: { label: 'Normal', class: 'badge-success', icon: 'info', color: '#14b8a6' },
};

function getAnnouncementFormHtml(announcement = null) {
  const clubs = store.getAll('clubs');
  const isAll = !announcement || announcement.targetClubs === 'all';
  const selectedClubs = announcement && Array.isArray(announcement.targetClubs) ? announcement.targetClubs : [];

  return `
    <form id="announcement-form">
      <div class="form-group">
        <label class="form-label">Title *</label>
        <input type="text" class="form-input" id="ann-title" value="${announcement?.title || ''}" placeholder="Announcement title" required />
      </div>
      <div class="form-group">
        <label class="form-label">Content *</label>
        <textarea class="form-textarea" id="ann-content" rows="5" placeholder="Write your announcement content here...">${announcement?.content || ''}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Priority *</label>
          <select class="form-select" id="ann-priority">
            <option value="normal" ${announcement?.priority === 'normal' ? 'selected' : ''}>Normal</option>
            <option value="important" ${announcement?.priority === 'important' ? 'selected' : ''}>Important</option>
            <option value="urgent" ${announcement?.priority === 'urgent' ? 'selected' : ''}>Urgent</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Target Audience</label>
          <select class="form-select" id="ann-target-type">
            <option value="all" ${isAll ? 'selected' : ''}>All Clubs</option>
            <option value="specific" ${!isAll ? 'selected' : ''}>Specific Clubs</option>
          </select>
        </div>
      </div>
      <div class="form-group" id="club-select-group" style="${isAll ? 'display:none;' : ''}">
        <label class="form-label">Select Clubs</label>
        <div style="display:flex; flex-wrap:wrap; gap:0.5rem; padding:0.75rem; border:1px solid var(--color-border); border-radius:var(--radius-md); background:var(--color-bg-secondary);">
          ${clubs.map(c => `
            <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; font-size:0.82rem; color:var(--color-text-secondary); padding:0.25rem 0.5rem; border-radius:var(--radius-sm); border:1px solid var(--color-border); background:var(--color-bg-primary);">
              <input type="checkbox" class="club-checkbox" value="${c.id}" ${selectedClubs.includes(c.id) ? 'checked' : ''} />
              ${c.name.replace('Leo Club of ', '')}
            </label>
          `).join('')}
        </div>
      </div>
    </form>
  `;
}

function getAnnouncementFormValues() {
  const targetType = document.getElementById('ann-target-type')?.value;
  let targetClubs = 'all';
  if (targetType === 'specific') {
    const checked = document.querySelectorAll('.club-checkbox:checked');
    targetClubs = Array.from(checked).map(cb => cb.value);
    if (targetClubs.length === 0) targetClubs = 'all';
  }
  return {
    title: document.getElementById('ann-title')?.value?.trim(),
    content: document.getElementById('ann-content')?.value?.trim(),
    priority: document.getElementById('ann-priority')?.value,
    targetClubs,
  };
}

function bindTargetTypeToggle() {
  const select = document.getElementById('ann-target-type');
  const group = document.getElementById('club-select-group');
  if (select && group) {
    select.addEventListener('change', () => {
      group.style.display = select.value === 'specific' ? '' : 'none';
    });
  }
}

export function renderDistrictAnnouncements() {
  const app = document.getElementById('app');

  function render(filterPriority = '') {
    let announcements = store.getAll('announcements')
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    if (filterPriority) {
      announcements = announcements.filter(a => a.priority === filterPriority);
    }

    const stats = {
      total: store.getAll('announcements').length,
      urgent: store.getAll('announcements').filter(a => a.priority === 'urgent').length,
      important: store.getAll('announcements').filter(a => a.priority === 'important').length,
      normal: store.getAll('announcements').filter(a => a.priority === 'normal').length,
    };

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Announcements', ['Management', 'Announcements'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1 style="margin:0;">Announcements</h1>
                <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Broadcast important messages to all clubs</p>
              </div>
              <div class="page-header-actions">
                <button class="btn btn-primary" id="add-announcement-btn">
                  <i data-lucide="megaphone" style="width:16px;height:16px"></i> New Announcement
                </button>
              </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid stagger-enter" style="margin-top:1rem;">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="megaphone" style="color:#0066ff"></i></div>
                <div class="stat-value">${stats.total}</div>
                <div class="stat-label">Total</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);"><i data-lucide="alert-triangle" style="color:#ef4444"></i></div>
                <div class="stat-value">${stats.urgent}</div>
                <div class="stat-label">Urgent</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="alert-circle" style="color:#f59e0b"></i></div>
                <div class="stat-value">${stats.important}</div>
                <div class="stat-label">Important</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="info" style="color:#14b8a6"></i></div>
                <div class="stat-value">${stats.normal}</div>
                <div class="stat-label">Normal</div>
              </div>
            </div>

            <!-- Filter -->
            <div class="toolbar stagger-enter" style="margin-top:1.5rem;">
              <div class="toolbar-left">
                <span style="font-size:0.85rem; color:var(--color-text-secondary);">Showing ${announcements.length} announcements</span>
              </div>
              <div class="toolbar-right">
                <select class="form-select" id="filter-priority" style="min-width:150px;">
                  <option value="">All Priorities</option>
                  <option value="urgent" ${filterPriority==='urgent'?'selected':''}>Urgent</option>
                  <option value="important" ${filterPriority==='important'?'selected':''}>Important</option>
                  <option value="normal" ${filterPriority==='normal'?'selected':''}>Normal</option>
                </select>
              </div>
            </div>

            <!-- Announcements List -->
            <div style="margin-top:1.25rem; display:flex; flex-direction:column; gap:1rem;">
              ${announcements.length === 0 ? `
                <div class="card">
                  <div class="empty-state">
                    <i data-lucide="megaphone" class="empty-icon"></i>
                    <h3>No announcements</h3>
                    <p>Create your first announcement to broadcast to clubs.</p>
                  </div>
                </div>
              ` : announcements.map(ann => {
                const pConfig = priorityConfig[ann.priority] || priorityConfig.normal;
                const targetLabel = ann.targetClubs === 'all'
                  ? 'All Clubs'
                  : Array.isArray(ann.targetClubs)
                    ? ann.targetClubs.map(id => store.getById('clubs', id)?.name?.replace('Leo Club of ', '') || id).join(', ')
                    : 'All Clubs';
                const readCount = (ann.read || []).length;
                const totalClubs = ann.targetClubs === 'all' ? store.getAll('clubs').length : (Array.isArray(ann.targetClubs) ? ann.targetClubs.length : store.getAll('clubs').length);

                return `
                  <div class="card hover-lift stagger-enter" style="border-left:3px solid ${pConfig.color};">
                    <div class="card-body">
                      <div style="display:flex; align-items:flex-start; justify-content:space-between; gap:1rem; flex-wrap:wrap;">
                        <div style="flex:1; min-width:0;">
                          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.5rem;">
                            <i data-lucide="${pConfig.icon}" style="width:16px;height:16px;color:${pConfig.color}"></i>
                            <span class="badge ${pConfig.class}">${pConfig.label}</span>
                            <span style="font-size:0.72rem; color:var(--color-text-muted);">
                              ${new Date(ann.createdAt).toLocaleDateString('en-US', { year:'numeric', month:'long', day:'numeric' })}
                            </span>
                          </div>
                          <h3 style="margin:0 0 0.5rem; font-size:1.05rem; color:var(--color-text-primary);">${ann.title}</h3>
                          <p style="margin:0 0 0.75rem; font-size:0.85rem; color:var(--color-text-secondary); line-height:1.6;">${ann.content.length > 200 ? ann.content.substring(0, 200) + '...' : ann.content}</p>
                          <div style="display:flex; gap:1rem; align-items:center; font-size:0.75rem; color:var(--color-text-muted);">
                            <span><i data-lucide="user" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px"></i> ${ann.author}</span>
                            <span><i data-lucide="send" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px"></i> ${targetLabel}</span>
                            <span><i data-lucide="eye" style="width:12px;height:12px;display:inline-block;vertical-align:middle;margin-right:3px"></i> ${readCount}/${totalClubs} read</span>
                          </div>
                        </div>
                        <div style="display:flex; gap:0.25rem; flex-shrink:0;">
                          <button class="btn btn-icon btn-ghost btn-sm edit-ann-btn" data-id="${ann.id}" title="Edit">
                            <i data-lucide="pencil" style="width:14px;height:14px"></i>
                          </button>
                          <button class="btn btn-icon btn-ghost btn-sm delete-ann-btn" data-id="${ann.id}" title="Delete">
                            <i data-lucide="trash-2" style="width:14px;height:14px;color:var(--color-danger)"></i>
                          </button>
                        </div>
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

    // Filter
    document.getElementById('filter-priority')?.addEventListener('change', (e) => {
      render(e.target.value);
    });

    // Add Announcement
    document.getElementById('add-announcement-btn')?.addEventListener('click', () => {
      showModal('New Announcement', getAnnouncementFormHtml(), {
        submitText: 'Publish',
        size: 'lg',
        onSubmit: (close) => {
          const vals = getAnnouncementFormValues();
          if (!vals.title || !vals.content) {
            showToast('error', 'Validation Error', 'Title and content are required.');
            return;
          }
          vals.createdAt = new Date().toISOString().split('T')[0];
          vals.author = auth.currentUser?.name || 'District Admin';
          vals.read = [];
          store.create('announcements', vals);
          showToast('success', 'Published', 'Announcement has been published to clubs.');
          close();
          render();
        }
      });
      bindTargetTypeToggle();
    });

    // Edit
    document.querySelectorAll('.edit-ann-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ann = store.getById('announcements', btn.dataset.id);
        if (!ann) return;
        showModal('Edit Announcement', getAnnouncementFormHtml(ann), {
          submitText: 'Save Changes',
          size: 'lg',
          onSubmit: (close) => {
            const vals = getAnnouncementFormValues();
            if (!vals.title || !vals.content) {
              showToast('error', 'Validation Error', 'Title and content are required.');
              return;
            }
            store.update('announcements', ann.id, vals);
            showToast('success', 'Updated', 'Announcement has been updated.');
            close();
            render();
          }
        });
        bindTargetTypeToggle();
      });
    });

    // Delete
    document.querySelectorAll('.delete-ann-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const ann = store.getById('announcements', btn.dataset.id);
        if (!ann) return;
        showConfirm('Delete Announcement', `Are you sure you want to delete "<strong>${ann.title}</strong>"?`, () => {
          store.delete('announcements', ann.id);
          showToast('success', 'Deleted', 'Announcement has been removed.');
          render();
        });
      });
    });
  }

  render();
}
