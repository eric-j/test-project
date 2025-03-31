import React from "react";

import MobileLineChart from "./components/MobileLineChart";
import MobileLineChartTwo from "./components/MobileLineChartTwo";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        Hello! So quite frankly I was unsure how this data was supposed to be
        represented. Given the instructions, it was vague to me if I was
        supposed to show only the timestamp values or show a value for every
        "step" interval between the "start" and "end" time. Below you will see
        an example of both.
      </div>
      <MobileLineChart />
      <MobileLineChartTwo />
    </div>
  );
};

export default App;
