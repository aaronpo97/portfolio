import type { GetStaticProps, NextPage } from 'next';

import aboutInfo from '@/content/pages/about.json';
import Image from 'next/image';
import Head from 'next/head';
import { FC } from 'react';

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
      <div className="flex flex-col space-y-3 p-3 pt-6">
        <div className="pointer-events-none flex h-24 w-24 items-center justify-center rounded-lg">
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
      <article className="my-20 flex flex-col items-center md:my-16">
        <header className="w-10/12 lg:w-7/12">
          <h1 className="my-7 text-5xl font-extrabold md:my-10 md:text-8xl">About Me</h1>
          <div className="space-y-4">
            {aboutInfo.preamble.split('\n').map((line, index) => (
              <p className="text-xl" key={index}>
                {line}
              </p>
            ))}
          </div>
        </header>
        {content.map((item) => (
          <section key={item.id} className="my-3 w-10/12 text-xl lg:w-7/12">
            <div>
              <h2 className="my-4 text-3xl font-extrabold md:text-5xl">{item.heading}</h2>

              <div className="space-y-4">
                {item.text.split('\n').map((line, index) => (
                  <p key={index}>{line}</p>
                ))}
              </div>

              {item.tech && (
                <div className="mt-8">
                  {item.tech.map((tech) => {
                    return (
                      <div key={tech.category}>
                        <h3 className="my-3 text-2xl font-bold uppercase">
                          {tech.category}
                        </h3>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
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
        ))}
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
