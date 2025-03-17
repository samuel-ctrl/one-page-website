import React, { useState } from "react";
import Header from './components/Header';
import AdBanner from './components/AdBanner';
import LuckyWheel from "./components/luckyWheelComp/script";

const App = () => {  
  return (
    <div className="App">
      <Header />
      <AdBanner />
      <LuckyWheel />
    </div>
  );
}

export default App;
