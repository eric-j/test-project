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
import { LINE_CHART_COLORS } from "../consts/chartColors";
import { mockResponseTwo } from "../mockData";
import { ChartDataEntry, MockResponseType } from "../types";

const MobileLineChart: React.FC = () => {
  const [chartData, setChartData] = useState<ChartDataEntry[]>([]);
  const [appVersions, setAppVersions] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      // @TODO - use real endpoint
      // const response = await fetch("your-api-endpoint-here");
      // const result = await response.json();

      const result: MockResponseType = mockResponseTwo;

      const parsedData = result.data.reduce<Record<string, ChartDataEntry>>(
        (acc, item) => {
          item.timestamp.forEach((time, index) => {
            const date = new Date(time * 1000).toLocaleString();
            if (!acc[date]) acc[date] = { name: date };

            acc[date][item.app_version] = item["crash.count"][index];
          });
          return acc;
        },
        {}
      );

      setChartData(Object.values(parsedData));
      setAppVersions(
        Array.from(new Set(result.data.map((item) => item.app_version)))
      );
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
