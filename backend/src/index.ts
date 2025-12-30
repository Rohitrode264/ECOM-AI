import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/chat", chatRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "Jay Shree Ganesh",
        status: "Health check OK",
        service: "AI Chatbot Backend"
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
