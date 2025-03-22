import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="bg-[#080D18] min-h-screen flex flex-col text-white relative overflow-hidden">
      <div className="absolute ml-[200px] top-[-100px]">
        <div
          className="h-60 w-60 bg-blue-900 rounded-full blur-xl opacity-25"
        ></div>
      </div>

      <header className="flex justify-between items-center p-6">
        <h1 className="text-3xl font-semibold">InVITE</h1>
        <Link to="/auth">
          <button className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300">
            Event Manager
          </button>
        </Link>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center px-4">
        <div className="max-w-4xl w-full text-center">
          <div className="flex justify-between mb-12">
            <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center transform -rotate-12">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="text-blue-600 font-bold text-xl">000</div>
              </div>
            </div>
            <div className="w-20 h-20 bg-blue-500 rounded-lg flex items-center justify-center transform rotate-12">
              <div className="w-10 h-10 bg-white rounded-full"></div>
            </div>
          </div>

          <h2 className="text-6xl font-bold mb-6">Welcome to InVITE</h2>

          <p className="text-xl mb-10 max-w-2xl mx-auto">
            Explore the future of what is possible at InVITE. Join developers,
            creators, and designers to learn the latest tech, connect with
            experts, and get inspired.
          </p>

          <Link to="/userauth">
            <button className="relative bg-blue-700 px-8 py-3 rounded-md text-lg font-semibold hover:bg-blue-800 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
      </main>

      <footer className="bg-[#0A1128] py-8 mt-auto">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex justify-center space-x-8 mb-6">
            {["Home", "Events", "About Us", "Contact"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-300 hover:text-white transition duration-300"
              >
                {item}
              </a>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} InVITE. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
