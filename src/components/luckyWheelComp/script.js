import React, { useState } from "react";

const LuckyWheel = ({ segments }) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    setRotation((prevRotation) => prevRotation + randomRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 4000);
  };

  return (
    <div style={{ textAlign: "center", position: "relative", width: "300px", height: "300px", margin: "auto" }}>
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
        {segments.map((seg, i) => {
          const angle = (360 / segments.length) * i;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: `rotate(${angle}deg) translate(110px) rotate(${angle * -1}deg)`,
                transformOrigin: "0 0",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
                textAlign: "center",
                width: "80px",
              }}
            >
              {seg.label}
            </div>
          );
        })}
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
            width: "80px",
            height: "80px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
            zIndex: 10,
          }}
          disabled={spinning}
        >
          Spin
        </button>
      </div>
    </div>
  );
};

export default LuckyWheel;