import React, { useState } from "react";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';

const LuckyWheel = () => {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [inputValue, setInputValue] = useState("");

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

  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    const randomRotation = Math.floor(Math.random() * 360) + 3600;
    setRotation((prevRotation) => prevRotation + randomRotation);

    setTimeout(() => {
      setSpinning(false);
    }, 9000);
  };

  const addSegment = () => {
    if (inputValue.trim() === "") {
      alert("Please enter a label for the segment!");
      return;
    }
    setSegments([...segments, { color: getRandomColor(), label: inputValue }]);
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
    <div style={{ textAlign: "center", position: "relative", width: "100%", display: "flex"}}>
      <div style={{ position: "relative", width: "400px", height: "400px", padding: "10px"}}>
        <div
          style={{
            position: "absolute",
            top: "-15px",
            left: "50%",
            rotate: "180deg",
            transform: "translateX(46%)",
            width: "0",
            height: "0",
            borderLeft: "15px solid transparent",
            borderRight: "15px solid transparent",
            borderBottom: "30px solid red",
            zIndex: 20,
          }}
        ></div>

        <div
          style={{
            width: "400px",
            height: "400px",
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
        <div style={{ marginTop: "20px" }}>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter segment label"
            style={{ padding: "5px", marginRight: "10px", width:"350px"}}
          />
          <button onClick={addSegment} disabled={segments.length > 24}>Add Segment</button>
        </div>
      </div>


      <div
        style={{
          gap: "10px",
          marginTop: "20px 10px",
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
            <div style={{display:"flex"}}>
            <div
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: seg.color,
                borderRadius: "4px",
              }}
            ></div>
            <span style={{ fontSize: "14px", fontWeight: "500",marginLeft: "4px" }}>{seg.label}</span>
            </div>
            <RemoveCircleOutlineIcon style={{cursor: "pointer"}} onClick={()=>removeSegment(i)}/>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LuckyWheel;