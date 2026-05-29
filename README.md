# Intranet Transaccional Corpojuventud - Frontend

![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)

Frontend oficial de la **Intranet Transaccional Corpojuventud**, una plataforma institucional diseñada para centralizar la comunicación interna, la gestión de activos, la consulta documental y la visualización de indicadores operativos.

La aplicación está desarrollada con **Next.js 14**, **TypeScript** y **Tailwind CSS**, siguiendo una arquitectura moderna orientada a escalabilidad, mantenibilidad y experiencia de usuario.

---

## Objetivos del Proyecto

La plataforma busca:

- Centralizar la comunicación institucional.
- Facilitar el acceso a activos y recursos organizacionales.
- Mejorar la trazabilidad de procesos internos.
- Integrar información proveniente de sistemas existentes.
- Proporcionar métricas e indicadores para la toma de decisiones.
- Fortalecer la soberanía tecnológica mediante herramientas de código abierto.

---

## Tecnologías Principales

| Tecnología | Uso |
|------------|-----|
| Next.js 14 | Framework principal |
| TypeScript | Tipado estático |
| Tailwind CSS | Estilos y diseño UI |
| Axios | Comunicación con API |
| React Context | Gestión de autenticación |
| Lucide React | Iconografía |
| js-cookie | Gestión de sesión |
| TanStack Query | Gestión de datos y caché |

---

## Arquitectura

```text
src/
├── app/
│   ├── login/
│   ├── dashboard/
│   └── layout.tsx
│
├── components/
│   ├── ui/
│   │   └── layout/
│   │       ├── Navbar.tsx
│   │       └── Sidebar.tsx
│
├── context/
│   └── AuthContext.tsx
│
├── services/
│   └── api.ts
│
├── types/
│   └── auth.ts
│
└── middleware.ts
```

---

## Requisitos

- Node.js 20+
- npm 10+
- Backend de la Intranet desplegado y accesible

---

## Configuración de Variables de Entorno

Crear un archivo:

```bash
.env.local
```

Contenido:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

Para producción:

```env
NEXT_PUBLIC_API_URL=https://siga-backend-lvf3.onrender.com/api
```

---

## Ejecución Local

### 1. Clonar repositorio

```bash
git clone <url-del-repositorio>
cd siga-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

Crear:

```bash
.env.local
```

con:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

### 4. Ejecutar en modo desarrollo

```bash
npm run dev
```

Aplicación disponible en:

```txt
http://localhost:3000
```

---

## Ejecución mediante Docker

### Construcción

```bash
docker compose build
```

### Levantar servicios

```bash
docker compose up
```

o

```bash
docker compose up -d
```

Frontend disponible en:

```txt
http://localhost:3000
```

---

## Autenticación

La aplicación utiliza JWT mediante:

- Access Token
- Refresh Token

El flujo implementado es:

```text
Login
  ↓
Obtención de JWT
  ↓
Almacenamiento en Cookies
  ↓
Acceso al Dashboard
  ↓
Middleware de protección
  ↓
Logout e invalidación del Refresh Token
```

---

## Principales Módulos

### Dashboard

Visualización de:

- Indicadores institucionales.
- Actividad reciente.
- Accesos rápidos.
- Métricas operativas.

### Comunicación Institucional

Gestión de anuncios y comunicaciones internas.

### Gestión de Activos

Consulta de activos sincronizados desde sistemas institucionales.

### Formatos y Normativas

Repositorio centralizado de documentos.

### Usuarios

Administración de accesos y perfiles.

### Configuración

Parámetros generales de la plataforma.

---

## Despliegue


## Variables de Entorno

Crear un archivo `.env.local`:

```env
NEXT_PUBLIC_API_URL=<URL_DEL_BACKEND>/api
```

Ejemplo:

```env
NEXT_PUBLIC_API_URL=http://localhost:8000/api
```

En producción, configurar la variable correspondiente en Vercel apuntando al backend desplegado.

### Backend

```text
Render
```

### Base de Datos

```text
PostgreSQL
```

---

## Seguridad

- Autenticación JWT.
- Protección de rutas mediante Middleware.
- Validación de acceso a módulos protegidos.
- Gestión de sesión mediante Cookies.
- Integración con CORS configurado en Backend.

---

## Licencia

Proyecto desarrollado por Y. J. Rivas para Corpojuventud.

Uso institucional.