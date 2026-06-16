// ============================================
// LEO NEXUS PORTAL — CLUB MEMBERS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { renderTable } from '../../components/table.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';

function getMemberFormHtml(data = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Full Name *</label>
        <input type="text" class="form-input" id="member-name" placeholder="Enter full name" value="${data.name || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Role *</label>
        <select class="form-select" id="member-role">
          ${['President', 'VP', 'Secretary', 'Treasurer', 'Director', 'Member']
            .map(r => `<option value="${r}" ${data.role === r ? 'selected' : ''}>${r}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Status</label>
        <select class="form-select" id="member-status">
          <option value="active" ${data.status === 'active' ? 'selected' : ''}>Active</option>
          <option value="inactive" ${data.status === 'inactive' ? 'selected' : ''}>Inactive</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Join Date *</label>
        <input type="date" class="form-input" id="member-joindate" value="${data.joinDate || new Date().toISOString().split('T')[0]}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Phone</label>
        <input type="tel" class="form-input" id="member-phone" placeholder="+94 77 XXX XXXX" value="${data.phone || ''}" />
      </div>
      <div class="form-group">
        <label class="form-label">Email</label>
        <input type="email" class="form-input" id="member-email" placeholder="email@example.com" value="${data.email || ''}" />
      </div>
    </div>
  `;
}

function getMemberFormData() {
  const name = document.getElementById('member-name').value.trim();
  const role = document.getElementById('member-role').value;
  const status = document.getElementById('member-status').value;
  const joinDate = document.getElementById('member-joindate').value;
  const phone = document.getElementById('member-phone').value.trim();
  const email = document.getElementById('member-email').value.trim();

  if (!name) { showToast('error', 'Validation Error', 'Please enter the member name.'); return null; }
  if (!joinDate) { showToast('error', 'Validation Error', 'Please select a join date.'); return null; }

  return { name, role, status, joinDate, phone, email, clubId: auth.userClubId };
}

export function renderClubMembers() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
  const canCreate = auth.can('create', 'members');
  const canEdit = auth.can('update', 'members');
  const canDelete = auth.can('delete', 'members');

  let searchQuery = '';

  function render() {
    const allMembers = store.getClubMembers(clubId);
    const filtered = searchQuery
      ? allMembers.filter(m => m.name.toLowerCase().includes(searchQuery.toLowerCase()) || m.role.toLowerCase().includes(searchQuery.toLowerCase()) || (m.email || '').toLowerCase().includes(searchQuery.toLowerCase()))
      : allMembers;

    const totalMembers = allMembers.length;
    const activeMembers = allMembers.filter(m => m.status === 'active').length;
    const inactiveMembers = allMembers.filter(m => m.status === 'inactive').length;
    const thisMonth = new Date().toISOString().slice(0, 7);
    const newThisMonth = allMembers.filter(m => m.joinDate && m.joinDate.startsWith(thisMonth)).length;

    const roleColors = {
      'President': 'badge-primary',
      'VP': 'badge-cyan',
      'Secretary': 'badge-success',
      'Treasurer': 'badge-warning',
      'Director': 'badge-primary',
      'Member': 'badge-primary'
    };

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Members', ['Club', 'Members'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1>Club Members</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Manage your club's membership roster</p>
              </div>
              <div class="page-header-actions">
                ${canCreate ? '<button class="btn btn-primary" id="add-member-btn"><i data-lucide="user-plus" style="width:16px;height:16px"></i> Add Member</button>' : ''}
              </div>
            </div>

            <!-- Stats -->
            <div class="stats-grid stagger-enter" style="animation-delay:0.1s">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon"><i data-lucide="users"></i></div>
                <div class="stat-value">${totalMembers}</div>
                <div class="stat-label">Total Members</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);color:#14b8a6;">
                  <i data-lucide="user-check"></i>
                </div>
                <div class="stat-value">${activeMembers}</div>
                <div class="stat-label">Active</div>
                <div class="stat-change positive">
                  <i data-lucide="trending-up" style="width:12px;height:12px"></i> ${totalMembers > 0 ? Math.round((activeMembers / totalMembers) * 100) : 0}%
                </div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);color:#ef4444;">
                  <i data-lucide="user-x"></i>
                </div>
                <div class="stat-value">${inactiveMembers}</div>
                <div class="stat-label">Inactive</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(139,92,246,0.12);color:#8b5cf6;">
                  <i data-lucide="user-round-plus"></i>
                </div>
                <div class="stat-value">${newThisMonth}</div>
                <div class="stat-label">New This Month</div>
              </div>
            </div>

            <!-- Members Table -->
            <div class="card stagger-enter" style="animation-delay:0.2s">
              <div class="card-header">
                <h3 class="card-title"><i data-lucide="list" style="width:18px;height:18px"></i> Member Directory</h3>
                <div class="search-bar" style="max-width:260px;">
                  <i data-lucide="search" class="search-icon"></i>
                  <input type="text" placeholder="Search members..." id="member-search" value="${searchQuery}" />
                </div>
              </div>
              <div class="card-body">
                ${renderTable(
                  [
                    { label: 'Name', key: 'name', render: row => `
                      <div style="display:flex;align-items:center;gap:10px;">
                        <div class="avatar" style="width:32px;height:32px;font-size:12px;">${row.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</div>
                        <div>
                          <div style="font-weight:500;">${row.name}</div>
                          <div style="font-size:11px;color:var(--color-text-muted);">${row.email || '—'}</div>
                        </div>
                      </div>
                    `},
                    { label: 'Role', key: 'role', render: row => `<span class="badge ${roleColors[row.role] || 'badge-primary'}">${row.role}</span>` },
                    { label: 'Status', key: 'status', render: row => `
                      <div style="display:flex;align-items:center;gap:6px;">
                        <span style="width:8px;height:8px;border-radius:50%;background:${row.status === 'active' ? '#14b8a6' : '#ef4444'};display:inline-block;"></span>
                        ${row.status}
                      </div>
                    `},
                    { label: 'Joined', key: 'joinDate', render: row => new Date(row.joinDate).toLocaleDateString() },
                    { label: 'Phone', key: 'phone', render: row => row.phone || '—' },
                  ],
                  filtered,
                  {
                    emptyMessage: searchQuery ? 'No members match your search' : 'No members found',
                    actions: (canEdit || canDelete) ? (row) => `
                      ${canEdit ? `<button class="btn btn-ghost btn-sm btn-icon toggle-status" data-id="${row.id}" data-status="${row.status}" title="Toggle Status"><i data-lucide="${row.status === 'active' ? 'user-x' : 'user-check'}" style="width:14px;height:14px"></i></button>` : ''}
                      ${canEdit ? `<button class="btn btn-ghost btn-sm btn-icon edit-member" data-id="${row.id}" title="Edit"><i data-lucide="pencil" style="width:14px;height:14px"></i></button>` : ''}
                      ${canDelete ? `<button class="btn btn-ghost btn-sm btn-icon delete-member" data-id="${row.id}" title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px"></i></button>` : ''}
                    ` : undefined
                  }
                )}
              </div>
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
    // Search
    document.getElementById('member-search')?.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      render();
      const searchInput = document.getElementById('member-search');
      if (searchInput) { searchInput.focus(); searchInput.setSelectionRange(searchQuery.length, searchQuery.length); }
    });

    // Add Member
    document.getElementById('add-member-btn')?.addEventListener('click', () => {
      showModal('Add Member', getMemberFormHtml(), {
        submitText: 'Add Member',
        onSubmit: (close) => {
          const data = getMemberFormData();
          if (!data) return;
          store.create('members', data);
          showToast('success', 'Member Added', `${data.name} has been added to the club.`);
          close();
          render();
        }
      });
    });

    // Edit Member
    document.querySelectorAll('.edit-member').forEach(btn => {
      btn.addEventListener('click', () => {
        const member = store.getById('members', btn.dataset.id);
        if (!member) return;
        showModal('Edit Member', getMemberFormHtml(member), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const data = getMemberFormData();
            if (!data) return;
            store.update('members', member.id, data);
            showToast('success', 'Member Updated', `${data.name}'s details have been updated.`);
            close();
            render();
          }
        });
      });
    });

    // Delete Member
    document.querySelectorAll('.delete-member').forEach(btn => {
      btn.addEventListener('click', () => {
        const member = store.getById('members', btn.dataset.id);
        showConfirm('Remove Member', `Are you sure you want to remove ${member?.name || 'this member'}? This action cannot be undone.`, () => {
          store.delete('members', btn.dataset.id);
          showToast('success', 'Member Removed', 'The member has been removed from the club.');
          render();
        });
      });
    });

    // Toggle Status
    document.querySelectorAll('.toggle-status').forEach(btn => {
      btn.addEventListener('click', () => {
        const newStatus = btn.dataset.status === 'active' ? 'inactive' : 'active';
        store.update('members', btn.dataset.id, { status: newStatus });
        showToast('info', 'Status Updated', `Member marked as ${newStatus}.`);
        render();
      });
    });
  }

  render();
}
