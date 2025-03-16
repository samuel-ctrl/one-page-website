import React, { useState } from "react";

const LuckyWheel = ({ segments }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    setRotation(randomRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 4000);
  };

  return (
    <div style={{ textAlign: "center", position: "relative" }}>
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
          position: "relative",
        }}
      >
        {segments.map((seg, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: `rotate(${(360 / segments.length) * i + 180 / segments.length}deg) translate(150px) rotate(-${(360 / segments.length) * i + 180 / segments.length}deg)`,
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
              width: "100px",
              transformOrigin: "0 0",
            }}
          >
            {seg.label}
          </div>
        ))}
      </div>
      <button
        onClick={spinWheel}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          padding: "10px 20px",
          fontSize: "16px",
          fontWeight: "bold",
          borderRadius: "50%",
          border: "none",
          backgroundColor: "#007BFF",
          color: "white",
          cursor: "pointer",
        }}
        disabled={spinning}
      >
        Spin
      </button>
    </div>
  );
};

export default LuckyWheel;