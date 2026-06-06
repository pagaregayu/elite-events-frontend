import "./About.css";

function About() {
  return (
    <div className="about-page">

      <section className="about-banner">
        <div className="container">
          <h1>About Elite Events</h1>
        </div>
      </section>

      <section className="container py-5">

        <div className="row align-items-center">

          <div className="col-md-6">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt=""
              className="img-fluid rounded"
            />
          </div>

          <div className="col-md-6">
            <h2>Who We Are</h2>

            <p>
              Elite Events is a luxury event management platform
              helping clients connect with premium vendors,
              decorators, photographers and event planners.
            </p>

            <p>
              We specialize in weddings, conferences,
              corporate gatherings and unforgettable celebrations.
            </p>
          </div>

        </div>

      </section>

      <section className="vision-section">

        <div className="container">

          <div className="row">

            <div className="col-md-6">
              <h3>Our Vision</h3>
              <p>
                To become the most trusted event marketplace.
              </p>
            </div>

            <div className="col-md-6">
              <h3>Our Mission</h3>
              <p>
                Deliver memorable experiences through innovation.
              </p>
            </div>

          </div>

        </div>

      </section>

    </div>
  );
}

export default About;