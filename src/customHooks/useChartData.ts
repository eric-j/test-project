import { useEffect, useState } from "react";
import { TransformedData, DataItem } from "../types";
import { mockResponse } from "../mockData";

const useChartData = (
  selectedDevice: string
): {
  chartData: TransformedData[];
  deviceTypes: string[];
  appVersions: string[];
} => {
  const [chartData, setChartData] = useState<TransformedData[]>([]);
  const [deviceTypes, setDeviceTypes] = useState<string[]>([]);
  const [appVersions, setAppVersions] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // @TODO - Eventually we would use an actual endpoint:
        // const response = await fetch("https://endpoint-url-here/data");
        // const data = await response.json();

        const { data } = mockResponse;

        const uniqueDeviceTypes = Array.from(
          new Set(data.map((item) => item.device_type))
        );
        setDeviceTypes(uniqueDeviceTypes);
        const transformedData = transformData(data, selectedDevice);
        setChartData(Object.values(transformedData));
        const uniqueAppVersions = Array.from(
          new Set(data.flatMap((item) => item.app_version))
        );
        setAppVersions(uniqueAppVersions);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedDevice]);

  return { chartData, deviceTypes, appVersions }; // Updated return to include appVersions
};

const transformData = (
  data: DataItem[],
  selectedDevice: string
): Record<string, TransformedData> => {
  const transformedData: Record<string, TransformedData> = {};

  data.forEach((item) => {
    if (selectedDevice === "All" || item.device_type === selectedDevice) {
      item.timestamp.forEach((timestamp: number, index: number) => {
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

  return transformedData;
};

export default useChartData;
