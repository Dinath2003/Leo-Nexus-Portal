// ============================================
// LEO NEXUS PORTAL — SIDEBAR COMPONENT
// ============================================

import { auth } from '../auth.js';
import { store } from '../store.js';
import { showAccountSettingsModal } from './modal.js';

const districtMenuItems = [
  { section: 'Overview', items: [
    { icon: 'layout-dashboard', label: 'Dashboard', path: '/district/dashboard' },
  ]},
  { section: 'Calendar', items: [
    { icon: 'calendar', label: 'Calendar', path: '/calendar' },
  ]},
  { section: 'Management', items: [
    { icon: 'building-2', label: 'Clubs', path: '/district/clubs' },
    { icon: 'users', label: 'Users', path: '/district/users' },
    { icon: 'wallet', label: 'Finance (District)', path: '/district/finance' },
    { icon: 'megaphone', label: 'Announcements', path: '/district/announcements', badge: () => store.getAll('announcements').length },
    { icon: 'calendar-days', label: 'Events', path: '/district/events' },
    { icon: 'folder-kanban', label: 'Projects (District)', path: '/district/projects' },
  ]},
  { section: 'Performance', items: [
    { icon: 'trophy', label: 'Points & Criteria', path: '/district/points' },
    { icon: 'bar-chart-3', label: 'Reports', path: '/district/reports' },
  ]},
  { section: 'Info', items: [
    { icon: 'globe', label: 'District Profile', path: '/district/profile' },
    { icon: 'shield', label: 'MD Profile', path: '/district/md-profile' },
  ]}
];

const clubMenuItems = [
  { section: 'Overview', items: [
    { icon: 'layout-dashboard', label: 'Dashboard', path: '/club/dashboard' },
  ]},
  { section: 'Calendar', items: [
    { icon: 'calendar', label: 'Calendar', path: '/calendar' },
  ]},
  { section: 'Club Management', items: [
    { icon: 'user', label: 'Club Profile', path: '/club/profile' },
    { icon: 'wallet', label: 'Finance', path: '/club/finance' },
    { icon: 'users', label: 'Members', path: '/club/members' },
    { icon: 'folder-kanban', label: 'Projects', path: '/club/projects' },
  ]},
  { section: 'District', items: [
    { icon: 'megaphone', label: 'Announcements', path: '/club/announcements', badge: () => {
      const clubId = auth.userClubId;
      if (!clubId) return 0;
      const announcements = store.getClubAnnouncements(clubId);
      return announcements.filter(a => !(a.read || []).includes(clubId)).length;
    }},
    { icon: 'calendar-days', label: 'Events', path: '/club/events' },
    { icon: 'trophy', label: 'Points', path: '/club/points' },
    { icon: 'globe', label: 'District Profile', path: '/club/district-profile' },
    { icon: 'shield', label: 'MD Profile', path: '/club/md-profile' },
  ]}
];

const memberMenuItems = [
  { section: 'Overview', items: [
    { icon: 'layout-dashboard', label: 'Dashboard', path: '/member/dashboard' },
  ]},
  { section: 'Calendar', items: [
    { icon: 'calendar', label: 'Calendar', path: '/calendar' },
  ]},
  { section: 'Activities', items: [
    { icon: 'megaphone', label: 'Announcements', path: '/member/announcements', badge: () => {
      const clubId = auth.userClubId;
      if (!clubId) return 0;
      const announcements = store.getClubAnnouncements(clubId);
      return announcements.filter(a => !(a.read || []).includes(clubId)).length;
    }},
    { icon: 'calendar-days', label: 'Events & Registrations', path: '/member/events' },
  ]},
  { section: 'District Info', items: [
    { icon: 'globe', label: 'District Profile', path: '/club/district-profile' },
    { icon: 'shield', label: 'MD Profile', path: '/club/md-profile' },
  ]}
];

// Helper to get formatted role title
function getRoleLabel(role) {
  const labels = {
    admin: 'Super Admin',
    district_president: 'District President',
    district_vp: 'District Vice President',
    district_secretary: 'District Secretary',
    district_assistant_secretary: 'District Assistant Secretary',
    district_membership: 'District Membership Chairperson',
    district_admin: 'District Admin',
    district_treasurer: 'District Treasurer',
    district_assistant_treasurer: 'District Assistant Treasurer',
    club_president: 'Club President',
    club_secretary: 'Club Secretary',
    club_treasurer: 'Club Treasurer',
    club_membership: 'Club Membership Chair',
    club_admin: 'Club Admin',
    club_viewer: 'Club Viewer',
    club_member: 'Club Member'
  };
  return labels[role] || 'User';
}

export function renderSidebar() {
  const isDistrict = auth.isDistrictUser;
  const isMember = auth.isClubMember;
  
  let menuItems = clubMenuItems;
  if (isDistrict) menuItems = districtMenuItems;
  else if (isMember) menuItems = memberMenuItems;

  const currentPath = window.location.hash.slice(1) || '/login';
  const user = auth.currentUser;
  const club = auth.userClub;

  let menuHtml = '';
  menuItems.forEach(section => {
    const visibleItems = section.items.filter(item => {
      if (!user?.visibleOptions) return true;
      return user.visibleOptions.includes(item.label);
    });

    if (visibleItems.length > 0) {
      menuHtml += `<div class="sidebar-section">
        <div class="sidebar-section-label">${section.section}</div>`;
      visibleItems.forEach(item => {
        const isActive = currentPath === item.path;
        const badgeCount = item.badge ? item.badge() : 0;
        menuHtml += `
          <a href="#${item.path}" class="sidebar-link ${isActive ? 'active' : ''}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
            ${badgeCount > 0 ? `<span class="link-badge">${badgeCount}</span>` : ''}
          </a>`;
      });
      menuHtml += '</div>';
    }
  });

  let bottomNavItems = [];
  if (isDistrict) {
    bottomNavItems = [
      { icon: 'layout-dashboard', label: 'Home', path: '/district/dashboard' },
      { icon: 'building-2', label: 'Clubs', path: '/district/clubs' },
      { icon: 'wallet', label: 'Finance', path: '/district/finance' },
      { icon: 'bar-chart-3', label: 'Reports', path: '/district/reports' }
    ];
  } else if (isMember) {
    bottomNavItems = [
      { icon: 'layout-dashboard', label: 'Home', path: '/member/dashboard' },
      { icon: 'calendar-days', label: 'Events', path: '/member/events' },
      { icon: 'calendar', label: 'Calendar', path: '/calendar' },
      { icon: 'megaphone', label: 'Notices', path: '/member/announcements' }
    ];
  } else {
    bottomNavItems = [
      { icon: 'layout-dashboard', label: 'Home', path: '/club/dashboard' },
      { icon: 'users', label: 'Members', path: '/club/members' },
      { icon: 'wallet', label: 'Finance', path: '/club/finance' },
      { icon: 'trophy', label: 'Points', path: '/club/points' }
    ];
  }

  const bottomNavHtml = `
    <nav class="mobile-bottom-nav" id="mobile-bottom-nav" aria-label="Mobile Navigation">
      ${bottomNavItems.map(item => {
        const isActive = currentPath === item.path;
        return `
          <a href="#${item.path}" class="mobile-bottom-nav-item ${isActive ? 'active' : ''}">
            <i data-lucide="${item.icon}"></i>
            <span>${item.label}</span>
          </a>
        `;
      }).join('')}
      <button class="mobile-bottom-nav-item" id="mobile-bottom-menu-btn" type="button" aria-label="Open Full Menu">
        <i data-lucide="menu"></i>
        <span>Menu</span>
      </button>
    </nav>
    <button class="scroll-to-top-btn" id="scroll-to-top-btn" aria-label="Scroll to top" title="Scroll to top">
      <i data-lucide="chevron-up" style="width:20px;height:20px;"></i>
    </button>
  `;

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-header">
        <div class="sidebar-logo">
          <i data-lucide="anchor"></i>
        </div>
        <div class="sidebar-brand">
          <span class="brand-name">Leo Nexus</span>
          <span class="brand-role">${isDistrict ? 'District Portal' : (club?.name?.replace('Leo Club of ', '') || 'Club Portal')}</span>
        </div>
        <button class="btn btn-icon btn-ghost mobile-sidebar-close" id="mobile-sidebar-close-btn" aria-label="Close sidebar">
          <i data-lucide="x" style="width:18px;height:18px;"></i>
        </button>
      </div>
      <nav class="sidebar-nav">
        ${menuHtml}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" id="sidebar-user-btn">
          <div class="avatar">${user?.avatar || 'U'}</div>
          <div class="user-info">
            <div class="user-name">${user?.name || 'User'}</div>
            <div class="user-role">${getRoleLabel(user?.role)}</div>
          </div>
          <i data-lucide="log-out" style="width:16px;height:16px;color:var(--color-text-muted);cursor:pointer"></i>
        </div>
      </div>
    </aside>
    <div class="sidebar-backdrop" id="sidebar-backdrop"></div>
    ${bottomNavHtml}
  `;
}

export function initSidebar() {
  const sidebar = document.getElementById('sidebar');
  const backdrop = document.getElementById('sidebar-backdrop');
  const closeBtn = document.getElementById('mobile-sidebar-close-btn');

  const closeSidebar = () => {
    sidebar?.classList.remove('open');
    backdrop?.classList.remove('show');
  };

  closeBtn?.addEventListener('click', closeSidebar);
  backdrop?.addEventListener('click', closeSidebar);

  // Close sidebar on link click on touch / mobile view
  document.querySelectorAll('.sidebar-link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) {
        closeSidebar();
      }
    });
  });

  // Mobile bottom menu button
  const bottomMenuBtn = document.getElementById('mobile-bottom-menu-btn');
  bottomMenuBtn?.addEventListener('click', () => {
    sidebar?.classList.toggle('open');
    backdrop?.classList.toggle('show');
  });

  const logoutBtn = document.getElementById('sidebar-user-btn');
  if (logoutBtn) {
    logoutBtn.querySelector('[data-lucide="log-out"]')?.addEventListener('click', (e) => {
      e.stopPropagation();
      auth.logout();
      window.location.hash = '/login';
    });

    logoutBtn.addEventListener('click', () => {
      showAccountSettingsModal();
    });
  }

  // Floating scroll-to-top button
  const scrollBtn = document.getElementById('scroll-to-top-btn');
  if (scrollBtn) {
    const handleScroll = () => {
      if (window.scrollY > 280) {
        scrollBtn.classList.add('visible');
      } else {
        scrollBtn.classList.remove('visible');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

export function isPathAllowed(path, user) {
  if (!user) return false;
  if (!user.visibleOptions) return true;

  // Always allow home/dashboard routes, calendar, login, and profiles to prevent redirect loops
  if (['/district/dashboard', '/club/dashboard', '/member/dashboard', '/calendar', '/login', '/district/profile', '/club/district-profile', '/member/district-profile', '/district/md-profile', '/club/md-profile', '/member/md-profile'].includes(path)) {
    return true;
  }

  const isDistrict = user.role === 'admin' || user.role?.startsWith('district_');
  const isMember = user.role === 'club_member';
  
  let menuItems = clubMenuItems;
  if (isDistrict) menuItems = districtMenuItems;
  else if (isMember) menuItems = memberMenuItems;

  // Find the menu item with the matching path
  let foundItem = null;
  for (const section of menuItems) {
    const item = section.items.find(i => i.path === path);
    if (item) {
      foundItem = item;
      break;
    }
  }

  // If the path is not in the menu items, allow it
  if (!foundItem) return true;

  // Otherwise check if the item label is in the user's visibleOptions
  return user.visibleOptions.includes(foundItem.label);
}
