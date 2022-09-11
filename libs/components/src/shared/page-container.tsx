import { ReactNode } from 'react';
import { Header } from './header';
import { Footer } from './footer';

interface Props {
  children: ReactNode;
}

export function PageContainer(props: Props) {
  const { children } = props;
  return (
    <>
      <Header />
      <main className="container page-container">{children}</main>
      <Footer />
    </>
  );
}
