const {Router} = require("express");
const { vote } = require("../controllers/votes.controller");
const {verifyToken} = require("../middlewares/verifyToken.middleware");

const router = Router();

router.post("/",verifyToken,vote);

module.exports = router;