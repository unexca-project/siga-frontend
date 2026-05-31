'use client';

import Link from 'next/link';
import { ArrowLeft, ChevronRight, Settings } from 'lucide-react';

export default function PreferenciasPage() {
  return (
    <div className="p-4 lg:p-6">
      <div className="mb-4">
        <Link
          id="preferences-back-profile"
          href="/dashboard/perfil"
          aria-label="Volver a mi perfil"
          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
        >
          <ArrowLeft size={18} aria-hidden="true" />
          Volver a Mi Perfil
        </Link>
      </div>

      <section className="mb-8 rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-xl">
        <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
          <Settings size={30} aria-hidden="true" />
        </div>

        <nav
          id="preferences-breadcrumb"
          aria-label="Migas de pan"
          className="mb-4 flex items-center gap-2 text-sm text-blue-200"
        >
          <Link href="/dashboard" className="font-medium transition hover:text-white">
            Dashboard
          </Link>

          <ChevronRight size={16} aria-hidden="true" />

          <Link
            href="/dashboard/perfil"
            className="font-medium transition hover:text-white"
          >
            Mi Perfil
          </Link>

          <ChevronRight size={16} aria-hidden="true" />

          <span className="font-semibold text-white">Preferencias</span>
        </nav>

        <h1 className="text-3xl font-extrabold">Preferencias</h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Configuración personal del usuario dentro de la intranet.
        </p>
      </section>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold text-slate-900">
          Preferencias de usuario
        </h2>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          Esta sección está reservada para futuras configuraciones como tema visual,
          idioma, notificaciones y preferencias personales.
        </p>
      </section>
    </div>
  );
}