import React, { useState } from "react";
import Header from './components/Header';
import AdBanner from './components/AdBanner';
import LuckyWheel from "./components/luckyWheelComp/script";

function App() {

  const getRandomColor = () => {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const [segments, setSegments] = useState([
    { color: getRandomColor(), label: "label 1" },
    { color: getRandomColor(), label: "label 2" },
    { color: getRandomColor(), label: "label 3" },
    { color: getRandomColor(), label: "label 4" },
  ]);
  const [segmentCount, setSegmentCount] = useState(5)
  const [inputValue, setInputValue] = useState("");

  
  const addSegment = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a label for the segment!");
      return;
    }
    setSegments([...segments, { color: getRandomColor(), label: inputValue }]);
    setSegmentCount((prev)=>prev+1)
    setInputValue("");
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
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <LuckyWheel segments={segments} />
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter segment label"
            style={{ padding: "5px", marginRight: "10px" }}
          />
          <button onClick={addSegment} disabled={segmentCount > 24}>Add Segment</button>
          <button onClick={removeSegment} disabled={segmentCount < 2}>Remove Segment</button>
        </div>
      </div>
    </div>
  );
}

export default App;
