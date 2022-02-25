import express from 'express'
import bodyParser from 'body-parser'

import swaggerUi from 'swagger-ui-express'
import swaggerDocs from 'swagger-jsdoc'

import usersRoute from './routes/users.js'
import productsRoute from './routes/users.js'
import swaggerJSDoc from 'swagger-jsdoc'

const options={
  definition: {
    openapi: '3.0.0',
    info:{
      title: "Bauk Cheescake",
      version: "0.0.1",
      description:"Api for sale cheescakes"
    },
    servers:[
      {
        url: 'https://localhost:4000'
      }
    ],
    apis:['./routes/*.js']
  }
}

const specs = swaggerJSDoc(options)


const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())

app.use('/products', productsRoute)
app.use('/users', usersRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})