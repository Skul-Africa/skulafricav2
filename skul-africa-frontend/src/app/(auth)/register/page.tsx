"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Building2, Globe, User, ArrowRight, ArrowLeft, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        schoolName: "",
        subdomain: "",
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        agreeToTerms: false,
    });

    // Auto-generate subdomain from school name
    useEffect(() => {
        if (step === 1 && formData.schoolName && !formData.subdomain) {
            const generated = formData.schoolName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .slice(0, 20);
            setFormData(prev => ({ ...prev, subdomain: generated }));
        }
    }, [formData.schoolName, step]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (step < 2) {
            setStep(step + 1);
        } else {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                console.log("Register:", formData);
                router.push("/dashboard");
            }, 2000);
        }
    };

    const isSubdomainValid = formData.subdomain.length >= 3 && /^[a-z0-9-]+$/.test(formData.subdomain);

    return (
        <div className="min-h-screen flex bg-black text-white selection:bg-primary selection:text-white">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10 lg:max-w-[600px] xl:max-w-[700px] mx-auto lg:mx-0">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-10">
                        <Link href="/" className="flex items-center space-x-2 mb-10 group w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">Skul Africa</span>
                        </Link>

                        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                            {step === 1 ? "Create your school" : "Setup your admin account"}
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            {step === 1 ? "Start your 14-day free trial. No credit card required." : "You're one step away from launching your school."}
                        </p>
                    </div>

                    {/* Progress Steps */}
                    <div className="flex items-center mb-10">
                        <div className={cn("flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-500 border-2",
                            step >= 1 ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]" : "bg-transparent border-neutral-800 text-neutral-500")}>
                            1
                        </div>
                        <div className={cn("flex-1 h-1 mx-4 rounded-full transition-all duration-500",
                            step >= 2 ? "bg-primary" : "bg-neutral-800")} />
                        <div className={cn("flex items-center justify-center w-10 h-10 rounded-full font-bold text-sm transition-all duration-500 border-2",
                            step >= 2 ? "bg-primary border-primary text-white shadow-[0_0_15px_rgba(229,9,20,0.4)]" : "bg-transparent border-neutral-800 text-neutral-500")}>
                            2
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {step === 1 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div>
                                    <label htmlFor="schoolName" className="block text-sm font-medium text-neutral-300 mb-2">
                                        School Name
                                    </label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="schoolName"
                                            type="text"
                                            required
                                            value={formData.schoolName}
                                            onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all text-lg"
                                            placeholder="e.g. Modern High School"
                                            autoFocus
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="subdomain" className="block text-sm font-medium text-neutral-300 mb-2">
                                        Choose your subdomain
                                    </label>
                                    <div className="relative group">
                                        <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="subdomain"
                                            type="text"
                                            required
                                            value={formData.subdomain}
                                            onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                            className={cn(
                                                "w-full pl-12 pr-4 py-4 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:border-transparent text-white placeholder-neutral-600 transition-all text-lg font-mono",
                                                isSubdomainValid ? "border-neutral-800 focus:ring-primary" : formData.subdomain ? "border-red-500/50 focus:ring-red-500" : "border-neutral-800 focus:ring-primary"
                                            )}
                                            placeholder="schoolname"
                                        />
                                    </div>

                                    {/* Live Preview Card */}
                                    <div className="mt-4 p-4 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-between group hover:border-primary/30 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className={cn("w-2 h-2 rounded-full", isSubdomainValid ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-neutral-700")}></div>
                                            <div className="text-sm text-neutral-400">
                                                Your URL: <span className="text-white font-mono">{formData.subdomain || 'schoolname'}.skulafrica.com</span>
                                            </div>
                                        </div>
                                        {isSubdomainValid && <Check className="w-4 h-4 text-green-500" />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {step === 2 && (
                            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label htmlFor="firstName" className="block text-sm font-medium text-neutral-300 mb-2">First Name</label>
                                        <div className="relative group">
                                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                            <input
                                                id="firstName"
                                                type="text"
                                                required
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all"
                                                placeholder="John"
                                                autoFocus
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label htmlFor="lastName" className="block text-sm font-medium text-neutral-300 mb-2">Last Name</label>
                                        <input
                                            id="lastName"
                                            type="text"
                                            required
                                            value={formData.lastName}
                                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                            className="w-full px-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all"
                                            placeholder="Doe"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-300 mb-2">Email address</label>
                                    <div className="relative group">
                                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full pl-12 pr-4 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all"
                                            placeholder="john@school.com"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="password" className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                                    <div className="relative group">
                                        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            required
                                            value={formData.password}
                                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                            className="w-full pl-12 pr-12 py-4 bg-neutral-900/50 border border-neutral-800 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all"
                                            placeholder="••••••••"
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label className="flex items-start cursor-pointer group">
                                        <div className="relative flex items-center">
                                            <input
                                                type="checkbox"
                                                required
                                                checked={formData.agreeToTerms}
                                                onChange={(e) => setFormData({ ...formData, agreeToTerms: e.target.checked })}
                                                className="peer sr-only"
                                            />
                                            <div className="w-5 h-5 border-2 border-neutral-600 rounded peer-checked:bg-primary peer-checked:border-primary transition-all"></div>
                                            <Check className="w-3.5 h-3.5 text-white absolute left-0.5 top-0.5 opacity-0 peer-checked:opacity-100 transition-opacity" />
                                        </div>
                                        <span className="ml-3 text-sm text-neutral-400 group-hover:text-neutral-300 transition-colors">
                                            I agree to the{" "}
                                            <Link href="/terms" className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4">
                                                Terms of Service
                                            </Link>{" "}
                                            and{" "}
                                            <Link href="/privacy" className="text-primary hover:text-primary/80 underline decoration-primary/30 underline-offset-4">
                                                Privacy Policy
                                            </Link>
                                        </span>
                                    </label>
                                </div>
                            </div>
                        )}

                        <div className="flex gap-4 pt-4">
                            {step === 2 && (
                                <Button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    variant="outline"
                                    className="flex-1 py-7 border-neutral-800 text-white hover:bg-neutral-900 hover:text-white rounded-xl font-bold text-lg"
                                >
                                    <ArrowLeft className="mr-2 h-5 w-5" /> Back
                                </Button>
                            )}
                            <Button
                                type="submit"
                                disabled={isLoading}
                                className="flex-1 py-7 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(229,9,20,0.4)] hover:shadow-[0_0_40px_-5px_rgba(229,9,20,0.6)] transition-all duration-300"
                            >
                                {isLoading ? (
                                    <Loader2 className="w-6 h-6 animate-spin" />
                                ) : step === 1 ? (
                                    <>Continue <ArrowRight className="ml-2 h-5 w-5" /></>
                                ) : (
                                    "Create Account"
                                )}
                            </Button>
                        </div>
                    </form>

                    <div className="mt-10 text-center">
                        <p className="text-neutral-500">
                            Already have an account?{" "}
                            <Link href="/login" className="text-white hover:text-primary font-semibold transition-colors">
                                Sign in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-neutral-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-neutral-900 to-neutral-950" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-20" />

                <div className="relative z-10 max-w-lg">
                    <div className="mb-12 relative">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/50 rounded-3xl flex items-center justify-center mx-auto relative shadow-2xl shadow-primary/30">
                            <Building2 className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6 text-center leading-tight">
                        Join 500+ schools <br />
                        <span className="text-primary">transforming education</span>
                    </h2>

                    <div className="space-y-4 mt-12">
                        {[
                            {
                                icon: GraduationCap,
                                title: "14-day free trial",
                                description: "Full access to all features. No credit card required.",
                            },
                            {
                                icon: Globe,
                                title: "Your own subdomain",
                                description: "Get a professional website instantly.",
                            },
                            {
                                icon: Lock,
                                title: "Secure & private",
                                description: "Bank-level security for your student data.",
                            },
                        ].map((benefit, index) => (
                            <div key={index} className="flex items-center gap-4 p-5 bg-black/40 backdrop-blur-md rounded-2xl border border-white/5 hover:border-primary/30 transition-all duration-300 group">
                                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center flex-shrink-0 text-primary group-hover:scale-110 transition-transform">
                                    <benefit.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-white text-lg">{benefit.title}</h3>
                                    <p className="text-neutral-400">{benefit.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
