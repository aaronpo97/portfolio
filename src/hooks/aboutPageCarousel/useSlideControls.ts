import { useState, useRef, useEffect } from 'react';
import Carousel from 'react-multi-carousel';

const useSlideControls = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const ref = useRef<Carousel>(null);
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!ref.current) {
        return;
      }
      const { key } = event;

      switch (key) {
        case 'ArrowLeft': {
          ref.current.previous(1);
          break;
        }
        case 'ArrowRight': {
          ref.current.next(1);
          break;
        }
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6': {
          const slideNumber = parseInt(key, 10) - 1;
          ref.current.goToSlide(slideNumber);
          setCurrentSlide(slideNumber);
          break;
        }

        default:
          break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return { currentSlide, setCurrentSlide, ref };
};

export default useSlideControls;
