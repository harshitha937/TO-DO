const mongoose = require("mongoose");
 require('dotenv').config();

 const DB_URI = process.env.DB_URI || 'mongodb://127.0.0.1:27017/todo';

const connectDB =async ()=>{
    try{    
        await mongoose.connect(DB_URI);
        console.log("Successfully connected to DB :)");

    }
    catch(error){
        console.log(`ERROR : ${error.message}`);
        process.exit(1);
    }

}

module.exports= connectDB;