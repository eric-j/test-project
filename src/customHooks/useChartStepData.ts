import { useState, useEffect } from "react";
import { MockResponseType, MockResponseData } from "../types";
import { mockResponse } from "../mockData";

interface VersionData {
  time: string;
  [appVersion: string]: number | string;
}

interface ParsedData {
  [date: string]: VersionData;
}

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
        const parsedData = initializeParsedData(timestamps, result.data);
        updateParsedData(parsedData, result.data);

        setChartData(Object.values(parsedData));
        setAppVersions(getUniqueAppVersions(result.data));
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
): number[] => {
  const startTime = new Date(start).getTime() / 1000;
  const endTime = new Date(end).getTime() / 1000;
  const timestamps: number[] = [];

  for (let t = startTime; t <= endTime; t += step) {
    timestamps.push(t);
  }

  return timestamps;
};

const initializeParsedData = (
  timestamps: number[],
  data: MockResponseData[]
): ParsedData => {
  const parsedData: ParsedData = {};

  timestamps.forEach((t) => {
    const date = new Date(t * 1000).toLocaleString();
    parsedData[date] = { time: date };
    data.forEach((item) => {
      parsedData[date][item.app_version] = 0;
    });
  });

  return parsedData;
};

const updateParsedData = (
  parsedData: ParsedData,
  data: MockResponseData[]
): void => {
  data.forEach((item) => {
    item.timestamp.forEach((time, index) => {
      const date = new Date(time * 1000).toLocaleString();
      if (!parsedData[date]) {
        parsedData[date] = { time: date };
      }
      parsedData[date][item.app_version] = item["crash.count"][index];
    });
  });
};

const getUniqueAppVersions = (data: typeof mockResponse.data): string[] => {
  return data.map((item) => item.app_version);
};

export default useChartStepData;
