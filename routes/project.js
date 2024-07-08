import { Router } from "express";
import { authenticate } from '../config/authMiddleware.js'
import { createProject, getAllProjects, getProjectById, mutateUsers } from "../controller/project.js";

const router = Router();

router.route('/all').get(authenticate, getAllProjects);

router.route('/:id').get(authenticate, getProjectById);

router.route('/create').post(authenticate, createProject);

router.route('/mutateusers').post(authenticate, mutateUsers);

export default router;