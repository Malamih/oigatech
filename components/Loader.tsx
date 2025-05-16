"use client";
import clsx from "clsx";
import { useState, useEffect } from "react";

export default function Loader({ text = "Loading", color = "white" }) {
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
    <div
      className={clsx("flex items-center font-medium", {
        "text-black": color == "black",
        "text-white": color != "black",
      })}
    >
      <span className="mr-2">{text}</span>
      <div className="flex space-x-1">
        {[...Array(dotCount)].map((_, i) => (
          <span
            key={i}
            className={clsx(
              "inline-block w-1 h-1 rounded-full  transition-transform duration-300 ease-in-out",
              {
                "text-black bg-black": color == "black",
                "text-white bg-white": color != "black",
              }
            )}
            style={getDotStyles(i)}
          />
        ))}
      </div>
    </div>
  );
}
