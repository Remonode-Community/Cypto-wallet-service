# syntax=docker/dockerfile:1

# ---------- base: shared setup + native build tools (bcrypt) ----------
FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache python3 make g++

# ---------- deps: full dependency tree for building ----------
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# ---------- build: compile TypeScript to dist/ ----------
FROM deps AS build
COPY tsconfig.json ./
COPY src ./src
RUN npm run build

# ---------- prod-deps: runtime dependencies only ----------
FROM base AS prod-deps
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# ---------- runner: minimal production image ----------
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S app && adduser -S app -G app

COPY --from=prod-deps --chown=app:app /app/node_modules ./node_modules
COPY --from=build --chown=app:app /app/dist ./dist
COPY --chown=app:app package.json ./

USER app

EXPOSE 8000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -q -O /dev/null "http://127.0.0.1:${PORT:-8000}/health" || exit 1

CMD ["node", "dist/server.js"]
