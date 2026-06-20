import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FALLBACK_CLIENTS = [
  {
    id: "c1",
    clientName: "Rahul & Priya Sharma",
    eventName: "Royal Wedding Celebration",
    eventType: "Wedding",
    rating: 5,
    review: "Elite Events made our wedding absolutely magical. Every detail was perfect — from the floral arrangements to the lighting. We couldn't have asked for more!",
    mediaItems: [
      { url: "https://images.unsplash.com/photo-1519741497674-611481863552?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=600", type: "image" },
    ],
  },
  {
    id: "c2",
    clientName: "Tata Consultancy Services",
    eventName: "Annual Corporate Summit 2024",
    eventType: "Corporate",
    rating: 5,
    review: "The team handled our 500-person conference flawlessly. The AV setup, stage design, and hospitality were all world-class. Highly recommended!",
    mediaItems: [
      { url: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=600", type: "image" },
      { url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=600", type: "image" },
    ],
  },
];

const EVENT_COLORS = {
  Wedding: "#e91e8c",
  Corporate: "#3b82f6",
  Concert: "#a855f7",
  "Private Party": "#f59e0b",
  Birthday: "#10b981",
};

function StarRating({ rating }) {
  return (
    <div style={{ display: "flex", gap: "3px" }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= rating ? "#f59e0b" : "#ffffff20", fontSize: "14px" }}>★</span>
      ))}
    </div>
  );
}

// Helper function to transform backend data to frontend format
function transformBackendClient(backendClient) {
  const mediaItems = [];
  for (let i = 1; i <= 4; i++) {
    const url = backendClient[`mediaUrl${i}`];
    const type = backendClient[`mediaType${i}`];
    if (url && url.trim() !== "") {
      mediaItems.push({ url, type: type || "image" });
    }
  }
  return {
    ...backendClient,
    mediaItems: mediaItems.length > 0 ? mediaItems : null,
  };
}

// Media renderer component (handles both images and videos)
function MediaRenderer({ mediaItem, isActive }) {
  const isVideo = mediaItem.type === "video" || 
                  (mediaItem.url && (mediaItem.url.includes(".mp4") || 
                   mediaItem.url.includes(".webm") || 
                   mediaItem.url.includes(".mov")));
  
  if (isVideo) {
    return (
      <video
        src={mediaItem.url}
        style={{
          width: "100%",
          height: "100%",
          objectFit: "cover",
          display: "block",
          transform: isActive ? "scale(1.08)" : "scale(1)",
          transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
          filter: isActive ? "brightness(1)" : "brightness(0.75)",
        }}
        autoPlay={isActive}
        loop
        muted
        playsInline
      />
    );
  }
  
  return (
    <img
      src={mediaItem.url}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        display: "block",
        transform: isActive ? "scale(1.08)" : "scale(1)",
        transition: "transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        filter: isActive ? "brightness(1)" : "brightness(0.75)",
      }}
      alt="Event media"
    />
  );
}

function ClientCard({ client, onDelete, isFallback, index }) {
  const [activeImg, setActiveImg] = useState(0);
  const [hovered, setHovered] = useState(false);
  const accent = EVENT_COLORS[client.eventType] || "#e91e8c";

  // Get media items - either from mediaItems array or transform from old format
  let mediaItems = client.mediaItems;
  if (!mediaItems && client.mediaUrls) {
    mediaItems = client.mediaUrls.map(url => ({ url, type: "image" }));
  }
  
  // If no media items, create empty array for fallback
  if (!mediaItems) {
    mediaItems = [];
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        backgroundColor: "#111111",
        borderRadius: "20px",
        overflow: "hidden",
        border: hovered ? `1px solid ${accent}60` : "1px solid #ffffff10",
        boxShadow: hovered ? `0 16px 48px ${accent}25` : "0 4px 24px #00000050",
        transition: "all 0.35s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
      }}
    >
      {/* ── 4-image grid ── */}
      <div style={{ position: "relative" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gridTemplateRows: "1fr",
          height: "180px",
          gap: "2px",
        }}>
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              onClick={() => i < mediaItems.length && setActiveImg(i)}
              style={{
                overflow: "hidden",
                cursor: i < mediaItems.length ? "pointer" : "default",
                position: "relative",
                backgroundColor: "#1a1a1a",
              }}
            >
              {i < mediaItems.length ? (
                <MediaRenderer mediaItem={mediaItems[i]} isActive={activeImg === i} />
              ) : (
                <div style={{ 
                  width: "100%", 
                  height: "100%", 
                  backgroundColor: "#1a1a1a", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center" 
                }}>
                  <span style={{ color: "#ffffff20", fontSize: "24px" }}>📷</span>
                </div>
              )}
              {/* active indicator dot */}
              {activeImg === i && i < mediaItems.length && (
                <motion.div
                  layoutId={"dot-" + client.id}
                  style={{
                    position: "absolute", bottom: "6px", right: "6px",
                    width: "8px", height: "8px", borderRadius: "50%",
                    backgroundColor: accent,
                    boxShadow: `0 0 8px ${accent}`,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Event type badge */}
        <div style={{
          position: "absolute", top: "12px", left: "12px",
          backgroundColor: accent,
          color: "#fff", fontSize: "10px", fontWeight: 700,
          padding: "4px 12px", borderRadius: "50px",
          letterSpacing: "2px", textTransform: "uppercase",
          boxShadow: `0 2px 12px ${accent}80`,
          zIndex: 10,
        }}>
          {client.eventType || "Event"}
        </div>
      </div>

      {/* ── Info section ── */}
      <div style={{ padding: "20px 22px 22px" }}>

        {/* Rating */}
        <div style={{ marginBottom: "10px" }}>
          <StarRating rating={client.rating || 5} />
        </div>

        {/* Event name */}
        <h3 style={{
          color: "#fff", fontSize: "17px", fontWeight: 800,
          margin: "0 0 6px", lineHeight: 1.3,
        }}>
          {client.eventName}
        </h3>

        {/* Client name */}
        <p style={{
          color: accent, fontSize: "12px", fontWeight: 600,
          letterSpacing: "1px", textTransform: "uppercase",
          margin: "0 0 12px",
        }}>
          — {client.clientName}
        </p>

        {/* Review */}
        {client.review && (
          <p style={{
            color: "#ffffff50", fontSize: "13px", lineHeight: 1.75,
            margin: "0 0 18px",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}>
            "{client.review}"
          </p>
        )}

        {/* Image selector dots */}
        {mediaItems.length > 0 && (
          <div style={{ display: "flex", gap: "6px", marginBottom: isFallback ? "0" : "16px" }}>
            {mediaItems.slice(0, 4).map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  width: activeImg === i ? "20px" : "8px",
                  height: "8px",
                  borderRadius: "50px",
                  backgroundColor: activeImg === i ? accent : "#ffffff25",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s ease",
                }}
              />
            ))}
          </div>
        )}

        {/* Delete button — only for backend items */}
        {!isFallback && (
          <button
            onClick={() => onDelete(client.id)}
            style={{
              backgroundColor: "#ff000020",
              border: "1px solid #ff000050",
              color: "#ff6b6b",
              fontSize: "11px",
              fontWeight: 600,
              padding: "6px 16px",
              borderRadius: "50px",
              cursor: "pointer",
              transition: "all 0.2s",
              width: "100%",
            }}
            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = "#ff000040"; }}
            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = "#ff000020"; }}
          >
            Delete
          </button>
        )}
      </div>
    </motion.div>
  );
}

export default function HappyClient() {
  const [clients, setClients] = useState(FALLBACK_CLIENTS);

  useEffect(() => {
    fetchClients();
  }, []);

  async function fetchClients() {
    try {
      const API = (await import("../../services/api")).default;
      const response = await API.get("/happy-clients");
      if (response.data && response.data.length > 0) {
        // Transform backend data to frontend format
        const transformedClients = response.data.map(transformBackendClient);
        setClients([...FALLBACK_CLIENTS, ...transformedClients]);
      }
    } catch (error) {
      console.error("Failed to fetch clients:", error);
      // Backend offline — fallback clients already showing
    }
  }

  async function handleDelete(id) {
    try {
      const API = (await import("../../services/api")).default;
      await API.delete(`/happy-clients/${id}`);
      setClients((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  }

  return (
    <div style={{ backgroundColor: "#0a0a0a", minHeight: "100vh", paddingTop: "6rem", paddingBottom: "5rem", fontFamily: "sans-serif" }}>

      {/* ── Heading ── */}
      <div style={{ textAlign: "center", marginBottom: "60px", padding: "0 24px" }}>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{ color: "#e91e8c", fontSize: "12px", letterSpacing: "6px", textTransform: "uppercase", fontWeight: 700, marginBottom: "12px" }}
        >
          Testimonials
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 900, color: "#fff", lineHeight: 1, marginBottom: "20px" }}
        >
          Happy{" "}
          <span style={{ WebkitTextStroke: "2px #e91e8c", color: "transparent", fontStyle: "italic" }}>
            Clients
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ color: "#ffffff40", fontSize: "15px", maxWidth: "420px", margin: "0 auto", lineHeight: 1.8 }}
        >
          Real stories from real people — events crafted with love, precision, and passion.
        </motion.p>
      </div>

      {/* ── Grid ── */}
      <div style={{ maxWidth: "1300px", margin: "0 auto", padding: "0 24px" }}>
        <AnimatePresence>
          {clients.length > 0 ? (
            <motion.div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "24px",
              }}
            >
              {clients.map((client, i) => (
                <ClientCard
                  key={client.id}
                  client={client}
                  index={i}
                  isFallback={String(client.id).startsWith("c")}
                  onDelete={handleDelete}
                />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              style={{ textAlign: "center", padding: "80px 0", color: "#ffffff20" }}
            >
              <div style={{ fontSize: "56px", marginBottom: "16px" }}>🎉</div>
              <p style={{ fontSize: "16px" }}>No happy clients added yet.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}