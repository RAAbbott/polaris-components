import { Layout, Page } from '@shopify/polaris';
import { StepAccordion } from './StepAccordion';

export const Example = () => {
  return (
    <Page>
      <Layout>
        <Layout.Section>
          <StepAccordion />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
