// Swagger set up
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Swagger Airports API",
      version: "1.0.0",
      description: "A test project to generate API docs",
      license: {
        name: "MIT",
        url: "https://choosealicense.com/licenses/mit/",
      },
      contact: {
        name: "Daniel",
        url: "https://www.multiverse.io",
        email: "daniel.miller@multiverse.io",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api-docs",
      },
    ],
  },
  apis: ["./server.js", "./Airport.js"],
};

module.exports = swaggerOptions;
