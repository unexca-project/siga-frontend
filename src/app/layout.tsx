import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: 'SIGA - UNEXCA',
  description: 'Sistema Integrado de Gestión Académica',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}