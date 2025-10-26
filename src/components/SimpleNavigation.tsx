import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Home, Shield, User } from 'lucide-react';

export default function SimpleNavigation() {
  const { user, profile, signOut } = useAuth();

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center gap-3">
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-lg">
              I.C.E. PET ALERT
            </div>
          </Link>

          <div className="flex items-center gap-6">
            <Link to="/" className="hover:text-yellow-400 transition-colors">
              <Home className="inline-block w-4 h-4 mr-1" />
              Home
            </Link>
            
            {user && profile?.role === 'admin' && (
              <Link to="/emergency-dispatch" className="hover:text-yellow-400 transition-colors">
                🚨 Emergency Dispatch
              </Link>
            )}

            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-300">{profile?.full_name}</span>
                <Button onClick={signOut} variant="outline" size="sm">
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link to="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
