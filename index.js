require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

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
