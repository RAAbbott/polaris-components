import { Card, BlockStack, Text, Button, ButtonGroup, InlineStack } from '@shopify/polaris';
import { CancelMinor, ThumbsDownMinor, ThumbsUpMinor } from '@shopify/polaris-icons';

export const FeedbackCard = () => {
  return (
    <Card>
      <BlockStack gap='400' align='start'>
        <BlockStack gap='200'>
          <InlineStack align='space-between'>
            <Text as='h2' variant='headingMd'>
              Share your feedback
            </Text>
            <CancelMinor width='1rem' height='1rem' style={{ cursor: 'pointer' }} />
          </InlineStack>
          <Text as='p' variant='bodyMd' tone='subdued'>
            How would you describe your experience using the Polaris Components app?
          </Text>
        </BlockStack>
        <ButtonGroup>
          <Button icon={ThumbsUpMinor} onClick={() => null}>
            Good
          </Button>
          <Button icon={ThumbsDownMinor} onClick={() => null}>
            Bad
          </Button>
        </ButtonGroup>
      </BlockStack>
    </Card>
  );
};
