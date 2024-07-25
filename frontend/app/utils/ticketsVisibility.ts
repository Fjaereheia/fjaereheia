import { useEffect, useRef, useState } from "react";

const useIntersectionObserver = (
  callback: (isIntersecting: boolean) => void
) => {
  const observer = useRef<IntersectionObserver | null>(null);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      { threshold: 0.55 }
    );
    if (element) observer.current.observe(element);

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [element, callback]);
  return setElement;
};
export default useIntersectionObserver;
