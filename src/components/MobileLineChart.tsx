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
import useChartStepData from "../customHooks/useChartStepData";
import useVersionFilter from "../customHooks/useVersionFilter";
import { LINE_CHART_COLORS } from "../consts/chartColors";
import VersionFilter from "./VersionFilter";
import { formatXAxis } from "../utils/dateUtils";

const MobileLineChart: React.FC = ({}) => {
  const { chartData, appVersions } = useChartStepData();
  const {
    filteredChartData,
    selectedVersion,
    appVersions: versions,
    handleVersionChange,
  } = useVersionFilter(chartData, appVersions);

  return (
    <>
      <div className="chart-header">
        <VersionFilter
          appVersions={versions}
          selectedVersion={selectedVersion}
          onVersionChange={handleVersionChange}
        />
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          data={filteredChartData}
          margin={{ top: 20, right: 30, left: 20, bottom: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" tickFormatter={formatXAxis} />
          <YAxis />
          <Tooltip />
          <Legend />
          {selectedVersion ? (
            <Line
              key={selectedVersion}
              type="monotone"
              dataKey={selectedVersion}
              stroke={LINE_CHART_COLORS[0]}
            />
          ) : (
            versions.map((appVersion, index) => (
              <Line
                key={appVersion}
                type="monotone"
                dataKey={appVersion}
                stroke={LINE_CHART_COLORS[index % LINE_CHART_COLORS.length]}
              />
            ))
          )}
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default React.memo(MobileLineChart);
