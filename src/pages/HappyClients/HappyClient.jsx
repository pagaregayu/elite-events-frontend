import { useEffect, useState } from "react";
import "./HappyClient.css";

function HappyClient() {

  const isAdmin =
    localStorage.getItem("adminToken") === "true";

  const defaultClients = [
    {
      id: "default1",
      eventName: "Royal Wedding",
      clientName: "Rahul & Priya",
      image:
        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800"
    },
    {
      id: "default2",
      eventName: "Corporate Meet",
      clientName: "Infosys Team",
      image:
        "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800"
    },
    {
      id: "default3",
      eventName: "Birthday Celebration",
      clientName: "Aarav Sharma",
      image:
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?w=800"
    },
    {
      id: "default4",
      eventName: "Engagement Ceremony",
      clientName: "Rohan & Sneha",
      image:
        "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=800"
    }
  ];

  const [clients, setClients] = useState([]);

  useEffect(() => {

    const uploadedClients =
      JSON.parse(
        localStorage.getItem("happyClients")
      ) || [];

    setClients([
      ...defaultClients,
      ...uploadedClients
    ]);

  }, []);

  const handleDelete = (id) => {

    const uploadedClients =
      JSON.parse(
        localStorage.getItem("happyClients")
      ) || [];

    const updatedClients =
      uploadedClients.filter(
        (client) => client.id !== id
      );

    localStorage.setItem(
      "happyClients",
      JSON.stringify(updatedClients)
    );

    setClients([
      ...defaultClients,
      ...updatedClients
    ]);
  };

  return (
    <div className="client-page">

      <h1>Happy Clients</h1>

      <div className="client-grid">

        {clients.map((client) => (

          <div
            className="client-card"
            key={client.id}
          >

            <img
              src={client.image}
              alt={client.eventName}
            />

            <div className="client-info">

              <h3>{client.eventName}</h3>

              <p>{client.clientName}</p>

              {
                isAdmin &&
                !String(client.id).startsWith("default") && (
                  <button
                    className="delete-btn"
                    onClick={() =>
                      handleDelete(client.id)
                    }
                  >
                    Delete
                  </button>
                )
              }

            </div>

          </div>

        ))}

      </div>

    </div>
  );
}

export default HappyClient;