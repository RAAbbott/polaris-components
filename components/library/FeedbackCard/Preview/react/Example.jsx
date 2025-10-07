import { Layout, Page } from '@shopify/polaris';
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
