import React from 'react';
import { Button } from './Button';

interface SitterCardProps {
  name: string;
  image: string;
  certifications: string[];
  rating: number;
  location: string;
  available: boolean;
  onContact: () => void;
}

export const SitterCard: React.FC<SitterCardProps> = ({ 
  name, 
  image, 
  certifications, 
  rating, 
  location,
  available,
  onContact
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
      <div className="relative">
        <img src={image} alt={name} className="w-full h-64 object-cover" />
        {available && (
          <span className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
            Available
          </span>
        )}
      </div>
      <div className="p-5">
        <h3 className="font-bold text-xl mb-1">{name}</h3>
        <p className="text-gray-600 text-sm mb-3">📍 {location}</p>
        <div className="flex items-center gap-2 mb-3">
          <span className="text-yellow-400">★</span>
          <span className="font-bold">{rating}</span>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          {certifications.map((cert, i) => (
            <span key={i} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
              {cert}
            </span>
          ))}
        </div>
        <Button onClick={onContact} size="sm" className="w-full">
          Contact Sitter
        </Button>
      </div>
    </div>
  );
};
