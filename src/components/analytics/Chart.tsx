import React from "react";
import { Box } from "@mantine/core";
import { Line } from 'react-chartjs-2';
import { Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler, Chart } from 'chart.js';

Chart.register(
  Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement, Filler
);

export default function LineChart(): JSX.Element {
  const axisCallback = (value: number, index: number, values: number[]) => {
    if (value % 20 === 0) {
      return value.toString();
    }
    return '';
  };

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        fill: true,
        borderColor: '#F17B0E',
        backgroundColor: '#fef7ee',
        data: [20, 30, 40, 60, 70, 70, 80, 80, 100, 110, 110, 120],
      },
    ],
  };

  const options: any = {
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: axisCallback,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  return (
    <Box style={{ width: '100%', height: '11rem' }}>
      <Line data={data} options={options} />
    </Box>
  );
}