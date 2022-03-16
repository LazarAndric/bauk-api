import express from 'express'
import bodyParser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import swaggerDocs from './swagger.json' assert {type: 'json'}
import authRoute from './routes/authorization.js'
import usersRoute from './routes/users.js'
import placesRoute from './routes/places.js'
import productsRoute from './routes/products.js'
import sizeRoute from './routes/sizes.js'
import additionsRoute from './routes/additions.js'
import visitRoute from './routes/visit.js'
import orderRoute from './routes/orders.js'
import * as auth from './middleware/authorizationMiddleware.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())

app.use('/products', auth.authorizeRequest, productsRoute)
app.use('/users', auth.authorizeRequest, usersRoute)
app.use('/places', auth.authorizeRequest, placesRoute)
app.use('/authorization', auth.authorizeRequest, authRoute)
app.use('/sizes', auth.authorizeRequest, sizeRoute)
app.use('/additions', auth.authorizeRequest, additionsRoute)
app.use('/visits', auth.authorizeRequest, visitRoute)
app.use('/orders', auth.authorizeRequest, orderRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`)
})