'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentHeader } from '@/components/student/StudentHeader';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { getResultsForStudent } from '@/lib/school-mis-data';
import { FileText, TrendingUp, Award } from 'lucide-react';

export default function StudentResultsPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadResults = async () => {
      try {
        // In a real app, get student ID from authentication
        const studentId = 's1'; // Mock student ID
        const studentResults = await getResultsForStudent(subdomain, studentId);
        setResults(studentResults);
      } catch (error) {
        console.error('Error loading results:', error);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [subdomain]);

  const getGradeColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    return 'text-red-400';
  };

  const getGradeLetter = (score: number) => {
    if (score >= 80) return 'A';
    if (score >= 70) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'F';
  };

  const averageScore = results.length > 0
    ? Math.round(results.reduce((sum, result) => sum + result.score, 0) / results.length)
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
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">My Results</h1>
              <p className="text-neutral-400">View your academic performance and grades</p>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <FileText className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Total Subjects</p>
                      <p className="text-2xl font-bold text-white">{results.length}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-green-900/20 rounded-lg flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-400" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Average Score</p>
                      <p className={`text-2xl font-bold ${getGradeColor(averageScore)}`}>
                        {averageScore}%
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-neutral-900 border-neutral-800">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 bg-yellow-900/20 rounded-lg flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-400" />
                    </div>
                    <div>
                      <p className="text-sm text-neutral-400">Grade</p>
                      <p className={`text-2xl font-bold ${getGradeColor(averageScore)}`}>
                        {getGradeLetter(averageScore)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results Table */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Subject Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                {results.length === 0 ? (
                  <div className="text-center py-8">
                    <FileText className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                    <p className="text-neutral-400">No results available yet.</p>
                    <p className="text-sm text-neutral-500">Results will appear here when your teachers upload them.</p>
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-neutral-800">
                          <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Subject</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Score</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Grade</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Term</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result: any) => (
                          <tr key={result.id} className="border-b border-neutral-800">
                            <td className="py-3 px-4 text-white font-medium">{result.subject}</td>
                            <td className="py-3 px-4">
                              <span className={`font-bold ${getGradeColor(result.score)}`}>
                                {result.score}%
                              </span>
                            </td>
                            <td className="py-3 px-4">
                              <span className={`font-bold ${getGradeColor(result.score)}`}>
                                {getGradeLetter(result.score)}
                              </span>
                            </td>
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
          </div>
        </main>
      </div>
    </div>
  );
}
