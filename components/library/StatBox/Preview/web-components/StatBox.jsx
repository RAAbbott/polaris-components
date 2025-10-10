// IMPORTANT: If using this component in Remix, you must wrap it in the <ClientOnly> component from the remix-utils package

import { SparkLineChart } from '@shopify/polaris-viz';
import '@shopify/polaris-viz/build/esm/styles.css';

export const StatBox = ({ title, value, data = [] }) => {
  const hasData = data && data.length;
  const percentageChange = hasData
    ? getPercentageChange(Number(data[0]), Number(data.at(-1)))
    : null;

  return (
    <s-section padding="none">
      <s-box paddingBlock="base" paddingInlineStart="base">
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
              minWidth: 30
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -8,
                left: -2,
                zIndex: 20
              }}
            >
              <s-heading>
                {title}
              </s-heading>
            </div>
            <span style={{ fontWeight: 'bold', fontSize: '20px' }}>
              {value}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: -4 }}>
              {percentageChange ? (
                percentageChange > 0 ? (
                  <s-icon type="arrow-up" tone="success" size="small" />
                ) : (
                  <s-icon type="arrow-down" tone="critical" size="small" />
                )
              ) : null}
              <s-text color="subdued">
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
              </s-text>
            </div>
          </div>
          {hasData ? (
            <div style={{ flex: 1, width: '50%', height: '80%', alignSelf: 'end' }}>
              <SparkLineChart offsetLeft={4} offsetRight={0} data={formatChartData(data)} />
            </div>
          ) : null}
        </div>
      </s-box>
    </s-section>
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
