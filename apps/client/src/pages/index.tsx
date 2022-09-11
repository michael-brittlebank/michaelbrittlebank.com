import {
  Frontispiece,
  Portfolio,
  Resume,
  Travel,
} from '@mikestumpf/components';
import classNames from 'classnames';
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
      <div
        className={classNames({
          opaque: !hasMounted,
        })}>
        <Travel />
        <Portfolio />
      </div>
    </>
  );
}
