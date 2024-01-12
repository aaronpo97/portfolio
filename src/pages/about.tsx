import type { GetStaticProps, NextPage } from 'next';

import aboutInfo from '@/content/pages/about.json';
import Image from 'next/image';
import Head from 'next/head';
import { FC } from 'react';
import { useInView } from 'react-intersection-observer';

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

const TechSection: FC<{
  item: Required<Content>;
}> = ({ item }) => {
  const [frontEndRef, frontEndInView] = useInView();
  const [backEndRef, backEndInView] = useInView();
  const [databasesRef, databasesInView] = useInView();
  const [otherRef, otherInView] = useInView();
  const [currentlyLearningRef, currentlyLearningInView] = useInView();

  return (
    <div className="mt-8">
      {item.tech.map((tech, index) => {
        const refs = [
          { ref: frontEndRef, inView: frontEndInView },
          { ref: backEndRef, inView: backEndInView },
          { ref: databasesRef, inView: databasesInView },
          { ref: otherRef, inView: otherInView },
          { ref: currentlyLearningRef, inView: currentlyLearningInView },
        ];

        return (
          <div
            key={tech.category}
            ref={refs[index].ref}
            className={`${
              refs[index].inView ? 'animate-fade animate-once animate-ease-in' : ''
            }`}
          >
            <h3 className="my-3 text-2xl font-bold uppercase">{tech.category}</h3>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-6">
              {tech.stack.map((stack) => (
                <TechCard stack={stack} key={stack.link} />
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

interface IAboutSectionProps {
  item: Content;
  refValue: (node?: Element | null | undefined) => void;
  inView: boolean;
}

const AboutSection: FC<IAboutSectionProps> = ({ item, refValue, inView }) => {
  return (
    <section
      key={item.id}
      className={`my-3 w-full text-xl ${
        inView ? 'animate-fade animate-once animate-ease-in' : ''
      }`}
      ref={refValue}
    >
      <div>
        <h2 className="my-4 text-3xl font-extrabold md:text-5xl">{item.heading}</h2>

        <div className="space-y-4">
          {item.text.split('\n').map((line, index) => (
            <p key={index}>{line}</p>
          ))}
        </div>

        {item.tech && <TechSection item={item as Required<Content>} />}
      </div>
    </section>
  );
};

const AboutPage: NextPage<AboutPageProps> = ({ content }) => {
  const [preambleRef, preambleInView] = useInView();
  const [goalsRef, goalsInView] = useInView();
  const [technologiesRef, technologiesInView] = useInView();
  const [projectsRef, projectsInView] = useInView();
  const [interestsRef, interestsInView] = useInView();
  const [contactRef, contactInView] = useInView();

  return (
    <>
      <Head>
        <title>{`About Me | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={aboutInfo.preamble} />
      </Head>
      <article className="my-20 flex min-h-dvh flex-col items-center md:my-16">
        <div className="w-10/12 space-y-8 lg:w-6/12">
          <header className="w-full">
            <h1 className="my-7 text-5xl font-extrabold md:my-10 md:text-8xl">
              About Me
            </h1>
            <div
              className={`space-y-4 ${
                preambleInView ? 'animate-fade animate-once animate-ease-in' : ''
              }`}
              ref={preambleRef}
            >
              {aboutInfo.preamble.split('\n').map((line, index) => (
                <p className="text-xl" key={index}>
                  {line}
                </p>
              ))}
            </div>
          </header>
          {content.map((item, index) => {
            const refs = [
              { ref: goalsRef, inView: goalsInView },
              { ref: technologiesRef, inView: technologiesInView },
              { ref: projectsRef, inView: projectsInView },
              { ref: interestsRef, inView: interestsInView },
              { ref: contactRef, inView: contactInView },
            ];
            return (
              <AboutSection
                item={item}
                key={item.id}
                refValue={refs[index].ref}
                inView={refs[index].inView}
              />
            );
          })}
        </div>
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
