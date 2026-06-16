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
                <h1>District Events & Payments</h1>
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
                const confirmedRegsCount = clubMemberRegs.length;
                const paidToClubCount = clubMemberRegs.filter(r => r.status === 'paid').length;
                
                // Owed calculations
                const feePerMember = event.fee || 0;
                const totalOwedToDistrict = confirmedRegsCount * feePerMember;
                const totalReceivedFromMembers = clubMemberRegs.filter(r => r.status === 'paid').reduce((sum, r) => sum + r.amount, 0);

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
                    ${clubMemberRegs.length > 0 ? `
                      <div style="margin-top:16px;">
                        <details style="border: 1px solid var(--color-border); border-radius:8px; background:rgba(255,255,255,0.01);">
                          <summary style="padding:10px 14px; font-size:12px; font-weight:600; cursor:pointer; color:var(--color-text-primary);">View Member Registrations & Receipts (${confirmedRegsCount})</summary>
                          <div style="padding:0 14px 14px;">
                            <table class="data-table" style="font-size:12px; margin-top:10px;">
                              <thead>
                                <tr>
                                  <th>Member Name</th>
                                  <th>Registered At</th>
                                  <th>Amount Paid</th>
                                  <th>Payment Status</th>
                                  <th>Reference</th>
                                </tr>
                              </thead>
                              <tbody>
                                ${clubMemberRegs.map(reg => `
                                  <tr>
                                    <td style="font-weight:600;">${reg.name}</td>
                                    <td>${new Date(reg.date).toLocaleDateString()}</td>
                                    <td>Rs. ${reg.amount.toLocaleString()}</td>
                                    <td><span class="badge ${reg.status === 'paid' ? 'badge-success' : 'badge-danger'}">${reg.status === 'paid' ? 'Paid to Club' : 'Dues Pending'}</span></td>
                                    <td>${reg.reference || '—'}</td>
                                  </tr>
                                `).join('')}
                              </tbody>
                            </table>
                          </div>
                        </details>
                      </div>
                    ` : ''}

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
  }

  render();
}
