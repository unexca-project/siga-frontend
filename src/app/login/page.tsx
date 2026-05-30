'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import {
  ShieldCheck,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Database,
  Megaphone,
  BarChart3,
} from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    try {
      await login({ email, password });
      router.push('/dashboard');
    } catch (err: any) {
      setError(
        err.message ||
          'La combinación de credenciales no tiene una cuenta activa'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full overflow-y-auto bg-[#f4f8fb] font-sans lg:fixed lg:inset-0 lg:flex lg:h-screen lg:w-screen lg:overflow-hidden lg:bg-white">
      {/* IZQUIERDA */}
      <section className="relative flex min-h-screen w-full flex-col bg-white lg:w-[46%]">
        <div className="absolute left-8 top-7 flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#0B2A4A] text-white shadow-lg shadow-blue-100">
            <ShieldCheck size={24} />
          </div>

          <div>
            <p className="text-lg font-extrabold leading-none text-[#0B2A4A]">
              Corpojuventud
            </p>
            <p className="mt-1 text-xs font-semibold text-slate-400">
              Intranet Transaccional
            </p>
          </div>
        </div>

        <div className="flex flex-1 items-center justify-center px-6 py-24 lg:px-8 lg:py-0">
          <div className="w-full max-w-[420px]">
            <div className="mb-8">
              <span className="mb-4 inline-flex rounded-full bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                Ecosistema Digital Institucional
              </span>

              <h1 className="text-4xl font-extrabold tracking-tight text-[#0B2A4A]">
                Acceso a la Intranet
              </h1>

              <p className="mt-4 text-sm leading-6 text-slate-500">
                Plataforma privada para comunicación institucional, consulta de
                activos, gestión documental e inteligencia operativa.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                aria-live="assertive"
                className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-600"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                  Correo institucional
                </label>

                <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                  <Mail size={18} className="text-slate-400" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    maxLength={254}
                    autoComplete="email"
                    aria-label="Correo institucional"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="usuario@corpojuventud.gob.ve"
                    className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-300"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-xs font-bold uppercase tracking-wider text-slate-400">
                    Contraseña
                </label>
                  <div className="flex h-14 items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 transition focus-within:border-blue-500 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-100">
                    <LockKeyhole size={18} className="text-slate-400" />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      required
                      minLength={8}
                      maxLength={128}
                      autoComplete="current-password"
                      aria-label="Contraseña"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-300"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-slate-300 transition hover:text-slate-500"
                      aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                      aria-pressed={showPassword}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
              </div>

              <button
                id="login-submit"
                name="login-submit"
                data-testid="login-submit"
                type="submit"
                disabled={isSubmitting}
                aria-label="Ingresar al sistema"
                className="h-14 w-full rounded-2xl bg-[#0B2A4A] text-sm font-extrabold text-white shadow-xl shadow-blue-100 transition hover:bg-blue-800 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isSubmitting ? 'Validando acceso...' : 'Ingresar al sistema'}
              </button>
            </form>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="text-xs font-semibold leading-5 text-slate-500">
                Acceso exclusivo para personal autorizado. Toda actividad dentro
                de la plataforma puede ser monitoreada por razones de seguridad
                institucional.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* DERECHA */}
      <section className="relative hidden h-full flex-1 overflow-hidden bg-[#0B2A4A] lg:block">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,#06192d_0%,#0B2A4A_42%,#1f8acb_100%)]" />

        <div className="absolute inset-0 opacity-20">
          <div className="absolute left-16 top-20 h-72 w-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-16 right-20 h-96 w-96 rounded-full bg-cyan-300 blur-3xl" />
        </div>

        <div className="absolute inset-0 opacity-10 [background-image:linear-gradient(#ffffff_1px,transparent_1px),linear-gradient(90deg,#ffffff_1px,transparent_1px)] [background-size:42px_42px]" />

        <div className="relative z-10 flex h-full flex-col justify-center px-16 text-white">
          <span className="mb-6 inline-flex w-fit rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-100 backdrop-blur">
            Red privada · TCP/IP · Soberanía tecnológica
          </span>

          <h2 className="max-w-2xl text-5xl font-extrabold leading-tight">
            Un ecosistema digital para la eficiencia institucional
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-blue-100">
            Centraliza la comunicación interna, consulta activos institucionales
            desde GLPI y visualiza indicadores para la toma de decisiones.
          </p>

          <div className="mt-10 grid max-w-2xl grid-cols-3 gap-4">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Database className="mb-4 text-blue-100" size={28} />
              <p className="text-lg font-extrabold">Activos</p>
              <p className="mt-1 text-xs leading-5 text-blue-100">
                Consulta patrimonial sincronizada
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <Megaphone className="mb-4 text-blue-100" size={28} />
              <p className="text-lg font-extrabold">Comunicación</p>
              <p className="mt-1 text-xs leading-5 text-blue-100">
                Canal oficial institucional
              </p>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-5 backdrop-blur">
              <BarChart3 className="mb-4 text-blue-100" size={28} />
              <p className="text-lg font-extrabold">Métricas</p>
              <p className="mt-1 text-xs leading-5 text-blue-100">
                Inteligencia operativa en tiempo real
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}