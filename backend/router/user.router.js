import express from 'express'
import { createAccount,getUser,login } from '../controller/user.controller.js';

export const userRouter=express.Router();
userRouter.post('/create-account',createAccount);
userRouter.post('/login',login);
userRouter.get('/get-user',getUser);