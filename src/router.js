// ============================================
// LEO NEXUS PORTAL — ROUTER
// Hash-based SPA router with guards
// ============================================

import { auth } from './auth.js';

class Router {
  constructor() {
    this.routes = {};
    this.currentRoute = null;
    this.currentCleanup = null;

    window.addEventListener('hashchange', () => this.resolve());
    window.addEventListener('load', () => this.resolve());
  }

  register(path, options = {}) {
    this.routes[path] = options;
  }

  navigate(path) {
    window.location.hash = path;
  }

  resolve() {
    const hash = window.location.hash.slice(1) || '/login';
    const route = this.findRoute(hash);

    if (!route) {
      this.navigate('/login');
      return;
    }

    // Auth guards
    if (route.options.requireAuth && !auth.isLoggedIn) {
      this.navigate('/login');
      return;
    }

    if (route.options.requireAdmin && !auth.isAdmin) {
      this.navigate('/login');
      return;
    }

    if (route.options.requireDistrict && !auth.isDistrictUser) {
      if (auth.isClubUser) this.navigate('/club/dashboard');
      else if (auth.isClubMember) this.navigate('/member/dashboard');
      else this.navigate('/login');
      return;
    }

    if (route.options.requireClub && !auth.isClubUser) {
      if (auth.isDistrictUser) this.navigate('/district/dashboard');
      else if (auth.isClubMember) this.navigate('/member/dashboard');
      else this.navigate('/login');
      return;
    }

    if (route.options.requireMember && !auth.isClubMember) {
      if (auth.isDistrictUser) this.navigate('/district/dashboard');
      else if (auth.isClubUser) this.navigate('/club/dashboard');
      else this.navigate('/login');
      return;
    }

    if (route.options.guestOnly && auth.isLoggedIn) {
      if (auth.isDistrictUser) this.navigate('/district/dashboard');
      else if (auth.isClubUser) this.navigate('/club/dashboard');
      else if (auth.isClubMember) this.navigate('/member/dashboard');
      return;
    }

    // Cleanup previous route
    if (this.currentCleanup) {
      this.currentCleanup();
      this.currentCleanup = null;
    }

    this.currentRoute = hash;
    const cleanup = route.options.handler(route.params);
    if (typeof cleanup === 'function') {
      this.currentCleanup = cleanup;
    }
  }

  findRoute(hash) {
    // Exact match
    if (this.routes[hash]) {
      return { options: this.routes[hash], params: {} };
    }

    // Pattern match (e.g., /club/:id)
    for (const [path, options] of Object.entries(this.routes)) {
      const paramNames = [];
      const regexStr = path.replace(/:([^/]+)/g, (_, name) => {
        paramNames.push(name);
        return '([^/]+)';
      });
      const regex = new RegExp(`^${regexStr}$`);
      const match = hash.match(regex);

      if (match) {
        const params = {};
        paramNames.forEach((name, i) => {
          params[name] = match[i + 1];
        });
        return { options, params };
      }
    }

    return null;
  }

  getCurrentPath() {
    return window.location.hash.slice(1) || '/login';
  }
}

export const router = new Router();
