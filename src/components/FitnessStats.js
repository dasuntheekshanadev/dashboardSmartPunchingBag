import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FaTachometerAlt, FaBolt } from 'react-icons/fa';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// Function to calculate lung capacity based on blood oxygen level
const calculateLungCapacity = (bloodOxygenLevel) => {
  // Assuming a linear relationship between blood oxygen level and lung capacity
  // You may need to adjust the coefficients based on actual physiological data
  const lungCapacity = 100 + (bloodOxygenLevel - 95) * 5;
  
  // Ensure lung capacity is within a reasonable range (e.g., 0 to 100)
  return Math.max(0, Math.min(100, lungCapacity));
};

// Function to rate stamina based on lung capacity and calories burnt
const rateStamina = (lungCapacity, caloriesBurnt) => {
  // Calculate stamina rating based on lung capacity and calories burnt
  let staminaRating = 0;

  // Adjust weights for lung capacity and calories burnt as needed
  const lungCapacityWeight = 0.6;
  const caloriesBurntWeight = 0.4;

  // Normalize values (lung capacity between 0 and 100, calories burnt between 0 and 500)
  const normalizedLungCapacity = lungCapacity / 100;
  const normalizedCaloriesBurnt = caloriesBurnt / 500;

  // Combine factors to get a single rating
  const combinedFactor = (lungCapacityWeight * normalizedLungCapacity) + (caloriesBurntWeight * normalizedCaloriesBurnt);

  // Convert combined factor to a 5-star rating (assuming range from 0 to 1)
  staminaRating = Math.round(combinedFactor * 5);

  // Clamp staminaRating within the range of 0 to 5
  staminaRating = Math.min(5, Math.max(0, staminaRating));

  return staminaRating;
};

const FitnessStats = () => {
  const [stamina, setStamina] = useState(0);
  const [lungCapacity, setLungCapacity] = useState(0);
  const [caloriesBurnt, setCaloriesBurnt] = useState(0);
  const [mass, setMass] = useState(0);
  const [timer, setTimer] = useState(0);
  const [timerOver, setTimerOver] = useState(false); // State to track if the timer is over
  const [timerAdjustment, setTimerAdjustment] = useState(0); // State to hold timer adjustment value

  useEffect(() => {
    // Fetch stamina data from Firebase
    const staminaRef = firebase.database().ref('stamina');
    staminaRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setStamina(data);
    });

    // Fetch lung capacity data from Firebase
    const lungCapacityRef = firebase.database().ref('body/oxygen');
    lungCapacityRef.on('value', (snapshot) => {
      const bloodOxygenLevel = snapshot.val();
      const calculatedLungCapacity = calculateLungCapacity(bloodOxygenLevel);
      setLungCapacity(calculatedLungCapacity);
    });

    // Fetch user entered mass from Firebase (assuming it's stored in Firebase)
    const userMassRef = firebase.database().ref('user/mass');
    userMassRef.on('value', (snapshot) => {
      const data = snapshot.val();
      setMass(data);
    });

    return () => {
      staminaRef.off();
      lungCapacityRef.off();
      userMassRef.off();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
        // Algorithm to calculate calories burnt based on mass
        const calculatedCaloriesBurnt = mass * 24; // Example algorithm, adjust as needed
        setCaloriesBurnt(calculatedCaloriesBurnt);
      } else {
        clearInterval(interval);
        setTimerOver(true); // Set timerOver to true when the timer is over
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, mass]);

  useEffect(() => {
    if (timerOver) {
      // When timer is over, rate stamina based on lung capacity and calories burnt
      const rating = rateStamina(lungCapacity, caloriesBurnt);
      setStamina(rating);
    }
  }, [timerOver, lungCapacity, caloriesBurnt]);

  const handleStartTimer = () => {
    // Set timer to 60 seconds (adjust as needed)
    setTimer(60);
    setTimerOver(false); // Reset timerOver when the timer starts
  };

  const handleReset = () => {
    setStamina(0);
    setLungCapacity(0);
    setCaloriesBurnt(0);
    setMass(0);
    setTimer(0);
    setTimerOver(false);
  };

  const handleTimerAdjustmentChange = (e) => {
    setTimerAdjustment(parseInt(e.target.value));
  };

  const handleTimerAdjustment = () => {
    setTimer(timer + (timerAdjustment * 60)); // Convert minutes to seconds and adjust timer
  };

  return (
    <div className="container mx-auto p-4 bg-stone-800 text-white rounded-lg shadow-lg">
      <img src="https://www.fitbase.com/blog/wp-content/uploads/2020/08/10-simple-tips-to-improve-your-running-stamina.jpg" alt="Running Stamina" className="w-48 h-auto mb-4 rounded-lg" />
      <div className="mb-4">
        <FaTachometerAlt className="inline mr-2" />
        <span>Stamina: </span>
        {[...Array(5)].map((_, index) => (
          <FaBolt
            key={index}
            className={`inline ${
              index < stamina ? 'text-yellow-500' : 'text-gray-300'
            }`}
          />
        ))}
        {/* Display the stamina rating after the timer is over */}
        {timerOver && <span className="ml-2">Rated: {stamina} Stars</span>}
      </div>
      <div className="mb-4">
        <FaTachometerAlt className="inline mr-2" />
        <span>Lung Capacity: {lungCapacity}</span>
      </div>
      <div className="mb-4">
        <FaTachometerAlt className="inline mr-2" />
        <span>Calories Burnt: {timerOver ? caloriesBurnt : 'N/A'}</span>
      </div>
      <div className="mb-4">
        <label htmlFor="massInput">Enter Your Mass:</label>
        <input
          type="number"
          id="massInput"
          value={mass}
          onChange={(e) => setMass(e.target.value)}
          className="bg-black text-white border border-gray-400 p-1 rounded"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="timerAdjustmentInput">Adjust Timer (minutes):</label>
        <input
          type="number"
          id="timerAdjustmentInput"
          value={timerAdjustment}
          onChange={handleTimerAdjustmentChange}
          className="bg-black text-white border border-gray-400 p-1 rounded"
        />
        <button onClick={handleTimerAdjustment} className="bg-gray-700 text-white py-1 px-4 rounded ml-2">Apply</button>
      </div>
      <button onClick={handleStartTimer} className="bg-gray-700 text-white py-1 px-4 rounded mr-2">Start Timer</button>
      <button onClick={handleReset} className="bg-red-500 text-white py-1 px-4 rounded">Reset Values</button>
      <div>
        <FaTachometerAlt className="inline mr-2" />
        <span>Timer: {timer}</span>
      </div>
    </div>
  );
};

export default FitnessStats;
