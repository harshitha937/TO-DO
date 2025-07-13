const express= require("express");
const cors= require('cors');
const mongoose =require('mongoose');
const path =require("path");
const cookieParser = require("cookie-parser");
const authRoutes= require("./routes/authRoutes.js");
const todoRoutes= require('./routes/todoRoutes.js')

require ('dotenv').config();
const connectDB= require('./config/db.js');

connectDB();

const PORT= process.env.PORT || 5000; 

const app=express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

app.use('/api',authRoutes);
app.use('/api/todo',todoRoutes);


app.listen(PORT,()=>{
    console.log (`Server is listening at ${PORT}.`);
});