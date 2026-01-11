'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, BarChart3, UserCheck, Bell, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect, useState } from 'react';

export default function StudentDashboardPage() {
  const { user, loading } = useAuth();
  const [stats, setStats] = useState({
    classes: 0,
    averageGrade: 0,
    attendance: 0,
    announcements: 0
  });

  useEffect(() => {
    // TODO: Load real stats from API
    setStats({
      classes: 5,
      averageGrade: 85,
      attendance: 92,
      announcements: 3
    });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!user) {
    return <div>Please log in to access your dashboard.</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {(user as any).firstname}!</h1>
        <p className="text-neutral-400">Here's your academic overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.classes}</div>
            <p className="text-xs text-neutral-400">Active courses</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Average Grade</CardTitle>
            <BarChart3 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.averageGrade}%</div>
            <p className="text-xs text-neutral-400">Current semester</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.attendance}%</div>
            <p className="text-xs text-neutral-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{stats.announcements}</div>
            <p className="text-xs text-neutral-400">New messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Mathematics</p>
                  <p className="text-neutral-400 text-sm">Grade 10 - Room 201</p>
                </div>
                <span className="text-primary">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">English Literature</p>
                  <p className="text-neutral-400 text-sm">Grade 10 - Room 105</p>
                </div>
                <span className="text-primary">11:00 AM</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Physics</p>
                  <p className="text-neutral-400 text-sm">Grade 10 - Lab 3</p>
                </div>
                <span className="text-primary">2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Latest Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Mid-term Exam Schedule</p>
                <p className="text-neutral-400 text-sm">Mathematics exam on Friday, 10 AM</p>
                <p className="text-neutral-500 text-xs">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">School Holiday Notice</p>
                <p className="text-neutral-400 text-sm">School will be closed next Monday</p>
                <p className="text-neutral-500 text-xs">1 day ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">New Library Books</p>
                <p className="text-neutral-400 text-sm">Check out the latest science fiction collection</p>
                <p className="text-neutral-500 text-xs">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}