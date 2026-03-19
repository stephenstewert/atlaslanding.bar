"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LOADER_STORAGE_KEY = "atlas-loader-last-shown";
const LOADER_HTML_CLASS = "loader-active";
const LOADER_FLAG_ATTR = "data-show-loader";

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function DailyLoader() {
  const [isVisible, setIsVisible] = useState(() => {
    if (typeof document === "undefined") {
      return false;
    }

    return document.documentElement.getAttribute(LOADER_FLAG_ATTR) === "true";
  });
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    const shouldShowFromFlag = html.getAttribute(LOADER_FLAG_ATTR) === "true";
    const today = todayKey();
    const shouldShow =
      shouldShowFromFlag ||
      window.localStorage.getItem(LOADER_STORAGE_KEY) !== today;

    if (!shouldShow) {
      html.classList.remove(LOADER_HTML_CLASS);
      html.setAttribute(LOADER_FLAG_ATTR, "false");
      setIsVisible(false);
      return;
    }

    html.classList.add(LOADER_HTML_CLASS);
    html.setAttribute(LOADER_FLAG_ATTR, "true");
    setIsVisible(true);
    window.localStorage.setItem(LOADER_STORAGE_KEY, today);

    let cancelled = false;
    void import("@/data/atlas-loader-animation.json")
      .then((module) => {
        if (cancelled) {
          return;
        }
        setAnimationData(module.default as object);
      })
      .catch(() => {
        if (cancelled) {
          return;
        }
        setIsVisible(false);
        html.classList.remove(LOADER_HTML_CLASS);
        html.setAttribute(LOADER_FLAG_ATTR, "false");
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const closeLoader = () => {
    const html = document.documentElement;
    html.classList.remove(LOADER_HTML_CLASS);
    html.setAttribute(LOADER_FLAG_ATTR, "false");
    setIsVisible(false);
  };

  if (!isVisible) {
    return null;
  }

  return (
    <div
      data-loader-root
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#242424]"
    >
      {animationData ? (
        <div className="h-screen w-screen">
          <Lottie
            animationData={animationData}
            autoplay
            loop={false}
            style={{ width: "100%", height: "100%" }}
            onComplete={closeLoader}
          />
        </div>
      ) : null}
    </div>
  );
}
