'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

import {
  Eye,
  Pencil,
  UserX,
  UserCheck,
  Plus,
} from 'lucide-react';

import {
  getTrabajadores,
  desactivarTrabajador,
  reactivarTrabajador,
} from '@/services/talentoHumanoService';

import type {
  TrabajadorListItem,
} from '@/types/talentoHumano';

type EstadoFiltro = 'todos' | 'activos' | 'inactivos';

export default function TrabajadoresPage() {
  const [loading, setLoading] = useState(true);
  const [trabajadores, setTrabajadores] = useState<TrabajadorListItem[]>([]);
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoFiltro>('activos');

  useEffect(() => {
    cargarTrabajadores();
  }, [estadoFiltro]);

  async function cargarTrabajadores() {
    try {
      setLoading(true);

      const isActiveFilter =
        estadoFiltro === 'todos'
          ? undefined
          : estadoFiltro === 'activos';

      const response = await getTrabajadores({
        page: 1,
        page_size: 10,
        is_active: isActiveFilter,
      });

      setTrabajadores(response.results);
    } catch (error) {
      console.error('Error cargando trabajadores:', error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDesactivar(id: string) {
    const confirmar = window.confirm(
      '¿Desea desactivar este trabajador?'
    );

    if (!confirmar) return;

    try {
      await desactivarTrabajador(id);
      await cargarTrabajadores();
    } catch (error) {
      console.error('Error desactivando trabajador:', error);
    }
  }

  async function handleReactivar(id: string) {
    const confirmar = window.confirm(
      '¿Desea reactivar este trabajador?'
    );

    if (!confirmar) return;

    try {
      await reactivarTrabajador(id);
      await cargarTrabajadores();
    } catch (error) {
      console.error('Error reactivando trabajador:', error);
    }
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Trabajadores
          </h1>

          <p className="text-sm text-slate-500">
            Gestión del personal institucional
          </p>
        </div>

        <Link
          id="trabajador-nuevo"
          href="/dashboard/talento-humano/trabajadores/nuevo"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Plus size={18} />
          Nuevo trabajador
        </Link>
      </div>

      <div className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-semibold text-slate-700">
            Filtrar por estado
          </p>
          <p className="text-xs text-slate-400">
            Consulte trabajadores activos, inactivos o todos los registros.
          </p>
        </div>

        <div className="inline-flex rounded-xl bg-slate-100 p-1">
          <button
            id="trabajadores-filtro-activos"
            type="button"
            onClick={() => setEstadoFiltro('activos')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              estadoFiltro === 'activos'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Activos
          </button>

          <button
            id="trabajadores-filtro-inactivos"
            type="button"
            onClick={() => setEstadoFiltro('inactivos')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              estadoFiltro === 'inactivos'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Inactivos
          </button>

          <button
            id="trabajadores-filtro-todos"
            type="button"
            onClick={() => setEstadoFiltro('todos')}
            className={`rounded-lg px-4 py-2 text-sm font-semibold transition ${
              estadoFiltro === 'todos'
                ? 'bg-white text-blue-600 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Todos
          </button>
        </div>
      </div>

      <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">
        <table className="w-full min-w-[820px]">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Código
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Cédula
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Nombres
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Apellidos
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Estado
              </th>
              <th className="px-4 py-3 text-left text-sm font-bold text-slate-700">
                Acciones
              </th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  Cargando trabajadores...
                </td>
              </tr>
            ) : trabajadores.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-6 text-center text-slate-500">
                  No hay trabajadores para el filtro seleccionado.
                </td>
              </tr>
            ) : (
              trabajadores.map((trabajador) => (
                <tr
                  key={trabajador.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {trabajador.codigo}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-700">
                    {trabajador.nacionalidad}-{trabajador.cedula}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-700">
                    {trabajador.nombres}
                  </td>

                  <td className="px-4 py-3 text-sm text-slate-700">
                    {trabajador.apellidos}
                  </td>

                  <td className="px-4 py-3">
                    {trabajador.is_active ? (
                      <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                        Activo
                      </span>
                    ) : (
                      <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                        Inactivo
                      </span>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/dashboard/talento-humano/trabajadores/${trabajador.id}`}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-blue-600"
                        title="Ver trabajador"
                      >
                        <Eye size={18} />
                      </Link>

                      <Link
                        href={`/dashboard/talento-humano/trabajadores/${trabajador.id}/editar`}
                        className="rounded-lg p-2 text-blue-600 hover:bg-blue-50 hover:text-blue-800"
                        title="Editar trabajador"
                      >
                        <Pencil size={18} />
                      </Link>

                      {trabajador.is_active ? (
                        <button
                          type="button"
                          onClick={() => handleDesactivar(trabajador.id)}
                          className="rounded-lg p-2 text-red-600 hover:bg-red-50 hover:text-red-800"
                          title="Desactivar trabajador"
                        >
                          <UserX size={18} />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => handleReactivar(trabajador.id)}
                          className="rounded-lg p-2 text-green-600 hover:bg-green-50 hover:text-green-800"
                          title="Reactivar trabajador"
                        >
                          <UserCheck size={18} />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}