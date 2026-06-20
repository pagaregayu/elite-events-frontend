import { useState, useEffect } from "react";
import { FaCalendarAlt, FaTrash, FaPlus, FaMapMarkerAlt, FaPhone } from "react-icons/fa";

function ManageEvents() {
  const [events, setEvents] = useState([]);
  const [eventName, setEventName] = useState("");
  const [location, setLocation] = useState("");
  const [contactMobile, setContactMobile] = useState("");

  useEffect(() => {
    const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
    setEvents(storedEvents);
  }, []);

  const addEvent = () => {
    if (!eventName.trim() || !location.trim() || !contactMobile.trim()) {
      alert("Please fill all fields");
      return;
    }

    if (!/^\d{10}$/.test(contactMobile.trim())) {
      alert("Please enter a valid 10-digit mobile number");
      return;
    }

    const newEvent = {
      id: Date.now(),
      eventName: eventName.trim(),
      location: location.trim(),
      contactMobile: contactMobile.trim()
    };

    const updatedEvents = [...events, newEvent];
    setEvents(updatedEvents);
    localStorage.setItem("events", JSON.stringify(updatedEvents));
    
    setEventName("");
    setLocation("");
    setContactMobile("");
  };

  const deleteEvent = (id) => {
    if (window.confirm("Delete this event?")) {
      const updatedEvents = events.filter(event => event.id !== id);
      setEvents(updatedEvents);
      localStorage.setItem("events", JSON.stringify(updatedEvents));
    }
  };

  return (
    <div className="min-h-screen bg-black p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <FaCalendarAlt className="text-pink-500 text-2xl" />
            <h1 className="text-2xl font-bold text-white">Manage Events</h1>
          </div>
          <p className="text-gray-500 text-sm">Add and manage your events</p>
        </div>

        {/* Add Form */}
        <div className="bg-gray-900 rounded-lg border border-gray-800 p-5 mb-6">
          <h2 className="text-white font-semibold text-base mb-4">Add New Event</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-gray-400 text-xs mb-1">Event Name</label>
              <div className="relative">
                
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter event name"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Location</label>
              <div className="relative">
              
                <input
                  type="text"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-400 text-xs mb-1">Contact Mobile</label>
              <div className="relative">
               
                <input
                  type="tel"
                  className="w-full pl-9 pr-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm placeholder:text-gray-500 focus:outline-none focus:border-pink-500"
                  placeholder="Enter 10-digit mobile"
                  value={contactMobile}
                  onChange={(e) => setContactMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                  maxLength="10"
                />
              </div>
            </div>
          </div>
          <button
            onClick={addEvent}
            className="mt-4 px-4 py-2 bg-pink-500 hover:bg-pink-600 text-white text-sm font-medium rounded-lg transition flex items-center gap-2"
          >
            <FaPlus size={12} /> Add Event
          </button>
        </div>

        {/* Events List */}
        {events.length === 0 ? (
          <div className="bg-gray-900 rounded-lg border border-gray-800 p-8 text-center">
            <FaCalendarAlt className="text-gray-700 text-4xl mx-auto mb-3" />
            <p className="text-gray-500">No events added yet</p>
          </div>
        ) : (
          <div className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[500px]">
                <thead className="bg-gray-800">
                  <tr>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Event Name</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Location</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Contact</th>
                    <th className="text-left py-3 px-4 text-gray-300 text-xs font-medium">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {events.map((event) => (
                    <tr key={event.id} className="border-t border-gray-800 hover:bg-gray-800/50">
                      <td className="py-3 px-4 text-white text-sm">{event.eventName}</td>
                      <td className="py-3 px-4 text-gray-300 text-sm">{event.location}</td>
                      <td className="py-3 px-4">
                        <a href={`tel:${event.contactMobile}`} className="text-gray-300 text-sm hover:text-pink-400 transition">
                          {event.contactMobile}
                        </a>
                      </td>
                      <td className="py-3 px-4">
                        <button
                          onClick={() => deleteEvent(event.id)}
                          className="px-2 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded text-xs transition flex items-center gap-1"
                        >
                          <FaTrash size={10} /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ManageEvents;