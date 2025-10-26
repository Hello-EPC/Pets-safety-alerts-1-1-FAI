import React, { useState } from 'react';
import { SitterCard } from './SitterCard';

export const SitterNetwork: React.FC = () => {
  const [location, setLocation] = useState('');
  
  const sitters = [
    { name: 'Jessica Martinez', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893200176_c0a867e1.webp', certifications: ['CPR', 'First Aid', 'Behavior'], rating: 4.9, location: 'Austin, TX', available: true },
    { name: 'Amanda Johnson', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893201897_82fd08cd.webp', certifications: ['CPR', 'Medical Admin'], rating: 4.8, location: 'Seattle, WA', available: true },
    { name: 'Rachel Kim', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893203650_cc202942.webp', certifications: ['First Aid', 'Transport'], rating: 5.0, location: 'Miami, FL', available: false },
    { name: 'Lauren Davis', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893205349_bf89a85b.webp', certifications: ['CPR', 'Advanced Life Support'], rating: 4.9, location: 'Denver, CO', available: true },
    { name: 'Sophia Brown', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893207325_fcfdd21f.webp', certifications: ['Behavior', 'Communication'], rating: 4.7, location: 'Boston, MA', available: true },
    { name: 'Emma Wilson', image: 'https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893209093_9a084be3.webp', certifications: ['CPR', 'First Aid', 'Medical Admin'], rating: 5.0, location: 'Portland, OR', available: true }
  ];

  const filtered = location ? sitters.filter(s => s.location.toLowerCase().includes(location.toLowerCase())) : sitters;

  // Import your toast hook at the top of the file:
  // import { useToast } from '@/hooks/useToast';

  // Uncomment the line above and use the toast below if you have a toast system.
  // Otherwise, replace with your actual notification logic.

  // const { showToast } = useToast();

  const handleContact = (name: string) => {
    // showToast({
    //   title: `Contacting ${name}`,
    //   description: 'Messaging system would open here.',
    //   status: 'info',
    // });
    // Placeholder: Remove alert in production, use toast or modal instead.
    console.info(`Contacting ${name}... Messaging system would open here.`);
  };

  return (
    <div className="py-16 bg-white" id="sitters">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Our Certified Sitter Network</h2>
        <p className="text-center text-gray-600 mb-8">Trusted professionals ready for emergency response</p>
        <div className="max-w-md mx-auto mb-12">
          <input type="text" placeholder="Search by location..." value={location} onChange={(e) => setLocation(e.target.value)} className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-yellow-400 outline-none" />
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((s, i) => (
            <SitterCard key={i} {...s} onContact={() => handleContact(s.name)} />
          ))}
        </div>
      </div>
    </div>
  );
};
