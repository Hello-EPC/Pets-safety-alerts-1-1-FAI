import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navigation } from './Navigation';
import { EmergencyBanner } from './EmergencyBanner';
import { Hero } from './Hero';
import { Features } from './Features';
import { MembershipPack } from './MembershipPack';
import { Testimonials } from './Testimonials';
import { TrainingCourses } from './TrainingCourses';
import { SitterNetwork } from './SitterNetwork';
import { CTASection } from './CTASection';
import { Footer } from './Footer';
import { MembershipOnboarding } from './MembershipOnboarding';
import { MemberDashboard } from './MemberDashboard';
import { SitterDashboard } from './SitterDashboard';
import { AdminPanel } from './AdminPanel';
import { LoginForm } from './LoginForm';
import { useAuth } from '@/contexts/AuthContext';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Shield, UserCheck, User, AlertCircle } from 'lucide-react';

const AppLayout: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [showSignupModal, setShowSignupModal] = useState(false);
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const handleViewChange = (view: string) => {
    // Check authentication for protected routes
    if (!user && ['member-dashboard', 'sitter-dashboard', 'admin', 'profile', 'emergency-dispatch'].includes(view)) {
      setCurrentView('login');
      return;
    }


    // Check role-based access
    if (user && profile) {
      if ((view === 'admin' || view === 'emergency-dispatch') && profile.role !== 'admin') {
        alert('Access denied. Admin privileges required.');
        return;
      }
      if (view === 'sitter-dashboard' && profile.role !== 'sitter') {
        alert('Access denied. Sitter account required.');
        return;
      }
      if (view === 'member-dashboard' && profile.role !== 'member') {
        alert('Access denied. Member account required.');
        return;
      }
    }


    setCurrentView(view);
  };

  const handleLoginSuccess = () => {
    // Redirect based on user role after login
    if (profile?.role === 'admin') {
      setCurrentView('admin');
    } else if (profile?.role === 'sitter') {
      setCurrentView('sitter-dashboard');
    } else {
      setCurrentView('member-dashboard');
    }
  };

  const renderView = () => {
    switch(currentView) {
      case 'login':
        return (
          <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-gray-100 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
              <div className="text-center mb-8">
                <div className="inline-block bg-yellow-400 text-black px-6 py-3 rounded-lg font-bold text-2xl mb-4">
                  I.C.E. PET ALERT
                </div>
                <p className="text-gray-600">Emergency Pet Care Network</p>
              </div>
              <LoginForm onSuccess={handleLoginSuccess} />
            </div>
          </div>
        );
      
      case 'member-dashboard':
        if (!user || profile?.role !== 'member') {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Alert className="max-w-md">
                <User className="h-4 w-4" />
                <AlertDescription>
                  Please log in with a member account to access this dashboard.
                </AlertDescription>
              </Alert>
            </div>
          );
        }
        return <MemberDashboard />;
      
      case 'sitter-dashboard':
        if (!user || profile?.role !== 'sitter') {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Alert className="max-w-md">
                <UserCheck className="h-4 w-4" />
                <AlertDescription>
                  Please log in with a sitter account to access this dashboard.
                </AlertDescription>
              </Alert>
            </div>
          );
        }
        return <SitterDashboard />;
      
      case 'admin':
        if (!user || profile?.role !== 'admin') {
          return (
            <div className="min-h-screen flex items-center justify-center">
              <Alert className="max-w-md">
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Admin privileges required to access this panel.
                </AlertDescription>
              </Alert>
            </div>
          );
        }
        return <AdminPanel />;
      
      case 'sitters':
        return <SitterNetwork />;
      
      case 'profile':
        if (!user) {
          setCurrentView('login');
          return null;
        }
        return (
          <div className="min-h-screen bg-gray-50 py-12">
            <div className="max-w-4xl mx-auto px-6">
              <h1 className="text-3xl font-bold mb-8">Profile Settings</h1>
              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700">Email</label>
                    <p className="mt-1 text-lg">{user.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Full Name</label>
                    <p className="mt-1 text-lg">{profile?.full_name || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Account Type</label>
                    <p className="mt-1 text-lg capitalize">{profile?.role}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Phone</label>
                    <p className="mt-1 text-lg">{profile?.phone || 'Not set'}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700">Member Since</label>
                    <p className="mt-1 text-lg">
                      {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      
      default:
        return (
          <>
            <EmergencyBanner />
            <Hero />
            <Features />
            <MembershipPack />
            <Testimonials />
            <TrainingCourses />
            <SitterNetwork />
            <CTASection />
            <Footer onViewChange={handleViewChange} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navigation 
        currentView={currentView} 
        onViewChange={handleViewChange}
        onOpenSignup={() => setShowSignupModal(true)}
      />
      {renderView()}
      {showSignupModal && (
        <MembershipOnboarding onClose={() => setShowSignupModal(false)} />
      )}
    </div>
  );
};

export default AppLayout;