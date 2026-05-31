'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

import Navbar from '@/components/ui/layout/Navbar';
import Sidebar from '@/components/ui/layout/Sidebar';

/*
  Este layout se encarga de envolver todas las páginas del dashboard,
  proporcionando la estructura básica con la barra de navegación superior 
  y el menú lateral. También maneja la lógica de autenticación, redirigiendo a la página de login si el usuario no está autenticado.
@yjrivas  
*/

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/login');
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-sm font-semibold text-slate-400">
          Verificando sesión...
        </p>
      </div>
    );
  }
/**
 * Estructura del layout:
 * - Sidebar: Menú lateral con navegación.
 * - Navbar: Barra de navegación superior con acceso a búsqueda, notificaciones y perfil.
 * - Main: Área principal donde se renderizan las páginas del dashboard.
 */
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        isOpen={sidebarOpen}
        isCollapsed={sidebarCollapsed}
        onClose={() => setSidebarOpen(false)}
        onToggleCollapse={() => setSidebarCollapsed((value) => !value)}
      />

      <Navbar
        onMenuClick={() => setSidebarOpen(true)}
        isSidebarCollapsed={sidebarCollapsed}
      />

      <main
        className={`transition-all duration-300 ${
          sidebarCollapsed ? 'lg:ml-20' : 'lg:ml-72'
        }`}
      >
        {children}
      </main>
    </div>
  );
}