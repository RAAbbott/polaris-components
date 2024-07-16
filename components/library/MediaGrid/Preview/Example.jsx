import { Layout, Page, Card, BlockStack, Text } from '@shopify/polaris';
import { MediaGrid } from './MediaGrid';

export const Example = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap='400'>
              <Text variant='headingMd' as='h3'>
                Media
              </Text>
              <MediaGrid />
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
