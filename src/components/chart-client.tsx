// src/components/chart-client.tsx
'use client';

import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const data = {
  labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May'],
  datasets: [
    {
      label: 'Visitas',
      data: [15, 20, 12, 18, 22],
      fill: false,
      borderColor: 'rgb(180, 83, 9)',
    },
  ],
};

export default function ChartClient() {
  return (
    <div className="max-w-md">
      <Line data={data} />
    </div>
  );
}
