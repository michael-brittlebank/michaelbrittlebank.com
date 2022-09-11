import { PageContainer } from '@mikestumpf/components';
import Head from 'next/head';
import { AppProps } from 'next/app';
import '../styles/app.scss';
import { useEffect, useState } from 'react';

function AppContainer({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // https://github.com/vercel/next.js/discussions/17443
    setMounted(true);
  }, []);

  return (
    <>
      <Head>
        <title>Mike Stumpf</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      {mounted && (
        <PageContainer>
          <Component {...pageProps} />
        </PageContainer>
      )}
    </>
  );
}

export default AppContainer;
