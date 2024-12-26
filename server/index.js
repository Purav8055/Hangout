const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/message");
const socket = require("socket.io");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.get("/ping", (_req, res) => {
    return res.json({ msg: "Ping Successful" });
  });

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("DB connection successful!");
}).catch((err)=>{
    console.log(err.message);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`listening on port ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  }
);

global.onlineUsers = new Map();
io.on("connection", (socket)=>{
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId, socket.id);
    });
    socket.on("send-msg", (data)=>{
        const receiveUserSocket = onlineUsers.get(data.to);
        if(receiveUserSocket)
        {
            socket.to(receiveUserSocket).emit("receive-msg", {
                from: data.from,
                msg: data.message,
            });
        }
    });
})