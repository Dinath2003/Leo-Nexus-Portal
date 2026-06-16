// ============================================
// LEO NEXUS PORTAL — MEMBER EVENTS & REGISTRATION
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';
import { showModal } from '../../components/modal.js';

export function renderMemberEvents() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
  const user = auth.currentUser;

  // Resolve member record
  const member = store.getAll('members').find(m => m.email.toLowerCase() === user.email.toLowerCase()) || {
    id: 'm5',
    name: user.name,
    email: user.email,
    phone: '+94 77 100 0005'
  };

  function render() {
    const events = store.getAll('events');
    const allSettings = store.getAll('clubEventSettings');
    const memberPayments = store.getAll('memberPayments');

    // Filter events that have visibility = true for this club
    const visibleEvents = events.filter(e => {
      const setting = allSettings.find(s => s.clubId === clubId && s.eventId === e.id);
      return setting?.visibleToMembers === true;
    });

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Events & Registrations', ['Activities', 'Events'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1>District Events Registrations</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Sign up for club-approved district events and pay your registration dues</p>
              </div>
            </div>

            <!-- Events List -->
            <div class="stagger-enter" style="animation-delay:0.1s; display:flex; flex-direction:column; gap:20px; margin-top:20px;">
              ${visibleEvents.length === 0 ? `
                <div class="card">
                  <div class="empty-state" style="padding:40px 0;">
                    <i data-lucide="calendar" class="empty-icon" style="stroke-width:1.5;"></i>
                    <h3>No events currently open</h3>
                    <p style="color:var(--color-text-muted); font-size:13px; margin-top:4px;">Your club officers have not enabled member registrations for any district events yet.</p>
                  </div>
                </div>
              ` : visibleEvents.map(event => {
                // Check if this member is registered
                const reg = memberPayments.find(p => p.eventId === event.id && p.memberId === member.id);
                const isRegistered = !!reg;
                const isPaid = reg?.status === 'paid';

                let statusBadge = `<span class="badge badge-danger">Not Registered</span>`;
                if (isRegistered) {
                  statusBadge = isPaid
                    ? `<span class="badge badge-success"><i data-lucide="check-circle" style="width:12px;height:12px;display:inline-block;vertical-align:-1px;margin-right:2px"></i> Registered & Paid</span>`
                    : `<span class="badge badge-warning"><i data-lucide="clock" style="width:12px;height:12px;display:inline-block;vertical-align:-1px;margin-right:2px"></i> Registered (Unpaid)</span>`;
                }

                return `
                  <div class="card hover-lift water-effect" style="padding:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
                      <div>
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                          <span class="badge badge-primary">${event.status}</span>
                          ${statusBadge}
                        </div>
                        <h3 style="font-size:18px; font-weight:700; margin:0;">${event.name}</h3>
                        <p style="font-size:13px; color:var(--color-text-secondary); margin-top:4px; line-height:1.5;">${event.description || 'No description provided.'}</p>
                      </div>
                      
                      <div style="text-align:right;">
                        <span style="font-size:11px; text-transform:uppercase; color:var(--color-text-muted); font-weight:700;">Registration Fee</span>
                        <div style="font-size:18px; font-weight:800; color:var(--color-primary); margin-top:2px;">Rs. ${(event.fee || 0).toLocaleString()}</div>
                      </div>
                    </div>

                    <div style="display:flex; flex-wrap:wrap; gap:16px; font-size:13px; color:var(--color-text-secondary); padding-bottom:16px; border-bottom:1px solid var(--color-border);">
                      <div style="display:flex; align-items:center; gap:6px;">
                        <i data-lucide="calendar" style="width:14px;height:14px;color:var(--color-primary)"></i>
                        <span>Date: ${new Date(event.date).toLocaleDateString()}</span>
                      </div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <i data-lucide="map-pin" style="width:14px;height:14px;color:var(--color-cyan)"></i>
                        <span>Venue: ${event.venue}</span>
                      </div>
                      <div style="display:flex; align-items:center; gap:6px;">
                        <i data-lucide="users" style="width:14px;height:14px;color:#14b8a6"></i>
                        <span>Eligibility: ${event.eligibility || 'All Members'}</span>
                      </div>
                      <div style="display:flex; align-items:center; gap:6px; color:${new Date(event.registrationDeadline) < new Date() ? '#ef4444' : 'var(--color-text-secondary)'};">
                        <i data-lucide="alarm-clock" style="width:14px;height:14px;"></i>
                        <span>Deadline: ${new Date(event.registrationDeadline).toLocaleDateString()}</span>
                      </div>
                    </div>

                    <div style="display:flex; justify-content:space-between; align-items:center; margin-top:16px; flex-wrap:wrap; gap:12px;">
                      <div>
                        ${isRegistered ? `
                          <div style="font-size:12px; color:var(--color-text-muted);">
                            Reference Code: <strong style="color:var(--color-text-primary);">${reg.reference || 'N/A'}</strong> | Date: ${new Date(reg.date).toLocaleDateString()}
                          </div>
                        ` : `
                          <div style="font-size:12px; color:var(--color-text-muted);">
                            Registrations are handled securely. Your details will be saved to your club records.
                          </div>
                        `}
                      </div>

                      <div style="display:flex; gap:10px;">
                        ${!isRegistered ? `
                          <button class="btn btn-primary btn-sm register-member-btn" data-event-id="${event.id}">
                            <i data-lucide="user-plus" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> Register Now
                          </button>
                        ` : ''}

                        ${isRegistered && !isPaid ? `
                          <button class="btn btn-success btn-sm pay-club-btn" data-event-id="${event.id}" data-reg-id="${reg.id}" data-amount="${event.fee || 1000}">
                            <i data-lucide="credit-card" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> Submit Payment to Club
                          </button>
                        ` : ''}

                        ${isRegistered && isPaid ? `
                          <button class="btn btn-ghost btn-sm" disabled style="color:#14b8a6; background:rgba(20,184,166,0.05); border:1px solid rgba(20,184,166,0.2);">
                            <i data-lucide="check-check" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px;"></i> Fully Confirmed
                          </button>
                        ` : ''}
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
    setupEventListeners();
  }

  function setupEventListeners() {
    // Member Register Click
    document.querySelectorAll('.register-member-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const eventId = btn.dataset.eventId;
        const event = store.getById('events', eventId);
        if (!event) return;

        const dynamicFields = (event.requiredFields || '').split(',').map(f => f.trim()).filter(Boolean);

        const registerFormHtml = `
          <form id="member-reg-form">
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Full Name</label>
                <input type="text" class="form-input" id="reg-mem-name" value="${member.name}" disabled />
              </div>
              <div class="form-group">
                <label class="form-label">Email Address</label>
                <input type="email" class="form-input" id="reg-mem-email" value="${member.email}" disabled />
              </div>
            </div>
            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Contact Number</label>
                <input type="text" class="form-input" id="reg-mem-phone" value="${member.phone}" disabled />
              </div>
              <div class="form-group">
                <label class="form-label">Event Category *</label>
                <select class="form-select" id="reg-mem-category">
                  ${(event.category || 'General').split(',').map(c => `<option value="${c.trim()}">${c.trim()}</option>`).join('')}
                </select>
              </div>
            </div>
            ${dynamicFields.map(field => `
              <div class="form-group">
                <label class="form-label">${field} *</label>
                <input type="text" class="form-input dyn-field-input" data-field-name="${field}" placeholder="Enter ${field.toLowerCase()}" required />
              </div>
            `).join('')}
          </form>
        `;

        showModal('Register for Event', registerFormHtml, {
          submitText: 'Confirm Registration',
          onSubmit: (close) => {
            // Validation of dynamic inputs
            const dynInputs = document.querySelectorAll('.dyn-field-input');
            let hasError = false;
            dynInputs.forEach(input => {
              if (!input.value.trim()) {
                input.style.borderColor = 'var(--color-danger)';
                hasError = true;
              } else {
                input.style.borderColor = '';
              }
            });

            if (hasError) {
              showToast('error', 'Validation Error', 'Please fill in all required fields.');
              return;
            }

            // Create member registration payment record (marked pending payment)
            store.create('memberPayments', {
              eventId,
              clubId,
              memberId: member.id,
              name: member.name,
              amount: event.fee || 1000,
              status: 'pending',
              date: new Date().toISOString().split('T')[0],
              method: '',
              reference: ''
            });

            showToast('success', 'Registration Submitted', 'You have successfully signed up. Please submit your payment next.');
            close();
            render();
          }
        });
      });
    });

    // Pay Club Click
    document.querySelectorAll('.pay-club-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const amount = parseFloat(btn.dataset.amount);

        const paymentHtml = `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="font-size:13px; color:var(--color-text-muted); text-align:center;">
              Please make the registration payment directly to your club's bank account or Treasurer.
            </div>
            
            <div style="padding:14px; background:rgba(20,184,166,0.05); border:1px solid rgba(20,184,166,0.2); border-radius:10px; text-align:center;">
              <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Amount Payable to Club</div>
              <div style="font-size:24px; font-weight:800; color:#14b8a6; margin-top:4px;">Rs. ${amount.toLocaleString()}</div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Payment Method *</label>
                <select class="form-select" id="mem-pay-method">
                  <option value="Bank Transfer">Bank Transfer / EFT</option>
                  <option value="Cash">Cash to Treasurer</option>
                  <option value="Card Payment">Credit/Debit Card</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Transaction Reference / Receipt No. *</label>
                <input type="text" class="form-input" id="mem-pay-ref" placeholder="e.g. TXN-123456" required />
              </div>
            </div>
          </div>
        `;

        showModal('Submit Member Payment to Club', paymentHtml, {
          submitText: 'Record Payment',
          onSubmit: (close) => {
            const method = document.getElementById('mem-pay-method').value;
            const ref = document.getElementById('mem-pay-ref').value.trim();

            if (!ref) {
              showToast('error', 'Validation Error', 'Transaction reference code is required.');
              return;
            }

            // Update member payment record to paid
            store.update('memberPayments', regId, {
              status: 'paid',
              method,
              reference: ref,
              date: new Date().toISOString().split('T')[0]
            });

            // Log this income inside the club's ledger!
            const reg = store.getById('memberPayments', regId);
            const event = store.getById('events', reg.eventId);
            store.create('finances', {
              clubId,
              type: 'income',
              category: 'Events',
              amount: amount,
              date: new Date().toISOString().split('T')[0],
              description: `Event Registration: ${event?.name} - Member ${member.name}`,
              reference: ref
            });

            showToast('success', 'Payment Logged', 'Your payment reference has been recorded successfully.');
            close();
            render();
          }
        });
      });
    });
  }

  render();
}
