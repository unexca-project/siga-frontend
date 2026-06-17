'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Pencil } from 'lucide-react';

import { getTrabajadorById } from '@/services/talentoHumanoService';
import type { TrabajadorDetail } from '@/types/talentoHumano';

export default function VerTrabajadorPage() {
  const router = useRouter();
  const params = useParams();
  const trabajadorId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [trabajador, setTrabajador] = useState<TrabajadorDetail | null>(null);

  useEffect(() => {
    cargarTrabajador();
  }, [trabajadorId]);

  async function cargarTrabajador() {
    try {
      setLoading(true);

      const data = await getTrabajadorById(trabajadorId);
      setTrabajador(data);
    } catch (error) {
      console.error('Error cargando trabajador:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Cargando expediente del trabajador...
      </div>
    );
  }

  if (!trabajador) {
    return (
      <div className="space-y-4 p-6">
        <p className="text-slate-600">
          Trabajador no encontrado.
        </p>

        <button
          type="button"
          onClick={() => router.push('/dashboard/talento-humano/trabajadores')}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Expediente del trabajador
          </h1>

          <p className="text-sm text-slate-500">
            Información general y relaciones laborales
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            onClick={() => router.push('/dashboard/talento-humano/trabajadores')}
            className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={18} />
            Volver
          </button>

          <Link
            href={`/dashboard/talento-humano/trabajadores/${trabajador.id}/editar`}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            <Pencil size={18} />
            Editar
          </Link>
        </div>
      </div>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {trabajador.nombres} {trabajador.apellidos}
            </h2>

            <p className="text-sm text-slate-500">
              {trabajador.nacionalidad}-{trabajador.cedula}
            </p>
          </div>

          {trabajador.is_active ? (
            <span className="w-fit rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
              Activo
            </span>
          ) : (
            <span className="w-fit rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
              Inactivo
            </span>
          )}
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <Info label="Código" value={String(trabajador.codigo)} />
          <Info label="Estado laboral" value={trabajador.estado_laboral_nombre} />
          <Info label="Sexo" value={trabajador.sexo || 'No registrado'} />
          <Info label="Fecha de nacimiento" value={trabajador.fecha_nacimiento || 'No registrada'} />
          <Info label="Fecha de ingreso" value={trabajador.fecha_ingreso || 'No registrada'} />
          <Info label="Fecha de egreso" value={trabajador.fecha_egreso || 'No registrada'} />
        </div>

        {trabajador.observaciones && (
          <div className="mt-6">
            <p className="text-sm font-semibold text-slate-600">
              Observaciones
            </p>
            <p className="mt-1 rounded-xl bg-slate-50 p-4 text-sm text-slate-600">
              {trabajador.observaciones}
            </p>
          </div>
        )}
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
       <Card title="Cargos">
            {renderRelationList(
                trabajador.cargos,
                (item) => item.cargo_nombre || 'Cargo sin nombre',
                (item) => [
                item.es_principal ? 'Principal' : 'Secundario',
                item.fecha_inicio ? `Desde ${item.fecha_inicio}` : null,
                ]
            )}
            </Card>

            <Card title="Departamentos">
            {renderRelationList(
                trabajador.departamentos,
                (item) => item.departamento_nombre || 'Departamento sin nombre',
                (item) => [
                item.es_principal ? 'Principal' : 'Secundario',
                item.fecha_inicio ? `Desde ${item.fecha_inicio}` : null,
                ]
            )}
            </Card>

            <Card title="Teléfonos">
            {renderRelationList(
                trabajador.telefonos,
                (item) => item.numero || 'Teléfono sin número',
                (item) => [
                item.tipo_telefono_nombre,
                item.es_principal ? 'Principal' : null,
                ]
            )}
            </Card>

            <Card title="Direcciones">
            {renderRelationList(
                trabajador.direcciones,
                (item) => item.direccion_detallada || 'Dirección sin detalle',
                (item) => [
                item.tipo_direccion_nombre,
                item.estado_nombre,
                item.municipio_nombre,
                item.parroquia_nombre,
                item.es_principal ? 'Principal' : null,
                ]
            )}
            </Card>

            <Card title="Contactos de emergencia">
            {renderRelationList(
                trabajador.contactos_emergencia,
                (item) => `${item.nombres || ''} ${item.apellidos || ''}`.trim(),
                (item) => [
                item.parentesco_nombre,
                item.es_principal ? 'Principal' : null,
                ]
            )}
        </Card>
      </section>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-slate-50 p-4">
      <p className="text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>
      <p className="mt-1 text-sm font-semibold text-slate-700">
        {value}
      </p>
    </div>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <h3 className="text-lg font-bold text-slate-900">
        {title}
      </h3>

      <div className="mt-4">
        {children}
      </div>
    </div>
  );
}

function renderRelationList(
  items: unknown[] | undefined,
  getTitle: (item: Record<string, any>) => string,
  getDetails: (item: Record<string, any>) => Array<string | null | undefined>
) {
  if (!items || items.length === 0) {
    return (
      <p className="text-sm text-slate-500">
        No hay registros asociados.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((rawItem, index) => {
        const item = rawItem as Record<string, any>;
        const details = getDetails(item).filter(Boolean);

        return (
          <div
            key={String(item.id || index)}
            className="rounded-xl border border-slate-100 bg-slate-50 p-4"
          >
            <p className="font-semibold text-slate-800">
              {getTitle(item)}
            </p>

            {details.length > 0 && (
              <div className="mt-2 flex flex-wrap gap-2">
                {details.map((detail) => (
                  <span
                    key={detail}
                    className="rounded-full bg-white px-3 py-1 text-xs font-medium text-slate-500"
                  >
                    {detail}
                  </span>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
} 