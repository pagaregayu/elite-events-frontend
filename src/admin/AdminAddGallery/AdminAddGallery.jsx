import { useState } from "react";
import "./AdminAddGallery.css";

function AdminAddGallery() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const existing =
      JSON.parse(localStorage.getItem("gallery")) || [];

    const newImage = {
      id: Date.now(),
      title,
      category,
      image,
    };

    localStorage.setItem(
      "gallery",
      JSON.stringify([...existing, newImage])
    );

    alert("Gallery Image Added");

    setTitle("");
    setCategory("");
    setImage("");

    e.target.reset();
  };

  return (
    <div className="admin-form-container">

      <h2>Add Gallery Image</h2>

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >

        <input
          type="text"
          placeholder="Event Title"
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) =>
            setCategory(e.target.value)
          }
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          required
        />

        {image && (
          <img
            src={image}
            alt="Preview"
            width="200"
          />
        )}

        <button type="submit">
          Add Gallery Image
        </button>

      </form>

    </div>
  );
}

export default AdminAddGallery;