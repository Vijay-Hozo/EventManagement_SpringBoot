import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = isLogin ? `${import.meta.env.VITE_SERVER_URL}/loginadmin` : `${import.meta.env.VITE_SERVER_URL}/newadmin`;
    
    try {
      const res = await axios.post(url, {
        username: isLogin ? undefined : username, 
        email,
        phone: isLogin ? undefined : phone, 
        password
      });

      localStorage.setItem("token", res.data.token);
      navigate("/admindashboard");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-[#080D18] min-h-screen flex flex-col items-center justify-center ">
      <div className='text-3xl text-white font-bold my-10'>
        <h1>Welcome EVENTMANAGER!</h1>
      </div>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg ">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`mr-4 text-lg font-semibold py-2 px-6 rounded-md ${isLogin ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300'}`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-semibold py-2 px-6 rounded-md ${isLogin ? 'bg-gray-700 text-gray-300' : 'bg-blue-600 text-white'}`}
          >
            Sign Up
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block text-gray-300">Name</label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full p-2 mt-1 text-gray-900 rounded-md bg-gray-100 focus:outline-none"
                required={!isLogin} 
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-2 mt-1 text-gray-900 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          {!isLogin && (
            <div>
              <label className="block text-gray-300">Phone</label>
              <input
                type="tel"
                name="phone"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-2 mt-1 text-gray-900 rounded-md bg-gray-100 focus:outline-none"
                required={!isLogin} 
              />
            </div>
          )}

          <div>
            <label className="block text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 mt-1 text-gray-900 rounded-md bg-gray-100 focus:outline-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md transition duration-300"
          >
            {isLogin ? 'Login' : 'Sign Up'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;
