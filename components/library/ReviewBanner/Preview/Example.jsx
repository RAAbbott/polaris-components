import { Page, Layout } from '@shopify/polaris';
import { ReviewBanner } from './ReviewBanner';

export function Example() {
  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <ReviewBanner
            title='How was your experience?'
            description='Click below to rate us on shopify app store'
            onReview={(rating) => {
              // Handle the rating (1-5) here
              console.log(rating);
              // You can:
              // - Hide the banner
              // - Redirect to app store
              // - Record analytics
              // - Send slack notifications like `${shopName} clicked on review banner: ${rating} stars`
            }}
          />
        </Layout.Section>
      </Layout>
    </Page>
  );
}
