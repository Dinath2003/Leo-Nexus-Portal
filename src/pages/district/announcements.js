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

      <!-- Email Broadcasting Section -->
      <div class="form-group" style="margin-top:1.25rem; padding-top:1.25rem; border-top:1px dashed rgba(255,255,255,0.08);">
        <label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; font-weight:600; color:var(--color-text-primary);">
          <input type="checkbox" id="ann-broadcast-email" />
          <span style="display:flex; align-items:center; gap:0.35rem;">
            <i data-lucide="mail" style="width:16px;height:16px;"></i> Broadcast via Email
          </span>
        </label>
      </div>

      <div id="broadcast-options-group" style="display:none; margin-top:0.75rem; padding:1rem; border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-md); background:rgba(255,255,255,0.01);">
        <div class="form-group" style="margin-bottom:0;">
          <label class="form-label">Email Recipients *</label>
          <select class="form-select" id="ann-broadcast-target">
            <option value="presidents">All Club Presidents (District-Wide)</option>
            <option value="all-members">All Registered Club Members (District-Wide)</option>
            <option value="specific-clubs-all">All Members of Specific Leo Clubs</option>
            <option value="specific-clubs-presidents">Only Presidents of Specific Leo Clubs</option>
          </select>
        </div>

        <div class="form-group" id="email-club-select-group" style="display:none; margin-top:1rem;">
          <label class="form-label">Select Leo Clubs for Broadcast</label>
          <div style="display:flex; flex-wrap:wrap; gap:0.5rem; padding:0.75rem; border:1px solid rgba(255,255,255,0.06); border-radius:var(--radius-md); background:var(--color-navy);">
            ${clubs.map(c => `
              <label style="display:flex; align-items:center; gap:0.35rem; cursor:pointer; font-size:0.82rem; color:var(--color-text-secondary); padding:0.25rem 0.5rem; border-radius:var(--radius-sm); border:1px solid rgba(255,255,255,0.06); background:var(--color-bg-primary);">
                <input type="checkbox" class="email-club-checkbox" value="${c.id}" />
                ${c.name.replace('Leo Club of ', '')}
              </label>
            `).join('')}
          </div>
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

  const broadcastEmail = document.getElementById('ann-broadcast-email')?.checked || false;
  const broadcastTarget = document.getElementById('ann-broadcast-target')?.value || 'presidents';
  
  let broadcastClubs = [];
  if (broadcastTarget === 'specific-clubs-all' || broadcastTarget === 'specific-clubs-presidents') {
    const checked = document.querySelectorAll('.email-club-checkbox:checked');
    broadcastClubs = Array.from(checked).map(cb => cb.value);
  }

  return {
    title: document.getElementById('ann-title')?.value?.trim(),
    content: document.getElementById('ann-content')?.value?.trim(),
    priority: document.getElementById('ann-priority')?.value,
    targetClubs,
    broadcastEmail,
    broadcastTarget,
    broadcastClubs
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

function bindBroadcastEmailToggle() {
  const checkbox = document.getElementById('ann-broadcast-email');
  const optionsGroup = document.getElementById('broadcast-options-group');
  const targetSelect = document.getElementById('ann-broadcast-target');
  const emailClubGroup = document.getElementById('email-club-select-group');

  if (checkbox && optionsGroup) {
    checkbox.addEventListener('change', () => {
      optionsGroup.style.display = checkbox.checked ? '' : 'none';
    });
  }

  if (targetSelect && emailClubGroup) {
    targetSelect.addEventListener('change', () => {
      const showClubs = targetSelect.value === 'specific-clubs-all' || targetSelect.value === 'specific-clubs-presidents';
      emailClubGroup.style.display = showClubs ? '' : 'none';
    });
  }
}

function getBroadcastRecipients(broadcastTarget, broadcastClubs) {
  const clubs = store.getAll('clubs');
  const members = store.getAll('members');
  const users = store.getAll('users');
  const recipients = [];

  const getPresidentForClub = (club) => {
    // Find in users table
    const userPres = users.find(u => u.clubId === club.id && u.role === 'club_president');
    if (userPres) {
      return { name: userPres.name, email: userPres.email, clubName: club.name, role: 'President' };
    }
    // Find in members table
    const memberPres = members.find(m => m.clubId === club.id && m.role === 'President');
    if (memberPres) {
      return { name: memberPres.name, email: memberPres.email || `${memberPres.name.toLowerCase().replace(/\s+/g, '.')}@leo.org`, clubName: club.name, role: 'President' };
    }
    // Fallback using club.president string
    const presName = club.president || 'Club President';
    return {
      name: presName,
      email: `${presName.toLowerCase().replace(/\s+/g, '.')}@leo.org`,
      clubName: club.name,
      role: 'President'
    };
  };

  if (broadcastTarget === 'presidents') {
    clubs.forEach(c => {
      recipients.push(getPresidentForClub(c));
    });
  } else if (broadcastTarget === 'all-members') {
    members.forEach(m => {
      const club = clubs.find(c => c.id === m.clubId);
      recipients.push({
        name: m.name,
        email: m.email || `${m.name.toLowerCase().replace(/\s+/g, '.')}@leo.org`,
        clubName: club ? club.name : 'Unknown Club',
        role: m.role || 'Member'
      });
    });
  } else if (broadcastTarget === 'specific-clubs-all') {
    members.forEach(m => {
      if (broadcastClubs.includes(m.clubId)) {
        const club = clubs.find(c => c.id === m.clubId);
        recipients.push({
          name: m.name,
          email: m.email || `${m.name.toLowerCase().replace(/\s+/g, '.')}@leo.org`,
          clubName: club ? club.name : 'Unknown Club',
          role: m.role || 'Member'
        });
      }
    });
  } else if (broadcastTarget === 'specific-clubs-presidents') {
    clubs.forEach(c => {
      if (broadcastClubs.includes(c.id)) {
        recipients.push(getPresidentForClub(c));
      }
    });
  }

  // Deduplicate by email address to prevent double sends
  const seen = new Set();
  return recipients.filter(r => {
    if (seen.has(r.email)) return false;
    seen.add(r.email);
    return true;
  });
}

function runEmailBroadcastSimulation(recipients, announcementTitle, onComplete) {
  const progressHtml = `
    <div style="font-family: var(--font-body); display:flex; flex-direction:column; gap:1.25rem;">
      <div style="background: rgba(0,0,0,0.2); border: 1px solid var(--color-border); padding: 0.75rem 1rem; border-radius: var(--radius-md); font-size: 0.85rem; color: var(--color-text-secondary);">
        <div style="display:flex; justify-content:space-between; margin-bottom:0.25rem; font-family:var(--font-display);">
          <span style="font-weight:600; color:var(--color-text-primary);">Subject:</span>
          <span style="color:var(--color-primary); font-weight:700;">[Leo Broadcast] ${announcementTitle}</span>
        </div>
        <div style="display:flex; justify-content:space-between;">
          <span style="font-weight:600; color:var(--color-text-primary);">Relay Server:</span>
          <span>smtp.leo-district-portal.org (SSL/TLS 465)</span>
        </div>
      </div>

      <!-- Progress Indicators -->
      <div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:0.5rem; font-size:0.85rem;">
          <span id="relay-status" style="font-weight:600; color:var(--color-primary); display:flex; align-items:center; gap:6px;">
            <span class="spinner" style="width:12px; height:12px; border:2px solid var(--color-primary); border-top-color:transparent; border-radius:50%; display:inline-block; animation: spin 0.8s linear infinite;"></span>
            Initializing SMTP Handshake...
          </span>
          <span id="relay-percent" style="font-weight:700; color:var(--color-text-primary);">0%</span>
        </div>
        <div style="width:100%; height:8px; background:rgba(255,255,255,0.06); border:1px solid var(--color-border); border-radius:4px; overflow:hidden;">
          <div id="relay-progress-bar" style="width:0%; height:100%; background:var(--gradient-primary); border-radius:4px; transition: width 0.15s ease;"></div>
        </div>
      </div>

      <!-- Transmission Logs Terminal -->
      <div>
        <label class="form-label" style="font-weight:600; margin-bottom:0.5rem;">Transmission Log</label>
        <div id="relay-terminal" style="background:#02020a; border: 1px solid var(--color-border); border-radius:var(--radius-md); height:160px; overflow-y:auto; padding:0.75rem 1rem; font-family: monospace; font-size:0.75rem; color:#88e0ff; display:flex; flex-direction:column; gap:6px; scroll-behavior:smooth;">
          <div style="color:#ffffff;">[SYSTEM] Booting Leo Mail Spooler v2.1...</div>
        </div>
      </div>

      <!-- Control Button -->
      <div style="display:flex; justify-content:flex-end; margin-top:0.5rem;">
        <button class="btn btn-primary" id="relay-done-btn" disabled style="min-width:100px; display:flex; align-items:center; justify-content:center; gap:0.5rem;">
          Finishing up...
        </button>
      </div>
    </div>

    <style>
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    </style>
  `;

  const closeBroadcastModal = showModal('Leo Mail Relay Center', progressHtml, {
    showFooter: false,
    size: 'md'
  });

  const statusEl = document.getElementById('relay-status');
  const percentEl = document.getElementById('relay-percent');
  const barEl = document.getElementById('relay-progress-bar');
  const terminalEl = document.getElementById('relay-terminal');
  const doneBtn = document.getElementById('relay-done-btn');

  const addLog = (text, type = 'info') => {
    const logDiv = document.createElement('div');
    const timestamp = new Date().toLocaleTimeString();
    let prefix = `[${timestamp}] `;
    
    if (type === 'success') {
      logDiv.style.color = '#10b981';
      prefix += '✔ ';
    } else if (type === 'error') {
      logDiv.style.color = '#ef4444';
      prefix += '✖ ';
    } else if (type === 'warn') {
      logDiv.style.color = '#f59e0b';
      prefix += '⚠ ';
    } else {
      logDiv.style.color = '#88e0ff';
    }

    logDiv.textContent = prefix + text;
    terminalEl.appendChild(logDiv);
    terminalEl.scrollTop = terminalEl.scrollHeight;
  };

  setTimeout(() => {
    addLog('Connecting to SMTP Mail Gateway [smtp.leo-district-portal.org]...', 'info');
    
    setTimeout(() => {
      addLog('SMTP Connection Established (220 ESMTP Postfix).', 'success');
      addLog('Performing TLS Handshake (ECDHE-RSA-AES128-GCM-SHA256)...', 'info');

      setTimeout(() => {
        addLog('TLS Encryption active. Authenticating sender credentials...', 'success');
        addLog('Sender identity verified: Leo District Secretariat <district@leo.org>.', 'success');
        addLog(`Preparing email payload. Target recipient count: ${recipients.length} addresses.`, 'info');
        addLog(`--------------------------------------------------`, 'info');

        let index = 0;
        const total = recipients.length;

        const sendNext = () => {
          if (index >= total) {
            statusEl.innerHTML = `Broadcast Complete!`;
            percentEl.textContent = '100%';
            barEl.style.width = '100%';
            addLog(`--------------------------------------------------`, 'info');
            addLog(`Mail relay broadcast completed successfully.`, 'success');
            addLog(`Dispatched to ${total} recipients without transmission exceptions.`, 'success');
            
            doneBtn.disabled = false;
            doneBtn.textContent = 'Finish & Save';
            doneBtn.onclick = () => {
              closeBroadcastModal();
              if (onComplete) onComplete();
            };
            return;
          }

          const r = recipients[index];
          const percent = Math.round((index / total) * 100);
          percentEl.textContent = `${percent}%`;
          barEl.style.width = `${percent}%`;

          addLog(`Sending message to ${r.name} (${r.email}) [${r.clubName.replace('Leo Club of ', '')} - ${r.role}]`, 'info');
          
          setTimeout(() => {
            addLog(`Delivered to ${r.email} [OK]`, 'success');
            index++;
            sendNext();
          }, Math.random() * 150 + 100);
        };

        sendNext();
      }, 700);
    }, 500);
  }, 300);
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

          const saveAnnouncement = () => {
            const dbVals = {
              title: vals.title,
              content: vals.content,
              priority: vals.priority,
              targetClubs: vals.targetClubs,
              createdAt: new Date().toISOString().split('T')[0],
              author: auth.currentUser?.name || 'District Admin',
              read: []
            };
            store.create('announcements', dbVals);
            showToast('success', 'Published', 'Announcement has been published.');
            render();
          };

          if (vals.broadcastEmail) {
            const recipients = getBroadcastRecipients(vals.broadcastTarget, vals.broadcastClubs);
            if (recipients.length === 0) {
              showToast('error', 'Broadcast Error', 'No recipients found for the selected broadcast option.');
              return;
            }
            close(); // Close the form modal first
            runEmailBroadcastSimulation(recipients, vals.title, saveAnnouncement);
          } else {
            saveAnnouncement();
            close();
          }
        }
      });
      bindTargetTypeToggle();
      bindBroadcastEmailToggle();
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

            const updateAnnouncement = () => {
              const dbVals = {
                title: vals.title,
                content: vals.content,
                priority: vals.priority,
                targetClubs: vals.targetClubs
              };
              store.update('announcements', ann.id, dbVals);
              showToast('success', 'Updated', 'Announcement has been updated.');
              render();
            };

            if (vals.broadcastEmail) {
              const recipients = getBroadcastRecipients(vals.broadcastTarget, vals.broadcastClubs);
              if (recipients.length === 0) {
                showToast('error', 'Broadcast Error', 'No recipients found for the selected broadcast option.');
                return;
              }
              close(); // Close the form modal first
              runEmailBroadcastSimulation(recipients, vals.title, updateAnnouncement);
            } else {
              updateAnnouncement();
              close();
            }
          }
        });
        bindTargetTypeToggle();
        bindBroadcastEmailToggle();
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
