import type { GetStaticProps, NextPage } from 'next';

import aboutInfo from '@/content/pages/about.json';
import Head from 'next/head';

import AboutPageHeader from '@/components/about-page/AboutPageHeader';

import { AboutPageProps } from '@/components/about-page/types';
import AboutPageSection from '@/components/about-page/AboutPageSection';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useIsMobile from '@/hooks/useIsMobile';
import { useState } from 'react';

const AboutPage: NextPage<AboutPageProps> = ({ content }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const isMobile = useIsMobile();

  return (
    <>
      <Head>
        <title>{`About Me | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={aboutInfo.preamble} />
      </Head>
      <article className="relative flex h-full w-full items-center justify-center">
        <Carousel
          centerMode={false}
          containerClass="container"
          draggable
          customTransition="transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1.0)"
          ssr
          focusOnSelect={false}
          itemClass="w-dvh"
          keyBoardControl
          rtl={false}
          shouldResetAutoplay
          beforeChange={(nextSlide) => {
            setCurrentSlide(nextSlide);
          }}
          sliderClass=""
          slidesToSlide={1}
          arrows={!isMobile}
          responsive={{
            mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
            tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
            desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
          }}
        >
          <AboutPageHeader currentSlide={currentSlide} />
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
      title: aboutInfo.title,
      preamble: aboutInfo.preamble,
      content: aboutInfo.content.map((item) => {
        return {
          ...item,
          id: crypto.randomUUID(),
        };
      }),
    },
  };
};
