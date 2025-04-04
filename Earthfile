# Base target for installing dependencies
VERSION 0.8

FROM node:18 AS base
WORKDIR /app

# Fetch dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Build application (without using npm build)
COPY . .
RUN npm install --omit=dev

# Build the Docker image
FROM node:18
WORKDIR /app
COPY --from=base /app .
CMD ["node", "index.js"]

# Define a target to build and push Docker image
TARGET +docker
    FROM base
    COPY . .
    RUN npm install --omit=dev
    ENTRYPOINT ["node", "index.js"]

    SAVE IMAGE jeeva1512/myapp:latest
