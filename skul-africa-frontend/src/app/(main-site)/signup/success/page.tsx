'use client';

import { useEffect, useState, Suspense } from 'react';
import {jwtDecode }from 'jwt-decode';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Settings, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface TokenPayload {
  sub: string;
  email: string;
  name: string;
  role: string;
  subdomain: string;
}

function getOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3000';
}

function SignupSuccessContent() {
  const [school, setSchool] = useState<TokenPayload | null>(null);
  const [countdown, setCountdown] = useState(5);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');

    if (!token) {
      setError('Authentication token missing');
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);
      setSchool(decoded);
    } catch {
      setError('Invalid token');
    }
  }, []);

  useEffect(() => {
    if (!school?.subdomain) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = `/school/${school.subdomain}/dashboard`;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [school]);

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <Loader2 className="animate-spin text-primary" />
      </div>
    );
  }

  const schoolUrl = `/school/${school.subdomain}`;
  const adminUrl = `${schoolUrl}/dashboard`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <Card className="bg-neutral-900 border-neutral-800 max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Welcome {school.name} 🎉
          </CardTitle>
          <p className="text-neutral-400">
            Your school website has been successfully created!
          </p>
        </CardHeader>

        <CardContent className="space-y-6">

          <div className="bg-neutral-800 rounded-lg p-4">
            <p><b>Subdomain:</b> {school.subdomain}</p>
            <p><b>Email:</b> {school.email}</p>
            <p><b>Role:</b> {school.role}</p>
          </div>

          <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-4">
            Redirecting in {countdown}s...
          </div>

          <div className="flex gap-4">
            <Button
              onClick={() => window.location.href = adminUrl}
              className="flex-1"
            >
              <Settings className="mr-2" /> Dashboard
            </Button>

            <Button
              variant="outline"
              onClick={() => window.location.href = schoolUrl}
              className="flex-1"
            >
              <Eye className="mr-2" /> Preview
            </Button>
          </div>

        </CardContent>
      </Card>
    </div>
  );
}

export default function MainSignupSuccessPage() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <SignupSuccessContent />
    </Suspense>
  );
}
