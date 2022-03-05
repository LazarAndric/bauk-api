import express from 'express'
import bodyParser from 'body-parser'

// import swaggerUi from 'swagger-ui-express'
// import swaggerJSDoc from 'swagger-jsdoc'

import authRoute from './routes/authorization.js'
import usersRoute from './routes/users.js'
import productsRoute from './routes/products.js'

// const options={
//   apis:['./routes/*.js'],
//   definition: {
//     openapi: '3.0.0',
//     info:{
//       title: "Bauk Cheescake",
//       version: "0.0.1",
//       description:"Api for sale cheescakes"
//     },
//     servers:[
//       {
//         url: 'https://localhost:5000'
//       }
//     ],
//   }
// }

// const specs = swaggerJSDoc(options)

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())

app.use('/products', productsRoute)
app.use('/users', usersRoute)
app.use('/authorization', authRoute)
// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})