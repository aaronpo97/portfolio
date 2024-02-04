import classNames from 'classnames';
import { FaGithub, FaLink } from 'react-icons/fa';
import { FC } from 'react';
import TechCard from '../about-page/TechCard';
import SocialIcon from '../homepage/SocialIcon';
import { Project } from './types';

const ProjectsSection: FC<{
  project: Project;
  doAnimation: boolean;
}> = ({ doAnimation, project }) => {
  return (
    <section
      className="flex min-h-dvh flex-col items-center justify-center md:mt-0"
      key={project.id}
    >
      <div className="w-9/12 space-y-6">
        <header className="flex items-start justify-between">
          <h1
            className={classNames('w-full text-xl font-extrabold md:text-6xl', {
              'animate-fade-left': doAnimation,
              'opacity-0': !doAnimation,
            })}
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
          className={classNames('col-span-2 space-y-4', {
            'animate-fade-right': doAnimation,
            'opacity-0': !doAnimation,
          })}
        >
          {project.text.split('\n').map((line, idx) => (
            <p className="text-sm md:text-xl" key={idx}>
              {line}
            </p>
          ))}

          <div className="space-y-3">
            <p className="font-bold uppercase lg:text-2xl">Built with</p>
            <div className="grid grid-cols-3 gap-2 md:grid-cols-8">
              {project.stack.map((tech, idx) => (
                <TechCard stack={tech} key={idx} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default ProjectsSection;
