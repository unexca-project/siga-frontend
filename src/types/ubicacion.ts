export interface Pais {
  id: string;
  codigo: number;
  nombre: string;
  codigo_iso: string | null;
}

export interface Estado {
  id: string;
  codigo: number;
  nombre: string;
  codigo_ine: string | null;
  pais: string;
  pais_nombre?: string;
}

export interface Municipio {
  id: string;
  codigo: number;
  nombre: string;
  codigo_ine: string | null;
  estado: string;
  estado_nombre?: string;
}

export interface Parroquia {
  id: string;
  codigo: number;
  nombre: string;
  codigo_ine: string | null;
  municipio: string;
  municipio_nombre?: string;
}