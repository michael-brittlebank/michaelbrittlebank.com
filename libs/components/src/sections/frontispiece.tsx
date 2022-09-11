export function Frontispiece() {
  const desktopImageUrl = '/images/face_desktop.jpg';
  const tabletImageUrl = '/images/face_tablet.jpg';
  const mobileImageUrl = '/images/face_mobile.jpg';

  return (
    <div id="frontispiece-container">
      <div
        id="frontispiece-image-container"
        className="full-screen-grid-container row section-container">
        <img
          id="frontispiece-image"
          src={desktopImageUrl}
          alt="Logo"
          width={1280}
          height={960}
          srcSet={`${mobileImageUrl} 414w, ${tabletImageUrl} 768w, ${desktopImageUrl} 1280w`}
        />
        <div id="frontispiece-logo" className="animated fadeInRight">
          <p>Mike</p>
          <p>Stumpf</p>
        </div>
      </div>
    </div>
  );
}
