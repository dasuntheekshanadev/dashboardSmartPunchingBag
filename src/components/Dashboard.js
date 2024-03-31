import React from 'react';
import { FiThermometer, FiAlertCircle, FiActivity } from 'react-icons/fi';
import FirebaseDataDisplay from './FirebaseDataDisplay';
import { useNavigate } from 'react-router-dom';

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
    <div className="bg-gradient-to-r from-gray-600 to-blue-900 min-h-screen flex flex-col text-white">
        <FirebaseDataDisplay />
    </div>
  );
}

export default Dashboard;
