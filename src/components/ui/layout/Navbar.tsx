'use client';

/*
  Este componente representa la barra de navegación superior.
  Está diseñado para ser utilizado dentro del layout del dashboard,
  proporcionando acceso a búsqueda, notificaciones y menú de usuario.
  @yjrivas
*/

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  Search,
  UserRound,
  Menu,
  LogOut,
  ShieldCheck,
  Settings,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

interface NavbarProps {
  onMenuClick?: () => void;
  isSidebarCollapsed?: boolean;
}

export default function Navbar({
  onMenuClick,
  isSidebarCollapsed = false,
}: NavbarProps) {
  const { logout, user } = useAuth();
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setOpenProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const fullName =
    `${user?.nombre || ''} ${user?.apellido || ''}`.trim() ||
    user?.username ||
    'Usuario';

  return (
    <header
      id="main-navbar"
      role="banner"
      className={`sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-4 backdrop-blur transition-all duration-300 lg:px-6 ${
        isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
      }`}
    >
      <div className="flex items-center gap-4">
        <button
          id="navbar-menu-toggle"
          name="navbar-menu-toggle"
          type="button"
          aria-label="Abrir menú de navegación"
          onClick={onMenuClick}
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-600 lg:hidden"
        >
          <Menu size={22} aria-hidden="true" />
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
          <Search size={18} className="text-slate-400" aria-hidden="true" />
          <input
            id="navbar-search"
            name="navbar-search"
            type="search"
            maxLength={100}
            autoComplete="off"
            aria-label="Buscar dentro de la intranet"
            placeholder="Buscar activos, comunicados o usuarios..."
            className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
          />
        </div>

        <button
          id="navbar-notifications"
          name="navbar-notifications"
          type="button"
          aria-label="Ver notificaciones"
          className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 text-slate-500 transition hover:bg-slate-50"
        >
          <Bell size={20} aria-hidden="true" />
        </button>

        <div className="relative" ref={menuRef}>
          <button
            id="navbar-user"
            name="navbar-user"
            type="button"
            aria-label="Abrir menú de usuario"
            aria-haspopup="menu"
            aria-expanded={openProfileMenu}
            onClick={() => setOpenProfileMenu((current) => !current)}
            className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-600 text-white"
          >
            <UserRound size={20} aria-hidden="true" />
          </button>

          {openProfileMenu && (
            <div
              id="navbar-user-menu"
              role="menu"
              aria-label="Menú de usuario"
              className="absolute right-0 mt-3 w-64 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-blue-600">
                  <UserRound size={18} aria-hidden="true" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-bold text-slate-900">
                    {fullName}
                  </p>

                  <p className="truncate text-xs text-slate-400">
                    {user?.email || 'Correo no disponible'}
                  </p>
                </div>
              </div>

              <div className="p-2">
                <Link
                  id="navbar-profile-link"
                  href="/dashboard/perfil"
                  role="menuitem"
                  aria-label="Ir a mi perfil"
                  onClick={() => setOpenProfileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <UserRound size={18} aria-hidden="true" />
                  Mi Perfil
                </Link>

                <Link
                  id="navbar-security-link"
                  href="/dashboard/perfil/seguridad"
                  role="menuitem"
                  aria-label="Ir a seguridad de la cuenta"
                  onClick={() => setOpenProfileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <ShieldCheck size={18} aria-hidden="true" />
                  Seguridad
                </Link>

                <Link
                  id="navbar-preferences-link"
                  href="/dashboard/perfil/preferencias"
                  role="menuitem"
                  aria-label="Ir a preferencias"
                  onClick={() => setOpenProfileMenu(false)}
                  className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50"
                >
                  <Settings size={18} aria-hidden="true" />
                  Preferencias
                </Link>

                <button
                  id="navbar-logout"
                  name="navbar-logout"
                  type="button"
                  role="menuitem"
                  aria-label="Cerrar sesión"
                  onClick={logout}
                  className="mt-1 flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold text-red-500 hover:bg-red-50"
                >
                  <LogOut size={18} aria-hidden="true" />
                  Cerrar Sesión
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}