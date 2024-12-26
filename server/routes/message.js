const {addMsg, getMsg} = require("../controllers/messageController");
const router = require("express").Router();

router.post("/addMsg", addMsg);
router.post("/getMsg", getMsg);

module.exports = router;