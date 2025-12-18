'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function GatewayPage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<string[]>([]); // temporary mock

  const handleSearch = () => {
    // TODO: replace with backend API search later
    setResults(['Greenfield Academy', 'St Paul’s School']);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white px-4">
      
      {/* Skul Africa Logo */}
      <div className="flex justify-center mb-6">
        <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-primary flex items-center justify-center bg-black shadow-lg">
          <Image
            src="/skul-africa-logo.jpg"
            alt="Skul Africa Logo"
            fill
            className="object-contain p-4 rounded-full"
            priority
          />
        </div>
      </div>

      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-center">
        Welcome to Skul Africa
      </h1>

      {/* Card Container */}
      <div className="bg-neutral-900/70 backdrop-blur-md rounded-3xl p-8 flex flex-col items-center w-full max-w-md shadow-lg">
        
        <Link href="/create-school" className="w-full mb-6">
          <button className="w-full bg-primary text-white py-4 rounded-full font-medium text-lg hover:bg-primary/90 transition">
            Create Your School
          </button>
        </Link>

        <div className="flex flex-col w-full items-center">
          <input
            type="text"
            placeholder="Search for your school"
            className="w-full px-4 py-3 rounded-xl bg-neutral-800 text-white mb-3 focus:outline-none focus:ring-2 focus:ring-primary transition"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-3 rounded-xl transition font-medium"
          >
            Search
          </button>
        </div>

        {/* Search results */}
        {results.length > 0 && (
          <div className="flex flex-col items-center gap-4 mt-6 w-full">
            {results.map((school) => (
              <Link
                key={school}
                href={`https://${school.split(' ')[0].toLowerCase()}.skulafrica.com`}
                className="w-full"
              >
                <div className="bg-neutral-800/50 border border-white/10 px-6 py-3 rounded-2xl cursor-pointer hover:border-primary transition text-center">
                  {school}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
