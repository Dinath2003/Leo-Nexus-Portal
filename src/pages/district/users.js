// ============================================
// LEO NEXUS PORTAL — DISTRICT USERS MANAGEMENT
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { renderTable } from '../../components/table.js';

function getUserFormHtml(user = null) {
  const clubs = store.getAll('clubs');
  return `
    <form id="user-form">
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Full Name *</label>
          <input type="text" class="form-input" id="user-name" value="${user?.name || ''}" placeholder="Enter full name" required />
        </div>
        <div class="form-group">
          <label class="form-label">Email *</label>
          <input type="email" class="form-input" id="user-email" value="${user?.email || ''}" placeholder="email@example.com" required />
        </div>
      </div>
      ${!user ? `
      <div class="form-group">
        <label class="form-label">Password *</label>
        <input type="password" class="form-input" id="user-password" placeholder="Minimum 6 characters" required />
      </div>` : ''}
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Role *</label>
          <select class="form-select" id="user-role">
            <option value="">Select Role</option>
            <option value="district_admin" ${user?.role === 'district_admin' ? 'selected' : ''}>District Admin</option>
            <option value="club_admin" ${user?.role === 'club_admin' ? 'selected' : ''}>Club Admin</option>
            <option value="club_viewer" ${user?.role === 'club_viewer' ? 'selected' : ''}>Club Viewer</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Club Assignment</label>
          <select class="form-select" id="user-club">
            <option value="">No Club (District)</option>
            ${clubs.map(c => `<option value="${c.id}" ${user?.clubId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
          </select>
        </div>
      </div>
    </form>
  `;
}

function getUserFormValues(isEdit = false) {
  const vals = {
    name: document.getElementById('user-name')?.value?.trim(),
    email: document.getElementById('user-email')?.value?.trim(),
    role: document.getElementById('user-role')?.value,
    clubId: document.getElementById('user-club')?.value || null,
  };
  if (!isEdit) {
    vals.password = document.getElementById('user-password')?.value?.trim();
  }
  return vals;
}

function validateUserForm(vals, isEdit = false) {
  if (!vals.name || !vals.email) {
    showToast('error', 'Validation Error', 'Name and email are required.');
    return false;
  }
  if (!vals.role) {
    showToast('error', 'Validation Error', 'Please select a role.');
    return false;
  }
  if (!isEdit && (!vals.password || vals.password.length < 6)) {
    showToast('error', 'Validation Error', 'Password must be at least 6 characters.');
    return false;
  }
  return true;
}

const roleBadgeMap = {
  'district_admin': { label: 'District Admin', class: 'badge-primary' },
  'club_admin': { label: 'Club Admin', class: 'badge-cyan' },
  'club_viewer': { label: 'Viewer', class: 'badge-warning' }
};

export function renderDistrictUsers() {
  const app = document.getElementById('app');

  function render(searchTerm = '', filterRole = '') {
    let users = store.getAll('users');

    if (searchTerm) {
      const q = searchTerm.toLowerCase();
      users = users.filter(u =>
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }
    if (filterRole) users = users.filter(u => u.role === filterRole);

    const totalUsers = store.getAll('users');
    const districtAdmins = totalUsers.filter(u => u.role === 'district_admin').length;
    const clubAdmins = totalUsers.filter(u => u.role === 'club_admin').length;
    const clubViewers = totalUsers.filter(u => u.role === 'club_viewer').length;

    const tableHtml = renderTable(
      [
        { label: 'User', render: row => `
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div class="avatar" style="width:36px;height:36px;font-size:0.75rem;">${row.avatar || row.name.split(' ').map(n=>n[0]).join('').toUpperCase()}</div>
            <div>
              <div style="font-weight:600; color:var(--color-text-primary);">${row.name}</div>
              <div style="font-size:0.72rem; color:var(--color-text-muted);">${row.email}</div>
            </div>
          </div>
        `},
        { label: 'Role', render: row => {
          const badge = roleBadgeMap[row.role] || { label: row.role, class: 'badge-primary' };
          return `<span class="badge ${badge.class}">${badge.label}</span>`;
        }},
        { label: 'Club', render: row => {
          if (!row.clubId) return '<span style="color:var(--color-text-muted);">District Level</span>';
          const club = store.getById('clubs', row.clubId);
          return club ? club.name.replace('Leo Club of ', '') : '—';
        }},
        { label: 'Created', render: row => new Date(row.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' }) },
      ],
      users,
      {
        emptyMessage: 'No users found',
        actions: (row) => `
          <button class="btn btn-icon btn-ghost btn-sm edit-user-btn" data-id="${row.id}" title="Edit">
            <i data-lucide="pencil" style="width:14px;height:14px"></i>
          </button>
          ${row.id !== auth.currentUser?.id ? `
          <button class="btn btn-icon btn-ghost btn-sm delete-user-btn" data-id="${row.id}" title="Delete">
            <i data-lucide="trash-2" style="width:14px;height:14px;color:var(--color-danger)"></i>
          </button>` : ''}
        `
      }
    );

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Users', ['Management', 'Users'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1 style="margin:0;">User Management</h1>
                <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Manage portal users and access roles</p>
              </div>
              <div class="page-header-actions">
                <button class="btn btn-primary" id="add-user-btn">
                  <i data-lucide="user-plus" style="width:16px;height:16px"></i> Add User
                </button>
              </div>
            </div>

            <!-- Stats Bar -->
            <div class="stats-grid stagger-enter" style="margin-top:1rem;">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="users" style="color:#0066ff"></i></div>
                <div class="stat-value">${totalUsers.length}</div>
                <div class="stat-label">Total Users</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(139,92,246,0.12);"><i data-lucide="shield" style="color:#8b5cf6"></i></div>
                <div class="stat-value">${districtAdmins}</div>
                <div class="stat-label">District Admins</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,212,255,0.12);"><i data-lucide="user-check" style="color:#00d4ff"></i></div>
                <div class="stat-value">${clubAdmins}</div>
                <div class="stat-label">Club Admins</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="eye" style="color:#f59e0b"></i></div>
                <div class="stat-value">${clubViewers}</div>
                <div class="stat-label">Viewers</div>
              </div>
            </div>

            <!-- Toolbar -->
            <div class="toolbar stagger-enter" style="margin-top:1.5rem;">
              <div class="toolbar-left">
                <div class="search-bar">
                  <i data-lucide="search" class="search-icon"></i>
                  <input type="text" placeholder="Search users..." id="search-users" value="${searchTerm}" />
                </div>
              </div>
              <div class="toolbar-right">
                <select class="form-select" id="filter-role" style="min-width:150px;">
                  <option value="">All Roles</option>
                  <option value="district_admin" ${filterRole==='district_admin' ? 'selected' : ''}>District Admin</option>
                  <option value="club_admin" ${filterRole==='club_admin' ? 'selected' : ''}>Club Admin</option>
                  <option value="club_viewer" ${filterRole==='club_viewer' ? 'selected' : ''}>Club Viewer</option>
                </select>
              </div>
            </div>

            <!-- Users Table -->
            <div class="card stagger-enter" style="margin-top:1.25rem;">
              ${tableHtml}
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
    document.getElementById('search-users')?.addEventListener('input', (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        render(e.target.value, document.getElementById('filter-role')?.value);
      }, 300);
    });

    // Filter
    document.getElementById('filter-role')?.addEventListener('change', () => {
      render(document.getElementById('search-users')?.value, document.getElementById('filter-role')?.value);
    });

    // Add User
    document.getElementById('add-user-btn')?.addEventListener('click', () => {
      showModal('Add New User', getUserFormHtml(), {
        submitText: 'Create User',
        onSubmit: (close) => {
          const vals = getUserFormValues(false);
          if (!validateUserForm(vals, false)) return;
          vals.avatar = vals.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
          vals.createdAt = new Date().toISOString().split('T')[0];
          store.create('users', vals);
          showToast('success', 'User Created', `${vals.name} has been added.`);
          close();
          render();
        }
      });
    });

    // Edit User
    document.querySelectorAll('.edit-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const user = store.getById('users', btn.dataset.id);
        if (!user) return;
        showModal('Edit User', getUserFormHtml(user), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const vals = getUserFormValues(true);
            if (!validateUserForm(vals, true)) return;
            vals.avatar = vals.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
            store.update('users', user.id, vals);
            showToast('success', 'User Updated', `${vals.name} has been updated.`);
            close();
            render();
          }
        });
      });
    });

    // Delete User
    document.querySelectorAll('.delete-user-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const user = store.getById('users', btn.dataset.id);
        if (!user) return;
        showConfirm('Delete User', `Are you sure you want to delete <strong>${user.name}</strong>? This cannot be undone.`, () => {
          store.delete('users', user.id);
          showToast('success', 'User Deleted', `${user.name} has been removed.`);
          render();
        });
      });
    });
  }

  render();
}
