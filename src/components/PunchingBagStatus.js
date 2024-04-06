import React from 'react';
import { GiHeartOrgan } from 'react-icons/gi';
import { FiRefreshCw } from 'react-icons/fi';
import Punching from '../assets/kkkk.jpg';
import Stamina from './Stamina';

const PunchingBagStatus = ({ pressure, handleReset, stamina }) => {
  return (
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
            {/* Add more status here */}
            <div className="flex items-center">
              <FiRefreshCw className="text-xl text-gray-500 cursor-pointer hover:text-gray-700 mr-2" onClick={handleReset} />
              <div className="text-lg text-gray-700 cursor-pointer hover:underline" onClick={handleReset}>Reset</div>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <Stamina stamina={stamina} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PunchingBagStatus;
