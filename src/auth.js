// ============================================
// LEO NEXUS PORTAL — AUTHENTICATION
// Role-based access control
// ============================================

import { store } from './store.js';

const SESSION_KEY = 'leo_nexus_session';

class Auth {
  constructor() {
    this._currentUser = null;
    this._listeners = [];
    this.restore();
  }

  restore() {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (raw) {
        const session = JSON.parse(raw);
        const user = store.getById('users', session.userId);
        if (user) {
          this._currentUser = user;
        }
      }
    } catch {
      this._currentUser = null;
    }
  }

  login(email, password) {
    const users = store.getAll('users');
    const inputEmail = (email || '').trim().toLowerCase();
    const user = users.find(u => {
      const uEmail = (u.email || '').toLowerCase();
      const uAlt = (u.altEmail || '').toLowerCase();
      return (uEmail === inputEmail || (uAlt && uAlt === inputEmail)) && u.password === password;
    });

    if (!user) {
      return { success: false, error: 'Invalid email or password' };
    }

    this._currentUser = user;
    sessionStorage.setItem(SESSION_KEY, JSON.stringify({ userId: user.id }));
    this._notify();
    return { success: true, user };
  }

  logout() {
    this._currentUser = null;
    sessionStorage.removeItem(SESSION_KEY);
    this._notify();
  }

  get currentUser() {
    return this._currentUser;
  }

  get isLoggedIn() {
    return !!this._currentUser;
  }

  get isAdmin() {
    return this._currentUser?.role === 'admin';
  }

  get isDistrictAdmin() {
    return this.isAdmin || this._currentUser?.role === 'district_president' || this._currentUser?.role === 'district_admin';
  }

  get isDistrictUser() {
    return this.isAdmin || this._currentUser?.role?.startsWith('district_') || this._currentUser?.role === 'district_admin';
  }

  get isClubAdmin() {
    return this._currentUser?.role === 'club_admin' || this._currentUser?.role === 'club_president';
  }

  get isClubViewer() {
    return this._currentUser?.role === 'club_viewer';
  }

  get isClubUser() {
    return this._currentUser?.role?.startsWith('club_') && this._currentUser?.role !== 'club_member';
  }

  get isClubMember() {
    return this._currentUser?.role === 'club_member';
  }

  get userClubId() {
    return this._currentUser?.clubId;
  }

  get userClub() {
    if (!this._currentUser?.clubId) return null;
    return store.getById('clubs', this._currentUser.clubId);
  }

  // Check if user has specific permission
  can(action, resource) {
    if (!this._currentUser) return false;
    
    // Super Admin has full access to everything
    if (this._currentUser.role === 'admin') return true;

    const permissions = {
      district_president: {
        clubs: ['read'],
        users: ['read'],
        announcements: ['read'],
        events: ['read'],
        points: ['read'],
        reports: ['read', 'approve'],
        members: ['read'],
        finances: ['read'],
        projects: ['create', 'read', 'update', 'delete', 'approve'],
      },
      district_vp: {
        clubs: ['read'],
        members: ['read'],
        projects: ['read'],
        events: ['read'],
        points: ['read'],
        reports: ['read'],
      },
      district_secretary: {
        clubs: ['read'],
        users: ['read'],
        announcements: ['create', 'read', 'update', 'delete'],
        events: ['create', 'read', 'update', 'delete'],
        reports: ['read'],
        projects: ['create', 'read', 'update', 'delete'],
      },
      district_assistant_secretary: {
        clubs: ['read'],
        users: ['read'],
        announcements: ['create', 'read', 'update', 'delete'],
        events: ['create', 'read', 'update', 'delete'],
        reports: ['read'],
        projects: ['create', 'read', 'update', 'delete'],
      },
      district_membership: {
        clubs: ['read'],
        members: ['create', 'read', 'update'],
        reports: ['read'],
        announcements: ['read'],
        events: ['read'],
      },
      district_treasurer: {
        clubs: ['read'],
        users: ['read'],
        announcements: ['read'],
        events: ['read'],
        points: ['read'],
        reports: ['read'],
        members: ['read'],
        finances: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
      },
      district_assistant_treasurer: {
        clubs: ['read'],
        users: ['read'],
        announcements: ['read'],
        events: ['read'],
        points: ['read'],
        reports: ['read'],
        members: ['read'],
        finances: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
      },
      district_admin: {
        clubs: ['create', 'read', 'update', 'delete'],
        users: ['create', 'read', 'update', 'delete'],
        announcements: ['create', 'read', 'update', 'delete'],
        events: ['create', 'read', 'update', 'delete'],
        points: ['create', 'read', 'update', 'delete'],
        reports: ['read'],
        members: ['read'],
        finances: ['read'],
        projects: ['create', 'read', 'update', 'delete'],
      },
      club_president: {
        clubs: ['read', 'update'],
        members: ['create', 'read', 'update', 'delete'],
        finances: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
        announcements: ['read'],
        events: ['read', 'register'],
        points: ['read'],
      },
      club_secretary: {
        members: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
        announcements: ['read'],
        events: ['read', 'register'],
        points: ['read'],
      },
      club_treasurer: {
        finances: ['create', 'read', 'update', 'delete'],
        projects: ['read'],
        announcements: ['read'],
        events: ['read', 'register'],
        points: ['read'],
      },
      club_membership: {
        members: ['create', 'read', 'update', 'delete'],
        announcements: ['read'],
        events: ['read'],
        points: ['read'],
      },
      club_admin: {
        members: ['create', 'read', 'update', 'delete'],
        finances: ['create', 'read', 'update', 'delete'],
        projects: ['create', 'read', 'update', 'delete'],
        announcements: ['read'],
        events: ['read', 'register'],
        points: ['read'],
      },
      club_viewer: {
        members: ['read'],
        finances: ['read'],
        projects: ['read'],
        announcements: ['read'],
        events: ['read'],
        points: ['read'],
      },
      club_member: {
        announcements: ['read'],
        events: ['read', 'register'],
        points: ['read'],
        members: ['read'],
      }
    };

    const rolePerms = permissions[this._currentUser.role];
    if (!rolePerms) return false;

    const resourcePerms = rolePerms[resource];
    if (!resourcePerms) return false;

    return resourcePerms.includes(action);
  }

  onChange(callback) {
    this._listeners.push(callback);
    return () => {
      this._listeners = this._listeners.filter(cb => cb !== callback);
    };
  }

  _notify() {
    this._listeners.forEach(cb => cb(this._currentUser));
  }
}

export const auth = new Auth();
