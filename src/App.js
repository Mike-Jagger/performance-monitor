import React, { useEffect, useState } from 'react';
import socketIOClient from 'socket.io-client';
import PerformanceChart from './PerformanceChart';

const ENDPOINT = "http://localhost:4000";

const App = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on('performanceData', (newData) => {
            setData(prevData => [...prevData, newData]);
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