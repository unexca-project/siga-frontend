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
  PanelLeftClose,
  PanelLeftOpen,
  UserRoundCog,
} from 'lucide-react';

/*
  Componente de barra lateral para el dashboard, proporcionando navegación entre secciones clave,
  acceso a configuración y cierre de sesión. Diseñado para ser responsivo y accesible.
  @yjrivas
*/

interface SidebarProps {
  isOpen?: boolean;
  isCollapsed?: boolean;
  onClose?: () => void;
  onToggleCollapse?: () => void;
}

const items = [
  { id: 'sidebar-dashboard', label: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { id: 'sidebar-comunicacion', label: 'Comunicación', href: '/dashboard/comunicacion', icon: Megaphone },
  { id: 'sidebar-activos', label: 'Gestión de Activos', href: '/dashboard/activos', icon: Database },
  { id: 'sidebar-formatos', label: 'Formatos y Normativas', href: '/dashboard/formatos', icon: FileText },
  { id: 'sidebar-metricas', label: 'Métricas Operativas', href: '/dashboard/metricas', icon: BarChart3 },
  {id: 'sidebar-talento-humano',label: 'Talento Humano', href: '/dashboard/talento-humano/trabajadores',icon: UserRoundCog},
  { id: 'sidebar-usuarios', label: 'Usuarios', href: '/dashboard/usuarios', icon: Users },
  { id: 'sidebar-configuracion', label: 'Configuración', href: '/dashboard/configuracion', icon: Settings },
];

export default function Sidebar({
  isOpen = false,
  isCollapsed = false,
  onClose,
  onToggleCollapse,
}: SidebarProps) {
  const pathname = usePathname();
  const { logout } = useAuth();
/**
 * 
 * Lógica de renderizado:
 * - Si `isOpen` es true, se muestra un overlay para cerrar el menú al hacer clic fuera.
 * - El menú lateral se muestra o se oculta según `isOpen` y se colapsa o expande según `isCollapsed`.
 */
  return (
    <>
      {isOpen && (
        <div
          id="sidebar-overlay"
          role="button"
          aria-label="Cerrar menú de navegación"
          tabIndex={0}
          onClick={onClose}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              onClose?.();
            }
          }}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        id="main-sidebar"
        aria-label="Menú principal"
        className={`fixed left-0 top-0 z-50 h-screen border-r border-slate-200 bg-white transition-all duration-300 lg:translate-x-0 ${
          isCollapsed ? 'w-20' : 'w-72'
        } ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
      <div
  className={`flex h-20 items-center border-b border-slate-100 ${
    isCollapsed ? 'justify-center px-3' : 'justify-between px-7'
  }`}
>
  <div
    className={`flex items-center ${
      isCollapsed ? 'flex-col gap-2' : 'gap-3'
    }`}
  >
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white">
      <ShieldCheck size={24} aria-hidden="true" />
    </div>

    {!isCollapsed && (
      <div>
        <p className="text-lg font-extrabold text-slate-900">
          Corpojuventud
        </p>
        <p className="text-xs font-medium text-slate-400">
          Intranet Transaccional
        </p>
      </div>
    )}

    {isCollapsed && (
      <button
        id="sidebar-expand"
        name="sidebar-expand"
        type="button"
        aria-label="Expandir menú lateral"
        onClick={onToggleCollapse}
        className="hidden h-7 w-7 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 lg:flex"
      >
        <PanelLeftOpen size={15} aria-hidden="true" />
      </button>
    )}
          </div>

          {!isCollapsed && (
            <button
              id="sidebar-collapse"
              name="sidebar-collapse"
              type="button"
              aria-label="Contraer menú lateral"
              onClick={onToggleCollapse}
              className="hidden h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 lg:flex"
            >
              <PanelLeftClose size={18} aria-hidden="true" />
            </button>
          )}

          {!isCollapsed && (
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
          )}
        </div>
        <nav
          id="sidebar-navigation"
          aria-label="Navegación principal"
          className={`space-y-2 py-6 ${isCollapsed ? 'px-3' : 'px-5'}`}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;

            return (
              <Link
                id={item.id}
                key={item.href}
                href={item.href}
                title={isCollapsed ? item.label : undefined}
                aria-label={`Ir a ${item.label}`}
                aria-current={active ? 'page' : undefined}
                onClick={onClose}
                className={`flex items-center rounded-2xl py-3 text-sm font-semibold transition ${
                  isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
                } ${
                  active
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-100'
                    : 'text-slate-500 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                <Icon size={20} aria-hidden="true" />
                {!isCollapsed && item.label}
              </Link>
            );
          })}
        </nav>

        <div className={`absolute bottom-6 left-0 right-0 ${isCollapsed ? 'px-3' : 'px-5'}`}>
          <button
            id="sidebar-logout"
            name="sidebar-logout"
            type="button"
            title={isCollapsed ? 'Cerrar sesión' : undefined}
            aria-label="Cerrar sesión"
            onClick={logout}
            className={`flex w-full items-center rounded-2xl py-3 text-sm font-semibold text-red-500 transition hover:bg-red-50 ${
              isCollapsed ? 'justify-center px-0' : 'gap-3 px-4'
            }`}
          >
            <LogOut size={20} aria-hidden="true" />
            {!isCollapsed && 'Cerrar sesión'}
          </button>
        </div>
      </aside>
    </>
  );
}