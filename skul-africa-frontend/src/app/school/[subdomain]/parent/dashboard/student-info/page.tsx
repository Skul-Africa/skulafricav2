'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ParentHeader } from '@/components/parent/ParentHeader';
import { ParentSidebar } from '@/components/parent/ParentSidebar';
import { getStudentsForParent, getResultsForStudent, getAttendanceForStudent } from '@/lib/school-mis-data';
import { Users, FileText, UserCheck, TrendingUp } from 'lucide-react';

export default function ParentStudentInfoPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [children, setChildren] = useState<any[]>([]);
  const [selectedChild, setSelectedChild] = useState<string>('');
  const [childResults, setChildResults] = useState<any[]>([]);
  const [childAttendance, setChildAttendance] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadChildren = async () => {
      try {
        // In a real app, get parent ID from authentication
        const parentId = 'p1'; // Mock parent ID
        const parentChildren = await getStudentsForParent(subdomain, parentId);
        setChildren(parentChildren);
        if (parentChildren.length > 0) {
          setSelectedChild(parentChildren[0].id);
        }
      } catch (error) {
        console.error('Error loading children:', error);
      } finally {
        setLoading(false);
      }
    };

    loadChildren();
  }, [subdomain]);

  useEffect(() => {
    const loadChildData = async () => {
      if (!selectedChild) return;

      try {
        const [results, attendance] = await Promise.all([
          getResultsForStudent(subdomain, selectedChild),
          getAttendanceForStudent(subdomain, selectedChild)
        ]);

        setChildResults(results);
        setChildAttendance(attendance);
      } catch (error) {
        console.error('Error loading child data:', error);
      }
    };

    loadChildData();
  }, [subdomain, selectedChild]);

  const selectedChildData = children.find(child => child.id === selectedChild);
  const attendanceRate = childAttendance.length > 0
    ? Math.round((childAttendance.filter(a => a.status === 'present').length / childAttendance.length) * 100)
    : 0;

  const averageScore = childResults.length > 0
    ? Math.round(childResults.reduce((sum, result) => sum + result.score, 0) / childResults.length)
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <ParentSidebar />
      <div className="flex-1 flex flex-col">
        <ParentHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Student Information</h1>
              <p className="text-neutral-400">Monitor your child's academic progress and attendance</p>
            </div>

            {/* Child Selector */}
            {children.length > 1 && (
              <Card className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Select Child</label>
                    <select
                      value={selectedChild}
                      onChange={(e) => setSelectedChild(e.target.value)}
                      className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      {children.map(child => (
                        <option key={child.id} value={child.id}>
                          {child.name} - {child.class}
                        </option>
                      ))}
                    </select>
                  </div>
                </CardContent>
              </Card>
            )}

            {selectedChildData && (
              <>
                {/* Child Overview */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-blue-900/20 rounded-lg flex items-center justify-center">
                          <Users className="h-6 w-6 text-blue-400" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400">Student</p>
                          <p className="text-lg font-bold text-white">{selectedChildData.name}</p>
                          <p className="text-sm text-neutral-500">{selectedChildData.class}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                          <FileText className="h-6 w-6 text-green-400" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400">Average Score</p>
                          <p className="text-2xl font-bold text-white">{averageScore}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-yellow-900/20 rounded-lg flex items-center justify-center">
                          <UserCheck className="h-6 w-6 text-yellow-400" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400">Attendance</p>
                          <p className="text-2xl font-bold text-white">{attendanceRate}%</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-neutral-900 border-neutral-800">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="h-12 w-12 bg-purple-900/20 rounded-lg flex items-center justify-center">
                          <TrendingUp className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <p className="text-sm text-neutral-400">Subjects</p>
                          <p className="text-2xl font-bold text-white">{childResults.length}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Academic Results */}
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-white">Academic Results</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {childResults.length === 0 ? (
                      <div className="text-center py-8">
                        <FileText className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                        <p className="text-neutral-400">No results available yet.</p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-neutral-800">
                              <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Subject</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Score</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Term</th>
                              <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                            </tr>
                          </thead>
                          <tbody>
                            {childResults.map((result: any) => (
                              <tr key={result.id} className="border-b border-neutral-800">
                                <td className="py-3 px-4 text-white font-medium">{result.subject}</td>
                                <td className="py-3 px-4 text-white font-bold">{result.score}%</td>
                                <td className="py-3 px-4 text-neutral-300">{result.term}</td>
                                <td className="py-3 px-4 text-neutral-300">
                                  {new Date(result.date).toLocaleDateString()}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Recent Attendance */}
                <Card className="bg-neutral-900 border-neutral-800">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Attendance</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {childAttendance.length === 0 ? (
                      <div className="text-center py-8">
                        <UserCheck className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                        <p className="text-neutral-400">No attendance records yet.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {childAttendance.slice(0, 6).map((record: any) => (
                          <div key={record.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                            <div>
                              <p className="text-white font-medium">
                                {new Date(record.date).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-neutral-400">{record.class}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              record.status === 'present'
                                ? 'bg-green-900/20 text-green-400'
                                : 'bg-red-900/20 text-red-400'
                            }`}>
                              {record.status}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}