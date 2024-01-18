import { Card, Text, InlineStack, Icon, Link } from '@shopify/polaris';
import { ChevronRightMinor, OrdersMajor } from '@shopify/polaris-icons';

export const NavCard = () => {
  return (
    <a href='https://example.com' target='_blank' style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <InlineStack blockAlign='center' align='space-between'>
          <InlineStack align='center' gap='200'>
            <Icon source={OrdersMajor} />
            <Text as='p' variant='headingMd'>
              38 orders to fulfill
            </Text>
          </InlineStack>
          <div>
            <Icon source={ChevronRightMinor} />
          </div>
        </InlineStack>
      </Card>
    </a>
  );
};
