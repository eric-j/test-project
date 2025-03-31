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
import { LINE_CHART_COLORS } from "../consts/chartColors";
import useMobileLineChartData from "../customHooks/useChartDataTwo";

const MobileLineChart: React.FC = () => {
  const { chartData, appVersions } = useMobileLineChartData();

  return (
    <>
      <div className="chart-header">
        <h2>Using timestamps WITHOUT the start, end, and step interval</h2>
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
          {appVersions.map((appVersion, index) => (
            <Line
              key={appVersion}
              type="monotone"
              dataKey={appVersion}
              stroke={LINE_CHART_COLORS[index % LINE_CHART_COLORS.length]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default MobileLineChart;
