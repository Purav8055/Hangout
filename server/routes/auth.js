const { register, login, setAvatar, allUsers, sendRequest, getPending, decline, accept } = require("../controllers/userController");
const router = require("express").Router();

router.post('/register', register);
router.post('/login', login);
router.post('/setAvatar/:id', setAvatar);
router.get('/allUsers/:id', allUsers);
router.post('/sendRequest', sendRequest);
router.get('/getPending/:id', getPending);
router.post('/decline', decline);
router.post('/accept', accept);

module.exports = router;