import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import ABOUT_CONTENT from '@/content/about.json';

import AboutPageHeader from '@/components/about-page/AboutPageHeader';
import { AboutPageProps } from '@/components/about-page/types';
import AboutPageSection from '@/components/about-page/AboutPageSection';
import { CustomLeftArrow, CustomRightArrow } from '@/components/about-page/CustomArrows';

import useSlideControls from '@/hooks/carousel/useSlideControls';
import useMediaQuery from '@/hooks/useMediaQuery';

const AboutPage: NextPage<AboutPageProps> = ({ content, preamble, title }) => {
  const { currentSlide, setCurrentSlide, ref } = useSlideControls({
    maxSlides: content.length + 1,
  });

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');
  return (
    <>
      {' '}
      <Head>
        <title>{`${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={preamble.replace('\n', ' ')} />
        <meta name="robots" content="nosnippet" />
      </Head>
      <article className="relative flex h-full w-full items-center justify-center">
        <Carousel
          ref={ref}
          containerClass="container"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          customTransition={
            prefersReducedMotion ? 'transform 0ms' : 'transform 800ms ease'
          }
          beforeChange={(nextSlide) => {
            setCurrentSlide(nextSlide);
          }}
          arrows
          responsive={{
            mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
            tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
            desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
          }}
        >
          <AboutPageHeader preamble={preamble} currentSlide={currentSlide} />
          {content.map((item, idx) => {
            const index = idx + 1;
            return (
              <AboutPageSection
                index={index}
                item={item}
                key={item.id}
                currentSlide={currentSlide}
              />
            );
          })}
        </Carousel>
      </article>
    </>
  );
};
export default AboutPage;

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  return {
    props: {
      title: ABOUT_CONTENT.title,
      preamble: ABOUT_CONTENT.preamble,
      content: ABOUT_CONTENT.content.map((item) => {
        return { ...item, id: crypto.randomUUID() };
      }),
    },
  };
};
