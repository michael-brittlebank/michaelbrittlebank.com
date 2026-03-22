'use client'; // Error boundaries must be Client Components

import { Footer, Frontispiece, Header, Personal, Resume, Travel } from '@/components';
import { useEffect, useState } from 'react';

export default function Page() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Header />
      <Frontispiece />
      <Resume />
      {hasMounted && (
        <>
          <Travel />
          <Personal />
        </>
      )}
      <Footer />
    </>
  );
}
