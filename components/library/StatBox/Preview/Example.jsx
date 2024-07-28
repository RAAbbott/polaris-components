import { Layout, Page, Grid, Text, BlockStack } from '@shopify/polaris';
import { StatBox } from './StatBox';

export const Example = () => {
  // Each array represents the values for the past 7 days including today
  const stats = {
    orders: [13, 20, 18, 5, 8, 15, 23],
    reviews: [3, 3, 5, 6, 5, 2, 8],
    returns: [5, 6, 5, 8, 4, 3, 1]
  };

  return (
    <Page>
      <Layout>
        <Layout.Section>
          <BlockStack gap='100'>
            <Text variant='headingMd'>Daily Stats Example</Text>
            <Text variant='bodySm' tone='subdued'>
              Shows rate of change from first entry of chart data to today
            </Text>
          </BlockStack>
        </Layout.Section>
        <Layout.Section>
          <Grid columns={3}>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <StatBox title='Orders' value={stats.orders.at('-1')} data={stats.orders} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <StatBox title='Reviews' value={stats.reviews.at(-1)} data={stats.reviews} />
            </Grid.Cell>
            <Grid.Cell columnSpan={{ xs: 6, lg: 4 }}>
              <StatBox title='Returns' value={stats.returns.at(-1)} data={stats.returns} />
            </Grid.Cell>
          </Grid>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
