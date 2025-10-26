import React, { useState } from 'react';
import { Button } from './Button';
import { MembershipOnboarding } from './MembershipOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const Hero: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleProtectPet = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowSignup(true);
    }
  };

  const scrollToSitters = () => {
    document.getElementById('sitters')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative h-[600px] flex items-center justify-center text-center">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://d64gsuwffb70l.cloudfront.net/68f518c8d90db437e88eb49a_1760893189199_f1e67d46.webp)',
            filter: 'brightness(0.4)'
          }}
        />
        <div className="relative z-10 max-w-4xl px-6">
          <div className="bg-yellow-400 text-black inline-block px-6 py-3 rounded-lg mb-6 font-bold text-xl animate-pulse">
            🚨 I.C.E. PET ALERT
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            RAPID RESPONSE<br />PETSITTERS
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl mx-auto">
            Emergency pet care when you need it most. 24/7 certified sitters, instant QR access, toll-free emergency line.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button onClick={handleProtectPet} size="lg">
              Protect My Pet - $150/year
            </Button>
            <Button onClick={scrollToSitters} variant="outline" size="lg">
              Become a Certified Sitter
            </Button>
          </div>
        </div>
      </div>
      {showSignup && <MembershipOnboarding onClose={() => setShowSignup(false)} />}
    </>
  );
};