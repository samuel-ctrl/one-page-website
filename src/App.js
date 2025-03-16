import React from 'react';
import Header from './components/Header';
import AdBanner from './components/AdBanner';
import React, { useState } from "react";

function App() {

  const [segments, setSegments] = useState([
    { color: "red", label: "Prize 1" },
    { color: "blue", label: "Prize 2" },
    { color: "green", label: "Prize 3" },
  ]);
  
  const addSegment = () => {
    setSegments([...segments, { color: "yellow", label: `Prize ${segments.length + 1}` }]);
  };
  
  const removeSegment = () => {
    if (segments.length > 1) {
      setSegments(segments.slice(0, -1));
    }
  };

  return (
    <div className="App">
      <Header />
      <AdBanner />
      <div>
        <LuckyWheel segments={segments} />
        <button onClick={addSegment}>Add Segment</button>
        <button onClick={removeSegment}>Remove Segment</button>
      </div>
    </div>
  );
}

export default App;
