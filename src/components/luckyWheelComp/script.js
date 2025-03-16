import React, { useState } from "react";

const LuckyWheel = ({ segments }) => {
  const [rotation, setRotation] = useState(0);

  const spinWheel = () => {
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    setRotation(randomRotation);
  };

  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "300px",
          height: "300px",
          borderRadius: "50%",
          background: `conic-gradient(
            ${segments.map((seg, i) => `${seg.color} ${(360 / segments.length) * i}deg ${(360 / segments.length) * (i + 1)}deg`).join(", ")}
          )`,
          transform: `rotate(${rotation}deg)`,
          transition: "transform 4s ease-out",
        }}
      ></div>
      <button onClick={spinWheel} style={{ marginTop: "20px" }}>
        Spin
      </button>
    </div>
  );
};

export default LuckyWheel;