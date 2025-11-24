'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserCheck, Calendar, TrendingUp } from 'lucide-react';

export default function StudentAttendancePage() {
  const attendanceData = [
    { date: '2024-01-15', subject: 'Mathematics', status: 'Present', time: '9:00 AM' },
    { date: '2024-01-15', subject: 'English', status: 'Present', time: '11:00 AM' },
    { date: '2024-01-16', subject: 'Physics', status: 'Present', time: '2:00 PM' },
    { date: '2024-01-16', subject: 'Chemistry', status: 'Absent', time: '9:00 AM' },
    { date: '2024-01-17', subject: 'History', status: 'Present', time: '1:00 PM' },
    { date: '2024-01-17', subject: 'Mathematics', status: 'Late', time: '9:00 AM' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Present': return 'text-green-500';
      case 'Absent': return 'text-red-500';
      case 'Late': return 'text-yellow-500';
      default: return 'text-neutral-400';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'Present': return 'bg-green-500/10';
      case 'Absent': return 'bg-red-500/10';
      case 'Late': return 'bg-yellow-500/10';
      default: return 'bg-neutral-500/10';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Attendance</h1>
        <p className="text-neutral-400">Track your attendance records</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Overall Attendance</CardTitle>
            <TrendingUp className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">92%</div>
            <p className="text-xs text-neutral-400">This semester</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Present Days</CardTitle>
            <UserCheck className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-neutral-400">Out of 50 days</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">This Month</CardTitle>
            <Calendar className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">95%</div>
            <p className="text-xs text-neutral-400">January 2024</p>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Recent Attendance Records</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {attendanceData.map((record, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="flex flex-col">
                    <span className="text-white font-medium">{record.subject}</span>
                    <span className="text-neutral-400 text-sm">{record.date}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-neutral-400 text-sm">{record.time}</span>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusBg(record.status)} ${getStatusColor(record.status)}`}>
                    {record.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}