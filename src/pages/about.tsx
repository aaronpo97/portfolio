import type { GetStaticProps, NextPage } from 'next';

import aboutInfo from '@/content/pages/about.json';
import Image from 'next/image';
import Head from 'next/head';
import { FC } from 'react';
import PageScroller from 'react-page-scroller/PageScroller';

export interface AboutPageProps {
  title: string;
  preamble: string;
  content: Content[];
}

export interface Content {
  heading: string;
  text: string;
  tech?: Tech[];
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
}> = ({ stack }) => {
  return (
    <a
      className={`btn btn-primary btn-sm h-full`}
      href={stack.link}
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex flex-col items-center justify-center space-y-3 p-3 pt-6">
        <div className="pointer-events-none flex h-10 w-10 items-center justify-center rounded-lg">
          <Image
            src={stack.icon}
            alt={stack.text}
            width={96}
            height={96}
            className="h-full w-full"
          />
        </div>
        <h4 className="text-xl font-semibold">{stack.text}</h4>
      </div>
    </a>
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
        <PageScroller animationTimer={700} renderAllPagesOnFirstRender>
          <section>
            <h1 className="my-7 text-5xl font-extrabold md:my-10 md:text-8xl">
              About Me
            </h1>
            <section className="h-screen pt-20">
              <div className="space-y-4">
                {aboutInfo.preamble.split('\n').map((line, index) => (
                  <p className="text-xl" key={index}>
                    {line}
                  </p>
                ))}
              </div>
            </section>
          </section>
          {content.map((item, index) => {
            return (
              <section
                key={item.id}
                className="flex h-screen flex-col items-center justify-center"
              >
                <div className={`w-10/12`}>
                  <h2 className="text-3xl font-extrabold md:text-5xl">{item.heading}</h2>

                  <div className="space-y-4">
                    {item.text.split('\n').map((line) => (
                      <p key={index} className="text-xl">
                        {line}
                      </p>
                    ))}
                  </div>

                  {item.tech && (
                    <div className="grid grid-cols-3 gap-x-20">
                      {item.tech.map((tech) => {
                        return (
                          <div key={tech.category}>
                            <h3 className="my-3 text-2xl font-bold uppercase">
                              {tech.category}
                            </h3>
                            <div className="grid grid-cols-5 gap-2 md:grid-cols-4">
                              {tech.stack.map((stack) => (
                                <TechCard stack={stack} key={stack.link} />
                              ))}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </section>
            );
          })}
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
