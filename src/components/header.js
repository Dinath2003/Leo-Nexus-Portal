// ============================================
// LEO NEXUS PORTAL — HEADER COMPONENT
// ============================================

import { auth } from '../auth.js';
import { store } from '../store.js';
import { initSearch } from './search.js';

export function renderHeader(pageTitle, breadcrumbs = []) {
  const user = auth.currentUser;
  const unreadCount = auth.isClubUser
    ? store.getClubAnnouncements(auth.userClubId).filter(a => !(a.read || []).includes(auth.userClubId)).length
    : 0;

  const breadcrumbHtml = breadcrumbs.length > 0
    ? breadcrumbs.map((b, i) =>
        i < breadcrumbs.length - 1
          ? `<span>${b}</span><span class="separator">/</span>`
          : `<span class="current">${b}</span>`
      ).join('')
    : `<span class="current">${pageTitle}</span>`;

  let rootLabel = 'Club';
  if (auth.isDistrictUser) rootLabel = 'District';
  else if (auth.isClubMember) rootLabel = 'Member';

  return `
    <header class="top-header">
      <div class="header-left">
        <button class="btn btn-icon btn-ghost mobile-menu-toggle" id="mobile-menu-btn" aria-label="Toggle menu">
          <i data-lucide="menu" style="width:20px;height:20px"></i>
        </button>
        <div class="breadcrumb">
          <span>${rootLabel}</span>
          <span class="separator">/</span>
          ${breadcrumbHtml}
        </div>
      </div>
      <div class="header-right">
        <div class="search-bar" style="max-width:240px">
          <i data-lucide="search" class="search-icon"></i>
          <input type="text" placeholder="Search..." id="global-search" />
        </div>
        <div class="header-notification">
          <button class="btn btn-icon btn-ghost" aria-label="Notifications">
            <i data-lucide="bell" style="width:18px;height:18px"></i>
          </button>
          ${unreadCount > 0 ? '<span class="notif-badge"></span>' : ''}
        </div>
        <div class="header-settings">
          <button class="btn btn-icon btn-ghost" id="theme-control-btn" aria-label="Theme Settings" title="Theme Settings">
            <i data-lucide="settings" style="width:18px;height:18px"></i>
          </button>
        </div>
        <div class="avatar">${user?.avatar || 'U'}</div>
      </div>
    </header>
  `;
}

export function initHeader() {
  const mobileBtn = document.getElementById('mobile-menu-btn');
  if (mobileBtn) {
    mobileBtn.addEventListener('click', () => {
      const sidebar = document.getElementById('sidebar');
      const backdrop = document.getElementById('sidebar-backdrop');
      sidebar?.classList.toggle('open');
      backdrop?.classList.toggle('show');
    });
  }

  // Initialize global search key listeners
  initSearch();
}
