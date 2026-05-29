'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  LayoutDashboard,
  Megaphone,
  Database,
  FileText,
  BarChart3,
  Users,
  Settings,
  LogOut,
  ShieldCheck,
} from 'lucide-react';

const items = [
  { label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Comunicación', href: '/dashboard/comunicacion', icon: Megaphone },
  { label: 'Gestión de Activos', href: '/dashboard/activos', icon: Database },
  { label: 'Formatos y Normativas', href: '/dashboard/formatos', icon: FileText },
  { label: 'Métricas Operativas', href: '/dashboard/metricas', icon: BarChart3 },
  { label: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
  { label: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 border-r border-slate-200 bg-white lg:block">
      <div className="flex h-20 items-center gap-3 border-b border-slate-100 px-7">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
          <ShieldCheck size={24} />
        </div>
        <div>
          <p className="text-lg font-extrabold text-slate-900">Corpojuventud</p>
          <p className="text-xs font-medium text-slate-400">Intranet Transaccional</p>
        </div>
      </div>

      <nav className="space-y-2 px-5 py-6">
        {items.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                active
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                  : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
              }`}
            >
              <Icon size={20} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="absolute bottom-6 left-5 right-5">
        <button
          onClick={logout}
          className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}