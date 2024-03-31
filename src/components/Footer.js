import React from 'react';

function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-600 py-4 text-white text-center">
      <div className="container mx-auto">
        <div className="flex items-center justify-center mb-2">
          {/* New Logo */}
          <svg
            className="h-6 w-6 mr-2 fill-current"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M20.168 6.926L12 1 3.832 6.926A1 1 0 002 8v8a1 1 0 001.448.89L12 11.101l8.552 5.79A1 1 0 0022 16V8a1 1 0 00-.168-.74zM12 9.101l8 5.428V8l-8-5.428-8 5.428v6.53l8-5.428z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-semibold text-sm tracking-tight">
            <strong>Home</strong> Smart Punching Bag
          </span>
        </div>
        <p className="text-xs">&copy; 2024 Smart Punching Bag. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
