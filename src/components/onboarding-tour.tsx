"use client";

import { useEffect, useState } from "react";

const TOUR_KEY = "asvadavat-tour-v1";

const steps = [
  {
    icon: "\u{1F44B}",
    title: "Welcome to ASVADAVAT!",
    body: "Let us show you around our premium tea and spice catalog. This quick tour will help you get started.",
  },
  {
    icon: "\u{1F6CD}\uFE0F",
    title: "Browse Products",
    body: "Tap the menu icon (top-right on mobile) or the navigation links to explore our full catalog of teas and spices.",
  },
  {
    icon: "\u{1F50D}",
    title: "Search & Filter",
    body: "Use the search bar, category filter, pack-size selector, and max-price field to find exactly what you need.",
  },
  {
    icon: "\u{2795}",
    title: "Add to Enquiry",
    body: "Found something you like? Tap the 'Add' button. You'll see a green confirmation toast and can continue shopping.",
  },
  {
    icon: "\u{1F4E9}",
    title: "Send Your Enquiry",
    body: "Open your enquiry basket, fill in your details, and submit via the form or send directly on WhatsApp!",
  },
  {
    icon: "\u{2728}",
    title: "You're All Set!",
    body: "Explore our premium teas and spices. Happy browsing!",
  },
];

export function OnboardingTour() {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (localStorage.getItem(TOUR_KEY)) return;
    const timer = setTimeout(() => setVisible(true), 900);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    function handleRestart() {
      setStep(0);
      setVisible(true);
    }
    window.addEventListener("asvadavat-restart-tour", handleRestart);
    return () => window.removeEventListener("asvadavat-restart-tour", handleRestart);
  }, []);

  function finish() {
    localStorage.setItem(TOUR_KEY, "1");
    setVisible(false);
  }

  function next() {
    if (step < steps.length - 1) setStep(step + 1);
    else finish();
  }

  if (!visible) return null;

  const current = steps[step];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="animate-scale-in w-full max-w-[22rem] rounded-3xl bg-white p-6 shadow-2xl">
        <div className="mb-3 text-center text-5xl">{current.icon}</div>
        <h3 className="text-center text-xl font-extrabold text-amber-950">{current.title}</h3>
        <p className="mt-3 text-center text-sm leading-relaxed text-amber-700">{current.body}</p>

        <div className="mt-5 flex justify-center gap-1.5">
          {steps.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === step ? "w-6 bg-amber-600" : i < step ? "w-2 bg-amber-400" : "w-2 bg-amber-200"
              }`}
            />
          ))}
        </div>

        <div className="mt-5 flex gap-3">
          <button
            type="button"
            onClick={finish}
            className="flex-1 rounded-xl border border-amber-200 py-2.5 text-sm font-medium text-amber-600 transition-colors hover:bg-amber-50 active:bg-amber-100"
          >
            Skip
          </button>
          <button
            type="button"
            onClick={next}
            className="flex-1 rounded-xl bg-gradient-to-r from-amber-600 to-orange-500 py-2.5 text-sm font-bold text-white shadow-md transition-transform active:scale-95"
          >
            {step === steps.length - 1 ? "Get Started" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
