import Link from 'next/link';
import { FunctionComponent } from 'react';
import { FaGithub, FaLink } from 'react-icons/fa';
import { ProjectInfo } from '../../schema/projectMetadata';
import SocialIcon from '../homepage/SocialIcon';

const ProjectCard: FunctionComponent<{ projectInfo: ProjectInfo }> = ({
  projectInfo,
}) => {
  const { githubURL, liveURL, slug, stack, title, metaDesc } = projectInfo;
  return (
    <div className="my-5 bg-base-300">
      <div className="card-body">
        <div className="mb-3">
          <h1 className="text-6xl font-bold">
            <Link href={`${slug}`} className="link-hover link">
              {title}
            </Link>
          </h1>
          <h2 className="text-2xl font-semibold italic">built with {stack}</h2>
        </div>
        <div>
          <p>{metaDesc}</p>

          <div className="mt-7 space-x-3">
            <SocialIcon
              socialName="Github"
              href={githubURL}
              icon={FaGithub}
              tooltipPosition="bottom"
            />
            <SocialIcon
              socialName="Deployment"
              href={liveURL}
              icon={FaLink}
              tooltipPosition="bottom"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
