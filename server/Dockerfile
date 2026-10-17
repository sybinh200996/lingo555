FROM node:20-alpine

# Install build dependencies for better-sqlite3
RUN apk add --no-cache python3 make g++

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Ensure data directories exist
RUN mkdir -p /app/data /app/data/uploads

EXPOSE 5000

CMD ["node", "src/index.js"]
