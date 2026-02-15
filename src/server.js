const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("../routes/auth.routes");
const pollRoutes = require("../routes/polls.routes");
const voteRoutes = require("../routes/votes.routes");

require('dotenv').config();
const port = process.env.PORT;
const app = express();

app.use(express.json({limit:"16kb"}));
app.use(express.urlencoded({extended:true,limit:"16kb"}));

app.use('/api/v1/users',userRoutes);
app.use('/api/v1/poll',pollRoutes);
app.use('/api/v1/vote',voteRoutes);

// database connection
mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(()=>{
        console.log("Database connected");

        app.listen(port,()=>{
            console.log(`${port} is listening`);
        });
    })
    .catch((err)=>{
        console.log("Rejected: Database not able to connect");
    });