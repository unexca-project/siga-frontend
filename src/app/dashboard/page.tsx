import Sidebar from '@/components/ui/layout/Sidebar';
import Navbar from '@/components/ui/layout/Navbar';
import {
  BarChart3,
  Database,
  Megaphone,
  TrendingUp,
  Users,
  ShieldCheck,
  RefreshCcw,
  FileText,
} from 'lucide-react';

const stats = [
  {
    label: 'Activos sincronizados',
    value: '1,248',
    detail: 'Desde GLPI',
    icon: Database,
  },
  {
    label: 'Comunicados publicados',
    value: '36',
    detail: 'Canal institucional',
    icon: Megaphone,
  },
  {
    label: 'Usuarios activos',
    value: '214',
    detail: 'Personal interno',
    icon: Users,
  },
  {
    label: 'Adopción digital',
    value: '87%',
    detail: 'Uso de la intranet',
    icon: TrendingUp,
  },
];

const modules = [
  {
    title: 'Comunicación Institucional',
    description:
      'Canal oficial, directo y bidireccional para anuncios, noticias internas y contenidos moderados.',
    icon: Megaphone,
  },
  {
    title: 'Gestión de Activos',
    description:
      'Consulta de activos institucionales sincronizados con GLPI, evitando duplicidad de registros.',
    icon: Database,
  },
  {
    title: 'Formatos y Normativas',
    description:
      'Repositorio centralizado para documentos, formatos internos y normativas institucionales.',
    icon: FileText,
  },
  {
    title: 'Inteligencia Operativa',
    description:
      'Métricas para visualizar adopción digital, alcance de comunicación y distribución de activos.',
    icon: BarChart3,
  },
];

const activity = [
  {
    title: 'Nuevo comunicado institucional publicado',
    time: 'Hace 12 min',
    icon: Megaphone,
  },
  {
    title: 'Activo patrimonial sincronizado desde GLPI',
    time: 'Hace 34 min',
    icon: RefreshCcw,
  },
  {
    title: 'Usuario consultó activos bajo su responsabilidad',
    time: 'Hoy',
    icon: Database,
  },
  {
    title: 'Reporte de adopción digital generado',
    time: 'Hoy',
    icon: BarChart3,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar />
      <Navbar />

      <main className="p-6 lg:ml-72">
        <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-r from-slate-950 via-blue-950 to-blue-700 p-8 text-white shadow-xl">
          <div className="absolute right-0 top-0 h-full w-1/2 opacity-20">
            <div className="h-full w-full bg-[radial-gradient(circle_at_top_right,_white,_transparent_45%)]" />
          </div>

          <div className="relative z-10 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-blue-100">
              <ShieldCheck size={18} />
              Ecosistema Digital Corpojuventud
            </div>

            <h2 className="text-4xl font-extrabold tracking-tight">
              Intranet Transaccional Corpojuventud
            </h2>

            <p className="mt-4 max-w-2xl text-base leading-7 text-blue-100">
              Plataforma institucional para centralizar comunicaciones, consultar
              activos, automatizar procesos administrativos y visualizar
              indicadores operativos en tiempo real.
            </p>
          </div>
        </section>

        <section className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="mb-6 flex h-13 w-13 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                  <Icon size={26} />
                </div>

                <p className="text-sm font-semibold text-slate-400">
                  {stat.label}
                </p>

                <h3 className="mt-2 text-3xl font-extrabold text-slate-900">
                  {stat.value}
                </h3>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  {stat.detail}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 xl:grid-cols-4">
          {modules.map((module) => {
            const Icon = module.icon;

            return (
              <div
                key={module.title}
                className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
                  <Icon size={24} />
                </div>

                <h3 className="text-lg font-extrabold text-slate-900">
                  {module.title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {module.description}
                </p>
              </div>
            );
          })}
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  Actividad reciente
                </h3>
                <p className="text-sm text-slate-400">
                  Últimos movimientos dentro de la intranet
                </p>
              </div>

              <button className="rounded-xl bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-600">
                Ver todo
              </button>
            </div>

            <div className="mt-6 space-y-4">
              {activity.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-blue-600 shadow-sm">
                        <Icon size={20} />
                      </div>

                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          {item.title}
                        </p>
                        <p className="text-xs text-slate-400">{item.time}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <h3 className="text-xl font-extrabold text-slate-900">
              Accesos rápidos
            </h3>

            <p className="mt-1 text-sm text-slate-400">
              Operaciones frecuentes del sistema
            </p>

            <div className="mt-6 space-y-3">
              <button className="w-full rounded-2xl bg-blue-600 py-3 text-sm font-bold text-white shadow-lg shadow-blue-100">
                Publicar comunicado
              </button>

              <button className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600">
                Consultar activos
              </button>

              <button className="w-full rounded-2xl border border-slate-200 py-3 text-sm font-bold text-slate-600">
                Generar reporte
              </button>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-700">
                Red privada institucional
              </p>
              <p className="mt-2 text-sm leading-6 text-blue-600">
                Plataforma orientada a seguridad, trazabilidad y soberanía
                tecnológica.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}