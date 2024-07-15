import fs from 'fs/promises';
import path from 'path';

import { GetStaticProps, NextPage } from 'next';
import matter from 'gray-matter';
import { FC } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { z } from 'zod';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import useSlideControls from '@/hooks/carousel/useSlideControls';
import useMediaQuery from '@/hooks/useMediaQuery';
import { CustomLeftArrow, CustomRightArrow } from '@/components/about-page/CustomArrows';
import classNames from 'classnames';
import CarouselInstructions from '@/components/ui/CarouselInstructions';

const blogPreviewSchema = z.object({
  title: z.string(),
  date: z.coerce.date(),
  description: z.string(),
  slug: z.string(),
});

type BlogPreview = z.infer<typeof blogPreviewSchema>;

const BlogPageHeader: FC<{ currentSlide: number }> = ({ currentSlide }) => {
  const doAnimation = currentSlide === 0;
  return (
    <header className="flex h-dvh flex-col items-center justify-center">
      <div className="w-9/12">
        <h1
          className={classNames(
            'my-7 text-2xl font-extrabold md:my-10 md:text-8xl',
            { 'animate-fade-left': doAnimation, 'opacity-0': !doAnimation },
            'motion-reduce:animate-none',
          )}
        >
          My Blog
        </h1>
        <p
          className={classNames(
            'space-y-4',
            { 'animate-fade-right': doAnimation, 'opacity-0': !doAnimation },
            'motion-reduce:animate-none',
            'text-sm md:text-2xl',
          )}
        >
          Here you can find some of my writings on various topics ranging from web
          development to game development to personal anecdotes. I&apos;m currently in the
          process of creating more content, so stay tuned!
        </p>
      </div>
      <CarouselInstructions slideCount={6} doAnimation={true} />
    </header>
  );
};

const BlogPageSection: FC<{ post: BlogPreview; currentSlide: number; index: number }> = ({
  post,
  index,
  currentSlide,
}) => {
  const isInLandscape = useMediaQuery('(orientation: landscape)');
  const doAnimation = currentSlide === index;

  return (
    <section
      className={classNames(
        'mb-0 mt-0 flex min-h-dvh flex-col items-center justify-center',
        { 'my-32': isInLandscape },
        'motion-reduce:animate-none',
      )}
    >
      <div className="w-9/12 space-y-3">
        <header>
          <Link href={`/blog/${post.slug}`} className="link-hover">
            <h2
              className={classNames(
                'text-2xl font-extrabold md:text-6xl',
                {
                  'animate-fade animate-duration-1000': doAnimation,
                  'opacity-0': !doAnimation,
                },
                'motion-reduce:animate-none',
              )}
            >
              {post.title}
            </h2>
          </Link>
          <h3 className="text-sm italic md:text-xl">
            written on <time>{format(post.date, 'MMMM do, yyyy')}</time>
          </h3>
        </header>
        <div
          className={classNames(
            {
              'animate-fade animate-delay-75 animate-duration-1000': doAnimation,
              'opacity-0': !doAnimation,
            },
            'motion-reduce:animate-none',
          )}
        >
          <p className="text-sm md:text-2xl">{post.description}</p>
        </div>
      </div>
    </section>
  );
};

const Blog: NextPage<{
  postPreviews: BlogPreview[];
}> = ({ postPreviews }) => {
  const { currentSlide, setCurrentSlide, ref } = useSlideControls({
    maxSlides: postPreviews.length + 1,
  });

  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <article className="relative flex h-full w-full items-center justify-center">
      <Carousel
        ref={ref}
        containerClass="container"
        customLeftArrow={<CustomLeftArrow />}
        customRightArrow={<CustomRightArrow />}
        customTransition={
          prefersReducedMotion
            ? 'transform 0ms'
            : 'transform 1000ms cubic-bezier(0.22, 0.61, 0.36, 1.0)'
        }
        beforeChange={(nextSlide) => {
          setCurrentSlide(nextSlide);
        }}
        arrows
        responsive={{
          mobile: { items: 1, breakpoint: { max: 464, min: 0 } },
          tablet: { items: 1, breakpoint: { max: 1024, min: 464 } },
          desktop: { items: 1, breakpoint: { max: 3000, min: 1024 } },
        }}
      >
        <BlogPageHeader currentSlide={currentSlide} />
        {postPreviews.map((post, idx) => {
          const index = idx + 1;
          return (
            <BlogPageSection
              post={post}
              key={post.slug}
              currentSlide={currentSlide}
              index={index}
            />
          );
        })}
      </Carousel>
    </article>
  );
};

export default Blog;

export const getStaticProps: GetStaticProps<{
  postPreviews: BlogPreview[];
}> = async () => {
  const BLOG_DIR = path.join(process.cwd(), 'src', 'content', 'blog');
  const posts = await fs.readdir(BLOG_DIR);

  const postPreviews = await Promise.all(
    posts.map(async (post) => {
      const filePath = path.join(BLOG_DIR, post);
      const fileContents = await fs.readFile(filePath, 'utf8');
      const { data } = matter(fileContents);

      return {
        title: data.title as string,
        date: data.date as Date,
        description: data.description as string,
        slug: `/${post.replace(/\.md?$/, '')}`,
      };
    }),
  );

  const sortedPosts = postPreviews.toSorted(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
  return { props: { postPreviews: JSON.parse(JSON.stringify(sortedPosts)) } };
};
