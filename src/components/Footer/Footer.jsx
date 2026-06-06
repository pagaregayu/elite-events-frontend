import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-section">

      <div className="container">

        <div className="row">

          <div className="col-md-4">
            <h3>Elite Events</h3>
            <p>
              Creating unforgettable experiences for weddings,
              corporate events, conferences and celebrations.
            </p>
          </div>

          <div className="col-md-4">
            <h4>Quick Links</h4>

            <ul>
              <li>Home</li>
              <li>About</li>
              <li>Services</li>
              <li>Gallery</li>
            </ul>
          </div>

          <div className="col-md-4">
            <h4>Contact</h4>

            <p>info@eliteevents.com</p>
            <p>+91 9876543210</p>
          </div>

        </div>

        <hr />

        <p className="text-center">
          © 2026 Elite Events. All Rights Reserved.
        </p>

      </div>
    </footer>
  );
}

export default Footer;