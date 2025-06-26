import React from 'react';

const Header = () => {
  return (
    <header className="bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 sticky top-0 z-10">
      <nav className="container mx-auto px-4 py-4">
        <h1 className="text-2xl font-bold text-white">
          📄 PDF Toolkit
        </h1>
      </nav>
    </header>
  );
};

export default Header;