import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import djimage from "../assets/Dj.jpg";
import { toast } from "react-toastify";

const EventBook = () => {
  const { id } = useParams(); // Get event ID from URL
  const [event, setEvent] = useState(null);
  const userData = sessionStorage.getItem("user");
  const [username, setUsername] = useState("");

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  useEffect(() => {
      if (!userData) {
        toast.error("Please log in to access this page");
        navigate("/userauth");
        return;
      }
  
      const user = JSON.parse(userData);
      setUsername(user.username);
  
      // getEvents();
    }, []);
  

  // Fetch event details using GET request to /api/events/{id}
  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events/${id}`);
      setEvent(res.data); // Assuming backend returns a single event object
    } catch (err) {
      console.error("Failed to fetch event:", err.message);
    }
  };

  const handleBook = async () => {
    toast.success("Event Booked Successfully")
  };

  if (!event) {
    return <div className="text-white text-center mt-10">Loading event details...</div>;
  }

  return (
    <div className="bg-[#080D18] min-h-screen flex flex-col items-center text-white">
      <header className="w-full p-4 bg-[#1A1F2E] shadow-md flex justify-between items-center">
        <Link to="/">
          <h1 className="font-bold text-2xl">InVITE</h1>
        </Link>
        <h2 className="text-lg">Welcome {username}</h2>
      </header>

      <main className="flex flex-col lg:flex-row justify-around items-center w-full max-w-6xl mt-14 px-6">
        <div className="w-full lg:w-1/2">
          <img
            src={event.eventImage || djimage}
            alt={event.eventName}
            className="rounded-lg shadow-lg w-full max-h-96 object-cover"
          />
        </div>

        <div className="w-full lg:w-1/2 p-6">
          <h1 className="font-bold text-4xl mb-4 text-center">{event.eventName}</h1>
          <p className="text-gray-300 text-lg mb-4">{event.eventDescription}</p>
          <p className="text-lg mb-2">📅 <strong>Date:</strong> {new Date(event.eventDate).toDateString()}</p>
          <p className="text-lg mb-2">⏰ <strong>Time:</strong> {event.eventTime}</p>
          <p className="text-lg mb-2">📍 <strong>Location:</strong> {event.eventLocation}</p>
          <p className="text-lg mb-2">💰 <strong>Fee:</strong> ₹{event.eventFee}</p>
          <p className="text-lg mb-6">🎟️ <strong>Tickets Available:</strong> {event.tickets}</p>
          <button onClick={handleBook} className="bg-blue-600 hover:bg-blue-700 p-3 rounded-md text-white font-bold w-full">
            Book Now
          </button>
        </div>
      </main>
    </div>
  );
};

export default EventBook;
