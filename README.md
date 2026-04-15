# SIGA - Frontend (Sistema de Gestión Académica)

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Este repositorio contiene la interfaz de usuario de **SIGA**, una plataforma moderna diseñada para la gestión académica y administrativa. El frontend está construido con **Next.js 14+**, priorizando una experiencia de usuario (UX) fluida, densa y profesional, inspirada en estándares de plataformas fintech.

## Tecnologías Principales

- **Framework:** Next.js (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Estado:** TanStack Query (React Query) / Context API
- **Iconos:** Lucide React
- **Validación:** Zod + React Hook Form

## Estructura del Proyecto

```text
src/
├── app/            # Rutas y layouts principales
├── components/     # Componentes reutilizables (UI, Tables, Pills)
├── hooks/          # Hooks personalizados para lógica de API
├── lib/            # Configuraciones de clientes (Axios, Utils)
├── services/       # Llamadas directas al Backend (Django)
└── types/          # Definiciones de interfaces TypeScript
