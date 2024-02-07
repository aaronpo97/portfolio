/* eslint-disable jsx-a11y/no-noninteractive-tabindex */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */

import classNames from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { FaBars, FaGamepad } from 'react-icons/fa';

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
    { slug: '/art', name: 'Art' },
  ];

  return { pages, currentURL };
};

const DesktopNavbar: FC<{
  pages: Page[];
  currentURL: string;
}> = ({ currentURL, pages }) => {
  return (
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
  );
};

const MobileNavbar: FC<{
  pages: Page[];
  currentURL: string;
}> = ({ pages }) => {
  const drawerRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-none lg:hidden">
      <div className="drawer drawer-end">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" ref={drawerRef} />
        <div className="drawer-content">
          <label htmlFor="my-drawer" className="btn btn-ghost drawer-button">
            <FaBars />
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer"
            aria-label="close sidebar"
            className="drawer-overlay"
          />
          <ul className="menu min-h-full w-52 bg-primary p-4 text-base-content">
            {pages.map((page) => {
              return (
                <li key={page.slug}>
                  <Link
                    href={page.slug}
                    tabIndex={0}
                    onClick={() => {
                      if (!drawerRef.current) return;
                      drawerRef.current.checked = false;
                    }}
                  >
                    <span className="text-lg font-bold uppercase">{page.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

const Navbar = () => {
  const { pages, currentURL } = useNavbar();

  const showSiteName = !(currentURL === '/' || currentURL === '/art');

  return (
    <nav
      className={classNames(`navbar fixed top-0 z-20 h-11 min-h-10`, {
        'bg-transparent': !showSiteName,
        'bg-base-100': currentURL !== '/',
      })}
    >
      <div className="flex-1">
        {currentURL !== '/' ? (
          <Link className="btn btn-ghost btn-xs text-3xl" href="/">
            <span className="cursor-pointer text-xl font-bold">
              {process.env.NEXT_PUBLIC_SITE_NAME}
            </span>
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
      <DesktopNavbar currentURL={currentURL} pages={pages} />
      <MobileNavbar currentURL={currentURL} pages={pages} />
    </nav>
  );
};
export default Navbar;
