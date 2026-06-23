import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ── Fallback images shown when backend is not connected ──
const FALLBACK_IMAGES = [
  {
    id: "f1",
    title: "Royal Wedding Night",
    category: "Wedding",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
  },
  {
    id: "f2",
    title: "Corporate Summit 2024",
    category: "Corporate",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
  },
  {
    id: "f3",
    title: "Grand Concert Live",
    category: "Concert",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800",
  },
  {
    id: "f4",
    title: "Luxury Birthday Bash",
    category: "Private Party",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800",
  },
  {
    id: "f5",
    title: "Destination Wedding",
    category: "Wedding",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=800",
  },
  {
    id: "f6",
    title: "Product Launch Event",
    category: "Corporate",
    mediaType: "image",
    mediaUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800",
  },
];

const CATEGORIES = ["All", "Wedding", "Corporate", "Concert", "Private Party"];

const categoryColors = {
  Wedding: "#e91e8c",
  Corporate: "#3b82f6",
  Concert: "#a855f7",
  "Private Party": "#f59e0b",
  Concert: "#10b981",
};

export default function Gallery() {
  const [images, setImages] = useState(FALLBACK_IMAGES);
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightbox, setLightbox] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);
  const isAdmin = localStorage.getItem("adminLoggedIn") === "true";

  useEffect(() => {
    fetchGallery();
  }, []);

  async function fetchGallery() {
    try {
      const API = (await import("../../services/api")).default;
      const response = await API.get("/gallery");
      if (response.data && response.data.length > 0) {
        setImages([...FALLBACK_IMAGES, ...response.data]);
      }
    } catch {
      // Backend not connected — fallback images already showing
    }
  }

  async function handleDelete(id) {
    // Don't delete fallback items
    if (String(id).startsWith("f")) return;
    try {
      const API = (await import("../../services/api")).default;
      await API.delete(`/gallery/${id}`);
      setImages((prev) => prev.filter((img) => img.id !== id));
    } catch (err) {
      console.error(err);
    }
  }

  const filtered =
    activeCategory === "All"
      ? images
      : images.filter((img) => img.category === activeCategory);

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "5rem", fontFamily: "sans-serif" }}>

      {/* ── Hero heading ── */}
      <div style={{ textAlign: "center", marginBottom: "56px", padding: "0 24px" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ color: "#e91e8c", fontSize: "12px", letterSpacing: "6px", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}
        >
          Our Work
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "20px" }}
        >
          Event{" "}
          <span style={{ WebkitTextStroke: "2px #e91e8c", color: "transparent", fontStyle: "italic" }}>
            Gallery
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: "#ffffff55", fontSize: "15px", maxWidth: "420px", margin: "0 auto", lineHeight: 1.8 }}
        >
          A glimpse into the world-class events we've crafted with passion and precision.
        </motion.p>
      </div>

      {/* ── Category filter tabs ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: "10px", marginBottom: "48px", padding: "0 24px" }}
      >
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "9px 22px",
              borderRadius: "50px",
              border: activeCategory === cat ? "none" : "1px solid #ffffff20",
              backgroundColor: activeCategory === cat ? "#e91e8c" : "transparent",
              color: activeCategory === cat ? "#fff" : "#ffffff60",
              fontSize: "13px",
              fontWeight: 600,
              cursor: "pointer",
              letterSpacing: "1px",
              transition: "all 0.25s ease",
              boxShadow: activeCategory === cat ? "0 4px 20px #e91e8c55" : "none",
            }}
            onMouseOver={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = "#fff"; }}
            onMouseOut={(e) => { if (activeCategory !== cat) e.currentTarget.style.color = "#ffffff60"; }}
          >
            {cat}
          </button>
        ))}
      </motion.div>

      {/* ── Masonry-style grid ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 24px" }}>
        <motion.div
          layout
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: "20px",
          }}
        >
          <AnimatePresence>
            {filtered.map((item, i) => {
              const isFallback = String(item.id).startsWith("f");
              const accentColor = categoryColors[item.category] || "#e91e8c";
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.85, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.85, y: -20 }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  onMouseEnter={() => setHoveredId(item.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  style={{
                    position: "relative",
                    borderRadius: "16px",
                    overflow: "hidden",
                    cursor: "pointer",
                    border: hoveredId === item.id ? `1px solid ${accentColor}80` : "1px solid #ffffff10",
                    boxShadow: hoveredId === item.id ? `0 8px 40px ${accentColor}30` : "0 4px 20px #00000060",
                    transition: "border 0.3s, box-shadow 0.3s",
                    aspectRatio: "4/3",
                  }}
                  onClick={() => setLightbox(item)}
                >
                  {/* Media */}
                  {item.mediaType?.startsWith("video") ? (
                    <video
                      src={item.mediaUrl}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                    />
                  ) : (
                    <img
                      src={item.mediaUrl}
                      alt={item.title}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transform: hoveredId === item.id ? "scale(1.08)" : "scale(1)",
                        transition: "transform 0.6s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    />
                  )}

                  {/* Gradient overlay */}
                  <div style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, #000000ee 0%, #00000060 40%, transparent 70%)",
                    opacity: hoveredId === item.id ? 1 : 0.7,
                    transition: "opacity 0.3s",
                  }} />

                  {/* Category badge */}
                  <div style={{
                    position: "absolute", top: "14px", left: "14px",
                    backgroundColor: accentColor,
                    color: "#fff", fontSize: "10px", fontWeight: 700,
                    padding: "4px 12px", borderRadius: "50px",
                    letterSpacing: "2px", textTransform: "uppercase",
                    boxShadow: `0 2px 12px ${accentColor}80`,
                  }}>
                    {item.category}
                  </div>

                  {/* Expand icon */}
                  <motion.div
                    animate={{ opacity: hoveredId === item.id ? 1 : 0, scale: hoveredId === item.id ? 1 : 0.7 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      position: "absolute", top: "14px", right: "14px",
                      width: "36px", height: "36px", borderRadius: "50%",
                      backgroundColor: "#ffffff20", backdropFilter: "blur(8px)",
                      border: "1px solid #ffffff30",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "#fff", fontSize: "16px",
                    }}
                  >
                    ⤢
                  </motion.div>

                  {/* Info bar */}
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "20px 16px 16px",
                    transform: hoveredId === item.id ? "translateY(0)" : "translateY(6px)",
                    transition: "transform 0.3s ease",
                  }}>
                    <h3 style={{ color: "#fff", fontSize: "15px", fontWeight: 700, margin: "0 0 8px", lineHeight: 1.2 }}>
                      {item.title}
                    </h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <span style={{ color: "#ffffff60", fontSize: "12px" }}>{item.category}</span>
                      {isAdmin && !isFallback && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(item.id);
                          }}
                          style={{
                            backgroundColor: "#ff000030",
                            border: "1px solid #ff000060",
                            color: "#ff6b6b",
                            fontSize: "11px",
                            fontWeight: 600,
                            padding: "4px 12px",
                            borderRadius: "50px",
                            cursor: "pointer",
                            transition: "all 0.2s",
                          }}
                          onMouseOver={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff000060";
                          }}
                          onMouseOut={(e) => {
                            e.currentTarget.style.backgroundColor = "#ff000030";
                          }}
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ textAlign: "center", padding: "80px 0", color: "#ffffff30" }}
          >
            <div style={{ fontSize: "48px", marginBottom: "16px" }}>📷</div>
            <p style={{ fontSize: "16px" }}>No images in this category yet.</p>
          </motion.div>
        )}
      </div>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              backgroundColor: "#000000e0",
              backdropFilter: "blur(16px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "24px",
            }}
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
              style={{
                backgroundColor: "#111",
                borderRadius: "20px",
                overflow: "hidden",
                maxWidth: "900px",
                width: "100%",
                border: "1px solid #ffffff15",
                boxShadow: "0 40px 120px #00000099",
              }}
            >
              {/* Image */}
              <div style={{ position: "relative", maxHeight: "70vh", overflow: "hidden" }}>
                {lightbox.mediaType?.startsWith("video") ? (
                  <video controls src={lightbox.mediaUrl} style={{ width: "100%", maxHeight: "70vh", objectFit: "contain", backgroundColor: "#000" }} />
                ) : (
                  <img src={lightbox.mediaUrl} alt={lightbox.title} style={{ width: "100%", maxHeight: "70vh", objectFit: "cover", display: "block" }} />
                )}
                <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, #111 0%, transparent 50%)" }} />
              </div>

              {/* Info */}
              <div style={{ padding: "20px 24px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div>
                  <span style={{ color: categoryColors[lightbox.category] || "#e91e8c", fontSize: "10px", fontWeight: 700, letterSpacing: "3px", textTransform: "uppercase" }}>
                    {lightbox.category}
                  </span>
                  <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 800, margin: "6px 0 0" }}>{lightbox.title}</h2>
                </div>
                <button
                  onClick={() => setLightbox(null)}
                  style={{
                    width: "40px", height: "40px", borderRadius: "50%",
                    backgroundColor: "#ffffff15", border: "1px solid #ffffff20",
                    color: "#fff", fontSize: "18px", cursor: "pointer",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
