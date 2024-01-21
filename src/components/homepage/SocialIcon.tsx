import classNames from 'classnames';
import { FunctionComponent } from 'react';
import { IconType } from 'react-icons';
import { useInView } from 'react-intersection-observer';

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
  const [ref, inView] = useInView();

  return (
    <div
      ref={ref}
      className={classNames(`tooltip tooltip-${tooltipPosition} h-full`, {
        'animate-fade-up': inView,
        'opacity-0': !inView,
      })}
      data-tip={socialName}
    >
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
