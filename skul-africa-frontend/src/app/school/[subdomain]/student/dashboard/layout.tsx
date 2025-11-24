'use client';

import { StudentSidebar } from '@/components/student/StudentSidebar';
import { StudentHeader } from '@/components/student/StudentHeader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function StudentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const subdomain = params.subdomain as string;

  useEffect(() => {
    // Check if student is logged in
    const currentStudent = localStorage.getItem(`${subdomain}-current-student`);
    if (!currentStudent) {
      router.push(`/school/${subdomain}/student`);
    }
  }, [subdomain, router]);

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <StudentSidebar />
      <div className="flex-1 flex flex-col">
        <StudentHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}