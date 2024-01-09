import { Page, Layout } from "@shopify/polaris";
import { NavCard } from "./NavCard";

export const Example = () => {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <NavCard />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
