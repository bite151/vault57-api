import { Html } from '@react-email/html';
import { Body, Heading, Hr, Text } from '@react-email/components';
import * as React from 'react';

interface FeedbackTemplateProps {
  name: string;
  contact: string;
  message: string;
}

export function FeedbackTemplate({
  name,
  contact,
  message,
}: FeedbackTemplateProps): React.JSX.Element {
  return (
    <Html lang="en">
      <Body className="text-black">
        <Heading>New message</Heading>
        <Hr
          style={{
            marginTop: 16,
            borderColor: 'rgb(209,213,219)',
            marginBottom: 16,
          }}
        />
        <Text>{name}</Text>
        <Text>{contact}</Text>
        <Text>{message}</Text>
      </Body>
    </Html>
  );
}
