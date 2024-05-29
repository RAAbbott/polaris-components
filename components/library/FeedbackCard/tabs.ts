import { Tab } from '@/types';

const FeedbackCard = `import { Card, BlockStack, Text, Button, ButtonGroup, InlineStack } from '@shopify/polaris';
import { XIcon, ThumbsDownIcon, ThumbsUpIcon } from "@shopify/polaris-icons";

export const FeedbackCard = () => {
  return (
    <Card>
      <BlockStack gap='400' align='start'>
        <BlockStack gap='200'>
          <InlineStack align='space-between'>
            <Text as='h2' variant='headingMd'>
              Share your feedback
            </Text>
            <XIcon width='1rem' height='1rem' style={{ cursor: 'pointer' }} />
          </InlineStack>
          <Text as='p' variant='bodyMd' tone='subdued'>
            How would you describe your experience using the Polaris Components app?
          </Text>
        </BlockStack>
        <ButtonGroup>
          <Button icon={ThumbsUpIcon} onClick={() => null}>
            Good
          </Button>
          <Button icon={ThumbsDownIcon} onClick={() => null}>
            Bad
          </Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  );
};`;

const Example = `import { Layout, Page } from '@shopify/polaris';
import { FeedbackCard } from './FeedbackCard';

export const Example = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <FeedbackCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'FeedbackCard.jsx', content: FeedbackCard }
];
