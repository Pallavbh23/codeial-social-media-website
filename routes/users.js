const express = require("express");
const router = express.Router();
const path = require("path");
const passport = require("passport");
const users = require("../controllers/users_controller");
router.get("/profile", passport.checkAuthentication, users.profile);
router.get("/signin", passport.restrictSignInAccess, users.signin);
router.get("/signup", passport.restrictSignInAccess, users.signup);
router.get("/signout", users.destroySession);
router.post("/create", users.create);
// express().use("/users", express.static("../assets"));
// using passport as a middleware to authenticate below
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/users/signin" }), // if authentication is done, it returns the user
  users.createSession
);
module.exports = router;
