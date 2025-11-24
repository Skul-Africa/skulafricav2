'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StudentHeader } from '@/components/student/StudentHeader';
import { StudentSidebar } from '@/components/student/StudentSidebar';
import { getTimetablesForClass } from '@/lib/school-mis-data';
import { Calendar, Clock, User } from 'lucide-react';

export default function StudentClassesPage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [timetable, setTimetable] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTimetable = async () => {
      try {
        // In a real app, get student class from authentication/profile
        const studentClass = 'JSS 1'; // Mock class
        const classTimetable = await getTimetablesForClass(subdomain, studentClass);
        setTimetable(classTimetable);
      } catch (error) {
        console.error('Error loading timetable:', error);
      } finally {
        setLoading(false);
      }
    };

    loadTimetable();
  }, [subdomain]);

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

  const getClassForSlot = (day: string, timeSlot: string) => {
    return timetable.find(entry => entry.day === day && entry.startTime === timeSlot.split(' - ')[0]);
  };

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
              <h1 className="text-2xl font-bold text-white mb-2">Class Timetable</h1>
              <p className="text-neutral-400">View your weekly class schedule</p>
            </div>

            {/* Timetable Grid */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Weekly Schedule - JSS 1
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
                                      <User className="h-3 w-3 mr-1" />
                                      {classEntry.teacher}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="text-neutral-600 text-sm">-</div>
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

            {/* Today's Classes */}
            <Card className="bg-neutral-900 border-neutral-800">
              <CardHeader>
                <CardTitle className="text-white">Today's Classes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {(() => {
                    const today = new Date().toLocaleDateString('en-US', { weekday: 'long' }).toLowerCase();
                    const todayClasses = timetable.filter(entry =>
                      entry.day.toLowerCase() === today ||
                      (today === 'saturday' && entry.day === 'Saturday') ||
                      (today === 'sunday' && entry.day === 'Sunday')
                    );

                    if (todayClasses.length === 0) {
                      return (
                        <div className="text-center py-8">
                          <Calendar className="h-12 w-12 text-neutral-600 mx-auto mb-4" />
                          <p className="text-neutral-400">No classes scheduled for today.</p>
                        </div>
                      );
                    }

                    return todayClasses.map(entry => (
                      <div key={entry.id} className="flex items-center justify-between p-4 bg-neutral-800 rounded-lg">
                        <div>
                          <h3 className="text-white font-medium">{entry.subject}</h3>
                          <p className="text-sm text-neutral-400">{entry.teacher}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-white font-medium">{entry.startTime} - {entry.endTime}</p>
                          <p className="text-sm text-neutral-400">{entry.day}</p>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}