import "./Hero.css";

function Hero() {
  return (
    <section className="hero-section">

      <div className="hero-overlay">

        <div className="container hero-content">

          <h1>
            Create Unforgettable Events
          </h1>

          <p>
            Weddings, Corporate Events,
            Conferences & Luxury Celebrations
          </p>

          <div className="hero-search">

            <input
              type="text"
              placeholder="Search Event Type"
            />

            <button>
              Search
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default Hero;