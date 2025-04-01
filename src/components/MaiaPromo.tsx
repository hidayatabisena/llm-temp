import React, { useState } from 'react';
import { X } from 'lucide-react';

const MaiaPromo: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 max-w-[180px] z-50 border border-gray-200">
      <button 
        onClick={() => setIsVisible(false)}
        className="absolute top-1 right-1 text-gray-500 hover:text-gray-700"
        aria-label="Dismiss"
      >
        <X size={14} />
      </button>
      
      <div className="flex flex-col items-center">
        <img 
          src="https://res.cloudinary.com/moyadev/image/upload/v1732762168/maia/FEED_C_wrg3kn.jpg" 
          alt="MAIA" 
          className="w-full h-auto rounded-md mb-2"
        />
        <p className="text-xs text-center">
          Supported by{' '}
          <a 
            href="https://maia.id" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-pink-500 font-medium hover:underline"
          >
            MAIA
          </a>
        </p>
      </div>
    </div>
  );
};

export default MaiaPromo;