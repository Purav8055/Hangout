const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connection successful!");
}).catch((err)=>{
    console.log(err.message);
});

app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
})