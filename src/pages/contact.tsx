import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import FormSegment from '@/components/ui/FormSegment';

import emailDataSchema from '@/schema/emailDataSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import Head from 'next/head';

type FormInputs = z.infer<typeof emailDataSchema>;

const Contact: NextPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormInputs>({
    resolver: zodResolver(emailDataSchema),
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    reset();
  };

  const { errors } = formState;

  return (
    <>
      <Head>
        <title>{`Contact Me | ${process.env.NEXT_PUBLIC_SITE_NAME}`}</title>
        <meta name="description" content="Contact Me" />
      </Head>
      <div className="flex min-h-dvh items-center justify-center">
        <div className="w-10/12 animate-fade space-y-8 motion-reduce:animate-none lg:w-8/12">
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
                    errorMessage={errors.email?.message}
                    formRegister={register('email')}
                    id="email"
                    label="Email"
                    placeholder="Your email address"
                  />
                  <FormSegment
                    errorMessage={errors.name?.message}
                    formRegister={register('name')}
                    id="name"
                    label="Name"
                    placeholder="Your name"
                  />
                </div>
                <FormSegment
                  errorMessage={errors.subject?.message}
                  formRegister={register('subject')}
                  id="subject"
                  label="subject"
                  placeholder="Email subject"
                />
                <FormSegment
                  errorMessage={errors.message?.message}
                  formRegister={register('message')}
                  id="message"
                  label="message"
                  placeholder="Your message"
                  type="textArea"
                />
              </div>

              <button type="submit" className="btn btn-primary rounded-xl">
                Send Email
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Contact;
