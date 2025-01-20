# News Feed

This template provides a minimal setup to integrate **React** with **Vite**, complete with **Hot Module Replacement (HMR)** and **ESLint** rules for best practices.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Build the Application using Docker](#build-the-application-using-docker)
- [Running the Application using Docker](#Running-the-application-using-docker)

## Installation

To install the necessary dependencies, run the following command:

```bash
yarn install
```

This will install all the required packages listed in the `package.json` file.

## Running the Application

To start the development server and run the application, use the following command:

```bash
yarn run dev
```

This will start the React app with Vite, enabling Hot Module Replacement (HMR) for faster development.

## Build the Project from the Command-Line

To create a build of your project that can be deployed, use the following script:

```bash
yarn run build
```

This will generate the production-ready files in the `dist/` directory.

## Build Project from the Command-Line using Docker

To create a build of your project that can be deployed using Docker, use the following script:

```bash
docker build --no-cache -t <Docker-Image-Name> .
```

## Running Docker Application

To run the your build docker image, use the following script:

```bash
docker run -p 4173:4173 <Docker-Image-ID>
```

This will run all the unit test cases defined in the project and output the results to the terminal.

### Explanation of Scripts:

- **`yarn install`:** This script will install all the required packages listed in the `package.json` file.
- **`yarn run dev`:** This script uses Vite start the development server and run the application.
- **`yarn run build`:** This script uses Vite to bundle the application for production.
- **`docker build --no-cache -t <Docker-Image-Name> .`:** This script uses Docker to build your project.
- **`docker run -p 4173:4173 <Docker-Image-ID> .`:** This script uses Docker to run your project.
