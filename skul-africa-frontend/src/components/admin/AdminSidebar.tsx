'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  FileText,
  Users,
  BookOpen,
  Calendar,
  BarChart3,
  CreditCard,
  Settings,
  Image,
  GraduationCap,
  UserCheck,
  DollarSign,
} from 'lucide-react';
import { cn } from '@/lib/utils';

export function AdminSidebar() {
  const pathname = usePathname();

  // Extract subdomain from current path
  // Path format: /school/[subdomain]/admin/...
  const pathParts = pathname.split('/');
  const subdomainIndex = pathParts.indexOf('school') + 1;
  const subdomain = pathParts[subdomainIndex];

  const menuItems = [
    { href: `/school/${subdomain}/admin/dashboard`, label: 'Dashboard', icon: Home },
    { href: `/school/${subdomain}/admin/dashboard/students`, label: 'Students', icon: GraduationCap },
    { href: `/school/${subdomain}/admin/dashboard/teachers`, label: 'Teachers', icon: Users },
    { href: `/school/${subdomain}/admin/dashboard/parents`, label: 'Parents', icon: Users },
    { href: `/school/${subdomain}/admin/dashboard/classes`, label: 'Classes', icon: BookOpen },
    { href: `/school/${subdomain}/admin/dashboard/subjects`, label: 'Subjects', icon: BookOpen },
    { href: `/school/${subdomain}/admin/dashboard/timetable`, label: 'Timetable', icon: Calendar },
    { href: `/school/${subdomain}/admin/dashboard/attendance`, label: 'Attendance', icon: UserCheck },
    { href: `/school/${subdomain}/admin/dashboard/results`, label: 'Results', icon: BarChart3 },
    { href: `/school/${subdomain}/admin/dashboard/payments`, label: 'Payments', icon: DollarSign },
    { href: `/school/${subdomain}/admin/dashboard/notifications`, label: 'Notifications', icon: BarChart3 },
    { href: `/school/${subdomain}/admin/customize`, label: 'Website Customization', icon: Settings },
  ];

  return (
    <div className="w-64 bg-black border-r border-neutral-800 flex flex-col">
      <div className="p-6 border-b border-neutral-800">
        <h2 className="text-xl font-bold text-white">School Admin</h2>
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
          <span>View Public Site</span>
        </Link>
      </div>
    </div>
  );
}