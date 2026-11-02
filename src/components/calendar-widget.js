import { store } from '../store.js';

export function renderCalendarWidget() {
  const events = store.getAll('events');
  const schedules = store.getAll('districtSchedules') || [];
  
  const currentDate = new Date();
  const calendarYear = 2026;
  const calendarMonth = 5; // June (0-indexed)
  
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
  let startDayOffset = firstDayIndex - 1;
  if (startDayOffset < 0) startDayOffset = 6;
  const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

  let gridCellsHtml = '';
  for (let i = 0; i < startDayOffset; i++) {
    gridCellsHtml += `<div class="cal-day-cell cal-day-empty"></div>`;
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const monthStr = String(calendarMonth + 1).padStart(2, '0');
    const dayStr = String(day).padStart(2, '0');
    const dateStr = `${calendarYear}-${monthStr}-${dayStr}`;

    const dayEvents = events.filter(e => e.date === dateStr || (e.endDate && dateStr >= e.date && dateStr <= e.endDate));
    const daySchedules = schedules.filter(s => s.date === dateStr);

    const hasEvents = dayEvents.length > 0;
    const hasSchedules = daySchedules.length > 0;
    const isToday = currentDate.toISOString().split('T')[0] === dateStr;

    gridCellsHtml += `
      <div class="cal-day-cell cal-day-real ${isToday ? 'today' : ''}" style="padding: 6px; aspect-ratio: 1; border-radius: 8px; border: 1px solid var(--color-border-subtle); background: var(--color-surface); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
        <span style="font-size: 11px; font-weight: 700; color: var(--color-text-primary); z-index: 2;">${day}</span>
        ${(hasEvents || hasSchedules) ? `
          <div style="display: flex; gap: 3px; position: absolute; bottom: 3px;">
            ${hasEvents ? '<span style="width:5px;height:5px;border-radius:50%;background:#2563eb;"></span>' : ''}
            ${hasSchedules ? '<span style="width:5px;height:5px;border-radius:50%;background:#f59e0b;"></span>' : ''}
          </div>
        ` : ''}
      </div>
    `;
  }

  const combinedUpcoming = [
    ...events.map(e => ({ ...e, calendarType: 'event', sortDate: e.date })),
    ...schedules.map(s => ({ ...s, calendarType: 'schedule', sortDate: s.date }))
  ]
  .filter(item => item.sortDate >= '2026-06-01')
  .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
  .slice(0, 4);

  return `
    <div class="card" style="grid-column: 1 / -1;">
      <div class="card-header">
        <h3 class="card-title" style="display:flex; align-items:center; gap:8px;">
          <i data-lucide="calendar" style="width:18px;height:18px;color:var(--color-primary)"></i>
          District Schedule &amp; Agenda
        </h3>
        <a href="#/calendar" class="btn btn-ghost btn-sm">Full Calendar →</a>
      </div>
      <div class="card-body" style="display:grid; grid-template-columns: 1.1fr 0.9fr; gap: 28px;">
        <!-- Mini Calendar -->
        <div>
          <h4 style="margin:0 0 14px; font-size:14px; font-weight:700; text-align:center;">${monthNames[calendarMonth]} ${calendarYear}</h4>
          <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 6px;">
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Mo</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Tu</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">We</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Th</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Fr</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Sa</div>
            <div style="text-align:center; font-size:11px; color:var(--color-text-muted); font-weight:700;">Su</div>
            ${gridCellsHtml}
          </div>
        </div>

        <!-- Upcoming List -->
        <div>
          <h4 style="margin:0 0 14px; font-size:14px; font-weight:700;">Upcoming Agenda</h4>
          <div style="display:flex; flex-direction:column; gap:10px;">
            ${combinedUpcoming.length === 0 ? '<p style="font-size:12px; color:var(--color-text-muted);">No upcoming items.</p>' : ''}
            ${combinedUpcoming.map(item => {
              const itemDate = new Date(item.sortDate);
              const displayDate = itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
              const isEvent = item.calendarType === 'event';
              return `
                <div style="display:flex; gap:12px; align-items:center; font-size:13px; padding:10px 14px; background:var(--color-surface-muted); border-radius:var(--radius-md); border:1px solid var(--color-border-subtle);">
                  <div style="min-width:44px; text-align:center;">
                    <strong style="color:var(--color-primary); font-size:12px; font-weight:700;">${displayDate}</strong>
                  </div>
                  <div style="flex:1; min-width:0;">
                    <div style="font-weight:700; color:var(--color-text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${isEvent ? item.name : item.title}</div>
                    <span class="badge ${isEvent ? 'badge-primary' : 'badge-warning'}" style="font-size:9px; padding:2px 8px; margin-top:2px;">${isEvent ? 'Event' : 'Official Visit'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      </div>
    </div>
  `;
}
