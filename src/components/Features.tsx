import React from 'react';

export const Features: React.FC = () => {
  const features = [
    {
      icon: '🚨',
      title: '24/7 Emergency Hotline',
      description: 'Toll-free number connects you instantly to our dispatch center'
    },
    {
      icon: '📱',
      title: 'QR Badge Access',
      description: 'Instant profile access for first responders and neighbors'
    },
    {
      icon: '⚡',
      title: 'Rapid Response',
      description: 'Certified sitters dispatched within 30 minutes of emergency call'
    },
    {
      icon: '✅',
      title: 'Certified Network',
      description: 'All sitters complete our rigorous training and background checks'
    },
    {
      icon: '💼',
      title: 'Insured & Bonded',
      description: 'Full liability coverage for peace of mind'
    },
    {
      icon: '📋',
      title: 'Complete Pet Profiles',
      description: 'Medical history, vet contacts, dietary needs all in one place'
    },
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'GDPR-compliant data protection with encrypted storage'
    },
    {
      icon: '💳',
      title: 'Simple Pricing',
      description: '$150/year covers unlimited emergency dispatches'
    }
  ];

  return (
    <div id="features" className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-4">
          <span className="text-yellow-400">Why Choose</span> I.C.E. Pet Alert?
        </h2>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Comprehensive emergency pet care designed for real-world emergencies
        </p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div key={i} className="bg-gray-900 rounded-xl p-6 hover:bg-gray-800 transition-colors">
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg mb-2 text-yellow-400">{f.title}</h3>
              <p className="text-gray-400 text-sm">{f.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
