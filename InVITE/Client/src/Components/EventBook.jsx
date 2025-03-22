import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import djimage from "../assets/Dj.jpg";
import { toast } from "react-toastify";

const EventBook = () => {
  const formatDate = (dateString) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, options);
  };
  const { id } = useParams();
  const [event, setEvent] = useState(null);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/event/${id}`
      );
      setEvent(res.data.event);
      console.log(res);
    } catch (err) {
      console.error(err.message);
    }
  };

  const handleBook = async () => {
    try {
      const orderResponse = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/createbooking`,
        { bookingamount: event.eventFee }
      );
      const { order } = orderResponse.data;
      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, 
        amount: order.amount,
        currency: order.currency,
        name: event.eventName,
        description: "Event Booking",
        image: event.eventImage || djimage,
        order_id: order.id,
        handler: async (response) => {
          try {
            await axios.post(`${import.meta.env.VITE_SERVER_URL}/confirmbooking`, {
              eventName: event.eventName,
              eventDate: event.eventDate,
              eventTime: event.eventTime,
              eventLocation: event.eventLocation,
              eventFee: event.eventFee,
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
            });
            toast.success("Payment successful! Booking confirmed.");
          } catch (err) {
            console.error("Payment confirmation failed", err);
            toast.error("Payment successful, but booking confirmation failed.");
          }
        },
        theme: {
          color: "#3399cc",
        },
      };
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.error("Booking failed", err);
      alert("Booking failed. Please try again.");
    }
  };

  if (!event) {
    return (
      <div className="text-white text-center">Loading event details...</div>
    );
  }

  return (
    <div className="bg-[#080D18] w-full min-h-screen flex flex-col items-center text-white">
      <div className="flex justify-between items-center text-xl w-full p-4 bg-[#1A1F2E] shadow-md">
        <Link to="/">
          <h1 className="font-bold text-2xl">InVITE</h1>
        </Link>
        <h1 className="text-lg">Welcome</h1>
      </div>

      <div className="flex justify-around items-center mt-14">
        <div className="w-full">
          <img
            src={event.eventImage || djimage} 
            alt={event.eventName || "Event Image"}
            className="rounded-md"
          />
        </div>

        <div className="md:w-1/2 p-6 ml-14">
          <div className="mt-4 flex flex-col text-xl ml-14">
            <h1 className="font-bold text-3xl my-8 text-center">
              {event.eventName}
            </h1>
            <p className=" mb-4">{event.eventDescription}</p>
            <p className=" mb-4">Time: {event.eventTime}</p>
            <p className=" mb-4">Date: {formatDate(event.eventDate)}</p>
            <p className=" mb-4">Location: {event.eventLocation}</p>
            <p className=" mb-4">Fee: ₹{event.eventFee}</p>
            <p className=" mb-4">Tickets Available: {event.tickets}</p>
            <button onClick={handleBook} className="bg-blue-600 p-2 rounded-md">Book Now</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventBook;
