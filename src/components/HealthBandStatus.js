import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FaTemperatureHigh, FaHeartbeat, FaLungs } from 'react-icons/fa';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const FirebaseDetailsComponent = () => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    // Reference to Firebase Realtime Database
    const dbRef = firebase.database().ref();

    // Fetch data from Firebase
    const fetchData = async () => {
      try {
        const snapshot = await dbRef.once('value');
        const data = snapshot.val();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching data from Firebase:', error);
      }
    };

    fetchData();

    // Clean up function
    return () => {
      dbRef.off(); // Stop listening to changes
    };
  }, []);

  const handleReset = () => {
    setDetails(null);
  };

  return (
    <div className="max-w-xs bg-stone-800 rounded-lg shadow-lg p-6">
      <img src="https://media.licdn.com/dms/image/C5112AQHKVALHNez1dA/article-cover_image-shrink_720_1280/0/1524341779139?e=2147483647&v=beta&t=InTu-mn4CGeg4jdgIw5N-2CRmPgHkmUiEpErQ-OgPdY" alt="Health Details" className="rounded-t-lg" />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-4 text-white">Health Details</h2>
        {details && (
          <div>
            <div className="flex items-center mb-2">
              <FaTemperatureHigh className="text-blue-500 mr-2" />
              <p className="text-white-700">Body Temperature: {details.DHT && details.DHT.temperature}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaHeartbeat className="text-red-500 mr-2" />
              <p className="text-white-700">Heart Rate IR: {details.HeartRate && details.HeartRate.IR}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaHeartbeat className="text-red-500 mr-2" />
              <p className="text-white-700">Heart Rate BPM: {details.HeartRate && details.HeartRate.BPM}</p>
            </div>
            <div className="flex items-center mb-2">
              <FaLungs className="text-green-500 mr-2" />
              <p className="text-white-700">Body Oxygen: {details.body && details.body.oxygen}</p>
            </div>
          </div>
        )}
        <button onClick={handleReset} className="bg-red-500 text-white font-bold py-2 px-4 rounded mt-4">Reset Values</button>
      </div>
    </div>
  );
};

export default FirebaseDetailsComponent;
