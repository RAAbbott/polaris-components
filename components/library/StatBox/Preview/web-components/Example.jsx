import { StatBox } from './StatBox';

export const Example = () => {
  // Each array represents the values for the past 7 days including today
  const stats = {
    orders: [13, 20, 18, 5, 8, 15, 23],
    reviews: [3, 3, 5, 6, 5, 2, 8],
    returns: [5, 6, 5, 8, 4, 3, 1]
  };

  return (
    <s-page>
      <s-box paddingBlock="large">
        <s-stack direction="block" gap="small-500">
          <s-heading>Daily Stats Example</s-heading>
          <s-text color="subdued">
            Shows rate of change from first entry of chart data to today
          </s-text>
        </s-stack>
      </s-box>
      <s-grid gridTemplateColumns='repeat(3, 1fr)' columnGap="base">
        <s-grid-item>
          <StatBox title='Orders' value={stats.orders.at(-1)} data={stats.orders} />
        </s-grid-item>
        <s-grid-item>
          <StatBox title='Reviews' value={stats.reviews.at(-1)} data={stats.reviews} />
        </s-grid-item>
        <s-grid-item>
          <StatBox title='Returns' value={stats.returns.at(-1)} data={stats.returns} />
        </s-grid-item>
      </s-grid>
    </s-page>
  );
};
