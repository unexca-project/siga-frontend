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
