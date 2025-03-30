import React, { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { mockResponse } from "./mockData";
import { TransformedData } from "./types";

const App: React.FC = () => {
  const [chartData, setChartData] = useState<TransformedData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("All");

  useEffect(() => {
    const { data } = mockResponse;

    const transformedData: Record<string, TransformedData> = {};

    data.forEach((item) => {
      if (selectedDevice === "All" || item.device_type === selectedDevice) {
        item.timestamp.forEach((timestamp, index) => {
          const date = new Date(timestamp * 1000).toISOString();
          if (!transformedData[date]) {
            transformedData[date] = { name: date };
          }
          transformedData[date][item.app_version] = item.crash_count[index];
        });
      }
    });

    setChartData(Object.values(transformedData));
  }, [selectedDevice]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <div className="App">
      <h1>App Crash Analysis</h1>
      <div className="controls">
        <label htmlFor="deviceTypeSelect">Select Device Type:</label>
        <select
          id="deviceTypeSelect"
          onChange={handleDeviceChange}
          value={selectedDevice}
        >
          <option value="All">All</option>
          {Array.from(
            new Set(mockResponse.data.map((item) => item.device_type))
          ).map((deviceType, index) => (
            <option key={index} value={deviceType}>
              {deviceType}
            </option>
          ))}
        </select>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          {mockResponse.data.map((item) => (
            <Line
              key={item.app_version}
              type="monotone"
              dataKey={item.app_version}
              stroke={`#${Math.floor(Math.random() * 16777215).toString(16)}`}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default App;
