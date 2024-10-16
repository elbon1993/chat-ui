# Use the official Node.js image as a base image
FROM node:18 AS build

# Set the working directory
WORKDIR /chat-ui

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Expose the port for the Next.js server
EXPOSE 3000

# Start the Next.js server
CMD ["npm", "run", "start"]
