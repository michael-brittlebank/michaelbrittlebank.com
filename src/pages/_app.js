import '../styles/app.scss';
import Header from '../components/header';
import Footer from '../components/footer';
import PageContainer from '../components/page-container';

function AppContainer({ Component, pageProps }) {
  return (
    <>
      <Header />
      <PageContainer>
        <Component {...pageProps} />
      </PageContainer>
      <Footer />
    </>
  );
}

export default AppContainer;
