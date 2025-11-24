'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Users, Search, Mail, Phone } from 'lucide-react';
import { useState } from 'react';

export default function TeacherStudentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All Classes');

  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNo: '001',
      class: 'Grade 10A',
      email: 'john.doe@school.edu',
      phone: '+234 123 456 7890',
      attendance: 92,
      averageGrade: 87,
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNo: '002',
      class: 'Grade 10A',
      email: 'jane.smith@school.edu',
      phone: '+234 123 456 7891',
      attendance: 88,
      averageGrade: 90,
    },
    {
      id: 3,
      name: 'Bob Johnson',
      rollNo: '003',
      class: 'Grade 10B',
      email: 'bob.johnson@school.edu',
      phone: '+234 123 456 7892',
      attendance: 95,
      averageGrade: 85,
    },
    {
      id: 4,
      name: 'Alice Brown',
      rollNo: '004',
      class: 'Grade 9A',
      email: 'alice.brown@school.edu',
      phone: '+234 123 456 7893',
      attendance: 90,
      averageGrade: 88,
    },
  ];

  const classes = ['All Classes', 'Grade 10A', 'Grade 10B', 'Grade 9A'];

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         student.rollNo.includes(searchTerm);
    const matchesClass = selectedClass === 'All Classes' || student.class === selectedClass;
    return matchesSearch && matchesClass;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Students</h1>
          <p className="text-neutral-400">View and manage your students</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <Users className="w-4 h-4 mr-2" />
          Export List
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Total Students</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{students.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Grade 10A</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {students.filter(s => s.class === 'Grade 10A').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Grade 10B</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {students.filter(s => s.class === 'Grade 10B').length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-neutral-900 border-neutral-800">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-neutral-400">Grade 9A</CardTitle>
            <Users className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">
              {students.filter(s => s.class === 'Grade 9A').length}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Student Directory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
                <Input
                  placeholder="Search students by name or roll number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-neutral-800 border-neutral-700 text-white placeholder-neutral-500"
                />
              </div>
            </div>
            <div className="w-full md:w-48">
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="w-full bg-neutral-800 border border-neutral-700 text-white rounded-lg px-3 py-2 focus:border-primary"
              >
                {classes.map((className) => (
                  <option key={className} value={className}>{className}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="space-y-4">
            {filteredStudents.map((student) => (
              <div key={student.id} className="flex items-center justify-between p-4 border border-neutral-800 rounded-lg hover:border-primary/50 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-white font-medium">{student.name}</h3>
                    <p className="text-neutral-400 text-sm">Roll No: {student.rollNo} • {student.class}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-6">
                  <div className="text-center">
                    <p className="text-white font-medium">{student.attendance}%</p>
                    <p className="text-neutral-400 text-xs">Attendance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white font-medium">{student.averageGrade}%</p>
                    <p className="text-neutral-400 text-xs">Average</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                      <Mail className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}