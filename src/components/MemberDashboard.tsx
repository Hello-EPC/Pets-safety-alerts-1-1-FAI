import React, { useState } from 'react';
import { Button } from './Button';
import EmergencyTrigger from './EmergencyTrigger';
import EmergencyTimeline from './EmergencyTimeline';
import { useAuth } from '@/contexts/AuthContext';

export const MemberDashboard: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const { user } = useAuth();
  
  const memberData = {
    id: 'ICE-2025-8472',
    name: user?.user_metadata?.full_name || 'Member',
    petName: 'Max',
    petType: 'Golden Retriever',
    memberSince: 'Jan 2024',
    renewalDate: 'Jan 2026',
    emergencyContact: 'John Mitchell',
    emergencyPhone: '(555) 123-4567',
    vetName: 'Paws & Claws Veterinary',
    vetPhone: '(555) 987-6543'
  };

  const handleDownloadBadge = () => {
    alert('QR Badge downloaded!\nPDF with QR code would download here.');
  };

  const handleEmergencyCall = () => {
    window.location.href = 'tel:1-800-423-7387';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="bg-yellow-400 text-black rounded-xl p-6 mb-8 shadow-lg">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {memberData.name}!</h1>
              <p className="text-lg">Member ID: {memberData.id}</p>
            </div>
            <Button onClick={handleEmergencyCall} variant="secondary" size="lg">
              🚨 Emergency Call
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Membership Status</h3>
            <div className="text-green-600 font-bold text-xl mb-2">✓ Active</div>
            <p className="text-sm text-gray-600">Member since {memberData.memberSince}</p>
            <p className="text-sm text-gray-600">Renews {memberData.renewalDate}</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">Pet Profile</h3>
            <p className="font-bold">{memberData.petName}</p>
            <p className="text-sm text-gray-600">{memberData.petType}</p>
            <Button onClick={() => alert('Edit profile...')} size="sm" className="mt-3">Edit Profile</Button>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-lg mb-2">QR Badge</h3>
            <Button onClick={() => setShowQR(!showQR)} size="sm" className="mb-2">
              {showQR ? 'Hide' : 'Show'} QR Code
            </Button>
            <Button onClick={handleDownloadBadge} variant="outline" size="sm">
              Download Badge
            </Button>
          </div>
        </div>

        {showQR && (
          <div className="bg-white rounded-xl p-8 shadow-lg mb-8 text-center">
            <h3 className="font-bold text-2xl mb-4">Your Emergency QR Code</h3>
            <div className="bg-gray-200 w-64 h-64 mx-auto flex items-center justify-center text-6xl">
              📱
            </div>
            <p className="mt-4 text-gray-600">Scan this code for instant access to pet profile</p>
          </div>
        )}

        <div className="mb-8">
          <EmergencyTrigger />
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-xl mb-4">Emergency Contacts</h3>
            <div className="space-y-3">
              <div>
                <p className="font-bold">{memberData.emergencyContact}</p>
                <p className="text-gray-600">{memberData.emergencyPhone}</p>
              </div>
              <div>
                <p className="font-bold">{memberData.vetName}</p>
                <p className="text-gray-600">{memberData.vetPhone}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-bold text-xl mb-4">Recent Activity</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Profile updated</span>
                <span className="text-gray-600">2 days ago</span>
              </div>
              <div className="flex justify-between">
                <span>QR badge downloaded</span>
                <span className="text-gray-600">1 week ago</span>
              </div>
              <div className="flex justify-between">
                <span>Membership renewed</span>
                <span className="text-gray-600">1 month ago</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
