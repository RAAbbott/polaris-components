import '@/styles/globals.css';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import type { AppProps } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import { Layout } from '@/components/Layout';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppProvider i18n={enTranslations}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}
