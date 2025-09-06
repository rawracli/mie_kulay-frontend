import { useState, useEffect } from "react";

export default function useScrollBehaviour() {
  const [isVisible, setIsVisible] = useState(true);
  const [isOnTop, setIsOnTop] = useState(true);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    let ticking = false;

    const controlItem = () => {
      const currentScrollY = window.scrollY;

      const atTop = currentScrollY === 0;
      setIsOnTop(prev => (prev !== atTop ? atTop : prev));

      const shouldBeVisible = !(currentScrollY > lastScrollY && currentScrollY > 150);
      setIsVisible(prev => (prev !== shouldBeVisible ? shouldBeVisible : prev));

      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(controlItem);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return { isVisible, isOnTop };
}
