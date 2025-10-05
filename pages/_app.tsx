import '@/styles/globals.css';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import type { AppProps } from 'next/app';
import { AppProvider } from '@shopify/polaris';
import { Layout } from '@/components/Layout';
import "../styles/rich-text-editor.css";
import Head from 'next/head';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdn.shopify.com/static/fonts/inter/v4/styles.css"
        />
        <script src="https://cdn.shopify.com/shopifycloud/polaris.js" async></script>
      </Head>
      <AppProvider i18n={enTranslations}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppProvider>
    </>
  );
}
