import { Router, type Request, type Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { PrismaClient } from "../generated/prisma/client.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const router = Router();
const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

const generateOtp = () => Math.floor(100000 + Math.random() * 900000).toString();

const transporter = nodemailer.createTransport({
    service: "gmail", 
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    }, 
});

const sendOtpEmail = async (email: string, otp: string, type: "SIGNUP" | "FORGOT_PASSWORD") => {
    if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
        console.log(`[DEV MODE] OTP for ${email} (${type}): ${otp}`);
        return;
    }

    await transporter.sendMail({
        from: process.env.SMTP_USER,
        to: email,
        subject: `Your ${type === "SIGNUP" ? "Signup" : "Password Reset"} OTP`,
        text: `Your OTP is: ${otp}. It expires in 10 minutes.`,
    });
};


router.post("/signup-request", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: "Email is required" });
            return;
        }

        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: "User already exists" });
            return;
        }

        const otpCode = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); 

        await prisma.otp.create({
            data: {
                email,
                code: otpCode,
                type: "SIGNUP",
                expiresAt,
            },
        });

        await sendOtpEmail(email, otpCode, "SIGNUP");
        res.json({ message: "OTP sent to email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/signup-verify", async (req: Request, res: Response) => {
    try {
        const { email, otp, password, name } = req.body;
        if (!email || !otp || !password) {
            res.status(400).json({ error: "Missing fields" });
            return;
        }

        const validOtp = await prisma.otp.findFirst({
            where: {
                email,
                code: otp,
                type: "SIGNUP",
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!validOtp) {
            res.status(400).json({ error: "Invalid or expired OTP" });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                email,
                password: hashedPassword,
                name,
            },
        });

        await prisma.otp.update({
            where: { id: validOtp.id },
            data: { used: true },
        });

        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/login", async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: "Missing credentials" });
            return
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({ error: "Invalid credentials" });
            return;
        }

        if (!JWT_SECRET) {
            console.error("JWT_SECRET is not defined");
            res.status(500).json({ error: "Internal server error" });
            return;
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, JWT_SECRET, {
            expiresIn: "7d",
        });

        res.json({ token, user: { id: user.id, email: user.email, name: user.name } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/forgot-password-request", async (req: Request, res: Response) => {
    try {
        const { email } = req.body;
        if (!email) {
            res.status(400).json({ error: "Email is required" });
            return;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            res.status(404).json({ error: "User not found" });
            return;
        }

        const otpCode = generateOtp();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000);

        await prisma.otp.create({
            data: {
                email,
                code: otpCode,
                type: "FORGOT_PASSWORD",
                expiresAt,
            },
        });

        await sendOtpEmail(email, otpCode, "FORGOT_PASSWORD");
        res.json({ message: "Password reset OTP sent to email" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/forgot-password-verify", async (req: Request, res: Response) => {
    try {
        const { email, otp, newPassword } = req.body;
        if (!email || !otp || !newPassword) {
            res.status(400).json({ error: "Missing fields" });
            return;
        }

        const validOtp = await prisma.otp.findFirst({
            where: {
                email,
                code: otp,
                type: "FORGOT_PASSWORD",
                used: false,
                expiresAt: { gt: new Date() },
            },
        });

        if (!validOtp) {
            res.status(400).json({ error: "Invalid or expired OTP" });
            return;
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { email },
            data: { password: hashedPassword },
        });

        await prisma.otp.update({
            where: { id: validOtp.id },
            data: { used: true },
        });

        res.json({ message: "Password reset successful" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

export default router;
