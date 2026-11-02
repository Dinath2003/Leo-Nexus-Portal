// ============================================
// LEO NEXUS PORTAL — SHARED CALENDAR
// ============================================

import { store } from '../store.js';
import { auth } from '../auth.js';
import { renderSidebar, initSidebar } from '../components/sidebar.js';
import { renderHeader, initHeader } from '../components/header.js';
import { showToast } from '../components/toast.js';
import { showModal, showConfirm } from '../components/modal.js';

export function renderCalendar() {
  const app = document.getElementById('app');

  let currentDate = new Date();
  // Default to June 2026 for demonstration matching events data
  let calendarYear = 2026;
  let calendarMonth = 5; // June (0-indexed)
  let selectedDateStr = '2026-06-17'; // Default selected date

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function render() {
    const events = store.getAll('events');
    const schedules = store.getAll('districtSchedules') || [];
    const currentUser = auth.currentUser;
    const isDistrictOfficer = auth.isDistrictUser;

    // Days in current calendar month
    const firstDayIndex = new Date(calendarYear, calendarMonth, 1).getDay();
    // Adjust so Monday is 0, Sunday is 6
    let startDayOffset = firstDayIndex - 1;
    if (startDayOffset < 0) startDayOffset = 6;

    const daysInMonth = new Date(calendarYear, calendarMonth + 1, 0).getDate();

    // Generate calendar HTML cells
    let gridCellsHtml = '';

    // Blank cells for previous month
    for (let i = 0; i < startDayOffset; i++) {
      gridCellsHtml += `<div class="cal-day-cell cal-day-empty"></div>`;
    }

    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const monthStr = String(calendarMonth + 1).padStart(2, '0');
      const dayStr = String(day).padStart(2, '0');
      const dateStr = `${calendarYear}-${monthStr}-${dayStr}`;

      // Filter events and schedules on this date
      const dayEvents = events.filter(e => e.date === dateStr || (e.endDate && dateStr >= e.date && dateStr <= e.endDate));
      const daySchedules = schedules.filter(s => s.date === dateStr);

      const hasEvents = dayEvents.length > 0;
      const hasSchedules = daySchedules.length > 0;
      const isSelected = dateStr === selectedDateStr;
      const isToday = new Date().toISOString().split('T')[0] === dateStr;

      gridCellsHtml += `
        <div class="cal-day-cell cal-day-real ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}" data-date="${dateStr}">
          <span class="cal-day-num">${day}</span>
          <div class="cal-indicators">
            ${hasEvents ? `<span class="cal-dot dot-event" title="${dayEvents.length} District Event(s)"></span>` : ''}
            ${hasSchedules ? `<span class="cal-dot dot-schedule" title="${daySchedules.length} Executive Schedule(s)"></span>` : ''}
          </div>
        </div>
      `;
    }

    // Get items for selected date details
    const selectedDateObj = new Date(selectedDateStr);
    const formattedSelectedDate = selectedDateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    
    const selectedEvents = events.filter(e => e.date === selectedDateStr || (e.endDate && selectedDateStr >= e.date && selectedDateStr <= e.endDate));
    const selectedSchedules = schedules.filter(s => s.date === selectedDateStr);

    // Get upcoming events & schedules starting from June 1, 2026
    const combinedUpcoming = [
      ...events.map(e => ({ ...e, calendarType: 'event', sortDate: e.date })),
      ...schedules.map(s => ({ ...s, calendarType: 'schedule', sortDate: s.date }))
    ]
    .filter(item => item.sortDate >= '2026-06-01')
    .sort((a, b) => a.sortDate.localeCompare(b.sortDate))
    .slice(0, 5);

    app.innerHTML = `
      <style>
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: 8px;
          margin-top: 10px;
        }
        .cal-header-cell {
          text-align: center;
          font-weight: 700;
          font-size: 11px;
          text-transform: uppercase;
          color: var(--color-text-muted);
          padding: 8px 0;
          letter-spacing: 0.5px;
        }
        .cal-day-cell {
          aspect-ratio: 1.1 / 1;
          border-radius: 10px;
          border: 1px solid var(--color-border);
          background: var(--color-surface);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 8px;
          transition: all 0.2s ease;
          position: relative;
        }
        .cal-day-empty {
          opacity: 0;
          pointer-events: none;
        }
        .cal-day-real {
          cursor: pointer;
        }
        .cal-day-real:hover {
          background: var(--color-surface-muted);
          border-color: var(--color-primary);
          transform: translateY(-1px);
        }
        .cal-day-real.selected {
          background: var(--color-primary-alpha);
          border-color: var(--color-primary);
          box-shadow: 0 4px 14px rgba(37, 99, 235, 0.15);
        }
        .cal-day-real.today {
          border-color: #10b981;
          background: rgba(16, 185, 129, 0.05);
        }
        .cal-day-num {
          font-size: 12px;
          font-weight: 700;
          color: var(--color-text-primary);
        }
        .cal-indicators {
          display: flex;
          gap: 4px;
          justify-content: flex-end;
          align-items: center;
        }
        .cal-dot {
          display: inline-block;
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }
        .dot-event {
          background: #2563eb;
          box-shadow: 0 0 6px rgba(37, 99, 235, 0.5);
        }
        .dot-schedule {
          background: #f59e0b;
          box-shadow: 0 0 6px rgba(245, 158, 11, 0.5);
        }
        .cal-item-card {
          padding: 14px;
          border-radius: 12px;
          background: var(--color-surface-muted);
          border: 1px solid var(--color-border);
          transition: all 0.2s ease;
        }
        .cal-item-card:hover {
          transform: translateX(3px);
          background: var(--color-surface);
          box-shadow: var(--shadow-sm);
        }
        .cal-item-card.event-type {
          border-left: 4px solid #2563eb;
        }
        .cal-item-card.schedule-type {
          border-left: 4px solid #f59e0b;
        }
      </style>
      <div class="dashboard-layout">
        ${renderSidebar()}
        <div class="main-content">
          ${renderHeader('Calendar', ['Shared', 'Calendar'])}
          <div class="page-content page-enter">
            <div class="ambient-bg">
              <div class="ambient-orb orb-1"></div>
              <div class="ambient-orb orb-2"></div>
            </div>

            <!-- Page Header -->
            <div class="page-header stagger-enter">
              <div>
                <h1>District Calendar</h1>
                <p style="color:var(--color-text-muted);margin-top:4px;">Unified schedule of District events and Executive itineraries</p>
              </div>
              ${isDistrictOfficer ? `
                <div class="page-header-actions">
                  <button class="btn btn-primary" id="add-schedule-btn">
                    <i data-lucide="plus-circle" style="width:16px;height:16px;margin-right:6px;vertical-align:-2px;"></i> Add Schedule
                  </button>
                </div>
              ` : ''}
            </div>

            <!-- Main Split Layout -->
            <div style="display:grid; grid-template-columns: 1.6fr 1fr; gap:24px; margin-top:20px; align-items:flex-start;" class="stagger-enter">
              
              <!-- Left: Monthly Calendar -->
              <div class="card" style="padding:20px;">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:20px;">
                  <h3 style="margin:0; font-size:18px; font-weight:700;">${monthNames[calendarMonth]} ${calendarYear}</h3>
                  <div style="display:flex; gap:8px;">
                    <button class="btn btn-secondary btn-icon btn-sm" id="prev-month-btn"><i data-lucide="chevron-left" style="width:16px;height:16px;"></i></button>
                    <button class="btn btn-secondary btn-icon btn-sm" id="next-month-btn"><i data-lucide="chevron-right" style="width:16px;height:16px;"></i></button>
                  </div>
                </div>

                <div class="calendar-grid">
                  <!-- Days of Week Headers -->
                  <div class="cal-header-cell">Mon</div>
                  <div class="cal-header-cell">Tue</div>
                  <div class="cal-header-cell">Wed</div>
                  <div class="cal-header-cell">Thu</div>
                  <div class="cal-header-cell">Fri</div>
                  <div class="cal-header-cell">Sat</div>
                  <div class="cal-header-cell">Sun</div>

                  ${gridCellsHtml}
                </div>

                <!-- Legend -->
                <div style="display:flex; gap:16px; margin-top:20px; font-size:12px; border-top:1px solid var(--color-border); padding-top:14px;">
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#0066ff;"></span>
                    <span style="color:var(--color-text-secondary);">District Level Events</span>
                  </div>
                  <div style="display:flex; align-items:center; gap:6px;">
                    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#f59e0b;"></span>
                    <span style="color:var(--color-text-secondary);">Executive Committee Schedules</span>
                  </div>
                </div>
              </div>

              <!-- Right Panel: Day Details & Upcoming List -->
              <div style="display:flex; flex-direction:column; gap:24px;">
                
                <!-- Day Detail View -->
                <div class="card" style="padding:20px; border-left: 4px solid var(--color-primary);">
                  <div style="margin-bottom:14px;">
                    <span style="font-size:11px; text-transform:uppercase; color:var(--color-text-muted); font-weight:600;">Schedules for</span>
                    <h4 style="margin:2px 0 0; font-size:15px; font-weight:700; color:var(--color-text-primary);">${formattedSelectedDate}</h4>
                  </div>

                  <div style="display:flex; flex-direction:column; gap:12px;">
                    ${selectedEvents.length === 0 && selectedSchedules.length === 0 ? `
                      <div style="padding:20px 0; text-align:center; color:var(--color-text-muted); font-size:13px;">
                        <i data-lucide="calendar" style="width:28px;height:28px;margin:0 auto 8px;display:block;opacity:0.4;"></i>
                        No events or executive schedules on this day.
                      </div>
                    ` : ''}

                    <!-- Selected Events -->
                    ${selectedEvents.map(evt => `
                      <div class="cal-item-card event-type">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                          <div>
                            <span class="badge badge-primary" style="font-size:9px; padding:1px 5px; margin-bottom:4px; display:inline-block;">Event</span>
                            <h5 style="margin:0; font-size:13px; font-weight:600; color:var(--color-text-primary);">${evt.name}</h5>
                            <p style="font-size:11px; color:var(--color-text-muted); margin-top:3px;"><i data-lucide="map-pin" style="width:10px;height:10px;display:inline-block;vertical-align:-1px;margin-right:2px"></i> ${evt.venue}</p>
                          </div>
                        </div>
                      </div>
                    `).join('')}

                    <!-- Selected Schedules -->
                    ${selectedSchedules.map(sch => `
                      <div class="cal-item-card schedule-type" style="position:relative;">
                        <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:8px;">
                          <div>
                            <span class="badge" style="font-size:9px; padding:1px 5px; margin-bottom:4px; display:inline-block; background:rgba(245,158,11,0.1); color:#f59e0b; border:1px solid rgba(245,158,11,0.2); text-transform:capitalize;">${sch.type || 'Visit'}</span>
                            <h5 style="margin:0; font-size:13px; font-weight:600; color:var(--color-text-primary);">${sch.title}</h5>
                            <p style="font-size:11px; color:var(--color-text-muted); margin-top:3px;"><i data-lucide="user" style="width:10px;height:10px;display:inline-block;vertical-align:-1px;margin-right:2px"></i> ${sch.executive} | <i data-lucide="clock" style="width:10px;height:10px;display:inline-block;vertical-align:-1px;margin-right:2px"></i> ${sch.time}</p>
                            ${sch.description ? `<p style="font-size:11px; color:var(--color-text-secondary); margin-top:6px; line-height:1.4;">${sch.description}</p>` : ''}
                          </div>
                          ${isDistrictOfficer ? `
                            <button class="btn btn-ghost btn-xs btn-icon delete-schedule-btn" data-sch-id="${sch.id}" style="color:var(--color-danger); position:absolute; right:8px; top:8px;" title="Delete Schedule">
                              <i data-lucide="trash-2" style="width:12px;height:12px;"></i>
                            </button>
                          ` : ''}
                        </div>
                      </div>
                    `).join('')}
                  </div>
                </div>

                <!-- Upcoming Overview Widget -->
                <div class="card" style="padding:20px;">
                  <h4 style="margin:0 0 14px; font-size:14px; font-weight:700; color:var(--color-text-primary);">Upcoming District Agenda</h4>
                  <div style="display:flex; flex-direction:column; gap:12px;">
                    ${combinedUpcoming.map(item => {
                      const itemDate = new Date(item.sortDate);
                      const displayDate = itemDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                      const isEvent = item.calendarType === 'event';
                      return `
                        <div style="display:flex; gap:12px; align-items:center; font-size:12px; padding-bottom:10px; border-bottom:1px solid rgba(255,255,255,0.02);">
                          <div style="min-width:54px; padding:4px 6px; border-radius:6px; background:rgba(255,255,255,0.03); text-align:center; border:1px solid var(--color-border);">
                            <strong style="color:var(--color-text-primary);">${displayDate}</strong>
                          </div>
                          <div style="flex:1; min-width:0; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">
                            <div style="font-weight:600; color:var(--color-text-primary); text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">${isEvent ? item.name : item.title}</div>
                            <span style="font-size:10px; color:${isEvent ? '#0066ff' : '#f59e0b'};">${isEvent ? 'District Event' : (item.executive || 'Executive Schedule')}</span>
                          </div>
                        </div>
                      `;
                    }).join('')}
                  </div>
                </div>

              </div>

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
    // Month controls
    document.getElementById('prev-month-btn')?.addEventListener('click', () => {
      calendarMonth--;
      if (calendarMonth < 0) {
        calendarMonth = 11;
        calendarYear--;
      }
      render();
    });

    document.getElementById('next-month-btn')?.addEventListener('click', () => {
      calendarMonth++;
      if (calendarMonth > 11) {
        calendarMonth = 0;
        calendarYear++;
      }
      render();
    });

    // Day selection click
    document.querySelectorAll('.cal-day-real').forEach(cell => {
      cell.addEventListener('click', () => {
        selectedDateStr = cell.dataset.date;
        render();
      });
    });

    // Delete Schedule
    document.querySelectorAll('.delete-schedule-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        const schId = btn.dataset.schId;
        const sch = store.getById('districtSchedules', schId);
        if (!sch) return;

        showConfirm('Delete Schedule', `Are you sure you want to remove the schedule item: <strong>${sch.title}</strong>?`, () => {
          store.delete('districtSchedules', schId);
          showToast('success', 'Schedule Removed', 'The executive schedule item has been deleted.');
          render();
        });
      });
    });

    // Add Schedule Button (Executive role required)
    document.getElementById('add-schedule-btn')?.addEventListener('click', () => {
      const scheduleFormHtml = `
        <div style="display:flex; flex-direction:column; gap:14px;">
          <div class="form-group">
            <label class="form-label">Schedule Title *</label>
            <input type="text" class="form-input" id="sch-title" placeholder="e.g. District President Visit to UOC" required />
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Scheduled Date *</label>
              <input type="date" class="form-input" id="sch-date" value="${selectedDateStr}" required />
            </div>
            <div class="form-group">
              <label class="form-label">Scheduled Time *</label>
              <input type="text" class="form-input" id="sch-time" placeholder="e.g. 10:00 AM or 06:00 PM" required />
            </div>
          </div>
          <div class="form-row">
            <div class="form-group">
              <label class="form-label">Executive Committee Host/Officer *</label>
              <input type="text" class="form-input" id="sch-exec" value="${auth.currentUser?.name || 'District President'}" placeholder="e.g. District President" required />
            </div>
            <div class="form-group">
              <label class="form-label">Agenda/Schedule Type</label>
              <select class="form-select" id="sch-type">
                <option value="visit">Official Club Visit</option>
                <option value="meeting">District Committee Meeting</option>
                <option value="ceremony">Charter Ceremony / Induction</option>
                <option value="other">Other Official Itinerary</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Agenda Description</label>
            <textarea class="form-input" id="sch-desc" style="height:80px; resize:none;" placeholder="Brief details about the visit or meeting agenda..."></textarea>
          </div>
        </div>
      `;

      showModal('Add Executive Schedule', scheduleFormHtml, {
        submitText: 'Save Schedule',
        onSubmit: (close) => {
          const title = document.getElementById('sch-title').value.trim();
          const date = document.getElementById('sch-date').value;
          const time = document.getElementById('sch-time').value.trim();
          const executive = document.getElementById('sch-exec').value.trim();
          const type = document.getElementById('sch-type').value;
          const description = document.getElementById('sch-desc').value.trim();

          if (!title || !date || !time || !executive) {
            showToast('error', 'Validation Error', 'Please fill in all required fields.');
            return;
          }

          store.create('districtSchedules', {
            title,
            date,
            time,
            executive,
            type,
            description
          });

          showToast('success', 'Schedule Saved', `The itinerary for ${executive} has been added.`);
          close();
          selectedDateStr = date; // auto-focus on the date of the new schedule item
          
          // Parse month and year from new date to automatically navigate calendar to it
          const parts = date.split('-');
          calendarYear = parseInt(parts[0]);
          calendarMonth = parseInt(parts[1]) - 1;

          render();
        }
      });
    });
  }

  render();
}
