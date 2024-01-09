import { NextPage } from 'next';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import FormSegment from '@/components/ui/FormSegment';

import emailDataSchema from '@/schema/emailDataSchema';

type FormInputs = z.infer<typeof emailDataSchema>;

const Contact: NextPage = () => {
  const { register, handleSubmit, formState, reset } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    await fetch('/api/email', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: { 'Content-Type': 'application/json' },
    });
    reset();
  };

  const { errors } = formState;
  const emailFormRegister = register('email', {
    pattern: /^\S+@\S+\.\S+$/ || 'Please use a valid email address.',
    required: 'Please provide your email address.',
  });
  const subjectFormRegister = register('subject', {
    required: 'An email subject is required.',
  });
  const nameFormRegister = register('name', { required: 'Please provide your name.' });
  const messageFormRegister = register('message', {
    required: 'Cannot send a blank message.',
  });

  return (
    <div className="animate-in fade-in flex h-screen items-center justify-center">
      <div className="w-8/12 space-y-8">
        <div className="space-y-1">
          <h1 className="text-7xl font-bold">Contact Me</h1>
          <h2 className="font-semibold italic">
            Want to get in touch? Send me an email!
          </h2>
        </div>
        <form className="form-control" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex w-full flex-col space-y-8">
            <div className="space-y-3">
              <div className="flex flex-row space-x-3">
                <FormSegment
                  errorMessage={errors.email?.message}
                  formRegister={emailFormRegister}
                  id="email"
                  label="Email"
                  placeholder="Your email address"
                />
                <FormSegment
                  errorMessage={errors.name?.message}
                  formRegister={nameFormRegister}
                  id="name"
                  label="Name"
                  placeholder="Your name"
                />
              </div>
              <FormSegment
                errorMessage={errors.subject?.message}
                formRegister={subjectFormRegister}
                id="subject"
                label="subject"
                placeholder="Email subject"
              />
              <FormSegment
                errorMessage={errors.message?.message}
                formRegister={messageFormRegister}
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
  );
};

export default Contact;
