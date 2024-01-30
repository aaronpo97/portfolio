import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { ArrowProps } from 'react-multi-carousel';

export const CustomLeftArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      aria-label="Previous slide"
      className="absolute left-0 top-1/2 -translate-y-1/2 transform"
      onClick={onClick}
    >
      <FaChevronLeft className="text-5xl" />
    </button>
  );
};

export const CustomRightArrow = ({ onClick }: ArrowProps) => {
  return (
    <button
      aria-label="Next slide"
      className="absolute right-0 top-1/2 -translate-y-1/2 transform"
      onClick={onClick}
    >
      <FaChevronRight className="text-5xl" />
    </button>
  );
};
