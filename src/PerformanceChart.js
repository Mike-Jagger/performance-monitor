import React, { useEffect, useRef } from 'react';
// eslint-disable-next-line no-unused-vars
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
    Legend
);

const PerformanceChart = ({ data }) => {
    const chartRef = useRef(null);

    useEffect(() => {
        if (chartRef.current) {
            chartRef.current.destroy();
        }
        const ctx = document.getElementById('performanceChart').getContext('2d');
        chartRef.current = new ChartJS(ctx, {
            type: 'line',
            data: {
                labels: data.map(d => d.timestamp),
                datasets: [
                    {
                        label: 'CPU Usage (%)',
                        data: data.map(d => d.cpuUsage),
                        borderColor: 'rgba(75, 192, 192, 1)',
                        fill: false,
                    },
                    {
                        label: 'Memory Usage (MB)',
                        data: data.map(d => d.memUsage),
                        borderColor: 'rgba(153, 102, 255, 1)',
                        fill: false,
                    },
                    {
                        label: 'Heap Space (bytes)',
                        data: data.map(d => d.heapSpace),
                        borderColor: 'rgba(255, 159, 64, 1)',
                        fill: false,
                    },
                ],
            },
            options: {
                responsive: true,
                scales: {
                    x: {
                        type: 'category',
                        title: {
                            display: true,
                            text: 'Time'
                        }
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Value'
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [data]);

    return <canvas id="performanceChart"></canvas>;
};

export default PerformanceChart;