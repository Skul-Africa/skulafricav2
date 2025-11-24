'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { BookOpen, Users, Clock, Calendar } from 'lucide-react';

export default function TeacherClassesPage() {
  const classes = [
    {
      id: 1,
      name: 'Mathematics - Grade 10A',
      subject: 'Mathematics',
      grade: 'Grade 10',
      section: 'A',
      students: 25,
      schedule: 'Mon, Wed, Fri - 9:00 AM',
      room: 'Room 201',
    },
    {
      id: 2,
      name: 'Mathematics - Grade 10B',
      subject: 'Mathematics',
      grade: 'Grade 10',
      section: 'B',
      students: 22,
      schedule: 'Mon, Wed, Fri - 11:00 AM',
      room: 'Room 203',
    },
    {
      id: 3,
      name: 'Mathematics - Grade 9A',
      subject: 'Mathematics',
      grade: 'Grade 9',
      section: 'A',
      students: 28,
      schedule: 'Tue, Thu - 2:00 PM',
      room: 'Room 105',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">My Classes</h1>
          <p className="text-neutral-400">Manage your assigned classes</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90">
          <BookOpen className="w-4 h-4 mr-2" />
          Add Assignment
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((classItem) => (
          <Card key={classItem.id} className="bg-neutral-900 border-neutral-800 hover:border-primary/50 transition-colors">
            <CardHeader>
              <CardTitle className="text-white flex items-center justify-between">
                <span className="text-lg">{classItem.name}</span>
                <BookOpen className="h-5 w-5 text-primary" />
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-neutral-400">
                  <Users className="h-4 w-4" />
                  <span className="text-sm">{classItem.students} students</span>
                </div>
                <div className="flex items-center gap-2 text-neutral-400">
                  <Calendar className="h-4 w-4" />
                  <span className="text-sm">{classItem.grade}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-neutral-400">
                <Clock className="h-4 w-4" />
                <span className="text-sm">{classItem.schedule}</span>
              </div>

              <div className="text-neutral-400 text-sm">
                <strong>Room:</strong> {classItem.room}
              </div>

              <div className="flex gap-2 pt-2">
                <Button variant="outline" size="sm" className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                  View Students
                </Button>
                <Button variant="outline" size="sm" className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800">
                  Mark Attendance
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white">Class Performance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">87%</div>
              <p className="text-neutral-400">Average Attendance</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-500 mb-2">B+</div>
              <p className="text-neutral-400">Average Grade</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-500 mb-2">15</div>
              <p className="text-neutral-400">Assignments Due</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}