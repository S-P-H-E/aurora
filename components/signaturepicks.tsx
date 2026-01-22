"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const products = [
  {
    key: 1,
    label: "Chrysoberyl Cats Eye",
    description: "Best for Anxiety",
    price: "R450,00",
    previous_price: "",
    image: "/signaturepicks/1.png",
    paragraph: "Known for its mesmerizing cat's eye effect, this rare gemstone has been treasured for centuries for its ability to calm the mind and soothe anxious thoughts. Its golden-green hues carry the energy of the sun, bringing warmth and clarity to those who wear it.",
  },
  {
    key: 2,
    label: "Crystal Trees",
    description: "Protection and grounding",
    price: "R350,00",
    previous_price: "R650,00",
    image: "/signaturepicks/2.png",
    paragraph: "Handcrafted with authentic healing crystals, these decorative trees serve as powerful anchors for your space. Each branch holds carefully selected stones that work together to create a protective shield while keeping you connected to the earth's stabilizing energy.",
  },
  {
    key: 3,
    label: "Blue Calcite Stand",
    description: "For LOVE AND RELATIONSHIPS",
    price: "R250,00",
    previous_price: "",
    image: "/signaturepicks/3.png",
    paragraph: "This serene blue crystal resonates with the throat and heart chakras, facilitating clear communication and emotional expression. Perfect for nurturing relationships, it helps dissolve barriers and opens pathways to deeper connections with loved ones.",
  },
];

export default function SignaturePicks({ data }: { data: string }) {
  const container = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const heading = container.current?.querySelector(".sig-heading");
      const description = container.current?.querySelector(".sig-description");
      const words = container.current?.querySelectorAll(".sig-word");
      const cards = container.current?.querySelectorAll(".sig-card");
      const images = container.current?.querySelectorAll(".sig-card img");
      const productTexts = container.current?.querySelectorAll(".product-text");

      if (!heading || !description || !words || !cards || !images || !productTexts) return;

      const totalCards = cards.length;

      // Initial states for split text - words start blurred and invisible
      gsap.set(words, {
        opacity: 0,
        filter: "blur(20px)",
        scale: 0.8,
      });

      gsap.set(description, {
        opacity: 0,
        y: 30,
        filter: "blur(10px)",
      });

      // All cards start below viewport
      for (let i = 0; i < totalCards; i++) {
        gsap.set(cards[i], { y: "100%", scale: 1, rotation: 0 });
        gsap.set(images[i], { scale: 1 });
      }

      // All product texts start hidden
      gsap.set(productTexts, { opacity: 0, y: 30 });

      // Delay to let Lenis initialize
      const timeout = setTimeout(() => {
        // PHASE 1: Heading entrance animation (as section scrolls into view)
        const entranceTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 5%",
            scrub: 0.3,
          },
        });

        // Words blur in with stagger
        entranceTimeline.to(words, {
          opacity: 1,
          filter: "blur(0px)",
          scale: 1,
          stagger: 0.12,
          ease: "none",
          duration: 1,
        });

        // Description fades and blurs in
        entranceTimeline.to(
          description,
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            ease: "none",
            duration: 0.6,
          },
          0.6
        );

        // PHASE 2: Pinned section with card stacking animations
        // Timeline: 1 for first card entrance + (totalCards - 1) for transitions
        // Multiply by 1.5 for longer reading time between cards
        const totalScrollLength = window.innerHeight * totalCards * 1.5;

        const pinnedTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: `+=${totalScrollLength}`,
            pin: true,
            pinSpacing: true,
            anticipatePin: 1,
            scrub: 0.5,
            onUpdate: (self) => {
              // Update progress dots based on which card is visible
              const progress = self.progress;
              // First card appears during 0-1, then transitions happen at 1+
              const timelinePosition = progress * totalCards;
              const activeIndex = Math.min(
                Math.max(0, Math.floor(timelinePosition)),
                totalCards - 1
              );

              container.current
                ?.querySelectorAll(".progress-dot")
                .forEach((dot: Element, index: number) => {
                  if (index === activeIndex) {
                    (dot as HTMLElement).style.transform = "scale(1.5)";
                    (dot as HTMLElement).style.backgroundColor = "#000";
                  } else {
                    (dot as HTMLElement).style.transform = "scale(1)";
                    (dot as HTMLElement).style.backgroundColor =
                      "rgba(0,0,0,0.3)";
                  }
                });
            },
          },
        });

        // STEP 1: First card slides up, text blurs out as card covers it
        // First card starts sliding up immediately
        pinnedTimeline.to(
          cards[0],
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          0
        );

        // First product text fades in
        pinnedTimeline.to(
          productTexts[0],
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            ease: "none",
          },
          0.3
        );

        // Words blur out as the card covers them
        pinnedTimeline.to(
          words,
          {
            opacity: 0,
            filter: "blur(20px)",
            scale: 1.1,
            stagger: 0.03,
            duration: 0.3,
            ease: "none",
          },
          0.2
        );

        // Description blurs and fades out
        pinnedTimeline.to(
          description,
          {
            opacity: 0,
            y: -20,
            filter: "blur(10px)",
            duration: 0.25,
            ease: "none",
          },
          0.25
        );

        // STEP 2: Card stacking animations - current card scales down and rotates, next card slides up
        for (let i = 0; i < totalCards - 1; i++) {
          const currentCard = cards[i];
          const currentImage = images[i];
          const nextCard = cards[i + 1];
          const currentText = productTexts[i];
          const nextText = productTexts[i + 1];
          const position = 1 + i; // Start after first card is in

          // Current card scales down and rotates
          pinnedTimeline.to(
            currentCard,
            {
              scale: 0.5,
              rotation: 10,
              duration: 1,
              ease: "none",
            },
            position
          );

          // Current card's image zooms in
          pinnedTimeline.to(
            currentImage,
            {
              scale: 1.5,
              duration: 1,
              ease: "none",
            },
            position
          );

          // Next card slides up and covers
          pinnedTimeline.to(
            nextCard,
            {
              y: "0%",
              duration: 1,
              ease: "none",
            },
            position
          );

          // Current product text fades out
          pinnedTimeline.to(
            currentText,
            {
              opacity: 0,
              y: -20,
              duration: 0.5,
              ease: "none",
            },
            position
          );

          // Next product text fades in
          pinnedTimeline.to(
            nextText,
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: "none",
            },
            position + 0.4
          );
        }

        ScrollTrigger.refresh();
      }, 100);

      // Cleanup
      return () => {
        clearTimeout(timeout);
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative z-20">
      <div
        id="signature-picks"
        ref={sectionRef}
        className="h-screen bg-white flex items-center justify-center overflow-hidden"
      >
        {/* Progress Indicator */}
        <div className="absolute left-8 bottom-8 z-50 flex flex-row gap-3">
          {products.map((_, index) => (
            <div
              key={index}
              className="progress-dot w-2 h-2 rounded-full bg-black/30 transition-all duration-300"
            />
          ))}
        </div>

        {/* Heading Section */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none" style={{ perspective: "1000px" }}>
          <div className="text-center px-8 max-w-4xl" style={{ transformStyle: "preserve-3d" }}>
            <h2 className="sig-heading text-6xl md:text-8xl font-medium text-black" style={{ transformStyle: "preserve-3d" }}>
              {["Our", "Signature", "Crystal", "Picks"].map((word, i) => (
                <span
                  key={i}
                  className="sig-word inline-block mr-[0.3em] last:mr-0"
                  style={{ opacity: 0, filter: "blur(20px)" }}
                >
                  {word}
                </span>
              ))}
            </h2>
            <p className="sig-description mt-8 text-xl text-[#666] max-w-2xl mx-auto">
              Each piece defined by natural beauty, vibrant energy, and timeless elegance
            </p>
          </div>
        </div>

        {/* Main Content - Split Layout */}
        <div className="relative z-20 w-[90%] max-w-7xl flex flex-col md:flex-row items-center justify-between gap-12 md:gap-16">
          {/* Left Side - Product Info */}
          <div className="product-info relative w-full md:w-1/2 h-[300px] md:h-[500px]">
            {products.map((product, index) => (
              <div
                key={product.key}
                className="product-text absolute inset-0 flex flex-col justify-center"
                style={{ opacity: 0 }}
              >
                <span className="text-sm font-medium tracking-wider uppercase text-black/50 mb-4">
                  {String(index + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}
                </span>
                <h3 className="text-4xl md:text-5xl font-medium text-black mb-3">
                  {product.label}
                </h3>
                <p className="text-lg text-black/60 mb-6">{product.description}</p>
                <p className="text-base text-black/70 leading-relaxed mb-8 max-w-md">
                  {product.paragraph}
                </p>
                <div className="flex items-baseline gap-4 mb-8">
                  <span className="text-3xl md:text-4xl font-medium text-black">
                    {product.price}
                  </span>
                  {product.previous_price && (
                    <span className="text-xl text-black/40 line-through">
                      {product.previous_price}
                    </span>
                  )}
                </div>
                <button className="w-fit px-8 py-3 bg-black text-white font-medium rounded-full hover:bg-black/80 transition-all duration-300 hover:scale-105 active:scale-95 pointer-events-auto">
                  View Details
                </button>
              </div>
            ))}
          </div>

          {/* Right Side - Cards */}
          <div className="cards-wrapper relative w-full md:w-1/2 aspect-square max-w-[500px] rounded-2xl overflow-hidden">
            {products.map((product, index) => (
              <div
                className="sig-card absolute inset-0 rounded-2xl overflow-hidden will-change-transform"
                key={product.key}
                style={{ transform: "translateY(100%)" }}
              >
                {/* Image */}
                <div className="absolute inset-0">
                  <Image
                    src={product.image}
                    alt={product.label}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 500px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
