'use client';

import { useAuth } from '@/context/AuthContext';
import {
  UserRound,
  Mail,
  ShieldCheck,
  CalendarDays,
  LockKeyhole,
  ArrowLeft,
  ChevronRight 
} from 'lucide-react';
import Link from 'next/link';

export default function PerfilPage() {
  const { user } = useAuth();
  const nombreCompleto =
  `${user?.nombre || ''} ${user?.apellido || ''}`.trim() || user?.username ||
  'No disponible';

  return (
    <div className="p-4 lg:p-6">
        <div className="mb-6">
        <Link
            id="profile-back-dashboard"
            href="/dashboard"
            aria-label="Volver al dashboard"
            className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-blue-600"
        >
            <ArrowLeft size={18} />
            Volver al Dashboard
        </Link>
        </div>
            <section className="mb-8 rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-xl">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10">
                <UserRound size={30} aria-hidden="true" />
            </div>

            <nav
                id="profile-breadcrumb"
                aria-label="Migas de pan"
                className="mb-4 flex items-center gap-2 text-sm text-blue-200"
            >
                <Link
                href="/dashboard"
                className="font-medium transition hover:text-white"
                >
                Dashboard
                </Link>

                <ChevronRight size={16} />

                <span className="font-semibold text-white">
                Mi Perfil
                </span>
            </nav>

            <h1 className="text-3xl font-extrabold">
                Mi Perfil
            </h1>

            <p className="mt-3 max-w-2xl text-blue-100">
                Consulta tu información institucional y gestiona la seguridad de tu cuenta.
            </p>
            </section>
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <h2 className="text-xl font-extrabold text-slate-900">
            Información del usuario
          </h2>

          <div className="mt-6 space-y-4">
            <ProfileItem
                icon={<UserRound size={22} />}
                label="Nombre completo"
                value={nombreCompleto}
            />

            <ProfileItem
              icon={<Mail size={22} />}
              label="Correo institucional"
              value={user?.email || 'No disponible'}
            />

            <ProfileItem
              icon={<ShieldCheck size={22} />}
              label="Rol"
              value={user?.rol || 'Sin rol asignado'}
            />

            <ProfileItem
              icon={<CalendarDays size={22} />}
              label="Estado"
              value="Cuenta activa"
            />
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LockKeyhole size={24} aria-hidden="true" />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900">
            Seguridad
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Desde esta sección podrás gestionar el acceso y la seguridad de tu cuenta institucional.
          </p>

          <a
            id="profile-security-link"
            href="/dashboard/perfil/seguridad"
            aria-label="Ir a seguridad de la cuenta"
            className="mt-6 flex h-12 w-full items-center justify-center rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700"
          >
            Seguridad de la cuenta
          </a>
        </div>
      </section>
    </div>
  );
}

function ProfileItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl bg-slate-50 p-4">
      <div className="text-blue-600">{icon}</div>
      <div>
        <p className="text-xs font-bold uppercase text-slate-400">{label}</p>
        <p className="text-sm font-semibold text-slate-700">{value}</p>
      </div>
    </div>
  );
}