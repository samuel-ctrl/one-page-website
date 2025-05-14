import React, { useState } from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Button1 from "../Button/script.js";

const LuckyWheel = ({
  segments,
  removeSegment,
  addSegment,
  inputValue,
  setInputValue,
  ...rest
}) => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    setRotation((prevRotation) => prevRotation + randomRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 9000);
  };

  return (
    <div
      style={{
        textAlign: "center",
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative", width: "400px", height: "400px" }}>
        {/* Arrow */}
        <div
          style={{
            position: "absolute",
            rotate: "180deg",
            top: "-17px",
            left: "50%",
            transform: "translateX(50%)",
            width: "0",
            height: "0",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "30px solid red",
            zIndex: 20,
          }}
        ></div>

        {/* Wheel */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            background: `conic-gradient(
              ${segments.map((seg, i) => `${seg.color} ${(360 / segments.length) * i}deg ${(360 / segments.length) * (i + 1)}deg`).join(", ")}
            )`,
            transform: `rotate(${rotation}deg)`,
            transition: "transform 9s ease-out",
            position: "relative",
          }}
        >
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

      <div style={{ marginTop: "20px" }}>
        <div
          style={{
            margin: "20px 10px",
          }}
        >
          {segments.map((seg, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "8px",
                backgroundColor: "#f9f9f9",
                padding: "8px 12px",
                borderRadius: "8px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                marginBottom: "10px",
              }}
            >
              <div style={{ display: "flex" }}>
                <div
                  style={{
                    width: "20px",
                    height: "20px",
                    backgroundColor: seg.color,
                    borderRadius: "4px",
                  }}
                ></div>
                <span
                  style={{
                    fontSize: "14px",
                    fontWeight: "500",
                    marginLeft: "4px",
                  }}
                >
                  {seg.label}
                </span>
              </div>
              <RemoveCircleOutlineIcon
                style={{ cursor: "pointer" }}
                onClick={() => removeSegment(i)}
              />
            </div>
          ))}
        </div>

        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            console.log(inputValue.length);
            inputValue.length < 50 && setInputValue(e.target.value);
          }}
          placeholder="Enter segment label"
          style={{ padding: "5px", marginRight: "10px", width: "350px" }}
          disabled={segments.length > 24}
        />

        <Button1
          whenClick={() => addSegment(inputValue)}
          disabled={segments.length > 24}
          text={"Add Segment"}
        />
      </div>
    </div>
  );
};

export default LuckyWheel;
