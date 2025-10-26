import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { AlertCircle, MapPin, Clock, User } from 'lucide-react';

export default function DispatchDashboard() {
  const [alerts, setAlerts] = useState<any[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<any>(null);
  const [nearestSitters, setNearestSitters] = useState<any[]>([]);

  useEffect(() => {
    loadAlerts();
    const subscription = supabase
      .channel('emergency_alerts')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'emergency_alerts' }, loadAlerts)
      .subscribe();
    return () => { subscription.unsubscribe(); };
  }, []);

  const loadAlerts = async () => {
    const { data } = await supabase
      .from('emergency_alerts')
      .select('*, pets(*), profiles(*)')
      .order('created_at', { ascending: false });
    setAlerts(data || []);
  };

  const findNearestSitters = async (alert: any) => {
    setSelectedAlert(alert);
    const { data } = await supabase.functions.invoke('find-nearest-sitters', {
      body: { latitude: alert.location_lat, longitude: alert.location_lng }
    });
    setNearestSitters(data?.sitters || []);
  };

  const assignSitter = async (sitterId: string) => {
    await supabase.functions.invoke('handle-emergency-alert', {
      body: { alertId: selectedAlert.id, action: 'assign', data: { sitterId } }
    });
    loadAlerts();
    setSelectedAlert(null);
  };

  const updateStatus = async (alertId: string, status: string) => {
    await supabase.functions.invoke('handle-emergency-alert', {
      body: { alertId, action: 'update_status', data: { status } }
    });
    loadAlerts();
  };

  const getSeverityColor = (severity: string) => {
    const colors: any = { critical: 'destructive', high: 'destructive', medium: 'default', low: 'secondary' };
    return colors[severity] || 'default';
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-4">
        <h2 className="text-2xl font-bold">Active Emergencies</h2>
        {alerts.filter(a => a.status !== 'resolved').map(alert => (
          <Card key={alert.id} className="p-4">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold flex items-center gap-2">
                  <AlertCircle className="text-red-500" />
                  {alert.emergency_type?.toUpperCase()}
                </h3>
                <p className="text-sm text-gray-600">Pet: {alert.pets?.name}</p>
              </div>
              <Badge variant={getSeverityColor(alert.severity)}>{alert.severity}</Badge>
            </div>
            <p className="text-sm mb-2">{alert.description}</p>
            <div className="flex gap-2 mt-3">
              <Button size="sm" onClick={() => findNearestSitters(alert)}>Find Sitters</Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus(alert.id, 'in_progress')}>Mark In Progress</Button>
              <Button size="sm" variant="outline" onClick={() => updateStatus(alert.id, 'resolved')}>Resolve</Button>
            </div>
          </Card>
        ))}
      </div>

      {selectedAlert && (
        <Card className="p-4">
          <h3 className="font-bold mb-4">Nearest Sitters</h3>
          {nearestSitters.map(sitter => (
            <div key={sitter.id} className="mb-3 p-3 border rounded">
              <p className="font-semibold">{sitter.profiles?.full_name}</p>
              <p className="text-sm text-gray-600">{sitter.distance?.toFixed(1)} km away</p>
              <Button size="sm" className="mt-2" onClick={() => assignSitter(sitter.sitter_id)}>Assign</Button>
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}
