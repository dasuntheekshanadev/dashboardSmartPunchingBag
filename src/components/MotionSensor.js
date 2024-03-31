import React, { useEffect, useState } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const MotionSensor = () => {
  const [motionDetected, setMotionDetected] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = firebase.database().ref('PIR/Motion');
        dbRef.on('value', (snapshot) => {
          const motionValue = snapshot.val();
          setMotionDetected(motionValue === 1); // Assuming 1 indicates motion detected
          setLoading(false);
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      // Cleanup function to remove the listener when component unmounts
      const dbRef = firebase.database().ref('PIR/Motion');
      dbRef.off();
    };
  }, []);

  return (
    <div className="border border-gray-300 rounded-md p-5 max-w-md mx-auto">
      <h2 className="text-xl font-semibold mb-4">Motion Sensor</h2>
      {loading ? (
        <div className="text-center">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <div>
          {motionDetected ? (
            <div className="text-red-500 animate-pulse">
              <p>Motion Detected</p>
              {/* Additional UI elements or actions related to motion detection */}
            </div>
          ) : (
            <p className="text-gray-500">No Motion Detected</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MotionSensor;
