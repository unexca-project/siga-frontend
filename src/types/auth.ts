export interface User {
  id: string;
  username: string;
  email: string;
  nombre?: string;
  apellido?: string;
  rol?: string | null;
  permissions?: string[];
}
export interface TokenResponse {
  access: string;
  refresh: string;
  user: User;
}