// ============================================
// LEO NEXUS PORTAL — CLUB EVENTS
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';

export function renderClubEvents() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;

  function render() {
    const events = store.getAll('events').sort((a, b) => new Date(a.date) - new Date(b.date));
    const allSettings = store.getAll('clubEventSettings');
    const memberPayments = store.getAll('memberPayments');
    const clubPayments = store.getAll('clubPayments');
    const canApprove = auth.currentUser?.role === 'club_president' || auth.currentUser?.role === 'club_treasurer' || auth.currentUser?.role === 'admin';

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Events', ['Club', 'Events'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">DISTRICT PROGRAM</span>
                <h1 style="margin:0;">District Events & Payments</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Manage member event visibility and consolidated district dues</p>
              </div>
            </div>

            <!-- Events List -->
            <div class="stagger-enter" style="animation-delay:0.1s; display:flex; flex-direction:column; gap:24px; margin-top:20px;">
              ${events.length === 0 ? `
                <div class="card">
                  <div class="empty-state">
                    <i data-lucide="calendar-days" class="empty-icon"></i>
                    <h3>No events created by district</h3>
                  </div>
                </div>
              ` : events.map(event => {
                // Find or initialize visibility setting
                let setting = allSettings.find(s => s.clubId === clubId && s.eventId === event.id);
                if (!setting) {
                  // Fallback creating setting if it doesn't exist
                  setting = store.create('clubEventSettings', {
                    clubId,
                    eventId: event.id,
                    visibleToMembers: false
                  });
                }
                const isVisible = setting.visibleToMembers;
                
                // Member registrations for this club and event
                const clubMemberRegs = memberPayments.filter(p => p.clubId === clubId && p.eventId === event.id);
                // Only registrations approved by club count for dashboard metrics and district payments
                const approvedRegs = clubMemberRegs.filter(r => r.registrationStatus === 'approved');
                const confirmedRegsCount = approvedRegs.length;
                const paidToClubCount = approvedRegs.filter(r => r.paymentStatus === 'paid').length;
                
                // Owed calculations
                const feePerMember = event.fee || 0;
                const totalOwedToDistrict = confirmedRegsCount * feePerMember;
                const totalReceivedFromMembers = approvedRegs.filter(r => r.paymentStatus === 'paid').reduce((sum, r) => sum + r.amount, 0);

                // Consolidated payment status
                const distPayment = clubPayments.find(p => p.clubId === clubId && p.eventId === event.id);

                let distPayBadge = `<span class="badge badge-danger">Dues Unpaid</span>`;
                if (distPayment) {
                  distPayBadge = distPayment.status === 'paid'
                    ? `<span class="badge badge-success">Paid & Settled</span>`
                    : `<span class="badge badge-warning">Verification Pending</span>`;
                } else if (totalOwedToDistrict === 0) {
                  distPayBadge = `<span class="badge badge-secondary">No registrations</span>`;
                }

                return `
                  <div class="card hover-lift water-effect" style="overflow:hidden; padding:24px;">
                    <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:16px; flex-wrap:wrap; margin-bottom:16px;">
                      <div>
                        <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
                          <span class="badge ${event.status === 'open' ? 'badge-success' : 'badge-danger'}">${event.status}</span>
                          ${distPayBadge}
                        </div>
                        <h3 style="font-size:18px; font-weight:700; margin:0;">${event.name}</h3>
                        <p style="font-size:13px; color:var(--color-text-secondary); margin-top:6px; line-height:1.5; max-width:640px;">${event.description || 'No description provided.'}</p>
                      </div>

                      <!-- Control visibility for members -->
                      <div style="display:flex; flex-direction:column; align-items:flex-end; gap:8px;">
                        <div style="display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.03); border:1px solid var(--color-border); padding:6px 12px; border-radius:8px;">
                          <span style="font-size:12px; font-weight:600; color:var(--color-text-secondary);">Visible to Members:</span>
                          <button class="btn ${isVisible ? 'btn-success' : 'btn-ghost'} btn-xs toggle-visibility" data-setting-id="${setting.id}" data-current="${isVisible}">
                            ${isVisible ? 'Visible' : 'Hidden'}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap:16px; padding:14px; background:rgba(255,255,255,0.01); border:1px solid var(--color-border); border-radius:12px; font-size:13px;">
                      <div>
                        <div style="color:var(--color-text-muted); font-size:11px; text-transform:uppercase;">Registration Fee</div>
                        <div style="font-size:15px; font-weight:700; color:var(--color-text-primary); margin-top:2px;">Rs. ${feePerMember.toLocaleString()} <span style="font-size:10px; color:var(--color-text-muted); font-weight:normal;">per member</span></div>
                      </div>
                      <div>
                        <div style="color:var(--color-text-muted); font-size:11px; text-transform:uppercase;">Member Sign-ups</div>
                        <div style="font-size:15px; font-weight:700; color:var(--color-primary); margin-top:2px;">${confirmedRegsCount} registered <span style="font-size:11px; color:#14b8a6; font-weight:normal;">(${paidToClubCount} paid)</span></div>
                      </div>
                      <div>
                        <div style="color:var(--color-text-muted); font-size:11px; text-transform:uppercase;">Dues from Members</div>
                        <div style="font-size:15px; font-weight:700; color:#14b8a6; margin-top:2px;">Rs. ${totalReceivedFromMembers.toLocaleString()} <span style="font-size:10px; color:var(--color-text-muted); font-weight:normal;">received</span></div>
                      </div>
                      <div>
                        <div style="color:var(--color-text-muted); font-size:11px; text-transform:uppercase;">Owed to District</div>
                        <div style="font-size:15px; font-weight:700; color:#ef4444; margin-top:2px;">Rs. ${totalOwedToDistrict.toLocaleString()}</div>
                      </div>
                    </div>

                    <!-- Member Registration Detail List Toggle -->
                    <div style="margin-top:16px;">
                      <details style="border: 1px solid var(--color-border); border-radius:8px; background:rgba(255,255,255,0.01);">
                        <summary style="padding:10px 14px; font-size:12px; font-weight:600; cursor:pointer; color:var(--color-text-primary);">View Member Registrations & Receipts (${clubMemberRegs.length})</summary>
                        <div style="padding:14px;">
                          <div style="display:flex; justify-content:flex-end; margin-bottom:10px;">
                            <button class="btn btn-secondary btn-xs add-mem-reg-btn" data-event-id="${event.id}">
                              <i data-lucide="user-plus" style="width:12px;height:12px;margin-right:2px;vertical-align:-1px;"></i> Add Registration
                            </button>
                          </div>
                          <table class="data-table" style="font-size:12px;">
                            <thead>
                              <tr>
                                <th>Member Name</th>
                                <th>Registered At</th>
                                <th>Amount</th>
                                <th>Reg Status</th>
                                <th>Payment Status</th>
                                <th>Reference</th>
                                <th style="width:180px;">Action</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${clubMemberRegs.length === 0 ? `
                                <tr><td colspan="7" style="text-align:center; color:var(--color-text-muted);">No registrations yet. Click "Add Registration" to sign up a member manually.</td></tr>
                              ` : clubMemberRegs.map(reg => {
                                let regBadge = '';
                                if (reg.registrationStatus === 'pending') {
                                  regBadge = '<span class="badge badge-warning">Pending Approval</span>';
                                } else if (reg.registrationStatus === 'approved') {
                                  regBadge = '<span class="badge badge-success">Approved</span>';
                                } else {
                                  regBadge = '<span class="badge badge-danger">Rejected</span>';
                                }

                                let payBadge = '';
                                if (reg.paymentStatus === 'paid') {
                                  payBadge = '<span class="badge badge-success">Paid</span>';
                                } else if (reg.paymentStatus === 'pending_approval') {
                                  payBadge = '<span class="badge badge-warning">Pending Verification</span>';
                                } else {
                                  payBadge = '<span class="badge badge-danger">Unpaid</span>';
                                }

                                return `
                                <tr>
                                  <td style="font-weight:600;">${reg.name}</td>
                                  <td>${new Date(reg.date).toLocaleDateString()}</td>
                                  <td>Rs. ${reg.amount.toLocaleString()}</td>
                                  <td>${regBadge}</td>
                                  <td>${payBadge}</td>
                                  <td>
                                    ${reg.reference ? `
                                      <div style="font-size:11px;">
                                        <strong>${reg.method || 'Method'}</strong><br/>
                                        <span style="color:var(--color-text-muted)">${reg.reference}</span>
                                      </div>
                                    ` : '—'}
                                  </td>
                                  <td>
                                    <div style="display:flex; gap:4px; flex-wrap:wrap; align-items:center;">
                                      ${canApprove && reg.registrationStatus === 'pending' ? `
                                        <button class="btn btn-success btn-xs approve-reg-btn" data-reg-id="${reg.id}" title="Approve Registration" style="padding:2px 6px; font-size:10px;">
                                          <i data-lucide="check" style="width:10px;height:10px;margin-right:2px;"></i> Approve
                                        </button>
                                        <button class="btn btn-danger btn-xs reject-reg-btn" data-reg-id="${reg.id}" title="Reject Registration" style="padding:2px 6px; font-size:10px;">
                                          <i data-lucide="x" style="width:10px;height:10px;margin-right:2px;"></i> Reject
                                        </button>
                                      ` : ''}

                                      ${canApprove && reg.registrationStatus === 'approved' && reg.paymentStatus === 'pending_approval' ? `
                                        <button class="btn btn-success btn-xs approve-pay-btn" data-reg-id="${reg.id}" title="Verify Payment" style="padding:2px 6px; font-size:10px;">
                                          <i data-lucide="check-circle" style="width:10px;height:10px;margin-right:2px;"></i> Verify Pay
                                        </button>
                                        <button class="btn btn-danger btn-xs reject-pay-btn" data-reg-id="${reg.id}" title="Reject Payment" style="padding:2px 6px; font-size:10px;">
                                          <i data-lucide="x-circle" style="width:10px;height:10px;margin-right:2px;"></i> Reject Pay
                                        </button>
                                      ` : ''}

                                      <button class="btn btn-ghost btn-xs btn-icon edit-mem-reg-btn" data-reg-id="${reg.id}" title="Edit"><i data-lucide="pencil" style="width:11px;height:11px;"></i></button>
                                      <button class="btn btn-ghost btn-xs btn-icon delete-mem-reg-btn" data-reg-id="${reg.id}" style="color:var(--color-danger);" title="Delete"><i data-lucide="trash-2" style="width:11px;height:11px;"></i></button>
                                    </div>
                                  </td>
                                </tr>
                                `;
                              }).join('')}
                            </tbody>
                          </table>
                        </div>
                      </details>
                    </div>

                    <!-- Settle consolidated payment to district button -->
                    ${totalOwedToDistrict > 0 && !distPayment ? `
                      <div style="display:flex; justify-content:flex-end; margin-top:16px;">
                        <button class="btn btn-primary btn-sm pay-district-btn" data-event-id="${event.id}" data-amount="${totalOwedToDistrict}" data-count="${confirmedRegsCount}">
                          <i data-lucide="wallet" style="width:14px;height:14px;vertical-align:-2px;margin-right:4px"></i> Settle Dues with District (Rs. ${totalOwedToDistrict.toLocaleString()})
                        </button>
                      </div>
                    ` : ''}

                    ${distPayment && distPayment.status === 'pending' ? `
                      <div style="margin-top:16px; padding:12px; background:rgba(245,158,11,0.05); border:1px solid rgba(245,158,11,0.2); border-radius:8px; font-size:12px; color:var(--color-text-secondary); display:flex; justify-content:space-between; align-items:center;">
                        <span><i data-lucide="info" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;color:#f59e0b"></i> Consolidated payment receipt submitted. Waiting for District Governor/Treasurer to approve. Ref: <strong>${distPayment.reference}</strong></span>
                      </div>
                    ` : ''}

                    ${distPayment && distPayment.status === 'paid' ? `
                      <div style="margin-top:16px; padding:12px; background:rgba(20,184,166,0.05); border:1px solid rgba(20,184,166,0.2); border-radius:8px; font-size:12px; color:var(--color-text-secondary); display:flex; justify-content:space-between; align-items:center;">
                        <span><i data-lucide="check-circle" style="width:14px;height:14px;vertical-align:-2px;margin-right:6px;color:#14b8a6"></i> Settle Confirmed by District. Payment logged successfully. Ref: <strong>${distPayment.reference}</strong></span>
                      </div>
                    ` : ''}
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
    // Toggle member visibility
    document.querySelectorAll('.toggle-visibility').forEach(btn => {
      btn.addEventListener('click', () => {
        const settingId = btn.dataset.settingId;
        const current = btn.dataset.current === 'true';
        store.update('clubEventSettings', settingId, { visibleToMembers: !current });
        showToast('success', 'Visibility Updated', `Event visibility changed to ${!current ? 'Visible' : 'Hidden'}.`);
        render();
      });
    });

    // Approve Registration
    document.querySelectorAll('.approve-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;
        showConfirm('Approve Registration', `Are you sure you want to approve registration for <strong>${reg.name}</strong>?`, () => {
          store.update('memberPayments', regId, {
            registrationStatus: 'approved'
          });
          showToast('success', 'Registration Approved', `Registration for ${reg.name} has been approved.`);
          render();
        });
      });
    });

    // Reject Registration
    document.querySelectorAll('.reject-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;
        showConfirm('Reject Registration', `Are you sure you want to reject registration for <strong>${reg.name}</strong>?`, () => {
          store.update('memberPayments', regId, {
            registrationStatus: 'rejected'
          });
          showToast('success', 'Registration Rejected', `Registration for ${reg.name} has been rejected.`);
          render();
        });
      });
    });

    // Approve Payment
    document.querySelectorAll('.approve-pay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;
        const event = store.getById('events', reg.eventId);
        showConfirm('Approve Payment', `Verify and approve payment of Rs. ${reg.amount.toLocaleString()} for <strong>${reg.name}</strong>?`, () => {
          store.update('memberPayments', regId, {
            paymentStatus: 'paid',
            status: 'paid'
          });
          // Log this income inside the club's ledger!
          store.create('finances', {
            clubId,
            type: 'income',
            category: 'Events',
            amount: reg.amount,
            date: new Date().toISOString().split('T')[0],
            description: `Event Registration Payment Approved: ${event?.name} - Member ${reg.name}`,
            reference: reg.reference || 'Approved Payment'
          });
          showToast('success', 'Payment Approved', `Payment for ${reg.name} verified and logged to club finances.`);
          render();
        });
      });
    });

    // Reject Payment
    document.querySelectorAll('.reject-pay-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;
        showConfirm('Reject Payment', `Are you sure you want to reject the payment receipt for <strong>${reg.name}</strong>? This will reset their status to Unpaid.`, () => {
          store.update('memberPayments', regId, {
            paymentStatus: 'unpaid',
            method: '',
            reference: ''
          });
          showToast('success', 'Payment Rejected', `Payment receipt for ${reg.name} has been rejected.`);
          render();
        });
      });
    });

    // Pay district (Consolidated)
    document.querySelectorAll('.pay-district-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const eventId = btn.dataset.eventId;
        const amt = parseFloat(btn.dataset.amount);
        const count = parseInt(btn.dataset.count);

        const payFormHtml = `
          <div style="display:flex; flex-direction:column; gap:16px;">
            <div style="font-size:13px; color:var(--color-text-muted);">
              You are submitting a consolidated payment for <strong>${count} member registrations</strong>.
            </div>
            
            <div style="padding:14px; background:rgba(0,102,255,0.05); border:1px solid rgba(0,102,255,0.2); border-radius:10px; text-align:center;">
              <div style="font-size:11px; color:var(--color-text-muted); text-transform:uppercase;">Consolidated Amount Due</div>
              <div style="font-size:24px; font-weight:800; color:var(--color-primary); margin-top:4px;">Rs. ${amt.toLocaleString()}</div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="form-label">Payment Method *</label>
                <select class="form-select" id="dist-pay-method">
                  <option value="Bank Transfer">Bank Transfer / EFT</option>
                  <option value="Bank Deposit">Physical Cash Deposit</option>
                  <option value="Online Gateway">Integrated Card Gateway</option>
                </select>
              </div>
              <div class="form-group">
                <label class="form-label">Transaction Reference *</label>
                <input type="text" class="form-input" id="dist-pay-ref" placeholder="e.g. TXN-987654" required />
              </div>
            </div>

            <div class="form-group">
              <label class="form-label">Upload Receipt Copy *</label>
              <div style="border: 2px dashed var(--color-border); border-radius:10px; height:120px; display:flex; flex-direction:column; align-items:center; justify-content:center; color:var(--color-text-muted); cursor:pointer; background:rgba(255,255,255,0.01);" onclick="document.getElementById('receipt-file-mock').click();">
                <i data-lucide="upload-cloud" style="width:32px; height:32px; margin-bottom:6px; color:var(--color-primary);"></i>
                <span style="font-size:12px; font-weight:600; color:var(--color-text-primary);" id="upload-status">Click to select files</span>
                <span style="font-size:10px; color:var(--color-text-muted); margin-top:2px;">PDF, PNG or JPG max 5MB</span>
                <input type="file" id="receipt-file-mock" style="display:none;" />
              </div>
            </div>
          </div>
        `;

        showModal('Consolidated Payment to District', payFormHtml, {
          submitText: 'Submit Payment Receipt',
          onSubmit: (close) => {
            const method = document.getElementById('dist-pay-method').value;
            const ref = document.getElementById('dist-pay-ref').value.trim();
            const fileName = document.getElementById('receipt-file-mock').files[0]?.name || 'consolidated_receipt.png';

            if (!ref) {
              showToast('error', 'Validation Error', 'Transaction reference code is required.');
              return;
            }

            // Create record
            store.create('clubPayments', {
              eventId,
              clubId,
              amount: amt,
              status: 'pending',
              date: new Date().toISOString().split('T')[0],
              method,
              reference: ref,
              receiptUrl: fileName,
              registeredCount: count
            });

            // Also log a pending transaction expense to the club wallet
            store.create('finances', {
              clubId,
              type: 'expense',
              category: 'Events',
              amount: amt,
              date: new Date().toISOString().split('T')[0],
              description: `Consolidated Event Fees: Submitted for approval`,
              reference: ref
            });

            showToast('success', 'Receipt Submitted', 'Your consolidated payment receipt has been sent to District for confirmation.');
            close();
            render();
          }
        });

        // Setup upload mock change listener
        setTimeout(() => {
          const fileInput = document.getElementById('receipt-file-mock');
          fileInput?.addEventListener('change', () => {
            const statusLabel = document.getElementById('upload-status');
            if (statusLabel && fileInput.files.length > 0) {
              statusLabel.textContent = `Attached: ${fileInput.files[0].name}`;
              statusLabel.style.color = '#14b8a6';
            }
          });
          lucide.createIcons();
        }, 200);
      });
    });

    // Add member registration manually
    document.querySelectorAll('.add-mem-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const eventId = btn.dataset.eventId;
        const event = store.getById('events', eventId);
        const members = store.getClubMembers(clubId);

        // Filter out members who are already registered
        const registeredMemberIds = store.getAll('memberPayments')
          .filter(p => p.eventId === eventId)
          .map(p => p.memberId);
        
        const eligibleMembers = members.filter(m => !registeredMemberIds.includes(m.id));

        if (eligibleMembers.length === 0) {
          showToast('warning', 'No Members Available', 'All active club members are already registered for this event.');
          return;
        }

        const addFormHtml = `
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label">Select Member *</label>
            <select class="form-select" id="add-reg-member">
              ${eligibleMembers.map(m => `<option value="${m.id}">${m.name} (${m.role})</option>`).join('')}
            </select>
          </div>
          <div class="form-row" style="margin-bottom:12px;">
            <div class="form-group">
              <label class="form-label">Category *</label>
              <select class="form-select" id="add-reg-category">
                ${(event.category || 'General').split(',').map(c => `<option value="${c.trim()}">${c.trim()}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Amount (Rs.) *</label>
              <input type="number" class="form-input" id="add-reg-amount" value="${event.fee || 1000}" min="0" required />
            </div>
          </div>
          <div class="form-row" style="margin-bottom:12px;">
            <div class="form-group">
              <label class="form-label">Payment Status</label>
              <select class="form-select" id="add-reg-status">
                <option value="pending">Pending</option>
                <option value="paid">Paid to Club</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Transaction Reference</label>
              <input type="text" class="form-input" id="add-reg-ref" placeholder="e.g. CASH or bank reference" />
            </div>
          </div>
        `;

        showModal('Add Member Registration', addFormHtml, {
          submitText: 'Register Member',
          onSubmit: (close) => {
            const memberId = document.getElementById('add-reg-member').value;
            const category = document.getElementById('add-reg-category').value;
            const amount = parseFloat(document.getElementById('add-reg-amount').value) || 0;
            const status = document.getElementById('add-reg-status').value;
            const ref = document.getElementById('add-reg-ref').value.trim();

            const targetMem = store.getById('members', memberId);
            if (!targetMem) return;

            store.create('memberPayments', {
              eventId,
              clubId,
              memberId,
              name: targetMem.name,
              amount,
              status,
              date: new Date().toISOString().split('T')[0],
              method: status === 'paid' ? 'Admin Override' : '',
              reference: ref,
              registrationStatus: 'approved',
              paymentStatus: status === 'paid' ? 'paid' : 'unpaid'
            });

            // If marked as paid, also record income in club finances
            if (status === 'paid') {
              store.create('finances', {
                clubId,
                type: 'income',
                category: 'Events',
                amount,
                date: new Date().toISOString().split('T')[0],
                description: `Event Registration: ${event.name} - Member ${targetMem.name}`,
                reference: ref || 'Admin Override'
              });
            }

            showToast('success', 'Member Registered', `${targetMem.name} has been registered for the event.`);
            close();
            render();
          }
        });
      });
    });

    // Edit Member Registration
    document.querySelectorAll('.edit-mem-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;
        const event = store.getById('events', reg.eventId);

        const editFormHtml = `
          <div class="form-group" style="margin-bottom:12px;">
            <label class="form-label">Member Name</label>
            <input type="text" class="form-input" value="${reg.name}" disabled />
          </div>
          <div class="form-row" style="margin-bottom:12px;">
            <div class="form-group">
              <label class="form-label">Category *</label>
              <select class="form-select" id="edit-reg-category">
                ${(event?.category || 'General').split(',').map(c => `<option value="${c.trim()}" ${reg.category === c.trim() ? 'selected' : ''}>${c.trim()}</option>`).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Amount (Rs.) *</label>
              <input type="number" class="form-input" id="edit-reg-amount" value="${reg.amount}" min="0" required />
            </div>
          </div>
          <div class="form-row" style="margin-bottom:12px;">
            <div class="form-group">
              <label class="form-label">Payment Status</label>
              <select class="form-select" id="edit-reg-status">
                <option value="pending" ${reg.status === 'pending' ? 'selected' : ''}>Pending</option>
                <option value="paid" ${reg.status === 'paid' ? 'selected' : ''}>Paid to Club</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Transaction Reference</label>
              <input type="text" class="form-input" id="edit-reg-ref" value="${reg.reference || ''}" placeholder="e.g. CASH or bank reference" />
            </div>
          </div>
        `;

        showModal('Edit Member Registration', editFormHtml, {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const category = document.getElementById('edit-reg-category').value;
            const amount = parseFloat(document.getElementById('edit-reg-amount').value) || 0;
            const status = document.getElementById('edit-reg-status').value;
            const ref = document.getElementById('edit-reg-ref').value.trim();

            const wasPaid = reg.paymentStatus === 'paid' || reg.status === 'paid';
            const currentRegStatus = reg.registrationStatus === 'rejected' ? 'rejected' : (reg.registrationStatus || 'approved');

            store.update('memberPayments', regId, {
              amount,
              status,
              reference: ref,
              category,
              registrationStatus: currentRegStatus,
              paymentStatus: status === 'paid' ? 'paid' : (status === 'pending' && wasPaid ? 'unpaid' : (reg.paymentStatus || 'unpaid'))
            });

            // If marked as paid, also record income in club finances
            if (status === 'paid' && !wasPaid && currentRegStatus === 'approved') {
              store.create('finances', {
                clubId,
                type: 'income',
                category: 'Events',
                amount,
                date: new Date().toISOString().split('T')[0],
                description: `Event Registration: ${event?.name} - Member ${reg.name}`,
                reference: ref || 'Admin Override'
              });
            }

            showToast('success', 'Registration Updated', `Registration details for ${reg.name} updated.`);
            close();
            render();
          }
        });
      });
    });

    // Delete Member Registration
    document.querySelectorAll('.delete-mem-reg-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const regId = btn.dataset.regId;
        const reg = store.getById('memberPayments', regId);
        if (!reg) return;

        showConfirm('Cancel Registration', `Are you sure you want to remove registration for <strong>${reg.name}</strong>? This will remove them from the event.`, () => {
          store.delete('memberPayments', regId);
          showToast('success', 'Registration Cancelled', `${reg.name}'s registration has been removed.`);
          render();
        });
      });
    });
  }

  render();
}
