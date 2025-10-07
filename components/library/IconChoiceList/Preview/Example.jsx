import { useState, useCallback } from 'react';
import { Page, Layout, Card, InlineStack } from '@shopify/polaris';
import { CollectionIcon, ProductIcon, DisabledIcon, AdjustIcon } from '@shopify/polaris-icons';

import { IconChoiceList } from './IconChoiceList';

export function Example() {
  const [selected, setSelected] = useState('product');
  const handleChange = useCallback((value) => setSelected(value), []);

  const choices = [
    {
      label: 'None',
      value: 'none',
      icon: DisabledIcon,
      helpText: 'Sample help text'
    },
    {
      label: 'Single product',
      value: 'product',
      icon: ProductIcon,
      helpText: 'Apply to products'
    },
    {
      label: 'Collection',
      value: 'collection',
      icon: CollectionIcon,
      helpText: 'Apply to collections'
    },
    {
      label: 'Custom',
      value: 'custom',
      icon: AdjustIcon,
      helpText: 'Disabled option',
      disabled: true
    }
  ];

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <Card>
            <InlineStack align='space-between'>
              <IconChoiceList
                selected={selected}
                choices={choices}
                title='Example Icon Choice List'
                subtitle='This is an example of an Icon Choice List'
                handleChange={handleChange}
              />
            </InlineStack>
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
}
