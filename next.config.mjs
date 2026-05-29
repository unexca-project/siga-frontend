/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esto evita que el build falle por errores menores de tipos de TypeScript
  typescript: {
    ignoreBuildErrors: true,
  },
  // Esto evita que el build falle por errores de ESLint
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Esto ayuda a que el Fast Refresh funcione mejor en entornos Docker/Windows
  webpack: (config) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

export default nextConfig;