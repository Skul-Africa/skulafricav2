'use client';

import { TeacherSidebar } from '@/components/teacher/TeacherSidebar';
import { TeacherHeader } from '@/components/teacher/TeacherHeader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const subdomain = params.subdomain as string;

  useEffect(() => {
    // Check if teacher is logged in
    const currentTeacher = localStorage.getItem(`${subdomain}-current-teacher`);
    if (!currentTeacher) {
      router.push(`/school/${subdomain}/teacher`);
    }
  }, [subdomain, router]);

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <TeacherSidebar />
      <div className="flex-1 flex flex-col">
        <TeacherHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}