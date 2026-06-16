// ============================================
// LEO NEXUS PORTAL — TOAST NOTIFICATIONS
// ============================================

let toastCount = 0;

export function showToast(type, title, message, duration = 4000) {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const id = `toast-${++toastCount}`;
  const icons = {
    success: 'check-circle',
    error: 'x-circle',
    info: 'info',
    warning: 'alert-triangle'
  };

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.id = id;
  toast.innerHTML = `
    <i data-lucide="${icons[type] || 'info'}" class="toast-icon"></i>
    <div class="toast-content">
      <div class="toast-title">${title}</div>
      ${message ? `<div class="toast-message">${message}</div>` : ''}
    </div>
    <button class="toast-close" onclick="document.getElementById('${id}').remove()">
      <i data-lucide="x" style="width:14px;height:14px"></i>
    </button>
  `;

  container.appendChild(toast);

  if (window.lucide) lucide.createIcons({ nodes: [toast] });

  setTimeout(() => {
    toast.classList.add('removing');
    setTimeout(() => toast.remove(), 300);
  }, duration);
}
