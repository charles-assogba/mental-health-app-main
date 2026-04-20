import { server } from "./config/expressClient.js";
import threadRouter from "@/routes/thread.routes.js";
import todosRouter from "@/routes/todos.routes.js";
import geminiAiRouter from "@/routes/gemini-ai.routes.js";
import userRouter from "@/routes/user.routes.js";
import threadCommentRouter from "@/routes/thread-comment.routes.js";
import aiConversationRouter from "@/routes/ai-conversation.routes.js";
import threadCommentReplyRouter from "@/routes/thread-comment-reply.routes.js";
import aiChatRouter from "@/routes/ai-chat.routes.js";
import authRouter from "@/routes/auth.routes.js";
import cors from "cors";
import * as env from "dotenv";

// config
env.config();

const corsOptions = {
    origin:
        process.env.APP_STATE === "production"
            ? process.env.FRONTEND_BASE_URL
            : "*",
};

server.use(cors(corsOptions));

// route definitions
server.use("/user", userRouter);
server.use("/gemini-ai", geminiAiRouter);
server.use("/thread", threadRouter);
server.use("/todos", todosRouter);
server.use("/thread-comment", threadCommentRouter);
server.use("/thread-comment-reply", threadCommentReplyRouter);
server.use("/ai-conversation", aiConversationRouter);
server.use("/ai-chat", aiChatRouter);
server.use("/auth", authRouter);

server.get("/", async (req, res) => {
    res.status(200).json({
        msg: "API sehat",
        toyota: "🚗 👍",
    });
});

server.use((req, res) => {
    res.status(404).status(404).json({
        msg: "Route tidak ditemukan",
        route: req.url,
    });
});

// start
server.listen(process.env.SERVER_PORT, () => {
    console.log(`Server siap di port ${process.env.SERVER_PORT}!`);
});

export default server;
