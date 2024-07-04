// pages/blog/[slug].tsx
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import markdownToHTML from '@/util/markdownToHTML';

interface BlogPostData {
  slug: string;
  title: string;
  content: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const postsDirectory = path.join(process.cwd(), 'blog');
  const filenames = await fs.readdir(postsDirectory);

  const paths = filenames.map((filename) => ({
    params: { slug: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps<{ post: BlogPostData }> = async ({
  params,
}) => {
  const slug = params?.slug as string;
  const filePath = path.join(process.cwd(), 'blog', `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  if (!('title' in data) || typeof data.title !== 'string') {
    throw new Error(`No title in ${slug}.md`);
  }

  const html = await markdownToHTML(content);

  return {
    props: {
      post: { slug, title: data.title, content: html },
    },
  };
};

const BlogPostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, content } = post;
  return (
    <div className="flex items-center justify-center">
      <div className="w-7/12">
        <div className="prose max-w-none">
          <h2>{title}</h2>
          <div dangerouslySetInnerHTML={{ __html: content }} />
        </div>
      </div>
    </div>
  );
};

export default BlogPostPage;
