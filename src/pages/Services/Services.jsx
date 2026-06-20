import { useState } from "react";
import { useNavigate } from "react-router-dom";

const services = [
  {
    title: "Wedding Decor",
    image: "https://images.pexels.com/photos/1616113/pexels-photo-1616113.jpeg",
    description:
      "Transform your wedding venue into a breathtaking visual masterpiece. We craft immersive décor experiences — from floral installations and lighting design to themed mandaps and stage setups — tailored to your vision.",
    features: [
      "Custom floral & lighting installations",
      "Themed mandap & stage design",
      "Entrance & aisle styling",
      "Table centrepieces & linen",
      "Backdrop & draping",
      "Post-event cleanup",
    ],
  },
  {
    title: "Wedding Management",
    image: "https://images.pexels.com/photos/169190/pexels-photo-169190.jpeg",
    description:
      "We provide a one-stop shop for all your wedding demands. Elite Events is a full-service bespoke wedding planning company whose services are available all throughout India and the world.",
    features: [
      "Venue selection & booking",
      "Photography & videography",
      "Entertainment & live music",
      "Guest & RSVP management",
      "Catering coordination",
      "Budgeting & vendor liaison",
    ],
  },
  {
    title: "Conference Management",
    image: "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg",
    description:
      "End-to-end management of corporate conferences, summits, and seminars. We handle logistics, technical infrastructure, and on-ground execution so your delegates experience a seamless event.",
    features: [
      "Venue & AV setup",
      "Delegate registration",
      "Speaker coordination",
      "Live streaming & recording",
      "Brand signage & collateral",
      "Post-event reporting",
    ],
  },
  {
    title: "Product Launch",
    image: "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg",
    description:
      "Make your product's debut unforgettable. We design high-impact launch events that create buzz, engage media, and leave a lasting impression on your audience and stakeholders.",
    features: [
      "Concept & theme development",
      "Press & media coordination",
      "Experiential activations",
      "Stage & display design",
      "Social media amplification",
      "Celebrity & influencer outreach",
    ],
  },
  {
    title: "Award Ceremonies",
    image: "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg",
    description:
      "Celebrate excellence with a ceremony that reflects the prestige of your awards. From intimate galas to large-scale industry nights, we manage every element with precision and flair.",
    features: [
      "Stage & podium design",
      "Trophy & collateral production",
      "Red-carpet arrival setup",
      "Live entertainment acts",
      "Catering & bar service",
      "Photography & highlight reel",
    ],
  },
  {
    title: "Exhibition Stalls",
    image: "https://images.pexels.com/photos/1170412/pexels-photo-1170412.jpeg",
    description:
      "Stand out on the exhibition floor with custom-designed stalls that attract footfall and communicate your brand story. We handle design, fabrication, and on-site installation.",
    features: [
      "Concept design & 3D renders",
      "Fabrication & installation",
      "Graphic printing",
      "Electrical & AV fit-out",
      "Furniture & branding",
      "Dismantling & logistics",
    ],
  },
  {
    title: "Catering Services",
    image: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg",
    description:
      "Delight your guests with exquisite culinary experiences curated for every occasion. From live counters and multi-cuisine buffets to plated fine-dining and custom wedding menus, our catering team ensures every bite is memorable.",
    features: [
      "Multi-cuisine buffet setup",
      "Live food counters & BBQ",
      "Custom wedding menu design",
      "Professional service staff",
      "Crockery & cutlery rental",
      "Dietary & Jain menu options",
    ],
  },
  {
    title: "Birthday & Private Parties",
    image: "https://images.pexels.com/photos/587741/pexels-photo-587741.jpeg",
    description:
      "Make every birthday and private celebration extraordinary. We handle theme planning, décor, entertainment, catering, and every last detail so you can enjoy the moment with your loved ones.",
    features: [
      "Theme concept & decoration",
      "Custom cake & dessert table",
      "Entertainment & DJ",
      "Photo booth setup",
      "Return gift arrangements",
      "Venue booking assistance",
    ],
  },
  {
    title: "Live Entertainment",
    image: "https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg",
    description:
      "Elevate any event with world-class live entertainment. From celebrity performers and live bands to emcees, dancers, and LED shows, we source and manage talent that keeps your audience engaged all night.",
    features: [
      "Celebrity artist bookings",
      "Live band & DJ management",
      "Emcee & anchor services",
      "Dance & cultural performances",
      "LED & laser light shows",
      "Sound & stage management",
    ],
  },
  {
    title: "Destination Events",
    image: "https://images.pexels.com/photos/2373201/pexels-photo-2373201.jpeg",
    description:
      "Take your event beyond borders. We plan and execute stunning destination weddings, corporate retreats, and private celebrations at iconic venues across India and internationally.",
    features: [
      "Destination scouting & booking",
      "Travel & accommodation logistics",
      "Local vendor coordination",
      "Visa & documentation support",
      "On-ground event management",
      "Guest experience planning",
    ],
  },
  {
    title: "Photo & Video Coverage",
    image: "https://images.pexels.com/photos/3379934/pexels-photo-3379934.jpeg",
    description:
      "Preserve your most precious moments with cinematic photography and videography. Our creative team captures the emotion, grandeur, and intimate details of every event in stunning quality.",
    features: [
      "Candid & portrait photography",
      "Cinematic wedding films",
      "Drone aerial shots",
      "Live event streaming",
      "Same-day highlight reels",
      "Album & frame design",
    ],
  },
  {
    title: "Sound, Light & AV",
    image: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg",
    description:
      "Set the perfect atmosphere with professional sound, lighting, and audio-visual production. From intimate setups to large-scale stage productions, we deliver flawless technical execution every time.",
    features: [
      "Professional PA sound systems",
      "Intelligent & LED lighting rigs",
      "LED video walls & screens",
      "Stage & truss setup",
      "Live mixing & technical crew",
      "Generator & power backup",
    ],
  },
];

function Services() {
  const [selectedService, setSelectedService] = useState(null);
  const [minimized, setMinimized] = useState(false);
  const navigate = useNavigate();

  function handleCardClick(service) {
    if (selectedService && selectedService.title === service.title) {
      setSelectedService(null);
      setMinimized(false);
    } else {
      setSelectedService(service);
      setMinimized(false);
      // Scroll to top of page so user sees the detail panel
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  function handleClose() {
    setSelectedService(null);
    setMinimized(false);
  }

  function handleMinimize() {
    setMinimized((prev) => !prev);
  }

  function handleRequestQuote() {
    navigate("/contact", { state: { service: selectedService.title } });
  }

  return (
    <div
      style={{
        backgroundColor: "#f9f9f9",
        minHeight: "100vh",
        paddingTop: "7rem",
        paddingBottom: "5rem",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 24px" }}>

        {/* ── Heading ── */}
        <p style={{ textAlign: "center", textTransform: "uppercase", letterSpacing: "0.15em", fontSize: "13px", color: "#e91e8c", fontWeight: 600, marginBottom: "8px" }}>
          What We Do
        </p>
        <h1 style={{ textAlign: "center", fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 800, color: "#111", marginBottom: "12px" }}>
          Our Services
        </h1>
        <p style={{ textAlign: "center", color: "#999", maxWidth: "480px", margin: "0 auto 56px", fontSize: "15px", lineHeight: 1.7 }}>
          From intimate gatherings to grand celebrations — we bring every vision to life with craftsmanship and care.
        </p>

        {/* ── Detail Panel (appears above grid on click) ── */}
        {selectedService && (
          <div
            style={{
              backgroundColor: "#fff",
              borderRadius: "24px",
              overflow: "hidden",
              border: "1px solid #f0e0f0",
              boxShadow: "0 16px 56px rgba(233,30,140,0.12)",
              marginBottom: "48px",
            }}
          >
            {/* Top bar */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "18px 28px",
                borderBottom: minimized ? "none" : "1px solid #f5e5f5",
                backgroundColor: "#fdf0f9",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <span style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "#e91e8c", display: "inline-block" }} />
                <span style={{ fontWeight: 700, fontSize: "16px", color: "#111" }}>
                  {selectedService.title}
                </span>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                {/* Minimize */}
                <button
                  onClick={handleMinimize}
                  title={minimized ? "Expand" : "Minimize"}
                  style={{ background: "#fff", border: "1.5px solid #e0c0e0", borderRadius: "8px", width: "34px", height: "34px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#e91e8c", transition: "background 0.2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fce8f5")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  {minimized ? "＋" : "－"}
                </button>
                {/* Close */}
                <button
                  onClick={handleClose}
                  title="Close"
                  style={{ background: "#fff", border: "1.5px solid #e0c0e0", borderRadius: "8px", width: "34px", height: "34px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", color: "#e91e8c", transition: "background 0.2s" }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#fce8f5")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#fff")}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Body */}
            {!minimized && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>

                {/* Left: Text */}
                <div style={{ padding: "48px 44px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <span style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.18em", color: "#e91e8c", fontWeight: 700, marginBottom: "14px", display: "block" }}>
                    Service Detail
                  </span>
                  <h2 style={{ fontSize: "clamp(22px, 3vw, 36px)", fontWeight: 800, color: "#111", marginBottom: "16px", lineHeight: 1.2 }}>
                    {selectedService.title}
                  </h2>
                  <p style={{ color: "#777", fontSize: "15px", lineHeight: 1.85, marginBottom: "28px", maxWidth: "400px" }}>
                    {selectedService.description}
                  </p>

                  <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px", display: "flex", flexDirection: "column", gap: "12px" }}>
                    {selectedService.features.map((feature) => (
                      <li key={feature} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#444" }}>
                        <span style={{ width: "22px", height: "22px", borderRadius: "50%", backgroundColor: "#fdf0f7", border: "1.5px solid #e91e8c", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "11px", color: "#e91e8c", fontWeight: 800 }}>
                          ✓
                        </span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <div>
                    <button
                      onClick={handleRequestQuote}
                      style={{ backgroundColor: "#e91e8c", color: "#fff", border: "none", borderRadius: "50px", padding: "14px 28px", fontSize: "14px", fontWeight: 700, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: "8px", boxShadow: "0 4px 16px rgba(233,30,140,0.3)", transition: "background 0.2s ease" }}
                      onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#c4177a")}
                      onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#e91e8c")}
                    >
                      Request a Quote →
                    </button>
                  </div>
                </div>

                {/* Right: Image */}
                <div style={{ position: "relative", minHeight: "460px" }}>
                  <img
                    src={selectedService.image}
                    alt={selectedService.title}
                    style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </div>

              </div>
            )}
          </div>
        )}

        {/* ── Cards Grid ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "24px" }}>
          {services.map((service) => {
            const isActive = selectedService && selectedService.title === service.title;
            return (
              <div
                key={service.title}
                onClick={() => handleCardClick(service)}
                style={{
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  overflow: "hidden",
                  cursor: "pointer",
                  border: isActive ? "2px solid #e91e8c" : "2px solid #f0f0f0",
                  boxShadow: isActive ? "0 8px 30px rgba(233,30,140,0.15)" : "0 2px 12px rgba(0,0,0,0.06)",
                  transform: isActive ? "translateY(-4px)" : "translateY(0)",
                  transition: "all 0.25s ease",
                }}
              >
                <div style={{ height: "200px", overflow: "hidden" }}>
                  <img
                    src={service.image}
                    alt={service.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform 0.4s ease" }}
                    onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
                    onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
                  />
                </div>
                <div style={{ padding: "16px", borderTop: "1px solid #f0f0f0", textAlign: "center" }}>
                  <h3 style={{ fontSize: "16px", fontWeight: 700, color: isActive ? "#e91e8c" : "#222", margin: 0 }}>
                    {service.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Services;