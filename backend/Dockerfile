# Base stage
FROM node:18 AS base

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .

# Build stage
FROM base AS build

RUN npm run build

# Development stage
FROM base AS dev

EXPOSE 3000
CMD ["npm", "run", "dev"]

# Debug stage
FROM base AS debug

EXPOSE 9229
EXPOSE 3000
CMD ["npm", "run", "debug"]
