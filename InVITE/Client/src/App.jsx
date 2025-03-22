import React from 'react';
import LandingPage from './Components/LandingPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminDashboard from './Components/AdminDashboard';
import EventPage from './Components/EventPage';
import AddEvent from './Components/AddEvent';
import ManageEvent from './Components/ManageEvent';
import Auth from './Components/Auth';
import UserAuth from './Components/UserAuth';
import EventBook from './Components/EventBook';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/userauth" element={<UserAuth />} />
          <Route path="/admindashboard" element={<AdminDashboard />}></Route>
          <Route path="/addevent" element={<AddEvent />}></Route>
          <Route path="/eventpage" element={<EventPage />}></Route>
          <Route path="/eventbook/:id" element={<EventBook />}></Route>
          <Route path="/manageevent/:id" element={<ManageEvent />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App