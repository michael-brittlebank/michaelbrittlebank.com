import Image, { StaticImageData } from 'next/image';
import { useState } from 'react';

interface Props {
  photo: StaticImageData | string;
}

export function Frontispiece(props: Props) {
  const { photo } = props;
  const [hasLoaded, setHasLoaded] = useState(false);
  const handleHasLoaded = () => {
    setHasLoaded(true);
  };
  return (
    <div id="frontispiece-container" className="section-container">
      <div
        id="frontispiece-background-container"
        className="full-screen-grid-container">
        <div
          id="frontispiece-image-logo-container"
          className="grid-container row">
          <div
            id="frontispiece-image-container"
            style={{ borderColor: hasLoaded ? 'white' : 'transparent' }}>
            <Image
              id="frontispiece-image"
              alt="Mike Stumpf"
              src={photo}
              placeholder="empty"
              width={848}
              height={848}
              onLoadingComplete={handleHasLoaded}
            />
          </div>
          <div id="frontispiece-logo" className="animated fadeInRight">
            <p>Mike</p>
            <p>Stumpf</p>
          </div>
        </div>
      </div>
    </div>
  );
}
