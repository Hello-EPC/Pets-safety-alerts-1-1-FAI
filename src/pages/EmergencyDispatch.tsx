import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';
import DispatchDashboard from '@/components/DispatchDashboard';
import SimpleNavigation from '@/components/SimpleNavigation';
import Footer from '@/components/Footer';


export default function EmergencyDispatch() {
  const { user, profile } = useAuth();

  if (!user || profile?.role !== 'admin') {
    return <Navigate to="/login" />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <SimpleNavigation />
      <main className="flex-1 py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold mb-8">Emergency Dispatch Center</h1>
          <DispatchDashboard />
        </div>
      </main>
    </div>
  );
}

