const User = require("../models/user");
module.exports.profile = function(req, res) {
  return res.end("<h1>Hello world!</h1>");
};

module.exports.signin = function(req, res) {
  return res.render("signin", { title: "signin" });
};
module.exports.signup = function(req, res) {
  return res.render("signup", { title: "Sign up" });
};
module.exports.create = function(req, res) {
  if (req.body.password != req.body.password1) {
    return res.redirect("back");
  }
  User.findOne({ email: req.body.email }, function(err, user) {
    if (err) {
      console.log("Error in finding the user in sigining up");
      return;
    }
    if (!user) {
      User.create(req.body, function(err) {
        if (err) {
          console.log("Error in finding the user in sigining up 1");
          return;
        }
        return res.redirect("/users/signin");
      });
    } else {
      res.redirect("back");
    }
  });
};
