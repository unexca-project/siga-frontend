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
  X,
} from 'lucide-react';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const items = [
  { id: 'sidebar-dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { id: 'sidebar-comunicacion', label: 'Comunicación', href: '/dashboard/comunicacion', icon: Megaphone },
  { id: 'sidebar-activos', label: 'Gestión de Activos', href: '/dashboard/activos', icon: Database },
  { id: 'sidebar-formatos', label: 'Formatos y Normativas', href: '/dashboard/formatos', icon: FileText },
  { id: 'sidebar-metricas', label: 'Métricas Operativas', href: '/dashboard/metricas', icon: BarChart3 },
  { id: 'sidebar-usuarios', label: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
  { id: 'sidebar-configuracion', label: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export default function Sidebar({ isOpen = false, onClose }: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <>
      {isOpen && (
        <div
          id="sidebar-overlay"
          role="button"
          aria-label="Cerrar menú de navegación"
          tabIndex={0}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        id="main-sidebar"
        aria-label="Menú principal"
        className={`fixed left-0 top-0 z-50 h-screen w-72 border-r border-slate-200 bg-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-100 px-7">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white">
              <ShieldCheck size={24} aria-hidden="true" />
            </div>
            <div>
              <p className="text-lg font-extrabold text-slate-900">Corpojuventud</p>
              <p className="text-xs font-medium text-slate-400">Intranet Transaccional</p>
            </div>
          </div>

          <button
            id="sidebar-close"
            name="sidebar-close"
            type="button"
            aria-label="Cerrar menú de navegación"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 lg:hidden"
          >
            <X size={20} aria-hidden="true" />
          </button>
        </div>

        <nav
          id="sidebar-navigation"
          aria-label="Navegación principal"
          className="space-y-2 px-5 py-6"
        >
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                id={item.id}
                key={item.href}
                href={item.href}
                aria-label={`Ir a ${item.label}`}
                aria-current={active ? 'page' : undefined}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon size={20} aria-hidden="true" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-5 right-5">
          <button
            id="sidebar-logout"
            name="sidebar-logout"
            type="button"
            aria-label="Cerrar sesión"
            onClick={logout}
            className="flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50"
          >
            <LogOut size={20} aria-hidden="true" />
            Cerrar sesión
          </button>
        </div>
      </aside>
    </>
  );
}