import Page from '@/components/ui/Navbar/types';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

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
    { slug: '/threejs', name: 'Three.js' },
  ];

  return { pages, currentURL };
};

export default useNavbar;
