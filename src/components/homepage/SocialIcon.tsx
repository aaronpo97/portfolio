import { FunctionComponent } from 'react';
import { IconType } from 'react-icons';

interface SocialIconProps {
  icon: IconType;
  socialName: string;
  tooltipPosition: 'top' | 'bottom' | 'left' | 'right';
  href: string;
}

const SocialIcon: FunctionComponent<SocialIconProps> = ({
  icon,
  socialName,
  tooltipPosition,
  href,
}) => {
  return (
    <div className={`tooltip tooltip-${tooltipPosition} h-full`} data-tip={socialName}>
      <a
        href={href}
        className="text-3xl hover:text-gray-300"
        target="_blank"
        rel="noopener noreferrer"
      >
        {icon({})}
      </a>
    </div>
  );
};

export default SocialIcon;
