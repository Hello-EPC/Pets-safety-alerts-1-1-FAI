import React, { useState } from 'react';
import { Button } from './Button';
import DispatchDashboard from './DispatchDashboard';

export const AdminPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = {
    activeMembers: 10247,
    certifiedSitters: 342,
    emergencyCalls: 89,
    monthlyRevenue: 153705
  };

  const recentMembers = [
    { id: 'ICE-8472', name: 'Sarah Mitchell', pet: 'Max', joined: '2 days ago', status: 'Active' },
    { id: 'ICE-8473', name: 'Michael Chen', pet: 'Bella', joined: '1 day ago', status: 'Active' },
    { id: 'ICE-8474', name: 'Jennifer Lopez', pet: 'Charlie', joined: '3 hours ago', status: 'Pending' }
  ];

  const emergencyLog = [
    { id: 1, member: 'Sarah M.', sitter: 'Jessica Martinez', time: '2:30 PM', status: 'Resolved' },
    { id: 2, member: 'David P.', sitter: 'Amanda Johnson', time: '11:15 AM', status: 'In Progress' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold mb-2">Admin Control Panel</h1>
          <p className="text-lg">I.C.E. Pet Alert Management System</p>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.activeMembers.toLocaleString()}</div>
            <p className="text-gray-600">Active Members</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-yellow-400 mb-2">{stats.certifiedSitters}</div>
            <p className="text-gray-600">Certified Sitters</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-red-600 mb-2">{stats.emergencyCalls}</div>
            <p className="text-gray-600">Emergency Calls (Today)</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="text-3xl font-bold text-green-600 mb-2">${stats.monthlyRevenue.toLocaleString()}</div>
            <p className="text-gray-600">Monthly Revenue</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="flex border-b">
            {['overview', 'members', 'sitters', 'emergency'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-4 font-bold ${activeTab === tab ? 'border-b-4 border-yellow-400 text-yellow-400' : 'text-gray-600'}`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          <div className="p-6">
            {activeTab === 'members' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold">Recent Members</h3>
                  <Button onClick={() => alert('Export members...')}>Export CSV</Button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left">Member ID</th>
                        <th className="px-4 py-3 text-left">Name</th>
                        <th className="px-4 py-3 text-left">Pet</th>
                        <th className="px-4 py-3 text-left">Joined</th>
                        <th className="px-4 py-3 text-left">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentMembers.map(m => (
                        <tr key={m.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-3 font-mono text-sm">{m.id}</td>
                          <td className="px-4 py-3">{m.name}</td>
                          <td className="px-4 py-3">{m.pet}</td>
                          <td className="px-4 py-3 text-sm text-gray-600">{m.joined}</td>
                          <td className="px-4 py-3">
                            <span className={`px-2 py-1 rounded text-xs ${m.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                              {m.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'emergency' && (
              <div>
                <DispatchDashboard />
              </div>
            )}


            {activeTab === 'overview' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">System Overview</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold mb-3">Quick Actions</h4>
                    <div className="space-y-2">
                      <Button onClick={() => alert('Add member...')} size="sm" className="w-full">Add New Member</Button>
                      <Button onClick={() => alert('Add sitter...')} size="sm" className="w-full">Add New Sitter</Button>
                      <Button onClick={() => alert('Dispatch emergency...')} variant="secondary" size="sm" className="w-full">Dispatch Emergency</Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4">
                    <h4 className="font-bold mb-3">System Health</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>API Status</span>
                        <span className="text-green-600 font-bold">✓ Online</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Database</span>
                        <span className="text-green-600 font-bold">✓ Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Payment Gateway</span>
                        <span className="text-green-600 font-bold">✓ Active</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
