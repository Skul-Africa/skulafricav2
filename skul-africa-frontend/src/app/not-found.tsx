"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 relative overflow-hidden">

      {/* Glow Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-black to-black" />

      <div className="relative z-10 max-w-xl text-center">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-28 h-28 rounded-full border-4 border-primary bg-black shadow-[0_0_50px_rgba(229,9,20,0.5)]">
            <Image
              src="/skul-africa-logo.jpg"
              alt="Skul Africa"
              fill
              className="object-contain p-4 rounded-full"
            />
          </div>
        </div>

        {/* 404 */}
        <h1 className="text-7xl md:text-8xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500">
          404
        </h1>

        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Page Not Found
        </h2>

        <p className="text-neutral-400 mb-10 leading-relaxed">
          The page you’re looking for doesn’t exist or may have been moved.
          Let’s get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full shadow-[0_0_40px_-10px_rgba(229,9,20,0.5)] transition"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Back Home
            </Button>
          </Link>

          <Link href="/create-school">
            <Button
              size="lg"
              variant="outline"
              className="border-white/10 bg-white/5 text-white hover:bg-white/10 px-8 py-6 rounded-full"
            >
              Create School
            </Button>
          </Link>
        </div>

        {/* Footer hint */}
        <div className="mt-12 flex items-center justify-center gap-2 text-neutral-500 text-sm">
          <Zap className="w-4 h-4 text-primary" />
          Powered by Skul Africa
        </div>
      </div>
    </div>
  );
}
