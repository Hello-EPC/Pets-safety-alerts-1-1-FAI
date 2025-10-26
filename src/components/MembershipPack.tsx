import React, { useState } from 'react';

export const MembershipPack: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  
  const packItems = [
    { name: 'Dashboard Sign', image: 'https://d64gsuwffb70l.cloudfront.net/68e23241c09a563eac081f07_1760893119099_2f205359.webp' },
    { name: 'Key Tag', image: 'https://d64gsuwffb70l.cloudfront.net/68e23241c09a563eac081f07_1760893119099_2f205359.webp' },
    { name: 'Fridge Magnet', image: 'https://d64gsuwffb70l.cloudfront.net/68e23241c09a563eac081f07_1760893119099_2f205359.webp' },
    { name: 'Phone Sleeve', image: 'https://d64gsuwffb70l.cloudfront.net/68e23241c09a563eac081f07_1760893119099_2f205359.webp' }
  ];

  return (
    <div className="py-16 bg-gray-50" id="membership">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">Your Membership Pack</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Every member receives a complete emergency kit with QR-enabled materials for instant access to your pet's profile
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {packItems.map((item, i) => (
            <div 
              key={i}
              onClick={() => setSelectedImage(item.image)}
              className="bg-white rounded-xl p-4 shadow-lg hover:shadow-2xl transition-all cursor-pointer hover:-translate-y-2"
            >
              <img src={item.image} alt={item.name} className="w-full h-48 object-contain mb-3" />
              <h3 className="font-bold text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
      {selectedImage && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-6" onClick={() => setSelectedImage(null)}>
          <img src={selectedImage} alt="Enlarged" className="max-w-full max-h-full" />
        </div>
      )}
    </div>
  );
};
