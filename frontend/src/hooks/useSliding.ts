import { useState, useEffect } from "react";

export const useSliding = (length: number) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [length]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? length - 1 : prev - 1));
  };

  return { currentIndex, handleNext, handlePrev };
};

export default useSliding;
