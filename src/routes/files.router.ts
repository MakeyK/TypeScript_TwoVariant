import { Router } from "express";
import { Files_Controller } from "../controllers/Files.controller";
import authMiddleware from "../middleware/auth.middleware";
import {fileUpload, imageUpload} from '../middleware/file.middleware';

export const files = Router();
const fileController = new Files_Controller();
files.post('/file', authMiddleware, fileUpload.single('file'), fileController.createFile);
files.put('/:number', authMiddleware, fileController.update);
files.delete('/:number', authMiddleware, fileController.deleteFile);
files.get('/', authMiddleware, fileController.get);
files.get('/description', authMiddleware, fileController.getByDescription);

