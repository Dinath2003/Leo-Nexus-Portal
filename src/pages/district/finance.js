// ============================================
// LEO NEXUS PORTAL — DISTRICT FINANCE
// ============================================

import { store } from '../../store.js';
import { auth } from '../../auth.js';
import { router } from '../../router.js';
import { renderSidebar, initSidebar } from '../../components/sidebar.js';
import { renderHeader, initHeader } from '../../components/header.js';
import { createChart, destroyAllCharts } from '../../components/charts.js';
import { renderTable } from '../../components/table.js';
import { showToast } from '../../components/toast.js';
import { showModal, showConfirm } from '../../components/modal.js';

function getTransactionFormHtml(data = {}) {
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Type *</label>
        <select class="form-select" id="txn-type">
          <option value="income" ${data.type === 'income' ? 'selected' : ''}>Income</option>
          <option value="expense" ${data.type === 'expense' ? 'selected' : ''}>Expense</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-select" id="txn-category">
          ${['Membership Fees', 'Sponsorship', 'Donations', 'Events', 'Administration', 'Travel', 'Other']
            .map(c => `<option value="${c}" ${data.category === c ? 'selected' : ''}>${c}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Amount (Rs.) *</label>
        <input type="number" class="form-input" id="txn-amount" placeholder="0.00" value="${data.amount || ''}" min="0" step="0.01" />
      </div>
      <div class="form-group">
        <label class="form-label">Date *</label>
        <input type="date" class="form-input" id="txn-date" value="${data.date || new Date().toISOString().split('T')[0]}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description *</label>
      <textarea class="form-textarea" id="txn-description" rows="2" placeholder="District transaction description...">${data.description || ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Reference</label>
      <input type="text" class="form-input" id="txn-reference" placeholder="e.g. DIST-INV-001" value="${data.reference || ''}" />
    </div>
  `;
}

function getFormData() {
  const type = document.getElementById('txn-type').value;
  const category = document.getElementById('txn-category').value;
  const amount = parseFloat(document.getElementById('txn-amount').value);
  const date = document.getElementById('txn-date').value;
  const description = document.getElementById('txn-description').value.trim();
  const reference = document.getElementById('txn-reference').value.trim();

  if (!amount || amount <= 0) { showToast('error', 'Validation Error', 'Please enter a valid amount.'); return null; }
  if (!date) { showToast('error', 'Validation Error', 'Please select a date.'); return null; }
  if (!description) { showToast('error', 'Validation Error', 'Please enter a description.'); return null; }

  return { type, category, amount, date, description, reference, clubId: 'district' };
}

function getInvoiceFormHtml(invoice = null) {
  const clubs = store.getAll('clubs');
  const nextNum = invoice?.invoiceNumber || ('INV-2026-' + String(store.getAll('invoices').length + 1).padStart(3, '0'));
  
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Invoice Number</label>
        <input type="text" class="form-input" id="inv-number" value="${nextNum}" readonly />
      </div>
      <div class="form-group">
        <label class="form-label">Leo Club *</label>
        <select class="form-select" id="inv-club" ${invoice ? 'disabled' : ''}>
          ${clubs.map(c => `<option value="${c.id}" ${invoice?.clubId === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Category *</label>
        <select class="form-select" id="inv-category">
          <option value="Membership Fees" ${invoice?.category === 'Membership Fees' ? 'selected' : ''}>Membership Dues</option>
          <option value="Conference Levy" ${invoice?.category === 'Conference Levy' ? 'selected' : ''}>Conference Levy</option>
          <option value="Materials" ${invoice?.category === 'Materials' ? 'selected' : ''}>Materials & PR Items</option>
          <option value="Other" ${invoice?.category === 'Other' ? 'selected' : ''}>Other Fees</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Amount (Rs.) *</label>
        <input type="number" class="form-input" id="inv-amount" placeholder="0.00" min="1" step="1" value="${invoice?.amount || ''}" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Issue Date *</label>
        <input type="date" class="form-input" id="inv-issue-date" value="${invoice?.issueDate || new Date().toISOString().split('T')[0]}" />
      </div>
      <div class="form-group">
        <label class="form-label">Due Date *</label>
        <input type="date" class="form-input" id="inv-due-date" value="${invoice?.dueDate || new Date(Date.now() + 30*24*60*60*1000).toISOString().split('T')[0]}" />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Description *</label>
      <textarea class="form-textarea" id="inv-description" rows="2" placeholder="e.g. Annual membership dues based on 30 active members...">${invoice?.description || ''}</textarea>
    </div>
  `;
}

function getInvoiceFormData(invoice = null) {
  const invoiceNumber = document.getElementById('inv-number').value;
  const clubId = document.getElementById('inv-club').value;
  const category = document.getElementById('inv-category').value;
  const amount = parseFloat(document.getElementById('inv-amount').value);
  const issueDate = document.getElementById('inv-issue-date').value;
  const dueDate = document.getElementById('inv-due-date').value;
  const description = document.getElementById('inv-description').value.trim();

  if (!amount || amount <= 0) { showToast('error', 'Validation Error', 'Please enter a valid amount.'); return null; }
  if (!issueDate) { showToast('error', 'Validation Error', 'Please select an issue date.'); return null; }
  if (!dueDate) { showToast('error', 'Validation Error', 'Please select a due date.'); return null; }
  if (!description) { showToast('error', 'Validation Error', 'Please enter a description.'); return null; }

  const club = store.getById('clubs', clubId);

  return {
    invoiceNumber,
    clubId,
    clubName: club?.name || 'Unknown Club',
    category,
    amount,
    issueDate,
    dueDate,
    description,
    status: invoice?.status || 'unpaid',
    receiptUrl: invoice?.receiptUrl || '',
    reference: invoice?.reference || '',
    remarks: invoice?.remarks || '',
    eventId: invoice?.eventId || null
  };
}

function getBSItemFormHtml(item = {}) {
  return `
    <div class="form-group">
      <label class="form-label">Item Name *</label>
      <input type="text" class="form-input" id="bs-name" placeholder="e.g. Headquarters Office Printer" value="${item.name || ''}" required />
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Classification Type *</label>
        <select class="form-select" id="bs-type">
          <option value="asset" ${item.type === 'asset' ? 'selected' : ''}>Asset (Property/Claims)</option>
          <option value="liability" ${item.type === 'liability' ? 'selected' : ''}>Liability (Obligation/Debt)</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Valuation Amount (Rs.) *</label>
        <input type="number" class="form-input" id="bs-amount" placeholder="0.00" value="${item.amount || ''}" min="0" step="0.01" required />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Effective Date *</label>
        <input type="date" class="form-input" id="bs-date" value="${item.date || new Date().toISOString().split('T')[0]}" required />
      </div>
      <div class="form-group">
        <label class="form-label">Notes</label>
        <input type="text" class="form-input" id="bs-notes" placeholder="e.g. Asset depreciation 10% annually" value="${item.notes || ''}" />
      </div>
    </div>
  `;
}

function getBSItemFormData() {
  const name = document.getElementById('bs-name').value.trim();
  const type = document.getElementById('bs-type').value;
  const amount = parseFloat(document.getElementById('bs-amount').value);
  const date = document.getElementById('bs-date').value;
  const notes = document.getElementById('bs-notes').value.trim();

  if (!name) { showToast('error', 'Validation Error', 'Please enter a name.'); return null; }
  if (!amount || amount <= 0) { showToast('error', 'Validation Error', 'Please enter a valid amount.'); return null; }
  if (!date) { showToast('error', 'Validation Error', 'Please select a date.'); return null; }

  return { name, type, amount, date, notes };
}

function getManualDueFormHtml() {
  const clubs = store.getAll('clubs');
  return `
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Leo Club *</label>
        <select class="form-select" id="due-club">
          ${clubs.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
        </select>
      </div>
      <div class="form-group">
        <label class="form-label">Type of Payment *</label>
        <select class="form-select" id="due-category">
          <option value="Membership Fees">Membership Dues Collection</option>
          <option value="Conference Levy">Conference Levy Collection</option>
          <option value="Events">Event Registration Collection</option>
          <option value="Other">Other Club Payments</option>
        </select>
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label class="form-label">Amount Paid (Rs.) *</label>
        <input type="number" class="form-input" id="due-amount" placeholder="0.00" min="0" step="0.01" required />
      </div>
      <div class="form-group">
        <label class="form-label">Payment Date *</label>
        <input type="date" class="form-input" id="due-date" value="${new Date().toISOString().split('T')[0]}" required />
      </div>
    </div>
    <div class="form-group">
      <label class="form-label">Bank Reference / TXN ID *</label>
      <input type="text" class="form-input" id="due-reference" placeholder="e.g. BT-9812739" required />
    </div>
    <div class="form-group">
      <label class="form-label">Remarks / Description *</label>
      <textarea class="form-textarea" id="due-description" rows="2" placeholder="Direct bank transfer for 2nd Semi-Annual Dues" required></textarea>
    </div>
  `;
}

function getManualDueFormData() {
  const clubId = document.getElementById('due-club').value;
  const category = document.getElementById('due-category').value;
  const amount = parseFloat(document.getElementById('due-amount').value);
  const date = document.getElementById('due-date').value;
  const reference = document.getElementById('due-reference').value.trim();
  const description = document.getElementById('due-description').value.trim();

  if (!amount || amount <= 0) { showToast('error', 'Validation Error', 'Please enter a valid amount.'); return null; }
  if (!date) { showToast('error', 'Validation Error', 'Please select a date.'); return null; }
  if (!reference) { showToast('error', 'Validation Error', 'Please enter a bank reference.'); return null; }
  if (!description) { showToast('error', 'Validation Error', 'Please enter a description.'); return null; }

  const clubName = store.getById('clubs', clubId)?.name || 'Leo Club';

  return { clubId, category, amount, date, reference, description, clubName };
}

function openExportStatementModal(finances) {
  const modalHtml = `
    <div style="font-family: var(--font-body); display:flex; flex-direction:column; gap:16px;">
      <p style="font-size:13px; color:var(--color-text-secondary); margin:0; line-height:1.5;">
        Generate and export the District General Ledger mapped to the <strong>Lions Clubs International (LCI) Standard Chart of Accounts</strong> for global secretariat reporting.
      </p>
      
      <div class="form-row">
        <div class="form-group">
          <label class="form-label">LCI Exchange Rate Reference *</label>
          <div style="display:flex; align-items:center; gap:8px;">
            <span style="font-size:13px; color:var(--color-text-secondary);">1 USD = Rs. </span>
            <input type="number" class="form-input" id="export-rate" value="300.00" min="1" step="0.01" style="max-width:120px;" />
          </div>
        </div>
        <div class="form-group">
          <label class="form-label">LCI Account Standard *</label>
          <select class="form-select" id="export-standard">
            <option value="lci-2026">LCI Chart of Accounts (2026/27)</option>
            <option value="district-local">Local District Adaptations</option>
          </select>
        </div>
      </div>

      <div style="border: 1px solid var(--color-border); border-radius: var(--radius-md); padding: 12px; background: rgba(0,0,0,0.15); max-height:220px; overflow-y:auto;">
        <h4 style="margin:0 0 10px; font-size:12px; font-weight:700; color:var(--color-primary); text-transform:uppercase; letter-spacing:0.5px; font-family:var(--font-display);">LCI Account Statement Preview</h4>
        <div style="font-family:monospace; font-size:11px; display:flex; flex-direction:column; gap:8px; color:var(--color-text-secondary);">
          <div style="display:flex; justify-content:space-between; border-bottom:1px solid rgba(255,255,255,0.06); padding-bottom:4px; font-weight:700; color:var(--color-text-primary);">
            <span>LCI Account Code</span>
            <span>Local (LKR)</span>
            <span>Converted (USD)</span>
          </div>
          ${(() => {
            const categories = [
              { code: '4010-01 (Club Dues Collection)', cat: 'Membership Fees', type: 'income' },
              { code: '4120-03 (Activity Sponsors)', cat: 'Sponsorship', type: 'income' },
              { code: '4130-05 (Public Contributions)', cat: 'Donations', type: 'income' },
              { code: '4250-02 (Convention Dues)', cat: 'Events', type: 'income' },
              { code: '5020-01 (Admin Overhead)', cat: 'Administration', type: 'expense' },
              { code: '5030-04 (Executive Travel)', cat: 'Travel', type: 'expense' },
              { code: '5120-02 (Seminar Costs)', cat: 'Events', type: 'expense' }
            ];
            return categories.map(c => {
              const totalCat = finances.filter(f => f.type === c.type && f.category === c.cat).reduce((sum, f) => sum + f.amount, 0);
              if (totalCat === 0) return '';
              return `
                <div style="display:flex; justify-content:space-between; align-items:center;">
                  <span>${c.code}</span>
                  <span style="color:var(--color-text-primary);">Rs. ${totalCat.toLocaleString()}</span>
                  <span style="color:#14b8a6; font-weight:600;" class="preview-usd-val" data-lkr="${totalCat}">$${(totalCat / 300).toFixed(2)}</span>
                </div>
              `;
            }).join('');
          })()}
        </div>
      </div>

      <div style="display:flex; gap:10px; justify-content:flex-end; margin-top:8px;">
        <button class="btn btn-secondary" id="export-cancel-btn">Cancel</button>
        <button class="btn btn-primary" id="export-download-btn"><i data-lucide="download" style="width:16px;height:16px;margin-right:4px;vertical-align:-2px;"></i> Download CSV Statement</button>
      </div>
    </div>
  `;

  const closeExportModal = showModal('LCI Standard Financial Statement Exporter', modalHtml, {
    showFooter: false,
    size: 'md'
  });

  document.getElementById('export-cancel-btn').addEventListener('click', closeExportModal);

  // Dynamic exchange rate preview recalculation
  const rateInput = document.getElementById('export-rate');
  rateInput.addEventListener('input', () => {
    const rate = parseFloat(rateInput.value) || 300;
    document.querySelectorAll('.preview-usd-val').forEach(el => {
      const lkr = parseFloat(el.dataset.lkr);
      el.textContent = `$${(lkr / rate).toFixed(2)}`;
    });
  });

  // Export CSV
  document.getElementById('export-download-btn').addEventListener('click', () => {
    const rate = parseFloat(rateInput.value) || 300;
    const headers = ['LCI Account Code', 'Date', 'Type', 'Category', 'Description', 'Reference Code', 'Amount (LKR)', 'Amount (USD)'];
    const rows = finances.map(f => {
      let lciCode = '5999 (Suspense Account)';
      if (f.type === 'income') {
        if (f.category === 'Membership Fees') lciCode = '4010-01 (Club Dues)';
        else if (f.category === 'Sponsorship') lciCode = '4120-03 (Activity Sponsors)';
        else if (f.category === 'Donations') lciCode = '4130-05 (Public Contributions)';
        else if (f.category === 'Events') lciCode = '4250-02 (Convention Fees)';
      } else {
        if (f.category === 'Administration') lciCode = '5020-01 (Admin Overhead)';
        else if (f.category === 'Travel') lciCode = '5030-04 (Executive Travel)';
        else if (f.category === 'Events') lciCode = '5120-02 (Seminar Costs)';
      }
      const amtUSD = (f.amount / rate).toFixed(2);
      return [
        lciCode,
        f.date,
        f.type.toUpperCase(),
        f.category,
        `"${f.description.replace(/"/g, '""')}"`,
        f.reference || 'N/A',
        f.amount,
        amtUSD
      ].join(',');
    });

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `lci_district_finance_statement_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast('success', 'Download Started', 'LCI Financial Statement exported successfully as CSV.');
    closeExportModal();
  });
}

export function renderDistrictFinance() {
  const app = document.getElementById('app');
  
  const isDistrictExec = auth.isDistrictUser;
  const canEdit = isDistrictExec;
  const canCreate = isDistrictExec;
  const canDelete = isDistrictExec;

  function render(activeTab = 'overview', searchFilter = '', clubFilter = 'all', statusFilter = 'all') {
    const finances = store.getByField('finances', 'clubId', 'district');
    
    // Calculate district summaries
    const income = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
    const expenses = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
    const balance = income - expenses;

    // Receivables are pending club consolidated payments
    const clubPayments = store.getAll('clubPayments');
    const totalReceivablesAmt = clubPayments.filter(cp => cp.status === 'pending').reduce((sum, cp) => sum + cp.amount, 0);

    // Balance Sheet custom items
    const bsItems = store.getAll('balanceSheetItems').filter(i => i.clubId === 'district');
    const customAssets = bsItems.filter(i => i.type === 'asset');
    const customLiabilities = bsItems.filter(i => i.type === 'liability');
    const sumCustomAssets = customAssets.reduce((sum, i) => sum + i.amount, 0);
    const sumCustomLiabilities = customLiabilities.reduce((sum, i) => sum + i.amount, 0);

    const totalAssets = balance + totalReceivablesAmt + sumCustomAssets;
    const totalLiabilities = sumCustomLiabilities;
    const netFunds = totalAssets - totalLiabilities;

    // Filter transaction list
    let filteredFinances = [...finances];
    if (searchFilter) {
      const q = searchFilter.toLowerCase();
      filteredFinances = filteredFinances.filter(f => 
        f.description.toLowerCase().includes(q) || 
        f.category.toLowerCase().includes(q) ||
        (f.reference || '').toLowerCase().includes(q)
      );
    }
    const sortedFinances = filteredFinances.sort((a, b) => new Date(b.date) - new Date(a.date));

    app.innerHTML = `
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('District Finance', ['Performance', 'Finance'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <span class="section-badge" style="margin-bottom:0.5rem;display:inline-block;">TREASURY COMMAND</span>
                <h1 style="margin:0;">District Wallet & Finance</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Monitor district ledger, approve club dues, and verify income statements</p>
              </div>
              <div class="page-header-actions" style="display:flex; gap:10px;">
                <button class="btn btn-secondary" id="export-finance-btn"><i data-lucide="download" style="width:16px;height:16px"></i> Export Statement</button>
                ${canCreate ? (() => {
                  if (activeTab === 'balance_sheet') {
                    return `<button class="btn btn-primary" id="add-bs-item-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> Add Balance Sheet Item</button>`;
                  } else if (activeTab === 'club_dues') {
                    return `<button class="btn btn-primary" id="add-club-due-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> Record Manual Club Dues</button>`;
                  } else if (activeTab !== 'invoices' && activeTab !== 'club_wallets') {
                    return `<button class="btn btn-primary" id="add-txn-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> Add Transaction</button>`;
                  }
                  return '';
                })() : ''}
              </div>
            </div>

            <!-- Financial Summary Cards -->
            <div class="stats-grid stagger-enter" style="animation-delay:0.05s">
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(20,184,166,0.12);color:#14b8a6;"><i data-lucide="trending-up"></i></div>
                <div class="stat-value" style="color:#14b8a6;">Rs. ${income.toLocaleString()}</div>
                <div class="stat-label">District Revenue</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);color:#ef4444;"><i data-lucide="trending-down"></i></div>
                <div class="stat-value" style="color:#ef4444;">Rs. ${expenses.toLocaleString()}</div>
                <div class="stat-label">District Expenses</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);color:var(--color-primary);"><i data-lucide="wallet"></i></div>
                <div class="stat-value" style="color:${balance >= 0 ? '#14b8a6' : '#ef4444'};">Rs. ${balance.toLocaleString()}</div>
                <div class="stat-label">Net Balance</div>
              </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="tabs-container stagger-enter" style="margin-top:24px; display:flex; gap:8px; border-bottom:1px solid var(--color-border); padding-bottom:8px; overflow-x:auto;">
              <button class="btn tab-btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}" data-tab="overview">Overview</button>
              <button class="btn tab-btn ${activeTab === 'balance_sheet' ? 'btn-primary' : 'btn-ghost'}" data-tab="balance_sheet">Balance Sheet</button>
              <button class="btn tab-btn ${activeTab === 'income_exp' ? 'btn-primary' : 'btn-ghost'}" data-tab="income_exp">Income & Expenditure</button>
              <button class="btn tab-btn ${activeTab === 'ledger' ? 'btn-primary' : 'btn-ghost'}" data-tab="ledger">Payments & Receipts Ledger</button>
              <button class="btn tab-btn ${activeTab === 'club_dues' ? 'btn-primary' : 'btn-ghost'}" data-tab="club_dues">Club Dues Review</button>
              <button class="btn tab-btn ${activeTab === 'invoices' ? 'btn-primary' : 'btn-ghost'}" data-tab="invoices">Invoices Management</button>
              <button class="btn tab-btn ${activeTab === 'club_wallets' ? 'btn-primary' : 'btn-ghost'}" data-tab="club_wallets">Club Wallets</button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content-container stagger-enter" style="margin-top:20px;">
              
              ${activeTab === 'overview' ? `
                <!-- Overview: Charts & Recent Transactions -->
                <div class="grid-2" style="margin-bottom:20px;">
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="bar-chart-3" style="width:18px;height:18px"></i> District Monthly Trend</h3></div>
                    <div class="card-body"><div class="chart-container" style="height:260px;"><canvas id="finance-monthly-chart"></canvas></div></div>
                  </div>
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="pie-chart" style="width:18px;height:18px"></i> Income Categories</h3></div>
                    <div class="card-body"><div class="chart-container" style="height:260px;"><canvas id="finance-category-chart"></canvas></div></div>
                  </div>
                </div>

                <!-- Search/Filter Toolbar -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                  <div class="search-bar" style="max-width:300px; flex:1;">
                    <i data-lucide="search" class="search-icon"></i>
                    <input type="text" placeholder="Search transactions..." id="txn-search-input" value="${searchFilter}" />
                  </div>
                  <div style="font-size:13px; color:var(--color-text-muted);">${sortedFinances.length} transaction(s) found</div>
                </div>

                <!-- Ledger list -->
                <div class="card">
                  <div class="card-body" style="padding:0;">
                    ${renderTable(
                      [
                        { label: 'Date', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                        { label: 'Type', key: 'type', render: row => `<span class="badge ${row.type === 'income' ? 'badge-success' : 'badge-danger'}">${row.type}</span>` },
                        { label: 'Category', key: 'category' },
                        { label: 'Description', key: 'description' },
                        { label: 'Reference', key: 'reference', render: row => row.reference || '—' },
                        { label: 'Amount', key: 'amount', render: row => `<span style="font-weight:600;color:${row.type === 'income' ? '#14b8a6' : '#ef4444'};">${row.type === 'income' ? '+' : '-'} Rs. ${row.amount.toLocaleString()}</span>` },
                      ],
                      sortedFinances,
                      {
                        emptyMessage: 'No transactions match the criteria',
                        actions: (canEdit || canDelete) ? (row) => `
                          ${canEdit ? `<button class="btn btn-ghost btn-sm btn-icon edit-txn" data-id="${row.id}" title="Edit"><i data-lucide="pencil" style="width:14px;height:14px"></i></button>` : ''}
                          ${canDelete ? `<button class="btn btn-ghost btn-sm btn-icon delete-txn" data-id="${row.id}" title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px"></i></button>` : ''}
                        ` : undefined
                      }
                    )}
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'balance_sheet' ? `
                <!-- Balance Sheet -->
                <div class="card hover-lift" style="max-width:700px; margin: 0 auto;">
                  <div class="card-header" style="text-align:center;">
                    <h2 style="margin:0; font-size:18px;">District Balance Sheet</h2>
                    <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Leo District 306 B2 | Leoistic Year 2026/2027</div>
                  </div>
                  <div class="card-body">
                    <!-- ASSETS -->
                    <div style="margin-bottom:24px;">
                      <h4 style="margin:0 0 10px; font-size:14px; border-bottom:1px solid var(--color-border); padding-bottom:6px; color:var(--color-primary);">1. ASSETS</h4>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                        <span>Cash & Bank Balances (District Treasury)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${balance.toLocaleString()}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                        <span>Receivables (Dues from Leo Clubs)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${totalReceivablesAmt.toLocaleString()}</span>
                      </div>
                      
                      <!-- Custom Assets -->
                      ${customAssets.map(item => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                          <span>${item.name} (${new Date(item.date).toLocaleDateString()})</span>
                          <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${item.amount.toLocaleString()}</span>
                            ${canEdit ? `
                              <button class="btn btn-ghost btn-xs btn-icon edit-bs-item" data-id="${item.id}" style="padding:2px; height:auto; width:auto;" title="Edit"><i data-lucide="pencil" style="width:12px;height:12px"></i></button>
                              <button class="btn btn-ghost btn-xs btn-icon delete-bs-item" data-id="${item.id}" style="padding:2px; height:auto; width:auto;" title="Delete"><i data-lucide="trash-2" style="width:12px;height:12px;color:var(--color-danger)"></i></button>
                            ` : ''}
                          </div>
                        </div>
                      `).join('')}

                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary); border-top: 1px dashed var(--color-border); margin-top:8px;">
                        <span>Total Assets</span>
                        <span>Rs. ${totalAssets.toLocaleString()}</span>
                      </div>
                    </div>

                    <!-- LIABILITIES -->
                    <div style="margin-bottom:24px;">
                      <h4 style="margin:0 0 10px; font-size:14px; border-bottom:1px solid var(--color-border); padding-bottom:6px; color:#ef4444;">2. LIABILITIES</h4>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                        <span>Accounts Payable (District obligation)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. 0</span>
                      </div>
                      
                      <!-- Custom Liabilities -->
                      ${customLiabilities.map(item => `
                        <div style="display:flex; justify-content:space-between; align-items:center; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                          <span>${item.name} (${new Date(item.date).toLocaleDateString()})</span>
                          <div style="display:flex; align-items:center; gap:8px;">
                            <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${item.amount.toLocaleString()}</span>
                            ${canEdit ? `
                              <button class="btn btn-ghost btn-xs btn-icon edit-bs-item" data-id="${item.id}" style="padding:2px; height:auto; width:auto;" title="Edit"><i data-lucide="pencil" style="width:12px;height:12px"></i></button>
                              <button class="btn btn-ghost btn-xs btn-icon delete-bs-item" data-id="${item.id}" style="padding:2px; height:auto; width:auto;" title="Delete"><i data-lucide="trash-2" style="width:12px;height:12px;color:var(--color-danger)"></i></button>
                            ` : ''}
                          </div>
                        </div>
                      `).join('')}

                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary); border-top: 1px dashed var(--color-border); margin-top:8px;">
                        <span>Total Liabilities</span>
                        <span>Rs. ${totalLiabilities.toLocaleString()}</span>
                      </div>
                    </div>

                    <!-- ACCUMULATED FUNDS -->
                    <div style="border-top:2px solid var(--color-border); padding-top:14px; display:flex; justify-content:space-between; font-size:16px; font-weight:800; color:var(--color-text-primary);">
                      <span>Total Net Treasury Funds</span>
                      <span style="color:#14b8a6;">Rs. ${netFunds.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'income_exp' ? `
                <!-- Income & Expenditure Sheet -->
                <div class="grid-2">
                  <!-- Income Categories -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#14b8a6;"><i data-lucide="arrow-up-right"></i> District Income</h3></div>
                    <div class="card-body">
                      ${['Membership Fees', 'Sponsorship', 'Donations', 'Events', 'Other'].map(cat => {
                        const totalCat = finances.filter(f => f.type === 'income' && f.category === cat).reduce((sum, f) => sum + f.amount, 0);
                        return `
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                            <span style="color:var(--color-text-secondary); font-weight:500;">${cat}</span>
                            <span style="font-weight:700; color:var(--color-text-primary);">Rs. ${totalCat.toLocaleString()}</span>
                          </div>
                        `;
                      }).join('')}
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0 0; font-size:15px; font-weight:800; color:#14b8a6;">
                        <span>Total Income</span>
                        <span>Rs. ${income.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Expense Categories -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#ef4444;"><i data-lucide="arrow-down-right"></i> District Expenses</h3></div>
                    <div class="card-body">
                      ${['Administration', 'Events', 'Travel', 'Other'].map(cat => {
                        const totalCat = finances.filter(f => f.type === 'expense' && f.category === cat).reduce((sum, f) => sum + f.amount, 0);
                        return `
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                            <span style="color:var(--color-text-secondary); font-weight:500;">${cat}</span>
                            <span style="font-weight:700; color:var(--color-text-primary);">Rs. ${totalCat.toLocaleString()}</span>
                          </div>
                        `;
                      }).join('')}
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0 0; font-size:15px; font-weight:800; color:#ef4444;">
                        <span>Total Expense</span>
                        <span>Rs. ${expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Surplus / Deficit Card -->
                <div class="card hover-lift" style="margin-top:20px; border-color:${balance >= 0 ? '#14b8a6' : '#ef4444'};">
                  <div class="card-body" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                      <h3 style="margin:0; font-size:16px; color:var(--color-text-primary);">Statement Net Treasury Surplus</h3>
                    </div>
                    <div style="font-size:24px; font-weight:800; color:${balance >= 0 ? '#14b8a6' : '#ef4444'}">
                      Rs. ${balance.toLocaleString()}
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'ledger' ? `
                <!-- Ledger view (General Journal) -->
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i data-lucide="book-open" style="color:var(--color-primary)"></i> District General Ledger</h3>
                  </div>
                  <div class="card-body" style="padding:0;">
                    ${renderTable(
                      [
                        { label: 'TXN ID', key: 'id' },
                        { label: 'Date', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                        { label: 'Account Type', key: 'type', render: row => `<span style="font-weight:700; text-transform:uppercase; color:${row.type==='income'?'#14b8a6':'#ef4444'};">${row.type}</span>` },
                        { label: 'Category', key: 'category' },
                        { label: 'Ref Code', key: 'reference', render: row => row.reference || '—' },
                        { label: 'Description', key: 'description' },
                        { label: 'Debit (Dr)', render: row => row.type === 'expense' ? `Rs. ${row.amount.toLocaleString()}` : '—' },
                        { label: 'Credit (Cr)', render: row => row.type === 'income' ? `Rs. ${row.amount.toLocaleString()}` : '—' },
                      ],
                      sortedFinances,
                      { emptyMessage: 'District general ledger is empty' }
                    )}
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'club_dues' ? `
                <!-- Pending Club Payments Review -->
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i data-lucide="check-square" style="color:#f59e0b"></i> Dues Pending Verification</h3>
                  </div>
                  <div class="card-body" style="padding:0;">
                    ${renderTable(
                      [
                        { label: 'Date Submitted', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                        { label: 'Club', key: 'clubId', render: row => {
                          const club = store.getById('clubs', row.clubId);
                          return `<strong>${club?.name || row.clubId}</strong>`;
                        }},
                        { label: 'Event Name', key: 'eventId', render: row => {
                          const evt = store.getById('events', row.eventId);
                          return evt?.name || row.eventId;
                        }},
                        { label: 'Members Count', key: 'registeredCount', render: row => `${row.registeredCount} members` },
                        { label: 'Transaction Code', key: 'reference' },
                        { label: 'Receipt File', key: 'receiptUrl', render: row => `📄 ${row.receiptUrl}` },
                        { label: 'Consolidated Fee', key: 'amount', render: row => `<span style="font-weight:700; color:#14b8a6;">Rs. ${row.amount.toLocaleString()}</span>` },
                        { label: 'Status', key: 'status', render: row => `<span class="badge badge-warning">Verification Pending</span>` }
                      ],
                      clubPayments.filter(cp => cp.status === 'pending'),
                      { 
                        emptyMessage: 'No pending club receipts to verify',
                        actions: (row) => `
                          <button class="btn btn-primary btn-xs verify-action-btn" data-pay-id="${row.id}">Verify Receipt</button>
                        `
                      }
                    )}
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'invoices' ? (() => {
                const invoices = store.getAll('invoices');
                
                // Calculate invoice summaries
                const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
                const totalCollected = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
                const totalOutstanding = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0);

                // Filter invoices
                let filteredInvoices = [...invoices];
                if (searchFilter) {
                  const q = searchFilter.toLowerCase();
                  filteredInvoices = filteredInvoices.filter(inv => 
                    inv.invoiceNumber.toLowerCase().includes(q) || 
                    inv.description.toLowerCase().includes(q)
                  );
                }
                if (clubFilter && clubFilter !== 'all') {
                  filteredInvoices = filteredInvoices.filter(inv => inv.clubId === clubFilter);
                }
                if (statusFilter && statusFilter !== 'all') {
                  filteredInvoices = filteredInvoices.filter(inv => inv.status === statusFilter);
                }
                const sortedInvoices = filteredInvoices.sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate));

                return `
                  <!-- Summary Stats -->
                  <div class="grid-3" style="margin-bottom: 20px;">
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(0,212,255,0.1); color:#00d4ff; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="file-text"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Total Billed</div>
                        <div style="font-size:18px; font-weight:700; color:var(--color-text-primary);">Rs. ${totalInvoiced.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,0.1); color:#14b8a6; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="check-circle-2"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Total Collected</div>
                        <div style="font-size:18px; font-weight:700; color:#14b8a6;">Rs. ${totalCollected.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(239,68,68,0.1); color:#ef4444; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="alert-circle"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Total Outstanding</div>
                        <div style="font-size:18px; font-weight:700; color:#ef4444;">Rs. ${totalOutstanding.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Invoice Filters -->
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                    <div style="display:flex; gap:10px; flex:1; max-width:600px;">
                      <div class="search-bar" style="flex:1;">
                        <i data-lucide="search" class="search-icon"></i>
                        <input type="text" placeholder="Search invoice..." id="invoice-search-input" value="${searchFilter}" />
                      </div>
                      <select class="form-select" id="invoice-club-filter" style="max-width:180px;">
                        <option value="all" ${clubFilter === 'all' ? 'selected' : ''}>All Clubs</option>
                        ${store.getAll('clubs').map(c => `<option value="${c.id}" ${clubFilter === c.id ? 'selected' : ''}>${c.name}</option>`).join('')}
                      </select>
                      <select class="form-select" id="invoice-status-filter" style="max-width:150px;">
                        <option value="all" ${statusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
                        <option value="unpaid" ${statusFilter === 'unpaid' ? 'selected' : ''}>Unpaid</option>
                        <option value="pending" ${statusFilter === 'pending' ? 'selected' : ''}>Pending</option>
                        <option value="paid" ${statusFilter === 'paid' ? 'selected' : ''}>Paid</option>
                      </select>
                    </div>
                    ${canCreate ? `
                      <button class="btn btn-primary" id="create-invoice-btn">
                        <i data-lucide="plus" style="width:16px;height:16px"></i> Issue Invoice
                      </button>
                    ` : ''}
                  </div>

                  <!-- Invoices Table -->
                  <div class="card">
                    <div class="card-body" style="padding:0;">
                      ${renderTable(
                        [
                          { label: 'Invoice No.', key: 'invoiceNumber', render: row => `<strong class="glow-text" style="color:var(--color-primary)">${row.invoiceNumber}</strong>` },
                          { label: 'Club', key: 'clubName', render: row => `<strong>${row.clubName}</strong>` },
                          { label: 'Category', key: 'category' },
                          { label: 'Description', key: 'description' },
                          { label: 'Amount', key: 'amount', render: row => `<strong>Rs. ${row.amount.toLocaleString()}</strong>` },
                          { label: 'Due Date', key: 'dueDate', render: row => {
                            const isOverdue = row.status === 'unpaid' && new Date(row.dueDate) < new Date();
                            return `<span style="${isOverdue ? 'color:#ef4444; font-weight:600;' : ''}">${new Date(row.dueDate).toLocaleDateString()} ${isOverdue ? '(Overdue)' : ''}</span>`;
                          }},
                          { label: 'Status', key: 'status', render: row => {
                            let badgeClass = 'badge-secondary';
                            let statusLabel = 'Unpaid';
                            if (row.status === 'paid') { badgeClass = 'badge-success'; statusLabel = 'Paid'; }
                            else if (row.status === 'pending') { badgeClass = 'badge-warning'; statusLabel = 'Pending Verification'; }
                            return `<span class="badge ${badgeClass}">${statusLabel}</span>`;
                          }}
                        ],
                        sortedInvoices,
                        {
                          emptyMessage: 'No invoices found matching criteria',
                          actions: (row) => `
                            ${row.status === 'pending' ? `<button class="btn btn-primary btn-xs verify-invoice-btn" data-inv-id="${row.id}">Verify Payment</button>` : ''}
                            ${(row.status === 'unpaid' || row.status === 'pending') ? `<button class="btn btn-ghost btn-sm btn-icon edit-invoice-btn" data-inv-id="${row.id}" title="Edit"><i data-lucide="pencil" style="width:14px;height:14px"></i></button>` : ''}
                            ${canDelete && row.status === 'unpaid' ? `<button class="btn btn-ghost btn-sm btn-icon delete-invoice-btn" data-inv-id="${row.id}" title="Delete"><i data-lucide="trash-2" style="width:14px;height:14px;color:var(--color-danger)"></i></button>` : ''}
                          `
                        }
                      )}
                    </div>
                  </div>

                  <!-- Invoice HTML/PDF Template Configuration -->
                  <div class="card hover-lift" style="margin-top: 24px;">
                    <div class="card-header">
                      <h3 class="card-title"><i data-lucide="file-up" style="color:var(--color-primary);"></i> Invoice Template Configuration</h3>
                    </div>
                    <div class="card-body" style="display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:16px;">
                      <div>
                        <div style="font-weight:600; font-size:14px; color:var(--color-text-primary);">Active Bill Layout Design</div>
                        <div style="font-size:12px; color:var(--color-text-secondary); margin-top:4px; display:flex; align-items:center; gap:6px;">
                          <span>File: <strong style="color:var(--color-cyan-glow);" id="active-template-name">${store.getInvoiceTemplate().fileName}</strong></span>
                          <span>·</span>
                          <span>Uploaded: <span id="active-template-date">${new Date(store.getInvoiceTemplate().uploadedAt).toLocaleDateString()}</span></span>
                        </div>
                      </div>
                      
                      <!-- Uploader controls -->
                      <div style="display:flex; align-items:center; gap:12px;">
                        <label class="btn btn-secondary" style="margin:0; cursor:pointer;">
                          <i data-lucide="upload" style="width:16px; height:16px; margin-right:6px; vertical-align:-1px;"></i> Upload Custom Template
                          <input type="file" id="template-file-upload-input" accept=".html,.pdf" style="display:none;" />
                        </label>
                      </div>
                    </div>
                  </div>
                `;
              })() : ''}

              ${activeTab === 'club_wallets' ? (() => {
                const clubs = store.getAll('clubs');
                
                // Filter clubs by search if any
                let filteredClubs = [...clubs];
                if (searchFilter) {
                  const q = searchFilter.toLowerCase();
                  filteredClubs = filteredClubs.filter(c => 
                    c.name.toLowerCase().includes(q) || 
                    c.code.toLowerCase().includes(q)
                  );
                }

                return `
                  <!-- Search/Filter Toolbar -->
                  <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px; margin-bottom:12px;">
                    <div class="search-bar" style="max-width:300px; flex:1;">
                      <i data-lucide="search" class="search-icon"></i>
                      <input type="text" placeholder="Search clubs..." id="club-search-input" value="${searchFilter}" />
                    </div>
                    <div style="font-size:13px; color:var(--color-text-muted);">${filteredClubs.length} club(s) found</div>
                  </div>

                  <!-- Club Wallets Table -->
                  <div class="card">
                    <div class="card-body" style="padding:0;">
                      ${renderTable(
                        [
                          { label: 'Club Name', key: 'name', render: row => `<strong>${row.name}</strong>` },
                          { label: 'Code', key: 'code', render: row => `<code style="color:var(--color-cyan-glow);">${row.code}</code>` },
                          { label: 'Zone/Region', render: row => `Zone ${row.zone} (Region ${row.region})` },
                          { label: 'Wallet Balance', render: row => {
                            const summary = store.getClubFinanceSummary(row.id);
                            return `<span style="font-weight:700; color:${summary.balance >= 0 ? '#14b8a6' : '#ef4444'};">Rs. ${summary.balance.toLocaleString()}</span>`;
                          }},
                          { label: 'Revenue (In)', render: row => {
                            const summary = store.getClubFinanceSummary(row.id);
                            return `<span style="color:#14b8a6;">Rs. ${summary.income.toLocaleString()}</span>`;
                          }},
                          { label: 'Expenses (Out)', render: row => {
                            const summary = store.getClubFinanceSummary(row.id);
                            return `<span style="color:#ef4444;">Rs. ${summary.expenses.toLocaleString()}</span>`;
                          }},
                          { label: 'Status', key: 'status', render: row => `<span class="badge ${row.status === 'active' ? 'badge-success' : 'badge-warning'}">${row.status}</span>` }
                        ],
                        filteredClubs,
                        {
                          emptyMessage: 'No clubs found',
                          actions: (row) => `
                            <button class="btn btn-primary btn-xs view-club-wallet-btn" data-club-id="${row.id}" title="View Ledger"><i data-lucide="book-open" style="width:12px;height:12px;margin-right:2px;vertical-align:-1px;"></i> View Ledger</button>
                          `
                        }
                      )}
                    </div>
                  </div>
                `;
              })() : ''}

            </div>

          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    initSidebar();
    initHeader();
    setupCharts(finances);
    setupEventListeners(activeTab, searchFilter, clubFilter, statusFilter);
  }

  function setupCharts(finances) {
    const canvasMonthly = document.getElementById('finance-monthly-chart');
    const canvasCategory = document.getElementById('finance-category-chart');
    if (!canvasMonthly || !canvasCategory) return;

    // Monthly breakdown
    const monthlyData = {};
    finances.forEach(f => {
      const month = new Date(f.date).toLocaleString('default', { month: 'short', year: '2-digit' });
      if (!monthlyData[month]) monthlyData[month] = { income: 0, expenses: 0 };
      if (f.type === 'income') monthlyData[month].income += f.amount;
      else monthlyData[month].expenses += f.amount;
    });

    const months = Object.keys(monthlyData);
    if (months.length > 0) {
      createChart('finance-monthly-chart', 'bar', {
        labels: months,
        datasets: [
          { label: 'Income', data: months.map(m => monthlyData[m].income), backgroundColor: '#14b8a699', borderColor: '#14b8a6', borderWidth: 1, borderRadius: 6 },
          { label: 'Expenses', data: months.map(m => monthlyData[m].expenses), backgroundColor: '#ef444499', borderColor: '#ef4444', borderWidth: 1, borderRadius: 6 },
        ]
      }, {
        plugins: { legend: { display: true, position: 'top' } },
        scales: { y: { ticks: { callback: v => 'Rs.' + (v / 1000).toFixed(0) + 'k' } } }
      });
    }

    // Category breakdown
    const categoryData = {};
    finances.forEach(f => {
      categoryData[f.category] = (categoryData[f.category] || 0) + f.amount;
    });
    const cats = Object.keys(categoryData);
    if (cats.length > 0) {
      createChart('finance-category-chart', 'doughnut', {
        labels: cats,
        datasets: [{ data: cats.map(c => categoryData[c]) }]
      }, {
        plugins: {
          tooltip: {
            callbacks: {
              label: ctx => `${ctx.label}: Rs. ${ctx.parsed.toLocaleString()}`
            }
          }
        }
      });
    }
  }

  function setupEventListeners(activeTab, searchFilter, clubFilter, statusFilter) {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.dataset.tab;
        render(tab, '', 'all', 'all');
      });
    });

    // Add Transaction
    document.getElementById('add-txn-btn')?.addEventListener('click', () => {
      showModal('Add District Transaction Record', getTransactionFormHtml(), {
        submitText: 'Record Entry',
        onSubmit: (close) => {
          const data = getFormData();
          if (!data) return;
          store.create('finances', data);
          showToast('success', 'Entry Recorded', 'District transaction logged successfully.');
          close();
          render(activeTab, searchFilter, clubFilter, statusFilter);
        }
      });
    });

    // Edit Transaction
    document.querySelectorAll('.edit-txn').forEach(btn => {
      btn.addEventListener('click', () => {
        const txn = store.getById('finances', btn.dataset.id);
        if (!txn) return;
        showModal('Edit Transaction Details', getTransactionFormHtml(txn), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const data = getFormData();
            if (!data) return;
            store.update('finances', txn.id, data);
            showToast('success', 'Entry Updated', 'District transaction details updated successfully.');
            close();
            render(activeTab, searchFilter, clubFilter, statusFilter);
          }
        });
      });
    });

    // Delete Transaction
    document.querySelectorAll('.delete-txn').forEach(btn => {
      btn.addEventListener('click', () => {
        showConfirm('Delete Transaction Log', 'Are you sure you want to delete this district ledger transaction entry? This cannot be undone.', () => {
          store.delete('finances', btn.dataset.id);
          showToast('success', 'Entry Removed', 'District transaction entry has been deleted.');
          render(activeTab, searchFilter, clubFilter, statusFilter);
        });
      });
    });

    // Search input listener
    document.getElementById('txn-search-input')?.addEventListener('input', (e) => {
      render(activeTab, e.target.value, clubFilter, statusFilter);
    });

    // Verification Action btn
    document.querySelectorAll('.verify-action-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const payId = btn.dataset.payId;
        const cPay = store.getById('clubPayments', payId);
        if (!cPay) return;
        const club = store.getById('clubs', cPay.clubId);

        showConfirm('Verify Consolidated Club Payment', `Are you sure you want to approve this consolidated payment of <strong>Rs. ${cPay.amount.toLocaleString()}</strong> from <strong>${club?.name}</strong>? This will record the amount in the district ledger.`, () => {
          store.update('clubPayments', payId, { status: 'paid' });
          const evt = store.getById('events', cPay.eventId);
          
          // Add transaction log to district finances
          store.create('finances', {
            clubId: 'district',
            type: 'income',
            category: 'Events',
            amount: cPay.amount,
            date: new Date().toISOString().split('T')[0],
            description: `Consolidated Event Fees: ${evt?.name} from ${club?.name}`,
            reference: cPay.reference
          });

          showToast('success', 'Payment Approved', `Club payment from ${club?.name} settled.`);
          render(activeTab, searchFilter, clubFilter, statusFilter);
        });
      });
    });

    // Export Excel/PDF simulation
    document.getElementById('export-finance-btn')?.addEventListener('click', () => {
      openExportStatementModal(finances);
    });

    // Add Balance Sheet Item
    document.getElementById('add-bs-item-btn')?.addEventListener('click', () => {
      showModal('Add Balance Sheet Item', getBSItemFormHtml(), {
        submitText: 'Add Item',
        onSubmit: (close) => {
          const data = getBSItemFormData();
          if (!data) return;
          data.clubId = 'district';
          store.create('balanceSheetItems', data);
          showToast('success', 'Item Added', `Custom ${data.type} item "${data.name}" added successfully.`);
          close();
          render(activeTab, searchFilter, clubFilter, statusFilter);
        }
      });
    });

    // Add Club Due
    document.getElementById('add-club-due-btn')?.addEventListener('click', () => {
      showModal('Record Club Dues Payment', getManualDueFormHtml(), {
        submitText: 'Record Payment',
        onSubmit: (close) => {
          const data = getManualDueFormData();
          if (!data) return;
          
          store.create('finances', {
            clubId: 'district',
            type: 'income',
            category: data.category,
            amount: data.amount,
            date: data.date,
            description: `Manual Dues Paid: ${data.description} (from ${data.clubName})`,
            reference: data.reference
          });

          showToast('success', 'Dues Recorded', `Dues payment of Rs. ${data.amount.toLocaleString()} from ${data.clubName} logged.`);
          close();
          render(activeTab, searchFilter, clubFilter, statusFilter);
        }
      });
    });

    // Edit Balance Sheet Item
    document.querySelectorAll('.edit-bs-item').forEach(btn => {
      btn.addEventListener('click', () => {
        const itemId = btn.dataset.id;
        const item = store.getById('balanceSheetItems', itemId);
        if (!item) return;
        showModal('Edit Balance Sheet Item', getBSItemFormHtml(item), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const data = getBSItemFormData();
            if (!data) return;
            store.update('balanceSheetItems', itemId, data);
            showToast('success', 'Item Updated', `Balance sheet item "${data.name}" updated successfully.`);
            close();
            render(activeTab, searchFilter, clubFilter, statusFilter);
          }
        });
      });
    });

    // Delete Balance Sheet Item
    document.querySelectorAll('.delete-bs-item').forEach(btn => {
      btn.addEventListener('click', () => {
        showConfirm('Delete Balance Sheet Item', 'Are you sure you want to delete this custom Balance Sheet item? This cannot be undone.', () => {
          store.delete('balanceSheetItems', btn.dataset.id);
          showToast('success', 'Item Deleted', 'Balance sheet item has been removed.');
          render(activeTab, searchFilter, clubFilter, statusFilter);
        });
      });
    });

    // --- Invoice specific listeners ---
    document.getElementById('invoice-search-input')?.addEventListener('input', (e) => {
      render(activeTab, e.target.value, clubFilter, statusFilter);
    });

    document.getElementById('invoice-club-filter')?.addEventListener('change', (e) => {
      render(activeTab, searchFilter, e.target.value, statusFilter);
    });

    document.getElementById('invoice-status-filter')?.addEventListener('change', (e) => {
      render(activeTab, searchFilter, clubFilter, e.target.value);
    });

    // Create Invoice
    document.getElementById('create-invoice-btn')?.addEventListener('click', () => {
      showModal('Issue District Invoice to Club', getInvoiceFormHtml(), {
        submitText: 'Issue Invoice',
        onSubmit: (close) => {
          const data = getInvoiceFormData();
          if (!data) return;
          store.create('invoices', data);
          showToast('success', 'Invoice Issued', `Invoice ${data.invoiceNumber} has been issued to ${data.clubName}.`);
          close();
          render(activeTab, searchFilter, clubFilter, statusFilter);
        }
      });
    });

    // Edit Invoice
    document.querySelectorAll('.edit-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const invId = btn.dataset.invId;
        const inv = store.getById('invoices', invId);
        if (!inv) return;
        showModal('Edit District Invoice', getInvoiceFormHtml(inv), {
          submitText: 'Save Changes',
          onSubmit: (close) => {
            const data = getInvoiceFormData(inv);
            if (!data) return;
            store.update('invoices', invId, data);
            showToast('success', 'Invoice Updated', `Invoice ${inv.invoiceNumber} has been updated.`);
            close();
            render(activeTab, searchFilter, clubFilter, statusFilter);
          }
        });
      });
    });

    // Delete Invoice
    document.querySelectorAll('.delete-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const invId = btn.dataset.invId;
        const inv = store.getById('invoices', invId);
        if (!inv) return;
        showConfirm('Delete Invoice', `Are you sure you want to delete invoice ${inv.invoiceNumber}? This action cannot be undone.`, () => {
          store.delete('invoices', invId);
          showToast('success', 'Invoice Deleted', `Invoice ${inv.invoiceNumber} has been deleted.`);
          render(activeTab, searchFilter, clubFilter, statusFilter);
        });
      });
    });

    // Verify Invoice Payment Receipt
    document.querySelectorAll('.verify-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const invId = btn.dataset.invId;
        const inv = store.getById('invoices', invId);
        if (!inv) return;

        const bodyHtml = `
          <div style="font-size:13px; line-height:1.6; display:flex; flex-direction:column; gap:12px;">
            <div style="display:grid; grid-template-columns:110px 1fr; gap:6px; align-items:center;">
              <span style="color:var(--color-text-muted);">Invoice No:</span>
              <strong>${inv.invoiceNumber}</strong>
              <span style="color:var(--color-text-muted);">Leo Club:</span>
              <span>${inv.clubName}</span>
              <span style="color:var(--color-text-muted);">Amount (LKR):</span>
              <div class="form-group" style="margin:0;"><input type="number" class="form-input" id="verify-amount" value="${inv.amount}" style="padding:4px 8px; font-size:12px; height:28px;" /></div>
              <span style="color:var(--color-text-muted);">Ref Code:</span>
              <div class="form-group" style="margin:0;"><input type="text" class="form-input" id="verify-ref" value="${inv.reference || ''}" style="padding:4px 8px; font-size:12px; height:28px;" /></div>
              <span style="color:var(--color-text-muted);">Category:</span>
              <span>${inv.category}</span>
            </div>
            <div style="padding:12px; border:1px solid var(--color-border); border-radius:8px; background:rgba(255,255,255,0.01); text-align:center;">
              <span style="display:block; font-size:11px; color:var(--color-text-muted); margin-bottom:4px;">Submitted Payment Slip</span>
              <span style="font-size:14px; font-weight:700; color:var(--color-cyan-glow);"><i data-lucide="image" style="vertical-align:middle; margin-right:6px; width:16px; height:16px;"></i> ${inv.receiptUrl || 'receipt_file.png'}</span>
            </div>
            <div class="form-group">
              <label class="form-label">Review Note / Remarks</label>
              <input type="text" class="form-input" id="verify-remarks" placeholder="e.g. Received in bank account" value="Payment verified" />
            </div>
            
            <div style="display:flex; justify-content:flex-end; gap:10px; border-top:1px solid var(--color-border); padding-top:12px; margin-top:8px;">
              <button class="btn btn-danger" id="invoice-reject-btn" style="padding: var(--space-2) var(--space-4); font-size: var(--text-sm);">Reject Payment</button>
              <button class="btn btn-primary" id="invoice-approve-btn" style="padding: var(--space-2) var(--space-4); font-size: var(--text-sm);">Approve Payment</button>
            </div>
          </div>
        `;

        const closeModal = showModal('Verify & Edit Invoice Payment', bodyHtml, {
          showFooter: false,
          size: 'md'
        });

        // Add event listeners for custom buttons inside the modal body
        setTimeout(() => {
          document.getElementById('invoice-approve-btn')?.addEventListener('click', () => {
            const remarks = document.getElementById('verify-remarks').value.trim() || 'Payment approved';
            const updatedAmount = parseFloat(document.getElementById('verify-amount').value) || inv.amount;
            const updatedRef = document.getElementById('verify-ref').value.trim() || inv.reference || inv.invoiceNumber;
            
            // 1. Update Invoice status & details
            store.update('invoices', invId, {
              status: 'paid',
              remarks: remarks,
              amount: updatedAmount,
              reference: updatedRef
            });

            // 2. Add ledger entry to district finances
            store.create('finances', {
              clubId: 'district',
              type: 'income',
              category: inv.category === 'Membership Fees' ? 'Membership Fees' : 'Other',
              amount: updatedAmount,
              date: new Date().toISOString().split('T')[0],
              description: `Settled Invoice ${inv.invoiceNumber} - ${inv.clubName}`,
              reference: updatedRef
            });

            showToast('success', 'Payment Approved', `Invoice ${inv.invoiceNumber} status updated to Paid.`);
            closeModal();
            render(activeTab, searchFilter, clubFilter, statusFilter);
          });

          document.getElementById('invoice-reject-btn')?.addEventListener('click', () => {
            const remarks = document.getElementById('verify-remarks').value.trim() || 'Payment rejected - invalid details';
            
            // Update Invoice status back to unpaid
            store.update('invoices', invId, {
              status: 'unpaid',
              remarks: remarks,
              receiptUrl: '',
              reference: ''
            });

            showToast('warning', 'Payment Rejected', `Invoice ${inv.invoiceNumber} reset to Unpaid.`);
            closeModal();
            render(activeTab, searchFilter, clubFilter, statusFilter);
          });
        }, 100);
      });
    });

    // Invoice template file uploader change listener
    document.getElementById('template-file-upload-input')?.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      store.updateInvoiceTemplate(file.name);
      showToast('success', 'Template Updated', `Invoice layout template has been updated to ${file.name}.`);
      render(activeTab, searchFilter, clubFilter, statusFilter);
    });

    // Search club wallets listener
    document.getElementById('club-search-input')?.addEventListener('input', (e) => {
      render(activeTab, e.target.value, clubFilter, statusFilter);
    });

    // View Club Wallet action
    document.querySelectorAll('.view-club-wallet-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const targetClubId = btn.dataset.clubId;
        const targetClub = store.getById('clubs', targetClubId);
        if (!targetClub) return;

        const clubFinances = store.getClubFinances(targetClubId);
        const sortedClubFinances = [...clubFinances].sort((a, b) => new Date(b.date) - new Date(a.date));

        const bodyHtml = `
          <div style="font-size:13px; line-height:1.6; display:flex; flex-direction:column; gap:12px;">
            <p style="color:var(--color-text-secondary); margin:0;">
              Viewing transaction history and ledger statements for <strong>${targetClub.name}</strong>.
            </p>
            <div style="max-height:350px; overflow-y:auto; border:1px solid var(--color-border); border-radius:8px;">
              ${renderTable(
                [
                  { label: 'Date', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                  { label: 'Type', key: 'type', render: row => `<span class="badge ${row.type === 'income' ? 'badge-success' : 'badge-danger'}">${row.type}</span>` },
                  { label: 'Category', key: 'category' },
                  { label: 'Description', key: 'description' },
                  { label: 'Amount', key: 'amount', render: row => `<span style="font-weight:600; color:${row.type === 'income' ? '#14b8a6' : '#ef4444'};">${row.type === 'income' ? '+' : '-'} Rs. ${row.amount.toLocaleString()}</span>` }
                ],
                sortedClubFinances,
                { emptyMessage: 'This club wallet has no transaction logs.' }
              )}
            </div>
          </div>
        `;

        showModal(`${targetClub.name} — Club Wallet Ledger`, bodyHtml, {
          submitText: 'Close',
          showFooter: true,
          size: 'lg',
          onSubmit: (close) => close()
        });
      });
    });
  }

  render();

  return () => {
    destroyAllCharts();
  };
}
