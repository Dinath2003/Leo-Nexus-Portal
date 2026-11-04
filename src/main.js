// ============================================
// LEO NEXUS PORTAL — MAIN ENTRY POINT
// App bootstrap & route registration
// ============================================

import { router } from './router.js';
import { auth } from './auth.js';
import { renderLogin } from './pages/login.js';
import { renderDistrictDashboard } from './pages/district/dashboard.js';
import { renderDistrictClubs } from './pages/district/clubs.js';
import { renderDistrictUsers } from './pages/district/users.js';
import { renderDistrictAnnouncements } from './pages/district/announcements.js';
import { renderDistrictEvents } from './pages/district/events.js';
import { renderDistrictPoints } from './pages/district/points.js';
import { renderDistrictReports } from './pages/district/reports.js';
import { renderDistrictProjects } from './pages/district/projects.js';
import { renderClubDashboard } from './pages/club/dashboard.js';
import { renderClubFinance } from './pages/club/finance.js';
import { renderClubMembers } from './pages/club/members.js';
import { renderClubProjects } from './pages/club/projects.js';
import { renderClubAnnouncements } from './pages/club/announcements.js';
import { renderClubEvents } from './pages/club/events.js';
import { renderClubPoints } from './pages/club/points.js';

// New Pages
import { renderClubProfile } from './pages/club/profile.js';
import { renderDistrictFinance } from './pages/district/finance.js';
import { renderDistrictProfile, renderMDProfile } from './pages/profiles.js?v=20261103_v14';
import { renderMemberDashboard } from './pages/member/dashboard.js';
import { renderMemberEvents } from './pages/member/events.js';
import { renderCalendar } from './pages/calendar.js';
import { initHeader } from './components/header.js';
import { initTheme, initCardTilt } from './components/theme.js';

// Remove default Vite styles
const defaultStyles = document.querySelector('link[href="/style.css"]');
if (defaultStyles) defaultStyles.remove();

// ---------- Register Routes ----------
// Public
router.register('/login', { handler: renderLogin, guestOnly: true });

// District routes
router.register('/district/dashboard', { handler: renderDistrictDashboard, requireAuth: true, requireDistrict: true });
router.register('/district/clubs', { handler: renderDistrictClubs, requireAuth: true, requireDistrict: true });
router.register('/district/users', { handler: renderDistrictUsers, requireAuth: true, requireDistrict: true });
router.register('/district/announcements', { handler: renderDistrictAnnouncements, requireAuth: true, requireDistrict: true });
router.register('/district/events', { handler: renderDistrictEvents, requireAuth: true, requireDistrict: true });
router.register('/district/projects', { handler: renderDistrictProjects, requireAuth: true, requireDistrict: true });
router.register('/district/points', { handler: renderDistrictPoints, requireAuth: true, requireDistrict: true });
router.register('/district/reports', { handler: renderDistrictReports, requireAuth: true, requireDistrict: true });
router.register('/district/finance', { handler: renderDistrictFinance, requireAuth: true, requireDistrict: true });
router.register('/district/profile', { handler: renderDistrictProfile });
router.register('/district/md-profile', { handler: renderMDProfile });

// Club routes
router.register('/club/dashboard', { handler: renderClubDashboard, requireAuth: true, requireClub: true });
router.register('/club/profile', { handler: renderClubProfile, requireAuth: true, requireClub: true });
router.register('/club/finance', { handler: renderClubFinance, requireAuth: true, requireClub: true });
router.register('/club/members', { handler: renderClubMembers, requireAuth: true, requireClub: true });
router.register('/club/projects', { handler: renderClubProjects, requireAuth: true, requireClub: true });
router.register('/club/announcements', { handler: renderClubAnnouncements, requireAuth: true, requireClub: true });
router.register('/club/events', { handler: renderClubEvents, requireAuth: true, requireClub: true });
router.register('/club/points', { handler: renderClubPoints, requireAuth: true, requireClub: true });
router.register('/club/district-profile', { handler: renderDistrictProfile });
router.register('/club/md-profile', { handler: renderMDProfile });

// Member routes
router.register('/member/dashboard', { handler: renderMemberDashboard, requireAuth: true, requireMember: true });
router.register('/member/events', { handler: renderMemberEvents, requireAuth: true, requireMember: true });
router.register('/member/announcements', { handler: renderClubAnnouncements, requireAuth: true, requireMember: true });
router.register('/member/district-profile', { handler: renderDistrictProfile });
router.register('/member/md-profile', { handler: renderMDProfile });

// Shared routes
router.register('/calendar', { handler: renderCalendar, requireAuth: true });

// ---------- Default route ----------
if (!window.location.hash) {
  if (auth.isLoggedIn) {
    if (auth.isDistrictUser) {
      window.location.hash = '/district/dashboard';
    } else if (auth.isClubMember) {
      window.location.hash = '/member/dashboard';
    } else {
      window.location.hash = '/club/dashboard';
    }
  } else {
    window.location.hash = '/login';
  }
}

// ---------- Initialize ----------
initTheme();
router.resolve();

// Global 3D card tilt — attaches to all .card elements (current + future)
initCardTilt();

console.log('%c🌊 Leo Nexus Portal', 'font-size: 20px; color: #00d4ff; font-weight: bold;');
console.log('%cDistrict & Club Management System', 'font-size: 12px; color: #9aa5ce;');
