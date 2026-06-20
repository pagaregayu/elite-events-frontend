import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import API from "../../services/api";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaWhatsapp,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaSpinner,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    eventType: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.phone || !form.message) {
      alert("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      await API.post("/messages", {
        name: form.name,
        email: form.email,
        phone: form.phone,
        eventType: form.eventType,
        message: form.message,
      });

      setShowSuccess(true);
      setForm({
        name: "",
        email: "",
        phone: "",
        eventType: "",
        message: "",
      });

      setTimeout(() => setShowSuccess(false), 4000);
    } catch (error) {
      console.error(error);
      alert("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
    hover: { y: -10, transition: { type: "spring", stiffness: 300 } },
  };

  const formVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const infoVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
  };

  const contactCards = [
    { icon: FaPhoneAlt, title: "Call Us", detail: "+91 9356226842", link: "tel:+919356226842", color: "from-green-500 to-emerald-500" },
    { icon: FaEnvelope, title: "Email", detail: "pagaregayatri6@gmail.com", link: "mailto:pagaregayatri6@gmail.com", color: "from-blue-500 to-cyan-500" },
    { icon: FaWhatsapp, title: "WhatsApp", detail: "Chat Now", link: "https://wa.me/919356226842", color: "from-green-400 to-teal-500" },
    { icon: FaMapMarkerAlt, title: "Visit Office", detail: "Karavenagar, Pune, Maharashtra, 411052", link: null, color: "from-red-500 to-orange-500" },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 py-20 overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full blur-3xl opacity-10 animate-pulse delay-700"></div>
        
        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [null, -100, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 5 + 3,
              repeat: Infinity,
              delay: Math.random() * 5,
            }}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-4"
          >
            <div className="bg-gradient-to-r from-pink-500 to-purple-500 rounded-full p-3">
              <FaPaperPlane className="text-white text-2xl" />
            </div>
          </motion.div>
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 bg-clip-text text-transparent mb-4">
            Contact Elite Events
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-pink-500 to-purple-500 mx-auto rounded-full"></div>
          <p className="text-gray-300 mt-4 max-w-2xl mx-auto">
            Let's bring your vision to life. Reach out to us for any inquiries or to start planning your perfect event.
          </p>
        </motion.div>

        {/* Contact Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        >
          {contactCards.map((card, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              className="group"
            >
              <div className="relative">
                <div className="absolute -inset-0.5 bg-gradient-to-r rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"
                  style={{ backgroundImage: `linear-gradient(to right, ${card.color.split(' ')[1]}, ${card.color.split(' ')[3]})` }}></div>
                <div className="relative bg-white/10 backdrop-blur-md rounded-2xl p-6 text-center border border-white/20 hover:border-transparent transition-all duration-300">
                  <div className={`inline-block p-3 bg-gradient-to-r ${card.color} rounded-xl mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <card.icon className="text-white text-2xl" />
                  </div>
                  <h5 className="text-white font-semibold text-lg mb-2">{card.title}</h5>
                  {card.link ? (
                    <a
                      href={card.link}
                      target={card.link.startsWith("http") ? "_blank" : "_self"}
                      rel="noreferrer"
                      className="text-gray-300 hover:text-white transition-colors inline-block"
                    >
                      {card.detail}
                    </a>
                  ) : (
                    <p className="text-gray-300">{card.detail}</p>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Form and Office Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <motion.div
            variants={formVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center">
                  <FaPaperPlane className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Send Message</h3>
              </div>

              {/* Success Message */}
              <AnimatePresence>
                {showSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: -20, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -20, scale: 0.9 }}
                    className="mb-4 p-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl shadow-lg"
                  >
                    <div className="flex items-center gap-2">
                      <FaCheckCircle className="text-white" />
                      <p className="text-white font-semibold">Message Sent Successfully!</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                      focusedField === "name" ? "border-pink-500 ring-2 ring-pink-500/50" : "border-white/20"
                    }`}
                    placeholder="Full Name *"
                    value={form.name}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="email"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                      focusedField === "email" ? "border-pink-500 ring-2 ring-pink-500/50" : "border-white/20"
                    }`}
                    placeholder="Email *"
                    value={form.email}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <input
                    type="text"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 ${
                      focusedField === "phone" ? "border-pink-500 ring-2 ring-pink-500/50" : "border-white/20"
                    }`}
                    placeholder="Phone Number *"
                    value={form.phone}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    required
                  />
                </div>

                <div className="relative">
                  <select
                    className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white focus:outline-none focus:border-pink-500 focus:ring-2 focus:ring-pink-500/50 transition-all duration-300 cursor-pointer"
                    value={form.eventType}
                    onChange={(e) => setForm({ ...form, eventType: e.target.value })}
                  >
                    <option value="" className="bg-gray-800">Select Event Type</option>
                    <option value="Wedding" className="bg-gray-800">Wedding</option>
                    <option value="Corporate" className="bg-gray-800">Corporate</option>
                    <option value="Conference" className="bg-gray-800">Conference</option>
                    <option value="Birthday" className="bg-gray-800">Birthday</option>
                    <option value="Private Party" className="bg-gray-800">Private Party</option>
                  </select>
                </div>

                <div className="relative">
                  <textarea
                    rows="5"
                    className={`w-full px-4 py-3 bg-white/5 border rounded-xl text-white placeholder-white/40 focus:outline-none transition-all duration-300 resize-none ${
                      focusedField === "message" ? "border-pink-500 ring-2 ring-pink-500/50" : "border-white/20"
                    }`}
                    placeholder="Your Message *"
                    value={form.message}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl text-white font-bold shadow-lg hover:shadow-pink-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1 }}
                      className="inline-block"
                    >
                      <FaSpinner className="inline-block mr-2" />
                    </motion.div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>

          {/* Office Information */}
          <motion.div
            variants={infoVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                  <FaMapMarkerAlt className="text-white" />
                </div>
                <h3 className="text-2xl font-bold text-white">Office Information</h3>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-pink-400 mt-1" />
                  <div>
                    <p className="text-white font-semibold">Elite Events Headquarters</p>
                    <p className="text-gray-300">Karavenagar, Pune, Maharashtra, 411052</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaClock className="text-pink-400" />
                  <div>
                    <p className="text-white font-semibold">Business Hours</p>
                    <p className="text-gray-300">Mon - Sat : 9 AM - 7 PM</p>
                    <p className="text-gray-300">Sunday : Closed</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <FaCalendarAlt className="text-pink-400" />
                  <div>
                    <p className="text-white font-semibold">Available for Events</p>
                    <p className="text-gray-300">24/7 for event inquiries</p>
                  </div>
                </div>
              </div>

              {/* Map */}
              <div className="mb-6 rounded-xl overflow-hidden border border-white/20">
                <iframe
                  title="Karvenagar Location"
                  src="https://www.google.com/maps?q=Karvenagar,Pune,Maharashtra&output=embed"
                  width="100%"
                  height="250"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="hover:scale-105 transition-transform duration-500"
                ></iframe>
              </div>

              {/* Social Media */}
              <div className="text-center">
                <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                <div className="flex justify-center gap-4">
                  <motion.a
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://www.instagram.com/gayuu_p_2002"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center hover:shadow-lg hover:shadow-pink-500/50 transition-all"
                  >
                    <FaInstagram className="text-white text-xl" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Contact;