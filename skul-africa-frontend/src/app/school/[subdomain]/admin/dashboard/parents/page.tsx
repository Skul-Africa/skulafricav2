'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships } from '@/lib/school-mis-data';
import { Plus, Search, Edit, Trash2, Users, Phone, Mail } from 'lucide-react';

interface Parent {
  id: string;
  name: string;
  email: string;
  phone: string;
  studentIds: string[];
}

export default function ParentsManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [parents, setParents] = useState<Parent[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);
        setParents(relData.parents);
      } catch (error) {
        console.error('Error loading parents:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const filteredParents = parents.filter(parent =>
    parent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    parent.phone.includes(searchTerm)
  );

  const getParentChildren = (parentId: string) => {
    return relationships.students?.filter((s: any) =>
      relationships.links?.some((link: any) => link.studentId === s.id && link.parentId === parentId)
    ) || [];
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
          <h1 className="text-2xl font-bold text-white mb-2">Parents Management</h1>
          <p className="text-neutral-400">Manage parent accounts and their student relationships</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Parent
        </Button>
      </div>

      {/* Search */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-400" />
            <Input
              placeholder="Search parents by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-neutral-800 border-neutral-700"
            />
          </div>
        </CardContent>
      </Card>

      {/* Parents Table */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Parents ({filteredParents.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Parent</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Contact</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Children</th>
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredParents.map((parent) => {
                  const children = getParentChildren(parent.id);

                  return (
                    <tr key={parent.id} className="border-b border-neutral-800 hover:bg-neutral-800/50">
                      <td className="py-3 px-4">
                        <div>
                          <div className="text-white font-medium">{parent.name}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          <div className="flex items-center text-sm text-neutral-300">
                            <Mail className="h-3 w-3 mr-2" />
                            {parent.email}
                          </div>
                          <div className="flex items-center text-sm text-neutral-300">
                            <Phone className="h-3 w-3 mr-2" />
                            {parent.phone}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <div className="space-y-1">
                          {children.length > 0 ? (
                            children.map((child: any) => (
                              <div key={child.id} className="text-sm">
                                <span className="text-white">{child.name}</span>
                                <span className="text-neutral-400 ml-2">({child.class})</span>
                              </div>
                            ))
                          ) : (
                            <span className="text-neutral-500 text-sm">No children assigned</span>
                          )}
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

      {/* Add Parent Modal/Form would go here */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add New Parent</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-neutral-400">Parent form would be implemented here</p>
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