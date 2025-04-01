import { useState } from "react";
import { ChartDataEntry } from "../types";

const useVersionFilter = (
  chartData: ChartDataEntry[],
  appVersions: string[]
) => {
  const [selectedVersion, setSelectedVersion] = useState<string>("");

  const filteredChartData = chartData.map((entry) => {
    if (!selectedVersion) return entry;
    return { time: entry.time, [selectedVersion]: entry[selectedVersion] };
  });

  const handleVersionChange = (version: string) => {
    setSelectedVersion(version);
  };

  return {
    filteredChartData,
    selectedVersion,
    appVersions,
    handleVersionChange,
  };
};

export default useVersionFilter;
