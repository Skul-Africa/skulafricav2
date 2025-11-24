'use client';

import { Button } from '@/components/ui/button';
import { LogOut, User } from 'lucide-react';
import { useParams } from 'next/navigation';
import { NotificationBell } from '@/components/shared/NotificationBell';

export function StudentHeader() {
  const params = useParams();
  const subdomain = params.subdomain as string;

  const handleLogout = () => {
    localStorage.removeItem(`${subdomain}-current-student`);
    window.location.href = `/school/${subdomain}/student`;
  };

  // Get current student
  const currentStudent = typeof window !== 'undefined' ?
    JSON.parse(localStorage.getItem(`${subdomain}-current-student`) || 'null') : null;

  return (
    <header className="bg-black border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Student Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {currentStudent && (
          <span className="text-white">
            Welcome, {currentStudent.firstName} {currentStudent.lastName}
          </span>
        )}

        <NotificationBell userId="s1" userType="student" />

        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
          <User size={20} />
        </Button>

        <Button
          variant="ghost"
          className="text-neutral-400 hover:text-white"
          onClick={handleLogout}
        >
          <LogOut size={16} className="mr-2" />
          Logout
        </Button>
      </div>
    </header>
  );
}