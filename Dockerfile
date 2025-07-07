# Etapa 1: build da aplicação
FROM node:20-alpine AS builder

WORKDIR /app

# Copia dependências e instala
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY tsconfig.json ./
COPY src ./src

# Compila o TypeScript para JavaScript
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:20-alpine

WORKDIR /app

# Copia apenas o necessário da etapa anterior
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist

# Instala apenas as dependências de produção
RUN npm install --omit=dev

# Expõe a porta
EXPOSE 3333 

# Comando de start
CMD ["node", "dist/server.js"]
