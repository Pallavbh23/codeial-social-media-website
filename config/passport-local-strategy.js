const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const User = require("../models/user");
passport.use(
  new localStrategy(
    {
      usernameField: "username"
    },
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          console.log("Error in finding user!");
          return done(err);
        }
        if (!user || user.password != password) {
          // console.log(user, user.password, password);
          console.log("Invalid username/password");
          return done(null, false);
        }
        return done(null, user);
      });
    }
  )
);
// serializing and deserializing

// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
// deserializing the user from the key in the cookies
passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    if (err) {
      console.log("Error in finding user!");
      return done(err);
    }
    return done(null, user);
  });
});

// check if the user is authenticated
passport.checkAuthentication = function(req, res, next) {
  if (req.isAuthenticated()) {
    // if the user is signed in, pass the request to next function
    return next();
  }
  return res.redirect("/users/signin"); // if not signed in, redirect to signin page
};
passport.setAuthenticatedUser = function(req, res, next) {
  if (req.isAuthenticated()) {
    res.locals.user = req.user; // gives the current signed in user from req.user to res.locals.user so now it's saved in res. We're sending it to locals for the views
  }
  next();
};
passport.restrictSignInAccess = function(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/users/profile");
  }
  next();
};
module.exports = passport;
