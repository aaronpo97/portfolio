import type { NextPage } from 'next';
import Head from 'next/head';
import { FC, FunctionComponent, ReactNode } from 'react';

import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from 'react-icons/fa';
import { IconType } from 'react-icons/lib';
import Headings from '../components/homepage/Headings';
import SocialIcon from '../components/homepage/SocialIcon';
import Socials from '../components/homepage/Socials';
import Layout from '../components/ui/Layout';

const Home: NextPage = () => {
  return (
    <Layout>
      <div className="flex h-full flex-col py-2 justify-center items-center">
        <div className="w-9/12 space-y-12">
          <Headings />
          <Socials />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
