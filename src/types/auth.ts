export interface User {
  id: number;
  username: string;
  email: string;
  rol: 'Administrador' | 'Coordinador' | 'Profesor' | 'Estudiante' | null;
}

export interface TokenResponse {
  access: string;
  refresh: string;
  user: User;
}