import React from "react";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/gantas-vaiciulenas-1yAp2okA5Uk-unsplash.jpg";
import cardImage1 from "../assets/sigmund-Fa9b57hffnM-unsplash.jpg"; 
import ChartImage1 from "../assets/stephen-dawson-qwtCeJ5cLYs-unsplash.jpg"
import DashImage1 from "../assets/hunter-harritt-Ype9sdOPdYc-unsplash.jpg"

const SmartPunchingBag = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate("/dashboard"); 
  };

  const handleAbout = () => {
    navigate("/about");
  };

  const handleChart = () => {
    navigate("/chart");
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex flex-col justify-center items-center animate-fadeIn" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <h1 className="text-4xl font-bold mb-4 text-white">
        Greetings, Punching Prodigy!
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="max-w-sm bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <a href="/dashboard">
            <img className="w-full" src={DashImage1} alt="Dashboard" />
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Dive into Data
              </h5>
              <p className="mb-3 font-normal text-gray-700">
                Embrace the epitome of convenience and mastery with our intelligent monitoring system. Where control is seamless and opportunities are boundless.
              </p>
              <button onClick={handleGetStarted} className="block w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                Access Dashboard
              </button>
            </div>
          </a>
        </div>
        <div className="max-w-sm bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <a href="/about">
            <img className="w-full" src={cardImage1} alt="About" />
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Meet the Minds
              </h5>
              <p className="mb-3 font-normal text-gray-700">
                Allow me to present our remarkable team. They're a collective of exceptionally skilled individuals driven by a pursuit of perfection. Click here to explore our Team.
              </p>
              <button onClick={handleAbout} className="block w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                Discover About Us
              </button>
            </div>
          </a>
        </div>
        <div className="max-w-sm bg-gray-100 rounded-lg shadow-lg overflow-hidden">
          <a href="/chart">
            <img className="w-full" src={ChartImage1} alt="Chart" />
            <div className="p-6">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
                Visualize Insights
              </h5>
              <p className="mb-3 font-normal text-gray-700">
                Cast your gaze upon our exhaustive charts and graphs, meticulously crafted by our state-of-the-art home automation system. Witness your historical data here.
              </p>
              <button onClick={handleChart} className="block w-full px-4 py-2 mt-2 text-sm font-semibold text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200">
                Explore Charts
              </button>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default SmartPunchingBag;
