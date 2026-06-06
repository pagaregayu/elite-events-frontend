import { useState, useEffect } from "react";

function ManageEvents() {

  const [events, setEvents] = useState([]);

  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");

  useEffect(() => {

    const storedEvents =
      JSON.parse(localStorage.getItem("events")) || [];

    setEvents(storedEvents);

  }, []);

  const addEvent = () => {

    if (!eventName || !location) {
      alert("Fill all fields");
      return;
    }

    const newEvent = {
      id: Date.now(),
      eventName,
      location
    };

    const updatedEvents = [...events, newEvent];

    setEvents(updatedEvents);

    localStorage.setItem(
      "events",
      JSON.stringify(updatedEvents)
    );

    setEventName("");
    setLocation("");
  };

  const deleteEvent = (id) => {

    const updatedEvents =
      events.filter(event => event.id !== id);

    setEvents(updatedEvents);

    localStorage.setItem(
      "events",
      JSON.stringify(updatedEvents)
    );
  };

  return (
    <div className="container mt-4">

      <h2>Manage Events</h2>

      <div className="card p-4 mb-4">

        <input
          className="form-control mb-3"
          placeholder="Event Name"
          value={eventName}
          onChange={(e) =>
            setEventName(e.target.value)
          }
        />

        <input
          className="form-control mb-3"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <button
          className="btn btn-warning"
          onClick={addEvent}
        >
          Add Event
        </button>

      </div>

      <table className="table table-bordered">

        <thead>
          <tr>
            <th>Event</th>
            <th>Location</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>

          {events.map(event => (

            <tr key={event.id}>

              <td>{event.eventName}</td>

              <td>{event.location}</td>

              <td>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() =>
                    deleteEvent(event.id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>
  );
}

export default ManageEvents;