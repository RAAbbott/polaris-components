import { useState } from "react";
import { BlockStack, Card, Layout, Page, Text } from "@shopify/polaris";
import { TimePicker } from "./TimePicker";

export const Example = () => {
  const [time, setTime] = useState("09:00");

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <BlockStack gap="400">
              <TimePicker label="Select a time" value={time} onChange={setTime} />
              <Text as="p" tone="subdued">Selected (24h): {time}</Text>
            </BlockStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
