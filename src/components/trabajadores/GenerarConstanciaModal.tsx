'use client';

import { useState } from 'react';
import { AxiosError } from 'axios';
import { Download, FileText, Loader2, X } from 'lucide-react';
import { generarConstanciaSinSalario } from '@/services/talentoHumanoService';

interface Props {
  trabajadorId: string;
  nombreTrabajador: string;
  onClose: () => void;
}

export default function GenerarConstanciaModal({
  trabajadorId,
  nombreTrabajador,
  onClose,
}: Props) {
  const [generando, setGenerando] = useState(false);
  const [error, setError] = useState('');

  async function handleGenerar() {
    if (generando) return;

    setGenerando(true);
    setError('');

    try {
      const pdf = await generarConstanciaSinSalario(trabajadorId);

      if (!pdf.size) {
        throw new Error('El servidor devolvió un documento vacío.');
      }

      const firma = await pdf.slice(0, 5).text();
      if (firma !== '%PDF-') {
        throw new Error('El servidor no devolvió un archivo PDF válido.');
      }

      const url = URL.createObjectURL(
        new Blob([pdf], { type: 'application/pdf' })
      );

      const enlace = document.createElement('a');
      enlace.href = url;
      enlace.download = `constancia_sin_salario_${trabajadorId}.pdf`;
      document.body.appendChild(enlace);
      enlace.click();
      enlace.remove();

      setTimeout(() => URL.revokeObjectURL(url), 1000);
      onClose();
    } catch (err) {
      let mensaje = 'No fue posible generar la constancia. Intente nuevamente.';

      if (err instanceof AxiosError) {
        const status = err.response?.status;

        if (status === 401) {
          mensaje = 'Su sesión ha expirado. Inicie sesión nuevamente.';
        } else if (status === 403) {
          mensaje = 'No tiene permisos para emitir constancias.';
        } else if (status === 404) {
          mensaje = 'El trabajador no está disponible.';
        } else if (status === 400) {
          mensaje = 'El tipo de constancia solicitado no está disponible.';
        } else if (status === 422) {
          mensaje = 'El trabajador no cumple las condiciones para emitir esta constancia.';
        }

        const data = err.response?.data;

        if (data instanceof Blob && data.type.includes('json')) {
          try {
            const detalle = JSON.parse(await data.text());
            if (typeof detalle.detail === 'string') {
              mensaje = detalle.detail;
            }
          } catch {
            // Conserva el mensaje según el estado HTTP.
          }
        }
      } else if (err instanceof Error) {
        mensaje = err.message;
      }

      setError(mensaje);
    } finally {
      setGenerando(false);
    }
  }

  return (
    <div
      role="presentation"
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="titulo-generar-constancia"
        className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
              <FileText size={24} />
            </div>
            <div>
              <h2
                id="titulo-generar-constancia"
                className="text-lg font-bold text-slate-900"
              >
                Generar constancia
              </h2>
              <p className="text-sm text-slate-500">
                Documento en formato PDF
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            disabled={generando}
            aria-label="Cerrar"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 disabled:opacity-50"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <p className="text-xs font-semibold uppercase text-slate-500">
              Trabajador
            </p>
            <p className="mt-1 font-semibold text-slate-900">
              {nombreTrabajador}
            </p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="font-semibold text-blue-900">
              Constancia de trabajo sin salario
            </p>
            <p className="mt-1 text-sm text-blue-700">
              Incluye identificación, cargo y fecha de ingreso.
              No incluye información salarial.
            </p>
          </div>

          {error && (
            <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm text-red-700">
              {error}
            </p>
          )}
        </div>

        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={generando}
            className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleGenerar}
            disabled={generando}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {generando ? (
              <>
                <Loader2 size={18} className="animate-spin" />
                Generando...
              </>
            ) : (
              <>
                <Download size={18} />
                Generar PDF
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
