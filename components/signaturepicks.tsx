"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Image from "next/image";
import Hero from "./hero";

gsap.registerPlugin(ScrollTrigger);

export default function SignaturePicks({ data }: { data: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const picksRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!heroRef.current || !picksRef.current) return;

      // Start with picks below the hero
      gsap.set(picksRef.current, { yPercent: 100 });

      // Picks slides up to cover hero
      gsap.to(picksRef.current, {
        yPercent: 0,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          end: "50% top",
          scrub: 0.5,
        },
      });

      // Hero moves up slightly as picks covers it
      gsap.to(heroRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "50% top",
          scrub: 0.5,
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="relative h-[200vh]">
      {/* HERO - sticky so it stays while picks scrolls over
      {/* <div ref={heroRef} className="sticky top-0 h-screen overflow-hidden bg-black">*/}
      <Hero ref={heroRef} data={data} />
      {/*</div>*/}

      {/* SIGNATURE PICKS - positioned to slide up over hero */}
      <div
        ref={picksRef}
        style={{ transform: "translateY(100vh)" }}
        className="absolute top-0 left-0 w-full h-[200dvh] bg-red-500 flex items-center justify-center z-10"
      >
        <h1 className="text-5xl font-bold text-white">Signature Picks</h1>
      </div>
    </div>
  );
}
