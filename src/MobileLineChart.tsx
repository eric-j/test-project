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
import { LINE_CHART_COLORS } from "./consts/chartColors";

const MobileLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<TransformedData[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<string>("All");

  useEffect(() => {
    const { data } = mockResponse;

    const transformedData: Record<string, TransformedData> = {};

    data.forEach((item) => {
      if (selectedDevice === "All" || item.device_type === selectedDevice) {
        item.timestamp.forEach((timestamp, index) => {
          const date = new Date(timestamp * 1000);
          const formattedDate = new Intl.DateTimeFormat("en-US", {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }).format(date);
          if (!transformedData[formattedDate]) {
            transformedData[formattedDate] = { name: formattedDate };
          }
          transformedData[formattedDate][item.app_version] =
            item.crash_count[index];
        });
      }
    });

    setChartData(Object.values(transformedData));
  }, [selectedDevice]);

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  return (
    <>
      <div className="chart-header">
        <h1>App Crash Analysis</h1>
        <div className="controls">
          <label htmlFor="deviceTypeSelect">Select Device Type:</label>
          <select
            id="deviceTypeSelect"
            onChange={handleDeviceChange}
            value={selectedDevice}
            className="chart-select"
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
          {mockResponse.data.map((item, index) => (
            <Line
              key={item.app_version}
              type="monotone"
              dataKey={item.app_version}
              stroke={LINE_CHART_COLORS[index % LINE_CHART_COLORS.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MobileLineChart;
