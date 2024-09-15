import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';
import classNames from 'classnames';
import SocialIcon from './SocialIcon';

const Socials = () => {
  const [ref, inView] = useInView();
  return (
    <div
      className={classNames(
        'flex flex-row space-x-2',
        { 'animate-fade animate-duration-150': inView, 'opacity-0': !inView },
        'motion-reduce:animate-none',
      )}
      ref={ref}
    >
      <SocialIcon
        socialName="LinkedIn"
        href="https://www.linkedin.com/in/aaronpo97"
        icon={FaLinkedin}
        tooltipPosition="bottom"
      />
      <SocialIcon
        socialName="Github"
        href="https://www.github.com/aaronpo97"
        icon={FaGithub}
        tooltipPosition="bottom"
      />
      <SocialIcon
        socialName="Instagram"
        href="https://www.instagram.com/aaronpo97"
        icon={FaInstagram}
        tooltipPosition="bottom"
      />
    </div>
  );
};

export default Socials;
