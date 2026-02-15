const {Router} = require("express");
const validatePoll = require("../middlewares/polls.middleware");
const { createPoll } = require("../controllers/polls.controller");
const { getPoll } = require("../controllers/polls.controller");
const {verifyToken} = require("../middlewares/verifyToken.middleware");

const router = Router();

router.post('/create',verifyToken,validatePoll,createPoll);

router.get('/:shareId',getPoll);
// router.get('/poll/my',getmyPoll);

module.exports = router;