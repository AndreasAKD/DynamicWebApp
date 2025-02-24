# Use the official Node.js image as the base image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code
COPY . .

# Build the Next.js application
RUN yarn build

# Expose the port the app runs on
EXPOSE 8080

# Set environment variable to tell Next.js to listen on port 80
ENV PORT 8080

# Start the Next.js application
CMD ["yarn", "start"]



# Manual deploy:

#     FROM mcr.microsoft.com/appsvc/dotnetcore:lts

#     ENV PORT 8080
#     EXPOSE 8080
    
#     ENV ASPNETCORE_URLS "http://*:${PORT}"
    
#     ENTRYPOINT ["dotnet", "/defaulthome/hostingstart/hostingstart.dll"]