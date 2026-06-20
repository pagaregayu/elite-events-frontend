import Hero from "../../components/Hero/Hero";
import ReviewSection from "../../admin/components/ReviewSection/ReviewSection";

import {
  FaCalendarCheck,
  FaUsers,
  FaStar,
  FaAward,
  FaGlassCheers,
  FaBirthdayCake,
  FaBuilding,
  FaMusic,
} from "react-icons/fa";

function Home() {
  return (
    <div className="bg-slate-50 overflow-hidden">

      {/* HERO */}
      <Hero />

      {/* WHY CHOOSE US */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-16">

            <span className="text-yellow-600 font-semibold uppercase tracking-wider">
              Elite Events
            </span>

            <h2 className="text-5xl font-bold mt-4 text-slate-900">
              Why Choose Us
            </h2>

            <p className="text-slate-600 mt-4 max-w-3xl mx-auto">
              We transform your dream celebrations into unforgettable
              experiences with creativity, elegance, and perfection.
            </p>

          </div>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-3 duration-300">

              <h3 className="text-2xl font-bold mb-4">
                Luxury Weddings
              </h3>

              <p className="text-slate-600">
                Beautiful wedding planning with premium decorations,
                venues and photography.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-3 duration-300">

              <h3 className="text-2xl font-bold mb-4">
                Corporate Events
              </h3>

              <p className="text-slate-600">
                Professional conferences, product launches and
                corporate celebrations.
              </p>

            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 hover:-translate-y-3 duration-300">

              <h3 className="text-2xl font-bold mb-4">
                Birthday Parties
              </h3>

              <p className="text-slate-600">
                Creative birthday themes and unforgettable celebrations.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* STATS */}
      <section className="bg-gradient-to-r from-yellow-500 to-orange-500 py-20 text-white">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid md:grid-cols-4 gap-8 text-center">

            <div>
              <FaCalendarCheck className="text-5xl mx-auto mb-4" />
              <h2 className="text-5xl font-bold">2500+</h2>
              <p>Events Managed</p>
            </div>

            <div>
              <FaUsers className="text-5xl mx-auto mb-4" />
              <h2 className="text-5xl font-bold">1500+</h2>
              <p>Happy Clients</p>
            </div>

            <div>
              <FaStar className="text-5xl mx-auto mb-4" />
              <h2 className="text-5xl font-bold">4.9</h2>
              <p>Average Rating</p>
            </div>

            <div>
              <FaAward className="text-5xl mx-auto mb-4" />
              <h2 className="text-5xl font-bold">12+</h2>
              <p>Years Experience</p>
            </div>

          </div>

        </div>

      </section>

      {/* EVENT CATEGORIES */}
      <section className="py-24 bg-white">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Event Categories
          </h2>

          <div className="grid md:grid-cols-4 gap-8">

            <div className="bg-pink-50 p-8 rounded-3xl text-center hover:shadow-xl duration-300">
              <FaGlassCheers className="text-5xl mx-auto mb-4 text-pink-500" />
              <h3 className="text-xl font-bold">
                Weddings
              </h3>
            </div>

            <div className="bg-yellow-50 p-8 rounded-3xl text-center hover:shadow-xl duration-300">
              <FaBirthdayCake className="text-5xl mx-auto mb-4 text-yellow-500" />
              <h3 className="text-xl font-bold">
                Birthdays
              </h3>
            </div>

            <div className="bg-blue-50 p-8 rounded-3xl text-center hover:shadow-xl duration-300">
              <FaBuilding className="text-5xl mx-auto mb-4 text-blue-500" />
              <h3 className="text-xl font-bold">
                Corporate
              </h3>
            </div>

            <div className="bg-purple-50 p-8 rounded-3xl text-center hover:shadow-xl duration-300">
              <FaMusic className="text-5xl mx-auto mb-4 text-purple-500" />
              <h3 className="text-xl font-bold">
                Concerts
              </h3>
            </div>

          </div>

        </div>

      </section>

      {/* FEATURED EVENTS */}
      <section className="py-24 bg-slate-100">

        <div className="max-w-7xl mx-auto px-6">

          <h2 className="text-5xl font-bold text-center mb-16">
            Featured Events
          </h2>

          <div className="grid md:grid-cols-3 gap-8">

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 duration-300">

              <img
                src="https://images.unsplash.com/photo-1519741497674-611481863552"
                alt="Wedding"
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  Luxury Wedding
                </h3>

                <p className="text-slate-600">
                  Elegant destination wedding planning.
                </p>
              </div>

            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 duration-300">

              <img
                src="https://images.unsplash.com/photo-1511578314322-379afb476865"
                alt="Corporate"
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  Corporate Summit
                </h3>

                <p className="text-slate-600">
                  Professional conferences and launches.
                </p>
              </div>

            </div>

            <div className="bg-white rounded-3xl overflow-hidden shadow-xl hover:scale-105 duration-300">

              <img
                src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
                alt="Concert"
                className="h-72 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2">
                  Music Festival
                </h3>

                <p className="text-slate-600">
                  Grand concerts and entertainment shows.
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>

      {/* REVIEWS */}
      <ReviewSection />

      {/* CTA */}
      <section className="py-24 bg-gradient-to-r from-slate-900 to-slate-700 text-center text-white">

        <h2 className="text-6xl font-bold mb-6">
          Let's Create Something Amazing
        </h2>

        <p className="text-xl mb-8">
          Weddings • Corporate Events • Birthdays • Concerts
        </p>

        <button className="bg-yellow-500 text-black px-8 py-4 rounded-full font-bold hover:scale-105 duration-300">
          Book Your Event
        </button>

      </section>

    </div>
  );
}

export default Home;