'use client';

import { Button } from '@/components/ui/button';
import { LogOut, Bell, User } from 'lucide-react';
import { useParams } from 'next/navigation';

export function ParentHeader() {
  const params = useParams();
  const subdomain = params.subdomain as string;

  const handleLogout = () => {
    localStorage.removeItem(`${subdomain}-current-parent`);
    window.location.href = `/school/${subdomain}/parent`;
  };

  // Get current parent
  const currentParent = typeof window !== 'undefined' ?
    JSON.parse(localStorage.getItem(`${subdomain}-current-parent`) || 'null') : null;

  return (
    <header className="bg-black border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold text-white">Parent Dashboard</h1>
      </div>

      <div className="flex items-center space-x-4">
        {currentParent && (
          <span className="text-white">
            Welcome, {currentParent.firstName} {currentParent.lastName}
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