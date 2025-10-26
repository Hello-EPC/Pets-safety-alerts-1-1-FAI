import React from 'react';
import { LoginForm } from '@/components/LoginForm';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function Login() {
  const navigate = useNavigate();
  const { profile } = useAuth();

  const handleSuccess = () => {
    // Redirect based on user role
    if (profile?.role === 'admin') {
      navigate('/admin');
    } else if (profile?.role === 'sitter') {
      navigate('/sitter-dashboard');
    } else {
      navigate('/member-dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 w-full h-full bg-pattern opacity-5"></div>
      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-2xl mb-4">
            I.C.E. PET ALERT
          </div>
          <p className="text-gray-600">Emergency Pet Care Network</p>
        </div>
        <LoginForm onSuccess={handleSuccess} />
      </div>
    </div>
  );
}