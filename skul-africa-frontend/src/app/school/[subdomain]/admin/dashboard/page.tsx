'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, DollarSign, TrendingUp, Calendar, Bell, CheckCircle, AlertCircle } from 'lucide-react';
import { getSchoolRelationships, getResults, getAttendance, getNotifications } from '@/lib/school-mis-data';

export default function AdminDashboardPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    totalClasses: 0,
    todayAttendance: 0,
    totalResults: 0,
    pendingPayments: 0,
    unreadNotifications: 0
  });
  const [recentActivity, setRecentActivity] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const relationships = await getSchoolRelationships(subdomain);
        const results = getResults(subdomain);
        const attendance = getAttendance(subdomain);
        const notifications = getNotifications(subdomain);

        // Calculate today's attendance
        const today = new Date().toISOString().split('T')[0];
        const todayAttendance = attendance.filter(record => record.date === today);
        const presentToday = todayAttendance.filter(record => record.status === 'present').length;
        const totalAttendanceToday = todayAttendance.length;
        const attendanceRate = totalAttendanceToday > 0 ? Math.round((presentToday / totalAttendanceToday) * 100) : 0;

        // Get unique classes
        const classes = [...new Set(relationships.students.map(s => s.class))];

        // Get unread notifications
        const unreadCount = notifications.filter(n => !n.read).length;

        setStats({
          totalStudents: relationships.students.length,
          totalTeachers: relationships.teachers.length,
          totalParents: relationships.parents.length,
          totalClasses: classes.length,
          todayAttendance: attendanceRate,
          totalResults: results.length,
          pendingPayments: 0, // Will be implemented with payments system
          unreadNotifications: unreadCount
        });

        // Get recent activity (last 5 notifications)
        const recentNotifications = notifications
          .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
          .slice(0, 5);

        setRecentActivity(recentNotifications);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, [subdomain]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white mb-2">Admin Dashboard</h1>
        <p className="text-neutral-400">Welcome back! Here's an overview of your school management system.</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Students</p>
                <p className="text-2xl font-bold text-white">{stats.totalStudents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Teachers</p>
                <p className="text-2xl font-bold text-white">{stats.totalTeachers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-purple-900/20 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Parents</p>
                <p className="text-2xl font-bold text-white">{stats.totalParents}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-yellow-900/20 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-yellow-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Classes</p>
                <p className="text-2xl font-bold text-white">{stats.totalClasses}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Today's Attendance</p>
                <p className="text-2xl font-bold text-white">{stats.todayAttendance}%</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-blue-900/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Total Results</p>
                <p className="text-2xl font-bold text-white">{stats.totalResults}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-red-900/20 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Pending Payments</p>
                <p className="text-2xl font-bold text-white">{stats.pendingPayments}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="h-12 w-12 bg-orange-900/20 rounded-lg flex items-center justify-center">
                <Bell className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Notifications</p>
                <p className="text-2xl font-bold text-white">{stats.unreadNotifications}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.length === 0 ? (
                <div className="text-center py-8">
                  <Bell className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-400">No recent activity</p>
                </div>
              ) : (
                recentActivity.map((activity: any) => (
                  <div key={activity.id} className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm text-white">{activity.title}</p>
                      <p className="text-xs text-neutral-400">
                        {new Date(activity.date).toLocaleDateString()} • {activity.userType}
                      </p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="bg-primary hover:bg-primary/90 text-white p-4 h-auto">
                <Users className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Add Student</div>
                  <div className="text-xs opacity-80">Register new student</div>
                </div>
              </Button>

              <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 p-4 h-auto">
                <BookOpen className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Add Teacher</div>
                  <div className="text-xs opacity-80">Hire new teacher</div>
                </div>
              </Button>

              <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 p-4 h-auto">
                <Calendar className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Mark Attendance</div>
                  <div className="text-xs opacity-80">Record daily attendance</div>
                </div>
              </Button>

              <Button variant="outline" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800 p-4 h-auto">
                <TrendingUp className="h-5 w-5 mr-2" />
                <div className="text-left">
                  <div className="font-medium">Upload Results</div>
                  <div className="text-xs opacity-80">Add student grades</div>
                </div>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}