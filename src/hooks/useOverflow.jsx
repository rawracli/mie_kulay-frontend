import { useEffect, useRef, useState } from "react";

const useOverflow = ({ direction = "vertical" } = {}) => {
  const refOverflow = useRef(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const el = refOverflow.current;
    if (!el) return;

    const checkOverflow = () => {
      if (!refOverflow.current) return;
      const { scrollHeight, clientHeight, scrollWidth, clientWidth } = refOverflow.current;

      if (direction === "vertical") {
        setIsOverflowing(scrollHeight > clientHeight);
      } else if (direction === "horizontal") {
        setIsOverflowing(scrollWidth > clientWidth);
      }
    };

    checkOverflow();

    const resizeObserver = new ResizeObserver(checkOverflow);
    resizeObserver.observe(el);

    const mutationObserver = new MutationObserver(() => {
      checkOverflow();
    });

    mutationObserver.observe(el, {
      childList: true,
      subtree: true,
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
    };
  }, [direction]);

  return { refOverflow, isOverflowing };
};

export default useOverflow;
