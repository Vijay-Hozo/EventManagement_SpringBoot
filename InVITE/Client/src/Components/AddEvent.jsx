import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const generateRandomAdminId = () => {
  return "admin-" + Math.floor(Math.random() * 1000000); // Example: admin-123456
};

const AddEvent = () => {
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    adminid: generateRandomAdminId(), // Generate random admin ID
    eventName: "",
    eventDescription: "",
    eventDate: "",
    eventTime: "",
    eventLocation: "",
    eventFee: "",
    tickets: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await toast.promise(
        axios.post("http://localhost:8080/api/events", eventData, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
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
        {[
          { label: "Event Name", name: "eventName", type: "text" },
          { label: "Description", name: "eventDescription", type: "text" },
          { label: "Date", name: "eventDate", type: "date" },
          { label: "Time", name: "eventTime", type: "time" },
          { label: "Location", name: "eventLocation", type: "text" },
          { label: "Fee", name: "eventFee", type: "number" },
          { label: "Total Tickets", name: "tickets", type: "number" },
        ].map(({ label, name, type }) => (
          <div key={name} className="flex flex-col gap-2">
            <label className="text-lg">{label}</label>
            <input
              type={type}
              name={name}
              placeholder={`Enter ${label.toLowerCase()}`}
              className="p-2 rounded-md bg-gray-800 border border-gray-700 focus:outline-none"
              value={eventData[name]}
              onChange={handleChange}
              required
            />
          </div>
        ))}

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
