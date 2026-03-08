'use client'; // Error boundaries must be Client Components

import { Footer, Frontispiece, Personal, Resume, Travel } from '@/components';
import { useEffect, useState } from 'react';

export default function Page() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
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
