import { FaLinkedin, FaGithub, FaInstagram } from 'react-icons/fa';
import SocialIcon from './SocialIcon';

const Socials = () => {
  return (
    <div className="flex flex-row space-x-2">
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
