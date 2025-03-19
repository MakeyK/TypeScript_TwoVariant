import { Request, Response, NextFunction } from "express";
import { Op } from "sequelize";
import Files from "../database/models/Files.model";
import Message from "../database/models/Message.model";
import { sequelize } from "../database/server";
import path from "path";
import fs from 'fs';

export class Files_Controller {

    async get(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { message_code } = req.query;
            if (message_code) {
                const fileList = await Files.findAll({
                    include: [
                        {
                            model: Files,
                            required: true,
                            attributes: [],
                            where: {
                                message_code: message_code
                            },
                            include: [
                                {
                                    model: Message,
                                    required: true
                                }
                            ]
                        }
                    ]
                });
                res.json(fileList);
            } else {
                res.status(500).json({
                    error: "Файлы не найдены",
                });
            }

        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Файлы не найдены",
            });
            next(e);
        }
    };

    async getByDescription(req: Request, res: Response, next: NextFunction) {
        try {
            const { title } = req.body;
            const fileList = await Files.findAll({
                where: {
                    title: { [Op.substring]: title },
                }
            });
            res.json(fileList);
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Файлы не найдены",
            });
            next(e);
        }
    };

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const number = req.params;
            await Files.update(req.body, { where: { number } });
            res.sendStatus(200);
        } catch (e) {
            console.log(e)
            next(e);
        }
    }

    async createFile(req: Request, res: Response, next: NextFunction) {
        try {
            const { title, message_file } = req.body;

            if (!req.file) {
                res.status(400).json({ error: "Файл не был загружен" });
            } else {
                let url: string = req.file.filename;
                if (req.file.mimetype.startsWith('image/')) {
                    url = `images/${req.file.filename}`
                } else {
                    url = `files/${req.file.filename}`
                }
                const result = await Files.create({ title, url });

                if (message_file) {
                    await Files.create({ photo_id: result.file_id, message_code: message_file })
                }
                res.status(201).json(result);
            }
        } catch (e) {
            console.log(e)
            res.status(500).json({
                error: "Добавление не было выполнено",
            });
            next(e);
        }
    }

    async deleteFile(req: Request, res: Response, next: NextFunction) {
        try {
            const fileNumber = req.params.number;
            const file = await Files.findByPk(fileNumber);
            if (!file) {
                res.status(404).json({
                    error: "Такого фото пока нет в базе",
                });
            } else {
                const filePath = path.join(__dirname, '../assets/', file.url);
                console.log(filePath)
                if (fs.existsSync(filePath)) {
                    fs.unlinkSync(filePath);
                }

                await file.destroy();
                res.json({ message: "Фото успешно удалено" });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                error: "Удаление не было выполнено(",
            });
            next(error);
        }
    }
}