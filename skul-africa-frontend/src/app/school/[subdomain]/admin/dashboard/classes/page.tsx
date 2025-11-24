'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships } from '@/lib/school-mis-data';
import { Plus, Search, Edit, Trash2, Users, BookOpen, GraduationCap } from 'lucide-react';

export default function ClassesManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [classes, setClasses] = useState<any[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);

        // Group students by class
        const classGroups = relData.students.reduce((acc: any, student: any) => {
          if (!acc[student.class]) {
            acc[student.class] = {
              name: student.class,
              studentCount: 0,
              teacherCount: 0,
              students: [],
              teachers: []
            };
          }
          acc[student.class].studentCount++;
          acc[student.class].students.push(student);
          return acc;
        }, {});

        // Add teachers to classes
        relData.teachers.forEach((teacher: any) => {
          if (classGroups[teacher.class]) {
            classGroups[teacher.class].teacherCount++;
            classGroups[teacher.class].teachers.push(teacher);
          }
        });

        setClasses(Object.values(classGroups));
      } catch (error) {
        console.error('Error loading classes:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const filteredClasses = classes.filter(cls =>
    cls.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <h1 className="text-2xl font-bold text-white mb-2">Classes Management</h1>
          <p className="text-neutral-400">Manage class structures, student assignments, and teacher allocations</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search classes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClasses.map((cls: any) => (
          <Card key={cls.name} className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{cls.name}</span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-white">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-neutral-400 hover:text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <GraduationCap className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-neutral-300">Students</span>
                  </div>
                  <span className="text-white font-bold">{cls.studentCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-green-400" />
                    <span className="text-neutral-300">Teachers</span>
                  </div>
                  <span className="text-white font-bold">{cls.teacherCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-purple-400" />
                    <span className="text-neutral-300">Subjects</span>
                  </div>
                  <span className="text-white font-bold">
                    {[...new Set(cls.teachers.flatMap((t: any) => t.subjects))].length}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Class Modal/Form would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Class</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Class form would be implemented here</p>
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
