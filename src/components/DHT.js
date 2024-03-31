import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const DHT = () => {
  const [temperature, setTemperature] = useState(null);
  const [humidity, setHumidity] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = firebase.database().ref('DHT');
        dbRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setTemperature(data.Temperature);
            setHumidity(data.Humidity);
          }
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to remove the listener when component unmounts
      const dbRef = firebase.database().ref('DHT');
      dbRef.off();
    };
  }, []);

  return (
    <div>
      <label htmlFor="temperature" className="text-lg">Temperature: {temperature}°C</label>
      <progress id="temperature" value={temperature} max="100" className="w-full h-4 mt-1 rounded-full bg-blue-800">
        <div className="progress-bar bg-blue-500 h-full rounded-full"></div>
      </progress>
      <label htmlFor="humidity" className="text-lg">Humidity: {humidity}%</label>
      <progress id="humidity" value={humidity} max="100" className="w-full h-4 mt-1 rounded-full bg-blue-800">
        <div className="progress-bar bg-blue-500 h-full rounded-full"></div>
      </progress>
    </div>
  );
}

export default DHT;
