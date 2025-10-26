import React, { useState } from 'react';
import { Button } from './Button';
import { MembershipOnboarding } from './MembershipOnboarding';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const CTASection: React.FC = () => {
  const [showSignup, setShowSignup] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSignup = () => {
    if (!user) {
      navigate('/login');
    } else {
      setShowSignup(true);
    }
  };

  return (
    <>
      <div className="py-20 bg-gradient-to-r from-yellow-400 to-yellow-500">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
            Protect Your Pet Today
          </h2>
          <p className="text-xl text-black mb-8">
            Join 10,000+ members who trust I.C.E. Pet Alert for emergency pet care
          </p>
          <div className="bg-white rounded-xl p-8 shadow-2xl mb-8">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="text-5xl font-bold text-black">$150</span>
              <span className="text-gray-600">/year</span>
            </div>
            <ul className="text-left max-w-md mx-auto space-y-3 mb-6">
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>24/7 emergency hotline access</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Complete membership pack (sign, tags, magnets)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Unlimited emergency dispatches</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500 font-bold">✓</span>
                <span>Certified sitter network access</span>
              </li>
            </ul>
            <Button onClick={handleSignup} size="lg" className="w-full max-w-md">
              {user ? 'Complete Membership' : 'Start Your Membership'}
            </Button>
          </div>
          <p className="text-black text-sm">
            🔒 Secure payment via Stripe • Cancel anytime • 30-day money-back guarantee
          </p>
        </div>
      </div>
      {showSignup && <MembershipOnboarding onClose={() => setShowSignup(false)} />}
    </>
  );
};