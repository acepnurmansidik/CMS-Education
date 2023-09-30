const swaggerAutogen = require("swagger-autogen")();
const GlobalSchema = require("./resource/schema");

const outputFile = "./swagger-output.json";
const endpointsFiles = ["./app.js"]; // Sesuaikan dengan file-file yang berisi route Anda

const doc = {
  info: {
    version: "", // by default: '1.0.0'
    title: "REST API", // by default: 'REST API'
    description: "", // by default: ''
  },
  host: "localhost:3022", // by default: 'localhost:3022'
  basePath: "/", // by default: '/'
  schemes: ["http", "https"], // by default: ['http']
  consumes: [], // by default: ['application/json']
  produces: [], // by default: ['application/json']
  tags: [],
  securityDefinitions: {}, // by default: empty object
  definitions: {
    ...GlobalSchema,
    NotFound: {
      code: 404,
      status: false,
      message: "Data not found!",
      data: "",
    },
  }, // by default: empty object (Swagger 2.0)
  components: {}, // by default: empty object (OpenAPI 3.x)
};

swaggerAutogen(outputFile, endpointsFiles, doc);
