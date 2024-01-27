import { Layout, Page } from '@shopify/polaris';
import { Accordion } from './Accordion';

export const Example = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <Accordion />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
