import { GetStaticProps, NextPage } from 'next';
import PROJECTS_CONTENT from '@/content/projects.json';
import { ProjectsPageProps } from '@/components/projects-page/types';

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import Head from 'next/head';
import useSlideControls from '@/hooks/carousel/useSlideControls';
import useIsMobile from '@/hooks/useIsMobile';
import { CustomLeftArrow, CustomRightArrow } from '@/components/about-page/CustomArrows';

import ProjectsSection from '@/components/projects-page/ProjectsSection';
import ProjectsHeader from '@/components/projects-page/ProjectsHeader';

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
          <ProjectsHeader currentSlide={currentSlide} preamble={preamble} />

          {projects.map((project, index) => {
            return (
              <ProjectsSection
                doAnimation={currentSlide === index + 1}
                project={project}
                key={project.id}
              />
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
