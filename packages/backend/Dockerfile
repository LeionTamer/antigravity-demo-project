FROM oven/bun:1 AS base
WORKDIR /app

# Copy root package files
COPY package.json bun.lockb ./

# Copy backend package.json
COPY packages/backend/package.json ./packages/backend/

# Install dependencies (this will install all dependencies including frontend, 
# which is fine for caching, or we can use --filter if bun supports it during install to save space)
RUN bun install --frozen-lockfile

# Copy backend source code
COPY packages/backend ./packages/backend

# Set working directory to backend
WORKDIR /app/packages/backend

# Expose port
EXPOSE 3000

# Start the server
CMD ["bun", "src/index.ts"]
