// ============================================
// LEO NEXUS PORTAL — CLUB FINANCE
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
          ${['Membership Fees', 'Sponsorship', 'Fundraising', 'Donations', 'Events', 'Projects', 'Administration', 'Travel', 'Other']
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
      <textarea class="form-textarea" id="txn-description" rows="2" placeholder="Transaction description...">${data.description || ''}</textarea>
    </div>
    <div class="form-group">
      <label class="form-label">Reference</label>
      <input type="text" class="form-input" id="txn-reference" placeholder="e.g. INV-001" value="${data.reference || ''}" />
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

  return { type, category, amount, date, description, reference, clubId: auth.userClubId };
}

export function renderClubFinance() {
  const app = document.getElementById('app');
  const clubId = auth.userClubId;
  
  const canEdit = auth.can('update', 'finances');
  const canCreate = auth.can('create', 'finances');
  const canDelete = auth.can('delete', 'finances');

  function render(activeTab = 'overview', searchFilter = '') {
    const finances = store.getClubFinances(clubId);
    const summary = store.getClubFinanceSummary(clubId);
    
    // Member registrations dues as receivables
    const memberPayments = store.getAll('memberPayments').filter(p => p.clubId === clubId);
    const totalReceivablesAmt = memberPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);

    // Club consolidated event dues as payables
    const clubPayments = store.getAll('clubPayments').filter(cp => cp.clubId === clubId);
    const totalPayablesAmt = clubPayments.filter(cp => cp.status === 'pending').reduce((sum, cp) => sum + cp.amount, 0);

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
          ${renderHeader('Finance', ['Club', 'Finance'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1>Club Wallet & Finance</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Manage balances, generate statements, and track project costs</p>
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
                <div class="stat-value" style="color:#14b8a6;">Rs. ${summary.income.toLocaleString()}</div>
                <div class="stat-label">Total Income</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(239,68,68,0.12);color:#ef4444;"><i data-lucide="trending-down"></i></div>
                <div class="stat-value" style="color:#ef4444;">Rs. ${summary.expenses.toLocaleString()}</div>
                <div class="stat-label">Total Expenses</div>
              </div>
              <div class="card stat-card hover-lift water-effect">
                <div class="stat-icon" style="background:rgba(0,102,255,0.12);color:var(--color-primary);"><i data-lucide="wallet"></i></div>
                <div class="stat-value" style="color:${summary.balance >= 0 ? '#14b8a6' : '#ef4444'};">Rs. ${summary.balance.toLocaleString()}</div>
                <div class="stat-label">Net Balance</div>
              </div>
            </div>

            <!-- Tabs Navigation -->
            <div class="tabs-container stagger-enter" style="margin-top:24px; display:flex; gap:8px; border-bottom:1px solid var(--color-border); padding-bottom:8px; overflow-x:auto;">
              <button class="btn tab-btn ${activeTab === 'overview' ? 'btn-primary' : 'btn-ghost'}" data-tab="overview">Overview</button>
              <button class="btn tab-btn ${activeTab === 'balance_sheet' ? 'btn-primary' : 'btn-ghost'}" data-tab="balance_sheet">Balance Sheet</button>
              <button class="btn tab-btn ${activeTab === 'income_exp' ? 'btn-primary' : 'btn-ghost'}" data-tab="income_exp">Income & Expenditure</button>
              <button class="btn tab-btn ${activeTab === 'ledger' ? 'btn-primary' : 'btn-ghost'}" data-tab="ledger">Payments & Receipts Ledger</button>
              <button class="btn tab-btn ${activeTab === 'receivables_payables' ? 'btn-primary' : 'btn-ghost'}" data-tab="receivables_payables">Receivables & Payables</button>
              <button class="btn tab-btn ${activeTab === 'projects' ? 'btn-primary' : 'btn-ghost'}" data-tab="projects">Project Finances</button>
              <button class="btn tab-btn ${activeTab === 'district_invoices' ? 'btn-primary' : 'btn-ghost'}" data-tab="district_invoices">District Invoices</button>
            </div>

            <!-- Tab Content -->
            <div class="tab-content-container stagger-enter" style="margin-top:20px;">
              
              ${activeTab === 'overview' ? `
                <!-- Overview: Charts & Recent Transactions -->
                <div class="grid-2" style="margin-bottom:20px;">
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="bar-chart-3" style="width:18px;height:18px"></i> Monthly Analysis</h3></div>
                    <div class="card-body"><div class="chart-container" style="height:260px;"><canvas id="finance-monthly-chart"></canvas></div></div>
                  </div>
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title"><i data-lucide="pie-chart" style="width:18px;height:18px"></i> Categories</h3></div>
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
                    <h2 style="margin:0; font-size:18px;">Balance Sheet</h2>
                    <div style="font-size:12px; color:var(--color-text-muted); margin-top:2px;">Leo Club of Sapphire Coast | Leoistic Year 2026/2027</div>
                  </div>
                  <div class="card-body">
                    <!-- ASSETS -->
                    <div style="margin-bottom:24px;">
                      <h4 style="margin:0 0 10px; font-size:14px; border-bottom:1px solid var(--color-border); padding-bottom:6px; color:var(--color-primary);">1. ASSETS</h4>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary);">
                        <span>Cash & Bank Balances (Wallet)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${summary.balance.toLocaleString()}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary); border-bottom: 1px dashed var(--color-border);">
                        <span>Receivables (Dues from Members)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${totalReceivablesAmt.toLocaleString()}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary);">
                        <span>Total Assets</span>
                        <span>Rs. ${(summary.balance + totalReceivablesAmt).toLocaleString()}</span>
                      </div>
                    </div>

                    <!-- LIABILITIES -->
                    <div style="margin-bottom:24px;">
                      <h4 style="margin:0 0 10px; font-size:14px; border-bottom:1px solid var(--color-border); padding-bottom:6px; color:#ef4444;">2. LIABILITIES</h4>
                      <div style="display:flex; justify-content:space-between; padding:8px 0; font-size:13px; color:var(--color-text-secondary); border-bottom: 1px dashed var(--color-border);">
                        <span>Payables (Owed to District)</span>
                        <span style="font-weight:600; color:var(--color-text-primary);">Rs. ${totalPayablesAmt.toLocaleString()}</span>
                      </div>
                      <div style="display:flex; justify-content:space-between; padding:10px 0; font-size:14px; font-weight:700; color:var(--color-text-primary);">
                        <span>Total Liabilities</span>
                        <span>Rs. ${totalPayablesAmt.toLocaleString()}</span>
                      </div>
                    </div>

                    <!-- ACCUMULATED FUNDS -->
                    <div style="border-top:2px solid var(--color-border); padding-top:14px; display:flex; justify-content:space-between; font-size:16px; font-weight:800; color:var(--color-text-primary);">
                      <span>Total Net Standing (Accumulated Funds)</span>
                      <span style="color:#14b8a6;">Rs. ${(summary.balance + totalReceivablesAmt - totalPayablesAmt).toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'income_exp' ? `
                <!-- Income & Expenditure Sheet -->
                <div class="grid-2">
                  <!-- Income Categories -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#14b8a6;"><i data-lucide="arrow-up-right"></i> Revenue Accounts</h3></div>
                    <div class="card-body">
                      ${['Membership Fees', 'Sponsorship', 'Fundraising', 'Donations', 'Events', 'Projects', 'Other'].map(cat => {
                        const totalCat = finances.filter(f => f.type === 'income' && f.category === cat).reduce((sum, f) => sum + f.amount, 0);
                        return `
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                            <span style="color:var(--color-text-secondary); font-weight:500;">${cat}</span>
                            <span style="font-weight:700; color:var(--color-text-primary);">Rs. ${totalCat.toLocaleString()}</span>
                          </div>
                        `;
                      }).join('')}
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0 0; font-size:15px; font-weight:800; color:#14b8a6;">
                        <span>Total Revenues</span>
                        <span>Rs. ${summary.income.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>

                  <!-- Expense Categories -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#ef4444;"><i data-lucide="arrow-down-right"></i> Expenditure Accounts</h3></div>
                    <div class="card-body">
                      ${['Projects', 'Events', 'Administration', 'Travel', 'Other'].map(cat => {
                        const totalCat = finances.filter(f => f.type === 'expense' && f.category === cat).reduce((sum, f) => sum + f.amount, 0);
                        return `
                          <div style="display:flex; justify-content:space-between; align-items:center; padding:10px 0; border-bottom:1px solid var(--color-border); font-size:13px;">
                            <span style="color:var(--color-text-secondary); font-weight:500;">${cat}</span>
                            <span style="font-weight:700; color:var(--color-text-primary);">Rs. ${totalCat.toLocaleString()}</span>
                          </div>
                        `;
                      }).join('')}
                      <div style="display:flex; justify-content:space-between; align-items:center; padding:14px 0 0; font-size:15px; font-weight:800; color:#ef4444;">
                        <span>Total Expenditures</span>
                        <span>Rs. ${summary.expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <!-- Surplus / Deficit Card -->
                <div class="card hover-lift" style="margin-top:20px; border-color:${summary.balance >= 0 ? '#14b8a6' : '#ef4444'};">
                  <div class="card-body" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
                    <div>
                      <h3 style="margin:0; font-size:16px; color:var(--color-text-primary);">Net Statement Surplus / (Deficit)</h3>
                      <p style="margin:4px 0 0; font-size:12px; color:var(--color-text-muted);">Calculated as Revenue minus Expenditure for the active Leoistic year</p>
                    </div>
                    <div style="font-size:24px; font-weight:800; color:${summary.balance >= 0 ? '#14b8a6' : '#ef4444'}">
                      Rs. ${summary.balance.toLocaleString()}
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'ledger' ? `
                <!-- Ledger view (Payments & Receipts Sheet) -->
                <div class="card">
                  <div class="card-header">
                    <h3 class="card-title"><i data-lucide="book-open" style="color:var(--color-primary)"></i> General Journal Entries</h3>
                  </div>
                  <div class="card-body" style="padding:0;">
                    ${renderTable(
                      [
                        { label: 'TXN ID', key: 'id' },
                        { label: 'Date', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                        { label: 'Account Type', key: 'type', render: row => `<span style="font-weight:700; text-transform:uppercase; color:${row.type==='income'?'#14b8a6':'#ef4444'};">${row.type}</span>` },
                        { label: 'Category', key: 'category' },
                        { label: 'Ref Code', key: 'reference', render: row => row.reference || '—' },
                        { label: 'Ledger Description', key: 'description' },
                        { label: 'Dr (Debit)', render: row => row.type === 'expense' ? `Rs. ${row.amount.toLocaleString()}` : '—' },
                        { label: 'Cr (Credit)', render: row => row.type === 'income' ? `Rs. ${row.amount.toLocaleString()}` : '—' },
                      ],
                      sortedFinances,
                      { emptyMessage: 'Journal is empty' }
                    )}
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'receivables_payables' ? `
                <!-- Receivables & Payables -->
                <div class="grid-2">
                  <!-- Receivables -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#14b8a6;"><i data-lucide="arrow-down-left"></i> Receivables (Due from Members)</h3></div>
                    <div class="card-body" style="padding:0;">
                      ${renderTable(
                        [
                          { label: 'Member', key: 'name', render: row => `<span style="font-weight:600;">${row.name}</span>` },
                          { label: 'Reference', key: 'id', render: row => `Event Reg: ${row.eventId}` },
                          { label: 'Due Date', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                          { label: 'Amount', key: 'amount', render: row => `<span style="font-weight:700; color:#14b8a6;">Rs. ${row.amount.toLocaleString()}</span>` }
                        ],
                        memberPayments.filter(p => p.status === 'pending'),
                        { emptyMessage: 'No outstanding receivables' }
                      )}
                    </div>
                  </div>

                  <!-- Payables -->
                  <div class="card hover-lift">
                    <div class="card-header"><h3 class="card-title" style="color:#ef4444;"><i data-lucide="arrow-up-right"></i> Payables (Due to District)</h3></div>
                    <div class="card-body" style="padding:0;">
                      ${renderTable(
                        [
                          { label: 'Owed To', render: () => 'District 306B2' },
                          { label: 'Reference Code', key: 'reference' },
                          { label: 'Date Filed', key: 'date', render: row => new Date(row.date).toLocaleDateString() },
                          { label: 'Amount', key: 'amount', render: row => `<span style="font-weight:700; color:#ef4444;">Rs. ${row.amount.toLocaleString()}</span>` }
                        ],
                        clubPayments.filter(cp => cp.status === 'pending'),
                        { emptyMessage: 'No outstanding payables' }
                      )}
                    </div>
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'projects' ? `
                <!-- Project Finances -->
                <div class="card">
                  <div class="card-header"><h3 class="card-title"><i data-lucide="folder-kanban" style="color:var(--color-primary)"></i> Project Financial Outcomes</h3></div>
                  <div class="card-body" style="padding:0;">
                    ${renderTable(
                      [
                        { label: 'Project Name', key: 'name', render: row => `<span style="font-weight:600; color:var(--color-text-primary);">${row.name}</span>` },
                        { label: 'Category', key: 'category' },
                        { label: 'Status', key: 'status', render: row => `<span class="badge ${row.status==='completed'?'badge-success':'badge-warning'}">${row.status}</span>` },
                        { label: 'Budget (LKR)', key: 'budget', render: row => `Rs. ${row.budget.toLocaleString()}` },
                        { label: 'Actual Expenses', render: row => {
                          // Find expense logs matching this project name
                          const matchExpenses = finances.filter(f => f.type === 'expense' && f.description.toLowerCase().includes(row.name.toLowerCase()));
                          const sumExp = matchExpenses.reduce((sum, f) => sum + f.amount, 0);
                          return `<span style="font-weight:600; color:#ef4444;">Rs. ${sumExp.toLocaleString()}</span>`;
                        }},
                        { label: 'Sponsorship / Income', render: row => {
                          const matchIncome = finances.filter(f => f.type === 'income' && f.description.toLowerCase().includes(row.name.toLowerCase()));
                          const sumInc = matchIncome.reduce((sum, f) => sum + f.amount, 0);
                          return `<span style="font-weight:600; color:#14b8a6;">Rs. ${sumInc.toLocaleString()}</span>`;
                        }},
                        { label: 'Outcome Surplus/Deficit', render: row => {
                          const matchExpenses = finances.filter(f => f.type === 'expense' && f.description.toLowerCase().includes(row.name.toLowerCase())).reduce((sum, f) => sum + f.amount, 0);
                          const matchIncome = finances.filter(f => f.type === 'income' && f.description.toLowerCase().includes(row.name.toLowerCase())).reduce((sum, f) => sum + f.amount, 0);
                          const balance = matchIncome - matchExpenses;
                          return `<span style="font-weight:700; color:${balance >= 0 ? '#14b8a6' : '#ef4444'};">${balance >= 0 ? '+' : ''} Rs. ${balance.toLocaleString()}</span>`;
                        }}
                      ],
                      store.getClubProjects(clubId),
                      { emptyMessage: 'No projects registered' }
                    )}
                  </div>
                </div>
              ` : ''}

              ${activeTab === 'district_invoices' ? (() => {
                const invoices = store.getAll('invoices').filter(inv => inv.clubId === clubId);
                const totalInvoiced = invoices.reduce((sum, inv) => sum + inv.amount, 0);
                const totalPaid = invoices.filter(inv => inv.status === 'paid').reduce((sum, inv) => sum + inv.amount, 0);
                const totalOutstanding = invoices.filter(inv => inv.status !== 'paid').reduce((sum, inv) => sum + inv.amount, 0);

                return `
                  <!-- Summary Cards -->
                  <div class="grid-3" style="margin-bottom: 20px;">
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(0,212,255,0.1); color:#00d4ff; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="file-text"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Total Invoiced</div>
                        <div style="font-size:18px; font-weight:700; color:var(--color-text-primary);">Rs. ${totalInvoiced.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(20,184,166,0.1); color:#14b8a6; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="check-circle-2"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Total Settled</div>
                        <div style="font-size:18px; font-weight:700; color:#14b8a6;">Rs. ${totalPaid.toLocaleString()}</div>
                      </div>
                    </div>
                    <div style="padding: 16px; background: rgba(255,255,255,0.02); border: 1px solid var(--color-border); border-radius: 12px; display: flex; align-items: center; gap: 14px;">
                      <div style="width:40px; height:40px; border-radius:10px; background:rgba(239,68,68,0.1); color:#ef4444; display:flex; align-items:center; justify-content:center;">
                        <i data-lucide="alert-circle"></i>
                      </div>
                      <div>
                        <div style="font-size:12px; color:var(--color-text-muted);">Outstanding Balance</div>
                        <div style="font-size:18px; font-weight:700; color:#ef4444;">Rs. ${totalOutstanding.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>

                  <!-- Invoices List -->
                  <div class="card">
                    <div class="card-header">
                      <h3 class="card-title"><i data-lucide="landmark" style="color:var(--color-primary);"></i> Billed District Invoices</h3>
                    </div>
                    <div class="card-body" style="padding:0;">
                      ${renderTable(
                        [
                          { label: 'Invoice No.', key: 'invoiceNumber', render: row => `<strong class="glow-text" style="color:var(--color-primary)">${row.invoiceNumber}</strong>` },
                          { label: 'Category', key: 'category' },
                          { label: 'Description', key: 'description' },
                          { label: 'Amount Billed', key: 'amount', render: row => `<strong>Rs. ${row.amount.toLocaleString()}</strong>` },
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
                          }},
                          { label: 'Remarks / Verification note', key: 'remarks', render: row => row.remarks || '—' }
                        ],
                        invoices,
                        {
                          emptyMessage: 'No district invoices billed to your club.',
                          actions: (row) => `
                            ${row.status === 'unpaid' && (auth.currentUser?.role === 'club_treasurer' || auth.currentUser?.role === 'club_president' || auth.currentUser?.role === 'club_secretary' || auth.currentUser?.role === 'admin') ? `
                              <button class="btn btn-primary btn-xs pay-invoice-btn" data-inv-id="${row.id}">Submit Payment</button>
                            ` : ''}
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
      showModal('Add Transaction Record', getTransactionFormHtml(), {
        submitText: 'Record Entry',
        onSubmit: (close) => {
          const data = getFormData();
          if (!data) return;
          store.create('finances', data);
          showToast('success', 'Entry Recorded', 'Transaction logged successfully.');
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
            showToast('success', 'Entry Updated', 'Transaction details updated successfully.');
            close();
            render(activeTab);
          }
        });
      });
    });

    // Delete Transaction
    document.querySelectorAll('.delete-txn').forEach(btn => {
      btn.addEventListener('click', () => {
        showConfirm('Delete Transaction Log', 'Are you sure you want to delete this ledger transaction entry? This cannot be undone.', () => {
          store.delete('finances', btn.dataset.id);
          showToast('success', 'Entry Removed', 'Transaction entry has been deleted.');
          render(activeTab);
        });
      });
    });

    // Search input listener
    document.getElementById('txn-search-input')?.addEventListener('input', (e) => {
      render(activeTab, e.target.value);
    });

    // Export Excel/PDF simulation
    document.getElementById('export-finance-btn')?.addEventListener('click', () => {
      showToast('success', 'Statement Exported', 'Financial Statement statement_2026.pdf generated successfully.');
    });

    // Pay invoice submit reference
    document.querySelectorAll('.pay-invoice-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const invId = btn.dataset.invId;
        const inv = store.getById('invoices', invId);
        if (!inv) return;

        const bodyHtml = `
          <div style="font-size:13px; line-height:1.6; display:flex; flex-direction:column; gap:12px;">
            <p style="color:var(--color-text-secondary);">Submit the bank deposit slip or transaction reference below to pay invoice <strong>${inv.invoiceNumber}</strong> (Amount: <strong>Rs. ${inv.amount.toLocaleString()}</strong>).</p>
            <div class="form-group">
              <label class="form-label">Bank Transaction Reference Code *</label>
              <input type="text" class="form-input" id="pay-ref" placeholder="e.g. TXN-9988220" />
            </div>
            <div class="form-group">
              <label class="form-label">Deposit Slip / Receipt File (Mock name) *</label>
              <input type="text" class="form-input" id="pay-file" value="receipt_${inv.invoiceNumber.toLowerCase()}.png" />
            </div>
          </div>
        `;

        showModal(`Submit Payment for ${inv.invoiceNumber}`, bodyHtml, {
          submitText: 'Submit Payment Reference',
          onSubmit: (close) => {
            const ref = document.getElementById('pay-ref').value.trim();
            const file = document.getElementById('pay-file').value.trim();

            if (!ref) { showToast('error', 'Validation Error', 'Please enter transaction reference.'); return; }
            if (!file) { showToast('error', 'Validation Error', 'Please specify a receipt file.'); return; }

            store.update('invoices', invId, {
              status: 'pending',
              reference: ref,
              receiptUrl: file,
              paymentDate: new Date().toISOString().split('T')[0]
            });

            showToast('success', 'Payment Submitted', `Payment reference for ${inv.invoiceNumber} submitted for verification.`);
            close();
            render(activeTab);
          }
        });
      });
    });
  }

  render();

  return () => {
    destroyAllCharts();
  };
}
