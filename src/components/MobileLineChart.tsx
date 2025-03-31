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
import useChartData from "../customHooks/useChartData";
import useChartStepData from "../customHooks/useChartStepData";
import { LINE_CHART_COLORS } from "../consts/chartColors";

interface MobileLineChartProps {
  usesStepIntervals?: boolean;
}

const MobileLineChart: React.FC<MobileLineChartProps> = ({
  usesStepIntervals,
}) => {
  const { chartData, appVersions } = usesStepIntervals
    ? useChartStepData()
    : useChartData();

  return (
    <>
      <div className="chart-header">
        <h2>Using Start + End + Second Interval</h2>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
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
