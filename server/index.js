const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.json())
app.use(cors())

const tasks = require('./routes/api/tasks')
const port = process.env.PORT || 5000

app.use('/api/tasks', tasks)
app.listen(port, () => {
    console.log(`server started on port ${port}`)
})