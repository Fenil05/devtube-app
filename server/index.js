import express from "express"
import mongoose from "mongoose";
import dotenv from "dotenv"
import userRoutes from "./routes/users.js"
import commentRoutes from "./routes/comments.js"
import videoRoutes from "./routes/videos.js"
import authRoutes from "./routes/auth.js"

const app = express()
dotenv.config()
app.use(express.json())

const connect = async()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("Connected to MongoDB!");
    } catch (err) {
        console.log(err);
    }
}

app.use("/api/users",userRoutes)
app.use("/api/videos",videoRoutes)
app.use("/api/comments",commentRoutes)
app.use("/api/auth",authRoutes)

app.use((err,req,res,next)=>{
    const status = err.status || 500
    const message = err.message || "Something went wrong!"
    return res.status(status).send({
        success:false,
        status,
        message
    })
})

app.listen(8000,()=>{
    connect()
    console.log("Backend server is running!");
})