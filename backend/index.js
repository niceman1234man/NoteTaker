import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
import { router } from './router/note.router.js';
import { userRouter } from './router/user.router.js';
dotenv.config();
const app =express();
app.use(express.json());
app.use(cors({
    origin:"*"
}));
app.use('/user/',userRouter);
app.use('/note/',router);
connectDb();

app.listen(5000,()=>{
    console.log("server running")
});

