'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, ExternalLink, Settings, Eye } from 'lucide-react';
import Link from 'next/link';

export default function SignupSuccessPage() {
  const searchParams = useSearchParams();
  const subdomain = searchParams.get('subdomain');
  const [countdown, setCountdown] = useState(5);
 

  useEffect(() => {
    if (!subdomain) return;

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          // Redirect to the admin dashboard of the new subdomain
          // In production, this would be: https://${subdomain}.skulafrica.com/admin
          // For development, we'll redirect to the current domain with the subdomain path
          window.location.href = `/school/${subdomain}/admin`;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [subdomain]);

  if (!subdomain) {
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

  const schoolUrl = `http://${subdomain}.localhost:3000`;
  const adminUrl = `${schoolUrl}/admin`;

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
                <a
                  href={schoolUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  {schoolUrl}
                </a>
              </p>
              <p className="text-neutral-300">
                <span className="font-medium">Admin URL:</span>{' '}
                <a
                  href={adminUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary/80 underline"
                >
                  {adminUrl}
                </a>
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
              onClick={() => window.open(schoolUrl, '_blank')}
              variant="outline"
              className="flex-1 border-neutral-700 text-neutral-300 hover:bg-neutral-800"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview Website
              <ExternalLink className="h-4 w-4 ml-2" />
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