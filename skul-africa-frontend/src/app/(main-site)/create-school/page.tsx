"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { GraduationCap, Mail, Lock, Eye, EyeOff, Building2, Globe, User, ArrowRight, Upload, Check, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function CreateSchoolPage() {
    const router = useRouter();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        schoolName: "",
        subdomain: "",
        proprietorName: "",
        email: "",
        password: "",
        confirmPassword: "",
        logo: null as File | null
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Auto-generate subdomain from school name
    useEffect(() => {
        if (formData.schoolName && !formData.subdomain) {
            const generated = formData.schoolName
                .toLowerCase()
                .replace(/[^a-z0-9]/g, '')
                .slice(0, 20);
            setFormData(prev => ({ ...prev, subdomain: generated }));
        }
    }, [formData.schoolName]);

    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, logo: file }));
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.schoolName) newErrors.schoolName = "School name is required";
        if (!formData.proprietorName) newErrors.proprietorName = "Proprietor name is required";
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }
        if (!formData.subdomain) newErrors.subdomain = "Subdomain is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            // Save to localStorage
            const schoolData = {
                ...formData,
                logo: logoPreview, // Storing base64 string for demo purposes
                createdAt: new Date().toISOString()
            };

            localStorage.setItem(`${formData.subdomain}-school-data`, JSON.stringify(schoolData));

            setIsLoading(false);
            router.push(`/create-school/success?subdomain=${formData.subdomain}`);
        }, 1500);
    };

    const isSubdomainValid = formData.subdomain.length >= 3 && /^[a-z0-9-]+$/.test(formData.subdomain);

    return (
        <div className="min-h-screen flex bg-black text-white selection:bg-primary selection:text-white">
            {/* Left Side - Form */}
            <div className="flex-1 flex flex-col justify-center px-6 py-12 relative z-10 lg:max-w-[600px] xl:max-w-[700px] mx-auto lg:mx-0">
                <div className="w-full max-w-md mx-auto">
                    <div className="mb-8">
                        <Link href="/" className="flex items-center space-x-2 mb-8 group w-fit">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">Skul Africa</span>
                        </Link>

                        <h1 className="text-4xl font-bold text-white mb-3 tracking-tight">
                            Create your school
                        </h1>
                        <p className="text-neutral-400 text-lg">
                            Get started with Skul Africa today.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* School Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">School Name</label>
                            <div className="relative group">
                                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.schoolName}
                                    onChange={(e) => setFormData({ ...formData, schoolName: e.target.value })}
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all",
                                        errors.schoolName ? "border-red-500/50" : "border-neutral-800"
                                    )}
                                    placeholder="e.g. Modern High School"
                                />
                            </div>
                            {errors.schoolName && <p className="text-red-500 text-xs mt-1">{errors.schoolName}</p>}
                        </div>

                        {/* Subdomain */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">School Subdomain</label>
                            <div className="relative group">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.subdomain}
                                    onChange={(e) => setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') })}
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:border-transparent text-white placeholder-neutral-600 transition-all font-mono",
                                        isSubdomainValid ? "border-neutral-800 focus:ring-primary" : formData.subdomain ? "border-red-500/50 focus:ring-red-500" : "border-neutral-800 focus:ring-primary"
                                    )}
                                    placeholder="schoolname"
                                />
                            </div>
                            <div className="mt-2 text-xs text-neutral-500 flex items-center gap-2">
                                <span>Your URL:</span>
                                <span className="text-primary font-mono">{formData.subdomain || 'schoolname'}.skulafrica.com</span>
                            </div>
                        </div>

                        {/* Proprietor Name */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Proprietor Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="text"
                                    value={formData.proprietorName}
                                    onChange={(e) => setFormData({ ...formData, proprietorName: e.target.value })}
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all",
                                        errors.proprietorName ? "border-red-500/50" : "border-neutral-800"
                                    )}
                                    placeholder="Full Name"
                                />
                            </div>
                            {errors.proprietorName && <p className="text-red-500 text-xs mt-1">{errors.proprietorName}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">Email Address</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className={cn(
                                        "w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all",
                                        errors.email ? "border-red-500/50" : "border-neutral-800"
                                    )}
                                    placeholder="admin@school.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        {/* Password & Confirm */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        className={cn(
                                            "w-full pl-12 pr-10 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all",
                                            errors.password ? "border-red-500/50" : "border-neutral-800"
                                        )}
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-neutral-300 mb-2">Confirm Password</label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-500 group-focus-within:text-primary transition-colors" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                        className={cn(
                                            "w-full pl-12 pr-4 py-3.5 bg-neutral-900/50 border rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent text-white placeholder-neutral-600 transition-all",
                                            errors.confirmPassword ? "border-red-500/50" : "border-neutral-800"
                                        )}
                                        placeholder="••••••••"
                                    />
                                </div>
                                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                            </div>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-neutral-300 mb-2">School Logo (Optional)</label>
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl bg-neutral-900 border border-neutral-800 flex items-center justify-center overflow-hidden group">
                                    {logoPreview ? (
                                        <img src={logoPreview} alt="Logo preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <Upload className="w-6 h-6 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={handleLogoChange}
                                        className="block w-full text-sm text-neutral-400
                                            file:mr-4 file:py-2 file:px-4
                                            file:rounded-full file:border-0
                                            file:text-sm file:font-semibold
                                            file:bg-neutral-800 file:text-white
                                            hover:file:bg-neutral-700
                                            cursor-pointer"
                                    />
                                    <p className="text-xs text-neutral-500 mt-1">PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full py-7 bg-primary hover:bg-primary/90 text-white rounded-xl font-bold text-lg shadow-[0_0_30px_-5px_rgba(229,9,20,0.4)] hover:shadow-[0_0_40px_-5px_rgba(229,9,20,0.6)] transition-all duration-300 mt-6"
                        >
                            {isLoading ? (
                                <Loader2 className="w-6 h-6 animate-spin" />
                            ) : (
                                <>Create School Now <ArrowRight className="ml-2 h-5 w-5" /></>
                            )}
                        </Button>
                    </form>
                </div>
            </div>

            {/* Right Side - Illustration */}
            <div className="hidden lg:flex flex-1 bg-neutral-900 relative overflow-hidden items-center justify-center p-12">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-primary/10 via-neutral-900 to-neutral-950" />
                <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-20" />

                <div className="relative z-10 max-w-lg text-center">
                    <div className="mb-8 relative inline-block">
                        <div className="absolute -inset-4 bg-primary/20 rounded-full blur-xl animate-pulse"></div>
                        <div className="w-24 h-24 bg-gradient-to-br from-primary to-primary/50 rounded-3xl flex items-center justify-center mx-auto relative shadow-2xl shadow-primary/30">
                            <Building2 className="w-12 h-12 text-white" />
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                        Join the Future of <br />
                        <span className="text-primary">Education Management</span>
                    </h2>

                    <p className="text-neutral-400 text-lg mb-8">
                        "Skul Africa has completely transformed how we run our school. It's intuitive, powerful, and reliable."
                    </p>

                    <div className="flex items-center justify-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700"></div>
                        <div className="text-left">
                            <div className="text-white font-bold text-sm">Dr. A. Ibrahim</div>
                            <div className="text-neutral-500 text-xs">Principal, Lagos Model College</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
