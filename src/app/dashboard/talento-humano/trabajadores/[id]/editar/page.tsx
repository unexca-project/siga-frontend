'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, ArrowRight, Check, Save } from 'lucide-react';

import {
  getTrabajadorById,
  updateTrabajador,
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
  actualizarCargoTrabajador,
  actualizarDepartamentoTrabajador,
  actualizarTelefonoTrabajador,
  actualizarDireccionTrabajador,
  actualizarContactoEmergencia,
  actualizarTelefonoContactoEmergencia,
} from '@/services/talentoHumanoService';

import {
  getEstados,
  getMunicipios,
  getParroquias,
} from '@/services/ubicacionService';

import type {
  CatalogoBase,
  TrabajadorDetail,
} from '@/types/talentoHumano';

import type {
  Estado,
  Municipio,
  Parroquia,
} from '@/types/ubicacion';

const steps = [
  'Datos personales',
  'Datos laborales',
  'Teléfonos',
  'Dirección',
  'Contacto emergencia',
];

const requiredByStep: Record<number, string[]> = {
  0: [
    'cedula',
    'nacionalidad',
    'nombres',
    'apellidos',
  ],
  1: [
    'estado_laboral',
    'cargo',
    'departamento',
    'fecha_ingreso',
  ],
  2: [
    'tipo_telefono',
    'telefono',
  ],
  3: [
    'tipo_direccion',
    'estado',
    'municipio',
    'parroquia',
    'direccion_detallada',
  ],
  4: [
    'contacto_nombres',
    'parentesco',
    'contacto_telefono',
  ],
};

export default function EditarTrabajadorPage() {
  const router = useRouter();
  const params = useParams();
  const trabajadorId = params.id as string;

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [relationIds, setRelationIds] = useState<Record<string, string>>({});

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
    cargarTodo();
  }, [trabajadorId]);

  async function cargarTodo() {
    try {
      setLoading(true);

      const [
        trabajador,
        estadosLaboralesData,
        cargosData,
        departamentosData,
        tiposTelefonoData,
        tiposDireccionData,
        tiposParentescoData,
        estadosData,
      ] = await Promise.all([
        getTrabajadorById(trabajadorId),
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

      await cargarFormulario(trabajador);
    } catch (error) {
      console.error('Error cargando edición:', error);
    } finally {
      setLoading(false);
    }
  }

  async function cargarFormulario(trabajador: TrabajadorDetail) {
    const cargo =
      trabajador.cargos?.find((item) => item.es_principal) ||
      trabajador.cargos?.[0];

    const departamento =
      trabajador.departamentos?.find((item) => item.es_principal) ||
      trabajador.departamentos?.[0];

    const telefono =
      trabajador.telefonos?.find((item) => item.es_principal) ||
      trabajador.telefonos?.[0];

    const direccion =
      trabajador.direcciones?.find((item) => item.es_principal) ||
      trabajador.direcciones?.[0];

    const contacto =
      trabajador.contactos_emergencia?.find((item) => item.es_principal) ||
      trabajador.contactos_emergencia?.[0];

    const telefonoContacto =
      contacto?.telefonos?.find((item) => item.es_principal) ||
      contacto?.telefonos?.[0];

    setRelationIds({
      cargo: cargo?.id || '',
      departamento: departamento?.id || '',
      telefono: telefono?.id || '',
      direccion: direccion?.id || '',
      contacto: contacto?.id || '',
      telefono_contacto: telefonoContacto?.id || '',
    });

    setFormData({
      cedula: trabajador.cedula || '',
      nacionalidad: trabajador.nacionalidad || 'V',
      nombres: trabajador.nombres || '',
      apellidos: trabajador.apellidos || '',
      sexo: trabajador.sexo || '',
      fecha_nacimiento: trabajador.fecha_nacimiento || '',
      fecha_ingreso: trabajador.fecha_ingreso || '',
      fecha_egreso: trabajador.fecha_egreso || '',
      estado_laboral: trabajador.estado_laboral || '',
      observaciones: trabajador.observaciones || '',

      cargo: cargo?.cargo || '',
      departamento: departamento?.departamento || '',

      tipo_telefono: telefono?.tipo_telefono || '',
      telefono: telefono?.numero || '',

      tipo_direccion: direccion?.tipo_direccion || '',
      estado: direccion?.estado || '',
      municipio: direccion?.municipio || '',
      parroquia: direccion?.parroquia || '',
      calle_avenida: direccion?.calle_avenida || '',
      edificio_casa: direccion?.edificio_casa || '',
      piso: direccion?.piso || '',
      punto_referencia: direccion?.punto_referencia || '',
      direccion_detallada: direccion?.direccion_detallada || '',

      contacto_nombres: contacto?.nombres || '',
      contacto_apellidos: contacto?.apellidos || '',
      parentesco: contacto?.parentesco || '',
      contacto_tipo_telefono: telefonoContacto?.tipo_telefono || telefono?.tipo_telefono || '',
      contacto_telefono: telefonoContacto?.numero || '',
    });

    if (direccion?.estado) {
      const municipiosData = await getMunicipios(direccion.estado);
      setMunicipios(municipiosData);
    }

    if (direccion?.municipio) {
      const parroquiasData = await getParroquias(direccion.municipio);
      setParroquias(parroquiasData);
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

    if (id === 'estado') {
      setMunicipios([]);
      setParroquias([]);

      setFormData((prev) => ({
        ...prev,
        estado: value,
        municipio: '',
        parroquia: '',
      }));

      if (value) {
        const data = await getMunicipios(value);
        setMunicipios(data);
      }
    }

    if (id === 'municipio') {
      setParroquias([]);

      setFormData((prev) => ({
        ...prev,
        municipio: value,
        parroquia: '',
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

  async function guardarCambios() {
    if (!validateStep(currentStep)) return;

    try {
      setSaving(true);

      await updateTrabajador(trabajadorId, {
        cedula: formData.cedula,
        nacionalidad: formData.nacionalidad as 'V' | 'E',
        nombres: formData.nombres,
        apellidos: formData.apellidos,
        sexo: formData.sexo as 'M' | 'F' | 'O' | '',
        fecha_nacimiento: formData.fecha_nacimiento || null,
        fecha_ingreso: formData.fecha_ingreso || null,
        fecha_egreso: formData.fecha_egreso || null,
        observaciones: formData.observaciones || null,
        estado_laboral: formData.estado_laboral,
      });

      if (relationIds.cargo) {
        await actualizarCargoTrabajador(trabajadorId, relationIds.cargo, {
          cargo: formData.cargo,
          es_principal: true,
          fecha_inicio: formData.fecha_ingreso,
        });
      } else {
        await asignarCargoTrabajador(trabajadorId, {
          cargo: formData.cargo,
          es_principal: true,
          fecha_inicio: formData.fecha_ingreso,
        });
      }

      if (relationIds.departamento) {
        await actualizarDepartamentoTrabajador(
          trabajadorId,
          relationIds.departamento,
          {
            departamento: formData.departamento,
            es_principal: true,
            fecha_inicio: formData.fecha_ingreso,
          }
        );
      } else {
        await asignarDepartamentoTrabajador(trabajadorId, {
          departamento: formData.departamento,
          es_principal: true,
          fecha_inicio: formData.fecha_ingreso,
        });
      }

      if (relationIds.telefono) {
        await actualizarTelefonoTrabajador(
          trabajadorId,
          relationIds.telefono,
          {
            tipo_telefono: formData.tipo_telefono,
            numero: formData.telefono,
            es_principal: true,
          }
        );
      } else {
        await crearTelefonoTrabajador(trabajadorId, {
          tipo_telefono: formData.tipo_telefono,
          numero: formData.telefono,
          es_principal: true,
        });
      }

      if (relationIds.direccion) {
        await actualizarDireccionTrabajador(
          trabajadorId,
          relationIds.direccion,
          {
            tipo_direccion: formData.tipo_direccion,
            estado: formData.estado,
            municipio: formData.municipio,
            parroquia: formData.parroquia,
            calle_avenida: formData.calle_avenida || '',
            edificio_casa: formData.edificio_casa || '',
            piso: formData.piso || '',
            punto_referencia: formData.punto_referencia || '',
            direccion_detallada: formData.direccion_detallada,
            es_principal: true,
          }
        );
      } else {
        await crearDireccionTrabajador(trabajadorId, {
          tipo_direccion: formData.tipo_direccion,
          estado: formData.estado,
          municipio: formData.municipio,
          parroquia: formData.parroquia,
          calle_avenida: formData.calle_avenida || '',
          edificio_casa: formData.edificio_casa || '',
          piso: formData.piso || '',
          punto_referencia: formData.punto_referencia || '',
          direccion_detallada: formData.direccion_detallada,
          es_principal: true,
        });
      }

      let contactoId = relationIds.contacto;

      if (contactoId) {
        await actualizarContactoEmergencia(trabajadorId, contactoId, {
          nombres: formData.contacto_nombres,
          apellidos: formData.contacto_apellidos || '',
          parentesco: formData.parentesco,
          es_principal: true,
        });
      } else {
        const contacto = await crearContactoEmergencia(trabajadorId, {
          nombres: formData.contacto_nombres,
          apellidos: formData.contacto_apellidos || '',
          parentesco: formData.parentesco,
          es_principal: true,
        });

        contactoId = contacto.id;
      }

      const tipoTelefonoContacto =
        formData.contacto_tipo_telefono || formData.tipo_telefono;

      if (relationIds.telefono_contacto) {
        await actualizarTelefonoContactoEmergencia(
          contactoId,
          relationIds.telefono_contacto,
          {
            tipo_telefono: tipoTelefonoContacto,
            numero: formData.contacto_telefono,
            es_principal: true,
          }
        );
      } else {
        await crearTelefonoContactoEmergencia(contactoId, {
          tipo_telefono: tipoTelefonoContacto,
          numero: formData.contacto_telefono,
          es_principal: true,
        });
      }

      router.push(`/dashboard/talento-humano/trabajadores/${trabajadorId}`);
    } catch (error) {
      console.error('Error guardando expediente:', error);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="p-6 text-slate-500">
        Cargando expediente para edición...
      </div>
    );
  }

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Editar trabajador
          </h1>
          <p className="text-sm text-slate-500">
            Actualización completa del expediente laboral
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            router.push(`/dashboard/talento-humano/trabajadores/${trabajadorId}`)
          }
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50"
        >
          <ArrowLeft size={18} />
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
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        {currentStep === 0 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="cedula" label="Cédula" value={formData.cedula || ''} error={errors.cedula} onChange={handleChange} />
            <Select id="nacionalidad" label="Nacionalidad" value={formData.nacionalidad || ''} error={errors.nacionalidad} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="V">Venezolano</option>
              <option value="E">Extranjero</option>
            </Select>
            <Input id="nombres" label="Nombres" value={formData.nombres || ''} error={errors.nombres} onChange={handleChange} />
            <Input id="apellidos" label="Apellidos" value={formData.apellidos || ''} error={errors.apellidos} onChange={handleChange} />
            <Select id="sexo" label="Sexo" value={formData.sexo || ''} onChange={handleChange}>
              <option value="">Seleccione</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
              <option value="O">Otro</option>
            </Select>
            <Input id="fecha_nacimiento" label="Fecha de nacimiento" type="date" value={formData.fecha_nacimiento || ''} onChange={handleChange} />
          </div>
        )}

        {currentStep === 1 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select id="estado_laboral" label="Estado laboral" value={formData.estado_laboral || ''} error={errors.estado_laboral} onChange={handleChange}>
              <option value="">Seleccione</option>
              {estadosLaborales.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="cargo" label="Cargo principal" value={formData.cargo || ''} error={errors.cargo} onChange={handleChange}>
              <option value="">Seleccione</option>
              {cargos.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="departamento" label="Departamento principal" value={formData.departamento || ''} error={errors.departamento} onChange={handleChange}>
              <option value="">Seleccione</option>
              {departamentos.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Input id="fecha_ingreso" label="Fecha de ingreso" type="date" value={formData.fecha_ingreso || ''} error={errors.fecha_ingreso} onChange={handleChange} />
            <Input id="fecha_egreso" label="Fecha de egreso" type="date" value={formData.fecha_egreso || ''} onChange={handleChange} />

            <div className="md:col-span-2">
              <Textarea id="observaciones" label="Observaciones" value={formData.observaciones || ''} onChange={handleChange} />
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select id="tipo_telefono" label="Tipo de teléfono" value={formData.tipo_telefono || ''} error={errors.tipo_telefono} onChange={handleChange}>
              <option value="">Seleccione</option>
              {tiposTelefono.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>
            <Input id="telefono" label="Número telefónico" value={formData.telefono || ''} error={errors.telefono} onChange={handleChange} />
          </div>
        )}

        {currentStep === 3 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Select id="tipo_direccion" label="Tipo de dirección" value={formData.tipo_direccion || ''} error={errors.tipo_direccion} onChange={handleChange}>
              <option value="">Seleccione</option>
              {tiposDireccion.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="estado" label="Estado" value={formData.estado || ''} error={errors.estado} onChange={handleChange}>
              <option value="">Seleccione</option>
              {estados.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="municipio" label="Municipio" value={formData.municipio || ''} error={errors.municipio} onChange={handleChange} disabled={!formData.estado}>
              <option value="">Seleccione</option>
              {municipios.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="parroquia" label="Parroquia" value={formData.parroquia || ''} error={errors.parroquia} onChange={handleChange} disabled={!formData.municipio}>
              <option value="">Seleccione</option>
              {parroquias.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Input id="calle_avenida" label="Calle o avenida" value={formData.calle_avenida || ''} onChange={handleChange} />
            <Input id="edificio_casa" label="Casa, edificio o residencia" value={formData.edificio_casa || ''} onChange={handleChange} />
            <Input id="piso" label="Piso o nivel" value={formData.piso || ''} onChange={handleChange} />
            <Input id="punto_referencia" label="Punto de referencia" value={formData.punto_referencia || ''} onChange={handleChange} />

            <div className="md:col-span-2">
              <Input id="direccion_detallada" label="Dirección detallada" value={formData.direccion_detallada || ''} error={errors.direccion_detallada} onChange={handleChange} />
            </div>
          </div>
        )}

        {currentStep === 4 && (
          <div className="grid gap-4 md:grid-cols-2">
            <Input id="contacto_nombres" label="Nombres del contacto" value={formData.contacto_nombres || ''} error={errors.contacto_nombres} onChange={handleChange} />
            <Input id="contacto_apellidos" label="Apellidos del contacto" value={formData.contacto_apellidos || ''} onChange={handleChange} />

            <Select id="parentesco" label="Parentesco" value={formData.parentesco || ''} error={errors.parentesco} onChange={handleChange}>
              <option value="">Seleccione</option>
              {tiposParentesco.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Select id="contacto_tipo_telefono" label="Tipo de teléfono del contacto" value={formData.contacto_tipo_telefono || ''} onChange={handleChange}>
              <option value="">Seleccione</option>
              {tiposTelefono.map((item) => (
                <option key={item.id} value={item.id}>{item.nombre}</option>
              ))}
            </Select>

            <Input id="contacto_telefono" label="Teléfono del contacto" value={formData.contacto_telefono || ''} error={errors.contacto_telefono} onChange={handleChange} />
          </div>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 md:flex-row md:justify-between">
        <button
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
            type="button"
            onClick={nextStep}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Siguiente
            <ArrowRight size={18} />
          </button>
        ) : (
          <button
            type="button"
            onClick={guardarCambios}
            disabled={saving}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:opacity-60"
          >
            <Save size={18} />
            {saving ? 'Guardando...' : 'Guardar cambios'}
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
  value,
  error,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  value: string;
  error?: string;
  onChange: (id: string, value: string) => void | Promise<void>;
}) {
  return (
    <label htmlFor={id} className="space-y-1">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <input
        id={id}
        name={id}
        type={type}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        className={`w-full rounded-xl border px-4 py-2 outline-none ${
          error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
        }`}
      />
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </label>
  );
}

function Textarea({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (id: string, value: string) => void | Promise<void>;
}) {
  return (
    <label htmlFor={id} className="space-y-1">
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <textarea
        id={id}
        name={id}
        rows={4}
        value={value}
        onChange={(event) => onChange(id, event.target.value)}
        className="w-full rounded-xl border border-slate-200 px-4 py-2 outline-none focus:border-blue-500"
      />
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
      <span className="text-sm font-semibold text-slate-600">{label}</span>
      <select
        id={id}
        name={id}
        value={value}
        disabled={disabled}
        onChange={(event) => onChange(id, event.target.value)}
        className={`w-full rounded-xl border px-4 py-2 outline-none disabled:bg-slate-100 disabled:text-slate-400 ${
          error ? 'border-red-400 focus:border-red-500' : 'border-slate-200 focus:border-blue-500'
        }`}
      >
        {children}
      </select>
      {error && <p className="text-xs font-medium text-red-500">{error}</p>}
    </label>
  );
}