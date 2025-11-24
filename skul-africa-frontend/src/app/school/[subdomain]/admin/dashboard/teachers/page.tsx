'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships, getResults } from '@/lib/school-mis-data';
import { Plus, Search, Edit, Trash2, Users, BookOpen, GraduationCap } from 'lucide-react';

interface Teacher {
  id: string;
  name: string;
  email: string;
  subjects: string[];
  class: string;
  studentIds: string[];
}

export default function TeachersManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);
        setTeachers(relData.teachers);
      } catch (error) {
        console.error('Error loading teachers:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const filteredTeachers = teachers.filter(teacher => {
    const matchesSearch = teacher.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         teacher.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSubject = !selectedSubject || teacher.subjects.includes(selectedSubject);
    return matchesSearch && matchesSubject;
  });

  const allSubjects = [...new Set(teachers.flatMap(t => t.subjects))];

  const getTeacherStats = (teacherId: string) => {
    const results = getResults(subdomain).filter(r => r.teacherId === teacherId);
    const students = relationships.students?.filter((s: any) =>
      relationships.links?.some((link: any) => link.studentId === s.id && link.teacherId === teacherId)
    ) || [];

    return {
      resultsUploaded: results.length,
      studentsCount: students.length,
      subjectsCount: teachers.find(t => t.id === teacherId)?.subjects.length || 0
    };
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
          <h1 className="text-2xl font-bold text-white mb-2">Teachers Management</h1>
          <p className="text-neutral-400">Manage teaching staff, subjects, and class assignments</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Teacher
        </Button>
      </div>

      {/* Filters */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search teachers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-neutral-800 border-neutral-700"
              />
            </div>
            <select
              value={selectedSubject}
              onChange={(e) => setSelectedSubject(e.target.value)}
              className="h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">All Subjects</option>
              {allSubjects.map(subject => (
                <option key={subject} value={subject}>{subject}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Teachers Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Teachers ({filteredTeachers.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Teacher</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Subjects</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Class</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Students</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Results</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map((teacher) => {
                  const stats = getTeacherStats(teacher.id);
                  const students = relationships.students?.filter((s: any) =>
                    relationships.links?.some((link: any) => link.studentId === s.id && link.teacherId === teacher.id)
                  ) || [];

                  return (
                    <tr key={teacher.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-white font-medium">{teacher.name}</div>
                          <div className="text-neutral-400 text-sm">{teacher.email}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {teacher.subjects.map((subject, index) => (
                            <span
                              key={index}
                              className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary/20 text-primary"
                            >
                              {subject}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 text-neutral-300">{teacher.class}</td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2 text-blue-400" />
                          <span className="text-white">{stats.studentsCount} students</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-green-400" />
                          <span className="text-white">{stats.resultsUploaded} results</span>
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

      {/* Add Teacher Modal/Form would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Teacher</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Teacher form would be implemented here</p>
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