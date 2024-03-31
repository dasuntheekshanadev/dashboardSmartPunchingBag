import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';
import { GiHeartOrgan } from 'react-icons/gi';
import { FaRunning } from 'react-icons/fa';
import { MdFitnessCenter } from 'react-icons/md';
import { FiRefreshCw } from 'react-icons/fi';
import fitnessImg from '../assets/onur-binay-HLyqe4smorI-unsplash(1).jpg';
import Punching from '../assets/kkkk.jpg';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const PunchingBagStats = () => {
  const [pressure, setPressure] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [fitnessLevel, setFitnessLevel] = useState('Unknown');
  const [stamina, setStamina] = useState(0);

  useEffect(() => {
    const fetchPunchingBagData = () => {
      const dbRef = firebase.database().ref();

      dbRef.on('value', (snapshot) => {
        const data = snapshot.val();
        setPressure(data.pressure);
        setTemperature(data.temperature);
        // Calculate fitness level based on pressure
        if (data.pressure > 100 && data.pressure <= 200) {
          setFitnessLevel('Good');
        } else {
          setFitnessLevel('Poor');
        }
      });
    };

    fetchPunchingBagData();

    return () => firebase.database().ref().off();
  }, []);

  const handleReset = () => {
    // Reset values in Firebase
    firebase.database().ref().update({
      pressure: 0,
      temperature: 0,
    });
    // Reset local state
    setPressure(0);
    setTemperature(0);
    setFitnessLevel('Unknown');
  };

  const handleStartNewPerson = () => {
    // Perform necessary actions to start tracking a new person
    // For example, reset stamina and any other relevant data
    setStamina(0);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-stone-900">
      <div className="grid grid-cols-2 gap-4">
        {/* First Card */}
        <div className="max-w-md w-full bg-blue-600 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-3xl font-bold text-center text-white-600 mb-4">Health Band Status</div>
            <div className="flex justify-center">
              <img className="h-auto w-full object-cover" src={fitnessImg} alt="Punching Bag" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GiHeartOrgan className="text-xl text-red-500 mr-2" />
                  <div className="text-lg text-white-700">{`Stamina: ${pressure}`}</div>
                </div>
                <div className="flex items-center">
                  <FaRunning className="text-xl text-blue-500 mr-2" />
                  <div className="text-lg text-white-700">{`Temperature: ${temperature}°C`}</div>
                </div>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <MdFitnessCenter className="text-xl text-green-500 mr-2" />
                  <div className="text-lg text-gray-700">{`Fitness Level: ${fitnessLevel}`}</div>
                </div>
                <div className="flex items-center">
                  <FiRefreshCw className="text-xl text-gray-500 cursor-pointer hover:text-gray-700 mr-2" onClick={handleReset} />
                  <div className="text-lg text-gray-700 cursor-pointer hover:underline" onClick={handleReset}>Reset</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {/* Add stamina component here */}
              </div>
            </div>
          </div>
        </div>

        {/* Second Card */}
        <div className="max-w-md w-full bg-blue-600 rounded-xl shadow-md overflow-hidden">
          <div className="p-8">
            <div className="text-3xl font-bold text-center text-white-600 mb-4">Punching Bag Status</div>
            <div className="flex justify-center">
              <img className="h-auto w-full object-cover" src={Punching} alt="Punching Bag" />
            </div>
            <div className="mt-8">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <GiHeartOrgan className="text-xl text-red-500 mr-2" />
                  <div className="text-lg text-white-700">{`Pressure: ${pressure}`}</div>
                </div>
                <div className="flex items-center">
                  <GiHeartOrgan className="text-xl text-red-500 mr-2" />
                  <div className="text-lg text-white-700">{`Force by Min: ${pressure}`}</div>
                </div>
                <div className="flex items-center">
                  <FiRefreshCw className="text-xl text-gray-500 cursor-pointer hover:text-gray-700 mr-2" onClick={handleReset} />
                  <div className="text-lg text-gray-700 cursor-pointer hover:underline" onClick={handleReset}>Reset</div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                {/* Add stamina component here */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchingBagStats;
