"use client";

import Link from "next/link";
import { useState } from "react";
import { GraduationCap, Mail, ArrowLeft, ArrowRight, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // TODO: Implement actual forgot password logic
        console.log("Forgot Password:", email);
        setSubmitted(true);
    };

    return (
        <div className="min-h-screen flex bg-black text-white">
            {/* Left Side - Form */}
            <div className="flex-1 flex items-center justify-center px-6 py-12 relative z-10">
                <div className="w-full max-w-md">
                    <div className="mb-8">
                        <Link href="/" className="flex items-center space-x-2 mb-8 group">
                            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center border border-primary/20 group-hover:border-primary/50 transition-colors">
                                <GraduationCap className="w-6 h-6 text-primary" />
                            </div>
                            <span className="text-2xl font-bold text-white tracking-tight">Skul Africa</span>
                        </Link>

                        <h1 className="text-3xl font-bold text-white mb-2">
                            Reset Password
                        </h1>
                        <p className="text-neutral-400">
                            Enter your email to receive reset instructions
                        </p>
                    </div>

                    {!submitted ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">
                                    Email address
                                </label>
                                <div className="relative group">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        id="email"
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full pl-11 pr-4 py-3 bg-neutral-900 border border-neutral-800 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all"
                                        placeholder="you@school.com"
                                    />
                                </div>
                            </div>

                            <Button
                                type="submit"
                                className="w-full py-6 bg-primary hover:bg-primary/90 text-white rounded-lg font-bold text-lg shadow-[0_0_20px_-5px_rgba(229,9,20,0.3)] hover:shadow-[0_0_30px_-5px_rgba(229,9,20,0.5)] transition-all duration-300"
                            >
                                Send Instructions <ArrowRight className="ml-2 h-5 w-5" />
                            </Button>

                            <div className="text-center">
                                <Link href="/login" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <div className="text-center space-y-6 animate-fade-in">
                            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                                <Mail className="w-8 h-8 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white mb-2">Check your email</h3>
                                <p className="text-neutral-400">
                                    We've sent password reset instructions to <span className="text-white font-medium">{email}</span>
                                </p>
                            </div>
                            <Button
                                variant="outline"
                                onClick={() => setSubmitted(false)}
                                className="w-full py-6 border-neutral-700 text-white hover:bg-neutral-800"
                            >
                                Try another email
                            </Button>
                            <div className="text-center">
                                <Link href="/login" className="inline-flex items-center text-sm text-neutral-400 hover:text-white transition-colors">
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to Login
                                </Link>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-neutral-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-neutral-900 to-neutral-950" />
                <div className="relative z-10 max-w-md text-center">
                    <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-primary/20 shadow-[0_0_40px_-10px_rgba(229,9,20,0.3)]">
                        <Lock className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-4">
                        Secure Account Recovery
                    </h2>
                    <p className="text-lg text-neutral-400">
                        We'll help you get back into your account safely and quickly.
                    </p>
                </div>
            </div>
        </div>
    );
}
