import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface FooterProps {
  onViewChange?: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onViewChange }) => {
  const navigate = useNavigate();
  const { user, profile } = useAuth();

  const handleNavigation = (path: string) => {
    if (onViewChange) {
      onViewChange(path);
    } else if (path.startsWith('/')) {
      navigate(path);
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="bg-yellow-400 text-black inline-block px-4 py-2 rounded-lg mb-4 font-bold">
              I.C.E. PET ALERT
            </div>
            <p className="text-gray-400 text-sm mb-4">
              24/7 emergency pet care protection for peace of mind
            </p>
            <div className="text-2xl font-bold text-yellow-400">
              1-800-ICE-PETS
            </div>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">For Members</h4>
            <ul className="space-y-2 text-sm">
              {user && profile?.role === 'member' ? (
                <>
                  <li><button onClick={() => handleNavigation('member-dashboard')} className="hover:text-yellow-400">Member Dashboard</button></li>
                  <li><button onClick={() => handleNavigation('profile')} className="hover:text-yellow-400">Update Profile</button></li>
                </>
              ) : (
                <li><button onClick={() => handleNavigation('/login')} className="hover:text-yellow-400">Member Login</button></li>
              )}
              <li><button onClick={() => scrollToSection('features')} className="hover:text-yellow-400">Emergency Protocol</button></li>
              <li><button onClick={() => scrollToSection('membership')} className="hover:text-yellow-400">Membership Benefits</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">For Sitters</h4>
            <ul className="space-y-2 text-sm">
              {user && profile?.role === 'sitter' ? (
                <li><button onClick={() => handleNavigation('sitter-dashboard')} className="hover:text-yellow-400">Sitter Dashboard</button></li>
              ) : (
                <li><button onClick={() => handleNavigation('/login')} className="hover:text-yellow-400">Sitter Login</button></li>
              )}
              <li><button onClick={() => scrollToSection('training')} className="hover:text-yellow-400">Training Courses</button></li>
              <li><button onClick={() => scrollToSection('sitters')} className="hover:text-yellow-400">Join Network</button></li>
              <li><button onClick={() => scrollToSection('testimonials')} className="hover:text-yellow-400">Success Stories</button></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4 text-yellow-400">Company</h4>
            <ul className="space-y-2 text-sm">
              <li><button onClick={() => scrollToSection('features')} className="hover:text-yellow-400">About Us</button></li>
              <li><a href="mailto:support@icepet.com" className="hover:text-yellow-400">Contact</a></li>
              <li><button onClick={() => alert('Privacy Policy page would open here')} className="hover:text-yellow-400">Privacy Policy</button></li>
              <li><button onClick={() => alert('Terms of Service page would open here')} className="hover:text-yellow-400">Terms of Service</button></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2025 I.C.E. Pet Alert. All rights reserved. | GDPR Compliant | Insured & Bonded</p>
        </div>
      </div>
    </footer>
  );
};