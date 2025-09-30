# Node.js base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy your app code
COPY . .

# Expose port
EXPOSE 5000

# Start app
CMD [ "node", "server.js" ]