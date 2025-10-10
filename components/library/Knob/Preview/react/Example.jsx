import { useState } from 'react';
import { Page, Layout, Card, InlineStack, Text, Badge } from '@shopify/polaris';
import { Knob } from './Knob';

export function Example() {
  const [selected, setSelected] = useState(false);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack align='space-between'>
              <InlineStack align='start' gap='200' blockAlign='center'>
                <Text as='p' variant='bodyMd'>
                  Toggle Knob
                </Text>
                <Badge tone={selected ? 'success' : 'attention'}>
                  {selected ? 'Enabled' : 'Disabled'}
                </Badge>
              </InlineStack>
              <Knob
                selected={selected}
                ariaLabel='Example knob'
                onClick={() => setSelected((prev) => !prev)}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
