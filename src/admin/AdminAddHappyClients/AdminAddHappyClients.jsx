import { useState } from "react";
import "./AdminAddHappyClients.css";

function AdminAddHappyClients() {

  const [eventName, setEventName] = useState("");
  const [clientName, setClientName] = useState("");
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

    const clients =
      JSON.parse(
        localStorage.getItem("happyClients")
      ) || [];

    const newClient = {
      id: Date.now(),
      eventName,
      clientName,
      image
    };

    clients.push(newClient);

    localStorage.setItem(
      "happyClients",
      JSON.stringify(clients)
    );

    alert("Happy Client Added Successfully");

    setEventName("");
    setClientName("");
    setImage("");

    e.target.reset();
  };

  return (
    <div className="admin-form-container">

      <h2>Add Happy Client</h2>

      <form
        onSubmit={handleSubmit}
        className="admin-form"
      >

        <input
          type="text"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) =>
            setEventName(e.target.value)
          }
          required
        />

        <input
          type="text"
          placeholder="Client Name"
          value={clientName}
          onChange={(e) =>
            setClientName(e.target.value)
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
            className="preview-image"
          />
        )}

        <button type="submit">
          Add Happy Client
        </button>

      </form>

    </div>
  );
}

export default AdminAddHappyClients;