import { FC } from 'react';

import Carousel from 'react-multi-carousel';
import { Content } from './types';
import TechCard from './TechCard';
import 'react-multi-carousel/lib/styles.css';

const AboutPageTechSection: FC<{ item: Content }> = ({ item }) => {
  const { tech } = item;

  return !tech ? null : (
    <Carousel
      additionalTransfrom={0}
      arrows={false}
      autoPlay
      autoPlaySpeed={2300}
      centerMode={false}
      draggable
      focusOnSelect={false}
      keyBoardControl
      minimumTouchDrag={80}
      pauseOnHover
      renderArrowsWhenDisabled={false}
      renderButtonGroupOutside={false}
      renderDotsOutside={false}
      rewind={false}
      rewindWithAnimation={false}
      rtl={false}
      shouldResetAutoplay
      showDots
      sliderClass=""
      slidesToSlide={1}
      swipeable={false}
      responsive={{
        desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
        mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
        tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
      }}
    >
      {tech.map((t) => {
        return (
          <div key={t.category}>
            <h3 className="my-3 text-lg font-bold uppercase md:my-4 md:text-2xl">
              {t.category}
            </h3>
            <div className="grid grid-cols-3 gap-2 xl:grid-cols-7">
              {t.stack.map((stack) => (
                <TechCard stack={stack} key={stack.link} />
              ))}
            </div>
          </div>
        );
      })}
    </Carousel>
  );
};

export default AboutPageTechSection;
