"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Menu, X, Home, BookOpen, BarChart2, FlaskConical, Users, Zap, LogIn, LogOut, UserPlus } from "lucide-react";
import SessionTimer from "./SessionTimer";
import type { PublicUser } from "@/lib/auth";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/dashboard", label: "My Progress", icon: BarChart2 },
  { href: "/prompt-lab", label: "Prompt Lab 🤖", icon: FlaskConical },
  { href: "/dashboard/parent", label: "Parent View", icon: Users },
];

export default function Navigation() {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<PublicUser | null>(null);

  // Fetch current auth state on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data && setUser(data.user))
      .catch(() => null);
  }, []);

  const handleLogout = async () => {
    setMobileOpen(false);
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    router.push("/login");
    router.refresh();
  };

  return (
    <nav className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-extrabold text-xl text-blue-600">
            <span className="text-2xl" aria-hidden="true">🎓</span>
            <span className="hidden sm:inline">FLENschool</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV_LINKS.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
              >
                <Icon className="w-4 h-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>

          {/* Timer + XP + Auth */}
          <div className="hidden md:flex items-center gap-3">
            <SessionTimer sessionMinutes={25} breakMinutes={5} />
            <div
              className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-2xl text-sm font-bold"
              aria-label="1250 XP earned"
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              1250 XP
            </div>
            {user ? (
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-gray-600 max-w-[100px] truncate" title={user.name}>
                  👤 {user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-red-50 hover:text-red-600 transition-colors"
                  aria-label="Log out"
                >
                  <LogOut className="w-4 h-4" aria-hidden="true" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-sm font-medium text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition-colors"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 text-white text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  Sign up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 rounded-xl text-gray-600 hover:bg-gray-100"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white px-4 py-3 space-y-1" role="navigation" aria-label="Mobile navigation">
          {NAV_LINKS.map(({ href, label, icon: Icon }) => (
            <Link
              key={href}
              href={href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition-colors"
            >
              <Icon className="w-5 h-5" aria-hidden="true" />
              {label}
            </Link>
          ))}
          <div className="pt-2 border-t border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <SessionTimer sessionMinutes={25} breakMinutes={5} />
              <div className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-2xl text-sm font-bold">
                <Zap className="w-4 h-4" aria-hidden="true" />
                1250 XP
              </div>
            </div>
            {user ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-5 h-5" aria-hidden="true" />
                Log out ({user.name})
              </button>
            ) : (
              <div className="flex gap-2">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-700 border-2 border-gray-200 hover:border-blue-400 transition-colors"
                >
                  <LogIn className="w-4 h-4" aria-hidden="true" />
                  Log in
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                >
                  <UserPlus className="w-4 h-4" aria-hidden="true" />
                  Sign up
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
