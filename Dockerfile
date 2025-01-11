# Step 1: Build the Angular app
FROM node:22.13.0 AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the Angular project files to the container
COPY . .

# Build the Angular app for production
RUN npm run build --prod

# Step 2: Serve the app using a lightweight web server
FROM nginx:alpine

# Copy the built Angular app from the build step to the Nginx server
COPY --from=build /app/dist/cyber-guard /usr/share/nginx/html

# Expose port 80 for the app
EXPOSE 80

# Start Nginx server to serve the Angular app
CMD ["nginx", "-g", "daemon off;"]
