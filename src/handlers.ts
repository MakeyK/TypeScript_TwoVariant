import { Request } from "express"
import { JwtPayload } from "jsonwebtoken";

export interface AuthInfoRequest extends Request {
  user?: string | JwtPayload,
  body: any; // Укажите конкретный тип, если знаете структуру body
  headers: any;
  method: string;
}
