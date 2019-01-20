const port = process.env.PORT || 4000;

// core modules
const path = require("path");

// dependencies
const express = require("express");
const exphbs = require("express-handlebars");
const {
  json,
  urlencoded
} = require("body-parser");
const methodOverride = require("method-override");
const redis = require("redis");
const session = require("express-session");

// app
const app = express();

// redis-client
const redisClient = redis.createClient();
redisClient.on("connect", () => console.log("Connected to Redis..."));

// app-level middlewares
// body-parser
app.use(json());
app.use(urlencoded({
  extended: false
}));

// session
app.use(session({
  secret: "sescret",
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: (new Date().getTime() * 24 * 60 * 60 * 1000).toString(),
    secure: true
  }
}))

// methodOverride
app.use(methodOverride("_method"));

// View Engine
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Root
app.get("/", (req, res, next) => {
  res.render("home");
});

// router
const routes = require("./routes/");
app.use(routes.apiBaseUri, routes.api(app, redisClient));

// bind
app.listen(port, () => console.log(`Listening on Port: ${port}`));