// ============================================
// LEO NEXUS PORTAL — GLOBAL SEARCH COMPONENT
// ============================================

import { store } from '../store.js';
import { showModal } from './modal.js';
import { auth } from '../auth.js';

export function initSearch() {
  const searchInput = document.getElementById('global-search');
  if (!searchInput) return;

  // Keypress event for enter key
  searchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const query = searchInput.value.trim();
      if (!query) return;
      performGlobalSearch(query);
      searchInput.value = ''; // Clear input
    }
  });
}

function performGlobalSearch(query) {
  const lowercaseQuery = query.toLowerCase();
  
  // 1. Search Clubs (if admin/district)
  const isDistrict = auth.isDistrictUser;
  const clubs = store.getAll('clubs').filter(c => 
    c.name.toLowerCase().includes(lowercaseQuery) || 
    c.code.toLowerCase().includes(lowercaseQuery) ||
    c.president.toLowerCase().includes(lowercaseQuery) ||
    c.zone.toLowerCase().includes(lowercaseQuery)
  );

  // 2. Search Members (own club if club user/member, all if district)
  const currentClubId = auth.userClubId;
  const allMembers = store.getAll('members');
  const members = allMembers.filter(m => {
    const matchesQuery = m.name.toLowerCase().includes(lowercaseQuery) ||
                         m.email.toLowerCase().includes(lowercaseQuery) ||
                         m.role.toLowerCase().includes(lowercaseQuery);
    if (!matchesQuery) return false;
    return isDistrict ? true : m.clubId === currentClubId;
  });

  // 3. Search Projects (own club if club/member, all if district)
  const projects = store.getAll('projects').filter(p => {
    const matchesQuery = p.name.toLowerCase().includes(lowercaseQuery) ||
                         p.category.toLowerCase().includes(lowercaseQuery) ||
                         p.description.toLowerCase().includes(lowercaseQuery);
    if (!matchesQuery) return false;
    return isDistrict ? true : p.clubId === currentClubId;
  });

  // 4. Search Events (visible events)
  const events = store.getAll('events').filter(ev => {
    const matchesQuery = ev.name.toLowerCase().includes(lowercaseQuery) ||
                         ev.venue.toLowerCase().includes(lowercaseQuery) ||
                         (ev.description || '').toLowerCase().includes(lowercaseQuery);
    if (!matchesQuery) return false;
    
    if (isDistrict) return true;
    
    // For members, event must be visible in clubEventSettings
    if (auth.isClubMember) {
      const settings = store.getAll('clubEventSettings').find(s => s.clubId === currentClubId && s.eventId === ev.id);
      return settings?.visibleToMembers === true;
    }
    return true; // Club officers can see all district events
  });

  // 5. Search Announcements (visible)
  const announcements = store.getAll('announcements').filter(a => {
    const matchesQuery = a.title.toLowerCase().includes(lowercaseQuery) ||
                         a.content.toLowerCase().includes(lowercaseQuery);
    if (!matchesQuery) return false;

    if (isDistrict) return true;
    return a.targetClubs === 'all' || (Array.isArray(a.targetClubs) && a.targetClubs.includes(currentClubId));
  });

  // 6. Search Financials (own club if club/member, district financials if district)
  const finances = store.getAll('finances').filter(f => {
    const matchesQuery = f.description.toLowerCase().includes(lowercaseQuery) ||
                         f.category.toLowerCase().includes(lowercaseQuery) ||
                         (f.reference || '').toLowerCase().includes(lowercaseQuery);
    if (!matchesQuery) return false;

    if (isDistrict) {
      return f.clubId === 'district'; // District users search district-level ledger
    }
    return f.clubId === currentClubId;
  });

  // Construct Results HTML
  const totalResults = clubs.length + members.length + projects.length + events.length + announcements.length + finances.length;

  let resultsHtml = `
    <div class="search-modal-results" style="max-height: 480px; overflow-y: auto; padding: 4px;">
      <div style="font-size: 13px; color: var(--color-text-muted); margin-bottom: 16px;">
        Found ${totalResults} match(es) for "<strong>${query}</strong>"
      </div>
  `;

  if (totalResults === 0) {
    resultsHtml += `
      <div style="text-align: center; padding: 40px 0;">
        <i data-lucide="search-code" style="width: 48px; height: 48px; color: var(--color-text-muted); margin-bottom: 12px; stroke-width: 1.5;"></i>
        <h4 style="margin: 0; color: var(--color-text-primary);">No matches found</h4>
        <p style="margin: 4px 0 0; font-size: 13px; color: var(--color-text-muted);">Try searching for alternative keywords.</p>
      </div>
    `;
  } else {
    // Clubs section
    if (clubs.length > 0) {
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-primary); letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="building-2" style="width: 12px; height: 12px;"></i> Clubs (${clubs.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${clubs.map(c => `
              <a href="#/district/clubs" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${c.name}</div>
                <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">Code: ${c.code} | Region: ${c.region} | President: ${c.president}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Members section
    if (members.length > 0) {
      const memberPath = isDistrict ? '#/district/clubs' : '#/club/members';
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-cyan); letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="users" style="width: 12px; height: 12px;"></i> Members (${members.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${members.map(m => `
              <a href="${memberPath}" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${m.name}</div>
                <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">Role: ${m.role} | Email: ${m.email} | Status: ${m.status}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Projects section
    if (projects.length > 0) {
      const projectPath = isDistrict ? '#/district/reports' : '#/club/projects';
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: var(--color-teal); letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="folder-kanban" style="width: 12px; height: 12px;"></i> Projects & Reports (${projects.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${projects.map(p => `
              <a href="${projectPath}" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${p.name}</div>
                <div style="font-size: 11px; color: var(--color-text-secondary); margin-top: 2px; line-height: 1.4;">${p.description}</div>
                <div style="font-size: 10px; color: var(--color-text-muted); margin-top: 4px;">Category: ${p.category} | Status: ${p.status}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Events section
    if (events.length > 0) {
      const eventPath = isDistrict ? '#/district/events' : (auth.isClubMember ? '#/member/events' : '#/club/events');
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #8b5cf6; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="calendar-days" style="width: 12px; height: 12px;"></i> Events (${events.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${events.map(ev => `
              <a href="${eventPath}" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${ev.name}</div>
                <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">Venue: ${ev.venue} | Date: ${ev.date} | Status: ${ev.status}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Announcements section
    if (announcements.length > 0) {
      const annPath = isDistrict ? '#/district/announcements' : (auth.isClubMember ? '#/member/announcements' : '#/club/announcements');
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #ef4444; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="megaphone" style="width: 12px; height: 12px;"></i> Announcements (${announcements.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${announcements.map(a => `
              <a href="${annPath}" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${a.title}</div>
                <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">Author: ${a.author} | Priority: ${a.priority}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }

    // Finances section
    if (finances.length > 0) {
      const financePath = isDistrict ? '#/district/finance' : '#/club/finance';
      resultsHtml += `
        <div style="margin-bottom: var(--space-4);">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #f59e0b; letter-spacing: 0.5px; margin-bottom: 8px; display: flex; align-items: center; gap: 6px;">
            <i data-lucide="wallet" style="width: 12px; height: 12px;"></i> Transactions & Wallet (${finances.length})
          </div>
          <div style="display: flex; flex-direction: column; gap: 6px;">
            ${finances.map(f => `
              <a href="${financePath}" onclick="window.lucideModalClose && window.lucideModalClose()" style="display: block; padding: 10px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 8px; text-decoration: none; transition: background 0.2s;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span style="font-size: 13px; font-weight: 600; color: var(--color-text-primary);">${f.description}</span>
                  <span style="font-size: 12px; font-weight: 700; color: ${f.type === 'income' ? '#14b8a6' : '#ef4444'}">${f.type === 'income' ? '+' : '-'} Rs. ${f.amount.toLocaleString()}</span>
                </div>
                <div style="font-size: 11px; color: var(--color-text-muted); margin-top: 2px;">Category: ${f.category} | Ref: ${f.reference || 'N/A'} | Date: ${f.date}</div>
              </a>
            `).join('')}
          </div>
        </div>
      `;
    }
  }

  resultsHtml += `</div>`;

  // Display modal
  showModal(`Global Search Results`, resultsHtml, {
    showFooter: false,
    size: 'lg'
  });

  // Wire closing utility inside window
  window.lucideModalClose = () => {
    const modalEl = document.getElementById('modal-container');
    if (modalEl) modalEl.innerHTML = '';
  };

  lucide.createIcons();
}
