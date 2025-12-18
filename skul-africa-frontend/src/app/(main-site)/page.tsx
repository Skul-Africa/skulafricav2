
"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, Users, BookOpen, TrendingUp, Shield, Star, Globe, Zap, Layout, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { useState } from "react";

export default function Home() {

    const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary selection:text-white font-sans">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Skul Africa Logo */}
          <div className="flex justify-center mb-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-primary flex items-center justify-center bg-black shadow-[0_0_60px_rgba(229,9,20,0.4)]">
              <Image
                src="/skul-africa-logo.jpg"
                alt="Skul Africa Logo"
                fill
                className="object-contain p-6 rounded-full"
                priority
              />
            </div>
          </div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-sm font-medium text-neutral-300">The #1 School Management Platform in Africa</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-neutral-500 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
            Build Your School's <br />
            <span className="text-primary">Digital Future</span>
          </h1>

          <p className="text-xl md:text-2xl text-neutral-400 max-w-3xl mx-auto mb-12 leading-relaxed animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Launch a professional website, manage students, and streamline operations with the most powerful education platform built for modern schools.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-300">
            <Link href="/create-school">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(229,9,20,0.5)] hover:shadow-[0_0_60px_-10px_rgba(229,9,20,0.6)] transition-all duration-300 group">
                Create School Now <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button variant="outline" size="lg" className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-10 py-7 text-lg rounded-full backdrop-blur-sm transition-all duration-300">
                View Demo
              </Button>
            </Link>
            <Button
    size="lg"
    className="bg-green-600 hover:bg-green-500 text-white px-10 py-7 text-lg rounded-full shadow-[0_0_40px_-10px_rgba(0,255,0,0.4)] transition-all duration-300"
    onClick={() => setIsModalOpen(true)}
  >
    Download App <Smartphone className="ml-2 h-5 w-5" />
  </Button>
          </div>

          {/* Dashboard Preview */}
          <div className="mt-20 relative max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500">
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-purple-600 rounded-2xl blur opacity-20"></div>
            <div className="relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 w-full h-12 bg-neutral-800/50 border-b border-white/5 flex items-center px-4 gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              {/* Placeholder for dashboard screenshot - using a gradient div for now */}
              <div className="aspect-[16/9] bg-neutral-900 pt-14 px-8">
                <div className="opacity-40 scale-[0.98] pointer-events-none select-none">

                  {/* Stats */}
                  <div className="grid grid-cols-4 gap-4 mb-6">
                    {[
                      { label: "Students", icon: Users },
                      { label: "Teachers", icon: BookOpen },
                      { label: "Classes", icon: Layout },
                      { label: "Attendance", icon: TrendingUp },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-neutral-800/80 border border-white/5 rounded-xl p-4"
                      >
                        <item.icon className="w-5 h-5 text-primary mb-2 opacity-70" />
                        <div className="h-3 w-16 bg-white/10 rounded mb-2" />
                        <div className="h-2 w-10 bg-white/5 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Bottom section */}
                  <div className="grid grid-cols-2 gap-6">

                    {/* Recent Activity */}
                    <div className="bg-neutral-800/70 border border-white/5 rounded-xl p-4">
                      <div className="h-3 w-32 bg-white/10 rounded mb-4" />
                      <div className="space-y-3">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary opacity-60" />
                            <div className="flex-1 h-2 bg-white/10 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-neutral-800/70 border border-white/5 rounded-xl p-4">
                      <div className="h-3 w-28 bg-white/10 rounded mb-4" />
                      <div className="grid grid-cols-2 gap-3">
                        {[Users, BookOpen, TrendingUp, Layout].map((Icon, i) => (
                          <div
                            key={i}
                            className="bg-neutral-700/60 rounded-lg p-3"
                          >
                            <Icon className="w-4 h-4 text-primary opacity-70 mb-2" />
                            <div className="h-2 w-10 bg-white/10 rounded" />
                          </div>
                        ))}
                      </div>
                    </div>

                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* Why SkulAfrica */}
      <section id="features" className="py-32 bg-neutral-950 relative">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Everything you need to <span className="text-primary">run your school</span></h2>
            <p className="text-lg text-neutral-400">
              Replace disconnected tools with one unified operating system designed for the future of education.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Globe,
                title: "Instant School Website",
                desc: "Get a professional, SEO-optimized website for your school automatically. No coding required."
              },
              {
                icon: Users,
                title: "Student & Parent Portals",
                desc: "Dedicated portals for students to check results and parents to track progress and pay fees."
              },
              {
                icon: Zap,
                title: "Automated Operations",
                desc: "Streamline attendance, grading, and report card generation with powerful automation tools."
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                desc: "Your data is protected with enterprise-level encryption and secure cloud infrastructure."
              },
              {
                icon: Smartphone,
                title: "Mobile First Design",
                desc: "Access your dashboard from any device. Fully responsive and optimized for mobile networks."
              },
              {
                icon: TrendingUp,
                title: "Financial Management",
                desc: "Track fees, expenses, and generate financial reports to keep your school profitable."
              }
            ].map((feature, i) => (
              <div key={i} className="group p-8 rounded-3xl bg-neutral-900/50 border border-white/5 hover:border-primary/50 hover:bg-neutral-900 transition-all duration-300">
                <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-neutral-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-32 bg-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">
                Launch your school in <br />
                <span className="text-primary">3 simple steps</span>
              </h2>
              <p className="text-xl text-neutral-400 mb-12">
                We've removed the complexity. You don't need an IT team to get started with Skul Africa.
              </p>

              <div className="space-y-12">
                {[
                  {
                    step: "01",
                    title: "Create your account",
                    desc: "Sign up in seconds and verify your school details."
                  },
                  {
                    step: "02",
                    title: "Choose your subdomain",
                    desc: "Pick a unique web address (e.g., yourschool.skulafrica.com)."
                  },
                  {
                    step: "03",
                    title: "Go live instantly",
                    desc: "Your website and management portal are ready to use immediately."
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full border border-primary/30 text-primary flex items-center justify-center font-bold text-lg bg-primary/5">
                      {item.step}
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-neutral-400 text-lg">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
              <div className="relative bg-neutral-900 border border-white/10 rounded-3xl p-8 aspect-square flex items-center justify-center">
                {/* Abstract representation of the process */}
                <div className="relative w-full h-full">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 border border-white/10 rounded-full animate-[spin_10s_linear_infinite]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border border-primary/30 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-24 h-24 bg-primary rounded-2xl flex items-center justify-center shadow-[0_0_50px_rgba(229,9,20,0.5)]">
                      <Zap className="w-10 h-10 text-white fill-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-32 bg-neutral-950 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Trusted by <span className="text-primary">Forward-Thinking</span> Schools</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Skul Africa transformed how we manage our student records. It's simply brilliant.",
                author: "Sarah Johnson",
                role: "Principal, Westview Academy"
              },
              {
                quote: "The automated report cards save our teachers countless hours every term.",
                author: "David Okon",
                role: "Admin, Lagos Prep School"
              },
              {
                quote: "Parents love the portal. Fee collection has improved by 40% since we switched.",
                author: "Grace Amadi",
                role: "Director, Future Stars College"
              }
            ].map((t, i) => (
              <div key={i} className="bg-black p-8 rounded-2xl border border-white/5 relative">
                <div className="flex gap-1 mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <p className="text-lg text-neutral-300 mb-8 leading-relaxed">"{t.quote}"</p>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-primary">{t.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/5" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h2 className="text-5xl md:text-7xl font-bold mb-8 tracking-tight">
            Ready to <span className="text-primary">Get Started?</span>
          </h2>
          <p className="text-xl text-neutral-400 mb-12 max-w-2xl mx-auto">
            Join the fastest growing network of modern schools in Africa. No credit card required.
          </p>
          <Link href="/create-school">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-12 py-8 text-xl rounded-full shadow-[0_0_50px_-10px_rgba(229,9,20,0.5)] hover:shadow-[0_0_60px_-10px_rgba(229,9,20,0.6)] transition-all duration-300 hover:scale-105">
              Create School Now
            </Button>
          </Link>
          <p className="mt-6 text-sm text-neutral-500">Free 14-day trial • Cancel anytime • No setup fees</p>
        </div>
      </section>

      <Footer />
      {isModalOpen && (
  <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
    <div className="bg-neutral-900 p-8 rounded-3xl w-11/12 max-w-md">
      <h2 className="text-2xl font-bold text-white mb-4">Download Skul Africa</h2>
      <p className="text-neutral-400 mb-6">
        Note: This software is not yet available on iOS devices.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <a
          href="/path-to-android-app.apk"
          className="flex-1 bg-green-600 hover:bg-green-500 text-white px-6 py-4 rounded-full text-center transition"
        >
          Android
        </a>
        <a
          href="/path-to-desktop-installer.exe"
          className="flex-1 bg-blue-600 hover:bg-blue-500 text-white px-6 py-4 rounded-full text-center transition"
        >
          Desktop
        </a>
      </div>
      <button
        onClick={() => setIsModalOpen(false)}
        className="mt-6 w-full text-white/60 hover:text-white text-sm"
      >
        Close
      </button>
    </div>
  </div>
)}

    </div>
  );
}
