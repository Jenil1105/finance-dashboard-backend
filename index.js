require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const { authenticateUser } = require("./middlewares/authenticateUser");
const { checkRoleAccess } = require("./middlewares/checkRoleAccess");

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRouter);

//only admin can access the all users
app.use('/api/user', authenticateUser, checkRoleAccess('admin'), userRouter);

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
