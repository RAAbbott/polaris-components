import { Page, Layout } from '@shopify/polaris';
import { ReviewBanner } from './ReviewBanner';

export function Example() {
  return (
    <Page>
      <ReviewBanner
        title='How was your experience?'
        description='Click below to rate us on the Shopify App Store'
        onReview={(rating) => {
          console.log(`Rating: ${rating}`);
          // You can:
          // - Hide the banner
          // - Redirect to app store
          // - Record analytics
          // - Send slack notifications like `${shopName} clicked on review banner: ${rating} stars`
        }}
        onClose={() => {
          // Handle the close action here
          console.log('Review banner closed');
        }}
      />
    </Page>
  );
}
