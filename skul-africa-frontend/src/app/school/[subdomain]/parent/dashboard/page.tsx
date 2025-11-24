'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { User, CreditCard, UserCheck, Bell } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ParentDashboardPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [parent, setParent] = useState<any>(null);

  useEffect(() => {
    const currentParent = JSON.parse(localStorage.getItem(`${subdomain}-current-parent`) || 'null');
    setParent(currentParent);
  }, [subdomain]);

  if (!parent) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Welcome back, {parent.firstName}!</h1>
        <p className="text-neutral-400">Monitor your child's academic progress</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Child's Info</CardTitle>
            <User className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">John Doe</div>
            <p className="text-xs text-neutral-400">Grade 10A</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Outstanding Fees</CardTitle>
            <CreditCard className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">₦25,000</div>
            <p className="text-xs text-neutral-400">Due this month</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Attendance</CardTitle>
            <UserCheck className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">92%</div>
            <p className="text-xs text-neutral-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Messages</CardTitle>
            <Bell className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">3</div>
            <p className="text-xs text-neutral-400">Unread messages</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Academic Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Mathematics</p>
                  <p className="text-neutral-400 text-sm">Mid-term Exam</p>
                </div>
                <span className="text-primary font-bold">87%</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">English Literature</p>
                  <p className="text-neutral-400 text-sm">Assignment</p>
                </div>
                <span className="text-primary font-bold">92%</span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">Physics</p>
                  <p className="text-neutral-400 text-sm">Lab Report</p>
                </div>
                <span className="text-primary font-bold">90%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">School Announcements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Parent-Teacher Meeting</p>
                <p className="text-neutral-400 text-sm">Scheduled for next Friday at 2 PM</p>
                <p className="text-neutral-500 text-xs">2 days ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">School Holiday Notice</p>
                <p className="text-neutral-400 text-sm">School will be closed next Monday</p>
                <p className="text-neutral-500 text-xs">1 week ago</p>
              </div>
              <div className="border-l-4 border-primary pl-4">
                <p className="text-white font-medium">Fee Payment Reminder</p>
                <p className="text-neutral-400 text-sm">Term fees due by end of month</p>
                <p className="text-neutral-500 text-xs">3 days ago</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}