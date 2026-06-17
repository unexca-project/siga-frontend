import api from './api';

import type {
  Estado,
  Municipio,
  Parroquia,
} from '@/types/ubicacion';

export async function getEstados(): Promise<Estado[]> {
  const response = await api.get<Estado[]>('/ubicacion/estados/');
  return response.data;
}

export async function getMunicipios(
  estadoId: string
): Promise<Municipio[]> {
  const response = await api.get<Municipio[]>(
    `/ubicacion/municipios/?estado=${estadoId}`
  );

  return response.data;
}

export async function getParroquias(
  municipioId: string
): Promise<Parroquia[]> {
  const response = await api.get<Parroquia[]>(
    `/ubicacion/parroquias/?municipio=${municipioId}`
  );

  return response.data;
}