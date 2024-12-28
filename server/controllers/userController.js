const bcrypt = require("bcrypt");
const User = require("../models/userModel");

module.exports.register = async (req, res, next) => {
    try {
      const { username, email, password } = req.body;
      const usernameCheck = await User.findOne({ username });
      if (usernameCheck)
        return res.json({ msg: "Username already used", status: false });
      const emailCheck = await User.findOne({ email });
      if (emailCheck)
        return res.json({ msg: "Email already used", status: false });
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        username,
        password: hashedPassword,
      });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };

  module.exports.login = async (req, res, next) => {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({ username });
      if (!user)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid)
        return res.json({ msg: "Incorrect Username or Password", status: false });
      delete user.password;
      return res.json({ status: true, user });
    } catch (ex) {
      next(ex);
    }
  };
  module.exports.setAvatar = async (req, res, next) => {
    try {
      const userid = req.params.id;
      const avatarImage = req.body.image;
      const user = await User.findByIdAndUpdate(userid, 
        {
          isAvatarImageSet: true,
          avatarImage
        },
        {new: true}
      );
      return res.json({
        isSet: user.isAvatarImageSet,
        image: user.avatarImage,
      });
    } catch (ex) {
      next(ex);
    }
  };

module.exports.allUsers = async(req, res, next) =>{
  try {
    const data = await User.findById(req.params.id);
    const users = data.friends;
    return res.json(users);
  } catch (ex) {
    next(ex);
  }
}
module.exports.sendRequest = async(req, res, next) =>{
  try {
    const {username, from, avatarImage, fromId} = req.body;
    const data = await User.find({username: username});
    if(data && data.length > 0)
    {
      await User.findOneAndUpdate(
        {username: data[0]?.username},
        { $addToSet: { pending: {name: from, pic: avatarImage, id: fromId} } },
      )
      return res.status(200).json({ message: "Friend request sent" });
    }
    return res.status(200).json({ message: "User not found" });
  } catch (ex) {
    next(ex);
  }
}
module.exports.getPending = async(req, res, next) =>{
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    return res.json({
      pending: user.pending
    });
  } catch (ex) {
    next(ex);
  }
}
module.exports.decline = async(req, res, next) =>{
  try {
    const {from, to} = req.body;
    const user = await User.findById(from);
    const pendingList = user.pending;
    let i = 0;
    for(; i < pendingList.length; i++)
    {
      if(pendingList[i].name===to)
      {
        break;
      }
    }
    pendingList.splice(i, 1);
    await User.findByIdAndUpdate(from, {
      pending: pendingList
    })
    res.json({
      pendingList
    })
  } catch (ex) {
    next(ex);
  }
}
module.exports.accept = async(req, res, next) =>{
  try {
    const {from, fromUsername, fromPic, to, toPic, toId} = req.body;
    const fromUser = await User.findByIdAndUpdate(from, {
      $addToSet: {friends: {username: to, avatarImage: toPic, id: toId}}
    },
    {new: true}
    );
    const friendsList = fromUser.friends;
    await User.findOneAndUpdate({username: to}, {
      $addToSet: {friends: {username: fromUsername, avatarImage: fromPic, id: from}}
    })
    const user = await User.findById(from);
    const pendingList = user.pending;
    let i = 0;
    for(; i < pendingList.length; i++)
    {
      if(pendingList[i].name===to)
      {
        break;
      }
    }
    pendingList.splice(i, 1);
    await User.findByIdAndUpdate(from, {
      pending: pendingList
    });
    res.json({
      friendsList,
      pendingList,
    })
  } catch (ex) {
    next(ex);
  }
}
