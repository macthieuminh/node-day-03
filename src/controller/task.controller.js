const taskModel = require('../models/task.model')

const getAll = async (req, res) => {
    try {
        const tasks = await taskModel.findAll()
        res.success(tasks)
    } catch (error) {
        res.error(500, error.message, error)
    }
}

const getOne = async (req, res) => {
    try {
        const { id } = req.params
        const task = await taskModel.findOne(id)
        if (!task) {
            return res.error(404, 'Task not found')
        }
        res.success(task)
    } catch (error) {
        res.error(500, error.message, error)
    }
}

const create = async (req, res) => {
    try {
        const { title, completed } = req.body
        if (!title) {
            return res.error(400, 'Title is required')
        }
        const newTask = await taskModel.create({ title, completed })
        res.success(newTask, 201)
    } catch (error) {
        res.error(500, error.message, error)
    }
}

const update = async (req, res) => {
    try {
        const { id } = req.params
        const { title, completed } = req.body
        const affectedRows = await taskModel.update(id, { title, completed })
        
        if (affectedRows === 0) {
            return res.error(404, 'Task not found or no changes made')
        }
        res.success({ message: 'Task updated successfully' })
    } catch (error) {
        res.error(500, error.message, error)
    }
}

const destroy = async (req, res) => {
    try {
        const { id } = req.params
        const affectedRows = await taskModel.destroy(id)
        
        if (affectedRows === 0) {
            return res.error(404, 'Task not found')
        }
        res.success({ message: 'Task deleted successfully' })
    } catch (error) {
        res.error(500, error.message, error)
    }
}

module.exports = { getAll, getOne, create, update, destroy }
