import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import firebase from 'firebase/compat/app';
import 'firebase/compat/database';
import firebaseConfig from '../config/firebaseConfig';

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const ChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dbRef = firebase.database().ref('DHT_11');
        dbRef.on('value', (snapshot) => {
          const data = snapshot.val();
          if (data) {
            setData(data);
          }
        });
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };

    fetchData();

    return () => {
      const dbRef = firebase.database().ref('DHT_11');
      dbRef.off();
    };
  }, []);

  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      const labels = Object.keys(data);
      const temperatureData = labels.map(label => data[label].Temperature);
      const humidityData = labels.map(label => data[label].Humidity);

      const ctx = document.getElementById('myChart');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [{
            label: 'Temperature (°C)',
            data: temperatureData,
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: false
          }, {
            label: 'Humidity (%)',
            data: humidityData,
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          },
          responsive: true,
          maintainAspectRatio: false
        }
      });
    }
  }, [data]);

  return (
    <div className="chart-container" style={{ position: 'relative', width: '80vw', height: '50vh' }}>
      <canvas id="myChart" />
    </div>
  );
}

export default ChartComponent;
