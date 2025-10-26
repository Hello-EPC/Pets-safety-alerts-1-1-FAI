import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { MapPin, Navigation } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SitterLocationTracker() {
  const { user } = useAuth();
  const [isAvailable, setIsAvailable] = useState(false);
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    loadLocationStatus();
  }, [user]);

  useEffect(() => {
    let watchId: number;
    if (tracking && navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const newLoc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
          setLocation(newLoc);
          updateLocation(newLoc);
        },
        (error) => console.error('Location error:', error),
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 27000 }
      );
    }
    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, [tracking]);

  const loadLocationStatus = async () => {
    if (!user) return;
    const { data } = await supabase
      .from('sitter_locations')
      .select('*')
      .eq('sitter_id', user.id)
      .single();
    
    if (data) {
      setIsAvailable(data.is_available);
      setTracking(data.is_available);
      setLocation({ lat: parseFloat(data.latitude), lng: parseFloat(data.longitude) });
    }
  };

  const updateLocation = async (loc: { lat: number; lng: number }) => {
    if (!user) return;
    await supabase.from('sitter_locations').upsert({
      sitter_id: user.id,
      latitude: loc.lat,
      longitude: loc.lng,
      is_available: isAvailable,
      last_updated: new Date().toISOString()
    });
  };

  const toggleAvailability = async (available: boolean) => {
    setIsAvailable(available);
    setTracking(available);
    
    if (available && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setLocation(loc);
        updateLocation(loc);
      });
    } else if (user) {
      await supabase
        .from('sitter_locations')
        .update({ is_available: false })
        .eq('sitter_id', user.id);
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
        <Navigation />
        Location Tracking
      </h3>
      
      <div className="flex items-center justify-between mb-4">
        <span className="font-semibold">Available for Emergencies</span>
        <Switch checked={isAvailable} onCheckedChange={toggleAvailability} />
      </div>

      {location && tracking && (
        <div className="p-3 bg-green-50 rounded-lg">
          <p className="text-sm flex items-center gap-2 text-green-700">
            <MapPin size={16} />
            Location tracking active
          </p>
          <p className="text-xs text-gray-600 mt-1">
            Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
          </p>
        </div>
      )}

      {!tracking && (
        <p className="text-sm text-gray-500">
          Enable availability to start location tracking
        </p>
      )}
    </Card>
  );
}
