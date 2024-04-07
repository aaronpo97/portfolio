import Link from 'next/link';
import { FC } from 'react';
import Page from './types';

const DesktopNavbar: FC<{
  pages: Page[];
  currentURL: string;
}> = ({ currentURL, pages }) => {
  const pageIsResume = (page: Page) => page.slug === '/resume.pdf';
  return (
    <div className="hidden flex-none lg:block">
      <ul className="menu menu-horizontal p-0">
        {pages.map((page) => {
          return (
            <li key={page.slug}>
              <Link
                tabIndex={0}
                href={page.slug}
                rel={pageIsResume(page) ? 'noopener noreferrer' : ''}
                target={pageIsResume(page) ? '_blank' : ''}
              >
                <span
                  className={`text-lg uppercase ${
                    currentURL === page.slug
                      ? 'font-extrabold underline underline-offset-8'
                      : 'font-bold'
                  } text-base-content`}
                >
                  {page.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DesktopNavbar;
