# syntax=docker/dockerfile:1

# ===== Build stage =====
FROM node:20-alpine AS build
WORKDIR /app

# Install deps
COPY package.json package-lock.json* ./
RUN npm ci || npm i

# Copy config + sources (CLI only)
COPY tsconfig.json vitest.cli.config.ts ./
COPY src ./src

# Run ONLY CLI tests (ui/ not in image)
RUN npm run test:cli

# Build CLI
RUN npm run build


# ===== Run stage =====
FROM node:20-alpine
WORKDIR /app

# Ship built files + minimal metadata
COPY --from=build /app/dist ./dist
COPY package.json ./

# Default command (no URL args)
CMD ["node", "dist/index.js"]
