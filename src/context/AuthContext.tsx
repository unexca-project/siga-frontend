'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import api from '@/services/api';
import { User } from '@/types/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (credentials: Record<string, string>) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const savedUser = Cookies.get('user');
    const token = Cookies.get('token');

    if (savedUser && token) {
      setUser(JSON.parse(savedUser));
    }

    setLoading(false);
  }, []);

  const login = async (credentials: Record<string, string>) => {
    try {
      const payload = {
        email: credentials.email || credentials.username,
        password: credentials.password,
      };

      const response = await api.post('/autenticacion/login/', payload);

      const { access, refresh, user } = response.data;

      Cookies.set('token', access, { path: '/' });
      Cookies.set('refreshToken', refresh, { path: '/' });
      Cookies.set('user', JSON.stringify(user), { path: '/' });

      setUser(user);
    } catch (error: any) {
      console.error('Detalle del error:', error.response?.data);

      throw new Error(
        error.response?.data?.email?.[0] ||
          error.response?.data?.detail ||
          'Usuario o contraseña incorrectos'
      );
    }
  };

  const logout = async () => {
    const refresh = Cookies.get('refreshToken');
    const access = Cookies.get('token');

    try {
      if (refresh && access) {
        await api.post(
          '/autenticacion/logout/',
          { refresh },
          {
            headers: {
              Authorization: `Bearer ${access}`,
            },
          }
        );
      }
    } catch (error) {
      console.error('Error cerrando sesión:', error);
    } finally {
      Cookies.remove('token', { path: '/' });
      Cookies.remove('refreshToken', { path: '/' });
      Cookies.remove('user', { path: '/' });

      setUser(null);
      router.replace('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider');
  }

  return context;
};