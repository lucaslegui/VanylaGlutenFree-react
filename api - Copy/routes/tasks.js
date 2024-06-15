import express from 'express';
import {
  getTasksByProjectId,
  createTask,
  getTaskById,
  updateTask,
  updateTaskStatus,
  deleteTask
} from '../controllers/tasks_controller.js';

const taskroutes = express.Router();

taskroutes.get('/project/:projectId', getTasksByProjectId);
taskroutes.post('/', createTask);
taskroutes.get('/:id', getTaskById);
taskroutes.put('/:id', updateTask);
taskroutes.patch('/:id/status', updateTaskStatus);
taskroutes.delete('/:id', deleteTask);

export { taskroutes };
