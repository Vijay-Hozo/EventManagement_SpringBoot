import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const [events, setEvents] = useState([]);
  const [adminname,setAdminname] = useState(" ");
  const token = localStorage.getItem("token");

  useEffect(() => {
    getAdminEvents();
    getadminbyid();
  }, []);

  const getAdminEvents = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SERVER_URL}/adminevent`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch events");
      
      const data = await response.json();
      setEvents(data.events);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getadminbyid = async() =>{
    try{
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/getadminbyid`,{
        headers:{
          Authorization : `Bearer ${token}`
        }
      })
      setAdminname(res.data.user.username);
    }catch(err){
      console.log("error");
    }
  }

  return (
    <div className="bg-gradient-to-b from-[#080D18] to-[#1A1F2E] min-h-screen text-white">
      <header className="bg-[#1A1F2E] shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link to="/"><h1 className="font-bold text-2xl">InVITE</h1></Link>
          <Link to="/addevent"><button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-full transition duration-300 flex items-center"
          >
            Add Event
          </button></Link>
          <h2 className="text-lg">Welcome, {adminname}</h2>
        </div>
      </header>
      <hr />

      <main className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-center font-bold text-3xl mb-8">My Events</h1>

        
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(({ _id, eventImage, eventName, eventDescription }) => (
              <div
                key={_id}
                className="bg-[#2A2F3E] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300"
              >
                <img
                  src={eventImage}
                  alt={eventName}
                  className="w-full h-56 object-cover"
                />
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 ">
                    {eventName}
                  </h2>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                    {eventDescription}
                  </p>
                  <div className="flex justify-center items-center">
                    <Link to={`/manageevent/${_id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300">
                        Manage Event
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
