'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
} from 'lucide-react';

export default function SeguridadPage() {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const passwordRules = useMemo(() => {
    return {
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecial: /[^A-Za-z0-9]/.test(newPassword),
      matches: newPassword.length > 0 && newPassword === confirmPassword,
      different:
        currentPassword.length > 0 &&
        newPassword.length > 0 &&
        currentPassword !== newPassword,
    };
  }, [currentPassword, newPassword, confirmPassword]);

  const canSubmit =
    Object.values(passwordRules).every(Boolean) &&
    currentPassword.length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit) return;

    // Luego aquí conectamos con:
    // POST /api/autenticacion/change-password/
    console.log({
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: confirmPassword,
    });
  };

  return (
    <div className="p-4 lg:p-6">
      <div className="mb-4">
        <Link
          id="security-back-profile"
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
          <ShieldCheck size={30} aria-hidden="true" />
        </div>

        <nav
          id="security-breadcrumb"
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

          <span className="font-semibold text-white">Seguridad</span>
        </nav>

        <h1 className="text-3xl font-extrabold">Seguridad de la cuenta</h1>

        <p className="mt-3 max-w-2xl text-blue-100">
          Cambia tu contraseña institucional y protege el acceso a la intranet.
        </p>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <form
          id="change-password-form"
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2"
        >
          <h2 className="text-xl font-extrabold text-slate-900">
            Cambiar contraseña
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Por seguridad, debes ingresar tu contraseña actual antes de establecer una nueva.
          </p>

          <div className="mt-6 space-y-5">
            <PasswordInput
              id="current-password"
              label="Contraseña actual"
              value={currentPassword}
              show={showCurrent}
              onToggle={() => setShowCurrent((v) => !v)}
              onChange={setCurrentPassword}
              autoComplete="current-password"
            />

            <PasswordInput
              id="new-password"
              label="Nueva contraseña"
              value={newPassword}
              show={showNew}
              onToggle={() => setShowNew((v) => !v)}
              onChange={setNewPassword}
              autoComplete="new-password"
            />

            <PasswordInput
              id="confirm-password"
              label="Confirmar nueva contraseña"
              value={confirmPassword}
              show={showConfirm}
              onToggle={() => setShowConfirm((v) => !v)}
              onChange={setConfirmPassword}
              autoComplete="new-password"
            />
          </div>

          <button
            id="change-password-submit"
            name="change-password-submit"
            type="submit"
            disabled={!canSubmit}
            aria-label="Actualizar contraseña"
            className="mt-7 h-12 w-full rounded-2xl bg-blue-600 text-sm font-bold text-white shadow-lg shadow-blue-100 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Actualizar contraseña
          </button>
        </form>

        <aside className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <LockKeyhole size={24} aria-hidden="true" />
          </div>

          <h2 className="text-xl font-extrabold text-slate-900">
            Requisitos de seguridad
          </h2>

          <ul className="mt-5 space-y-3 text-sm">
            <Rule ok={passwordRules.minLength} text="Mínimo 8 caracteres" />
            <Rule ok={passwordRules.hasUppercase} text="Una letra mayúscula" />
            <Rule ok={passwordRules.hasLowercase} text="Una letra minúscula" />
            <Rule ok={passwordRules.hasNumber} text="Un número" />
            <Rule ok={passwordRules.hasSpecial} text="Un carácter especial" />
            <Rule ok={passwordRules.matches} text="Las contraseñas coinciden" />
            <Rule
              ok={passwordRules.different}
              text="Debe ser distinta a la actual"
            />
          </ul>
        </aside>
      </section>
    </div>
  );
}

function PasswordInput({
  id,
  label,
  value,
  show,
  onToggle,
  onChange,
  autoComplete,
}: {
  id: string;
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  autoComplete: string;
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400"
      >
        {label}
      </label>

      <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
        <LockKeyhole size={18} className="text-slate-400" aria-hidden="true" />

        <input
          id={id}
          name={id}
          type={show ? 'text' : 'password'}
          required
          minLength={8}
          maxLength={128}
          autoComplete={autoComplete}
          aria-label={label}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-300"
          placeholder="••••••••"
        />

        <button
          type="button"
          aria-label={show ? `Ocultar ${label}` : `Mostrar ${label}`}
          aria-pressed={show}
          onClick={onToggle}
          className="text-slate-300 transition hover:text-slate-500"
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

function Rule({ ok, text }: { ok: boolean; text: string }) {
  return (
    <li
      className={`flex items-center gap-2 font-semibold ${
        ok ? 'text-green-600' : 'text-slate-400'
      }`}
    >
      <span>{ok ? '✓' : '○'}</span>
      {text}
    </li>
  );
}