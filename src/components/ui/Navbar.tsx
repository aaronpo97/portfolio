/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { FaGamepad } from 'react-icons/fa';

interface Page {
  slug: string;
  name: string;
}

const useNavbar = () => {
  const router = useRouter();
  const [currentURL, setCurrentURL] = useState('/');

  useEffect(() => {
    setCurrentURL(router.asPath);
  }, [router.asPath]);

  const pages: Page[] = [
    { slug: '/about', name: 'About' },
    { slug: '/projects', name: 'Projects' },
    { slug: '/contact', name: 'Contact' },
    { slug: '/resume.pdf', name: 'Resume' },
  ];

  return { pages, currentURL };
};

const Navbar = () => {
  const { pages, currentURL } = useNavbar();

  return (
    <nav
      className={classNames(`navbar fixed top-0 z-20 h-10 min-h-10`, {
        'bg-transparent': currentURL === '/',
        'bg-base-100': currentURL !== '/',
      })}
    >
      <div className="flex-1">
        {currentURL !== '/' ? (
          <Link className="btn btn-ghost btn-xs text-3xl" href="/">
            <span className="cursor-pointer text-xl font-bold">Aaron Po</span>
          </Link>
        ) : (
          <div
            className="tooltip tooltip-right"
            data-tip="I have some games here. Click me!"
          >
            <Link href="/games" className="btn btn-circle btn-ghost btn-sm">
              <FaGamepad className="text-lg" />
            </Link>
          </div>
        )}
      </div>
      <div className="hidden flex-none lg:block">
        <ul className="menu menu-horizontal p-0">
          {pages.map((page) => {
            return (
              <li key={page.slug}>
                <Link
                  tabIndex={0}
                  href={page.slug}
                  rel={page.slug === '/resume.pdf' ? 'noopener noreferrer' : ''}
                  target={page.slug === '/resume.pdf' ? '_blank' : ''}
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
      <div className="flex-none lg:hidden">
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-circle btn-ghost">
            <div className="w-10 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </div>
          </label>
          <ul
            tabIndex={0}
            className="menu-compact menu dropdown-content mt-3 w-48 rounded-box bg-base-100 p-2 shadow"
          >
            {pages.map((page) => (
              <li key={page.slug}>
                <Link href={page.slug}>
                  <span className="select-none">{page.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
export default Navbar;
