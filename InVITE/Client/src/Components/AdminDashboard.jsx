import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import image from "../assets/Event-image.webp"; // Static event image

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getAllEvents();
  }, []);

  // Fetch all events from "api/events"
  const getAllEvents = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/events");
      setEvents(response.data); // Assuming response.data is an array of events
    } catch (err) {
      console.error("Failed to fetch events:", err.message);
    }
  };

  return (
    <div className="bg-gradient-to-b from-[#080D18] to-[#1A1F2E] min-h-screen text-white">
      <header className="bg-[#1A1F2E] shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/">
            <h1 className="font-bold text-2xl">InVITE</h1>
          </Link>
          <Link to="/addevent">
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300">
              Add Event
            </button>
          </Link>
        </div>
      </header>
      <hr />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-center font-bold text-3xl mb-8">Events</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.length > 0 ? (
            events.map(({ id, eventName, eventDescription }) => (
              <div
                key={id}
                className="bg-[#2A2F3E] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={image} // Static image for all events
                  alt="Event"
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2">{eventName}</h2>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {eventDescription}
                  </p>
                  <div className="flex justify-center items-center">
                    <Link to={`/manageevent/${id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Manage Event
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400 col-span-3">No events available</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
