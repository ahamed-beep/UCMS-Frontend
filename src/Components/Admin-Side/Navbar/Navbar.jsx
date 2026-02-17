import React from 'react';

const Navbar = () => {
  return (
    <div className="bg-white shadow-sm border-b sm:px-6  border-gray-200 px-22 md:py-5 py-3">
      <div className="flex items-center justify-between">
        <h1 className="md:text-2xl  font-semibold text-gray-800">
          Admin Dashboard
        </h1>
        <p className="text-gray-600 hidden md:block">
          Welcome, Admin!
        </p>
      </div>
    </div>
  );
};

export default Navbar;