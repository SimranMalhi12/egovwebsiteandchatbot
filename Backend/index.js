import express from "express";
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import chatbotRoutes from './routes/chatbot.routes.js';
import authRoutes from './routes/auth.routes.js'
import chatHistoryRoutes from './routes/chatHistory.routes.js';


const app = express()

dotenv.config()

const port = process.env.PORT || 3000
//middlewares
app.use(express.json());
app.use(cors({
    origin: process.env.FRONTEND_URL || "https://egovwebsiteandchatbot-9hh1.vercel.app/",
    credentials: true
}))

// Routes
app.use('/api/auth', authRoutes); //Register && login
app.use("/api/chats", chatHistoryRoutes);  //chat history
app.use('/bot/v1/', chatbotRoutes); // // Chatbot Messages


//Database Connection code
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("Connected to mongoDB")
    }).catch((error) => {
        console.log("Error connecting to MongoDB:", error)
    })



app.get('/', (req, res) => {
    res.end("Hello World!")
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})
