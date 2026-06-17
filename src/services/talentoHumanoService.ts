import api from './api';

import type {
  PaginatedResponse,
  TrabajadorFilters,
  TrabajadorListItem,
  CatalogoBase,
} from '@/types/talentoHumano';

function buildParams(filters: TrabajadorFilters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (
    value !== undefined &&
    value !== null &&
    !(typeof value === 'string' && value.trim() === '')
    ) {
      params.append(key, String(value));
    }
  });

  return params.toString();
}

export async function getTrabajadores(
  filters: TrabajadorFilters = {}
): Promise<PaginatedResponse<TrabajadorListItem>> {
  const query = buildParams(filters);
  const url = query
    ? `/talento-humano/trabajadores/?${query}`
    : '/talento-humano/trabajadores/';

  const response = await api.get<PaginatedResponse<TrabajadorListItem>>(url);

  return response.data;
}

import type {
  TrabajadorCreatePayload,
  TrabajadorDetail,
} from '@/types/talentoHumano';

export async function getTrabajadorById(
  id: string
): Promise<TrabajadorDetail> {
  const response = await api.get<TrabajadorDetail>(
    `/talento-humano/trabajadores/${id}/`
  );

  return response.data;
}

export async function createTrabajador(
  payload: TrabajadorCreatePayload
): Promise<TrabajadorDetail> {
  const response = await api.post<TrabajadorDetail>(
    '/talento-humano/trabajadores/',
    payload
  );

  return response.data;
}

export async function updateTrabajador(
  id: string,
  payload: Partial<TrabajadorCreatePayload>
): Promise<TrabajadorDetail> {
  const response = await api.patch<TrabajadorDetail>(
    `/talento-humano/trabajadores/${id}/`,
    payload
  );

  return response.data;
}

export async function deleteTrabajador(
  id: string
): Promise<{ detail: string }> {
  const response = await api.delete<{ detail: string }>(
    `/talento-humano/trabajadores/${id}/`
  );

  return response.data;
}

export async function getEstadosLaborales(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/estados-laborales/');
  return response.data;
}

export async function getCargos(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/cargos/');
  return response.data;
}

export async function getDepartamentos(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/departamentos/');
  return response.data;
}

export async function getTiposTelefono(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/tipos-telefono/');
  return response.data;
}

export async function getTiposDireccion(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/tipos-direccion/');
  return response.data;
}

export async function getTiposParentesco(): Promise<CatalogoBase[]> {
  const response = await api.get<CatalogoBase[]>('/talento-humano/tipos-parentesco/');
  return response.data;
}

export async function asignarCargoTrabajador(
  trabajadorId: string,
  payload: {
    cargo: string;
    es_principal: boolean;
    fecha_inicio?: string;
  }
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/cargos/`,
    payload
  );

  return response.data;
}

export async function asignarDepartamentoTrabajador(
  trabajadorId: string,
  payload: {
    departamento: string;
    es_principal: boolean;
    fecha_inicio?: string;
  }
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/departamentos/`,
    payload
  );

  return response.data;
}

export async function crearTelefonoTrabajador(
  trabajadorId: string,
  payload: {
    tipo_telefono: string;
    numero: string;
    es_principal: boolean;
  }
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/telefonos/`,
    payload
  );

  return response.data;
}

export async function crearDireccionTrabajador(
  trabajadorId: string,
  payload: {
    tipo_direccion: string;
    estado: string;
    municipio: string;
    parroquia: string;
    calle_avenida?: string;
    edificio_casa?: string;
    piso?: string;
    punto_referencia?: string;
    direccion_detallada: string;
    es_principal: boolean;
  }
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/direcciones/`,
    payload
  );

  return response.data;
}

export async function crearContactoEmergencia(
  trabajadorId: string,
  payload: {
    nombres: string;
    apellidos?: string;
    parentesco: string;
    es_principal: boolean;
  }
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/contactos-emergencia/`,
    payload
  );

  return response.data;
}

export async function crearTelefonoContactoEmergencia(
  contactoId: string,
  payload: {
    tipo_telefono: string;
    numero: string;
    es_principal: boolean;
  }
) {
  const response = await api.post(
    `/talento-humano/contactos-emergencia/${contactoId}/telefonos/`,
    payload
  );

  return response.data;
}

export async function desactivarTrabajador(
  trabajadorId: string
) {
  const response = await api.delete(
    `/talento-humano/trabajadores/${trabajadorId}/`
  );

  return response.data;
}

export async function reactivarTrabajador(
  trabajadorId: string
) {
  const response = await api.post(
    `/talento-humano/trabajadores/${trabajadorId}/reactivar/`
  );

  return response.data;
}