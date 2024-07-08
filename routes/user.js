import { Router } from "express";
import { getAllUsers, login, register } from "../controller/user.js";

const router = Router();

router.route("/register").post(register);

router.route("/login").post(login);

router.route("/all").get(getAllUsers);

export default router;