'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { getSchoolRelationships, getTimetables, saveTimetable } from '@/lib/school-mis-data';
import { Plus, Calendar, Clock, Users, BookOpen } from 'lucide-react';

export default function TimetableManagementPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [timetable, setTimetable] = useState<any[]>([]);
  const [relationships, setRelationships] = useState<any>({});
  const [selectedClass, setSelectedClass] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
  const timeSlots = [
    '8:00 AM - 9:00 AM',
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM'
  ];

  useEffect(() => {
    const loadData = async () => {
      try {
        const relData = await getSchoolRelationships(subdomain);
        setRelationships(relData);

        const timetableData = getTimetables(subdomain);
        setTimetable(timetableData);

        // Set default class
        if (relData.students.length > 0) {
          const firstClass = [...new Set(relData.students.map((s: any) => s.class))][0];
          setSelectedClass(firstClass);
        }
      } catch (error) {
        console.error('Error loading timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [subdomain]);

  const classes = [...new Set(relationships.students?.map((s: any) => s.class) || [])] as string[];
  const filteredTimetable = selectedClass
    ? timetable.filter(entry => entry.class === selectedClass)
    : timetable;

  const getClassForSlot = (day: string, timeSlot: string) => {
    return filteredTimetable.find(entry => entry.day === day && entry.startTime === timeSlot.split(' - ')[0]);
  };

  const handleAddTimetableEntry = async (entry: any) => {
    try {
      await saveTimetable(subdomain, entry);
      setTimetable(prev => [...prev, { ...entry, id: Date.now().toString() }]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error saving timetable entry:', error);
    }
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
          <h1 className="text-2xl font-bold text-white mb-2">Timetable Management</h1>
          <p className="text-neutral-400">Create and manage weekly class schedules for all classes</p>
        </div>
        <Button
          onClick={() => setShowAddForm(true)}
          className="bg-primary hover:bg-primary/90"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Schedule
        </Button>
      </div>

      {/* Class Selector */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div>
              <label className="block text-sm font-medium text-neutral-300 mb-2">Select Class</label>
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
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-blue-400" />
                <span className="text-neutral-300">{filteredTimetable.length} scheduled classes</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Timetable Grid */}
      <Card className="bg-neutral-900 border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="h-5 w-5 mr-2" />
            Weekly Schedule {selectedClass && `- ${selectedClass}`}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-neutral-800">
                  <th className="text-left py-3 px-4 text-sm font-medium text-neutral-400">Time</th>
                  {daysOfWeek.map(day => (
                    <th key={day} className="text-center py-3 px-4 text-sm font-medium text-neutral-400">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map(timeSlot => (
                  <tr key={timeSlot} className="border-b border-neutral-800">
                    <td className="py-3 px-4 text-white font-medium">
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-neutral-400" />
                        {timeSlot}
                      </div>
                    </td>
                    {daysOfWeek.map(day => {
                      const classEntry = getClassForSlot(day, timeSlot);
                      return (
                        <td key={day} className="py-3 px-4">
                          {classEntry ? (
                            <div className="bg-primary/10 border border-primary/20 rounded-lg p-3">
                              <div className="font-medium text-white">{classEntry.subject}</div>
                              <div className="flex items-center text-sm text-neutral-300 mt-1">
                                <Users className="h-3 w-3 mr-1" />
                                {classEntry.teacher}
                              </div>
                              <div className="text-xs text-neutral-400 mt-1">
                                {classEntry.class}
                              </div>
                            </div>
                          ) : (
                            <div className="text-neutral-600 text-sm text-center">-</div>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Timetable Entry Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="w-full max-w-md bg-neutral-900 border-neutral-800">
            <CardHeader>
              <CardTitle className="text-white">Add Timetable Entry</CardTitle>
            </CardHeader>
            <CardContent>
              <TimetableForm
                classes={classes}
                teachers={relationships.teachers || []}
                onSubmit={handleAddTimetableEntry}
                onCancel={() => setShowAddForm(false)}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

function TimetableForm({ classes, teachers, onSubmit, onCancel }: any) {
  const [formData, setFormData] = useState({
    class: '',
    subject: '',
    teacher: '',
    day: 'Monday',
    startTime: '8:00 AM',
    endTime: '9:00 AM'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const selectedTeacher = teachers.find((t: any) => t.name === formData.teacher);
  const availableSubjects = selectedTeacher ? selectedTeacher.subjects : [];

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Class</label>
        <select
          name="class"
          value={formData.class}
          onChange={handleInputChange}
          className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Class</option>
          {classes.map((cls: string) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Teacher</label>
        <select
          name="teacher"
          value={formData.teacher}
          onChange={handleInputChange}
          className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Teacher</option>
          {teachers.map((teacher: any) => (
            <option key={teacher.id} value={teacher.name}>{teacher.name}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Subject</label>
        <select
          name="subject"
          value={formData.subject}
          onChange={handleInputChange}
          className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          <option value="">Select Subject</option>
          {availableSubjects.map((subject: string) => (
            <option key={subject} value={subject}>{subject}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-300 mb-2">Day</label>
        <select
          name="day"
          value={formData.day}
          onChange={handleInputChange}
          className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
          required
        >
          {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'].map(day => (
            <option key={day} value={day}>{day}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">Start Time</label>
          <select
            name="startTime"
            value={formData.startTime}
            onChange={handleInputChange}
            className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {['8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM'].map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-300 mb-2">End Time</label>
          <select
            name="endTime"
            value={formData.endTime}
            onChange={handleInputChange}
            className="w-full h-10 rounded-lg border border-neutral-800 bg-neutral-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary"
            required
          >
            {['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'].map(time => (
              <option key={time} value={time}>{time}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex space-x-3">
        <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
          Add Schedule
        </Button>
        <Button type="button" onClick={onCancel} variant="outline" className="flex-1">
          Cancel
        </Button>
      </div>
    </form>
  );
}
