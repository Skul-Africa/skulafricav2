'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Settings, Eye, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { getSchoolBySubdomain } from '@/lib/school-data';

function getOrigin() {
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  return 'http://localhost:3000'; // Fallback for SSR
}

import { Suspense } from 'react';

function SignupSuccessContent() {
  const searchParams = useSearchParams();
  const subdomain = searchParams.get('subdomain');
  const schoolName = searchParams.get('name');
  const [countdown, setCountdown] = useState(5);
  const [isCreating, setIsCreating] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initializeSchool = async () => {
      if (!subdomain || !schoolName) {
        setError('Missing school information');
        setIsCreating(false);
        return;
      }

      try {
        // School should already be created by the signup form
        // Just verify it exists
        const school = await getSchoolBySubdomain(subdomain);
        if (!school) {
          throw new Error('School was not created properly');
        }

        setIsCreating(false);

        // Start countdown for redirect
        const timer = setInterval(() => {
          setCountdown((prev) => {
            if (prev <= 1) {
              clearInterval(timer);
              // Redirect to the admin dashboard of the new subdomain
              window.location.href = `/school/${subdomain}/dashboard`;
              return 0;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(timer);
      } catch (err) {
        setError('Failed to create school. Please try again.');
        setIsCreating(false);
      }
    };

    initializeSchool();
  }, [subdomain, schoolName]);

  if (!subdomain || !schoolName) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <Card className="bg-neutral-900 border-neutral-800 max-w-md w-full text-center">
          <CardContent className="p-8">
            <p className="text-neutral-400">Invalid access. Please complete registration first.</p>
            <Link href="/signup">
              <Button className="mt-4 bg-primary hover:bg-primary/90">
                Go to Registration
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
        <Card className="bg-neutral-900 border-neutral-800 max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 bg-red-900/20 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-2xl">!</span>
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Setup Failed
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-neutral-400 mb-4">{error}</p>
            <Link href="/signup">
              <Button className="bg-primary hover:bg-primary/90">
                Try Again
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isCreating) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
        <Card className="bg-neutral-900 border-neutral-800 max-w-md w-full text-center">
          <CardHeader>
            <div className="mx-auto mb-4 h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center">
              <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
            <CardTitle className="text-2xl font-bold text-white mb-2">
              Setting Up Your School
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <p className="text-neutral-400">
              Creating <span className="text-primary font-semibold">{schoolName}</span>...
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const schoolUrl = `/school/${subdomain}`;
  const adminUrl = `${schoolUrl}/dashboard`;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4 py-8">
      <Card className="bg-neutral-900 border-neutral-800 max-w-2xl w-full">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-16 w-16 bg-green-900/20 rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-green-400" />
          </div>
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Congratulations! 🎉
          </CardTitle>
          <p className="text-neutral-400">
            Your school website has been successfully created and is ready to go live!
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* School Info */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-2">Your School Details</h3>
            <div className="space-y-2 text-sm">
              <p className="text-neutral-300">
                <span className="font-medium">Subdomain:</span> {subdomain}
              </p>
              <p className="text-neutral-300">
                <span className="font-medium">Website URL:</span>{' '}
                <Link href={schoolUrl} className="text-primary hover:text-primary/80 underline">
                  {getOrigin()}{schoolUrl}
                </Link>
              </p>
              <p className="text-neutral-300">
                <span className="font-medium">Admin URL:</span>{' '}
                <Link href={adminUrl} className="text-primary hover:text-primary/80 underline">
                  {getOrigin()}{adminUrl}
                </Link>
              </p>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-neutral-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-white mb-4">What's Next?</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-start space-x-3">
                <Settings className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Customize Your Website</h4>
                  <p className="text-sm text-neutral-400">Edit content, upload images, and personalize your school's online presence.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Eye className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="text-white font-medium">Preview & Publish</h4>
                  <p className="text-sm text-neutral-400">Review your website and make it live for students and parents.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Auto Redirect */}
          <div className="text-center bg-primary/10 border border-primary/20 rounded-lg p-4">
            <p className="text-white font-medium mb-2">
              Automatically redirecting to your admin dashboard in {countdown} seconds...
            </p>
            <p className="text-sm text-neutral-400">
              You'll be taken to your school's admin panel to start customizing your website.
            </p>
          </div>

          {/* Manual Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => window.location.href = adminUrl}
              className="flex-1 bg-primary hover:bg-primary/90 text-white"
            >
              <Settings className="h-4 w-4 mr-2" />
              Go to Admin Dashboard
            </Button>

            <Button
              onClick={() => window.location.href = schoolUrl}
              variant="outline"
              className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Website
            </Button>
          </div>

          {/* Additional Help */}
          <div className="text-center pt-4 border-t border-neutral-800">
            <p className="text-sm text-neutral-400 mb-2">
              Need help getting started? Check out our documentation or contact support.
            </p>
            <div className="flex justify-center space-x-4 text-sm">
              <Link href="/docs" className="text-primary hover:text-primary/80 underline">
                View Documentation
              </Link>
              <Link href="/support" className="text-primary hover:text-primary/80 underline">
                Contact Support
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function MainSignupSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
      <SignupSuccessContent />
    </Suspense>
  );
}