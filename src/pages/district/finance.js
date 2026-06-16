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

export function renderDistrictFinance() {
  const app = document.getElementById('app');
  
  const canEdit = auth.can('update', 'finances');
  const canCreate = auth.can('create', 'finances');
  const canDelete = auth.can('delete', 'finances');

  function render(activeTab = 'overview', searchFilter = '') {
    const finances = store.getByField('finances', 'clubId', 'district');
    
    // Calculate district summaries
    const income = finances.filter(f => f.type === 'income').reduce((sum, f) => sum + f.amount, 0);
    const expenses = finances.filter(f => f.type === 'expense').reduce((sum, f) => sum + f.amount, 0);
    const balance = income - expenses;

    // Receivables are pending club consolidated payments
    const clubPayments = store.getAll('clubPayments');
    const totalReceivablesAmt = clubPayments.filter(cp => cp.status === 'pending').reduce((sum, cp) => sum + cp.amount, 0);

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
                <h1>District Wallet & Finance</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Monitor district ledger, approve club dues, and verify income statements</p>
              </div>
              <div class="page-header-actions" style="display:flex; gap:10px;">
                <button class="btn btn-secondary" id="export-finance-btn"><i data-lucide="download" style="width:16px;height:16px"></i> Export Statement</button>
                ${canCreate ? '<button class="btn btn-primary" id="add-txn-btn"><i data-lucide="plus" style="width:16px;height:16px"></i> Add Transaction</button>' : ''}
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
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary); border-bottom: 1px dashed var(--color-border);">
                        <span>Receivables (Dues from Leo Clubs)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${totalReceivablesAmt.toLocaleString()}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary);">
                        <span>Total Assets</span>
                        <span>Rs. ${(balance + totalReceivablesAmt).toLocaleString()}</span>
                      </div>
                    </div>

                    <!-- LIABILITIES -->
                    <div style="margin-bottom:24px;">
                      <h4 style="margin:0 0 10px; font-size:14px; border-bottom:1px solid var(--color-border); padding-bottom:6px; color:#ef4444;">2. LIABILITIES</h4>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary); border-bottom: 1px dashed var(--color-border);">
                        <span>Accounts Payable (District obligation)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. 0</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary);">
                        <span>Total Liabilities</span>
                        <span>Rs. 0</span>
                      </div>
                    </div>

                    <!-- ACCUMULATED FUNDS -->
                    <div style="border-top:2px solid var(--color-border); padding-top:14px; display:flex; justify-content:space-between; font-size:16px; font-weight:800; color:var(--color-text-primary);">
                      <span>Total Net Treasury Funds</span>
                      <span style="color:#14b8a6;">Rs. ${(balance + totalReceivablesAmt).toLocaleString()}</span>
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

            </div>

          </div>
        </div>
      </div>
    `;

    lucide.createIcons();
    initSidebar();
    initHeader();
    setupCharts(finances);
    setupEventListeners(activeTab);
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

  function setupEventListeners(activeTab) {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const tab = e.target.dataset.tab;
        render(tab);
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
          render(activeTab);
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
            render(activeTab);
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
          render(activeTab);
        });
      });
    });

    // Search input listener
    document.getElementById('txn-search-input')?.addEventListener('input', (e) => {
      render(activeTab, e.target.value);
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
          render(activeTab);
        });
      });
    });

    // Export Excel/PDF simulation
    document.getElementById('export-finance-btn')?.addEventListener('click', () => {
      showToast('success', 'Statement Exported', 'District Financial Statement district_statement_2026.pdf generated successfully.');
    });
  }

  render();

  return () => {
    destroyAllCharts();
  };
}
