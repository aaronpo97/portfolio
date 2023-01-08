import matter from 'gray-matter';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import fs from 'fs/promises';
import Layout from '../../components/ui/Layout';

import { ProjectInfo, projectMetadataSchema } from '../../types/projectMetadata';
import ProjectCard from '../../components/projects/ProjectCard';

const ProjectIndex: NextPage<{
  projectsInfo: ProjectInfo[];
}> = ({ projectsInfo }) => {
  return (
    <Layout>
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
    </Layout>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const fileNames = await fs.readdir('./content/projects');

  const projectsInfo: ProjectInfo[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const filename of fileNames) {
    // eslint-disable-next-line no-await-in-loop
    const file = await fs.readFile(`./content/projects/${filename}`, 'utf-8');
    const { data } = matter(file);
    const metadata = projectMetadataSchema.parse(data);

    projectsInfo.push({ ...metadata, slug: `/projects/${filename.replace('.md', '')}` });
  }

  return {
    props: { projectsInfo },
  };
};

export default ProjectIndex;
