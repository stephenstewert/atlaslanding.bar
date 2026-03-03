"use client";

import { useEffect, useState } from "react";
import Lottie from "lottie-react";

const LOADER_ANIMATION_URL =
  "https://cdn.prod.website-files.com/643b06564581272492d75842/64f043d68af9f6e69ce4527c_Atlas%20Animation-2.json";
const LOADER_STORAGE_KEY = "atlas-loader-last-shown";

type AnimationData = Record<string, unknown>;

function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function DailyLoader() {
  const [isVisible, setIsVisible] = useState(false);
  const [animationData, setAnimationData] = useState<AnimationData | null>(null);

  useEffect(() => {
    const lastShown = window.localStorage.getItem(LOADER_STORAGE_KEY);
    const today = todayKey();

    if (lastShown === today) {
      return;
    }

    window.localStorage.setItem(LOADER_STORAGE_KEY, today);
    setIsVisible(true);

    void fetch(LOADER_ANIMATION_URL)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to load animation JSON");
        }

        return response.json() as Promise<AnimationData>;
      })
      .then(setAnimationData)
      .catch(() => {
        setIsVisible(false);
      });
  }, []);

  if (!isVisible || !animationData) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-[#242424]">
      <div className="h-screen w-screen">
        <Lottie
          animationData={animationData}
          autoplay
          loop={false}
          style={{ width: "100%", height: "100%" }}
          onComplete={() => setIsVisible(false)}
        />
      </div>
    </div>
  );
}
