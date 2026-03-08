import Image from 'next/image';
import { useState } from 'react';
import profile from '../../../public/images/profile.jpg';

export function Frontispiece() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const handleHasLoaded = () => {
    setHasLoaded(true);
  };
  return (
    <div id='frontispiece-container' className='section-container'>
      <div
        id='frontispiece-background-container'
        className='full-screen-grid-container'>
        <div
          id='frontispiece-image-logo-container'
          className='grid-container row'>
          <div
            id='frontispiece-image-container'
            style={{
              borderColor: hasLoaded ? 'white' : 'transparent',
              backgroundColor: hasLoaded ? 'white' : 'transparent',
            }}>
            <Image
              id='frontispiece-image'
              alt='Michael Brittlebank'
              src={profile}
              placeholder='empty'
              width={300}
              height={300}
              onLoad={handleHasLoaded}
            />
          </div>
          <div id='frontispiece-logo' className='animated fadeInRight'>
            <p>
              Michael
              <br />
              (Stumpf)
              <br />
              Brittlebank
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
