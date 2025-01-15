const express = require('express');
const { getAllTasks, createTask, editTask, deleteTask } = require('../controllers/task');

const taskRoutes = express.Router({ mergeParams: true });

taskRoutes.post('/create', createTask);
taskRoutes.post('/getUserTasks', getAllTasks);
taskRoutes.put('/edit', editTask);
taskRoutes.post('/delete', deleteTask);

module.exports = taskRoutes;