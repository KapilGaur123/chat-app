import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose";
import cors from "cors"
import cookieParser from "cookie-parser"

//import the routes
import UserRouter from "./routes/userRoute.js"
import messageRouter from "./routes/messageRoute.js"

dotenv.config(); // load the variable from .env
const app = express()

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}))
app.use(cookieParser())
//middlewares for encoding url`s
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 8000;
const URI = process.env.MONGODB_URI;


mongoose.connect(URI)
.then(()=> console.log("connected to mongodb"))
.catch((err) => console.log("Desconnect to database",err))

app.use("/user", UserRouter)
app.use("/message", messageRouter)

app.listen(port, () => {
  console.log(`server start on port ${port}`)
})