import { useEffect, useState } from "react";
import { mockResponse } from "../mockData";
import { ChartDataEntry, MockResponseType } from "../types";

const useChartData = () => {
  const [chartData, setChartData] = useState<ChartDataEntry[]>([]);
  const [appVersions, setAppVersions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @TODO - use real endpoint
        // const response = await fetch("your-api-endpoint-here");
        // const result = await response.json();

        const result: MockResponseType = mockResponse;

        const parsedData = parseResponseData(result.data);

        setChartData(Object.values(parsedData));
        setAppVersions(
          Array.from(new Set(result.data.map((item) => item.app_version)))
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { chartData, appVersions };
};

const parseResponseData = (
  data: MockResponseType["data"]
): Record<string, ChartDataEntry> => {
  return data.reduce<Record<string, ChartDataEntry>>((acc, item) => {
    item.timestamp.forEach((time, index) => {
      const date = new Date(time * 1000).toLocaleString();
      if (!acc[date]) acc[date] = { time: date };

      acc[date][item.app_version] = item["crash.count"][index];
    });
    return acc;
  }, {});
};

export default useChartData;
