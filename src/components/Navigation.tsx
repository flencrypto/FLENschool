'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: '🏠' },
  { href: '/subjects', label: 'Subjects', icon: '📚' },
  { href: '/focus', label: 'Focus', icon: '🍅' },
  { href: '/progress', label: 'Progress', icon: '📈' },
  { href: '/prompt-engineering', label: 'AI Prompts', icon: '🤖' },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50" style={{ paddingTop: 'env(safe-area-inset-top)' }}>
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-purple-700 font-bold text-xl">
          <span>🎓</span>
          <span>FLENschool</span>
        </Link>
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold transition-colors ${
                pathname === link.href
                  ? 'bg-purple-100 text-purple-700'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}
          <div className="ml-3 w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
            😊
          </div>
        </div>
        <div className="md:hidden w-9 h-9 bg-purple-600 rounded-full flex items-center justify-center text-white font-bold cursor-pointer">
          😊
        </div>
      </div>
    </nav>
  );
}
