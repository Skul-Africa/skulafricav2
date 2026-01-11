'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, BookOpen, DollarSign, TrendingUp, Calendar, Bell, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { getAllStudents, getAllTeachers, getAllClassrooms, getActiveAcademicYear, startNewAcademicYear, endCurrentAcademicYear, endCurrentAcademicTerm } from '@/lib/api';
import { toast } from 'react-hot-toast';

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
  const [academicYear, setAcademicYear] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [academicLoading, setAcademicLoading] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const [students, teachers, classrooms, year] = await Promise.all([
        getAllStudents(),
        getAllTeachers(),
        getAllClassrooms(),
        getActiveAcademicYear()
      ]);

      setStats({
        totalStudents: students.length,
        totalTeachers: teachers.length,
        totalParents: 0, // TODO: Implement parents API
        totalClasses: classrooms.length,
        todayAttendance: 0, // TODO: Implement attendance API
        totalResults: 0, // TODO: Implement results API
        pendingPayments: 0, // TODO: Implement payments API
        unreadNotifications: 0 // TODO: Implement notifications API
      });

      setAcademicYear(year);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleStartNewYear = async () => {
    if (!confirm('Are you sure you want to start a new academic year? This will end the current year.')) return;

    try {
      setAcademicLoading(true);
      await startNewAcademicYear();
      toast.success('New academic year started successfully');
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to start new academic year');
    } finally {
      setAcademicLoading(false);
    }
  };

  const handleEndCurrentYear = async () => {
    if (!confirm('Are you sure you want to end the current academic year?')) return;

    try {
      setAcademicLoading(true);
      await endCurrentAcademicYear();
      toast.success('Academic year ended successfully');
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to end academic year');
    } finally {
      setAcademicLoading(false);
    }
  };

  const handleEndCurrentTerm = async () => {
    if (!confirm('Are you sure you want to end the current academic term?')) return;

    try {
      setAcademicLoading(true);
      await endCurrentAcademicTerm();
      toast.success('Academic term ended successfully');
      loadDashboardData();
    } catch (error) {
      toast.error('Failed to end academic term');
    } finally {
      setAcademicLoading(false);
    }
  };

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

      {/* Academic Year Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader>
            <CardTitle className="text-white">Academic Year Management</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {academicYear ? (
                <div className="space-y-3">
                  <div className="p-4 bg-neutral-800 rounded-lg">
                    <h3 className="font-medium text-white mb-2">Current Academic Year</h3>
                    <p className="text-sm text-neutral-300">{academicYear.name}</p>
                    <p className="text-xs text-neutral-400 mt-1">
                      Status: <span className={`font-medium ${academicYear.isActive ? 'text-green-400' : 'text-red-400'}`}>
                        {academicYear.isActive ? 'Active' : 'Inactive'}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Button
                      onClick={handleStartNewYear}
                      disabled={academicLoading}
                      className="w-full bg-primary hover:bg-primary/90"
                    >
                      {academicLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      Start New Academic Year
                    </Button>

                    <Button
                      onClick={handleEndCurrentYear}
                      disabled={academicLoading}
                      variant="outline"
                      className="w-full border-neutral-700 text-neutral-300"
                    >
                      {academicLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      End Current Year
                    </Button>

                    <Button
                      onClick={handleEndCurrentTerm}
                      disabled={academicLoading}
                      variant="outline"
                      className="w-full border-neutral-700 text-neutral-300"
                    >
                      {academicLoading ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                      End Current Term
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Calendar className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                  <p className="text-neutral-400">No academic year data available</p>
                </div>
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