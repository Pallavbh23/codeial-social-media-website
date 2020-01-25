const User = require("../models/user");
const express = require("express");
const app = express();

module.exports.profile = function(req, res) {
  return res.render("profile", {
    title: "Profile page"
  });
};

module.exports.signin = function(req, res) {
  return res.render("signin", { title: "signin" });
};
module.exports.signup = function(req, res) {
  return res.render("signup", { title: "Sign up" });
};
module.exports.create = function(req, res) {
  console.log(req.body);
  if (req.body.password != req.body.password1) {
    console.log("No");
    return res.redirect("back");
  }
  User.findOne({ username: req.body.username }, function(err, user) {
    if (err) {
      console.log("Error in finding the user in sigining up");
      console.log("No 1");
      return;
    }
    if (!user) {
      User.create(req.body, function(err) {
        if (err) {
          console.log("Error in finding the user in sigining up 1");
          console.log("No 2");
          return;
        }
        console.log("Yes");
        return res.redirect("/users/signin");
      });
    } else {
      console.log("No? User already exists");
      res.redirect("back");
    }
  });
};

module.exports.createSession = function(req, res) {
  console.log(req.body);

  return res.redirect("/users/profile"); // when passport js authenticates successfully, the control comes here.
};

module.exports.destroySession = function(req, res) {
  req.logout();
  return res.redirect("/");
};
