import { useEffect, useState } from "react";
import { mockResponse } from "../mockData";
import { TransformedData } from "../types";

const useChartData = (selectedDevice: string): TransformedData[] => {
  const [chartData, setChartData] = useState<TransformedData[]>([]);

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

  return chartData;
};

export default useChartData;
