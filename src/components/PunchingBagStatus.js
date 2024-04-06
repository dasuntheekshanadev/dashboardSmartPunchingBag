import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import { FaTachometerAlt, FaBolt } from 'react-icons/fa';
import firebaseConfig from '../config/firebaseConfig';

// Initialize Firebase if not already initialized
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const SmartPunchingBag = () => {
  // State to hold punch data retrieved from Firebase
  const [punchData, setPunchData] = useState(null);

  useEffect(() => {
    // Reference to Firebase Realtime Database
    const dbRef = firebase.database().ref('punch');

    // Function to fetch data from Firebase
    const fetchData = async () => {
      try {
        // Fetch data once from Firebase
        const snapshot = await dbRef.once('value');
        // Extract data from snapshot
        const data = snapshot.val();
        // Update punchData state with fetched data
        setPunchData(data);
      } catch (error) {
        console.error('Error fetching punch data from Firebase:', error);
      }
    };

    fetchData(); // Call the fetch data function when component mounts

    // Cleanup function to stop listening to changes when component unmounts
    return () => {
      dbRef.off(); // Stop listening to changes
    };
  }, []); // Dependency array to ensure effect runs only once after initial render

  return (
    <div className="max-w-xs bg-stone-800 rounded-lg shadow-lg p-6">
      <img src="https://contents.mediadecathlon.com/p2420976/k$a538e5f56ce939fb34919280e76ceada/punching-bag-14-kg-red-outshock-8651245.jpg" alt="Smart Punching Bag" className="rounded-t-lg" />
      <div className="p-4">
        {/* Heading for the card */}
        <h2 className="text-xl font-bold mb-4 text-white">Smart Punching Bag</h2>
        {/* Render punch data if available */}
        {punchData && (
          <div>
            {/* Display speed with an icon */}
            <div className="flex items-center mb-2">
              <FaTachometerAlt className="text-blue-500 mr-2" />
              <p className="text-white">Speed: {punchData.speed}</p>
            </div>
            {/* Display punching power with an icon */}
            <div className="flex items-center mb-2">
              <FaBolt className="text-yellow-500 mr-2" />
              <p className="text-white">Punching Power: {punchData.power}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SmartPunchingBag;
