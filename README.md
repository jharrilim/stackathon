# Stackathon

## Preface

This repository acts as an example of how to deliver modern best practices in node full-stack. This example will show you:

- Docker Compose
  - In production
    - Acting as VPC with only 1 entry point
  - In development
    - Ports exposed; easy to access
    - PGAdmin available
  - In test
    - Running Postman test collections against your API
- Nginx Configuration
  - Reverse Proxy to API
  - CORS Enabled
- Modern React
  - Functional Components
  - React Context as an IoC container
  - React Hooks for simplified and localized state updates
- Typescript
  - Using Interfaces for [compile-time PropTypes](https://github.com/Microsoft/TypeScript-React-Starter#creating-a-component) instead of [runtime PropTypes](https://reactjs.org/docs/typechecking-with-proptypes.html)
  - Get type hints for Context and Hooks
  - Annotations for the most common controller pattern used in: ASP.NET, Spring Boot, Flask, etc.
  - Better IDE Support
- Password Hashing and Salting
- Node.js Cluster
  - Running a process for each core available on the host CPU
  - Round robin load balancing
  - Restart child process on failure

## Table of Contents

- [Stackathon](#stackathon)
  - [Preface](#preface)
  - [Table of Contents](#table-of-contents)
  - [Running In Circles](#running-in-circles)
    - [Everything; Dev Mode](#everything-dev-mode)
    - [Everything; Prod Mode](#everything-prod-mode)
    - [Debugging the Client](#debugging-the-client)
    - [Debugging the API](#debugging-the-api)
  - [Testing](#testing)
    - [Running the Postman API Tests](#running-the-postman-api-tests)
    - [Running the Unit Tests for the API and the Client](#running-the-unit-tests-for-the-api-and-the-client)
    - [Code Structure](#code-structure)
      - [API](#api)
      - [Client](#client)
    - [Test Structure](#test-structure)
      - [Mocks](#mocks)
      - [Naming Convention](#naming-convention)
  - [Features](#features)

## Running In Circles

### Everything; Dev Mode

Run it all!

```sh
docker-compose up --build -d --force-recreate
```

### Everything; Prod Mode

Run it all using the docker-compose.production.yml.

> Note: You will need to specify the environment variables through a .env or by
> setting it on your environment.

```sh
docker-compose -f docker-compose.production.yml up --build -d
```

> Notier Note: You may also wish to use `kompose convert` and use `kubectl` instead if you are deploying to a Kubernetes provider.

### Debugging the Client

Run everything except the client in Docker Compose:

```sh
docker-compose up -d db api pgadmin
```

After changes are made:

```sh
docker-compose up --build client
```

You may also run the API with `npm start` instead, and only run the DB in compose.
This way you can use `npm start` on the Client and take advantage of hot reloading as well.

### Debugging the API

Run the DB in compose:

```sh
docker-compose up -d db pgadmin
```

You may perform similar steps as above to run the API.

## Testing

The API and the Client both use `jest` for testing. The API also uses Postman for blackbox testing. 
You may find more information about **Postman** [here](https://www.getpostman.com/resources/videos-tutorials/) 
and its CLI tool **Newman** [here](https://github.com/postmanlabs/newman#using-newman-cli).

### Running the Postman API Tests

> Note: Make sure test.sh is executable: `chmod 744 ./api/scripts/test.sh`

```sh
./api/scripts/test.sh
```

### Running the Unit Tests for the API and the Client

```sh
npm t
```

### Code Structure

#### API

The API code is sorted by feature as opposed to structural formatting. Since the routes 
don't have any overlap, this keeps everything in nice tidy areas.
This is similar to [ASP.NET Areas](https://docs.microsoft.com/en-us/aspnet/core/mvc/controllers/areas?view=aspnetcore-2.2).

#### Client

The Client code is structured in a more familiar structural layout.
It is kept this way as the components directory tends to grow large, and keeping the services
together makes it easier to find when adding it to the AppContext for dependency injection.

### Test Structure

#### Mocks

Jest mocks that are placed in `src/__mocks__/` will replace node_module packages of the same name. Eg:
the `./client/__mocks__/axios.ts` mock replaces the Axios module when running jest.

> Documentation for this can be found [here](https://jestjs.io/docs/en/manual-mocks).

#### Naming Convention

Jest will look for any file inside of a `__tests__` folder, of any file that ends in:

- .test.ts
- .test.tsx
- .spec.ts
- .spec.tsx

## Features

- [API Features](./api/README.md)
- [Client Features](./client/README.md)
- Docker Compose contains all services + pgadmin (attach to db through container network using db as hostname)
