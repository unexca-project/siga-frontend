'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';

import {
  createTrabajador,
  getEstadosLaborales,
  getCargos,
  getDepartamentos,
  getTiposTelefono,
  getTiposDireccion,
  getTiposParentesco,
  asignarCargoTrabajador,
  asignarDepartamentoTrabajador,
  crearTelefonoTrabajador,
  crearDireccionTrabajador,
  crearContactoEmergencia,
  crearTelefonoContactoEmergencia,
} from '@/services/talentoHumanoService';

import {
  getEstados,
  getMunicipios,
  getParroquias,
} from '@/services/ubicacionService';

import type { CatalogoBase } from '@/types/talentoHumano';
import type { Estado, Municipio, Parroquia } from '@/types/ubicacion';

const steps = [
  'Datos personales',
  'Datos laborales',
  'Teléfonos',
  'Dirección',
  'Contacto emergencia',
];

const requiredByStep: Record<number, string[]> = {
  0: [
    'trabajador-cedula',
    'trabajador-nacionalidad',
    'trabajador-nombres',
    'trabajador-apellidos',
  ],
  1: [
    'trabajador-estado-laboral',
    'trabajador-cargo-principal',
    'trabajador-departamento-principal',
    'trabajador-fecha-ingreso',
  ],
  2: [
    'trabajador-telefono-tipo',
    'trabajador-telefono-numero',
  ],
  3: [
    'trabajador-direccion-tipo',
    'trabajador-direccion-estado',
    'trabajador-direccion-municipio',
    'trabajador-direccion-parroquia',
    'trabajador-direccion-detalle',
  ],
  4: [
    'trabajador-contacto-nombres',
    'trabajador-contacto-parentesco',
    'trabajador-contacto-telefono',
  ],
};

export default function NuevoTrabajadorPage() {
  const router = useRouter();

  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [estadosLaborales, setEstadosLaborales] = useState<CatalogoBase[]>([]);
  const [cargos, setCargos] = useState<CatalogoBase[]>([]);
  const [departamentos, setDepartamentos] = useState<CatalogoBase[]>([]);
  const [tiposTelefono, setTiposTelefono] = useState<CatalogoBase[]>([]);
  const [tiposDireccion, setTiposDireccion] = useState<CatalogoBase[]>([]);
  const [tiposParentesco, setTiposParentesco] = useState<CatalogoBase[]>([]);

  const [estados, setEstados] = useState<Estado[]>([]);
  const [municipios, setMunicipios] = useState<Municipio[]>([]);
  const [parroquias, setParroquias] = useState<Parroquia[]>([]);

  useEffect(() => {
    cargarCatalogos();
  }, []);

  async function cargarCatalogos() {
    try {
      const [
        estadosLaboralesData,
        cargosData,
        departamentosData,
        tiposTelefonoData,
        tiposDireccionData,
        tiposParentescoData,
        estadosData,
      ] = await Promise.all([
        getEstadosLaborales(),
        getCargos(),
        getDepartamentos(),
        getTiposTelefono(),
        getTiposDireccion(),
        getTiposParentesco(),
        getEstados(),
      ]);

      setEstadosLaborales(estadosLaboralesData);
      setCargos(cargosData);
      setDepartamentos(departamentosData);
      setTiposTelefono(tiposTelefonoData);
      setTiposDireccion(tiposDireccionData);
      setTiposParentesco(tiposParentescoData);
      setEstados(estadosData);
    } catch (error) {
      console.error('Error cargando catálogos:', error);
    }
  }

  async function handleChange(id: string, value: string) {
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    setErrors((prev) => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });

    if (id === 'trabajador-direccion-estado') {
      setMunicipios([]);
      setParroquias([]);

      setFormData((prev) => ({
        ...prev,
        'trabajador-direccion-estado': value,
        'trabajador-direccion-municipio': '',
        'trabajador-direccion-parroquia': '',
      }));

      if (value) {
        const data = await getMunicipios(value);
        setMunicipios(data);
      }
    }

    if (id === 'trabajador-direccion-municipio') {
      setParroquias([]);

      setFormData((prev) => ({
        ...prev,
        'trabajador-direccion-municipio': value,
        'trabajador-direccion-parroquia': '',
      }));

      if (value) {
        const data = await getParroquias(value);
        setParroquias(data);
      }
    }
  }

  function validateStep(step: number) {
    const requiredFields = requiredByStep[step] || [];
    const newErrors: Record<string, string> = {};

    requiredFields.forEach((field) => {
      if (!formData[field]?.trim()) {
        newErrors[field] = 'Este campo es obligatorio';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function nextStep() {
    if (!validateStep(currentStep)) return;
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }

  function previousStep() {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }

  async function saveTrabajador() {
  if (!validateStep(currentStep)) return;

  try {
    const trabajador = await createTrabajador({
      cedula: formData['trabajador-cedula'],
      nacionalidad: formData['trabajador-nacionalidad'] as 'V' | 'E',
      nombres: formData['trabajador-nombres'],
      apellidos: formData['trabajador-apellidos'],
      sexo: formData['trabajador-sexo'] as 'M' | 'F' | 'O' | '',
      fecha_nacimiento: formData['trabajador-fecha-nacimiento'] || null,
      fecha_ingreso: formData['trabajador-fecha-ingreso'] || null,
      estado_laboral: formData['trabajador-estado-laboral'],
    });

    await asignarCargoTrabajador(trabajador.id, {
      cargo: formData['trabajador-cargo-principal'],
      es_principal: true,
      fecha_inicio: formData['trabajador-fecha-ingreso'],
    });

    await asignarDepartamentoTrabajador(trabajador.id, {
      departamento: formData['trabajador-departamento-principal'],
      es_principal: true,
      fecha_inicio: formData['trabajador-fecha-ingreso'],
    });

    await crearTelefonoTrabajador(trabajador.id, {
      tipo_telefono: formData['trabajador-telefono-tipo'],
      numero: formData['trabajador-telefono-numero'],
      es_principal: true,
    });

    await crearDireccionTrabajador(trabajador.id, {
      tipo_direccion: formData['trabajador-direccion-tipo'],
      estado: formData['trabajador-direccion-estado'],
      municipio: formData['trabajador-direccion-municipio'],
      parroquia: formData['trabajador-direccion-parroquia'],
      calle_avenida: formData['trabajador-direccion-calle'],
      edificio_casa: formData['trabajador-direccion-edificio'],
      piso: formData['trabajador-direccion-piso'],
      punto_referencia: formData['trabajador-direccion-referencia'],
      direccion_detallada: formData['trabajador-direccion-detalle'],
      es_principal: true,
    });

    const contacto = await crearContactoEmergencia(trabajador.id, {
      nombres: formData['trabajador-contacto-nombres'],
      apellidos: formData['trabajador-contacto-apellidos'],
      parentesco: formData['trabajador-contacto-parentesco'],
      es_principal: true,
    });

    await crearTelefonoContactoEmergencia(contacto.id, {
      tipo_telefono: formData['trabajador-telefono-tipo'],
      numero: formData['trabajador-contacto-telefono'],
      es_principal: true,
    });

    router.push('/dashboard/talento-humano/trabajadores');
  } catch (error) {
    console.error('Error guardando trabajador:', error);
  }
}

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Nuevo trabajador
          </h1>
          <p className="text-sm text-slate-500">
            Registro integral del expediente laboral
          </p>
        </div>

        <button
          id="trabajador-volver-listado"
          name="trabajador-volver-listado"
          type="button"
          onClick={() => router.push('/dashboard/talento-humano/trabajadores')}
          className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          Volver
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="hidden items-center justify-between md:flex">
          {steps.map((step, index) => {
            const active = index === currentStep;
            const done = index < currentStep;

            return (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold ${
                      done
                        ? 'bg-green-500 text-white'
                        : active
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {done ? <Check size={18} /> : index + 1}
                  </div>

                  <span
                    className={`text-sm font-semibold ${
                      active ? 'text-blue-600' : 'text-slate-500'
                    }`}
                  >
                    {step}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div className="mx-4 h-px flex-1 bg-slate-200" />
                )}
              </div>
            );
          })}
        </div>

        <div className="md:hidden">
          <p className="text-sm font-semibold text-blue-600">
            Paso {currentStep + 1} de {steps.length}
          </p>
          <p className="mt-1 text-lg font-bold text-slate-900">
            {steps[currentStep]}
          </p>
          <div className="mt-3 h-2 rounded-full bg-slate-100">
            <div
              className="h-2 rounded-full bg-blue-600 transition-all"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {currentStep === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="trabajador-cedula"
              label="Cédula de identidad"
              placeholder="Ej. 12345678"
              value={formData['trabajador-cedula'] || ''}
              error={errors['trabajador-cedula']}
              onChange={handleChange}
            />

            <Select
              id="trabajador-nacionalidad"
              label="Nacionalidad"
              value={formData['trabajador-nacionalidad'] || ''}
              error={errors['trabajador-nacionalidad']}
              onChange={handleChange}
            >
              <option value="">Seleccione una nacionalidad</option>
              <option value="V">Venezolano</option>
              <option value="E">Extranjero</option>
            </Select>

            <Input
              id="trabajador-nombres"
              label="Nombres"
              placeholder="Ej. Carlos Eduardo"
              value={formData['trabajador-nombres'] || ''}
              error={errors['trabajador-nombres']}
              onChange={handleChange}
            />

            <Input
              id="trabajador-apellidos"
              label="Apellidos"
              placeholder="Ej. González Rivas"
              value={formData['trabajador-apellidos'] || ''}
              error={errors['trabajador-apellidos']}
              onChange={handleChange}
            />

            <Select
              id="trabajador-sexo"
              label="Sexo"
              value={formData['trabajador-sexo'] || ''}
              error={errors['trabajador-sexo']}
              onChange={handleChange}
            >
              <option value="">Seleccione una opción</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </Select>

            <Input
              id="trabajador-fecha-nacimiento"
              label="Fecha de nacimiento"
              type="date"
              value={formData['trabajador-fecha-nacimiento'] || ''}
              error={errors['trabajador-fecha-nacimiento']}
              onChange={handleChange}
            />
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="trabajador-estado-laboral"
              label="Estado laboral"
              value={formData['trabajador-estado-laboral'] || ''}
              error={errors['trabajador-estado-laboral']}
              onChange={handleChange}
            >
              <option value="">Seleccione el estado laboral</option>
              {estadosLaborales.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
                </option>
              ))}
            </Select>

            <Select
              id="trabajador-cargo-principal"
              label="Cargo principal"
              value={formData['trabajador-cargo-principal'] || ''}
              error={errors['trabajador-cargo-principal']}
              onChange={handleChange}
            >
              <option value="">Seleccione el cargo principal</option>
              {cargos.map((cargo) => (
                <option key={cargo.id} value={cargo.id}>
                  {cargo.nombre}
                </option>
              ))}
            </Select>

            <Select
              id="trabajador-departamento-principal"
              label="Departamento principal"
              value={formData['trabajador-departamento-principal'] || ''}
              error={errors['trabajador-departamento-principal']}
              onChange={handleChange}
            >
              <option value="">Seleccione el departamento</option>
              {departamentos.map((departamento) => (
                <option key={departamento.id} value={departamento.id}>
                  {departamento.nombre}
                </option>
              ))}
            </Select>

            <Input
              id="trabajador-fecha-ingreso"
              label="Fecha de ingreso"
              type="date"
              value={formData['trabajador-fecha-ingreso'] || ''}
              error={errors['trabajador-fecha-ingreso']}
              onChange={handleChange}
            />
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="trabajador-telefono-tipo"
              label="Tipo de teléfono"
              value={formData['trabajador-telefono-tipo'] || ''}
              error={errors['trabajador-telefono-tipo']}
              onChange={handleChange}
            >
              <option value="">Seleccione el tipo de teléfono</option>
              {tiposTelefono.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </Select>

            <Input
              id="trabajador-telefono-numero"
              label="Número telefónico"
              placeholder="Ej. 0414-1234567"
              value={formData['trabajador-telefono-numero'] || ''}
              error={errors['trabajador-telefono-numero']}
              onChange={handleChange}
            />
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select
              id="trabajador-direccion-tipo"
              label="Tipo de dirección"
              value={formData['trabajador-direccion-tipo'] || ''}
              error={errors['trabajador-direccion-tipo']}
              onChange={handleChange}
            >
              <option value="">Seleccione el tipo de dirección</option>
              {tiposDireccion.map((tipo) => (
                <option key={tipo.id} value={tipo.id}>
                  {tipo.nombre}
                </option>
              ))}
            </Select>

            <Select
              id="trabajador-direccion-estado"
              label="Estado"
              value={formData['trabajador-direccion-estado'] || ''}
              error={errors['trabajador-direccion-estado']}
              onChange={handleChange}
            >
              <option value="">Seleccione el estado</option>
              {estados.map((estado) => (
                <option key={estado.id} value={estado.id}>
                  {estado.nombre}
                </option>
              ))}
            </Select>

            <Select
              id="trabajador-direccion-municipio"
              label="Municipio"
              value={formData['trabajador-direccion-municipio'] || ''}
              error={errors['trabajador-direccion-municipio']}
              onChange={handleChange}
              disabled={!formData['trabajador-direccion-estado']}
            >
              <option value="">Seleccione el municipio</option>
              {municipios.map((municipio) => (
                <option key={municipio.id} value={municipio.id}>
                  {municipio.nombre}
                </option>
              ))}
            </Select>

            <Select
              id="trabajador-direccion-parroquia"
              label="Parroquia"
              value={formData['trabajador-direccion-parroquia'] || ''}
              error={errors['trabajador-direccion-parroquia']}
              onChange={handleChange}
              disabled={!formData['trabajador-direccion-municipio']}
            >
              <option value="">Seleccione la parroquia</option>
              {parroquias.map((parroquia) => (
                <option key={parroquia.id} value={parroquia.id}>
                  {parroquia.nombre}
                </option>
              ))}
            </Select>

            <Input
              id="trabajador-direccion-calle"
              label="Calle o avenida"
              placeholder="Ej. Av. Principal, calle 3"
              value={formData['trabajador-direccion-calle'] || ''}
              error={errors['trabajador-direccion-calle']}
              onChange={handleChange}
            />

            <Input
              id="trabajador-direccion-edificio"
              label="Casa, edificio o residencia"
              placeholder="Ej. Residencias Los Próceres, Casa N° 12"
              value={formData['trabajador-direccion-edificio'] || ''}
              error={errors['trabajador-direccion-edificio']}
              onChange={handleChange}
            />

            <Input
              id="trabajador-direccion-piso"
              label="Piso o nivel"
              placeholder="Ej. Piso 2, PB, Torre A"
              value={formData['trabajador-direccion-piso'] || ''}
              error={errors['trabajador-direccion-piso']}
              onChange={handleChange}
            />

            <Input
              id="trabajador-direccion-referencia"
              label="Punto de referencia"
              placeholder="Ej. Frente a la plaza principal"
              value={formData['trabajador-direccion-referencia'] || ''}
              error={errors['trabajador-direccion-referencia']}
              onChange={handleChange}
            />

            <div className="md:col-span-2">
              <Input
                id="trabajador-direccion-detalle"
                label="Dirección detallada"
                placeholder="Ingrese la dirección completa de habitación"
                value={formData['trabajador-direccion-detalle'] || ''}
                error={errors['trabajador-direccion-detalle']}
                onChange={handleChange}
              />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input
              id="trabajador-contacto-nombres"
              label="Nombres del contacto"
              placeholder="Ej. María del Carmen"
              value={formData['trabajador-contacto-nombres'] || ''}
              error={errors['trabajador-contacto-nombres']}
              onChange={handleChange}
            />

            <Input
              id="trabajador-contacto-apellidos"
              label="Apellidos del contacto"
              placeholder="Ej. González Pérez"
              value={formData['trabajador-contacto-apellidos'] || ''}
              error={errors['trabajador-contacto-apellidos']}
              onChange={handleChange}
            />

            <Select
              id="trabajador-contacto-parentesco"
              label="Parentesco"
              value={formData['trabajador-contacto-parentesco'] || ''}
              error={errors['trabajador-contacto-parentesco']}
              onChange={handleChange}
            >
              <option value="">Seleccione el parentesco</option>
              {tiposParentesco.map((parentesco) => (
                <option key={parentesco.id} value={parentesco.id}>
                  {parentesco.nombre}
                </option>
              ))}
            </Select>

            <Input
              id="trabajador-contacto-telefono"
              label="Teléfono de contacto"
              placeholder="Ej. 0412-1234567"
              value={formData['trabajador-contacto-telefono'] || ''}
              error={errors['trabajador-contacto-telefono']}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between">
        <button
          id="trabajador-step-anterior"
          name="trabajador-step-anterior"
          type="button"
          onClick={previousStep}
          disabled={currentStep === 0}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 disabled:opacity-40"
        >
          <ArrowLeft size={18} />
          Anterior
        </button>

        {currentStep < steps.length - 1 ? (
          <button
            id="trabajador-step-siguiente"
            name="trabajador-step-siguiente"
            type="button"
            onClick={nextStep}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Siguiente
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            id="trabajador-guardar"
            name="trabajador-guardar"
            type="button"
            onClick={saveTrabajador}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700"
          >
            <Save size={18} />
            Guardar trabajador
          </button>
        )}
      </div>
    </div>
  );
}

function Input({
  id,
  label,
  type = 'text',
  placeholder,
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void | Promise<void>;
}) {
  return (
    <label htmlFor={id} className="space-y-1">
      <span className="text-sm font-semibold text-slate-600">
        {label}
      </span>

      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(e) => onChange(id, e.target.value)}
        placeholder={placeholder}
        className={`w-full rounded-xl border px-4 py-2 outline-none ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-slate-200 focus:border-blue-500'
        }`}
      />

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </label>
  );
}

function Select({
  id,
  label,
  children,
  value,
  error,
  disabled = false,
  onChange,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
  value: string;
  error?: string;
  disabled?: boolean;
  onChange: (id: string, value: string) => void | Promise<void>;
}) {
  return (
    <label htmlFor={id} className="space-y-1">
      <span className="text-sm font-semibold text-slate-600">
        {label}
      </span>

      <select
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(id, e.target.value)}
        className={`w-full rounded-xl border px-4 py-2 outline-none disabled:bg-slate-100 disabled:text-slate-400 ${
          error
            ? 'border-red-400 focus:border-red-500'
            : 'border-slate-200 focus:border-blue-500'
        }`}
      >
        {children}
      </select>

      {error && (
        <p className="text-xs font-medium text-red-500">
          {error}
        </p>
      )}
    </label>
  );
}