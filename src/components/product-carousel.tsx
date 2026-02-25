"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

type FssaiInfo = {
  licenseNo: string;
  marketerName: string;
  marketerAddress: string;
  logoAlt: string;
};

type ProductCarouselProps = {
  productImage: string | null;
  productName: string;
  fssaiInfo: FssaiInfo;
  ingredients?: string[];
};

export function ProductCarousel({
  productImage,
  productName,
  fssaiInfo,
  ingredients,
}: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeSlide, setActiveSlide] = useState(0);

  const slideCount = ingredients && ingredients.length > 0 ? 3 : 2;

  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth;
    const idx = Math.round(el.scrollLeft / slideWidth);
    setActiveSlide(idx);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  function goToSlide(idx: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: idx * el.offsetWidth, behavior: "smooth" });
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex snap-x snap-mandatory overflow-x-auto scrollbar-none"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {/* Slide 1 — Product Image */}
        <div
          className="w-full flex-shrink-0 snap-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="relative h-64 bg-gradient-to-b from-[#f4fbf7] to-[#e9f7ef] md:h-80">
            {productImage ? (
              <Image
                src={productImage}
                alt={productName}
                fill
                className="object-contain p-4"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            ) : (
              <div className="flex h-full items-center justify-center text-sm font-semibold text-olive-400">
                Product image will be added soon
              </div>
            )}
          </div>
        </div>

        {/* Slide 2 — FSSAI / Compliance Info */}
        <div
          className="w-full flex-shrink-0 snap-start"
          style={{ scrollSnapAlign: "start" }}
        >
          <div className="flex h-64 flex-col items-center justify-center bg-gradient-to-b from-[#eff9f3] to-[#e2f4ea] p-6 md:h-80">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-md">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-8 w-8 text-[#3f8c63]">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
              </svg>
            </div>
            <h3 className="mt-4 text-lg font-extrabold text-[#1d3a2c]">FSSAI Certified</h3>
            <p className="mt-1 text-xs text-olive-500">{fssaiInfo.logoAlt}</p>
            <div className="mt-4 w-full max-w-xs space-y-2">
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-xs font-medium text-olive-500">License No.</span>
                <span className="text-xs font-bold text-[#2b503a]">{fssaiInfo.licenseNo}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-xs font-medium text-olive-500">Marketer</span>
                <span className="text-xs font-bold text-[#2b503a]">{fssaiInfo.marketerName}</span>
              </div>
              <div className="flex items-center justify-between rounded-lg bg-white px-3 py-2 shadow-sm">
                <span className="text-xs font-medium text-olive-500">Address</span>
                <span className="text-xs font-bold text-[#2b503a]">{fssaiInfo.marketerAddress}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Slide 3 — Ingredients (only for multi-ingredient blends) */}
        {ingredients && ingredients.length > 0 && (
          <div
            className="w-full flex-shrink-0 snap-start"
            style={{ scrollSnapAlign: "start" }}
          >
            <div className="flex h-64 flex-col items-center justify-center bg-gradient-to-b from-[#e8f7ee] to-[#f2fbf4] p-6 md:h-80">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} className="h-6 w-6 text-[#3f8c63]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                </svg>
              </div>
              <h3 className="mt-3 text-lg font-extrabold text-[#1d3a2c]">Ingredients</h3>
              <p className="mt-1 text-xs text-olive-500">What goes into this blend</p>
              <div className="mt-4 flex max-w-xs flex-wrap justify-center gap-1.5">
                {ingredients.map((ing) => (
                  <span
                    key={ing}
                    className="rounded-full border border-olive-200 bg-white px-3 py-1 text-xs font-medium text-[#37684b] shadow-sm"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Dot indicators */}
      <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
        {Array.from({ length: slideCount }).map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => goToSlide(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeSlide ? "w-6 bg-[#4f9d73]" : "w-2 bg-olive-300"
            }`}
          />
        ))}
      </div>

      {/* Swipe hint on first slide */}
      {activeSlide === 0 && (
        <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 animate-bounce">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="h-5 w-5 text-olive-400">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </div>
      )}
    </div>
  );
}
