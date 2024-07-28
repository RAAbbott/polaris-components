import { Tab } from '@/types';

const StatBox = `// IMPORTANT: If using this component in Remix, you must wrap it in the <ClientOnly> component from the remix-utils package

import { Card, Text, Box } from '@shopify/polaris';
import { ArrowUpIcon, ArrowDownIcon } from '@shopify/polaris-icons';
import { SparkLineChart } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

export const StatBox = ({ title, value, data = [] }) => {
  const hasData = data && data.length;
  const percentageChange = hasData
    ? getPercentageChange(Number(data[0]), Number(data.at(-1)))
    : null;

  return (
    <Card padding='0'>
      <Box paddingBlock='400' paddingInlineStart='400'>
        <div
          style={{
            height: 65,
            position: 'relative',
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'end',
              gap: 4
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: -2,
                zIndex: 20,
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Text as='p' variant='headingSm'>
                {title}
              </Text>
            </div>
            <Text as='h2' variant='headingLg' fontWeight='bold'>
              {value}
            </Text>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: -2 }}>
              {percentageChange ? (
                percentageChange > 0 ? (
                  <ArrowUpIcon style={{ height: 12, width: 12 }} fill={'green'} />
                ) : (
                  <ArrowDownIcon style={{ height: 12, width: 12 }} fill={'red'} />
                )
              ) : null}
              <Text variant='bodySm' tone='subdued'>
                <span
                  style={
                    percentageChange
                      ? {
                          color: percentageChange > 0 ? 'green' : 'red'
                        }
                      : undefined
                  }
                >
                  {Math.abs(percentageChange) || '-'}%
                </span>
              </Text>
            </div>
          </div>
          {hasData ? (
            <div style={{ flex: 1, width: '50%', height: '80%', alignSelf: 'end' }}>
              <SparkLineChart offsetLeft={4} offsetRight={0} data={formatChartData(data)} />
            </div>
          ) : null}
        </div>
      </Box>
    </Card>
  );
};

// Formats number array to expected format from polaris-viz chart
const formatChartData = (values = []) => {
  return [{ data: values?.map((stat, idx) => ({ key: idx, value: stat })) }];
};

// Gets rate of change based on first + last entry in chart data
const getPercentageChange = (start = 0, end = 0) => {
  if (isNaN(start) || isNaN(end)) return null;

  const percentage = (((end - start) / start) * 100).toFixed(0);

  if (percentage > 999) {
    return 999;
  }

  if (percentage < -999) {
    return -999;
  }

  return percentage;
};
`;

const Example = `import { Layout, Page, Grid, Text, BlockStack } from '@shopify/polaris';
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
`;

export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'StatBox.jsx', content: StatBox }
];
