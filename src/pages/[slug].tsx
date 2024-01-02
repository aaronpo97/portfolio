import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import matter from 'gray-matter';
import fs from 'fs/promises';

import { PageMetadata, pageMetadataSchema } from '@/schema/pageMetadata';
import markdownToHTML from '@/util/markdownToHTML';

const PostPage: NextPage<{
  pageMetadata: PageMetadata;
  content: string;
}> = ({ pageMetadata, content }) => {
  return (
    <>
      <Head>
        <title>{pageMetadata.title}</title>
      </Head>
      <div className="mb-20 mt-20 flex items-center justify-center">
        <div className="w-6/12">
          <div className="prose mx-auto max-w-none prose-h1:mb-6 prose-h1:text-6xl prose-h2:mt-0">
            <h1>{pageMetadata.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        </div>
      </div>
    </>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const files = await fs.readdir('./src/content/pages');
  const paths = files.map((fileName) => {
    return { params: { slug: fileName.replace('.md', '') } };
  });
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params!;
  const fileName = await fs.readFile(`./src/content/pages/${slug}.md`, 'utf-8');
  const { data, content: markdownContent } = matter(fileName);
  const content = await markdownToHTML(markdownContent);
  const pageMetadata = pageMetadataSchema.parse(data);

  return {
    props: { pageMetadata, content },
  };
};

export default PostPage;
