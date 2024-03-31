import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-gray-800 shadow-lg py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-shrink-0 text-white">
            {/* New Logo */}
            <svg
              className="h-8 w-8 mr-2 fill-current"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path
                fillRule="evenodd"
                d="M20.168 6.926L12 1 3.832 6.926A1 1 0 002 8v8a1 1 0 001.448.89L12 11.101l8.552 5.79A1 1 0 0022 16V8a1 1 0 00-.168-.74zM12 9.101l8 5.428V8l-8-5.428-8 5.428v6.53l8-5.428z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold text-xl tracking-tight">
              <strong>Smart</strong> Punching Bag
            </span>
          </div>
          <div className="hidden lg:flex flex-grow justify-end">
            <Link
              to="/"
              className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <strong>Home</strong>
            </Link>
            <Link
              to="/dashboard"
              className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <strong>Dashboard</strong>
            </Link>
            <Link
              to="/about"
              className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <strong>About Us</strong>
            </Link>
            <Link
              to="/chart"
              className="text-white hover:text-blue-200 px-3 py-2 rounded-md text-sm font-medium"
            >
              <strong>Chart and Data Analysis</strong>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
