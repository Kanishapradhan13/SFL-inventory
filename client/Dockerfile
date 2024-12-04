# syntax=docker/dockerfile:1

ARG NODE_VERSION=20.11.1

# Base stage: Use Node.js base image
FROM node:${NODE_VERSION}-alpine as base
WORKDIR /usr/src/app

################################################################################
# Dependencies stage: Install production dependencies
FROM base as deps

# Copy package.json and package-lock.json from the current directory
COPY package.json package-lock.json ./

# Install production dependencies
RUN --mount=type=cache,target=/root/.npm \
    npm ci --omit=dev

################################################################################
# Build stage: Build the Next.js application
FROM deps as build

# Copy the entire current directory into the container
COPY . .

# Change working directory to the app root to run the build process
WORKDIR /usr/src/app

# Install all dependencies (including devDependencies) for the build process
RUN --mount=type=cache,target=/root/.npm \
    npm ci

# Build the Next.js application
RUN npm run build

################################################################################
# Final stage: Create runtime image with minimal dependencies
FROM base as final

# Set environment to production or development
ENV NODE_ENV development

# Set working directory to app root
WORKDIR /usr/src/app

# Copy only the necessary files and directories
COPY --from=deps /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.next ./.next
COPY --from=build /usr/src/app/public ./public
COPY --from=build /usr/src/app/app ./app  

# Expose the port for the application
EXPOSE 3000

# Start the application in development mode
CMD ["npm", "start"]
