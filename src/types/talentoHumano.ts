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
  cedula: string;
  nacionalidad: string;
  pais_nacimiento?: string | null;
  estado_nacimiento?: string | null;
  municipio_nacimiento?: string | null;
  parroquia_nacimiento?: string | null;
  lugar_nacimiento_texto?: string | null;
  fecha_nacimiento: string | null;
  fecha_ingreso: string | null;
  fecha_egreso: string | null;
  observaciones: string | null;
  usuario: string | null;
  estado_laboral: string;
  cargos?: TrabajadorCargo[];
  departamentos?: TrabajadorDepartamento[];
  telefonos?: TelefonoTrabajador[];
  direcciones?: DireccionTrabajador[];
  contactos_emergencia?: ContactoEmergencia[];
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

export interface TrabajadorCargo {
  id: string;
  cargo: string;
  cargo_nombre?: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  es_principal: boolean;
}

export interface TrabajadorDepartamento {
  id: string;
  departamento: string;
  departamento_nombre?: string;
  fecha_inicio?: string | null;
  fecha_fin?: string | null;
  es_principal: boolean;
}

export interface TelefonoTrabajador {
  id: string;
  tipo_telefono: string;
  tipo_telefono_nombre?: string;
  numero: string;
  es_principal: boolean;
}

export interface DireccionTrabajador {
  id: string;
  tipo_direccion: string;
  tipo_direccion_nombre?: string;
  estado: string;
  estado_nombre?: string;
  municipio: string;
  municipio_nombre?: string;
  parroquia: string;
  parroquia_nombre?: string;
  calle_avenida?: string | null;
  edificio_casa?: string | null;
  piso?: string | null;
  punto_referencia?: string | null;
  direccion_detallada: string;
  es_principal: boolean;
}

export interface TelefonoContactoEmergencia {
  id: string;
  tipo_telefono: string;
  tipo_telefono_nombre?: string;
  numero: string;
  es_principal: boolean;
}

export interface ContactoEmergencia {
  id: string;
  nombres: string;
  apellidos?: string | null;
  parentesco: string;
  parentesco_nombre?: string;
  es_principal: boolean;
  telefonos?: TelefonoContactoEmergencia[];
}