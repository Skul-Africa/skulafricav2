'use client';

import { ParentSidebar } from '@/components/parent/ParentSidebar';
import { ParentHeader } from '@/components/parent/ParentHeader';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ParentDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const params = useParams();
  const router = useRouter();
  const subdomain = params.subdomain as string;

  useEffect(() => {
    // Check if parent is logged in
    const currentParent = localStorage.getItem(`${subdomain}-current-parent`);
    if (!currentParent) {
      router.push(`/school/${subdomain}/parent`);
    }
  }, [subdomain, router]);

  return (
    <div className="min-h-screen bg-neutral-950 flex">
      <ParentSidebar />
      <div className="flex-1 flex flex-col">
        <ParentHeader />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
}