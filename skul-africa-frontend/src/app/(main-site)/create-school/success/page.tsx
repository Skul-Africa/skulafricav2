"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle, ArrowRight, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Suspense } from "react";

function SuccessContent() {
    const searchParams = useSearchParams();
    const subdomain = searchParams.get("subdomain");

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-4 relative overflow-hidden">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black" />
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />

            <div className="relative z-10 w-full max-w-2xl text-center space-y-8 animate-in fade-in zoom-in duration-500">
                <div className="flex justify-center">
                    <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center border border-green-500/20 shadow-[0_0_40px_-10px_rgba(34,197,94,0.4)]">
                        <CheckCircle className="w-12 h-12 text-green-500" />
                    </div>
                </div>

                <div className="space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
                        School Created <span className="text-primary">Successfully!</span>
                    </h1>
                    <p className="text-xl text-neutral-400">
                        Your school platform is ready to use.
                    </p>
                </div>

                <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 backdrop-blur-sm">
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-16 h-16 bg-neutral-800 rounded-xl flex items-center justify-center mb-2">
                            <GraduationCap className="w-8 h-8 text-neutral-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Your School</h2>
                        <div className="px-4 py-2 bg-black/50 rounded-lg border border-neutral-800 font-mono text-primary">
                            {subdomain}.skulafrica.com
                        </div>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    {/* Visit School Site */}
                    <Link href={`/school/${subdomain}`}>
                        <Button className="w-full sm:w-auto px-8 py-6 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                            Visit Your School Site <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Admin Login */}
                    <Link href={`/school/${subdomain}/login`}>
                        <Button className="w-full sm:w-auto px-8 py-6 bg-primary hover:bg-primary/90 text-white rounded-full font-bold text-lg shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all">
                            Go to Admin Login <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                    </Link>

                    {/* Back to Home */}
                    <Link href="/">
                        <Button variant="outline" className="w-full sm:w-auto px-8 py-6 border-neutral-800 text-white hover:bg-neutral-900 rounded-full font-bold text-lg">
                            Back to Home
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default function SuccessPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-black text-white">Loading...</div>}>
            <SuccessContent />
        </Suspense>
    );
}
