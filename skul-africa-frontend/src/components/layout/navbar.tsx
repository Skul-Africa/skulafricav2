"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GraduationCap, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <nav className={cn(
            "fixed top-0 w-full z-50 transition-all duration-300 border-b",
            scrolled || mobileMenuOpen
                ? "bg-black/80 backdrop-blur-md border-neutral-800 py-3"
                : "bg-transparent border-transparent py-5"
        )}>
            <div className="container mx-auto px-4 flex items-center justify-between">
                <Link href="/" className="flex items-center space-x-2 group z-50 relative">
                    <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:shadow-primary/40 transition-all duration-300">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">Skul Africa</span>
                </Link>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center space-x-8">
                    {["Features", "How it Works", "Stories"].map((item) => (
                        <Link
                            key={item}
                            href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                            className="text-sm font-medium text-neutral-300 hover:text-white hover:bg-white/5 px-4 py-2 rounded-full transition-all"
                        >
                            {item}
                        </Link>
                    ))}
                </div>

                <div className="hidden md:flex items-center space-x-4">
                    <Link href="/create-school">
                        <Button variant="ghost" className="text-neutral-300 hover:text-white hover:bg-white/5">
                            Get Started
                        </Button>
                    </Link>
                    <Link href="/create-school">
                        <Button className="bg-primary hover:bg-primary/90 text-white border-0 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 rounded-full px-6">
                            Create School Now
                        </Button>
                    </Link>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden z-50 relative text-white p-2"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X /> : <Menu />}
                </button>

                {/* Mobile Menu Overlay */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-40 flex flex-col items-center justify-center space-y-8 animate-in fade-in duration-200">
                        {["Features", "How it Works", "Stories"].map((item) => (
                            <Link
                                key={item}
                                href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
                                className="text-2xl font-bold text-white hover:text-primary transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}
                        <div className="flex flex-col space-y-4 w-full max-w-xs pt-8 border-t border-neutral-800">
                            <Link href="/create-school" onClick={() => setMobileMenuOpen(false)}>
                                <Button variant="outline" className="w-full border-neutral-700 text-white hover:bg-neutral-800 h-12 text-lg">
                                    Get Started
                                </Button>
                            </Link>
                            <Link href="/create-school" onClick={() => setMobileMenuOpen(false)}>
                                <Button className="w-full bg-primary hover:bg-primary/90 text-white h-12 text-lg shadow-lg shadow-primary/20">
                                    Create School Now
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
