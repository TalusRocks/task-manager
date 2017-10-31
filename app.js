const express = require('express')
const app = express()
const port = process.env.PORT || 3000

const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.disable('x-powered-by')
app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cors())

const taskRoutes = require("./src/routes/task-routes")
app.use('/tasks', taskRoutes)

app.use((err, req, res, next) => {
  const status = err.status || 500
  console.log(err);
  res.status(status).json({error: {message: "Sorry, something went wrong." }})
})

app.use((req, res, next) => {
  res.status(404).json({error: {message: "Not found"}})
})

const listener = () => console.log(`Listening on port ${port}`);
app.listen(port, listener)

module.exports = app
