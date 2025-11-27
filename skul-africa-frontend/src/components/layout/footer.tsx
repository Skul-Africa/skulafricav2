import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Phone, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
    return (
        <footer className="bg-black text-white border-t border-neutral-900 pt-20 pb-10">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <Link href="/" className="flex items-center space-x-2 group">
                            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/50 rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-white tracking-tight">Skul Africa</span>
                        </Link>
                        <p className="text-neutral-400 text-sm leading-relaxed max-w-xs">
                            Empowering the next generation of African education through cutting-edge technology and seamless connectivity.
                        </p>
                        <div className="flex space-x-4">
                            {[Facebook, Twitter, Instagram, Linkedin].map((Icon, i) => (
                                <Link key={i} href="#" className="w-10 h-10 rounded-full bg-neutral-900 flex items-center justify-center text-neutral-400 hover:bg-primary hover:text-white transition-all duration-300">
                                    <Icon size={18} />
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Product</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            {["Features", "Pricing", "Case Studies", "Reviews", "Updates"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-primary mr-0 group-hover:mr-2"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Company */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Company</h4>
                        <ul className="space-y-4 text-sm text-neutral-400">
                            {["About Us", "Careers", "Blog", "Contact", "Partners"].map((item) => (
                                <li key={item}>
                                    <Link href="#" className="hover:text-primary transition-colors flex items-center group">
                                        <span className="w-0 group-hover:w-2 transition-all duration-300 h-px bg-primary mr-0 group-hover:mr-2"></span>
                                        {item}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="text-lg font-bold mb-6 text-white">Stay Updated</h4>
                        <p className="text-neutral-400 text-sm mb-4">
                            Subscribe to our newsletter for the latest updates and educational insights.
                        </p>
                        <div className="flex flex-col space-y-3">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-3 text-sm text-white focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                            />
                            <Button className="bg-primary hover:bg-primary/90 text-white w-full">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="border-t border-neutral-900 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-500">
                    <p>&copy; {new Date().getFullYear()} Skul Africa. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                        <Link href="#" className="hover:text-white transition-colors">Cookie Settings</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
