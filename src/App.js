import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import PerformanceChart from './PerformanceChart';

const ENDPOINT = "http://localhost:4000";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);

        // Handle initial data
        socket.on('performanceDataInit', (initialData) => {
            setData(initialData);
        });

        // Handle new data points
        socket.on('performanceData', (newData) => {
            setData(prevData => {
                const updatedData = [...prevData, newData];
                if (updatedData.length > 20) {
                    updatedData.shift();
                }
                return updatedData;
            });
        });

        return () => socket.disconnect();
    }, []);

    return (
        <div className="App">
            <h1>Browser Performance Monitor</h1>
            <PerformanceChart data={data} />
        </div>
    );
};

export default App;
