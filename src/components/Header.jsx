import React from 'react';

const Header = () => {
  return (
    <header className="p-4 bg-white text-black flex justify-between items-center">
      <div className="flex items-center">
        <img
          src="https://cdn3d.iconscout.com/3d/free/thumb/free-book-4573596-3802605.png"
          alt="LeafLink Logo"
          className="h-9 w-9"
        />
        <h1 className="text-3xl font-extrabold">LeafLine</h1>
      </div>
      <div className="flex items-center">
        <input
          type="text"
          placeholder="Search books..."
          className="bg-gray-200 border border-gray-300 rounded-full pl-6 pr-4 py-2 focus:outline-none focus:bg-white text-black"
        />
        {/* You can add your dark mode toggle button here if needed */}
      </div>
    </header>
  );
};

export default Header;
