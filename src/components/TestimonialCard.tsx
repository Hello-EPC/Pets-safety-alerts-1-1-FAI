import React from 'react';

interface TestimonialCardProps {
  name: string;
  petName: string;
  image: string;
  text: string;
  location: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({ 
  name, 
  petName, 
  image, 
  text, 
  location 
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-4">
        <img 
          src={image} 
          alt={petName} 
          className="w-16 h-16 rounded-full object-cover border-4 border-yellow-400"
        />
        <div>
          <h4 className="font-bold text-lg">{name}</h4>
          <p className="text-gray-600 text-sm">{petName} • {location}</p>
        </div>
      </div>
      <p className="text-gray-700 italic">"{text}"</p>
      <div className="flex gap-1 mt-3">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="text-yellow-400 text-xl">★</span>
        ))}
      </div>
    </div>
  );
};
