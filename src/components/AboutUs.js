import React from 'react';
import dinithiImage from '../assets/dinithi.jpg';
import sithuminiImage from '../assets/hewa.jpg';
import wijesekaraImage from '../assets/jayaweera.jpg';
import bandaraImage from '../assets/navod.jpg';
import aponsuImage from '../assets/tharuka.jpg';
import rajakarunaImage from '../assets/yeshan.jpg';

const AboutUs = () => {
  // Define team members data with imported image variables
  const teamMembers = [
    { name: 'Dinithi Nimesha', image: dinithiImage },
    { name: 'Sarathchandra Hewa', image: sithuminiImage },
    { name: 'Muhandiramge Jayaweera', image: wijesekaraImage}, 
    { name: 'Navod Wijethunga', image: bandaraImage },
    { name: 'Tharuka Muthukuda', image: aponsuImage},
    { name: 'Yeshan Ruwinda', image: rajakarunaImage}
  ];

  return (
    <div className="bg-gradient-to-r from-gray-600 to-blue-900 min-h-screen flex flex-col text-white">
      <h1 className="text-2xl font-bold p-4">Meet Our Team</h1>
      <p className="font-bold text-2xl text-center text-gray-200 px-6 py-4">
      We are an innovative team of developers embarking on an exciting project for our university's Internet of Things (IoT) module - the Smart Punching Bag. Our goal is to revolutionize the fitness industry by integrating IoT technology into traditional workout equipment.
      </p>
      <div className="flex-grow flex justify-center items-center flex-wrap">
        {teamMembers.map((member, index) => (
          <div key={index} className="flex flex-col items-center mx-4 mb-4">
            <img src={member.image} alt={member.name} className="w-40 h-40 object-cover rounded-full shadow-lg mb-2" />
            <p className="text-white-800 text-lg font-semibold">{member.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutUs;
