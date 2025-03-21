import { Request, Response, NextFunction } from "express";
import Message from "../database/models/Message.model";
import { Op } from "sequelize";
import Files from "../database/models/Files.model";

export class MessageController {
    async getBySender(req: Request, res: Response, next: NextFunction) {
        try {
            const { sender } = req.query;
            let message = await Message.findAll({
                where: { sender },
                include: [
                    {
                        model: Files,
                        required: true,
                    }
                ]
            });
            res.json(message);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Сообщения не найдены",
            });
            next(e);
        }
    };

    async getByRecipient(req: Request, res: Response, next: NextFunction) {
        try {
            const { recipient } = req.query;
            let message = await Message.findAll({
                where: { recipient },
                include: [
                    {
                        model: Files,
                        required: true,
                    }
                ]
            });
            res.json(message);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Сообщения не найдены",
            });
            next(e);
        }
    };

    async getByTitle(req: Request, res: Response, next: NextFunction) {
        try {
            let { title } = req.body;
            const message = await Message.findAll({ where: { title: { [Op.substring]: title } } });
            res.json(message);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Сообщения не найдены",
            });
            next(e);
        }
    };

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            let { message_id, sender, recipient, message_send_date, message_get_date, title, text, applications } = req.body;
            message_get_date = new Date(message_get_date);
            message_send_date = new Date(message_send_date);
            console.log(req.body)
            const message = await Message.create(
                { message_id, sender, recipient, message_send_date, message_get_date, title, text, applications }
            );
            res.status(201).json(message);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Добавление сообщения не было выполнено(",
            });
            next(e);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction) {
        try {
            const message_id = req.params.message_id;
            const message = await Message.findByPk(message_id);
            if (!message) {
                res.status(404).json({
                    error: "Сообщение не найдено",
                });
            } else {
                await message.destroy();
                res.sendStatus(200);
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "Удаление сообщения не было выполнено(",
            });
            next(error);
        }
    }
}