import { FC } from 'react';

const CaptchaNotice: FC = () => {
  return (
    <div className="text-center">
      <p className="text-sm italic">
        This site is protected by Google&apos;s{' '}
        <a
          href="https://www.google.com/recaptcha/about/"
          title="reCAPTCHA v3"
          rel="noreferrer"
          target="blank"
          className="link-hover link"
        >
          reCAPTCHA v3.
        </a>
      </p>

      <p className="text-sm italic">
        For information on how your data is used, please read their{' '}
        <a
          href="https://policies.google.com/privacy"
          title="Privacy Policy"
          rel="noreferrer"
          target="blank"
          className="link-hover link"
        >
          Privacy Policy
        </a>{' '}
        as well as their{' '}
        <a
          href="https://policies.google.com/terms"
          title="Terms of Service"
          rel="noreferrer"
          target="blank"
          className="link-hover link"
        >
          Terms of Service
        </a>
        .
      </p>
    </div>
  );
};

export default CaptchaNotice;
