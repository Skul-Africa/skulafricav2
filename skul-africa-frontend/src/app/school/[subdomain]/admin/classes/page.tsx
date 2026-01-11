'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus, Search, Users, BookOpen, Loader2, Edit, Trash2 } from 'lucide-react';
import { getAllClassrooms, deleteClassroom } from '@/lib/api';
import { Classroom } from '@/types/api';
import { toast } from 'react-hot-toast';

export default function ClassesPage() {
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadClassrooms();
  }, []);

  const loadClassrooms = async () => {
    try {
      setLoading(true);
      const data = await getAllClassrooms();
      setClassrooms(data);
    } catch (error) {
      toast.error('Failed to load classrooms');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this classroom?')) return;

    try {
      await deleteClassroom(id);
      setClassrooms(prev => prev.filter(c => c.id !== id));
      toast.success('Classroom deleted successfully');
    } catch (error) {
      toast.error('Failed to delete classroom');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">Classes Management</h1>
          <p className="text-neutral-400">Manage class structures and assignments.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="h-4 w-4 mr-2" />
          Add Class
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
              <Input
                placeholder="Search classes..."
                className="pl-10 bg-neutral-800 border-neutral-700"
              />
            </div>
            <Button variant="outline" className="border-neutral-700 text-neutral-300">
              Filter
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Classes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classrooms.length === 0 ? (
          <div className="col-span-full text-center py-12">
            <p className="text-neutral-400">No classrooms found</p>
          </div>
        ) : (
          classrooms.map((classroom) => (
            <Card key={classroom.id} className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-between">
                  {classroom.name || 'Unnamed Class'}
                  <span className="text-sm font-normal text-green-400">Active</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  {classroom.level && (
                    <div className="flex items-center text-sm text-neutral-300">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Level: {classroom.level}
                    </div>
                  )}
                  {classroom.capacity && (
                    <div className="flex items-center text-sm text-neutral-300">
                      <Users className="h-4 w-4 mr-2" />
                      Capacity: {classroom.capacity}
                    </div>
                  )}
                </div>

                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 border-neutral-700 text-neutral-300">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-neutral-700 text-red-400 hover:text-red-300"
                    onClick={() => classroom.id && handleDelete(classroom.id)}
                  >
                    <Trash2 className="h-4 w-4 mr-1" />
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}