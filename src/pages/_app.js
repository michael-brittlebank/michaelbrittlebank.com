import '../styles/app.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import PageContainer from '../components/page-container';
import Head from 'next/head';

function AppContainer({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Mike Stumpf</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <Header />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
      <Footer />
    </>
  );
}

export default AppContainer;
