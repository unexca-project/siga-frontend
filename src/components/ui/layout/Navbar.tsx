'use client';

import { Bell, Search, UserRound } from 'lucide-react';

export default function Navbar() {
  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-6 backdrop-blur lg:ml-72">
      <div>
        <h1 className="text-2xl font-extrabold text-slate-900">Dashboard Operativo</h1>
        <p className="text-sm text-slate-400">
          Inteligencia institucional en tiempo real
        </p>
      </div>

      <div className="flex items-center gap-4">
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