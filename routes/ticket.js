import { Router } from "express";
import { createTicket, getTicketById } from '../controller/ticket.js'
import { authenticate } from "../config/authMiddleware.js";

const router = Router();

router.route('/create/:id').post(authenticate, createTicket);

router.route('/:id').get(authenticate, getTicketById);

export default router;