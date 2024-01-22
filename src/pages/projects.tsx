import { GetStaticProps, NextPage } from 'next';
import PROJECTS_CONTENT from '@/content/projects.json';
import { ProjectsPageProps } from '@/components/projects-page/types';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Head from 'next/head';
import useSlideControls from '@/hooks/carousel/useSlideControls';
import useIsMobile from '@/hooks/useIsMobile';
import { CustomLeftArrow, CustomRightArrow } from '@/components/about-page/CustomArrows';
import CarouselInstructions from '@/components/ui/CarouselInstructions';
import classNames from 'classnames';
import TechCard from '@/components/about-page/TechCard';
import SocialIcon from '@/components/homepage/SocialIcon';
import { FaGithub, FaLink } from 'react-icons/fa';

const ProjectsPage: NextPage<ProjectsPageProps> = ({ preamble, title, projects }) => {
  const { currentSlide, ref, setCurrentSlide } = useSlideControls({
    maxSlides: projects.length + 1,
  });
  const isMobile = useIsMobile();
  return (
    <>
      <Head>
        <title>{`${title} | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content={preamble} />
      </Head>
      <article className="relative flex h-dvh w-full touch-pan-x touch-pan-y select-none items-center justify-center">
        <Carousel
          ref={ref}
          containerClass="container"
          customLeftArrow={<CustomLeftArrow />}
          customRightArrow={<CustomRightArrow />}
          customTransition="transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1.0)"
          beforeChange={(nextSlide) => {
            setCurrentSlide(nextSlide);
          }}
          arrows={!isMobile}
          responsive={{
            mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
            tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
            desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
          }}
        >
          <header className="flex h-dvh flex-col items-center justify-center">
            <div className="w-9/12 space-y-4">
              <h1
                className={classNames('w-full text-2xl font-extrabold md:text-8xl', {
                  'animate-fade-left': currentSlide === 0,
                  'opacity-0': currentSlide !== 0,
                })}
              >
                Projects
              </h1>
              <div
                className={classNames('space-y-4', {
                  'animate-fade-right': currentSlide === 0,
                  'opacity-0': currentSlide !== 0,
                })}
              >
                {preamble.split('\n').map((line, index) => (
                  <p className="md:text-2xl" key={index}>
                    {line}
                  </p>
                ))}
              </div>
            </div>
            <CarouselInstructions doAnimation={currentSlide === 0} slideCount={4} />
          </header>

          {projects.map((project, index) => {
            const doAnimation = currentSlide === index + 1;
            return (
              <section
                className="flex h-dvh flex-col items-center justify-center"
                key={project.id}
              >
                <div className="w-9/12 space-y-4">
                  <header className="flex items-start justify-between">
                    <h1
                      className={classNames(
                        'w-full text-2xl font-extrabold md:text-8xl',
                        {
                          'animate-fade-left': doAnimation,
                          'opacity-0': !doAnimation,
                        },
                      )}
                    >
                      {project.title}
                    </h1>

                    <div
                      className={classNames('flex space-x-4 ', {
                        'animate-fade-right': doAnimation,
                        'opacity-0': !doAnimation,
                      })}
                    >
                      <SocialIcon
                        href={project.githubURL}
                        icon={FaGithub}
                        socialName="Github"
                        tooltipPosition="top"
                      />
                      <SocialIcon
                        href={project.liveURL}
                        icon={FaLink}
                        socialName="Deployment"
                        tooltipPosition="top"
                      />
                    </div>
                  </header>
                  <div
                    className={classNames('space-y-4', {
                      'animate-fade-right': doAnimation,
                      'opacity-0': !doAnimation,
                    })}
                  >
                    {project.text.split('\n').map((line, idx) => (
                      <p className="md:text-2xl" key={idx}>
                        {line}
                      </p>
                    ))}

                    <div className="space-y-3">
                      <p className="text-2xl font-bold uppercase">Built with</p>
                      <div className="grid grid-cols-7 gap-2">
                        {project.stack.map((tech, idx) => (
                          <TechCard stack={tech} key={idx} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            );
          })}
        </Carousel>
      </article>
    </>
  );
};

export const getStaticProps: GetStaticProps<ProjectsPageProps> = async () => {
  return {
    props: {
      preamble: PROJECTS_CONTENT.preamble,
      title: PROJECTS_CONTENT.title,
      projects: PROJECTS_CONTENT.projects.map((project) => {
        return { ...project, id: crypto.randomUUID() };
      }),
    },
  };
};

export default ProjectsPage;
