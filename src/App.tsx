import React from "react";

import MobileLineChart from "./components/MobileLineChart";
// import MobileLineChartTwo from "./components/MobileLineChartTwo";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="disclaimer">
        <div>
          Hello! I made the assumption that there should be a data point for
          every step interval and that the chart should start and stop at the
          dedicated start/stop times.
        </div>
        <div>
          BONUS: For the bonus I added a version filter. I figured since mobile
          developers often have multiple versions of an app out in the world at
          the same time (due to app stores, unable to force upgrade, etc.) it
          would be nice to be able to reduce overlapping graphical noise.
        </div>
      </div>

      <MobileLineChart />
    </div>
  );
};

export default App;
