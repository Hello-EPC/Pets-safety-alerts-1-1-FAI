import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Card } from '@/components/ui/card';
import { Clock, CheckCircle, AlertCircle, User } from 'lucide-react';

interface TimelineProps {
  alertId: string;
}

export default function EmergencyTimeline({ alertId }: TimelineProps) {
  const [timeline, setTimeline] = useState<any[]>([]);

  useEffect(() => {
    loadTimeline();
    const subscription = supabase
      .channel(`timeline_${alertId}`)
      .on('postgres_changes', { 
        event: 'INSERT', 
        schema: 'public', 
        table: 'emergency_timeline',
        filter: `alert_id=eq.${alertId}`
      }, loadTimeline)
      .subscribe();
    
    return () => { subscription.unsubscribe(); };
  }, [alertId]);

  const loadTimeline = async () => {
    const { data } = await supabase
      .from('emergency_timeline')
      .select('*, profiles(*)')
      .eq('alert_id', alertId)
      .order('created_at', { ascending: false });
    setTimeline(data || []);
  };

  const getIcon = (eventType: string) => {
    switch(eventType) {
      case 'created': return <AlertCircle className="text-red-500" />;
      case 'assigned': return <User className="text-blue-500" />;
      case 'status_update': return <Clock className="text-yellow-500" />;
      case 'resolved': return <CheckCircle className="text-green-500" />;
      default: return <Clock />;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-bold mb-4">Emergency Timeline</h3>
      <div className="space-y-4">
        {timeline.map((event, idx) => (
          <div key={event.id} className="flex gap-3">
            <div className="flex-shrink-0 mt-1">{getIcon(event.event_type)}</div>
            <div className="flex-1">
              <p className="font-semibold">{event.description}</p>
              {event.profiles && (
                <p className="text-sm text-gray-600">By: {event.profiles.full_name}</p>
              )}
              <p className="text-xs text-gray-400">
                {new Date(event.created_at).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
