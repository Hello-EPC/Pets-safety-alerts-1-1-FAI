import React from 'react';

export const EmergencyBanner: React.FC = () => {
  const handleCall = () => {
    window.location.href = 'tel:1-800-423-7387';
  };

  return (
    <div className="bg-red-600 text-white py-3 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="text-2xl">🚨</span>
          <span className="font-bold">EMERGENCY HOTLINE:</span>
        </div>
        <button 
          onClick={handleCall}
          className="bg-white text-red-600 px-6 py-2 rounded-lg font-bold hover:bg-gray-100 transition-colors"
        >
          📞 1-800-ICE-PETS (1-800-423-7387)
        </button>
      </div>
    </div>
  );
};
