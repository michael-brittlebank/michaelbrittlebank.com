import { Frontispiece, Personal, Resume, Travel } from '@mikestumpf/components';
import { useEffect, useState } from 'react';
import profile from '../../public/images/profile.jpeg';

export default function Home() {
  const [hasMounted, setHasMounted] = useState<boolean>(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <Frontispiece photo={profile} />
      <Resume />
      {hasMounted && (
        <>
          <Travel />
          <Personal />
        </>
      )}
    </>
  );
}
