import React from 'react';
import { Line } from 'react-chartjs-2';

const PerformanceChart = ({ data }) => {
    const timestamps = data.map(d => d.timestamp);
    const cpuUsage = data.map(d => d.cpuUsage);
    const memUsage = data.map(d => d.memUsage);
    const heapSpace = data.map(d => d.heapSpace);

    const chartData = {
        labels: timestamps,
        datasets: [
            {
                label: 'CPU Usage (%)',
                data: cpuUsage,
                borderColor: 'rgba(75, 192, 192, 1)',
                fill: false,
            },
            {
                label: 'Memory Usage (MB)',
                data: memUsage,
                borderColor: 'rgba(153, 102, 255, 1)',
                fill: false,
            },
            {
                label: 'Heap Space (bytes)',
                data: heapSpace,
                borderColor: 'rgba(255, 159, 64, 1)',
                fill: false,
            },
        ],
    };

    return (
        <div>
            <Line data={chartData} />
        </div>
    );
};

export default PerformanceChart;