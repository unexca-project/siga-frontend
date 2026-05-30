import { AuthProvider } from '../context/AuthContext';
import './globals.css';

export const metadata = {
  title: {
    default: 'Intranet Corpojuventud',
    template: '%s | Intranet Corpojuventud',
  },
  description: 'Plataforma institucional para la gestión operativa y administrativa',
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