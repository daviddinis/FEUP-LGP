# KyCON

Know Your Customer On The News

Team: LGP4C

## Project Proposal

**Project Name:** Know Your Customer On The News  
**Project Details:**

**Proponent name:**    
**Organization:** 
**Contact email address:** 

## Setup

### **Development**

First, setup your installation of docker by following the instructions on https://docs.docker.com/engine/install/, and run docker.

Now, run `docker-compose up` in the backend folder. This will build and start up a docker container with a MongoDB database for development.

After that, go to the backend folder and run `npm run dev` (you may need to run `npm install` on both the backend and frontend folder to update dependencies). This will run the Express server on http://localhost:3001, as well as a React app on http://localhost:3000. The changes you make to the frontend or backend code will reload the applications automatically.

### **Production**

TODO

## Test

To run the client tests, open the frontend folder and run `npm run test`.  
To run the server tests, open the backend folder and run `npm run test`.

## Linter

To run the client linter, open the frontend folder and run `npm run lint`. 
To run the server linter, open the backend folder and run `npm run lint`. 
