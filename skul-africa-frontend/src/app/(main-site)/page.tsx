"use client";

import Link from "next/link";
import {
  ArrowRight,
  Users,
  BookOpen,
  TrendingUp,
  Shield,
  Star,
  Globe,
  Zap,
  Layout,
  Smartphone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Search } from "lucide-react";

/* ---------------- CUSTOM DEBOUNCE ---------------- */
function debounceFunc<T extends (...args: any[]) => void>(
  func: T,
  delay: number
) {
  let timeout: NodeJS.Timeout;

  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
/* ------------------------------------------------ */

export default function Home() {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);


  /* -------- API CALL -------- */
  const fetchSchools = async (searchTerm: string) => {
    if (!searchTerm) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const res = await axios.get(
        `https://skul-africa.onrender.com/api/v1/schools/search?q=${searchTerm}`
      );
      setSuggestions(res.data);
    } catch (err) {
      console.error(err);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  /* -------- DEBOUNCED -------- */
  const debouncedFetch = useMemo(
    () => debounceFunc(fetchSchools, 500),
    []
  );

  useEffect(() => {
    debouncedFetch(query);
  }, [query]);

  return (
    <div className="min-h-screen bg-black text-white selection:bg-primary font-sans">
      <Navbar />

      {/* ================= HERO ================= */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-black to-black opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid-pattern.svg')] opacity-10" />

        <div className="container mx-auto px-4 relative z-10 text-center">
          {/* Logo */}
          <div className="flex justify-center mb-10">
            <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full border-[6px] border-primary bg-black">
              <Image
                src="/skul-africa-logo.jpg"
                alt="Skul Africa Logo"
                fill
                className="object-contain p-6 rounded-full"
                priority
              />
            </div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-8">
            Build Your School's <br />
            <span className="text-primary">Digital Future</span>
          </h1>

          {/* -------- SCHOOL SEARCH -------- */}
          <div className="max-w-xl mx-auto mb-10 relative">

            {/* BUTTON STATE */}
            {!openSearch && (
              <button
                onClick={() => setOpenSearch(true)}
                className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-full bg-neutral-900 border border-white/10 hover:border-primary transition text-neutral-300"
              >
                <Search size={20} />
                <span>Search for a school</span>
              </button>
            )}

            {/* INPUT STATE */}
            {openSearch && (
              <>
                <Search
                  className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400"
                  size={20}
                />

                <input
                  autoFocus
                  type="text"
                  placeholder="Search for a school..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-4 rounded-full bg-neutral-900 border border-primary focus:outline-none text-white placeholder:text-neutral-500"
                />

                {/* Close */}
                <button
                  onClick={() => {
                    setOpenSearch(false);
                    setQuery("");
                    setSuggestions([]);
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  ✕
                </button>
              </>
            )}

            {/* Loading */}
            {loading && (
              <p className="absolute right-12 top-1/2 -translate-y-1/2 text-sm text-primary">
                Searching...
              </p>
            )}

            {/* Suggestions */}
            {suggestions.length > 0 && (
              <div className="absolute w-full mt-2 bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden z-50">
                {suggestions.map((school: any) => (
                  <div
                    key={school.id}
                    className="px-6 py-3 hover:bg-neutral-800 cursor-pointer transition"
                  >
                    <p className="font-semibold">{school.name}</p>
                    <p className="text-sm text-neutral-400">
                      {school.location || "Nigeria"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>



          <p className="text-xl text-neutral-400 max-w-3xl mx-auto mb-12">
            Launch a professional website, manage students, and streamline
            operations with Skul Africa.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link href="/create-school">
              <Button size="lg" className="bg-primary px-10 py-7 text-lg rounded-full">
                Create School Now <ArrowRight className="ml-2" />
              </Button>
            </Link>

            <Button
              size="lg"
              className="bg-green-600 px-10 py-7 text-lg rounded-full"
              onClick={() => setIsModalOpen(true)}
            >
              Download App <Smartphone className="ml-2" />
            </Button>
          </div>


          {/* ================= DASHBOARD PREVIEW ================= */}
          <div className="mt-20 max-w-6xl mx-auto">
            <div className="relative bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute top-0 w-full h-12 bg-neutral-800 border-b flex items-center px-4 gap-2">
                <div className="w-3 h-3 bg-red-500/50 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500/50 rounded-full" />
                <div className="w-3 h-3 bg-green-500/50 rounded-full" />
              </div>

              <div className="aspect-[16/9] pt-14 px-8 opacity-40">
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
                      className="bg-neutral-800 rounded-xl p-4"
                    >
                      <item.icon className="w-5 h-5 text-primary mb-2" />
                      <div className="h-3 w-16 bg-white/10 rounded mb-2" />
                      <div className="h-2 w-10 bg-white/5 rounded" />
                    </div>
                  ))}
                </div>

                {/* Bottom */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Activity */}
                  <div className="bg-neutral-800 rounded-xl p-4">
                    <div className="h-3 w-32 bg-white/10 rounded mb-4" />
                    {[1, 2, 3].map((_, i) => (
                      <div key={i} className="flex items-center gap-3 mb-3">
                        <div className="w-2 h-2 bg-primary rounded-full" />
                        <div className="flex-1 h-2 bg-white/10 rounded" />
                      </div>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="bg-neutral-800 rounded-xl p-4">
                    <div className="h-3 w-28 bg-white/10 rounded mb-4" />
                    <div className="grid grid-cols-2 gap-3">
                      {[Users, BookOpen, TrendingUp, Layout].map(
                        (Icon, i) => (
                          <div
                            key={i}
                            className="bg-neutral-700 rounded-lg p-3"
                          >
                            <Icon className="w-4 h-4 text-primary mb-2" />
                            <div className="h-2 w-10 bg-white/10 rounded" />
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="py-32 bg-neutral-950">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Globe,
              title: "Instant Website",
              desc: "Professional school website automatically.",
            },
            {
              icon: Users,
              title: "Student Portal",
              desc: "Parents & students access records.",
            },
            {
              icon: Shield,
              title: "Secure Data",
              desc: "Enterprise-grade protection.",
            },
          ].map((f, i) => (
            <div
              key={i}
              className="bg-neutral-900 p-8 rounded-3xl"
            >
              <f.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">{f.title}</h3>
              <p className="text-neutral-400">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="py-32 bg-black">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-8">
          {[
            "Skul Africa changed our operations.",
            "Parents love the portal.",
            "Our productivity doubled.",
          ].map((t, i) => (
            <div
              key={i}
              className="border border-white/5 p-8 rounded-2xl"
            >
              <div className="flex gap-1 mb-4">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className="w-5 h-5 text-yellow-500 fill-yellow-500"
                  />
                ))}
              </div>
              <p className="text-neutral-300">{t}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center">
        <h2 className="text-5xl font-bold mb-8">
          Ready to get started?
        </h2>
        <Link href="/create-school">
          <Button size="lg" className="bg-primary px-12 py-8">
            Create School Now
          </Button>
        </Link>
      </section>

      <Footer />

      {/* ================= MODAL ================= */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-neutral-900 p-8 rounded-3xl w-11/12 max-w-md">
            <h2 className="text-2xl font-bold mb-4">
              Download Skul Africa
            </h2>
            <p className="text-neutral-400 mb-6">
              iOS not supported yet.
            </p>

            <div className="flex gap-4">
              <a
                href="/android.apk"
                className="flex-1 bg-green-600 py-4 rounded-full text-center"
              >
                Android
              </a>
              <a
                href="/desktop.exe"
                className="flex-1 bg-blue-600 py-4 rounded-full text-center"
              >
                Desktop
              </a>
            </div>

            <button
              onClick={() => setIsModalOpen(false)}
              className="mt-6 w-full text-sm text-white/60"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
