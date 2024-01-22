import { useState, useRef, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

const useSlideControls = ({ maxSlides }: { maxSlides: number }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<Carousel>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ref.current) {
        return;
      }
      const { key } = event;
      const parsedKey = parseInt(key, 10);
      const keyIsValidNumber = parsedKey > 0 && parsedKey <= maxSlides;

      if (key === 'ArrowLeft') {
        ref.current.previous(1);
      }
      if (key === 'ArrowRight') {
        ref.current.next(1);
      }
      if (keyIsValidNumber) {
        ref.current.goToSlide(parsedKey - 1);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [maxSlides]);

  return { currentSlide, setCurrentSlide, ref };
};

export default useSlideControls;
