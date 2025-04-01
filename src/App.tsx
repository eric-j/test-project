import React from "react";

import MobileLineChart from "./components/MobileLineChart";
// import MobileLineChartTwo from "./components/MobileLineChartTwo";

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="disclaimer">
        <div>
          Hello! So quite frankly I was unsure how this data was supposed to be
          represented. Given the instructions, it was vague to me if I was
          supposed to show only the timestamp values or show a value for every
          "step" interval between the "start" and "end" time. Below you will see
          an example of both.
        </div>
        <div>
          BONUS: For the bonus I added a version filter. I figured since mobile
          developers often have multiple versions of an app out in the world at
          the same time (due to app stores, unable to force upgrade, etc.) it
          would be nice to be able to reduce overlapping graphical noise.
        </div>
      </div>

      <MobileLineChart usesStepIntervals={true} />
      <MobileLineChart />
    </div>
  );
};

export default App;
