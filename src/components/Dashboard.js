import React from 'react';
import { FiThermometer, FiAlertCircle, FiActivity } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import HealthBandStatus from './HealthBandStatus';
import PunchingBagStatus from './PunchingBagStatus';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDHT = () => {
    // Navigate to DHT page
    navigate('/dht');
  };

  const handleMotionSensor = () => {
    // Navigate to Motion Sensor page
    navigate('/motion-sensor');
  };

  const handleSmokeDetector = () => {
    // Navigate to Smoke Detector page
    navigate('/smoke-detector');
  };

  return (
    <div className="bg-gradient-to-r from-gray-600 to-blue-900 min-h-screen flex justify-center items-center text-white">
      <div className="flex flex-col items-center">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <HealthBandStatus />
          </div>
          <div>
            <PunchingBagStatus />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
