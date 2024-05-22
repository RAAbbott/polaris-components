import { useState } from 'react';
import { Layout, Page } from '@shopify/polaris';
import { DateRangePicker } from './DateRangePicker';

export const Example = () => {
  const [date, setDate] = useState({}); // {start, end}

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <DateRangePicker
            value={date}
            onDateRangeSelect={({ start, end }) => {
              console.log('Selected Start Date:', start);
              console.log('Selected End Date:', end);
              // You can now do whatever you need with these dates, like setting state or making API calls
              setDate({ start, end });
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
