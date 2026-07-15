"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LOADER_STORAGE_KEY = "atlas-loader-last-shown-v2";
const LOADER_HTML_CLASS = "loader-active";
const LOADER_FLAG_ATTR = "data-show-loader";

function todayKey() {
  const now = new Date();
  return [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("-");
}

export function DailyLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState<object | null>(null);

  useEffect(() => {
    const html = document.documentElement;
    if (window.location.pathname.startsWith("/admin")) {
      html.classList.remove(LOADER_HTML_CLASS);
      html.setAttribute(LOADER_FLAG_ATTR, "false");
      setIsVisible(false);
      return;
    }
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

    const failsafe = window.setTimeout(() => {
      html.classList.remove(LOADER_HTML_CLASS);
      html.setAttribute(LOADER_FLAG_ATTR, "false");
      setIsVisible(false);
    }, 8000);

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
      window.clearTimeout(failsafe);
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
      className="atlas-loader"
    >
      {animationData ? (
        <div className="atlas-loader-animation">
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
