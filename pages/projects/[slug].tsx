// fs promises
import fs from 'fs/promises';
import matter from 'gray-matter';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../../components/ui/Layout';
import { ProjectMetadata, projectMetadataSchema } from '../../types/projectMetadata';
import markdownToHTML from '../../util/markdownToHTML';

const PostPage: NextPage<{
  projectMetadata: ProjectMetadata;
  content: string;
}> = ({ projectMetadata, content }) => {
  const { githubURL, liveURL, metaDesc, title } = projectMetadata;

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={metaDesc} />
      </Head>
      <Layout>
        <div className="mt-20 mb-20 flex flex-col items-center justify-center">
          <Link href={githubURL}>Repo</Link>
          <Link href={liveURL}>Live</Link>
          <div className="w-7/12">
            <div className="prose mx-auto max-w-none">
              <h1>{projectMetadata.title}</h1>
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
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
