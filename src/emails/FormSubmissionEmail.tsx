import { Container, Heading, Text, Section, Hr } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { FC } from 'react';

interface FormSubmissionEmailProps {
  name: string;
  email: string;
  message: string;
  subject: string;
}

const FormSubmissionEmail: FC<FormSubmissionEmailProps> = ({
  name,
  email,
  message,
  subject,
}) => (
  <Tailwind>
    <Container>
      <Section>
        <Heading className="text-3xl font-bold">New Form Submission from {name}</Heading>
        <Heading className="text-xl font-bold">Email: {email}</Heading>
        <Heading className="text-xl font-bold">Subject: {subject}</Heading>
      </Section>
      <Hr />
      <Section>
        <Text>{message}</Text>
      </Section>
    </Container>
  </Tailwind>
);

export default FormSubmissionEmail;
