"use client";
import clsx from "clsx";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export const Intro = () => {
  const firstText = useRef<HTMLHeadingElement | null>(null);
  const secondText = useRef<HTMLHeadingElement | null>(null);
  const lastText = useRef<HTMLHeadingElement | null>(null);
  const container = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    const timeline = gsap.timeline({});
    if (firstText.current && secondText.current && lastText.current) {
      document.body.style.overflow = "hidden";
      timeline.to(firstText.current, {
        opacity: 1,
        ease: "power1.out",
      });
      timeline.to(firstText.current, {
        opacity: 0,
        delay: 0.3,
      });
      timeline.to(secondText.current, {
        opacity: 1,
        ease: "power1.out",
      });
      timeline.to(secondText.current, {
        opacity: 0,
        delay: 1,
      });
      timeline.to(lastText.current, {
        opacity: 1,
        ease: "power1.out",
      });
      timeline.to(lastText.current, {
        opacity: 0,
        delay: 0.6,
      });
      timeline.to(container.current, {
        opacity: 0,
        pointerEvents: "none",
        onComplete: () => {
          document.body.style.overflow = "auto";
        },
      });
    }
  }, []);
  return (
    <div
      className={clsx(
        "intro flex items-center justify-center fixed top-0 left-0 w-full flex-col text-center font-bold text-white text-4xl h-full bg-[#EE6115] z-[20]"
      )}
      ref={container}
    >
      <h1
        ref={firstText}
        className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0"
      >
        WELCOME
      </h1>
      <h1
        ref={secondText}
        className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0"
      >
        Iraq Oil And Gas <br />
        Technology Exhibition 2025
      </h1>
      <h1
        ref={lastText}
        className="absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4 opacity-0"
      >
        Join us – fill the form
      </h1>
    </div>
  );
};
