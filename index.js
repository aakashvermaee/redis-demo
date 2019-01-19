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
const cookieParser = require('cookie-parser');

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

// cookie-parser
app.use(cookieParser());

// methodOverride
app.use(methodOverride("_method"));

// View Engine
app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// Root
app.get("/", (req, res, next) => {
  const { id } = req.cookies;
  id
  ? res.redirect("/api/user/login")
  : res.render("searchusers");
});

// router
const routes = require("./routes/");
app.use(routes.apiBaseUri, routes.api(app, redisClient));

// bind
app.listen(port, () => console.log(`Listening on Port: ${port}`));