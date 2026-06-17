'use client';

import { Code2 } from 'lucide-react';

interface UnderConstructionProps {
  title?: string;
  description?: string;
}

export default function UnderConstruction({
  title = 'Módulo en construcción',
  description = 'Estamos trabajando para habilitar esta sección próximamente.',
}: UnderConstructionProps) {
  return (
    <div className="flex min-h-[70vh] items-center justify-center p-6">
      <div className="max-w-xl rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-50">
          <div className="relative">
            <Code2 className="h-12 w-12 animate-pulse text-blue-600" />

            <span className="absolute -right-4 -top-5 animate-bounce text-2xl">
              💭
            </span>

            <span className="absolute -left-6 top-10 animate-ping text-xl">
              ⚙️
            </span>
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-slate-900">
          {title}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {description}
        </p>

        <div className="mt-6 rounded-2xl bg-slate-950 px-4 py-3 text-left font-mono text-xs text-green-400">
          <p className="animate-pulse">
            {'>'} desarrollando módulo...
          </p>
          <p>{'>'} compilando ideas...</p>
          <p>{'>'} preparando interfaz...</p>
        </div>
      </div>
    </div>
  );
}