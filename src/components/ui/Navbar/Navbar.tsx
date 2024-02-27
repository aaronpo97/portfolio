import useNavbar from '@/hooks/useNavbar';
import classNames from 'classnames';
import Link from 'next/link';
import { FaGamepad } from 'react-icons/fa';
import DesktopNavbar from './DesktopNavbar';
import MobileNavbar from './MobileNavbar';

const Navbar = () => {
  const { pages, currentURL } = useNavbar();

  const showSiteName = currentURL !== '/';

  return (
    <nav
      className={classNames(`navbar fixed top-0 z-20 h-11 min-h-10`, {
        'bg-transparent': !showSiteName,
        'bg-base-100': showSiteName,
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
