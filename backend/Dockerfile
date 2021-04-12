FROM node:12

# Create app directory
WORKDIR /usr/src/app

# Bundle app source
COPY . .

# Frontend
WORKDIR /usr/src/app/frontend
RUN npm install 
RUN npm run build

# Backend 
WORKDIR /usr/src/app/
RUN npm install
RUN npm run build

# Expose port 3001
EXPOSE 3001

# Run the App
CMD [ "npm", "start" ]
