import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

// Register all necessary Chart.js components
Chart.register(...registerables);

const LineChart = ({ chartData, multiAxis }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    // Destroy the previous chart instance if it exists
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    // Create a new chart instance
    const ctx = chartRef.current.getContext('2d');
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: chartData,
      options: {
        scales: multiAxis ? {
          y: {
            beginAtZero: true,
            type: 'linear'
          },
          y1: {
            beginAtZero: true,
            type: 'linear',
            position: 'right'
          }
        } : {
          y: {
            beginAtZero: true,
            type: 'linear'
          }
        },
        plugins: {
          legend: {
            display: true,
          },
        },
      },
    });

    // Cleanup on unmount
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [chartData, multiAxis]);

  return <canvas ref={chartRef} />;
};

export default LineChart;
