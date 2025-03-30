import React from "react";
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
import useChartData from "./customHooks/useChartData";
import useDeviceSelection from "./customHooks/useDeviceSelection";
import { LINE_CHART_COLORS } from "./consts/chartColors";
import { mockResponse } from "./mockData";

const MobileLineChart: React.FC = () => {
  const { selectedDevice, handleDeviceChange } = useDeviceSelection();
  const chartData = useChartData(selectedDevice);

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
            {mockResponse.data
              .map((item) => item.device_type)
              .filter(
                (deviceType, index, self) => self.indexOf(deviceType) === index
              )
              .map((deviceType, index) => (
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
