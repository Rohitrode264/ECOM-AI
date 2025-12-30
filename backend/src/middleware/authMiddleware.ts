import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "supersecretkey";

export interface AuthRequest extends Request {
    user?: { userId: string; email: string };
}

export const authenticateToken = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
): void => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) {
            res.sendStatus(403);
            return;
        }
        req.user = user as { userId: string; email: string };
        next();
    });
};
