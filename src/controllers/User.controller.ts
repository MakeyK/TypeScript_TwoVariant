import { Request, Response, NextFunction } from "express";
import User from "../database/models/User.model";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const secret_key = process.env.SECRET_KEY || 'Secret_Key';
const generateJWT = (login: string) => {
    return jwt.sign({ login }, secret_key, { expiresIn: '7d' })
}

export class UserController {
    async login(req: Request, res: Response, next: NextFunction) {
        try {
            const { user_id, password } = req.body;
            const user = await User.findOne({ where: { user_id } });
            if (!user) {
                res.status(500).json({
                    error: "Введён некорректный логин"
                });
            } else {
                let userPass = bcrypt.compareSync(password, user.password)
                if (!userPass) {
                    res.status(500).json({
                        error: "Введён некорректный пароль"
                    });
                }
                const token = generateJWT(user.user_id);
                res.json({ token });
            }
        } catch (e) {
            console.log(e);
            res.status(401).json({
                error: "Авторизация пользователя не была выполнена",
            });
            next(e);
        };
    }

    async registration(req: Request, res: Response, next: NextFunction) {
        try {
            const { user_id, password, full_name, job_title } = req.body;
            console.log(user_id)
            const user = await User.findOne({ where: { user_id }, attributes: ['user_id'] });
            console.log(user);
            if (user) {
                res.status(500).json({
                    error: "Пользователь уже существует"
                });
            }
            const hashPassword = await bcrypt.hash(password, 5);
            const created = await User.create({ user_id, password: hashPassword, full_name, job_title });
            const token = generateJWT(created.user_id);
            console.log(token)
            res.json({ token });
        } catch (e) {
            console.log(e);
            res.status(401).json({
                error: "Регистрация пользователя не была выполнена",
            });
            next(e);
        };
    }

    async update(req: Request, res: Response, next: NextFunction) {
        try {
            const user_id = req.params;
            const { password, full_name, job_title } = req.body;
            const user = await User.findOne({ where: { user_id } });
            if (user) {
                await User.update({ password, full_name, job_title }, { where: { user_id } });
                res.sendStatus(200);
            } else {
                res.status(500).json({
                    error: "Пользователь не найден"
                });
            }
        } catch (e) {
            console.log(e);
            res.status(500).json({
                error: "Изменение пользователя не было выполнено",
            });
            next(e);
        }
    };

    async logout(req: Request, res: Response, next: NextFunction) {
        try {
            await (<any>req).logout();
            res.status(200);
        } catch (err) {
            console.error('Error logging out:', err);
            res.status(400).json({
                error: "Ошибка выхода",
            });
            next(err);
        }
    };
}