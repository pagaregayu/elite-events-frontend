import { useState } from "react";
import API from "../../services/api";

const EVENT_TYPES = ["Wedding", "Corporate", "Concert", "Private Party", "Birthday"];

export default function AdminAddHappyClients() {
  const [form, setForm] = useState({
    clientName: "",
    eventName: "",
    eventType: "Wedding",
    rating: 5,
    review: "",
  });
  const [files, setFiles] = useState([null, null, null, null]);
  const [previews, setPreviews] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function handleInput(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleFile(i, e) {
    const file = e.target.files[0];
    if (!file) return;
    const updated = [...files];
    updated[i] = file;
    setFiles(updated);

    const prev = [...previews];
    prev[i] = URL.createObjectURL(file);
    setPreviews(prev);
  }

  function removeFile(i) {
    const f = [...files]; f[i] = null; setFiles(f);
    const p = [...previews]; p[i] = null; setPreviews(p);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!files[0]) {
      alert("Please upload at least 1 image.");
      return;
    }
    setLoading(true);
    const formData = new FormData();
    formData.append("clientName", form.clientName);
    formData.append("eventName", form.eventName);
    formData.append("eventType", form.eventType);
    formData.append("rating", form.rating);
    formData.append("review", form.review);
    files.forEach((file, i) => {
      if (file) formData.append(`file${i + 1}`, file);
    });

    try {
      await API.post("/happy-clients/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setSuccess(true);
      setForm({ clientName: "", eventName: "", eventType: "Wedding", rating: 5, review: "" });
      setFiles([null, null, null, null]);
      setPreviews([null, null, null, null]);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
      alert("Upload failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      minHeight: "100vh", backgroundColor: "#0a0a0a",
      display: "flex", alignItems: "center", justifyContent: "center",
      padding: "40px 16px", fontFamily: "sans-serif",
    }}>
      <div style={{
        width: "100%", maxWidth: "720px",
        backgroundColor: "#111", borderRadius: "24px",
        border: "1px solid #ffffff10", padding: "40px",
        boxShadow: "0 24px 80px #00000080",
      }}>

        {/* Heading */}
        <div style={{ marginBottom: "36px" }}>
          <p style={{ color: "#e91e8c", fontSize: "11px", letterSpacing: "5px", textTransform: "uppercase", fontWeight: 700, marginBottom: "8px" }}>
            Admin Panel
          </p>
          <h2 style={{ color: "#fff", fontSize: "28px", fontWeight: 900, margin: 0 }}>
            Add Happy Client
          </h2>
          <p style={{ color: "#ffffff30", fontSize: "13px", marginTop: "6px" }}>
            Fill in the details and upload up to 4 event photos.
          </p>
        </div>

        {/* Success banner */}
        {success && (
          <div style={{
            backgroundColor: "#10b98120", border: "1px solid #10b98150",
            borderRadius: "12px", padding: "14px 18px",
            color: "#10b981", fontSize: "14px", fontWeight: 600,
            marginBottom: "24px", display: "flex", alignItems: "center", gap: "10px",
          }}>
            <span style={{ fontSize: "18px" }}>✓</span>
            Happy client added successfully!
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Client Name + Event Name */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            {[
              { label: "Client Name", name: "clientName", placeholder: "e.g. Rahul & Priya Sharma" },
              { label: "Event Name", name: "eventName", placeholder: "e.g. Royal Wedding 2024" },
            ].map((f) => (
              <div key={f.name}>
                <label style={labelStyle}>{f.label}</label>
                <input
                  type="text"
                  name={f.name}
                  value={form[f.name]}
                  onChange={handleInput}
                  placeholder={f.placeholder}
                  required
                  style={inputStyle}
                  onFocus={(e) => (e.target.style.borderColor = "#e91e8c")}
                  onBlur={(e) => (e.target.style.borderColor = "#ffffff15")}
                />
              </div>
            ))}
          </div>

          {/* Event Type + Rating */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
            <div>
              <label style={labelStyle}>Event Type</label>
              <select
                name="eventType"
                value={form.eventType}
                onChange={handleInput}
                style={{ ...inputStyle, cursor: "pointer" }}
              >
                {EVENT_TYPES.map((t) => (
                  <option key={t} value={t} style={{ backgroundColor: "#1a1a1a" }}>{t}</option>
                ))}
              </select>
            </div>
            <div>
              <label style={labelStyle}>Rating — {form.rating} ★</label>
              <input
                type="range" name="rating" min="1" max="5"
                value={form.rating} onChange={handleInput}
                style={{ width: "100%", marginTop: "12px", accentColor: "#e91e8c", cursor: "pointer" }}
              />
              <div style={{ display: "flex", justifyContent: "space-between", marginTop: "4px" }}>
                {[1,2,3,4,5].map((s) => (
                  <span key={s} style={{ fontSize: "16px", color: s <= form.rating ? "#f59e0b" : "#ffffff20" }}>★</span>
                ))}
              </div>
            </div>
          </div>

          {/* Review */}
          <div style={{ marginBottom: "28px" }}>
            <label style={labelStyle}>Client Review</label>
            <textarea
              name="review"
              value={form.review}
              onChange={handleInput}
              placeholder="What did the client say about the event?"
              rows={3}
              style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={(e) => (e.target.style.borderColor = "#e91e8c")}
              onBlur={(e) => (e.target.style.borderColor = "#ffffff15")}
            />
          </div>

          {/* 4 image upload slots */}
          <div style={{ marginBottom: "32px" }}>
            <label style={{ ...labelStyle, marginBottom: "16px", display: "block" }}>
              Event Photos{" "}
              <span style={{ color: "#ffffff30", fontWeight: 400 }}>(upload up to 4 — at least 1 required)</span>
            </label>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "12px" }}>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ position: "relative" }}>
                  {previews[i] ? (
                    <div style={{ position: "relative", borderRadius: "12px", overflow: "hidden", aspectRatio: "1", border: "1px solid #e91e8c60" }}>
                      <img
                        src={previews[i]}
                        alt={`Preview ${i + 1}`}
                        style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                      />
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={() => removeFile(i)}
                        style={{
                          position: "absolute", top: "6px", right: "6px",
                          width: "24px", height: "24px", borderRadius: "50%",
                          backgroundColor: "#00000090", border: "none",
                          color: "#fff", fontSize: "12px", cursor: "pointer",
                          display: "flex", alignItems: "center", justifyContent: "center",
                        }}
                      >
                        ✕
                      </button>
                      {/* Slot number */}
                      <div style={{
                        position: "absolute", bottom: "6px", left: "6px",
                        backgroundColor: "#e91e8c", color: "#fff",
                        fontSize: "9px", fontWeight: 700,
                        padding: "2px 7px", borderRadius: "50px",
                      }}>
                        Photo {i + 1}
                      </div>
                    </div>
                  ) : (
                    <label style={{
                      display: "flex", flexDirection: "column",
                      alignItems: "center", justifyContent: "center",
                      aspectRatio: "1", borderRadius: "12px",
                      border: `2px dashed ${i === 0 ? "#e91e8c60" : "#ffffff15"}`,
                      cursor: "pointer", backgroundColor: "#1a1a1a",
                      transition: "all 0.2s",
                      gap: "6px",
                    }}
                      onMouseOver={(e) => { e.currentTarget.style.borderColor = "#e91e8c"; e.currentTarget.style.backgroundColor = "#e91e8c10"; }}
                      onMouseOut={(e) => { e.currentTarget.style.borderColor = i === 0 ? "#e91e8c60" : "#ffffff15"; e.currentTarget.style.backgroundColor = "#1a1a1a"; }}
                    >
                      <span style={{ fontSize: "24px" }}>📷</span>
                      <span style={{ color: "#ffffff30", fontSize: "11px", fontWeight: 600 }}>
                        {i === 0 ? "Required" : `Photo ${i + 1}`}
                      </span>
                      <input
                        type="file"
                        accept="image/*,video/*"
                        onChange={(e) => handleFile(i, e)}
                        style={{ display: "none" }}
                      />
                    </label>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%", padding: "16px",
              backgroundColor: loading ? "#ffffff20" : "#e91e8c",
              color: loading ? "#ffffff50" : "#fff",
              border: "none", borderRadius: "12px",
              fontSize: "15px", fontWeight: 700,
              cursor: loading ? "not-allowed" : "pointer",
              boxShadow: loading ? "none" : "0 8px 24px #e91e8c50",
              transition: "all 0.25s",
              letterSpacing: "1px",
            }}
            onMouseOver={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#c4177a"; }}
            onMouseOut={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#e91e8c"; }}
          >
            {loading ? "Uploading…" : "Add Happy Client"}
          </button>

        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  display: "block", color: "#ffffff60",
  fontSize: "11px", fontWeight: 700,
  letterSpacing: "2px", textTransform: "uppercase",
  marginBottom: "8px",
};

const inputStyle = {
  width: "100%", backgroundColor: "#1a1a1a",
  border: "1px solid #ffffff15", borderRadius: "10px",
  padding: "12px 16px", color: "#fff",
  fontSize: "14px", outline: "none",
  transition: "border-color 0.2s",
  boxSizing: "border-box",
};