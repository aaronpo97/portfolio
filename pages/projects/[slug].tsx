// fs promises
import fs from 'fs/promises';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { FC } from 'react';

import { FaGithub, FaLink } from 'react-icons/fa';
import SocialIcon from '../../components/homepage/SocialIcon';
import Layout from '../../components/ui/Layout';
import { ProjectMetadata, projectMetadataSchema } from '../../types/projectMetadata';
import markdownToHTML from '../../util/markdownToHTML';

const ProjectHeader: FC<Omit<ProjectMetadata, 'metaTitle' | 'metaDesc'>> = ({
  title,
  stack,
  githubURL,
  liveURL,
}) => {
  return (
    <div className="mb-10 flex flex-col justify-between space-y-5 md:flex-row md:items-center md:space-y-0">
      <div className="space-y-2">
        <h1 className="text-5xl font-bold md:text-6xl">{title}</h1>
        <h2 className="font-bold italic">built with {stack}</h2>
      </div>

      <div className="space-x-6">
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
  );
};

const PostPage: NextPage<{
  projectMetadata: ProjectMetadata;
  content: string;
}> = ({ projectMetadata, content }) => {
  const { githubURL, liveURL, metaDesc, title, stack } = projectMetadata;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
      </Head>
      <Layout>
        <div className="mt-20 mb-20 flex flex-col items-center justify-center">
          <div className="w-7/12">
            <ProjectHeader
              title={title}
              githubURL={githubURL}
              liveURL={liveURL}
              stack={stack}
            />
            <div
              className="prose mx-auto max-w-none"
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </div>
      </Layout>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir('content/projects');
  const paths = files.map((fileName) => ({
    params: { slug: fileName.replace('.md', '') },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;
  const fileName = await fs.readFile(`content/projects/${slug}.md`, 'utf-8');
  const { data, content: markdownContent } = matter(fileName);
  const content = await markdownToHTML(markdownContent);
  const projectMetadata = projectMetadataSchema.parse(data);

  return {
    props: {
      projectMetadata,
      content,
    },
  };
};

export default PostPage;
