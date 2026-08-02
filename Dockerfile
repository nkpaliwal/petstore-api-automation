# Official Playwright image with Node.js and browsers pre-installed
FROM mcr.microsoft.com/playwright:v1.55.0-noble

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (better Docker layer caching)
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Default environment; override using: docker run -e ENV=dev
ENV ENV=ci

# Copy the complete project
COPY . .

# Execute Playwright tests
CMD ["npx", "playwright", "test"]