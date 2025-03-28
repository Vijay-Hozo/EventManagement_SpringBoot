import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import eventImage from "../assets/Dj.jpg"

const ManageEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [tickets, setTickets] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const fetchEvent = async () => {
    try {
      const res = await axios.get(`http://localhost:8080/api/events/${id}`);
      const fetchedEvent = res.data; // Removed `.event`, assuming API returns a single object

      setEvent(fetchedEvent);
      setEventName(fetchedEvent.eventName);
      setDescription(fetchedEvent.eventDescription);
      setDate(fetchedEvent.eventDate);
      setTime(fetchedEvent.eventTime);
      setLocation(fetchedEvent.eventLocation);
      setFee(fetchedEvent.eventFee);
      setTickets(fetchedEvent.tickets);
      setImage(fetchedEvent.eventImage);
    } catch (err) {
      console.error("Error fetching event:", err.message);
    }
  };

  
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:8080/api/events/${id}`);
      console.log("Event deleted successfully");
      navigate("/admindashboard");
    } catch (err) {
      console.error("Error deleting event:", err.message);
    }
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
        <h2 className="text-lg">Manage Event</h2>
        <h2 className="text-lg">Welcome, Admin</h2>
      </header>

      <main className="flex flex-col lg:flex-row justify-around items-center w-full max-w-6xl mt-14 px-6">
        <div className="w-full lg:w-1/2">
        
            <img
              src={eventImage || "https://via.placeholder.com/400"}
              alt={event.eventName}
              className="rounded-lg shadow-lg w-full max-h-96 object-cover"
            />
          
        </div>

        <div className="w-full lg:w-1/2 p-6">
          <div className="flex justify-around gap-10">
            
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>

          <div className="mt-6 flex flex-col text-xl">
           
              <>
                <h1 className="font-bold text-3xl my-8 text-center">{event.eventName}</h1>
                <p className="mb-4">{event.eventDescription}</p>
                <p className="mb-4">📅 <strong>Date:</strong> {new Date(event.eventDate).toDateString()}</p>
                <p className="mb-4">⏰ <strong>Time:</strong> {event.eventTime}</p>
                <p className="mb-4">📍 <strong>Location:</strong> {event.eventLocation}</p>
                <p className="mb-4">💰 <strong>Fee:</strong> ₹{event.eventFee}</p>
                <p className="mb-4">🎟️ <strong>Tickets Available:</strong> {event.tickets}</p>
              </>
            
          </div>
        </div>
      </main>
    </div>
  );
};

export default ManageEvent;
