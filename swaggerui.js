import swaggerUi from 'swagger-ui-express'
import swaggerJSDoc from 'swagger-jsdoc'

const options={
  apis:['./routes/*.js'],
  definition: {
    openapi: '3.0.0',
    info:{
      title: "Bauk Cheescake",
      version: "0.0.1",
      description:"Api for sale cheescakes"
    },
    servers:[
      {
        url: 'https://localhost:5000'
      }
    ]
  }
}
  
const specs = swaggerJSDoc(options)

export {swaggerUi, specs}