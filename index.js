import fs from 'fs'
import https from 'https'
//import http from 'http'
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
import orderStatusRoute from './routes/ordersStatus.js'
import pictureRoute from './routes/pictures.js'
import * as auth from './middleware/authorizationMiddleware.js'
import env from 'dotenv'


env.config()

//const HTTP_PORT = process.env.HTTP_PORT || 5000
const HTTPS_PORT = process.env.HTTPS_PORT || 5001
const app = express()


app.use(bodyParser.json())

app.use('/products', auth.authorizeRequest, productsRoute)
app.use('/pictures', auth.authorizeRequest, pictureRoute)
app.use('/status', auth.authorizeRequest, orderStatusRoute)
app.use('/users', auth.authorizeRequest, usersRoute)
app.use('/places', auth.authorizeRequest, placesRoute)
app.use('/authorization', auth.authorizeRequest, authRoute)
app.use('/sizes', auth.authorizeRequest, sizeRoute)
app.use('/additions', auth.authorizeRequest, additionsRoute)
app.use('/visits', auth.authorizeRequest, visitRoute)
app.use('/orders', auth.authorizeRequest, orderRoute)
app.use('/places', auth.authorizeRequest, placesRoute)
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs))

https.createServer({key: fs.readFileSync('key.pem'), cert: fs.readFileSync('cert.pem')}, app)
  .listen(HTTPS_PORT, () => {
    console.log('Listening...')
})

//http.createServer(app).listen(HTTP_PORT)