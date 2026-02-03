const express = require('express')

const app = express()
const port = 3000

const responseFormat = require('./src/middlewares/responseFormat')
const notFoundHandler = require('./src/middlewares/notFoundHandler')
const exceptionHandler = require('./src/middlewares/exceptionHandler')

require('./src/config/database')
const taskController = require('./src/controller/task.controller')

app.use(responseFormat)
app.use(express.json())

app.get('/tasks', taskController.getAll)
app.get('/tasks/:id', taskController.getOne)
app.post('/tasks', taskController.create)
app.put('/tasks/:id', taskController.update)
app.delete('/tasks/:id', taskController.destroy)

app.get('/test-success', (_,res) => {
    res.success({
        message: "Hello World"
    })
})

app.get("/test-error", (_,res) => {
    throw Error("Test exception")
})

app.use(notFoundHandler)
app.use(exceptionHandler)



app.listen(port, () => {
    console.log('listening on ' + port)
})