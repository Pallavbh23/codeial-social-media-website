const express = require("express");
const router = express.Router();
const users = require("../controllers/users_controller");
router.get("/profile", users.profile);
router.get("/signin", users.signin);
router.get("/signup", users.signup);
router.post("/create", users.create);
module.exports = router;
