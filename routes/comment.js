import { Router } from "express";
import { authenticate } from '../config/authMiddleware.js'
import { addComment } from '../controller/comment.js'

const router = Router();

router.route('/add/:id').post(authenticate, addComment);

export default router;