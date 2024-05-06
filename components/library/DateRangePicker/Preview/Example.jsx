import { Layout, Page } from '@shopify/polaris';
import { DateRangePicker } from './DateRangePicker';

export const Example = () => {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <DateRangePicker
            onDateRangeSelect={({ start, end }) => {
              console.log('Selected Start Date:', start);
              console.log('Selected End Date:', end);
              // You can now do whatever you need with these dates, like setting state or making API calls
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
};
