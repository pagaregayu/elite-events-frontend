import { useEffect, useState } from "react";
import "./Gallery.css";

function Gallery() {
  const isAdmin =
    localStorage.getItem("adminToken") === "true";

  const defaultImages = [
    {
      id: "default1",
      title: "Royal Wedding",
      category: "Wedding",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800",
    },
    {
      id: "default2",
      title: "Corporate Event",
      category: "Corporate",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800",
    },
    {
      id: "default3",
      title: "Birthday Celebration",
      category: "Birthday",
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800",
    },
    {
      id: "default4",
      title: "Engagement Ceremony",
      category: "Engagement",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800",
    },
  ];

  const [galleryImages, setGalleryImages] = useState([]);

  useEffect(() => {
    const uploaded =
      JSON.parse(localStorage.getItem("gallery")) || [];

    setGalleryImages([
      ...defaultImages,
      ...uploaded,
    ]);
  }, []);

  const handleDelete = (id) => {
    const uploaded =
      JSON.parse(localStorage.getItem("gallery")) || [];

    const updated = uploaded.filter(
      (item) => item.id !== id
    );

    localStorage.setItem(
      "gallery",
      JSON.stringify(updated)
    );

    setGalleryImages([
      ...defaultImages,
      ...updated,
    ]);
  };

  return (
    <div className="gallery-page">

      <h1>Event Gallery</h1>

      <div className="gallery-grid">

        {galleryImages.map((item) => (
          <div
            className="gallery-card"
            key={item.id}
          >

            <img
              src={item.image}
              alt={item.title}
            />

            <div className="gallery-info">
              <h3>{item.title}</h3>
              <p>{item.category}</p>

              {isAdmin &&
                !String(item.id).startsWith("default") && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(item.id)
                    }
                  >
                    Delete
                  </button>
                )}
            </div>

          </div>
        ))}

      </div>

    </div>
  );
}

export default Gallery;