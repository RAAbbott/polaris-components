import { useState } from 'react';
import { Page, Layout } from '@shopify/polaris';
import { SortableTable } from './SortableTable';

export const Example = () => {
  const [items, setItems] = useState([
    { id: 1, title: 'T-Shirt', status: 'active' },
    { id: 2, title: 'Skateboard', status: 'active' },
    { id: 3, title: 'Snowboard', status: 'archived' },
    { id: 4, title: 'Ultimate Snowboard', status: 'active' },
    { id: 5, title: 'Mechanical Pencil', status: 'draft' }
  ]);

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <SortableTable items={items} setItems={setItems} />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
