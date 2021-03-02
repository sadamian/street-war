# Street War Game

Server to run a street war 

Based on [This Game](https://www.lebonbon.fr/lyon/loisirs/une-bataille-d-eau-geante-dans-les-rues-de-lyon/)

## Features

A Node.JS Back-end with

- **ExpressJS:** A framework to handle Routing
- **Mongoose:** an ORM to assure the connection with MongoDB
- **Jest:** To test the App
- **Typescript:** To have more robust code
- **A nice dev env:** With hot reloading & TS compilation
- **GraphQL:** To expose better API _WIP_

## Prerequisites

Make sure you have installed all of the following prerequisites on your development machine:

- Node.js `>= 12` - [Download & Install Node.js](https://nodejs.org)
- mongoDB - [Download & Install MongoDB](https://docs.mongodb.com/manual/installation/)
- Postman - [Download & Install Postman](https://www.postman.com/downloads/)

## Installation

1. Install dependencies with `yarn`
   - run `$ yarn`
2. Set up your environment
   - Create a .env file `$ touch .env`
   - Populate `.env` with keys from `.env-sample`
     - `PORT` : The port used by the app
     - `DB_URL` : The URL of the MongoDB database
     - `TOKEN_SECRET` : The secret to hash JWTs
3. **That's it**

## Usage

### Development

1. run `$ yarn webpack` in your shell

- To compile with hot reloading all files `.ts` & `.js`

2. run `$ yarn start` in another shell
   - To serve the files builded by webpack
   
### Production

1. run `$ yarn build` in your shell

- the `/dist/index.js` will contains all the files minified in one

2. run `$ node /dist/index.js` to start the server

### Test
1. run `$ yarn test` to run the tests


## Rules

- An user can join a war only if the war is not started yet
- When the war starts, contracts are generated
- Each users still in the game are both a target and a hitman
- The goal of the hitman it's to eliminate the target of the contract
- When a user is eliminated, the contract where he is the hitman is aborted
and a new contract is created

#### war lifecycle example : 
- 4 users : A, B, C, D
- Starting contracts 
```A -> B
   B -> C
   C -> D
   D -> A
```

If A kills B then, active contracts are as follow
```A -> C
   C -> D
   D -> A
```

## Folder architecture

### Main file

##### Entry point : `server.ts`

- Server and BDD configuration

##### Main routing : `app.ts`

- Routing configuration

##### All routes : `router.ts`

### Module

#### `moduleName.interface.ts`
The interface definition of _moduleName_

**e.g**

```
interface IWar {
  name: string;
}
```

#### `Folder:moduleName.router`
Folder with The definition of all api routes for _moduleName_

Separated in admin and api

#### `moduleName.controller.ts`
The action corresponding to each api routes of _moduleName_

#### `moduleName.service.ts`
The Business Logic of the App

#### `Folder:moduleName.database`
All database files related to _moduleName_

##### `moduleName.database.interface.ts`
Interface definiton of the _moduleName_ **Model** and **Document**

##### `moduleName.database.schema.ts`
Mongoose Schema definiton of the _moduleName_

Will also implement statics and methods function of the Schema

##### `moduleName.database.model.ts`
Mongoose Model definiton of the _moduleName_ using the Schema and the `moduleName.database.interfaces`

##### `moduleName.database.service.ts`
_moduleName_ database service to define all function who gonna be used by the router

##### `moduleName.database.static.ts`
_moduleName_ database Model static function

##### `moduleName.database.method.ts`
_moduleName_ database Document function
Need to get an instance of _moduleName_ Document to be called



## TODO

### Business rules
- [ ] Handle finale when onlly two users remains
- [ ] Handle registration
- [ ] Add User Info as subdocument

### Tech
- [ ] Better error handling 
- [ ] Better response format 
- [ ] Request body validation
- [ ] Add script to add a new module by running
`$ yarn new_module --name {module name} --database`
- [ ] finish GraphQl integration
- [ ] add GraphQl Test suite
- [ ] Generate secrete for each contract based on id hashed by user's secret
to build link
who gonna be given the QR code in the App
- [ ] add https://shields.io/ to github
- [ ] add CI
- [ ] add user's notif
