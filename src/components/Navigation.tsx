import React, { useState } from 'react';
import { Button } from './Button';
import { useAuth } from '@/contexts/AuthContext';
import { User, LogOut, Shield, Home, Users, UserCheck } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface NavigationProps {
  currentView: string;
  onViewChange: (view: string) => void;
  onOpenSignup: () => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange, onOpenSignup }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, profile, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onViewChange('home');
  };

  const handleNavigation = (view: string) => {
    onViewChange(view);
    setMobileMenuOpen(false);
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="bg-black text-white shadow-lg sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <button 
            onClick={() => handleNavigation('home')}
            className="flex items-center gap-3"
          >
            <div className="bg-yellow-400 text-black px-4 py-2 rounded-lg font-bold text-lg">
              I.C.E. PET ALERT
            </div>
          </button>

          <div className="hidden md:flex items-center gap-6">
            <button 
              onClick={() => handleNavigation('home')} 
              className={`hover:text-yellow-400 transition-colors ${currentView === 'home' ? 'text-yellow-400 font-bold' : ''}`}
            >
              <Home className="inline-block w-4 h-4 mr-1" />
              Home
            </button>
            
            {user && profile?.role === 'member' && (
              <button 
                onClick={() => handleNavigation('member-dashboard')} 
                className={`hover:text-yellow-400 transition-colors ${currentView === 'member-dashboard' ? 'text-yellow-400 font-bold' : ''}`}
              >
                <User className="inline-block w-4 h-4 mr-1" />
                My Dashboard
              </button>
            )}
            
            {user && profile?.role === 'sitter' && (
              <button 
                onClick={() => handleNavigation('sitter-dashboard')} 
                className={`hover:text-yellow-400 transition-colors ${currentView === 'sitter-dashboard' ? 'text-yellow-400 font-bold' : ''}`}
              >
                <UserCheck className="inline-block w-4 h-4 mr-1" />
                Sitter Portal
              </button>
            )}
            
            {user && profile?.role === 'admin' && (
              <>
                <button 
                  onClick={() => handleNavigation('admin')} 
                  className={`hover:text-yellow-400 transition-colors ${currentView === 'admin' ? 'text-yellow-400 font-bold' : ''}`}
                >
                  <Shield className="inline-block w-4 h-4 mr-1" />
                  Admin Panel
                </button>
                <button 
                  onClick={() => handleNavigation('emergency-dispatch')} 
                  className={`hover:text-yellow-400 transition-colors ${currentView === 'emergency-dispatch' ? 'text-yellow-400 font-bold' : ''}`}
                >
                  🚨 Emergency Dispatch
                </button>
              </>
            )}


            <button 
              onClick={() => handleNavigation('sitters')} 
              className={`hover:text-yellow-400 transition-colors ${currentView === 'sitters' ? 'text-yellow-400 font-bold' : ''}`}
            >
              <Users className="inline-block w-4 h-4 mr-1" />
              Find Sitters
            </button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback className="bg-yellow-400 text-black">
                        {profile?.full_name ? getInitials(profile.full_name) : 'U'}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end">
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{profile?.full_name || 'User'}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                      <p className="text-xs text-yellow-600 font-semibold uppercase">{profile?.role}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => handleNavigation('profile')}>
                    <User className="mr-2 h-4 w-4" />
                    Profile Settings
                  </DropdownMenuItem>
                  {profile?.role === 'member' && (
                    <DropdownMenuItem onClick={() => handleNavigation('member-dashboard')}>
                      My Dashboard
                    </DropdownMenuItem>
                  )}
                  {profile?.role === 'sitter' && (
                    <DropdownMenuItem onClick={() => handleNavigation('sitter-dashboard')}>
                      Sitter Portal
                    </DropdownMenuItem>
                  )}
                  {profile?.role === 'admin' && (
                    <DropdownMenuItem onClick={() => handleNavigation('admin')}>
                      Admin Panel
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="flex gap-2">
                <Button 
                  onClick={() => handleNavigation('login')} 
                  variant="ghost"
                  size="sm"
                  className="text-white hover:text-yellow-400"
                >
                  Login
                </Button>
                <Button onClick={onOpenSignup} size="sm">
                  Join Now
                </Button>
              </div>
            )}
          </div>

          <button 
            className="md:hidden text-2xl"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            ☰
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 space-y-3 border-t border-gray-800 pt-4">
            <button onClick={() => handleNavigation('home')} className="block w-full text-left py-2 hover:text-yellow-400">
              <Home className="inline-block w-4 h-4 mr-2" />
              Home
            </button>
            
            {user && profile?.role === 'member' && (
              <button onClick={() => handleNavigation('member-dashboard')} className="block w-full text-left py-2 hover:text-yellow-400">
                <User className="inline-block w-4 h-4 mr-2" />
                My Dashboard
              </button>
            )}
            
            {user && profile?.role === 'sitter' && (
              <button onClick={() => handleNavigation('sitter-dashboard')} className="block w-full text-left py-2 hover:text-yellow-400">
                <UserCheck className="inline-block w-4 h-4 mr-2" />
                Sitter Portal
              </button>
            )}
            
            {user && profile?.role === 'admin' && (
              <button onClick={() => handleNavigation('admin')} className="block w-full text-left py-2 hover:text-yellow-400">
                <Shield className="inline-block w-4 h-4 mr-2" />
                Admin Panel
              </button>
            )}

            <button onClick={() => handleNavigation('sitters')} className="block w-full text-left py-2 hover:text-yellow-400">
              <Users className="inline-block w-4 h-4 mr-2" />
              Find Sitters
            </button>

            {user ? (
              <>
                <div className="border-t border-gray-800 pt-3 mt-3">
                  <div className="px-2 py-2 text-sm text-gray-400">
                    {profile?.full_name || 'User'} ({profile?.role})
                  </div>
                  <button onClick={() => handleNavigation('profile')} className="block w-full text-left py-2 hover:text-yellow-400">
                    Profile Settings
                  </button>
                  <button onClick={handleSignOut} className="block w-full text-left py-2 hover:text-yellow-400">
                    <LogOut className="inline-block w-4 h-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </>
            ) : (
              <div className="border-t border-gray-800 pt-3 mt-3 space-y-2">
                <Button onClick={() => handleNavigation('login')} variant="ghost" className="w-full">
                  Login
                </Button>
                <Button onClick={onOpenSignup} className="w-full">
                  Join Now
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};