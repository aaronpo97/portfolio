import type { NextPage } from 'next';
import Head from 'next/head';

import fs from 'fs';
import matter from 'gray-matter';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '../components/ui/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-full flex-col items-center justify-center py-2"></div>;
    </Layout>
  );
};
export async function getStaticProps() {
  // Get all our posts
  const files = fs.readdirSync('content/projects');
  const posts = files.map((fileName) => {
    const slug = fileName.replace('.md', '');
    const readFile = fs.readFileSync(`content/projects/${fileName}`, 'utf-8');
    const { data: frontmatter } = matter(readFile);

    return {
      slug,
      frontmatter,
    };
  });

  return {
    props: {
      posts,
    },
  };
}
export default Home;
