import React, { useState } from "react";
import Header from './components/Header';
import AdBanner from './components/Ads/Google';
import LuckyWheel from "./components/luckyWheel/script";
import { getRandomColor } from "./components/utils";
import "./App.css";

const App = () => {
  const [inputValue, setInputValue] = useState("Ice Cream");
  const [segments, setSegments] = useState([
    { color: getRandomColor(), label: "Kiss or Slap" },
    { color: getRandomColor(), label: "Nothing.." },
    { color: getRandomColor(), label: "$2 < Dairy Milk" },
    { color: getRandomColor(), label: "Nothing.." },
    { color: getRandomColor(), label: "Free Coffee" },
    { color: getRandomColor(), label: "Movie Night" },
  ]);

  const addSegment = (value) => {
    console.log(value, value.length);

    if (value.trim() === "") {
      alert("Please enter a label for the segment!");
      return;
    }
    if (value.length > 50) {
      alert("Label must be less than 50 letters.");
      return;
    }
    setSegments([...segments, { color: getRandomColor(), label: value }]);
    setInputValue("");
  };

  const removeSegment = (e) => {
    if (segments.length > 2) {
      const newSegments = [...segments];
      newSegments.splice(e, 1);
      setSegments(newSegments);
    }
  };

  return (
    <div className="App">
      <Header />
      <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
        <LuckyWheel
          segments={segments}
          removeSegment={removeSegment}
          addSegment={addSegment}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
      <div className="sticky-ad">
        <AdBanner />
      </div>
    </div>
  );
};

export default App;