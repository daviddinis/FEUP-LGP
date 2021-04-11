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

First, make sure you have your node dependencies up to date, by running `npm install` on both the backend and frontend folder. Then, you will need a valid .env file on the backend folder (you may use .env.template as a reference).

Now, setup your installation of docker by following the instructions on https://docs.docker.com/engine/install/, and run docker. After that, run `docker-compose up` in the backend folder. This will build and start up a docker container with a MongoDB database for development.

After that, go to the backend folder and run `npm run dev`. This will run the Express server on http://localhost:3001, as well as a React app on http://localhost:3000. The changes you make to the frontend or backend code will reload the applications automatically.

If you wish to simply run the server app, run `npm run dev-server`, and if you want to run the client, run `npm run dev-client` (this will just run `npm start` on the frontend folder).

### **Production**

TODO

## Test

To run the client tests, open the frontend folder and run `npm run test`.  
To run the server tests, open the backend folder and run `npm run test`.

## Linter
 
To run the client linter, open the frontend folder and run `npm run lint`. 
To run the server linter, open the backend folder and run `npm run lint`. 
