import { useState, useEffect } from "react";
import { MockResponseType, VersionData } from "../types";
import { mockResponse } from "../mockData";

const useChartStepData = () => {
  const [chartData, setChartData] = useState<VersionData[]>([]);
  const [appVersions, setAppVersions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @TODO - use real endpoint
        // const response = await fetch("your-api-endpoint-here");
        // const result = await response.json();

        const result: MockResponseType = mockResponse;

        const timestamps = generateTimestamps(
          result.start,
          result.end,
          result.step
        );

        const { parsedData, versions } = parseResponse(result.data, timestamps);

        setChartData(Object.values(parsedData));
        setAppVersions(versions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return { chartData, appVersions };
};

const generateTimestamps = (
  start: string,
  end: string,
  step: number
): string[] => {
  const startTime = new Date(start).getTime() / 1000;
  const endTime = new Date(end).getTime() / 1000;

  const timestamps: string[] = [];
  for (let t = startTime; t <= endTime; t += step) {
    timestamps.push(new Date(t * 1000).toLocaleString());
  }

  return timestamps;
};

const parseResponse = (
  data: MockResponseType["data"],
  timestamps: string[]
) => {
  const parsedData: { [date: string]: VersionData } = {};
  const versions = new Set<string>();

  timestamps.forEach((date) => {
    parsedData[date] = { time: date };

    data.forEach((item) => {
      versions.add(item.app_version);
      parsedData[date][item.app_version] = 0;

      item.timestamp.forEach((timeIndex, index) => {
        const time = new Date(timeIndex * 1000).toLocaleString();
        if (time === date)
          parsedData[date][item.app_version] = item["crash.count"][index];
      });
    });
  });

  return { parsedData, versions: Array.from(versions) };
};

export default useChartStepData;
