export interface PaginatedResponse<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface TrabajadorListItem {
  id: string;
  codigo: number;
  cedula: string;
  nacionalidad: string;
  nombres: string;
  apellidos: string;
  estado_laboral_nombre: string;
  is_active: boolean;
}

export interface TrabajadorFilters {
  page?: number;
  page_size?: number;
  search?: string;
  cedula?: string;
  estado_laboral?: string;
  is_active?: boolean;
}

export interface TrabajadorDetail extends TrabajadorListItem {
  sexo: string | null;
  fecha_nacimiento: string | null;
  fecha_ingreso: string | null;
  fecha_egreso: string | null;
  observaciones: string | null;
  usuario: string | null;
  estado_laboral: string;
  cargos?: unknown[];
  departamentos?: unknown[];
  telefonos?: unknown[];
  direcciones?: unknown[];
  contactos_emergencia?: unknown[];
}

export interface TrabajadorCreatePayload {
  cedula: string;
  nacionalidad: 'V' | 'E';
  nombres: string;
  apellidos: string;
  sexo?: 'M' | 'F' | 'O' | '';
  fecha_nacimiento?: string | null;
  fecha_ingreso?: string | null;
  observaciones?: string | null;
  estado_laboral: string;
}

export interface CatalogoBase {
  id: string;
  codigo: number;
  nombre: string;
  descripcion?: string | null;
  is_active: boolean;
}