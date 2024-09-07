import { Tab } from '@/types';

const PricingCard = `import { BlockStack, Card, Text, InlineStack, Box, Button, Badge, ButtonGroup } from "@shopify/polaris";

export const PricingCard = ({ title, description, price, features, featuredText, button, frequency }) => {
  return (
    <div
      style={{
        width: "18rem",
        boxShadow: featuredText ? "0px 0px 15px 4px #CDFEE1" : "none",
        borderRadius: ".75rem",
        position: "relative",
        zIndex: "0",
      }}
    >
      {featuredText ? (
        <div style={{ position: "absolute", top: "-15px", right: "6px", zIndex: "100" }}>
          <Badge size="large" tone="success">
            {featuredText}
          </Badge>
        </div>
      ) : null}
      <Card>
        <BlockStack gap="400">
          <BlockStack gap="200" align="start">
            <Text as="h3" variant="headingLg">
              {title}
            </Text>
            {description ? (
              <Text as="p" variant="bodySm" tone="subdued">
                {description}
              </Text>
            ) : null}
          </BlockStack>

          <InlineStack blockAlign="end" gap="100" align="start">
            <Text as="h2" variant="heading2xl">
              {price}
            </Text>
            <Box paddingBlockEnd="200">
              <Text variant="bodySm">/ {frequency}</Text>
            </Box>
          </InlineStack>

          <BlockStack gap="100">
            {features?.map((feature, id) => (
              <Text tone="subdued" as="p" variant="bodyMd" key={id}>
                {feature}
              </Text>
            ))}
          </BlockStack>

          <Box paddingBlockStart="200" paddingBlockEnd="200">
            <ButtonGroup fullWidth>
              <Button {...button.props}>{button.content}</Button>
            </ButtonGroup>
          </Box>
        </BlockStack>
      </Card>
    </div>
  );
};
`;

const Example = `import { InlineStack } from "@shopify/polaris";
import { PricingCard } from "./PricingCard";

export const Example = () => {
  return (
    <InlineStack gap="600" align="center" blockAlign="start">
      <PricingCard
        title="Standard"
        description="This is a great plan for stores that are just starting out"
        features={[
          "Process up to 1,000 orders/mo",
          "Amazing feature",
          "Another really cool feature",
          "24/7 Customer Support",
        ]}
        price="$19"
        frequency="month"
        button={{
          content: "Select Plan",
          props: {
            variant: "primary",
            onClick: () => console.log("clicked plan!"),
          },
        }}
      />
      <PricingCard
        title="Advanced"
        featuredText="Most Popular"
        description="For stores that are growing and need a reliable solution to scale with them"
        features={[
          "Process up to 10,000 orders/mo",
          "Amazing feature",
          "Another really cool feature",
          "24/7 Customer Support",
        ]}
        price="$49"
        frequency="month"
        button={{
          content: "Select Plan",
          props: {
            variant: "primary",
            onClick: () => console.log("clicked plan!"),
          },
        }}
      />
      <PricingCard
        title="Premium"
        description="The best of the best, for stores that have the highest order processing needs"
        features={[
          "Process up to 100,000 orders/mo",
          "Amazing feature",
          "Another really cool feature",
          "24/7 Customer Support",
        ]}
        price="$99"
        frequency="month"
        button={{
          content: "Select Plan",
          props: {
            variant: "primary",
            onClick: () => console.log("clicked plan!"),
          },
        }}
      />
    </InlineStack>
  );
};
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'PricingCard.jsx', content: PricingCard }
];
