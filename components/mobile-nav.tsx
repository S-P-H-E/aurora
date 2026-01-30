"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { FaBars, FaXmark } from "react-icons/fa6";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useGSAP(() => {
    if (isOpen) {
      // Animate drawer in
      gsap.fromTo(
        drawerRef.current,
        { x: "100%" },
        { x: "0%", duration: 0.3, ease: "power2.out" }
      );
      // Animate overlay in
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else {
      // Animate drawer out
      gsap.to(drawerRef.current, {
        x: "100%",
        duration: 0.3,
        ease: "power2.in"
      });
      // Animate overlay out
      gsap.to(overlayRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }
  }, [isOpen]);

  return (
    <>
      {/* Hamburger Menu Button */}
      <button
        onClick={toggleMenu}
        className="md:hidden text-white p-2 z-50"
        aria-label="Toggle menu"
      >
        {isOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
      </button>

      {/* Backdrop Overlay */}
      {isOpen && (
        <div
          ref={overlayRef}
          onClick={toggleMenu}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )}

      {/* Slide-in Drawer */}
      <div
        ref={drawerRef}
        className={`fixed top-0 right-0 h-full w-[75vw] max-w-[300px] bg-background z-50 md:hidden transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close Button */}
          <div className="flex justify-end mb-8">
            <button
              onClick={toggleMenu}
              className="p-2"
              aria-label="Close menu"
            >
              <FaXmark size={24} />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-6">
            <Link
              href="/shop"
              onClick={toggleMenu}
              className="text-2xl font-medium hover:text-foreground/80 transition-colors"
            >
              Shop
            </Link>
            <Link
              href="/about"
              onClick={toggleMenu}
              className="text-2xl font-medium hover:text-foreground/80 transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              onClick={toggleMenu}
              className="text-2xl font-medium hover:text-foreground/80 transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
