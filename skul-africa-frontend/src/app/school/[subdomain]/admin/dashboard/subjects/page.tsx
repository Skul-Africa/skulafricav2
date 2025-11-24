'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships } from '@/lib/school-mis-data';
import { Plus, Search, Edit, Trash2, BookOpen, Users } from 'lucide-react';

export default function SubjectsManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [subjects, setSubjects] = useState<any[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);

        // Collect all unique subjects from teachers
        const allSubjects = [...new Set(relData.teachers.flatMap((t: any) => t.subjects))];
        
        const subjectData = allSubjects.map(subject => {
          const teachers = relData.teachers.filter((t: any) => t.subjects.includes(subject));
          const classes = [...new Set(teachers.map((t: any) => t.class))];
          
          return {
            name: subject,
            teacherCount: teachers.length,
            classCount: classes.length,
            teachers: teachers,
            classes: classes
          };
        });

        setSubjects(subjectData);
      } catch (error) {
        console.error('Error loading subjects:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const filteredSubjects = subjects.filter(subject =>
    subject.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-2xl font-bold text-white mb-2">Subjects Management</h1>
          <p className="text-neutral-400">Manage curriculum subjects, teacher assignments, and class allocations</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Subject
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search subjects..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Subjects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.map((subject: any) => (
          <Card key={subject.name} className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span>{subject.name}</span>
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
                    <Users className="h-5 w-5 mr-2 text-blue-400" />
                    <span className="text-neutral-300">Teachers</span>
                  </div>
                  <span className="text-white font-bold">{subject.teacherCount}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <BookOpen className="h-5 w-5 mr-2 text-green-400" />
                    <span className="text-neutral-300">Classes</span>
                  </div>
                  <span className="text-white font-bold">{subject.classCount}</span>
                </div>

                <div>
                  <p className="text-sm text-neutral-400 mb-2">Assigned Teachers:</p>
                  <div className="space-y-1">
                    {subject.teachers.slice(0, 3).map((teacher: any) => (
                      <div key={teacher.id} className="text-sm text-neutral-300">
                        {teacher.name}
                      </div>
                    ))}
                    {subject.teachers.length > 3 && (
                      <div className="text-sm text-neutral-500">
                        +{subject.teachers.length - 3} more
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Add Subject Modal/Form would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Subject</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Subject form would be implemented here</p>
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
