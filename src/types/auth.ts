export interface User {
  id: string;
  username: string;
  email: string;
  nombre?: string;
  apellido?: string;
  rol?: string | null;
}
export interface TokenResponse {
  access: string;
  refresh: string;
  user: User;
}