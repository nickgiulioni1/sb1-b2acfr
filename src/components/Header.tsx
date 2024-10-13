import React from 'react';
import { Dog } from 'lucide-react';

interface HeaderProps {
  children: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({ children }) => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Dog size={32} className="text-blue-500 mr-2" />
          <div>
            <h1 className="text-2xl font-bold">Off Leash Construction</h1>
            <h2 className="text-lg">Real Estate Investment Calculator</h2>
          </div>
        </div>
        {children}
      </div>
    </header>
  );
};

export default Header;