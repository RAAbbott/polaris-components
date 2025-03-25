import { useState, useRef } from 'react';
import { Page, Layout, Button, BlockStack } from '@shopify/polaris';

// This is the HOC that wraps the component to allow ref/style/className props to be passed to the component
import { enrichPolarisComponent } from 'enrich-polaris-component';

import styles from './EnrichedPolarisComponent.module.css';

// Wrap a Polaris component with the HOC to allow ref/style/className props to be passed to the component:
const EnhancedButton = enrichPolarisComponent(Button);

export const Example = () => {
  const buttonOneRef = useRef(null); // You can use a ref to access the button element directly, but it's not required.

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          <BlockStack gap='200'>
            <EnhancedButton
              ref={buttonOneRef} // A wrapped component can accept a ref prop, but it's not really used here.
              style={{ color: 'red' }} // You can pass a style prop to the wrapped component, and it will be applied to the underlying HTML element.
            >
              I&apos;m style enhanced
            </EnhancedButton>
            <EnhancedButton
              style={{ color: 'green' }} // Different instances of the wrapped component can have different styles applied to them.
            >
              I&apos;m also style enhanced, with a different style
            </EnhancedButton>
            <EnhancedButton
              className={styles.blueButton} // You can pass a className prop to the wrapped component, and it will be applied to the underlying HTML element.
            >
              I&apos;m className enhanced
            </EnhancedButton>
            <EnhancedButton
              style={{ backgroundColor: 'chartreuse' }} // You can pass a style prop...
              className={styles.blueButton} // ...and a className prop to the wrapped component at the same time.
            >
              I&apos;m both style and className enhanced. Mmm, chartreuse...
            </EnhancedButton>
          </BlockStack>
        </Layout.Section>
      </Layout>
    </Page>
  );
};
