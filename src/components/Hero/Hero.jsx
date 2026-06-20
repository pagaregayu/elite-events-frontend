import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaArrowRight, FaPlay } from "react-icons/fa";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1519741497674-611481863552?w=1920",
    tag: "Wedding Celebrations",
    line1: "Crafting",
    line2: "Timeless",
    line3: "Weddings",
    accent: "#f59e0b",
  },
  {
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=1920",
    tag: "Corporate Events",
    line1: "Elevating",
    line2: "Corporate",
    line3: "Experiences",
    accent: "#e91e8c",
  },
  {
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1920",
    tag: "Live Concerts",
    line1: "Creating",
    line2: "Unforgettable",
    line3: "Moments",
    accent: "#a855f7",
  },
  {
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=1920",
    tag: "Luxury Parties",
    line1: "Where Dreams",
    line2: "Become",
    line3: "Reality",
    accent: "#10b981",
  },
];

const stats = [
  { number: "2500+", label: "Events Managed" },
  { number: "1500+", label: "Happy Clients" },
  { number: "4.9★", label: "Client Rating" },
  { number: "15+", label: "Years Experience" },
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const [animKey, setAnimKey] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef(null);

  const slide = slides[index];

  useEffect(() => {
    const t = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
      setAnimKey((prev) => prev + 1);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  function goTo(i) {
    setIndex(i);
    setAnimKey((prev) => prev + 1);
  }

  function handleMouseMove(e) {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 20;
    setMousePos({ x, y });
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative w-full h-screen overflow-hidden bg-black"
    >

      {/* ── Parallax background ── */}
      <AnimatePresence>
        <motion.div
          key={"bg-" + index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{
            opacity: 1,
            scale: 1,
            x: mousePos.x * 0.5,
            y: mousePos.y * 0.5,
          }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ opacity: { duration: 1.5 }, scale: { duration: 1.5 }, x: { duration: 0.1 }, y: { duration: 0.1 } }}
          className="absolute inset-[-3%] will-change-transform"
        >
          <img src={slide.image} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </AnimatePresence>

      {/* ── Layered overlays ── */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-transparent pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent pointer-events-none" />

      {/* ── Dynamic accent glow ── */}
      <motion.div
        key={"glow-" + index}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-0 left-0 w-[600px] h-[400px] pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 0% 100%, ${slide.accent}22 0%, transparent 70%)`,
        }}
      />

      {/* ── Floating orbs ── */}
      <motion.div
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${slide.accent}15 0%, transparent 70%)`, filter: "blur(40px)" }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-1/2 right-1/3 w-48 h-48 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, ${slide.accent}10 0%, transparent 70%)`, filter: "blur(60px)" }}
      />

      {/* ── Progress bar ── */}
      <div className="absolute top-0 left-0 right-0 z-30 h-[2px] bg-white/10">
        <motion.div
          key={"prog-" + animKey}
          className="h-full origin-left"
          style={{ backgroundColor: slide.accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 6, ease: "linear" }}
        />
      </div>

      {/* ── Vertical brand text ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="hidden lg:block absolute left-6 top-1/2 z-20 text-white/20 text-[9px] tracking-[14px] font-light select-none uppercase"
        style={{ writingMode: "vertical-rl", transform: "rotate(180deg) translateY(50%)" }}
      >
        Elite Events Management
      </motion.div>

      {/* ── Slide counter ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-28 right-8 z-20 flex flex-col items-end select-none"
      >
        <motion.span
          key={"num-" + index}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-4xl font-black leading-none"
          style={{ color: slide.accent }}
        >
          {String(index + 1).padStart(2, "0")}
        </motion.span>
        <span className="text-white/20 text-xs font-mono mt-1">
          / {String(slides.length).padStart(2, "0")}
        </span>
      </motion.div>

      {/* ── Social icons ── */}
      <div className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3">
        {[
          { icon: <FaInstagram />, href: "https://instagram.com" },
          { icon: <FaFacebookF />, href: "https://facebook.com" },
          { icon: <FaLinkedinIn />, href: "https://linkedin.com" },
        ].map((s, i) => (
          <motion.a
            key={i}
            href={s.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2 + i * 0.15, type: "spring", stiffness: 150 }}
            whileHover={{ scale: 1.2, backgroundColor: slide.accent }}
            className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white text-sm transition-colors duration-300"
          >
            {s.icon}
          </motion.a>
        ))}
      </div>

      {/* ── Main content ── */}
      <div className="relative z-20 h-full flex items-end">
        <div className="w-full max-w-7xl mx-auto px-8 lg:px-16 pb-28">

          {/* Tag */}
          <AnimatePresence mode="wait">
            <motion.div
              key={"tag-" + animKey}
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 40 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="h-[2px] w-10 origin-left"
                style={{ backgroundColor: slide.accent }}
              />
              <span className="text-xs font-bold tracking-[5px] uppercase" style={{ color: slide.accent }}>
                {slide.tag}
              </span>
            </motion.div>
          </AnimatePresence>

          {/* Heading */}
          <AnimatePresence mode="wait">
            <motion.div key={"heading-" + animKey} className="mb-8">
              {[slide.line1, slide.line2, slide.line3].map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.h1
                    initial={{ y: 100, opacity: 0, skewY: 3 }}
                    animate={{ y: 0, opacity: 1, skewY: 0 }}
                    exit={{ y: -60, opacity: 0 }}
                    transition={{ duration: 0.8, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className={`font-black leading-[0.9] text-6xl md:text-8xl lg:text-9xl tracking-tight ${
                      i === 1 ? "italic" : ""
                    }`}
                    style={
                      i === 1
                        ? {
                            WebkitTextStroke: `2px ${slide.accent}`,
                            color: "transparent",
                          }
                        : { color: "#ffffff" }
                    }
                  >
                    {line}
                  </motion.h1>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Description + CTA row */}
          <div className="flex flex-col lg:flex-row lg:items-end gap-10 mb-14">

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="max-w-sm"
            >
              <p className="text-white/50 text-sm leading-relaxed">
                World-class weddings, destination celebrations, corporate conferences,
                and unforgettable experiences — crafted with perfection across India and beyond.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/contact"
                style={{ textDecoration: "none" }}
              >
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 text-black px-8 py-4 rounded-full font-bold text-sm tracking-wide cursor-pointer"
                  style={{ backgroundColor: slide.accent, boxShadow: `0 8px 32px ${slide.accent}55` }}
                >
                  Request a Quote
                  <span className="w-6 h-6 rounded-full bg-black/20 flex items-center justify-center group-hover:translate-x-1 transition-transform duration-300">
                    <FaArrowRight className="text-xs" />
                  </span>
                </motion.div>
              </Link>

              <Link to="/services" style={{ textDecoration: "none" }}>
                <motion.div
                  whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,1)", color: "#000" }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-full font-bold text-sm tracking-wide cursor-pointer transition-colors duration-300"
                >
                  <span className="w-6 h-6 rounded-full border border-white/40 flex items-center justify-center">
                    <FaPlay className="text-[8px] ml-0.5" />
                  </span>
                  Explore Services
                </motion.div>
              </Link>
            </motion.div>

          </div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-wrap gap-px"
          >
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className={`flex flex-col pr-10 cursor-default ${i !== 0 ? "pl-10 border-l border-white/10" : ""}`}
              >
                <span className="text-2xl md:text-3xl font-extrabold text-white leading-none">
                  {s.number}
                </span>
                <span className="text-white/30 text-[10px] mt-1 tracking-widest uppercase">
                  {s.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

        </div>
      </div>

      {/* ── Slide thumbnails / dots ── */}
      <div className="absolute bottom-10 right-8 lg:right-16 z-30 flex flex-col gap-3">
        {slides.map((sl, i) => (
          <motion.button
            key={i}
            onClick={() => goTo(i)}
            whileHover={{ scale: 1.1 }}
            className={`relative overflow-hidden rounded-lg transition-all duration-500 ${
              i === index ? "w-12 h-16 ring-2" : "w-10 h-12 opacity-40 hover:opacity-70"
            }`}
            style={i === index ? { ringColor: slide.accent } : {}}
          >
            <img src={sl.image} alt="" className="w-full h-full object-cover" />
            {i === index && (
              <motion.div
                className="absolute inset-0"
                style={{ backgroundColor: slide.accent + "30" }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* ── Scroll indicator ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/30 text-[9px] tracking-[4px] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>

      {/* ── WhatsApp ── */}
      <motion.a
        href="https://wa.me/919356226842"
        target="_blank"
        rel="noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 bg-green-500 text-white rounded-full text-2xl shadow-2xl shadow-green-500/40 hover:bg-green-400 transition-colors duration-300"
      >
        <FaWhatsapp />
      </motion.a>

    </section>
  );
}