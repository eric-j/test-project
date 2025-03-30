import { useState } from "react";

const useDeviceSelection = () => {
  const [selectedDevice, setSelectedDevice] = useState<string>("All");

  const handleDeviceChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedDevice(event.target.value);
  };

  return {
    selectedDevice,
    handleDeviceChange,
  };
};

export default useDeviceSelection;
