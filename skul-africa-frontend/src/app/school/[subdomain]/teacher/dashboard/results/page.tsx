'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { TeacherHeader } from '@/components/teacher/TeacherHeader';
import { TeacherSidebar } from '@/components/teacher/TeacherSidebar';
import { getSchoolRelationships, getStudentsForTeacher, saveResult, getResultsForTeacher } from '@/lib/school-mis-data';
import { Plus, Save, FileText } from 'lucide-react';

export default function TeacherResultsPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [students, setStudents] = useState<any[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  const [selectedStudent, setSelectedStudent] = useState('');
  const [score, setScore] = useState('');
  const [term, setTerm] = useState('First Term');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const teacherStudents = await getStudentsForTeacher(subdomain, 'current-teacher-id'); // In real app, get from auth
        setStudents(teacherStudents);
        const teacherResults = await getResultsForTeacher(subdomain, 'current-teacher-id');
        setResults(teacherResults);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const handleSaveResult = async () => {
    if (!selectedStudent || !selectedSubject || !score) return;

    try {
      await saveResult(subdomain, {
        studentId: selectedStudent,
        subject: selectedSubject,
        score: parseInt(score),
        term,
        teacherId: 'current-teacher-id', // In real app, get from auth
        date: new Date().toISOString(),
      });

      // Refresh results
      const updatedResults = await getResultsForTeacher(subdomain, 'current-teacher-id');
      setResults(updatedResults);

      // Reset form
      setSelectedStudent('');
      setScore('');
      alert('Result saved successfully!');
    } catch (error) {
      console.error('Error saving result:', error);
      alert('Error saving result');
    }
  };

  const classes = [...new Set(students.map(s => s.class))];
  const subjects = ['Mathematics', 'English', 'Physics', 'Chemistry', 'Biology', 'Geography', 'History', 'Economics'];

  if (loading) {
    return (
      <div className="min-h-screen bg-neutral-950 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col">
        <TeacherHeader />
        <main className="flex-1 p-6">
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl font-bold text-white mb-2">Upload Results</h1>
              <p className="text-neutral-400">Record student assessment scores</p>
            </div>

            {/* Upload Result Form */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Plus className="h-5 w-5 mr-2" />
                  Add New Result
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Class</label>
                    <select
                      value={selectedClass}
                      onChange={(e) => setSelectedClass(e.target.value)}
                      className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select class</option>
                      {classes.map(cls => (
                        <option key={cls} value={cls}>{cls}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Subject</label>
                    <select
                      value={selectedSubject}
                      onChange={(e) => setSelectedSubject(e.target.value)}
                      className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select subject</option>
                      {subjects.map(subject => (
                        <option key={subject} value={subject}>{subject}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Student</label>
                    <select
                      value={selectedStudent}
                      onChange={(e) => setSelectedStudent(e.target.value)}
                      className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="">Select student</option>
                      {students
                        .filter(s => !selectedClass || s.class === selectedClass)
                        .map(student => (
                        <option key={student.id} value={student.id}>
                          {student.name} ({student.class})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Score</label>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={score}
                      onChange={(e) => setScore(e.target.value)}
                      placeholder="0-100"
                      className="bg-neutral-800 border-neutral-700"
                    />
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Term</label>
                    <select
                      value={term}
                      onChange={(e) => setTerm(e.target.value)}
                      className="w-40 h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="First Term">First Term</option>
                      <option value="Second Term">Second Term</option>
                      <option value="Third Term">Third Term</option>
                    </select>
                  </div>

                  <Button
                    onClick={handleSaveResult}
                    className="bg-primary hover:bg-primary/90 mt-6"
                    disabled={!selectedStudent || !selectedSubject || !score}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Result
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Recent Results */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Recent Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Student</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Subject</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Score</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Term</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.slice(0, 10).map((result: any) => {
                        const student = students.find(s => s.id === result.studentId);
                        return (
                          <tr key={result.id} className="border-b border-neutral-800">
                            <td className="py-3 px-4 text-white">{student?.name || 'Unknown'}</td>
                            <td className="py-3 px-4 text-neutral-300">{result.subject}</td>
                            <td className="py-3 px-4 text-white font-medium">{result.score}%</td>
                            <td className="py-3 px-4 text-neutral-300">{result.term}</td>
                            <td className="py-3 px-4 text-neutral-300">
                              {new Date(result.date).toLocaleDateString()}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}