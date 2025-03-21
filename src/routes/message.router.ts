import { Router } from "express";
import { MessageController } from "../controllers/Message.controller";

export const message = Router();
const messagesController = new MessageController();
message.post('/create', messagesController.create);
message.delete('/:message_id', messagesController.delete);
message.get('/title', messagesController.getByTitle);
message.get('/sender', messagesController.getBySender)
message.get('/recipient', messagesController.getByRecipient)