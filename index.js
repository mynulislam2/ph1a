const express = require('express')
const PersonsRouter = require('./Routes/persons.route')
const app = express()
var cors = require('cors')
app.use(cors())
const bp = require('body-parser')
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

const port =4003
app.use('/',PersonsRouter)
app.listen(port, () => {
  console.log(`listening on port ${port}`)
})