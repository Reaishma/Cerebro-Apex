
import { Chart, ChartConfiguration, registerables } from 'chart.js';

Chart.register(...registerables);

export function createRequestChart(canvas: HTMLCanvasElement): Chart {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      datasets: [{
        label: 'Requests per Hour',
        data: [120, 190, 300, 500, 400, 350],
        borderColor: 'hsl(207, 90%, 54%)',
        backgroundColor: 'hsla(207, 90%, 54%, 0.1)',
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'hsl(210, 40%, 98%)'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'hsl(215, 20.2%, 65.1%)' },
          grid: { color: 'hsla(215, 20.2%, 65.1%, 0.1)' }
        },
        y: {
          ticks: { color: 'hsl(215, 20.2%, 65.1%)' },
          grid: { color: 'hsla(215, 20.2%, 65.1%, 0.1)' }
        }
      }
    }
  };

  return new Chart(ctx, config);
}

export function createMetricsChart(canvas: HTMLCanvasElement, metrics: any[]): Chart {
  const ctx = canvas.getContext('2d');
  if (!ctx) throw new Error('Canvas context not available');

  const labels = metrics.map((_, index) => `T-${metrics.length - index}`);
  const cpuData = metrics.map(m => m.cpu || 0);
  const memoryData = metrics.map(m => m.memory || 0);

  const config: ChartConfiguration = {
    type: 'line',
    data: {
      labels,
      datasets: [
        {
          label: 'CPU Usage (%)',
          data: cpuData,
          borderColor: 'hsl(207, 90%, 54%)',
          backgroundColor: 'hsla(207, 90%, 54%, 0.1)',
          tension: 0.4
        },
        {
          label: 'Memory Usage (%)',
          data: memoryData,
          borderColor: 'hsl(35, 91%, 52%)',
          backgroundColor: 'hsla(35, 91%, 52%, 0.1)',
          tension: 0.4
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          labels: {
            color: 'hsl(210, 40%, 98%)'
          }
        }
      },
      scales: {
        x: {
          ticks: { color: 'hsl(215, 20.2%, 65.1%)' },
          grid: { color: 'hsla(215, 20.2%, 65.1%, 0.1)' }
        },
        y: {
          min: 0,
          max: 100,
          ticks: { color: 'hsl(215, 20.2%, 65.1%)' },
          grid: { color: 'hsla(215, 20.2%, 65.1%, 0.1)' }
        }
      }
    }
  };

  return new Chart(ctx, config);
}
