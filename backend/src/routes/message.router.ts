import { Router } from "express";
import { MessageController } from "../controllers/Message.controller";

export const message = Router();
const messagesController = new MessageController();
message.post('/', messagesController.create);
message.delete('/:message_id', messagesController.delete);
message.get('/title', messagesController.getByTitle);