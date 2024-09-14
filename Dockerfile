# Use Node.js 20 as the base image
FROM node:20 as base

FROM base as development

WORKDIR /app
# Copy the package.json and package-lock.json (if present) to the container
# i need to add this line because this file does not have many changes 
# so i don't need to run the npm install everytime i build a new image
# it is considered as an optimization
COPY package.json .
RUN npm install
COPY . .
EXPOSE 4000
CMD [ "npm", "run", "dev" ]


FROM base as production

WORKDIR /app
COPY package.json .
RUN npm install --only=production
COPY . .
EXPOSE 4000
CMD [ "npm", "start" ]