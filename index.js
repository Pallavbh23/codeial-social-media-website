// correct oreder
/*
cookieParser
session
passport.initialize
passport.session
app.router
*/

const express = require("express"); // express
const app = express(); // express app
const port = 8000; // setting the port
const expressLayouts = require("express-ejs-layouts"); // importing layouts
const cookieParser = require("cookie-parser"); // importing cookie parser
const sassMiddleware = require("node-sass-middleware"); // importing sass middleware

const db = require("./config/mongoose"); // using mongoose to connect to mongodb service
const session = require("express-session"); // for automatic encryption and storage of session cookie
const passport = require("passport"); // for using passport
const passportLocal = require("./config/passport-local-strategy"); // chosing the strategy which is actually configured in the config file
const MongoStore = require("connect-mongo")(session); // used to store session cookie in db
app.use(
  sassMiddleware({
    src: "./assets/scss",
    dest: "./assets/css",
    debug: true,
    outputStyle: "expanded",
    prefix: "/css"
  })
);
app.use(express.urlencoded()); // called first
app.use(cookieParser()); // using cookie parser to read/write cookies
app.use(expressLayouts); // using layouts (first use)
app.set("layout extractStyles", true); // allowing different styles in layouts
app.set("layout extractScripts", true); // allowing different scripts in layouts
app.use("/users", express.static("./assets")); // if you want to use assets in users route, have to double include. Not sure if they take more space but assets work temporarily for both routes
app.use(express.static("./assets")); // setting assets (second. Why not set assets before layouts)
app.use(
  session({
    // setting up the session cookie
    name: "codeial", // name of our cookie
    secret: "hi", // secret key so that are cookies are safely encrypted
    saveUninitialized: false, // if identity is not established, user has not logged in, do I want to save additional data?
    resave: false, // session data is present. If it is stored, do I want to rewrite it again? Do I want to remove and rewrite it again?
    cookie: {
      maxAge: 1000 * 60 * 100 // cookie expires after this time in ms
    },
    store: new MongoStore(
      {
        mongooseConnection: db,
        autoRemove: "disabled"
      },
      function(err) {
        console.log(
          err || "connect-mongo's mongo store connected successfully"
        );
      }
    )
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser); // automatically called middleware. If user is authenticated, it's going to store it in res.locals.user
app.use("/", require("./routes/")); // setting up the location of routes
app.set("view engine", "ejs"); // setting up the view engine
app.set("views", "./views"); // setting up the views folder

app.listen(port, function(err) {
  if (err) {
    console.log(`Error in running the server on port ${port}: ${err}`);
  }
  console.log(`Server is running on port: ${port}`);
});
