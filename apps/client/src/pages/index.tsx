import {
  Frontispiece,
  Portfolio,
  Resume,
  Travel,
} from '@mikestumpf/components';
import { useEffect, useState } from 'react';

export default function Home() {
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
          <Portfolio />
        </>
      )}
    </>
  );
}
