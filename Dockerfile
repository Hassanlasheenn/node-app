# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json (if present) to the container
# i need to add this line because this file does not have many changes 
# so i don't need to run the npm install everytime i build a new image
# it is considered as an optimization
COPY package.json .

# Install the Node.js dependencies defined in package.json
RUN npm install

# Copy all the files from the current directory to the working directory in the container
COPY . .

# Expose port 4000 to allow external access to this port on the container
EXPOSE 4000

# Define the command to start the application using npm
CMD [ "npm", "run", "dev" ]
