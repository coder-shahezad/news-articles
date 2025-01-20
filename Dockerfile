# Use an official Node.js runtime as a parent image
FROM node:18-alpine

# Enable Corepack to manage Yarn
RUN corepack enable

# Set the working directory in the container
WORKDIR /news-feed

# Copy package.json and yarn.lock (use yarn.lock if you have it)
COPY ./package.json ./
COPY ./yarn.lock ./
COPY ./.yarn ./.yarn
COPY ./.yarnrc.yml ./

# Install dependencies
RUN yarn install
RUN yarn cache clean

# Copy the rest of the application files
COPY . .

# Build the application for production
RUN yarn run build

# Expose port 4173 for Vite's dev server
EXPOSE 4173

# Run the Vite dev server
CMD ["yarn", "run", "preview", "--", "--host", "0.0.0.0", "--port", "4173"]
