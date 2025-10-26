import React, { useState } from 'react';
import { Button } from './Button';
import SitterAlertPanel from './SitterAlertPanel';
import SitterLocationTracker from './SitterLocationTracker';
import { useAuth } from '@/contexts/AuthContext';

export const SitterDashboard: React.FC = () => {
  const [available, setAvailable] = useState(true);
  const [needBackup, setNeedBackup] = useState(false);
  const { user } = useAuth();

  const sitterData = {
    name: user?.user_metadata?.full_name || 'Sitter',
    certifications: ['CPR Certified', 'First Aid', 'Behavioral Assessment'],
    rating: 4.9,
    completedJobs: 127,
    location: 'Austin, TX'
  };


  const upcomingJobs = [
    { id: 1, petName: 'Max', owner: 'Sarah M.', date: 'Oct 20, 2:00 PM', type: 'Emergency Response' },
    { id: 2, petName: 'Bella', owner: 'Michael C.', date: 'Oct 21, 10:00 AM', type: 'Scheduled Visit' }
  ];

  const handleToggleAvailability = () => {
    setAvailable(!available);
    alert(`Availability set to: ${!available ? 'Available' : 'Unavailable'}`);
  };

  const handleRequestBackup = () => {
    setNeedBackup(!needBackup);
    alert(needBackup ? 'Backup request cancelled' : 'Backup sitter notified!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-black text-white rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Sitter Dashboard</h1>
              <p className="text-yellow-400 text-lg">{sitterData.name}</p>
            </div>
            <div className="flex gap-3">
              <Button 
                onClick={handleToggleAvailability} 
                variant={available ? 'primary' : 'secondary'}
              >
                {available ? '✓ Available' : '✗ Unavailable'}
              </Button>
              <Button onClick={handleRequestBackup} variant="outline">
                {needBackup ? 'Cancel Backup' : 'Need Backup'}
              </Button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{sitterData.rating}</div>
            <p className="text-gray-600">Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{sitterData.completedJobs}</div>
            <p className="text-gray-600">Completed Jobs</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{sitterData.certifications.length}</div>
            <p className="text-gray-600">Certifications</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg text-center">
            <div className="text-3xl font-bold text-yellow-400 mb-2">$3,847</div>
            <p className="text-gray-600">This Month</p>
          </div>
        </div>

        <div className="mb-8">
          <SitterLocationTracker />
        </div>

        <div className="mb-8">
          <SitterAlertPanel />
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-xl mb-4">Upcoming Jobs</h3>
            <div className="space-y-4">
              {upcomingJobs.map(job => (
                <div key={job.id} className="border-l-4 border-yellow-400 pl-4 py-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-bold">{job.petName}</p>
                      <p className="text-sm text-gray-600">{job.owner}</p>
                      <p className="text-sm text-gray-600">{job.date}</p>
                    </div>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">
                      {job.type}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-xl mb-4">My Certifications</h3>
            <div className="space-y-3">
              {sitterData.certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="text-green-500 text-xl">✓</span>
                  <span>{cert}</span>
                </div>
              ))}
              <Button onClick={() => alert('Browse courses...')} size="sm" className="mt-4">
                Add Certification
              </Button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-lg">
          <h3 className="font-bold text-xl mb-4">Recent Feedback</h3>
          <div className="space-y-4">
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="font-bold">Sarah M.</span>
              </div>
              <p className="text-gray-600 text-sm">"Jessica was amazing with Max during our emergency. Highly professional!"</p>
            </div>
            <div className="border-b pb-4">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-yellow-400">★★★★★</span>
                <span className="font-bold">Michael C.</span>
              </div>
              <p className="text-gray-600 text-sm">"Very caring and knowledgeable. Bella was in great hands."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
