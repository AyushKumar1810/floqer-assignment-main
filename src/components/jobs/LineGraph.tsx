// src/components/LineGraph.tsx
import React from 'react';
import { Line } from 'react-chartjs-2';
import jobData from '../../data/data.json'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);





const LineGraph: React.FC = () => {
    const stats = jobData.reduce((acc, job): any => {
        if (!acc[job.work_year]) {
            acc[job.work_year] = 0;
        }
        acc[job.work_year] += 1;
        return acc;
    }, {} as Record<number, number>);

    const years = [2020, 2021, 2022, 2023, 2024];
    const jobCounts = years.map(year => stats[year] || 0);

    const data = {
        labels: years,
        datasets: [
            {
                label: 'Number of Jobs',
                data: jobCounts,
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }
        ]
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Number of Jobs from 2020 to 2024',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineGraph;
