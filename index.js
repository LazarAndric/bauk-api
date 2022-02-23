import express from 'express'
import bodyParser from 'body-parser'

import usersRoute from './routs/users.js'
import productsRoute from './routs/users.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(bodyParser.json())

app.use('/products', productsRoute)
app.use('/users', usersRoute)


app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})