export default function Frontispiece() {
 return (
   <div id="frontispiece-container">
    <div id="frontispiece-image-container" className="full-screen-grid-container row section-container">
     <img id="frontispiece-image" src="/images/face_desktop.jpg" alt="Logo" width={1280} height={960} />
     <div id="frontispiece-logo" className="animated fadeInRight">
      <p>Mike</p>
      <p>Stumpf</p>
     </div>
    </div>
   </div>
 )
}