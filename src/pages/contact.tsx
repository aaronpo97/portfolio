import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import FormSegment from '@/components/ui/FormSegment';

import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';

import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import CaptchaNotice from '@/components/CaptchaNotice';
import SendEmailRequestBodySchema from '@/schema/SendEmailRequestBodySchema';
import { FC, RefObject, useRef, useState } from 'react';

type FormInputs = z.infer<typeof SendEmailRequestBodySchema>;

const SuccessDialog: FC<{
  successDialogRef: RefObject<HTMLDialogElement>;
  message: string;
}> = ({ successDialogRef, message }) => {
  return (
    <dialog ref={successDialogRef} className="modal">
      <div className="modal-box bg-success text-success-content">
        <span>{message}</span>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => successDialogRef.current?.close()}
          >
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
};

const ErrorDialog: FC<{
  errorDialogRef: RefObject<HTMLDialogElement>;
  message: string;
}> = ({ errorDialogRef, message }) => {
  return (
    <dialog ref={errorDialogRef} className="modal">
      <div className="modal-box bg-error text-error-content">
        <span>{message}</span>
        <div className="modal-action">
          <button
            className="btn btn-ghost"
            type="button"
            onClick={() => errorDialogRef.current?.close()}
          >
            OK
          </button>
        </div>
      </div>
    </dialog>
  );
};
const Contact: NextPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormInputs>({
    resolver: zodResolver(SendEmailRequestBodySchema),
  });

  const { isSubmitting } = formState;

  const { executeRecaptcha } = useGoogleReCaptcha();

  const successDialogRef = useRef<HTMLDialogElement>(null);
  const errorDialogRef = useRef<HTMLDialogElement>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    if (!executeRecaptcha) {
      setErrorMessage('Captcha is not ready yet. Please try again later.');
      errorDialogRef.current?.showModal();
      return;
    }
    const captchaToken = await executeRecaptcha();
    const response = await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
        'X-Captcha-Token': captchaToken,
      },
    });

    if (!response.ok) {
      setErrorMessage('Failed to send email. Please try again later.');
      errorDialogRef.current?.showModal();
      return;
    }

    successDialogRef.current?.showModal();
    reset();
  };

  const { errors } = formState;

  return (
    <>
      <Head>
        <title>{`Contact Me | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="robots" content="nosnippet" />
        <meta
          name="description"
          content="Want to get in touch? Use this form to send me an email."
        />
      </Head>
      <div className="mt-20 flex min-h-dvh items-center justify-center md:mt-0">
        <SuccessDialog
          successDialogRef={successDialogRef}
          message="Your email was sent successfully!"
        />
        <ErrorDialog errorDialogRef={errorDialogRef} message={errorMessage} />
        <div className="w-10/12 animate-fade space-y-8 animate-duration-300 motion-reduce:animate-none lg:w-8/12">
          <div className="space-y-1">
            <h1 className="text-4xl font-bold md:text-6xl lg:text-7xl">Contact Me</h1>
            <h2 className="font-semibold italic">
              Want to get in touch? Send me an email!
            </h2>
          </div>
          <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex w-full flex-col space-y-8">
              <div className="space-y-3">
                <div className="flex flex-col space-y-3 lg:flex-row lg:space-x-3 lg:space-y-0">
                  <FormSegment
                    disabled={isSubmitting}
                    errorMessage={errors.email?.message}
                    formRegister={register('email')}
                    id="email"
                    label="Email"
                    placeholder="Your email address"
                  />
                  <FormSegment
                    disabled={isSubmitting}
                    errorMessage={errors.name?.message}
                    formRegister={register('name')}
                    id="name"
                    label="Name"
                    placeholder="Your name"
                  />
                </div>
                <FormSegment
                  disabled={isSubmitting}
                  errorMessage={errors.subject?.message}
                  formRegister={register('subject')}
                  id="subject"
                  label="subject"
                  placeholder="Email subject"
                />
                <FormSegment
                  disabled={isSubmitting}
                  errorMessage={errors.message?.message}
                  formRegister={register('message')}
                  id="message"
                  label="message"
                  placeholder="Your message"
                  type="textArea"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary rounded-xl"
                disabled={isSubmitting}
              >
                Send Email
              </button>
            </div>
          </form>
          <div className="pb-10 md:pb-0">
            <CaptchaNotice />
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
