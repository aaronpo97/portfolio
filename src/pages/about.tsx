import type { GetStaticProps, NextPage } from 'next';

import aboutInfo from '@/content/pages/about.json';
import Image from 'next/image';
import Head from 'next/head';
import { FC } from 'react';
import PageScroller from '@/components/ui/page-scroller/PageScroller';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';

export interface AboutPageProps {
  title: string;
  preamble: string;
  content: Content[];
}

export interface Course {
  instructor: string;
  title: string;
  link: string;
}
export interface Content {
  heading: string;
  text: string;
  tech?: Tech[];
  courses?: Course[];
  id: string;
}

export interface Tech {
  category: string;
  stack: Stack[];
}

export interface Stack {
  text: string;
  icon: string;
  link: string;
}

const TechCard: FC<{
  stack: Stack;
  index: number;
}> = ({ stack }) => {
  return (
    <div // button
      className={`card card-compact bg-primary`}
      // href={stack.link}
      // target="_blank"
      // rel="noopener noreferrer"
    >
      <div className="card-body h-full items-center justify-center">
        <div className="pointer-events-none flex h-12 w-12 items-center justify-center rounded-lg md:h-28 md:w-28">
          <Image
            src={stack.icon}
            alt={stack.text}
            width={96}
            height={96}
            className="h-full w-full"
          />
        </div>
        <h4 className="font-semibold md:text-xl">{stack.text}</h4>
      </div>
    </div>
  );
};

const AboutPageHeader: FC = () => {
  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-10/12 md:w-7/12">
        <h1 className="my-7 text-2xl font-extrabold md:my-10 md:text-8xl">About Me</h1>

        <div className="space-y-4">
          {aboutInfo.preamble.split('\n').map((line, index) => (
            <p className="md:text-2xl" key={index}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </header>
  );
};

const AboutPageTechSection: FC<{ item: Content }> = ({ item }) => (
  <Slider
    autoplay
    swipe
    autoplaySpeed={2000}
    arrows={false}
    slidesToShow={1}
    slidesToScroll={1}
    fade
  >
    {item.tech!.map((tech) => {
      return (
        <div key={tech.category}>
          <h3 className="my-3 text-lg font-bold uppercase md:text-2xl">
            {tech.category}
          </h3>
          <div className="grid grid-cols-3 gap-2 md:grid-cols-7">
            {tech.stack.map((stack, i) => (
              <TechCard stack={stack} key={stack.link} index={i} />
            ))}
          </div>
        </div>
      );
    })}
  </Slider>
);

const CoursesSection: FC<{ item: Content }> = ({ item }) => {
  return (
    <>
      <ul className="list-inside list-disc space-y-1 text-sm md:text-xl">
        {item.courses!.map((course) => (
          <li key={course.link}>
            <a
              className="link-hover text-base-content"
              href={course.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              &quot;{course.title}&quot;
            </a>
            <span className="text-base-content"> by </span>
            <span className="text-base-content">{course.instructor}</span>
          </li>
        ))}
      </ul>
    </>
  );
};

const AboutPageSection: FC<{
  item: Content;
  index: number;
}> = ({ item, index }) => {
  return (
    <section
      key={item.id}
      className={`flex h-dvh flex-col items-center justify-center ${
        index % 2 === 0 ? 'bg-base-200' : 'bg-base-100'
      }`}
    >
      <div className="mt-16 w-10/12 space-y-3 md:mt-0 md:w-7/12">
        <h2 className="my-10 text-2xl font-extrabold md:text-8xl">{item.heading}</h2>
        <div className="space-y-4">
          {item.text.split('\n').map((line, i) => (
            <p key={i} className="md:text-2xl">
              {line}
            </p>
          ))}
        </div>

        {item.tech && <AboutPageTechSection item={item} />}

        {item.courses && <CoursesSection item={item} />}
      </div>
    </section>
  );
};

const AboutPage: NextPage<AboutPageProps> = ({ content }) => {
  return (
    <>
      <Head>
        <title>{`About Me | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={aboutInfo.preamble} />
      </Head>
      <article>
        <PageScroller containerHeight="100dvh">
          <AboutPageHeader />
          {content.map((item, index) => (
            <AboutPageSection item={item} key={item.id} index={index} />
          ))}
        </PageScroller>
      </article>
    </>
  );
};

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
export default AboutPage;
