import { Tab } from '@/types';

const Example = `import { Page, Badge } from '@shopify/polaris';
import Timeline from './Timeline'

export function Example() {

  // Event timestamps must be in date order (ascending or descending)
  // tone is optional
  //  - critical and caution will use Alert indicator
  //  - success will use Check indicator
  //  - all other tones will use Chevron indicator with Polaris tone color applied
  //  - undefined will show the Shopify-style timeline marker
  // url is optional
  // icon is optional
  // timelineEvent will accept a string or a JSX.Element

  const timelineItems = [
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          A refund was processed for order <Badge>#1242</Badge>. An ARN was generated - 23587235897.
        </>
      ),
      timestamp: new Date('2024-09-12T13:30:00')
    },
    {
      tone: 'base',
      icon: <img src="/timeline-icon_ricemill.png" width="16" height="16" />,
      url: undefined,
      timelineEvent: (
        <>
          Order <Badge>#1241</Badge> was successfully delivered. (Ricemill)
        </>
      ),
      timestamp: new Date('2024-09-12T09:29:00')
    },
    {
      tone: 'critical',
      url: undefined,
      timelineEvent: (
        <>
          Order <Badge>#1240</Badge> flagged for review due to suspicious activity.
        </>
      ),
      timestamp: new Date('2024-09-11T15:00:00')
    },
    {
      tone: 'success',
      url: 'https://example.com/order/1235',
      timelineEvent: (
        <>
          Order <Badge>#1235</Badge> shipped via Fedex.
        </>
      ),
      timestamp: new Date('2024-09-11T14:59:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer logged in.
        </>
      ),
      timestamp: new Date('2024-09-11T09:44:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Failed login attempt detected.
        </>
      ),
      timestamp: new Date('2024-09-11T06:59:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src="/timeline-icon_loyalty.png" width="16" height="16" />,
      timelineEvent: (
        <>
          Customer redeemed 50 reward points on an order <Badge>#1237</Badge> (LoyaltyPlus)
        </>
      ),
      timestamp: new Date('2024-09-10T18:19:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src="/timeline-icon_loyalty.png" width="16" height="16" />,
      timelineEvent: (
        <>
          Customer earned 100 reward points for subscribing to your mailing list. (LoyaltyPlus)
        </>
      ),
      timestamp: new Date('2024-09-10T18:14:00')
    },
    {
      tone: 'caution',
      url: undefined,
      timelineEvent: (
        <>
          Account flagged for unusual activity.
        </>
      ),
      timestamp: new Date('2024-09-10T16:00:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/fraud-check',
      timelineEvent: (
        <>
          Fraud check was initiated for order <Badge>#1236</Badge>
        </>
      ),
      timestamp: new Date('2024-09-10T12:10:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer placed an order <Badge>#1234</Badge>
        </>
      ),
      timestamp: new Date('2024-09-10T10:30:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer placed order <Badge>#1239</Badge>
        </>
      ),
      timestamp: new Date('2024-09-09T13:25:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/points-earned',
      timelineEvent: (
        <>
          Customer earned 200 reward points after purchase.
        </>
      ),
      timestamp: new Date('2024-09-09T13:00:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer earned 100 reward points.
        </>
      ),
      timestamp: new Date('2024-09-09T11:30:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer contacted support regarding an issue with order.
        </>
      ),
      timestamp: new Date('2024-09-09T11:00:00')
    },
    {
      tone: 'critical',
      url: undefined,
      icon: <img src="/timeline-icon_security.png" width="16" height="16" />,
      timelineEvent: (
        <>
          Customer flagged for fraud. (Securité)
        </>
      ),
      timestamp: new Date('2024-09-09T08:15:00')
    },
    {
      tone: 'base',
      url: undefined,
      icon: <img src="/timeline-icon_ricemill.png" width="16" height="16" />,
      timelineEvent: (
        <>
          Customer updated their shipping address. (Ricemill)
        </>
      ),
      timestamp: new Date('2024-09-08T14:09:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer&apos;s email address was updated.
        </>
      ),
      timestamp: new Date('2024-09-08T12:44:00')
    },
    {
      tone: 'base',
      url: 'https://example.com/account-updated',
      timelineEvent: (
        <>
          Account details updated.
        </>
      ),
      timestamp: new Date('2024-09-08T11:19:00')
    },
    {
      tone: 'base',
      url: undefined,
      timelineEvent: (
        <>
          Customer subscribed to newsletter.
        </>
      ),
      timestamp: new Date('2024-09-07T09:29:00')
    }
  ]

  return (
    <Page narrowWidth>
      <Timeline items={timelineItems} />
    </Page>
  );
}
`;

const Timeline = `import { BlockStack, Box, Icon, InlineGrid, InlineStack, Link, Text } from "@shopify/polaris";
import { Fragment } from "react"
import { AlertCircleIcon, CheckCircleIcon, ChevronRightIcon, CircleChevronRightIcon } from "@shopify/polaris-icons";
import styles from './timeline.module.css';

export default function Timeline({ items }) {

  function getBulletIconFromTone(tone) {
    switch (tone) {
      case 'critical':
      case 'caution':
        return AlertCircleIcon;
      case 'success':
        return CheckCircleIcon
      case 'base':
      case undefined:
        return null;
      default:
        return CircleChevronRightIcon;
    }
  }

  let lastDate = null;

  return (
    <Box>
      <BlockStack gap="300">
        {items?.length ? items.map((item, index) => {
          const currentDate = item.timestamp.toLocaleDateString([], { year: 'numeric', month: 'long', day: 'numeric' });
          const showDate = currentDate !== lastDate;
          lastDate = currentDate;
          const bulletIcon = getBulletIconFromTone(item.tone);

          return (
            <Fragment key={index}>
              {showDate && (
                <InlineGrid gap="200" columns="30px auto 90px">
                  <div>
                    &nbsp;
                  </div>
                  <BlockStack gap="0">
                    <Box paddingBlockStart="600">
                      <Text alignment="start" as="h2" variant="bodySm" tone="subdued" key={\`date-\${index}\`}>
                        {currentDate}
                      </Text>
                    </Box>
                  </BlockStack>
                  <div>&nbsp;</div>
                </InlineGrid>

              )}

              <InlineGrid gap="200" columns="30px auto 90px" alignItems="center">
                <div className={styles['timeline-icon']}>
                  {item.tone === 'base' || !bulletIcon ? (
                    <div className={styles['timeline-icon-base']}>
                      <div className={styles['timeline-icon-base-inner']} />
                    </div>
                  ) : (
                    <span className={styles['timeline-icon-polaris-icon']}><Icon source={bulletIcon} tone={item.tone} /></span>
                  )}
                </div>
                <Box className={styles['timeline-event-description']}>
                  <InlineStack gap="200" wrap={false} blockAlign="center">
                    {item.icon}
                    {item.url ? (
                      <Link url={item.url} monochrome removeUnderline>
                        <InlineStack gap="0" wrap={false} blockAlign="start">
                          <Box className={styles['timeline-event-link-main']}>{item.timelineEvent}</Box>
                          <Icon source={ChevronRightIcon} />
                        </InlineStack>
                      </Link>
                    ) : (
                      <Box>{item.timelineEvent}</Box>
                    )}
                  </InlineStack>
                </Box>
                <Text as="p" alignment="end" tone="subdued" variant="bodySm">
                  {item.timestamp.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true })}
                </Text>
              </InlineGrid>
            </Fragment>
          );
        }) : (
          <Text as="p">No timeline events available.</Text>
        )}
      </BlockStack>
    </Box>
  );
}
`;

const CSSFile = `/* You may need to tweak the three z-index values in your app, if you find content is hiding */

.timeline-icon {
	position: relative;
	display: flex;
	align-items: center;
	justify-content: center;
	height: 24px;
	width: 24px;
	margin-right: 10px;
}

.timeline-icon-polaris-icon {
	z-index: 1;
}

.timeline-icon:before {
	content: '';
	position: absolute;
	top: -40px;
	bottom: -30px;
	left: 50%;
	transform: translateX(-50%);
	width: 2px;
	background-color: #dfe3e8;
	z-index: 0;
}

.timeline-icon-base {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 16px;
	height: 16px;
	background-color: var(--p-color-border);
	border-radius: 3px;
	z-index: 1;
}

.timeline-icon-base-inner {
	width: 8px;
	height: 8px;
	background-color: var(--p-color-icon);
	border-radius: 3px;
}

.timeline-event-description .Polaris-Icon {
	display: inline;
	margin: 0;
}

a:hover .timeline-event-link-main {
	text-decoration: underline !important;
}
`;


export const tabs: Tab[] = [
  { title: 'Example Usage', content: Example },
  { title: 'Timeline.jsx', content: Timeline },
  { title: 'timeline.module.css', content: CSSFile, lang: 'css' },
];