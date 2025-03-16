import React, { useState } from "react";
import Header from './components/Header';
import AdBanner from './components/AdBanner';
import LuckyWheel from "./components/luckyWheelComp/script";

function App() {

  const [segments, setSegments] = useState([
    { color: "red", label: "Prize 1" },
    { color: "blue", label: "Prize 2" },
    { color: "green", label: "Prize 3" },
    { color: "yellow", label: "Prize 4" },
    { color: "black", label: "Prize 5" },
  ]);
  const [segmentCount, setSegmentCount] = useState(5)

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };
  
  const addSegment = () => {
    setSegments([...segments, { color: getRandomColor(), label: `Prize ${segments.length + 1}` }]);
    setSegmentCount((prev)=>prev+1)
  };
  
  const removeSegment = () => {
    if (segments.length > 1) {
      setSegments(segments.slice(0, -1));
      setSegmentCount((prev)=>prev-1)
    }
  };

  return (
    <div className="App">
      <Header />
      <AdBanner />
      <div>
        <LuckyWheel segments={segments} />
        <button onClick={addSegment} disabled={segmentCount > 24}>Add Segment</button>
        <button onClick={removeSegment} disabled={segmentCount < 4}>Remove Segment</button>
      </div>
    </div>
  );
}

export default App;
