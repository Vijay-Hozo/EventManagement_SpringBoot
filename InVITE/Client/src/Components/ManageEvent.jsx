import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const ManageEvent = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const [eventName, setEventName] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [fee, setFee] = useState("");
  const [tickets, setTickets] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    fetchevent();
  }, [id]);

  const fetchevent = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/event/${id}`
      );
      const fetchedEvent = res.data.event;
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
      console.log(err.message);
    }
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async () => {
    const updatedEvent = {
      eventName: eventName,
      eventDescription: description,
      eventDate: date,
      eventTime: time,
      eventLocation: location,
      eventFee: fee,
      tickets: tickets,
      eventImage: image,
    };

    try {
      const res = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/event/${id}`,
        updatedEvent
      );
      console.log("Updated successfully", res.data);
      setEvent(updatedEvent);
      setEditMode(false);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/event/${id}`);
      console.log("Deleted successfully");
      navigate("/admindashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-[#080D18] w-full min-h-screen flex flex-col items-center text-white">
      <div className="flex justify-between items-center text-xl w-full p-4 bg-[#1A1F2E] shadow-md">
        <Link to="/">
          <h1 className="font-bold text-2xl">InVITE</h1>
        </Link>
        <h1 className="font-medium text-lg">Manage Event</h1>
        <h1 className="text-lg">Welcome, Admin</h1>
      </div>

      <div className="flex justify-between items-center w-full h-full mt-14">
        <div className="w-full">
          {editMode ? (
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full h-full rounded-md bg-[#080D18]"
            />
          ) : (
            <img
              src={event.eventImage}
              alt="djimage"
              className="w-full h-full rounded-md"
            />
          )}
        </div>

        <div className="md:w-1/2 p-6 ml-14">
          <div className="flex justify-around gap-10">
            {editMode ? (
              <button
                onClick={handleSave}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Save
              </button>
            ) : (
              <button
                onClick={handleEdit}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
              >
                Edit
              </button>
            )}
            <button
              onClick={handleDelete}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
            >
              Delete
            </button>
          </div>

          <div className="mt-4 flex flex-col text-xl ml-14">
            {editMode ? (
              <>
                <input
                  type="text"
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <input
                  type="text"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <input
                  type="text"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <input
                  type="text"
                  value={fee}
                  onChange={(e) => setFee(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
                <input
                  type="text"
                  value={tickets}
                  onChange={(e) => setTickets(e.target.value)}
                  className="mb-4 p-2 rounded-lg bg-[#080D18]"
                />
              </>
            ) : (
              <>
                <h1 className="font-bold text-3xl my-8">{event.eventName}</h1>
                <p className="mb-4">{event.eventDescription}</p>
                <p className="mb-4">Time: {event.eventTime}</p>
                <p className="mb-4">Date: {event.eventDate}</p>
                <p className="mb-4">Location: {event.eventLocation}</p>
                <p className="mb-4">Fee: {event.eventFee}</p>
                <p className="mb-4">Tickets Available: {event.tickets}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageEvent;
