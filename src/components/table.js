// ============================================
// LEO NEXUS PORTAL — DATA TABLE COMPONENT
// ============================================

export function renderTable(columns, data, options = {}) {
  const { actions, emptyMessage = 'No data available', searchable = false, id = 'data-table' } = options;

  if (data.length === 0) {
    return `
      <div class="card">
        <div class="empty-state">
          <i data-lucide="inbox" class="empty-icon"></i>
          <h3>${emptyMessage}</h3>
          <p>Items will appear here once added.</p>
        </div>
      </div>
    `;
  }

  let headerHtml = columns.map(col =>
    `<th${col.width ? ` style="width:${col.width}"` : ''}>${col.label}</th>`
  ).join('');

  if (actions) headerHtml += '<th style="width:100px">Actions</th>';

  let bodyHtml = data.map(row => {
    let cells = columns.map(col => {
      const value = col.render ? col.render(row) : (row[col.key] ?? '');
      return `<td>${value}</td>`;
    }).join('');

    if (actions) {
      cells += `<td class="actions">${actions(row)}</td>`;
    }

    return `<tr>${cells}</tr>`;
  }).join('');

  return `
    <div class="data-table-wrapper" id="${id}">
      <table class="data-table">
        <thead><tr>${headerHtml}</tr></thead>
        <tbody>${bodyHtml}</tbody>
      </table>
    </div>
  `;
}
