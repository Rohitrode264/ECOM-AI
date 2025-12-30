import { Router, type Response } from "express";
import { PrismaClient } from "../generated/prisma/client.js";
import { generateReply } from "../services/geminiService.js";
import { authenticateToken, type AuthRequest } from "../middleware/authMiddleware.js";

const router = Router();
const prisma = new PrismaClient();

router.post("/message", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { message, conversationId } = req.body;
        const userId = req.user?.userId;

        if (!message || !userId) {
            res.status(400).json({ error: "Message and User ID required" });
            return;
        }

        let conversation;
        if (conversationId) {
            conversation = await prisma.conversation.findUnique({
                where: { id: conversationId },
                include: { messages: { orderBy: { createdAt: "asc" } } },
            });

            if (conversation && conversation.userId !== userId) {
                res.status(403).json({ error: "Unauthorized access to this conversation" });
                return;
            }
        }

        if (!conversation) {
            conversation = await prisma.conversation.create({
                data: {
                    userId,
                    title: message.substring(0, 30) + "...",
                    summary: "",
                },
                include: { messages: true },
            });
        }

        await prisma.message.create({
            data: {
                content: message,
                role: "USER",
                conversationId: conversation.id,
            },
        });

        const historyForLlm = conversation.messages.map((msg: { role: string; content: string }) => ({
            role: msg.role === "USER" ? "user" : "model",
            parts: msg.content,
        })) as { role: "user" | "model"; parts: string }[];

        const aiResponseText = await generateReply(historyForLlm, message);

        const aiMessage = await prisma.message.create({
            data: {
                content: aiResponseText,
                role: "ASSISTANT",
                conversationId: conversation.id,
            },
        });

        res.json({
            reply: aiMessage.content,
            conversationId: conversation.id,
            sessionId: conversation.id,
        });
    } catch (error) {
        console.error("Chat Error:", error);
        res.status(500).json({ error: "Failed to process message" });
    }
});

router.get("/history/:conversationId", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const { conversationId } = req.params;
        const userId = req.user?.userId;

        if (!conversationId || !userId) {
            res.status(400).json({ error: "Invalid request parameters" });
            return;
        }

        const conversation = await prisma.conversation.findUnique({
            where: { id: conversationId },
            include: {
                messages: {
                    orderBy: { createdAt: "asc" },
                },
            },
        });

        if (!conversation) {
            res.status(404).json({ error: "Conversation not found" });
            return;
        }

        if (conversation.userId !== userId) {
            res.status(403).json({ error: "Unauthorized" });
            return;
        }

        res.json(conversation);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.get("/list", authenticateToken, async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        if (!userId) {
            res.status(401).json({ error: "User not authenticated" });
            return;
        }

        const conversations = await prisma.conversation.findMany({
            where: { userId },
            orderBy: { updatedAt: 'desc' },
            take: 20
        });
        res.json(conversations);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch conversations" });
    }
});

export default router;
