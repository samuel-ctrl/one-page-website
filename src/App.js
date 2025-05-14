import React, { useState, useEffect } from "react";
import Cookies from "./components/Cookies/script";
import useSimpleStore from "./store/SimpleStore";
import "./App.css";
import Header from "./components/Header/DynamicHeader";
import AdBanner from "./components/Ads/Google";
import LuckyWheel from "./components/luckyWheel/script";
import Footer from "./components/Footer";
import Chat from "./components/Chat/script";
import { getRandomColor } from "./components/utils";
import { featureOptionEnum } from "./common/constant.tsx";

const COMPONENT_MAP = {
  [featureOptionEnum.LUCKY_WHEEL]: LuckyWheel,
  [featureOptionEnum.DIRECT_CHAT]: Chat,
};

const App = () => {
  const { activeMode } = useSimpleStore();
  const [inputValue, setInputValue] = useState("Ice Cream");
  const [segments, setSegments] = useState([
    { color: getRandomColor(), label: "Kiss or Slap" },
    { color: getRandomColor(), label: "Nothing.." },
    { color: getRandomColor(), label: "$2 < Dairy Milk" },
    { color: getRandomColor(), label: "Nothing.." },
    { color: getRandomColor(), label: "Free Coffee" },
    { color: getRandomColor(), label: "Movie Night" },
  ]);
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookiesAccepted") === "true";
    setCookiesAccepted(accepted);
  }, []);

  const ActiveComponent = COMPONENT_MAP[activeMode] || LuckyWheel;

  const acceptCookies = () => {
    localStorage.setItem("cookiesAccepted", "true");
    setCookiesAccepted(true);
  };

  const addSegment = (value) => {
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

  const removeSegment = (index) => {
    if (segments.length > 2) {
      const newSegments = [...segments];
      newSegments.splice(index, 1);
      setSegments(newSegments);
    }
  };

  return (
    <div className="App">
      <Header />
      <main className="content-section">
        <ActiveComponent
          segments={segments}
          removeSegment={removeSegment}
          addSegment={addSegment}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </main>

      <AdBanner />

      <Footer />

      <Cookies
        cookiesAccepted={cookiesAccepted}
        acceptCookies={acceptCookies}
      />
    </div>
  );
};

export default App;
