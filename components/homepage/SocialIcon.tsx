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
    <div className={`tooltip tooltip-${tooltipPosition}`} data-tip={socialName}>
      <a href={href} className="text-3xl">
        {icon({})}
      </a>
    </div>
  );
};

export default SocialIcon;
