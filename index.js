import express from 'express'
import bodyParser from 'body-parser'

import usersRoute from './routs/users.js'
import productsRoute from './routs/users.js'

import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

const swaggerOpptions={
  swaggerDefinition:{
    info:{
      title: 'Bauk API',
      description: 'Its ciz cake API',
      contacts: {
        name: 'unLa4ky'
      },
      servers: ['http://localhost:5000','http://localhost:4000']
    }
  },
  apis: ['index.js']
}

const swaggerDocs=swaggerJsdoc(swaggerOpptions)

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())

app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

//Routes
/**
 * @swagger
 * /products:
 *   get:
 *     description: Get all users
 *     responses:
 *       '200': 
 *          description: Return all users
 */
app.use('/products', productsRoute)
app.use('/users', usersRoute)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})