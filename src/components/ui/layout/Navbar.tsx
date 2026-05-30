'use client';

import { Bell, Search, UserRound, Menu } from 'lucide-react';

interface NavbarProps {
  onMenuClick?: () => void;
}

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur lg:ml-72 lg:px-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 lg:hidden"
        >
          <Menu size={22} />
        </button>

        <div>
          <h1 className="text-xl font-extrabold text-slate-900 sm:text-2xl">
            Dashboard Operativo
          </h1>
          <p className="hidden text-sm text-slate-400 sm:block">
            Inteligencia institucional en tiempo real
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden h-11 w-80 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 md:flex">
          <Search size={18} className="text-slate-400" />
          <input
            placeholder="Buscar activos, comunicados o usuarios..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-50">
          <Bell size={20} />
        </button>

        <button className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <UserRound size={20} />
        </button>
      </div>
    </header>
  );
}