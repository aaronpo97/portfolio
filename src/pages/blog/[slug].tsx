import { format } from 'date-fns';

import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import fs from 'fs/promises';
import path from 'path';
import matter from 'gray-matter';
import markdownToHTML from '@/util/markdownToHTML';
import { z } from 'zod';
import Head from 'next/head';

const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');

const BlogPostMetadata = z.object({
  title: z.string(),
  description: z.string(),
  date: z.coerce.date(),
  author: z.string(),
});

type BlogPostData = z.infer<typeof BlogPostMetadata> & { content: string };

export const getStaticPaths: GetStaticPaths = async () => {
  const filenames = await fs.readdir(BLOG_DIR);
  const slugs = filenames.map((filename) => filename.replace('.md', ''));

  return { paths: slugs.map((slug) => ({ params: { slug } })), fallback: false };
};

export const getStaticProps: GetStaticProps<{ post: BlogPostData }> = async ({
  params,
}) => {
  const slug = params!.slug as string;
  const filePath = path.join(BLOG_DIR, `${slug}.md`);
  const fileContents = await fs.readFile(filePath, 'utf8');

  const { data, content } = matter(fileContents);

  const metadata = BlogPostMetadata.parse(data);
  const { title, description, date, author } = metadata;

  const html = await markdownToHTML(content);
  const post = JSON.stringify({ title, description, date, author, content: html });

  return { props: { post: JSON.parse(post) } };
};

const BlogPostPage: React.FC<InferGetStaticPropsType<typeof getStaticProps>> = ({
  post,
}) => {
  const { title, content, date } = post;
  return (
    <>
      <Head>
        <title>{title} | Aaron Po</title>
        <meta name="description" content={post.description} />
      </Head>
      <div className="flex items-center justify-center">
        <div className="w-10/12 lg:w-7/12">
          <div className="mb-20 mt-32">
            <h1 className="text-5xl font-bold lg:text-7xl">{title}</h1>
            <h2 className="mt-2 text-xl italic">
              published <time>{format(date, 'MMMM dd, yyyy')}</time>
            </h2>
          </div>
          <div className="mt-30 prose max-w-none">
            <div
              dangerouslySetInnerHTML={{ __html: content }}
              className="prose-h1:text-xl prose-p:text-xl prose-li:space-x-0 prose-li:text-xl prose-h1:lg:text-2xl prose-h1:xl:text-3xl"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogPostPage;
