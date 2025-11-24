'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Bell, User } from 'lucide-react';
import { useParams } from 'next/navigation';

export function TeacherHeader() {
  const params = useParams();
  const subdomain = params.subdomain as string;

  const handleLogout = () => {
    localStorage.removeItem(`${subdomain}-current-teacher`);
    window.location.href = `/school/${subdomain}/teacher`;
  };

  // Get current teacher
  const currentTeacher = typeof window !== 'undefined' ?
    JSON.parse(localStorage.getItem(`${subdomain}-current-teacher`) || 'null') : null;

  return (
    <header className="bg-black border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Teacher Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {currentTeacher && (
          <span className="text-white">
            Welcome, {currentTeacher.firstName} {currentTeacher.lastName}
          </span>
        )}

        <Button variant="ghost" size="icon" className="text-neutral-400 hover:text-white">
          <Bell size={20} />
        </Button>

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