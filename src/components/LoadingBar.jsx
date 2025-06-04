import React from 'react';

const LoadingBar = ({ text = "Uploading, please wait..." }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
      <div className="flex flex-col gap-2">
        <div className="text-center text-gray-700 mb-2">{text}</div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div className="loading-progress h-2.5 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingBar; 