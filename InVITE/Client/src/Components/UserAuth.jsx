import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const UserAuth = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const BASE_URL = "http://localhost:8080/api/users";
  const LOGIN_URL = `${BASE_URL}/login`;
  const REGISTER_URL = `${BASE_URL}/register`;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = isLogin ? LOGIN_URL : REGISTER_URL;
    const requestData = isLogin
      ? { email, password }
      : { username, email, phone, password };

    try {
      const res = await axios.post(url, requestData);

      if (isLogin) {
        toast.success("Login successful!");
        localStorage.setItem("token", res.data.token);
        navigate("/eventpage");
      } else {
        toast.success("Registration successful! Please login.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error(err.response?.data || "Something went wrong!");
    }
  };

  return (
    <div className="bg-[#080D18] min-h-screen flex flex-col items-center justify-center ">
      <div className="text-3xl text-white font-bold my-10">
        <h1>Hii User!</h1>
      </div>
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg ">
        <div className="flex justify-center mb-6">
          <button
            onClick={() => setIsLogin(true)}
            className={`mr-4 text-lg font-semibold py-2 px-6 rounded-md ${
              isLogin ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
            }`}
          >
            Login
          </button>
          <button
            onClick={() => setIsLogin(false)}
            className={`text-lg font-semibold py-2 px-6 rounded-md ${
              isLogin ? "bg-gray-700 text-gray-300" : "bg-blue-600 text-white"
            }`}
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
            {isLogin ? "Login" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserAuth;
