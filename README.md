# Stackathon

An example of how to deliver modern best practices in node full-stack.

## Table of Contents

- [Stackathon](#stackathon)
  - [Table of Contents](#table-of-contents)
  - [Running In Circles](#running-in-circles)
    - [Everything; Dev Mode](#everything-dev-mode)
    - [Everything; Prod Mode](#everything-prod-mode)
    - [Debugging the Client](#debugging-the-client)
    - [Debugging the API](#debugging-the-api)
  - [Testing](#testing)
    - [Running the Postman API Tests](#running-the-postman-api-tests)
    - [Running the Unit Tests for the API and the Client](#running-the-unit-tests-for-the-api-and-the-client)
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

### Test Structure

#### Mocks

Jest mocks that are placed in `src/__mocks__/` will replace node_module packages of the same name. Eg:
the `./client/__mocks__/axios.ts` mock replaces the Axios module when running jest.
Documentation for this can be found [here](https://jestjs.io/docs/en/manual-mocks).

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
