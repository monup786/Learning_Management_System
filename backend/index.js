import express from 'express';
import dotenv from 'dotenv'
dotenv.config();
import connectDB from './config/connectDB.js';
import cookieParser from 'cookie-parser';
import authRouter from './routes/authRoute.js';
import cors from 'cors';
import userRouter from './routes/userRoute.js';
import courseRouter from './routes/courseRoute.js';
import paymentRouter from './routes/paymentRoute.js';
import reviewRouter from './routes/reviewRoute.js';
const app=express();
const port=process.env.PORT;
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:"https://learning-management-system-1-0vos.onrender.com",
    credentials:true
}));

app.use("/api/auth",authRouter);
app.use("/api/user",userRouter);
app.use("/api/course",courseRouter)
app.use("/api/order",paymentRouter)
app.use("/api/review",reviewRouter)

app.listen(port,()=>{
    console.log(`server is listening to the port ${port}`);
    connectDB();
})
