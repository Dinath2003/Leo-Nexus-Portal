// ============================================
// LEO NEXUS PORTAL — DISTRICT EVENTS MANAGEMENT
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { renderTable } from '../../components/table.js';

function getEventFormHtml(event = null) {
  return `
    <form id="event-form">
      <div class="form-group">
        <label class="form-label">Event Name *</label>
        <input type="text" class="form-input" id="evt-name" value="${event?.name || ''}" placeholder="e.g. Annual District Convention 2026" required />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Start Date *</label>
          <input type="date" class="form-input" id="evt-date" value="${event?.date || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">End Date *</label>
          <input type="date" class="form-input" id="evt-endDate" value="${event?.endDate || ''}" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Venue *</label>
          <input type="text" class="form-input" id="evt-venue" value="${event?.venue || ''}" placeholder="Event location" required />
        </div>
        <div class="form-group">
          <label class="form-label">Capacity</label>
          <input type="number" class="form-input" id="evt-capacity" value="${event?.capacity || 100}" placeholder="Max participants" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Registration Deadline *</label>
          <input type="date" class="form-input" id="evt-deadline" value="${event?.registrationDeadline || ''}" required />
        </div>
        <div class="form-group">
          <label class="form-label">Registration Fee (LKR) *</label>
          <input type="number" class="form-input" id="evt-fee" value="${event?.fee || 1000}" min="0" required />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Event Categories (Comma separated)</label>
          <input type="text" class="form-input" id="evt-category" value="${event?.category || 'General, Delegate, Officer'}" placeholder="e.g. Delegate, Alternate, Guest" />
        </div>
        <div class="form-group">
          <label class="form-label">Eligibility Requirements</label>
          <input type="text" class="form-input" id="evt-eligibility" value="${event?.eligibility || 'All Active Members'}" placeholder="e.g. All Active Members" />
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Required Form Fields (Comma separated)</label>
        <input type="text" class="form-input" id="evt-requiredFields" value="${event?.requiredFields || 'Membership Number, Contact Number'}" placeholder="e.g. Special Requirements, T-Shirt Size" />
      </div>
      <div class="form-group">
        <label class="form-label">Payment Instructions (To Clubs & District)</label>
        <textarea class="form-textarea" id="evt-paymentInstructions" rows="2" placeholder="e.g. Transfer to District Account: Bank of Ceylon A/C 987654321">${event?.paymentInstructions || 'Please transfer the consolidated fee to BOC A/C 123456789 (District 306B2)'}</textarea>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Status</label>
          <select class="form-select" id="evt-status">
            <option value="upcoming" ${event?.status === 'upcoming' ? 'selected' : ''}>Upcoming</option>
            <option value="open" ${event?.status === 'open' ? 'selected' : ''}>Open</option>
            <option value="closed" ${event?.status === 'closed' ? 'selected' : ''}>Closed</option>
            <option value="completed" ${event?.status === 'completed' ? 'selected' : ''}>Completed</option>
          </select>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea class="form-textarea" id="evt-description" rows="3" placeholder="Event description...">${event?.description || ''}</textarea>
      </div>
    </form>
  `;
}

function getEventFormValues() {
  return {
    name: document.getElementById('evt-name')?.value?.trim(),
    date: document.getElementById('evt-date')?.value,
    endDate: document.getElementById('evt-endDate')?.value,
    venue: document.getElementById('evt-venue')?.value?.trim(),
    capacity: parseInt(document.getElementById('evt-capacity')?.value) || 100,
    registrationDeadline: document.getElementById('evt-deadline')?.value,
    fee: parseFloat(document.getElementById('evt-fee')?.value) || 0,
    category: document.getElementById('evt-category')?.value?.trim(),
    eligibility: document.getElementById('evt-eligibility')?.value?.trim(),
    requiredFields: document.getElementById('evt-requiredFields')?.value?.trim(),
    paymentInstructions: document.getElementById('evt-paymentInstructions')?.value?.trim(),
    description: document.getElementById('evt-description')?.value?.trim(),
    status: document.getElementById('evt-status')?.value,
  };
}

const statusConfig = {
  open: { class: 'badge-success', icon: 'check-circle' },
  upcoming: { class: 'badge-warning', icon: 'clock' },
  closed: { class: 'badge-danger', icon: 'x-circle' },
  completed: { class: 'badge-primary', icon: 'check-circle' },
};

export function renderDistrictEvents() {
  const app = document.getElementById('app');

  function render(filterStatus = '') {
    let events = store.getAll('events')
      .sort((a, b) => new Date(a.date) - new Date(b.date));

    if (filterStatus) {
      events = events.filter(e => e.status === filterStatus);
    }

    const allEvents = store.getAll('events');
    const memberPayments = store.getAll('memberPayments');
    const clubPayments = store.getAll('clubPayments');

    // Calculate dynamic stats
    const totalEvents = allEvents.length;
    const openEvents = allEvents.filter(e => e.status === 'open').length;
    
    // Total member registrations across all events
    const allRegistrations = memberPayments.length;
    // Dues collected by clubs
    const totalDuesCollected = memberPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Events', ['Management', 'Events'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1 style="margin:0;">Events Management</h1>
                <p style="margin:0.25rem 0 0; color:var(--color-text-secondary);">Manage district events and review club payments</p>
              </div>
              <div class="page-header-actions">
                <button class="btn btn-primary" id="add-event-btn">
                  <i data-lucide="calendar-plus" style="width:16px;height:16px"></i> Create Event
                </button>
              </div>
            </div>

            <!-- Stats Grid -->
            <div class="stats-grid stagger-enter" style="margin-top:1rem;">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);"><i data-lucide="calendar-days" style="color:#0066ff"></i></div>
                <div class="stat-value">${totalEvents}</div>
                <div class="stat-label">Total Events</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);"><i data-lucide="door-open" style="color:#14b8a6"></i></div>
                <div class="stat-value">${openEvents}</div>
                <div class="stat-label">Open Events</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(245,158,11,0.12);"><i data-lucide="users" style="color:#f59e0b"></i></div>
                <div class="stat-value">${allRegistrations}</div>
                <div class="stat-label">Registrations</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,212,255,0.12);"><i data-lucide="wallet" style="color:#00d4ff"></i></div>
                <div class="stat-value">Rs. ${totalDuesCollected.toLocaleString()}</div>
                <div class="stat-label">Club Dues Collected</div>
              </div>
            </div>

            <!-- Filter Toolbar -->
            <div class="toolbar stagger-enter" style="margin-top:1.5rem;">
              <div class="toolbar-left">
                <span style="font-size:0.85rem; color:var(--color-text-secondary);">Showing ${events.length} events</span>
              </div>
              <div class="toolbar-right">
                <select class="form-select" id="filter-status" style="min-width:150px;">
                  <option value="">All Status</option>
                  <option value="open" ${filterStatus==='open'?'selected':''}>Open</option>
                  <option value="upcoming" ${filterStatus==='upcoming'?'selected':''}>Upcoming</option>
                  <option value="closed" ${filterStatus==='closed'?'selected':''}>Closed</option>
                  <option value="completed" ${filterStatus==='completed'?'selected':''}>Completed</option>
                </select>
              </div>
            </div>

            <!-- Events List -->
            <div style="margin-top:1.25rem; display:flex; flex-direction:column; gap:1.5rem;">
              ${events.length === 0 ? `
                <div class="card">
                  <div class="empty-state">
                    <i data-lucide="calendar-days" class="empty-icon"></i>
                    <h3>No events found</h3>
                    <p>Create your first district event.</p>
                  </div>
                </div>
              ` : events.map(evt => {
                const d = new Date(evt.date);
                const endD = new Date(evt.endDate);
                const isMultiDay = evt.date !== evt.endDate;
                
                // Get member registrations for this event
                const eventRegs = memberPayments.filter(p => p.eventId === evt.id);
                const totalParticipants = eventRegs.length;
                const sConfig = statusConfig[evt.status] || statusConfig.upcoming;
                const fillPercent = evt.capacity > 0 ? Math.round((totalParticipants / evt.capacity) * 100) : 0;
                
                // Get club-to-district payments for this event
                const eventClubPayments = clubPayments.filter(cp => cp.eventId === evt.id);

                return `
                  <div class="card hover-lift stagger-enter" style="padding: 24px; position:relative;">
                    <div style="display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap; justify-content:space-between; margin-bottom: 20px;">
                      <div style="display:flex; gap:1.25rem; align-items:flex-start; flex-wrap:wrap; flex:1;">
                        <!-- Date Box -->
                        <div style="width:72px; flex-shrink:0;">
                          <div style="width:72px; height:80px; border-radius:12px; background:linear-gradient(135deg, rgba(0,102,255,0.15), rgba(0,212,255,0.08)); display:flex; flex-direction:column; align-items:center; justify-content:center; border:1px solid rgba(0,212,255,0.15);">
                            <span style="font-size:0.65rem; text-transform:uppercase; color:var(--color-primary); font-weight:700; letter-spacing:1px;">${d.toLocaleDateString('en-US',{month:'short'})}</span>
                            <span style="font-size:1.5rem; font-weight:800; color:var(--color-text-primary); line-height:1;">${d.getDate()}</span>
                            <span style="font-size:0.6rem; color:var(--color-text-muted);">${d.getFullYear()}</span>
                          </div>
                        </div>

                        <!-- Details -->
                        <div style="flex:1; min-width:250px;">
                          <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.35rem;">
                            <span class="badge ${sConfig.class}">${evt.status}</span>
                            ${isMultiDay ? `<span class="badge badge-primary" style="font-size:0.65rem;">${Math.ceil((endD - d) / 86400000) + 1} days</span>` : ''}
                            <span class="badge badge-secondary" style="font-size:0.65rem;">Fee: Rs. ${(evt.fee || 0).toLocaleString()}</span>
                          </div>
                          <h3 style="margin:0 0 0.35rem; font-size:1.15rem;">${evt.name}</h3>
                          <p style="margin:0 0 0.75rem; font-size:0.85rem; color:var(--color-text-secondary); line-height:1.5;">
                            ${evt.description || 'No description provided.'}
                          </p>
                          <div style="display:flex; flex-wrap:wrap; gap:1.2rem; font-size:0.78rem; color:var(--color-text-muted);">
                            <span><i data-lucide="map-pin" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>${evt.venue}</span>
                            <span><i data-lucide="users" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>${totalParticipants}/${evt.capacity} registered</span>
                            <span><i data-lucide="clock" style="width:12px;height:12px;display:inline-block;vertical-align:-2px;margin-right:4px"></i>Deadline: ${new Date(evt.registrationDeadline).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>

                      <!-- Actions -->
                      <div style="display:flex; gap:0.5rem; flex-shrink:0;">
                        <button class="btn btn-secondary btn-sm edit-evt-btn" data-id="${evt.id}" title="Edit Event Details">
                          <i data-lucide="pencil" style="width:14px;height:14px"></i> Edit
                        </button>
                        <button class="btn btn-ghost btn-sm delete-evt-btn" data-id="${evt.id}" title="Delete Event" style="color:var(--color-danger);">
                          <i data-lucide="trash-2" style="width:14px;height:14px"></i> Delete
                        </button>
                      </div>
                    </div>

                    <!-- Club registrations performance -->
                    <div style="border-top: 1px solid var(--color-border); padding-top:16px; margin-top:16px;">
                      <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                        <h4 style="margin:0; font-size:13px; color:var(--color-text-primary); text-transform:uppercase; letter-spacing:0.5px;">Club Dues & Payment Actions</h4>
                        <span style="font-size:12px; color:var(--color-text-muted);">${eventClubPayments.filter(p=>p.status==='paid').length} of ${store.getAll('clubs').length} clubs settled</span>
                      </div>
                      
                      <div class="data-table-wrapper" style="border: 1px solid var(--color-border); border-radius:10px; overflow:hidden;">
                        <table class="data-table" style="font-size:12px;">
                          <thead>
                            <tr>
                              <th>Club</th>
                              <th>Registrations</th>
                              <th>Amount Owed (LKR)</th>
                              <th>Payment Status</th>
                              <th>Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${store.getAll('clubs').map(club => {
                              // Registrations count for this club
                              const clubRegsCount = eventRegs.filter(r => r.clubId === club.id).length;
                              const amtOwed = clubRegsCount * (evt.fee || 0);

                              // Consolidated payment record from club
                              const cPayment = eventClubPayments.find(p => p.clubId === club.id);
                              
                              let statusBadge = `<span class="badge badge-danger">Unpaid</span>`;
                              if (cPayment) {
                                statusBadge = cPayment.status === 'paid' 
                                  ? `<span class="badge badge-success">Settled</span>`
                                  : `<span class="badge badge-warning">Verification Pending</span>`;
                              } else if (amtOwed === 0) {
                                statusBadge = `<span class="badge badge-secondary">No registrations</span>`;
                              }

                              let actionBtn = '—';
                              if (cPayment && cPayment.status === 'pending') {
                                actionBtn = `<button class="btn btn-primary btn-xs verify-club-pay" data-pay-id="${cPayment.id}" data-event-id="${evt.id}" data-club-name="${club.name}" data-ref="${cPayment.reference}">Review</button>`;
                              } else if (cPayment && cPayment.status === 'paid') {
                                actionBtn = `<span style="color:#14b8a6; font-weight:600;"><i data-lucide="check" style="width:12px;height:12px;display:inline-block;vertical-align:-1px;"></i> Receipt Verified</span>`;
                              }

                              return `
                                <tr>
                                  <td style="font-weight:600;">${club.name}</td>
                                  <td>${clubRegsCount} member(s)</td>
                                  <td style="font-weight:600;">Rs. ${amtOwed.toLocaleString()}</td>
                                  <td>${statusBadge}</td>
                                  <td>${actionBtn}</td>
                                </tr>
                              `;
                            }).join('')}
                          </tbody>
                        </table>
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
    setupEventListeners(filterStatus);
  }

  function setupEventListeners(filterStatus) {
    // Filter change
    document.getElementById('filter-status')?.addEventListener('change', (e) => {
      render(e.target.value);
    });

    // Create Event
    document.getElementById('add-event-btn')?.addEventListener('click', () => {
      showModal('Create Event', getEventFormHtml(), {
        submitText: 'Create Event',
        size: 'lg',
        onSubmit: (close) => {
          const vals = getEventFormValues();
          if (!vals.name || !vals.date || !vals.endDate || !vals.venue || !vals.registrationDeadline) {
            showToast('error', 'Validation Error', 'Required fields marked with * are missing.');
            return;
          }
          vals.registrations = [];
          const created = store.create('events', vals);
          
          // Generate default settings for all existing clubs to initialize visibility as false
          const clubs = store.getAll('clubs');
          clubs.forEach(c => {
            store.create('clubEventSettings', {
              clubId: c.id,
              eventId: created.id,
              visibleToMembers: false
            });
          });

          showToast('success', 'Event Created', `${vals.name} has been created.`);
          close();
          render(filterStatus);
        }
      });
    });

    // Edit Event
    document.querySelectorAll('.edit-evt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const evt = store.getById('events', btn.dataset.id);
        if (!evt) return;
        showModal('Edit Event Details', getEventFormHtml(evt), {
          submitText: 'Save Changes',
          size: 'lg',
          onSubmit: (close) => {
            const vals = getEventFormValues();
            if (!vals.name || !vals.date || !vals.endDate || !vals.venue || !vals.registrationDeadline) {
              showToast('error', 'Validation Error', 'Required fields marked with * are missing.');
              return;
            }
            store.update('events', evt.id, vals);
            showToast('success', 'Event Updated', `${vals.name} has been updated.`);
            close();
            render(filterStatus);
          }
        });
      });
    });

    // Delete Event
    document.querySelectorAll('.delete-evt-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const evt = store.getById('events', btn.dataset.id);
        if (!evt) return;
        showConfirm('Delete Event', `Are you sure you want to delete "<strong>${evt.name}</strong>"? All event settings and payment entries will be lost.`, () => {
          store.delete('events', evt.id);
          // Clean up registrations/settings
          const settings = store.getAll('clubEventSettings').filter(s => s.eventId === evt.id);
          settings.forEach(s => store.delete('clubEventSettings', s.id));
          
          showToast('success', 'Event Deleted', `${evt.name} has been removed.`);
          render(filterStatus);
        });
      });
    });

    // Verify Club Consolidated Payment
    document.querySelectorAll('.verify-club-pay').forEach(btn => {
      btn.addEventListener('click', () => {
        const payId = btn.dataset.payId;
        const eventId = btn.dataset.eventId;
        const clubName = btn.dataset.clubName;
        const ref = btn.dataset.ref;
        const cPay = store.getById('clubPayments', payId);
        if (!cPay) return;

        const reviewHtml = `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="padding:14px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
              <div style="font-size:11px; color:var(--color-text-muted);">Sponsoring Club</div>
              <div style="font-weight:700; font-size:14px; color:var(--color-text-primary); margin-top:4px;">${clubName}</div>
            </div>
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:12px;">
              <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                <div style="font-size:11px; color:var(--color-text-muted);">Amount Received</div>
                <div style="font-weight:700; font-size:15px; color:#14b8a6; margin-top:4px;">Rs. ${cPay.amount.toLocaleString()}</div>
              </div>
              <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
                <div style="font-size:11px; color:var(--color-text-muted);">Registered Members</div>
                <div style="font-weight:700; font-size:15px; color:var(--color-primary); margin-top:4px;">${cPay.registeredCount} members</div>
              </div>
            </div>
            <div style="padding:12px; background:rgba(255,255,255,0.02); border:1px solid var(--color-border); border-radius:10px;">
              <div style="font-size:11px; color:var(--color-text-muted);">Reference Code & Date</div>
              <div style="font-weight:600; font-size:13px; color:var(--color-text-primary); margin-top:4px;">${ref} (Submitted: ${new Date(cPay.date).toLocaleDateString()})</div>
            </div>
            
            <div>
              <div style="font-size:12px; color:var(--color-text-muted); margin-bottom:8px;">Uploaded Payment Receipt:</div>
              <div style="height:140px; border-radius:10px; background:rgba(255,255,255,0.03); border:2px dashed var(--color-border); display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--color-text-muted);">
                <i data-lucide="image" style="width:36px; height:36px; margin-bottom:8px; color:var(--color-primary);"></i>
                <span style="font-size:12px; font-weight:600; color:var(--color-text-primary);">${cPay.receiptUrl || 'receipt.png'}</span>
                <span style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">(Click to view full image in a new tab)</span>
              </div>
            </div>
          </div>
        `;

        showModal('Review Club Payment Dues', reviewHtml, {
          submitText: 'Approve & Settle',
          cancelText: 'Reject Dues',
          onSubmit: (close) => {
            // Approve payment
            store.update('clubPayments', payId, { status: 'paid' });
            
            // Add transaction log to district finances
            const evt = store.getById('events', eventId);
            store.create('finances', {
              clubId: 'district',
              type: 'income',
              category: 'Events',
              amount: cPay.amount,
              date: new Date().toISOString().split('T')[0],
              description: `Consolidated Event Fees: ${evt?.name} from ${clubName}`,
              reference: ref
            });

            showToast('success', 'Payment Approved', `Club payment from ${clubName} has been settled.`);
            close();
            render(filterStatus);
          },
          onCancel: () => {
            // Reject payment
            store.delete('clubPayments', payId);
            showToast('warning', 'Payment Rejected', `Dues from ${clubName} were rejected and must be re-submitted.`);
            render(filterStatus);
          }
        });
      });
    });
  }

  render();
}
