import { useEffect, useState, useRef } from "react";
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
  const dataFetchedRef = useRef<boolean>(false);
  const cachedDataRef = useRef<{
    deviceTypes: string[];
    transformedData: TransformedData[];
    appVersions: string[];
  } | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (!dataFetchedRef.current) {
        try {
          // @TODO - Eventually we would use an actual endpoint:
          // const response = await fetch("https://endpoint-url-here/data");
          // const data = await response.json();

          const { data } = mockResponse;

          const uniqueDeviceTypes = Array.from(
            new Set(data.map((item) => item.device_type))
          );

          const transformedData = transformData(data, "All");
          const uniqueAppVersions = Array.from(
            new Set(data.flatMap((item) => item.app_version))
          );

          cachedDataRef.current = {
            deviceTypes: uniqueDeviceTypes,
            transformedData: Object.values(transformedData),
            appVersions: uniqueAppVersions,
          };

          dataFetchedRef.current = true;
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }

      if (cachedDataRef.current) {
        setDeviceTypes(cachedDataRef.current.deviceTypes);
        if (selectedDevice === "All") {
          setChartData(cachedDataRef.current.transformedData);
        } else {
          const filteredData = transformData(mockResponse.data, selectedDevice);
          setChartData(Object.values(filteredData));
        }
        setAppVersions(cachedDataRef.current.appVersions);
      }
    };

    fetchData();
  }, [selectedDevice]);

  return { chartData, deviceTypes, appVersions };
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
