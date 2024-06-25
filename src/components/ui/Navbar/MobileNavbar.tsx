import Link from 'next/link';
import { FC, useRef } from 'react';
import { FaBars } from 'react-icons/fa';
import Page from './types';

const MobileNavbar: FC<{
  pages: Page[];
  currentURL: string;
}> = ({ pages }) => {
  const drawerRef = useRef<HTMLInputElement>(null);
  return (
    <div className="flex-none lg:hidden">
      <div className="drawer">
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
          <ul className="menu min-h-full bg-primary pr-16 text-base-content">
            {pages.map((page) => {
              return (
                <li key={page.slug}>
                  <Link
                    href={page.slug}
                    tabIndex={0}
                    rel={page.slug === '/resume/main.pdf' ? 'noopener noreferrer' : ''}
                    target={page.slug === '/resume/main.pdf' ? '_blank' : ''}
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

export default MobileNavbar;
