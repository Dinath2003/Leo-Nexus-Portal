// ============================================
// LEO NEXUS PORTAL — CLUB ANNOUNCEMENTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';

export function renderClubAnnouncements() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;

  function render() {
    const announcements = store.getClubAnnouncements(clubId);
    const sorted = [...announcements].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    const unreadCount = sorted.filter(a => !(a.read || []).includes(clubId)).length;

    const priorityConfig = {
      urgent: { color: '#ef4444', bg: 'rgba(239,68,68,0.1)', border: 'rgba(239,68,68,0.3)', badge: 'badge-danger', icon: 'alert-triangle', label: 'Urgent' },
      important: { color: '#f59e0b', bg: 'rgba(245,158,11,0.1)', border: 'rgba(245,158,11,0.3)', badge: 'badge-warning', icon: 'alert-circle', label: 'Important' },
      normal: { color: '#3d8bff', bg: 'rgba(61,139,255,0.1)', border: 'rgba(61,139,255,0.3)', badge: 'badge-primary', icon: 'info', label: 'Normal' },
    };

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Announcements', ['Club', 'Announcements'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">DISTRICT BULLETINS</span>
                <h1 style="margin:0;">District Announcements</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Stay updated with the latest from the district</p>
              </div>
              <div class="page-header-actions">
                ${unreadCount > 0 ? `
                  <button class="btn btn-secondary" id="mark-all-read-btn">
                    <i data-lucide="check-check" style="width:16px;height:16px"></i> Mark All as Read (${unreadCount})
                  </button>
                ` : `
                  <span class="badge badge-success" style="padding:8px 16px;">
                    <i data-lucide="check-check" style="width:14px;height:14px;vertical-align:middle;margin-right:4px;"></i> All Read
                  </span>
                `}
              </div>
            </div>

            <!-- Summary Bar -->
            <div class="stagger-enter" style="animation-delay:0.1s;display:flex;gap:12px;margin-bottom:24px;flex-wrap:wrap;">
              <div style="display:flex;align-items:center;gap:8px;padding:10px 18px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px;">
                <i data-lucide="mail" style="width:16px;height:16px;color:var(--color-text-muted);"></i>
                <span style="font-size:13px;color:var(--color-text-secondary);">Total: <strong>${sorted.length}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;padding:10px 18px;background:var(--color-surface);border:1px solid var(--color-border);border-radius:10px;">
                <span style="width:8px;height:8px;border-radius:50%;background:#00d4ff;"></span>
                <span style="font-size:13px;color:var(--color-text-secondary);">Unread: <strong>${unreadCount}</strong></span>
              </div>
              <div style="display:flex;align-items:center;gap:8px;padding:10px 18px;background:rgba(239,68,68,0.06);border:1px solid rgba(239,68,68,0.15);border-radius:10px;">
                <i data-lucide="alert-triangle" style="width:14px;height:14px;color:#ef4444;"></i>
                <span style="font-size:13px;color:var(--color-text-secondary);">Urgent: <strong>${sorted.filter(a => a.priority === 'urgent').length}</strong></span>
              </div>
            </div>

            <!-- Announcements List -->
            <div class="stagger-enter" style="animation-delay:0.2s;display:flex;flex-direction:column;gap:16px;">
              ${sorted.length === 0 ? `
                <div class="card" style="text-align:center;padding:60px 20px;">
                  <i data-lucide="megaphone" style="width:48px;height:48px;color:var(--color-text-muted);margin-bottom:16px;"></i>
                  <h3 style="color:var(--color-text-secondary);">No Announcements</h3>
                  <p style="color:var(--color-text-muted);margin-top:8px;">New announcements from the district will appear here.</p>
                </div>
              ` : sorted.map(a => {
                const isRead = (a.read || []).includes(clubId);
                const cfg = priorityConfig[a.priority] || priorityConfig.normal;
                return `
                  <div class="card hover-lift water-effect" style="border-left:4px solid ${cfg.color};${!isRead ? 'background:' + cfg.bg + ';' : ''}position:relative;overflow:hidden;">
                    ${!isRead ? `<div style="position:absolute;top:12px;right:12px;width:10px;height:10px;border-radius:50%;background:#00d4ff;box-shadow:0 0 8px rgba(0,212,255,0.5);"></div>` : ''}
                    <div class="card-body" style="padding:20px 24px;">
                      <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:16px;margin-bottom:12px;">
                        <div style="display:flex;align-items:center;gap:10px;">
                          <div style="width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;background:${cfg.bg};color:${cfg.color};">
                            <i data-lucide="${cfg.icon}" style="width:18px;height:18px;"></i>
                          </div>
                          <div>
                            <h3 style="font-size:16px;color:var(--color-text-primary);margin:0;font-weight:600;">${a.title}</h3>
                            <div style="display:flex;align-items:center;gap:8px;margin-top:4px;">
                              <span class="badge ${cfg.badge}" style="font-size:10px;">${cfg.label}</span>
                              <span style="font-size:12px;color:var(--color-text-muted);">by ${a.author}</span>
                            </div>
                          </div>
                        </div>
                        <div style="text-align:right;flex-shrink:0;">
                          <div style="font-size:12px;color:var(--color-text-muted);">${new Date(a.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                          ${isRead
                            ? '<span style="font-size:11px;color:#14b8a6;display:flex;align-items:center;gap:4px;justify-content:flex-end;margin-top:4px;"><i data-lucide="check-check" style="width:12px;height:12px;"></i> Read</span>'
                            : `<button class="btn btn-ghost btn-sm mark-read" data-id="${a.id}" style="margin-top:4px;font-size:11px;padding:4px 10px;">Mark Read</button>`
                          }
                        </div>
                      </div>
                      <p style="font-size:14px;color:var(--color-text-secondary);line-height:1.7;margin:0;">${a.content}</p>
                      ${a.targetClubs !== 'all' ? `
                        <div style="margin-top:12px;display:flex;align-items:center;gap:6px;">
                          <i data-lucide="target" style="width:12px;height:12px;color:var(--color-text-muted);"></i>
                          <span style="font-size:11px;color:var(--color-text-muted);">Targeted announcement</span>
                        </div>
                      ` : `
                        <div style="margin-top:12px;display:flex;align-items:center;gap:6px;">
                          <i data-lucide="globe" style="width:12px;height:12px;color:var(--color-text-muted);"></i>
                          <span style="font-size:11px;color:var(--color-text-muted);">All clubs</span>
                        </div>
                      `}
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
    // Mark single announcement as read
    document.querySelectorAll('.mark-read').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const announcement = store.getById('announcements', btn.dataset.id);
        if (!announcement) return;
        const readArr = [...(announcement.read || [])];
        if (!readArr.includes(clubId)) {
          readArr.push(clubId);
          store.update('announcements', announcement.id, { read: readArr });
          showToast('info', 'Marked as Read', 'Announcement marked as read.');
          render();
        }
      });
    });

    // Mark all as read
    document.getElementById('mark-all-read-btn')?.addEventListener('click', () => {
      const announcements = store.getClubAnnouncements(clubId);
      let updated = 0;
      announcements.forEach(a => {
        const readArr = [...(a.read || [])];
        if (!readArr.includes(clubId)) {
          readArr.push(clubId);
          store.update('announcements', a.id, { read: readArr });
          updated++;
        }
      });
      showToast('success', 'All Read', `${updated} announcement${updated !== 1 ? 's' : ''} marked as read.`);
      render();
    });
  }

  render();
}
