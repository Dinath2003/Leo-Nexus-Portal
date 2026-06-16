// ============================================
// LEO NEXUS PORTAL — DISTRICT CLUBS MANAGEMENT
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';

function getClubFormHtml(club = null) {
  return `
    <form id="club-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Club Name *</label>
          <input type="text" class="form-input" id="club-name" value="${club?.name || ''}" placeholder="Leo Club of..." required />
        </div>
        <div class="form-group">
          <label class="form-label">Club Code *</label>
          <input type="text" class="form-input" id="club-code" value="${club?.code || ''}" placeholder="LC-XXX" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">President *</label>
          <input type="text" class="form-input" id="club-president" value="${club?.president || ''}" placeholder="President name" required />
        </div>
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-select" id="club-status">
            <option value="active" ${club?.status === 'active' ? 'selected' : ''}>Active</option>
            <option value="inactive" ${club?.status === 'inactive' ? 'selected' : ''}>Inactive</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Zone *</label>
          <select class="form-select" id="club-zone">
            <option value="">Select Zone</option>
            <option value="Zone A" ${club?.zone === 'Zone A' ? 'selected' : ''}>Zone A</option>
            <option value="Zone B" ${club?.zone === 'Zone B' ? 'selected' : ''}>Zone B</option>
            <option value="Zone C" ${club?.zone === 'Zone C' ? 'selected' : ''}>Zone C</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Region *</label>
          <select class="form-select" id="club-region">
            <option value="">Select Region</option>
            <option value="Region 1" ${club?.region === 'Region 1' ? 'selected' : ''}>Region 1</option>
            <option value="Region 2" ${club?.region === 'Region 2' ? 'selected' : ''}>Region 2</option>
            <option value="Region 3" ${club?.region === 'Region 3' ? 'selected' : ''}>Region 3</option>
          </select>
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="club-email" value="${club?.email || ''}" placeholder="club@leo.org" />
        </div>
        <div class="form-group">
          <label class="form-label">Phone</label>
          <input type="tel" class="form-input" id="club-phone" value="${club?.phone || ''}" placeholder="+94 77 XXX XXXX" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Meeting Day</label>
        <input type="text" class="form-input" id="club-meetingDay" value="${club?.meetingDay || ''}" placeholder="e.g. Every Saturday" />
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="club-description" rows="3" placeholder="Brief description of the club...">${club?.description || ''}</textarea>
      </div>
    </form>
  `;
}

function getFormValues() {
  return {
    name: document.getElementById('club-name')?.value?.trim(),
    code: document.getElementById('club-code')?.value?.trim(),
    president: document.getElementById('club-president')?.value?.trim(),
    status: document.getElementById('club-status')?.value,
    zone: document.getElementById('club-zone')?.value,
    region: document.getElementById('club-region')?.value,
    email: document.getElementById('club-email')?.value?.trim(),
    phone: document.getElementById('club-phone')?.value?.trim(),
    meetingDay: document.getElementById('club-meetingDay')?.value?.trim(),
    description: document.getElementById('club-description')?.value?.trim(),
  };
}

function validateForm(vals) {
  if (!vals.name || !vals.code || !vals.president) {
    showToast('error', 'Validation Error', 'Club name, code, and president are required.');
    return false;
  }
  if (!vals.zone || !vals.region) {
    showToast('error', 'Validation Error', 'Zone and region are required.');
    return false;
  }
  return true;
}

export function renderDistrictClubs() {
  const app = document.getElementById('app');

  function render(searchTerm = '', filterZone = '', filterStatus = '') {
    let clubs = store.getAll('clubs');

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      clubs = clubs.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.code.toLowerCase().includes(q) ||
        c.president.toLowerCase().includes(q)
      );
    }
    if (filterZone) clubs = clubs.filter(c => c.zone === filterZone);
    if (filterStatus) clubs = clubs.filter(c => c.status === filterStatus);

    const zones = [...new Set(store.getAll('clubs').map(c => c.zone))];

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Clubs', ['Management', 'Clubs'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1 style="margin:0;">Club Management</h1>
                <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Manage all Leo clubs in the district</p>
              </div>
              <div class="page-header-actions">
                <button class="btn btn-primary" id="add-club-btn">
                  <i data-lucide="plus" style="width:16px;height:16px"></i> Add Club
                </button>
              </div>
            </div>

            <!-- Stats Bar -->
            <div class="stats-grid stagger-enter" style="margin-top:1rem;">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="building-2" style="color:#0066ff"></i></div>
                <div class="stat-value">${store.getAll('clubs').length}</div>
                <div class="stat-label">Total Clubs</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="check-circle" style="color:#14b8a6"></i></div>
                <div class="stat-value">${store.getAll('clubs').filter(c=>c.status==='active').length}</div>
                <div class="stat-label">Active</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);"><i data-lucide="x-circle" style="color:#ef4444"></i></div>
                <div class="stat-value">${store.getAll('clubs').filter(c=>c.status==='inactive').length}</div>
                <div class="stat-label">Inactive</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,212,255,0.12);"><i data-lucide="users" style="color:#00d4ff"></i></div>
                <div class="stat-value">${store.getAll('clubs').reduce((s,c)=>s+c.memberCount,0).toLocaleString()}</div>
                <div class="stat-label">Total Members</div>
              </div>
            </div>

            <!-- Toolbar -->
            <div class="toolbar stagger-enter" style="margin-top:1.5rem;">
              <div class="toolbar-left">
                <div class="search-bar">
                  <i data-lucide="search" class="search-icon"></i>
                  <input type="text" placeholder="Search clubs..." id="search-clubs" value="${searchTerm}" />
                </div>
              </div>
              <div class="toolbar-right">
                <select class="form-select" id="filter-zone" style="min-width:130px;">
                  <option value="">All Zones</option>
                  ${zones.map(z => `<option value="${z}" ${filterZone === z ? 'selected' : ''}>${z}</option>`).join('')}
                </select>
                <select class="form-select" id="filter-status" style="min-width:130px;">
                  <option value="">All Status</option>
                  <option value="active" ${filterStatus === 'active' ? 'selected' : ''}>Active</option>
                  <option value="inactive" ${filterStatus === 'inactive' ? 'selected' : ''}>Inactive</option>
                </select>
              </div>
            </div>

            <!-- Clubs Grid -->
            <div class="grid-3 stagger-enter" style="margin-top:1.25rem;">
              ${clubs.length === 0 ? `
                <div class="card" style="grid-column:1/-1;">
                  <div class="empty-state">
                    <i data-lucide="inbox" class="empty-icon"></i>
                    <h3>No clubs found</h3>
                    <p>Try adjusting your search or filters.</p>
                  </div>
                </div>
              ` : clubs.map(club => {
                const points = store.getTotalClubPoints(club.id);
                const members = store.getClubMembers(club.id).length || club.memberCount;
                return `
                  <div class="card hover-lift water-effect club-card" data-club-id="${club.id}" style="cursor:pointer;">
                    <div class="card-body">
                      <div style="display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:0.75rem;">
                        <div style="width:42px; height:42px; border-radius:10px; background:linear-gradient(135deg, rgba(0,102,255,0.2), rgba(0,212,255,0.1)); display:flex; align-items:center; justify-content:center;">
                          <i data-lucide="building-2" style="width:20px;height:20px;color:var(--color-primary)"></i>
                        </div>
                        <div style="display:flex; gap:0.5rem; align-items:center;">
                          <span class="badge badge-${club.status === 'active' ? 'success' : 'danger'}">${club.status}</span>
                          <div style="position:relative;">
                            <button class="btn btn-icon btn-ghost btn-sm club-menu-btn" data-club-id="${club.id}" onclick="event.stopPropagation()">
                              <i data-lucide="more-vertical" style="width:14px;height:14px"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                      <h4 style="margin:0 0 0.15rem; font-size:0.95rem; color:var(--color-text-primary);">${club.name}</h4>
                      <div style="font-size:0.75rem; color:var(--color-primary); font-weight:600; margin-bottom:0.75rem;">${club.code}</div>
                      <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.78rem; color:var(--color-text-secondary);">
                        <div style="display:flex; align-items:center; gap:0.4rem;">
                          <i data-lucide="user" style="width:13px;height:13px"></i> ${club.president}
                        </div>
                        <div style="display:flex; align-items:center; gap:0.4rem;">
                          <i data-lucide="map-pin" style="width:13px;height:13px"></i> ${club.zone} · ${club.region}
                        </div>
                        <div style="display:flex; align-items:center; gap:0.4rem;">
                          <i data-lucide="calendar" style="width:13px;height:13px"></i> ${club.meetingDay || 'Not set'}
                        </div>
                      </div>
                      <div style="display:flex; justify-content:space-between; margin-top:1rem; padding-top:0.75rem; border-top:1px solid var(--color-border);">
                        <div style="text-align:center;">
                          <div style="font-size:1rem; font-weight:700; color:var(--color-text-primary);">${members}</div>
                          <div style="font-size:0.65rem; color:var(--color-text-muted);">Members</div>
                        </div>
                        <div style="text-align:center;">
                          <div style="font-size:1rem; font-weight:700; color:var(--color-primary);">${points}</div>
                          <div style="font-size:0.65rem; color:var(--color-text-muted);">Points</div>
                        </div>
                        <div style="text-align:center;">
                          <div style="font-size:1rem; font-weight:700; color:var(--color-cyan);">${store.getClubProjects(club.id).length}</div>
                          <div style="font-size:0.65rem; color:var(--color-text-muted);">Projects</div>
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

    // Search
    let searchTimeout;
    document.getElementById('search-clubs')?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        render(e.target.value, document.getElementById('filter-zone')?.value, document.getElementById('filter-status')?.value);
      }, 300);
    });

    // Filters
    document.getElementById('filter-zone')?.addEventListener('change', () => {
      render(document.getElementById('search-clubs')?.value, document.getElementById('filter-zone')?.value, document.getElementById('filter-status')?.value);
    });
    document.getElementById('filter-status')?.addEventListener('change', () => {
      render(document.getElementById('search-clubs')?.value, document.getElementById('filter-zone')?.value, document.getElementById('filter-status')?.value);
    });

    // Add Club
    document.getElementById('add-club-btn')?.addEventListener('click', () => {
      showModal('Add New Club', getClubFormHtml(), {
        submitText: 'Create Club',
        size: 'lg',
        onSubmit: (close) => {
          const vals = getFormValues();
          if (!validateForm(vals)) return;
          vals.charter_date = new Date().toISOString().split('T')[0];
          vals.memberCount = 0;
          store.create('clubs', vals);
          showToast('success', 'Club Created', `${vals.name} has been added successfully.`);
          close();
          render();
        }
      });
    });

    // Club Card Click → Edit
    document.querySelectorAll('.club-card').forEach(card => {
      card.addEventListener('click', () => {
        const clubId = card.dataset.clubId;
        const club = store.getById('clubs', clubId);
        if (!club) return;
        showModal('Edit Club', getClubFormHtml(club), {
          submitText: 'Save Changes',
          size: 'lg',
          onSubmit: (close) => {
            const vals = getFormValues();
            if (!validateForm(vals)) return;
            store.update('clubs', clubId, vals);
            showToast('success', 'Club Updated', `${vals.name} has been updated.`);
            close();
            render();
          }
        });
      });
    });

    // Club Menu Button (for delete)
    document.querySelectorAll('.club-menu-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const clubId = btn.dataset.clubId;
        const club = store.getById('clubs', clubId);
        if (!club) return;
        showConfirm('Delete Club', `Are you sure you want to delete <strong>${club.name}</strong>? This action cannot be undone.`, () => {
          store.delete('clubs', clubId);
          showToast('success', 'Club Deleted', `${club.name} has been removed.`);
          render();
        });
      });
    });
  }

  render();
}
