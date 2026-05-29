# Etapa 1: Dependencias
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json ./
RUN npm install

# Etapa 2: Construcción
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# Desactivamos la telemetría de Next.js durante el build
ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build

# Etapa 3: Ejecución
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

# Copiamos solo lo necesario para correr la app
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

EXPOSE 3000
CMD ["npm", "run", "start"]