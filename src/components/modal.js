// ============================================
// LEO NEXUS PORTAL — MODAL COMPONENT
// ============================================

export function showModal(title, bodyHtml, options = {}) {
  const container = document.getElementById('modal-container');
  if (!container) return;

  const { onSubmit, submitText = 'Save', onCancel, showFooter = true, size = '' } = options;

  container.innerHTML = `
    <div class="modal-overlay" id="modal-overlay">
      <div class="modal ${size ? 'modal-' + size : ''}" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="modal-header">
          <h2>${title}</h2>
          <button class="btn btn-icon btn-ghost" id="modal-close-btn" aria-label="Close modal">
            <i data-lucide="x" style="width:18px;height:18px"></i>
          </button>
        </div>
        <div class="modal-body">
          ${bodyHtml}
        </div>
        ${showFooter ? `
        <div class="modal-footer">
          <button class="btn btn-secondary" id="modal-cancel-btn">Cancel</button>
          <button class="btn btn-primary" id="modal-submit-btn">${submitText}</button>
        </div>` : ''}
      </div>
    </div>
  `;

  if (window.lucide) lucide.createIcons({ nodes: [container] });

  const close = () => {
    container.innerHTML = '';
    if (onCancel) onCancel();
  };

  container.querySelector('#modal-close-btn').addEventListener('click', close);
  container.querySelector('#modal-overlay').addEventListener('click', (e) => {
    if (e.target.id === 'modal-overlay') close();
  });

  if (showFooter) {
    container.querySelector('#modal-cancel-btn').addEventListener('click', close);
    container.querySelector('#modal-submit-btn').addEventListener('click', () => {
      if (onSubmit) onSubmit(close);
    });
  }

  document.addEventListener('keydown', function handler(e) {
    if (e.key === 'Escape') {
      close();
      document.removeEventListener('keydown', handler);
    }
  });

  return close;
}

export function showConfirm(title, message, onConfirm) {
  return showModal(title, `<p style="color: var(--color-text-secondary); line-height: 1.6;">${message}</p>`, {
    submitText: 'Confirm',
    onSubmit: (close) => {
      onConfirm();
      close();
    }
  });
}
