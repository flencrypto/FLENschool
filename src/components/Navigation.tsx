"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, BookOpen, BarChart2, FlaskConical, Users, Zap } from "lucide-react";
import SessionTimer from "./SessionTimer";

const NAV_LINKS = [
  { href: "/", label: "Dashboard", icon: Home },
  { href: "/subjects", label: "Subjects", icon: BookOpen },
  { href: "/dashboard", label: "My Progress", icon: BarChart2 },
  { href: "/prompt-lab", label: "Prompt Lab 🤖", icon: FlaskConical },
  { href: "/dashboard/parent", label: "Parent View", icon: Users },
];

export default function Navigation() {
  const [mobileOpen, setMobileOpen] = useState(false);

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

          {/* Timer + XP badge */}
          <div className="hidden md:flex items-center gap-3">
            <SessionTimer sessionMinutes={25} breakMinutes={5} />
            <div
              className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-2xl text-sm font-bold"
              aria-label="1250 XP earned"
            >
              <Zap className="w-4 h-4" aria-hidden="true" />
              1250 XP
            </div>
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
          <div className="pt-2 border-t border-gray-100 flex items-center justify-between">
            <SessionTimer sessionMinutes={25} breakMinutes={5} />
            <div className="flex items-center gap-1.5 bg-yellow-100 text-yellow-700 px-3 py-1.5 rounded-2xl text-sm font-bold">
              <Zap className="w-4 h-4" aria-hidden="true" />
              1250 XP
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
