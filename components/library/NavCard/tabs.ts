import { Tab } from '@/types';

const NavCard = `import { Card, Text, InlineStack, Icon } from '@shopify/polaris';
import { ChevronRightIcon, OrdersIcon } from '@shopify/polaris-icons';

export const NavCard = () => {
  return (
    <a href='https://example.com' target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <InlineStack blockAlign='center' align='space-between'>
          <InlineStack align='center' gap='200'>
            <Icon source={OrdersIcon} />
            <Text as='p' variant='headingMd'>
              38 orders to fulfill
            </Text>
          </InlineStack>
          <div>
            <Icon source={ChevronRightIcon} />
          </div>
        </InlineStack>
      </Card>
    </a>
  );
};
`;

const Example = `import { Page, Layout } from "@shopify/polaris";
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
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'NavCard.jsx', content: NavCard }
];
