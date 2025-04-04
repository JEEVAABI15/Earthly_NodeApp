VERSION 0.8

# Define base target for installing dependencies
target +base
    FROM node:18 AS base
    WORKDIR /app

    COPY package.json package-lock.json ./
    RUN npm ci

    COPY . .
    RUN npm install --omit=dev

# Define the final image build target
target +docker
    FROM +base
    COPY . .
    RUN npm install --omit=dev
    ENTRYPOINT ["node", "index.js"]

    SAVE IMAGE jeeva1512/myapp:latest
