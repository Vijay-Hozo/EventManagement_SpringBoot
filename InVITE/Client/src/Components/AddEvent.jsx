import React, { useState } from "react";
import { storage } from "../Utils/firebase";
import {  ref, getDownloadURL, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AddEvent = () => {
  const token = localStorage.getItem("token");

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [tickets, setTickets] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const imageRef = ref(storage, `files/${v4()}`);
  
    try {
      await toast.promise(
        (async () => {
          await uploadBytes(imageRef, image); 
          const imageUrl = await getDownloadURL(imageRef);
  
          const eventData = {
            adminid: token,
            eventName: name,
            eventDescription: description,
            eventDate: date,
            eventTime: time,
            eventLocation: location,
            eventFee: fee,
            eventImage: imageUrl,
            tickets: tickets,
          };
  
          await axios.post(`${import.meta.env.VITE_SERVER_URL}/event`, eventData, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
        })(),
        {
          loading: "Creating event...",
          success: "Event created successfully!",
          error: "Failed to create event!",
        }
      );
      navigate("/admindashboard");
    } catch (err) {
      console.error("Error:", err.message);
    }
  };

  return (
    <div className="bg-[#080D18] w-full min-h-screen text-white flex flex-col items-center p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold">Add Event</h1>
      </div>
      <form onSubmit={handleSubmit} className="w-full max-w-4xl grid grid-cols-2 gap-8">
        <div className="flex flex-col gap-2">
          <label className="text-lg">Event Name</label>
          <input
            type="text"
            placeholder="Enter the event name"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Description</label>
          <input
            type="text"
            placeholder="Enter the description"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Date</label>
          <input
            type="date"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Time</label>
          <input
            type="time"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Location</label>
          <input
            type="text"
            placeholder="Enter the location"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-lg">Fee</label>
          <input
            type="number"
            placeholder="Enter the fee"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={fee}
            onChange={(e) => setFee(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="tickets" className="text-lg">
            Total Tickets
          </label>
          <input
            type="number"
            placeholder="Enter number of tickets"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            value={tickets}
            onChange={(e) => setTickets(e.target.value)}
            required
          />
        </div>

        <div className="flex flex-col gap-2 col-span-2">
          <label htmlFor="image" className="text-lg">
            Event Image
          </label>
          <input
            type="file"
            className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
            onChange={(e) => setImage(e.target.files[0])}
            required 
          />
        </div>

        <div className="col-span-2 flex justify-center">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition duration-300"
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEvent;
