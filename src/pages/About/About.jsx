import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();

  const stats = [
    { number: "500+", label: "Events Delivered" },
    { number: "12+", label: "Years Experience" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "50+", label: "Cities Covered" },
  ];

  const values = [
    {
      icon: "✦",
      title: "Craftsmanship",
      desc: "Every detail is considered, every element is intentional. We treat each event as a work of art.",
    },
    {
      icon: "◈",
      title: "Reliability",
      desc: "We deliver on every promise, on time and within budget — no surprises, only results.",
    },
    {
      icon: "❋",
      title: "Creativity",
      desc: "Fresh concepts, bold ideas, and bespoke experiences that stand apart from the ordinary.",
    },
    {
      icon: "⬡",
      title: "Passion",
      desc: "We love what we do and it shows — in the energy we bring and the events we produce.",
    },
  ];

  return (
    <div className="bg-white min-h-screen font-sans">

      {/* ── Hero Banner ── */}
      <section className="relative h-72 md:h-96 flex items-center justify-center overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1511578314322-379afb476865"
          alt="Elite Events"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative z-10 text-center px-6">
          <p className="text-pink-400 uppercase tracking-widest text-sm font-semibold mb-3">
            Our Story
          </p>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight">
            About Elite Events
          </h1>
        </div>
      </section>

      {/* ── Who We Are ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-14 items-center">

          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1511578314322-379afb476865"
              alt="Who We Are"
              className="rounded-2xl w-full h-80 object-cover shadow-xl"
            />
            {/* floating badge */}
            <div className="absolute -bottom-5 -right-5 bg-pink-500 text-white rounded-2xl px-6 py-4 shadow-lg shadow-pink-200">
              <p className="text-3xl font-extrabold leading-none">12+</p>
              <p className="text-xs font-semibold tracking-wide mt-1">Years of Excellence</p>
            </div>
          </div>

          <div>
            <p className="uppercase tracking-widest text-xs text-pink-500 font-semibold mb-3">
              Who We Are
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 leading-tight">
              India's Premier Event Management Company
            </h2>
            <p className="text-gray-500 leading-relaxed mb-4 text-base">
              Elite Events is a luxury event management platform helping clients connect with
              premium vendors, decorators, photographers, and event planners across India and beyond.
            </p>
            <p className="text-gray-500 leading-relaxed mb-8 text-base">
              We specialize in weddings, conferences, corporate gatherings, and unforgettable
              private celebrations — delivering every experience with precision, creativity, and heart.
            </p>
            <button
              onClick={() => navigate("/contact")}
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-bold text-sm px-7 py-3.5 rounded-full transition-colors shadow-md shadow-pink-200"
            >
              Get in Touch →
            </button>
          </div>

        </div>
      </section>

      {/* ── Stats Strip ── */}
      <section className="bg-pink-500 py-12">
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="text-4xl font-extrabold text-white">{s.number}</p>
              <p className="text-pink-100 text-sm font-medium mt-1 tracking-wide">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Vision & Mission ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="grid md:grid-cols-2 gap-8">

          <div className="bg-gray-50 rounded-2xl p-10 border border-gray-100">
            <span className="text-3xl">🎯</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-4 mb-3">Our Vision</h3>
            <p className="text-gray-500 leading-relaxed">
              To become the most trusted and celebrated event marketplace in India — a platform
              where every client finds the perfect team to bring their dream event to life,
              seamlessly and joyfully.
            </p>
          </div>

          <div className="bg-pink-50 rounded-2xl p-10 border border-pink-100">
            <span className="text-3xl">🚀</span>
            <h3 className="text-2xl font-extrabold text-gray-900 mt-4 mb-3">Our Mission</h3>
            <p className="text-gray-500 leading-relaxed">
              To deliver memorable experiences through innovation, craftsmanship, and genuine care —
              connecting clients with the finest professionals and ensuring every event exceeds
              expectations.
            </p>
          </div>

        </div>
      </section>

      {/* ── Core Values ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">

          <p className="text-center uppercase tracking-widest text-xs text-pink-500 font-semibold mb-3">
            What Drives Us
          </p>
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-900 mb-14">
            Our Core Values
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center text-pink-500 text-xl font-bold mb-5">
                  {v.icon}
                </div>
                <h4 className="font-extrabold text-gray-900 text-lg mb-2">{v.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="bg-pink-500 rounded-3xl px-10 py-14 text-center shadow-xl shadow-pink-200">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4">
            Ready to Plan Your Next Event?
          </h2>
          <p className="text-pink-100 text-base mb-8 max-w-md mx-auto leading-relaxed">
            Let's create something extraordinary together. Reach out and our team will get back to you within 24 hours.
          </p>
          <button
            onClick={() => navigate("/contact")}
            className="inline-flex items-center gap-2 bg-white text-pink-500 hover:bg-pink-50 font-bold text-sm px-8 py-4 rounded-full transition-colors shadow-md"
          >
            Contact Us Today →
          </button>
        </div>
      </section>

    </div>
  );
}

export default About;