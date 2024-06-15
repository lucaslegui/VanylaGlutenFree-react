import express from 'express';
import {
  getAllProjects,
  createProject,
  searchProjects,
  getProjectDetailsWithTasks
} from '../controllers/projects_controller.js';

const projectroutes = express.Router();

projectroutes.get('/', getAllProjects);
projectroutes.post('/', createProject);
projectroutes.get('/search', searchProjects);
projectroutes.get('/:projectId/details', getProjectDetailsWithTasks);

export { projectroutes };
