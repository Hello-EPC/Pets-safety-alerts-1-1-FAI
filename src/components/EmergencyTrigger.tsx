import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, MapPin } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

export default function EmergencyTrigger() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [pets, setPets] = useState<any[]>([]);
  const [selectedPet, setSelectedPet] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadPets();
    getLocation();
  }, [user]);

  const loadPets = async () => {
    if (!user) return;
    const { data } = await supabase.from('pets').select('*').eq('user_id', user.id);
    setPets(data || []);
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
      });
    }
  };

  const triggerEmergency = async (type: string, severity: string) => {
    if (!selectedPet || !location) return;
    setLoading(true);

    const { data: alert } = await supabase.from('emergency_alerts').insert({
      user_id: user?.id,
      pet_id: selectedPet,
      emergency_type: type,
      severity,
      location_lat: location.lat,
      location_lng: location.lng,
      status: 'pending'
    }).select().single();

    await supabase.from('emergency_timeline').insert({
      alert_id: alert.id,
      event_type: 'created',
      description: `Emergency alert created: ${type}`,
      user_id: user?.id
    });

    setLoading(false);
    toast({
      title: 'Emergency alert sent!',
      description: 'Your emergency alert has been submitted and dispatch is being notified.'
    });
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <AlertCircle className="text-red-500" />
        Emergency Alert
      </h2>
      
      <select value={selectedPet} onChange={(e) => setSelectedPet(e.target.value)} className="w-full p-2 border rounded mb-4">
        <option value="">Select Pet</option>
        {pets.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => triggerEmergency('lost', 'high')} disabled={!selectedPet || loading} variant="destructive">
          Lost Pet
        </Button>
        <Button onClick={() => triggerEmergency('injury', 'critical')} disabled={!selectedPet || loading} variant="destructive">
          Injury
        </Button>
        <Button onClick={() => triggerEmergency('illness', 'high')} disabled={!selectedPet || loading} variant="destructive">
          Sudden Illness
        </Button>
        <Button onClick={() => triggerEmergency('behavior', 'medium')} disabled={!selectedPet || loading}>
          Behavior Issue
        </Button>
      </div>

      {location && (
        <p className="text-sm text-gray-500 mt-4 flex items-center gap-1">
          <MapPin size={16} /> Location detected
        </p>
      )}
    </Card>
  );
}
