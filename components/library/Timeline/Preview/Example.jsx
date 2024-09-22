import { Page, Badge } from '@shopify/polaris';
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
