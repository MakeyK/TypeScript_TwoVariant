import { Router } from "express";
import {UserController} from "../controllers/User.controller";
import authMiddleware from "../middleware/auth.middleware";


export const auth = Router();
const userController = new UserController();
auth.post('/login', userController.login);
auth.post('/registration', userController.registration);
auth.get('/logout', authMiddleware, userController.logout);
auth.put('/', authMiddleware, userController.update);