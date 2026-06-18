import { store } from '../store.js';
import { auth } from '../auth.js';
import { showToast } from './toast.js';

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

export function showAccountSettingsModal() {
  const user = auth.currentUser;
  if (!user) return;

  const bodyHtml = `
    <form id="my-account-form" style="padding: 0.5rem 0;">
      <div style="text-align: center; margin-bottom: 1.5rem;">
        <div class="avatar" style="width: 64px; height: 64px; font-size: 1.5rem; margin: 0 auto 0.75rem; display: flex; align-items: center; justify-content: center; background: var(--color-primary-alpha); color: var(--color-primary); border-radius: 50%; font-weight: 700;">${user.avatar || 'U'}</div>
        <h3 style="margin: 0; font-weight: 700; color: var(--color-text-primary); font-size: 1.1rem;">${user.name}</h3>
        <p style="margin: 4px 0 0; font-size: 0.8rem; color: var(--color-text-muted); text-transform: uppercase; letter-spacing: 0.5px;">${user.role.replace(/_/g, ' ')}</p>
        <p style="margin: 2px 0 0; font-size: 0.8rem; color: var(--color-text-secondary);">${user.email}</p>
      </div>
      <div class="form-group" style="margin-bottom: 1rem;">
        <label class="form-label" style="font-weight: 500; margin-bottom: 6px; display: block;">New Password *</label>
        <input type="password" class="form-input" id="my-account-new-password" placeholder="Minimum 6 characters" required style="width: 100%; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary);" />
      </div>
      <div class="form-group" style="margin-bottom: 0.5rem;">
        <label class="form-label" style="font-weight: 500; margin-bottom: 6px; display: block;">Confirm Password *</label>
        <input type="password" class="form-input" id="my-account-confirm-password" placeholder="Re-enter new password" required style="width: 100%; padding: 10px 12px; background: rgba(255,255,255,0.03); border: 1px solid var(--color-border); border-radius: 8px; color: var(--color-text-primary);" />
      </div>
    </form>
  `;

  showModal('My Account Settings', bodyHtml, {
    submitText: 'Update Password',
    onSubmit: (close) => {
      const newPassword = document.getElementById('my-account-new-password')?.value?.trim();
      const confirmPassword = document.getElementById('my-account-confirm-password')?.value?.trim();

      if (!newPassword || !confirmPassword) {
        showToast('error', 'Validation Error', 'All password fields are required.');
        return;
      }

      if (newPassword.length < 6) {
        showToast('error', 'Validation Error', 'Password must be at least 6 characters.');
        return;
      }

      if (newPassword !== confirmPassword) {
        showToast('error', 'Validation Error', 'Passwords do not match.');
        return;
      }

      store.update('users', user.id, { password: newPassword });
      showToast('success', 'Success', 'Your password has been updated.');
      close();
    }
  });
}
