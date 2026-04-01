require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
    .then(()=>{
        console.log("mongo connected..."),
        app.listen(PORT, ()=>{
            console.log(`server started.. ${PORT}`);
        })
    })
    .catch((e)=>{
        console.log("mongo connection failed");
    })
