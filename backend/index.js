import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectDb } from './config/db.js';
dotenv.config();
const app =express();
connectDb();
app.listen(5000,()=>{
    console.log("server running")
});

