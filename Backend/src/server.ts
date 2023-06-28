import dotenv from 'dotenv';

dotenv.config();


import express from "express";
import cors from "cors";

import foodRouter from "./routers/food.router";
import userRouter from "./routers/user.router";

import { dbConnect } from './configs/database.config';

dbConnect();  //connect with database

const bodyParser = require('body-parser').json();

const app=express();

app.use(bodyParser)
app.use(express.json())
app.use(cors({
    credentials:true,
    origin:["http://localhost:4200"]
}));

app.use("/api/foods" , foodRouter); //apis in food router
app.use("/api/users",userRouter); // apis in user router

const port = process.env.port || 5000;
app.listen(port,()=>{
    console.log(`Website is Running on http://localhost:${port}`)
})