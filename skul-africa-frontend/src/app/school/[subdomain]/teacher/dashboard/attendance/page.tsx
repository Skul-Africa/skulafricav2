'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { TeacherHeader } from '@/components/teacher/TeacherHeader';
import { TeacherSidebar } from '@/components/teacher/TeacherSidebar';
import { getStudentsForTeacher, saveAttendance, getAttendanceForTeacher } from '@/lib/school-mis-data';
import { CheckCircle, XCircle, Calendar, Save } from 'lucide-react';

export default function TeacherAttendancePage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [students, setStudents] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<Record<string, 'present' | 'absent'>>({});
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedClass, setSelectedClass] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const teacherStudents = await getStudentsForTeacher(subdomain, 'current-teacher-id');
        setStudents(teacherStudents);

        // Load existing attendance for the selected date
        const existingAttendance = await getAttendanceForTeacher(subdomain, 'current-teacher-id', selectedDate);
        const attendanceMap: Record<string, 'present' | 'absent'> = {};
        existingAttendance.forEach((record: any) => {
          attendanceMap[record.studentId] = record.status;
        });
        setAttendance(attendanceMap);
      } catch (error) {
        console.error('Error loading data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain, selectedDate]);

  const handleAttendanceChange = (studentId: string, status: 'present' | 'absent') => {
    setAttendance(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleSaveAttendance = async () => {
    try {
      const attendanceRecords = Object.entries(attendance).map(([studentId, status]) => ({
        studentId,
        status,
        date: selectedDate,
        teacherId: 'current-teacher-id',
        class: selectedClass,
      }));

      await Promise.all(attendanceRecords.map(record => saveAttendance(subdomain, record)));
      alert('Attendance saved successfully!');
    } catch (error) {
      console.error('Error saving attendance:', error);
      alert('Error saving attendance');
    }
  };

  const classes = [...new Set(students.map(s => s.class))];
  const filteredStudents = selectedClass ? students.filter(s => s.class === selectedClass) : students;

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
              <h1 className="text-2xl font-bold text-white mb-2">Mark Attendance</h1>
              <p className="text-neutral-400">Record daily attendance for your students</p>
            </div>

            {/* Date and Class Selection */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Date</label>
                    <input
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">Class</label>
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

                  <Button
                    onClick={handleSaveAttendance}
                    className="bg-primary hover:bg-primary/90 mt-6"
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save Attendance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Attendance Table */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Student Attendance - {filteredStudents.length} Students
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-neutral-800">
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Student Name</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Class</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Status</th>
                        <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student) => (
                        <tr key={student.id} className="border-b border-neutral-800">
                          <td className="py-3 px-4 text-white font-medium">{student.name}</td>
                          <td className="py-3 px-4 text-neutral-300">{student.class}</td>
                          <td className="py-3 px-4">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                              attendance[student.id] === 'present'
                                ? 'bg-green-900/20 text-green-400'
                                : attendance[student.id] === 'absent'
                                ? 'bg-red-900/20 text-red-400'
                                : 'bg-neutral-700 text-neutral-400'
                            }`}>
                              {attendance[student.id] === 'present' && <CheckCircle className="h-3 w-3 mr-1" />}
                              {attendance[student.id] === 'absent' && <XCircle className="h-3 w-3 mr-1" />}
                              {attendance[student.id] || 'Not Marked'}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center space-x-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAttendanceChange(student.id, 'present')}
                                className={`text-green-400 hover:text-green-300 hover:bg-green-900/20 ${
                                  attendance[student.id] === 'present' ? 'bg-green-900/20' : ''
                                }`}
                              >
                                <CheckCircle className="h-4 w-4 mr-1" />
                                Present
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handleAttendanceChange(student.id, 'absent')}
                                className={`text-red-400 hover:text-red-300 hover:bg-red-900/20 ${
                                  attendance[student.id] === 'absent' ? 'bg-red-900/20' : ''
                                }`}
                              >
                                <XCircle className="h-4 w-4 mr-1" />
                                Absent
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
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