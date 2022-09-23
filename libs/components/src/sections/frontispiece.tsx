import Image, { StaticImageData } from 'next/image';

interface Props {
  photo: StaticImageData | string;
}

export function Frontispiece(props: Props) {
  const { photo } = props;
  return (
    <div id="frontispiece-container" className="section-container">
      <div
        id="frontispiece-background-container"
        className="full-screen-grid-container">
        <div
          id="frontispiece-image-logo-container"
          className="grid-container row">
          <div id="frontispiece-image-container">
            <Image
              id="frontispiece-image"
              alt="Mike Stumpf"
              src={photo}
              placeholder="blur"
              width={848}
              height={848}
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
