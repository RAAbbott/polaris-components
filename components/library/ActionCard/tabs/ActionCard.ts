export const ActionCard = `import { useState } from "react";
import { Card, BlockStack, Text, Button, ActionList, Popover } from "@shopify/polaris";

export const ActionCard = () => {
  const [active, setActive] = useState(false);

  return (
    <Card>
      <BlockStack gap="400" align="start">
        <BlockStack gap="200">
          <Text as="h2" variant="headingMd">
            Payment Methods
          </Text>
          <Text as="p" variant="bodyMd" tone="subdued">
            Payments that are made outside your online store. When a customer selects a manual payment method such as
            cash on delivery, you&apos;ll need to approve their order before it can be fulfilled.
          </Text>
        </BlockStack>
        <Popover
          active={active}
          activator={
            <Button onClick={() => setActive((prev) => !prev)} disclosure>
              Add manual payment method
            </Button>
          }
          autofocusTarget="first-node"
          onClose={() => setActive((prev) => !prev)}
        >
          <ActionList
            actionRole="menuitem"
            items={[
              {
                content: "Create custom payment method",
                onAction: () => null,
              },
              {
                content: "Bank Deposit",
                onAction: () => null,
              },
            ]}
          />
        </Popover>
      </BlockStack>
    </Card>
  );
};`