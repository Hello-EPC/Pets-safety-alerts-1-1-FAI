import React from 'react';
import { Button } from './Button';
import { Loader2 } from 'lucide-react';

interface CourseCardProps {
  title: string;
  image: string;
  duration: string;
  price: number;
  difficulty: string;
  description: string;
  onEnroll: () => void;
  isEnrolling?: boolean;
}

export const CourseCard: React.FC<CourseCardProps> = ({ 
  title, 
  image, 
  duration, 
  price, 
  difficulty,
  description,
  onEnroll,
  isEnrolling = false
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <img src={image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-5">
        <div className="flex justify-between items-start mb-3">
          <h3 className="font-bold text-lg">{title}</h3>
          <span className="bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
            ${price}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex gap-4 text-sm text-gray-500 mb-4">
          <span>⏱ {duration}</span>
          <span>📊 {difficulty}</span>
        </div>
        <Button onClick={onEnroll} size="sm" className="w-full" disabled={isEnrolling}>
          {isEnrolling ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Enrolling...
            </>
          ) : (
            'Enroll Now'
          )}
        </Button>
      </div>
    </div>
  );
};
