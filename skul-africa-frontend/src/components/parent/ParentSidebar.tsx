'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  User,
  CreditCard,
  UserCheck,
  Settings,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function ParentSidebar() {
  const pathname = usePathname();

  // Extract subdomain from current path
  const pathParts = pathname.split('/');
  const subdomainIndex = pathParts.indexOf('school') + 1;
  const subdomain = pathParts[subdomainIndex];

  const menuItems = [
    { href: `/school/${subdomain}/parent/dashboard`, label: 'Dashboard', icon: Home },
    { href: `/school/${subdomain}/parent/dashboard/student-info`, label: 'Student Info', icon: User },
    { href: `/school/${subdomain}/parent/dashboard/payments`, label: 'Payments', icon: CreditCard },
    { href: `/school/${subdomain}/parent/dashboard/attendance`, label: 'Attendance', icon: UserCheck },
    { href: `/school/${subdomain}/parent/dashboard/profile`, label: 'Profile', icon: Settings },
  ];

  return (
    <div className="w-64 bg-black border-r border-neutral-800 flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold text-white">Parent Portal</h2>
      </div>

      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200',
                    isActive
                      ? 'bg-primary/10 text-primary border-l-4 border-primary'
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                  )}
                >
                  <Icon size={20} />
                  <span>{item.label}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 border-t border-neutral-800">
        <Link
          href={`/school/${subdomain}`}
          className="flex items-center space-x-3 px-3 py-2 rounded-lg text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors duration-200"
        >
          <Home size={20} />
          <span>View School Site</span>
        </Link>
      </div>
    </div>
  );
}