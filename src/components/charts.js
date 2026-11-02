// ============================================
// LEO NEXUS PORTAL — CHART HELPERS
// Modern SaaS Chart.js configuration
// ============================================

const chartInstances = new Map();

const oceanTheme = {
  colors: ['#2563eb', '#38bdf8', '#6366f1', '#10b981', '#f59e0b', '#f43f5e', '#8b5cf6', '#06b6d4'],
  gridColor: 'rgba(226, 232, 240, 0.7)',
  tickColor: '#64748b',
  tooltipBg: '#0f172a',
  tooltipBorder: '#1e293b',
  fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
};

function getDefaultOptions(type) {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: type !== 'bar' && type !== 'line',
        position: 'bottom',
        labels: {
          color: oceanTheme.tickColor,
          font: { family: oceanTheme.fontFamily, size: 12, weight: '600' },
          padding: 16,
          usePointStyle: true,
          pointStyle: 'circle',
        }
      },
      tooltip: {
        backgroundColor: oceanTheme.tooltipBg,
        titleColor: '#ffffff',
        bodyColor: '#cbd5e1',
        borderColor: oceanTheme.tooltipBorder,
        borderWidth: 1,
        padding: 12,
        cornerRadius: 12,
        titleFont: { family: oceanTheme.fontFamily, weight: '700' },
        bodyFont: { family: oceanTheme.fontFamily },
        displayColors: true,
        boxPadding: 6,
      }
    },
    scales: (type === 'bar' || type === 'line') ? {
      x: {
        grid: { color: oceanTheme.gridColor, drawBorder: false },
        ticks: { color: oceanTheme.tickColor, font: { family: oceanTheme.fontFamily, size: 11 } },
        border: { display: false }
      },
      y: {
        grid: { color: oceanTheme.gridColor, drawBorder: false },
        ticks: { color: oceanTheme.tickColor, font: { family: oceanTheme.fontFamily, size: 11 } },
        border: { display: false },
        beginAtZero: true,
      }
    } : undefined,
    animation: {
      duration: 800,
      easing: 'easeOutQuart'
    }
  };
}

export function createChart(canvasId, type, data, customOptions = {}) {
  // Destroy existing instance
  if (chartInstances.has(canvasId)) {
    chartInstances.get(canvasId).destroy();
    chartInstances.delete(canvasId);
  }

  const canvas = document.getElementById(canvasId);
  if (!canvas) return null;

  const ctx = canvas.getContext('2d');
  const defaults = getDefaultOptions(type);
  const options = deepMerge(defaults, customOptions);

  // Apply ocean theme colors to datasets
  if (data.datasets) {
    data.datasets.forEach((ds, i) => {
      const color = oceanTheme.colors[i % oceanTheme.colors.length];
      if (type === 'bar') {
        ds.backgroundColor = ds.backgroundColor || color + '99';
        ds.borderColor = ds.borderColor || color;
        ds.borderWidth = ds.borderWidth ?? 1;
        ds.borderRadius = ds.borderRadius ?? 6;
        ds.borderSkipped = ds.borderSkipped ?? false;
      } else if (type === 'line') {
        ds.borderColor = ds.borderColor || color;
        ds.backgroundColor = ds.backgroundColor || color + '15';
        ds.borderWidth = ds.borderWidth ?? 2;
        ds.tension = ds.tension ?? 0.4;
        ds.fill = ds.fill ?? true;
        ds.pointRadius = ds.pointRadius ?? 3;
        ds.pointHoverRadius = ds.pointHoverRadius ?? 6;
        ds.pointBackgroundColor = ds.pointBackgroundColor || color;
      } else if (type === 'doughnut' || type === 'pie') {
        if (!ds.backgroundColor) {
          ds.backgroundColor = oceanTheme.colors.slice(0, data.labels?.length || 4).map(c => c + 'cc');
        }
        if (!ds.borderColor) {
          ds.borderColor = 'rgba(10, 14, 39, 0.8)';
        }
        ds.borderWidth = ds.borderWidth ?? 2;
      } else if (type === 'radar') {
        ds.borderColor = ds.borderColor || color;
        ds.backgroundColor = ds.backgroundColor || color + '20';
        ds.borderWidth = ds.borderWidth ?? 2;
        ds.pointRadius = ds.pointRadius ?? 3;
        ds.pointBackgroundColor = ds.pointBackgroundColor || color;
      }
    });
  }

  if (type === 'radar' && options.scales) {
    delete options.scales.x;
    delete options.scales.y;
    options.scales = {
      r: {
        grid: { color: oceanTheme.gridColor },
        ticks: { color: oceanTheme.tickColor, backdropColor: 'transparent', font: { size: 10 } },
        pointLabels: { color: oceanTheme.tickColor, font: { family: oceanTheme.fontFamily, size: 11 } },
        angleLines: { color: oceanTheme.gridColor },
        beginAtZero: true
      }
    };
  }

  const chart = new Chart(ctx, { type, data, options });
  chartInstances.set(canvasId, chart);
  return chart;
}

export function destroyChart(canvasId) {
  if (chartInstances.has(canvasId)) {
    chartInstances.get(canvasId).destroy();
    chartInstances.delete(canvasId);
  }
}

export function destroyAllCharts() {
  chartInstances.forEach(chart => chart.destroy());
  chartInstances.clear();
}

function deepMerge(target, source) {
  const output = { ...target };
  for (const key of Object.keys(source)) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      output[key] = deepMerge(target[key] || {}, source[key]);
    } else {
      output[key] = source[key];
    }
  }
  return output;
}
