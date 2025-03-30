import swaggerJSDoc from "swagger-jsdoc";
import path from "path"

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Bangalo API',
      version: '1.0.0',
      description: 'Api - Bangalô',
    },
    servers: [{ url: 'http://localhost:8080' }],
  },
  apis: [path.resolve(__dirname, "../Infra/Routes/*.ts")]
}

export const swaggerSpec = swaggerJSDoc(options)