"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export default function Header() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getSession();
      setUser(data.session?.user || null);
      setLoading(false);
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="bg-slate-900 border-b border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-white hover:text-slate-300">
          <span>BarkerScott</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <Link href="/pricing" className="text-slate-300 hover:text-white transition">
            Pricing
          </Link>
          <Link href="/bundles" className="text-slate-300 hover:text-white transition">
            Bundles
          </Link>
          {!loading && (
            <>
              {user ? (
                <>
                  <Link href="/account" className="text-slate-300 hover:text-white transition">
                    Account
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-slate-300 hover:text-white transition">
                    Login
                  </Link>
                  <Link href="/signup" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
                    Sign Up
                  </Link>
                </>
              )}
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button className="md:hidden text-slate-300 hover:text-white">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
    </header>
  );
}