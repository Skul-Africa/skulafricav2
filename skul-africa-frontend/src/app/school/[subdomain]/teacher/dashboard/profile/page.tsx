'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { User, Mail, Phone, BookOpen, Save } from 'lucide-react';

export default function TeacherProfilePage() {
  const params = useParams();
  const subdomain = params.subdomain as string;
  const [teacher, setTeacher] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    employeeId: '',
  });

  useEffect(() => {
    const currentTeacher = JSON.parse(localStorage.getItem(`${subdomain}-current-teacher`) || 'null');
    if (currentTeacher) {
      setTeacher(currentTeacher);
      setFormData({
        firstName: currentTeacher.firstName || '',
        lastName: currentTeacher.lastName || '',
        email: currentTeacher.email || '',
        phone: currentTeacher.phone || '',
        subject: currentTeacher.subject || '',
        employeeId: currentTeacher.employeeId || '',
      });
    }
  }, [subdomain]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    if (!teacher) return;

    const updatedTeacher = { ...teacher, ...formData };
    setTeacher(updatedTeacher);

    // Update in localStorage
    localStorage.setItem(`${subdomain}-current-teacher`, JSON.stringify(updatedTeacher));

    // Update in teachers list
    const teachers = JSON.parse(localStorage.getItem(`${subdomain}-teachers`) || '[]');
    const updatedTeachers = teachers.map((t: any) =>
      t.id === teacher.id ? updatedTeacher : t
    );
    localStorage.setItem(`${subdomain}-teachers`, JSON.stringify(updatedTeachers));

    setIsEditing(false);
  };

  if (!teacher) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">My Profile</h1>
        <p className="text-neutral-400">Manage your personal and professional information</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center mb-4">
                  <User className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {teacher.firstName} {teacher.lastName}
                </h3>
                <p className="text-neutral-400 mb-2">{teacher.employeeId || 'Teacher'}</p>
                <p className="text-neutral-400 text-sm">{teacher.subject || 'Mathematics'}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2">
          <Card className="bg-neutral-900 border-neutral-800">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-white">Personal Information</CardTitle>
              <Button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {isEditing ? 'Save Changes' : 'Edit Profile'}
              </Button>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    First Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <User className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{teacher.firstName}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Last Name
                  </label>
                  {isEditing ? (
                    <Input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <User className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{teacher.lastName}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Email Address
                </label>
                {isEditing ? (
                  <Input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-neutral-800 border-neutral-700 text-white"
                  />
                ) : (
                  <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                    <Mail className="w-5 h-5 text-neutral-400 mr-3" />
                    <span className="text-white">{teacher.email}</span>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Phone Number
                  </label>
                  {isEditing ? (
                    <Input
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Enter phone number"
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <Phone className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{teacher.phone || 'Not provided'}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-300 mb-2">
                    Subject
                  </label>
                  {isEditing ? (
                    <Input
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      placeholder="Subject taught"
                      className="bg-neutral-800 border-neutral-700 text-white"
                    />
                  ) : (
                    <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                      <BookOpen className="w-5 h-5 text-neutral-400 mr-3" />
                      <span className="text-white">{teacher.subject || 'Not specified'}</span>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-neutral-300 mb-2">
                  Employee ID
                </label>
                <div className="flex items-center p-3 bg-neutral-800 rounded-lg">
                  <User className="w-5 h-5 text-neutral-400 mr-3" />
                  <span className="text-white">{teacher.employeeId || 'Not assigned'}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}