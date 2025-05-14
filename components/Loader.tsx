"use client"
import { useState, useEffect } from "react";

export default function Loader({ text = "Loading" }) {
  const [phase, setPhase] = useState(0);
  const dotCount = 3; // Reduced to three dots as requested

  useEffect(() => {
    const interval = setInterval(() => {
      setPhase((prev) => (prev + 1) % dotCount);
    }, 120); // Faster animation speed

    return () => clearInterval(interval);
  }, []);

  // Calculate each dot's position in the wave pattern
  const getDotStyles = (index: number) => {
    // Calculate position in the wave (0 to dotCount-1)
    const position = (phase + index) % dotCount;

    // Calculate the y-translate value based on position in wave
    // Creates a smooth wave effect with more pronounced movement
    const translateY =
      position < dotCount / 2
        ? -10 * (1 - Math.abs(position / (dotCount / 2) - 1))
        : 0;

    return {
      transform: `translateY(${translateY}px)`,
    };
  };

  return (
    <div className="flex items-center font-medium text-white">
      <span className="mr-2">{text}</span>
      <div className="flex space-x-1">
        {[...Array(dotCount)].map((_, i) => (
          <span
            key={i}
            className="inline-block w-1 h-1 text-white bg-white rounded-full transition-transform duration-300 ease-in-out"
            style={getDotStyles(i)}
          />
        ))}
      </div>
    </div>
  );
}
