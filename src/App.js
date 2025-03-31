import React, { useState, useEffect } from "react";
import Header from './components/Header/Header';
import AdBanner from './components/Ads/Google';
import LuckyWheel from "./components/luckyWheel/script";
import Footer from "./components/Footer";
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
  const [cookiesAccepted, setCookiesAccepted] = useState(false);

  useEffect(() => {
    // Check if cookies were previously accepted
    const accepted = localStorage.getItem('cookiesAccepted') === 'true';
    setCookiesAccepted(accepted);
  }, []);

  const acceptCookies = () => {
    localStorage.setItem('cookiesAccepted', 'true');
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
        <div className="game-container">
          <LuckyWheel
            segments={segments}
            removeSegment={removeSegment}
            addSegment={addSegment}
            inputValue={inputValue}
            setInputValue={setInputValue}
          />
        </div>

        <section className="instructions">
          <h2>How to Play</h2>
          <ol>
            <li>Click the SPIN button to start the wheel</li>
            <li>Wait for the wheel to stop rotating</li>
            <li>View your result in the popup message</li>
            <li>Add custom segments using the input field</li>
          </ol>
        </section>
      </main>

      <AdBanner />

      <Footer />

      {!cookiesAccepted && (
        <div className="cookie-consent">
          <p>We use cookies to enhance your experience:</p>
          <ul>
            <li>Operate the wheel</li>
            <li>Serve personalized ads</li>
            <li>Analyze traffic</li>
          </ul>
          <button onClick={acceptCookies}>Accept Cookies</button>
          <a href="#privacy-policy">Learn More</a>
        </div>
      )}
    </div>
  );
};

export default App;