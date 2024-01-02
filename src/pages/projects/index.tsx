import matter from 'gray-matter';
import { NextPage, GetStaticProps } from 'next';
import fs from 'fs/promises';
import Head from 'next/head';
import ProjectCard from '@/components/projects/ProjectCard';

import { ProjectInfo, projectMetadataSchema } from '@/schema/projectMetadata';

const ProjectIndex: NextPage<{
  projectsInfo: ProjectInfo[];
}> = ({ projectsInfo }) => {
  return (
    <>
      <Head>
        <title>Projects</title>
      </Head>
      <div className="flex justify-center">
        <div className="my-12 w-10/12 flex-col items-center justify-center">
          {projectsInfo.map((projectInfo) => {
            return <ProjectCard projectInfo={projectInfo} key={projectInfo.slug} />;
          })}
        </div>
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fileNames = await fs.readdir('./src/content/projects');

  const projectsInfo: ProjectInfo[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const filename of fileNames) {
    // eslint-disable-next-line no-await-in-loop
    const file = await fs.readFile(`./src/content/projects/${filename}`, 'utf-8');
    const { data } = matter(file);
    const metadata = projectMetadataSchema.parse(data);

    projectsInfo.push({ ...metadata, slug: `/projects/${filename.replace('.md', '')}` });
  }

  return {
    props: { projectsInfo },
  };
};

export default ProjectIndex;
