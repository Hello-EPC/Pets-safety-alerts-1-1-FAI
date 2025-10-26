import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Bell, MapPin, Phone } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function SitterAlertPanel() {
  const { user } = useAuth();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [responding, setResponding] = useState<string | null>(null);

  useEffect(() => {
    loadAlerts();
    const subscription = supabase
      .channel('sitter_alerts')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'emergency_alerts' }, loadAlerts)
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }, []);

  const loadAlerts = async () => {
    const { data } = await supabase
      .from('emergency_alerts')
      .select('*, pets(*), profiles(*)')
      .in('status', ['pending', 'assigned'])
      .order('created_at', { ascending: false });
    setAlerts(data || []);
  };

  const respondToAlert = async (alertId: string, responseType: string, eta?: number) => {
    setResponding(alertId);
    await supabase.from('emergency_responses').insert({
      alert_id: alertId,
      sitter_id: user?.id,
      response_type: responseType,
      eta_minutes: eta
    });

    await supabase.from('emergency_timeline').insert({
      alert_id: alertId,
      event_type: 'response',
      description: `Sitter ${responseType === 'accept' ? 'accepted' : 'declined'} alert`,
      user_id: user?.id
    });

    setResponding(null);
    loadAlerts();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold flex items-center gap-2">
        <Bell className="text-red-500" />
        Emergency Alerts
      </h2>
      
      {alerts.length === 0 && (
        <Card className="p-6 text-center text-gray-500">
          No active emergencies
        </Card>
      )}

      {alerts.map(alert => (
        <Card key={alert.id} className="p-4 border-l-4 border-red-500">
          <div className="flex justify-between items-start mb-3">
            <div>
              <h3 className="font-bold text-lg">{alert.emergency_type?.toUpperCase()}</h3>
              <p className="text-sm text-gray-600">Pet: {alert.pets?.name} ({alert.pets?.species})</p>
              <p className="text-sm text-gray-600">Owner: {alert.profiles?.full_name}</p>
            </div>
            <Badge variant="destructive">{alert.severity}</Badge>
          </div>

          <p className="mb-3">{alert.description}</p>

          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <MapPin size={16} />
            <span>{alert.location_address || 'Location provided'}</span>
          </div>

          {alert.status === 'pending' && (
            <div className="flex gap-2">
              <Button 
                onClick={() => respondToAlert(alert.id, 'accept', 15)}
                disabled={responding === alert.id}
              >
                Accept (15 min ETA)
              </Button>
              <Button 
                variant="outline"
                onClick={() => respondToAlert(alert.id, 'decline')}
                disabled={responding === alert.id}
              >
                Decline
              </Button>
            </div>
          )}

          {alert.assigned_sitter_id === user?.id && (
            <Badge variant="secondary">Assigned to you</Badge>
          )}
        </Card>
      ))}
    </div>
  );
}
