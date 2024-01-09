import { Card, Text, InlineStack, Icon } from "@shopify/polaris";
import { ChevronRightMinor, OrdersMajor } from "@shopify/polaris-icons";

export const NavCard = () => {
  return (
    <Card>
      <a href="https://example.com" target="_blank" style={{ display: "block", width: "100%" }}>
        <InlineStack blockAlign="center" align="space-between">
          <InlineStack align="center" gap="200">
            <Icon source={OrdersMajor} />
            <Text as="p" variant="headingMd">
              38 orders to fulfill
            </Text>
          </InlineStack>
          <div>
            <Icon source={ChevronRightMinor} />
          </div>
        </InlineStack>
      </a>
    </Card>
  );
};
