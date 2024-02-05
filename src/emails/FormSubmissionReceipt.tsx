import { Container, Heading, Text, Section, Button } from '@react-email/components';
import { Tailwind } from '@react-email/tailwind';

import { FC } from 'react';

interface FormSubmissionReceiptProps {
  name: string;
  email: string;
}

const FormSubmissionReceipt: FC<FormSubmissionReceiptProps> = ({ name }) => (
  <Tailwind>
    <Container className="flex h-full w-full flex-col items-center justify-center">
      <Section>
        <Heading className="text-2xl font-bold">Hi there, {name}!</Heading>

        <Text>Thank you so much for reaching out to me.</Text>
        <Text>I will get back to you as soon as possible.</Text>

        <Text>All the best,</Text>
        <Text>Aaron Po</Text>
        <Button href="https:/aaronwilliampo.com">Visit my website</Button>
      </Section>
    </Container>
  </Tailwind>
);

export default FormSubmissionReceipt;
