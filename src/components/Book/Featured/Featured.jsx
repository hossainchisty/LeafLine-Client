/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';

const Featured = ({ featured, id }) => {
  if (featured) {
    return (
      <div className="absolute top-0 right-0 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold">
        Featured
      </div>
    );
  }
  return null;
};

export default Featured;

