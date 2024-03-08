import { Card, Text, InlineStack, Icon } from '@shopify/polaris';
import { ChevronRightIcon, OrderIcon } from "@shopify/polaris-icons";

export const NavCard = () => {
  return (
    <a href='https://example.com' target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <InlineStack blockAlign='center' align='space-between'>
          <InlineStack align='center' gap='200'>
            <Icon source={OrderIcon} />
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
