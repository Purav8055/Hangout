const Messages = require("../models/messageModel");

module.exports.addMsg = async (req, res, next)=>{
    try {
        const {from, to, message} = req.body;
        await Messages.create({
            message: {text: message},
            users: [from, to],
            sender: from,
        })
        return res.json("added data successfully");
    } catch (ex) {
        next(ex);
    }
}

module.exports.getMsg = async (req, res, next)=>{
    try {
        const {from, to} = req.body;
        const messages = await Messages.find({
            users: {
              $all: [from, to],
            },
          }).sort({ updatedAt: 1 });
        const response = messages.map((value, index)=>{
            return{
                fromSelf: value.sender.toString()===from,
                message: value.message.text,
            }
        })
        res.json(response);
    } catch (ex) {
        next(ex);
    }
}