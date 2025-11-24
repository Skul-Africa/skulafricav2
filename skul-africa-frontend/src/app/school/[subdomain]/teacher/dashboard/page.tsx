'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Users, UserCheck, Bell } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function TeacherDashboardPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [teacher, setTeacher] = useState<any>(null);

  useEffect(() => {
    const currentTeacher = JSON.parse(localStorage.getItem(`${subdomain}-current-teacher`) || 'null');
    setTeacher(currentTeacher);
  }, [subdomain]);

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {teacher.firstName}!</h1>
        <p className="text-neutral-400">Here's your teaching dashboard overview</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">My Classes</CardTitle>
            <BookOpen className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-neutral-400">Active classes</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">45</div>
            <p className="text-xs text-neutral-400">Enrolled students</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Attendance Rate</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">87%</div>
            <p className="text-xs text-neutral-400">Class average</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Announcements</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">2</div>
            <p className="text-xs text-neutral-400">New messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Today's Classes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">Mathematics - Grade 10A</p>
                  <p className="text-neutral-400 text-sm">Room 201</p>
                </div>
                <span className="text-primary">9:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">Mathematics - Grade 10B</p>
                  <p className="text-neutral-400 text-sm">Room 203</p>
                </div>
                <span className="text-primary">11:00 AM</span>
              </div>
              <div className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg">
                <div>
                  <p className="text-white font-medium">Mathematics - Grade 9A</p>
                  <p className="text-neutral-400 text-sm">Room 105</p>
                </div>
                <span className="text-primary">2:00 PM</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Attendance Marked</p>
                <p className="text-neutral-400 text-sm">Mathematics - Grade 10A (25 present, 2 absent)</p>
                <p className="text-neutral-500 text-xs">2 hours ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Assignment Posted</p>
                <p className="text-neutral-400 text-sm">Chapter 5 exercises uploaded</p>
                <p className="text-neutral-500 text-xs">1 day ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Grades Updated</p>
                <p className="text-neutral-400 text-sm">Mid-term exam results published</p>
                <p className="text-neutral-500 text-xs">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}