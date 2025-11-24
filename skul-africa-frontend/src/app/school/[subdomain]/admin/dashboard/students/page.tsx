'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships, getResults, getAttendance } from '@/lib/school-mis-data';
import { Plus, Search, Edit, Trash2, Users, BookOpen, UserCheck, TrendingUp } from 'lucide-react';

interface Student {
  id: string;
  name: string;
  email: string;
  class: string;
  parentIds: string[];
  teacherIds: string[];
}

export default function StudentsManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [students, setStudents] = useState<Student[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);
        setStudents(relData.students);
      } catch (error) {
        console.error('Error loading students:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = !selectedClass || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  const classes = [...new Set(students.map(s => s.class))];

  const getStudentStats = (studentId: string) => {
    const results = getResults(subdomain).filter(r => r.studentId === studentId);
    const attendance = getAttendance(subdomain).filter(a => a.studentId === studentId);

    const averageScore = results.length > 0
      ? Math.round(results.reduce((sum, r) => sum + r.score, 0) / results.length)
      : 0;

    const attendanceRate = attendance.length > 0
      ? Math.round((attendance.filter(a => a.status === 'present').length / attendance.length) * 100)
      : 0;

    return { resultsCount: results.length, averageScore, attendanceRate };
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Students Management</h1>
          <p className="text-neutral-400">Manage student records, assignments, and performance</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search students..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-700"
              />
            </div>
            <select
              value={selectedClass}
              onChange={(e) => setSelectedClass(e.target.value)}
              className="h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Classes</option>
              {classes.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Students Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Students ({filteredStudents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Student</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Class</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Parents</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Teachers</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Performance</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => {
                  const stats = getStudentStats(student.id);
                  const parents = relationships.parents?.filter((p: any) =>
                    student.parentIds.includes(p.id)
                  ) || [];
                  const teachers = relationships.teachers?.filter((t: any) =>
                    student.teacherIds.includes(t.id)
                  ) || [];

                  return (
                    <tr key={student.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-white font-medium">{student.name}</div>
                          <div className="text-neutral-400 text-sm">{student.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{student.class}</td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          {parents.length > 0 ? (
                            parents.map((p: any) => p.name).join(', ')
                          ) : (
                            <span className="text-neutral-500">No parents assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="text-sm">
                          {teachers.length > 0 ? (
                            teachers.map((t: any) => t.name).join(', ')
                          ) : (
                            <span className="text-neutral-500">No teachers assigned</span>
                          )}
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-4 text-sm">
                          <div className="flex items-center">
                            <BookOpen className="h-3 w-3 mr-1 text-blue-400" />
                            <span>{stats.resultsCount} results</span>
                          </div>
                          <div className="flex items-center">
                            <TrendingUp className="h-3 w-3 mr-1 text-green-400" />
                            <span>{stats.averageScore}% avg</span>
                          </div>
                          <div className="flex items-center">
                            <UserCheck className="h-3 w-3 mr-1 text-yellow-400" />
                            <span>{stats.attendanceRate}% attendance</span>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-red-400">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Student Modal/Form would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Student</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Student form would be implemented here</p>
              <Button
                onClick={() => setShowAddForm(false)}
                className="mt-4 w-full"
                variant="outline"
              >
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}