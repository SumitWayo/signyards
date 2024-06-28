import React, { useEffect, useState } from "react";

const neonColors = [
  "#FF00FF",
  "#00FFFF",
  "#FF0000",
  "#00FF00",
  "#FFFF00",
  "#FF00FF",
  "#00FFFF",
];

const LoadingScreen = () => {
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % neonColors.length);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-800">
      <h1
        className="text-5xl font-bold text-shadow-md"
        style={{
          color: neonColors[currentColorIndex],
          animation: "pulse 1s infinite",
        }}
      >
        signyards
      </h1>
    </div>
  );
};

export default LoadingScreen;
