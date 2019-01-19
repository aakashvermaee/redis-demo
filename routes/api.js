const {
  Router
} = require("express");

// controllers
const {
  user
} = require("../controllers");

const apiRoutes = function (router, redisClient) {
  router = Router();

  // root
  router.get("/", (req, res) => res.send("Root API"));

  // POST: search user
  router.post("/user/search", (req, res) => {
    user.searchUser(req, res, redisClient);
  });

  // GET: Add User API
  router.get("/user/adduser", (req, res) => {
    user.addUserGet(req, res);
  });

  // POST: Add User API
  router.post("/user/adduser", (req, res) => {
    user.addUser(req, res, redisClient);
  });


  // POST: Delete User API
  router.post("/user/delete/", (req, res) => {
    user.deleteUser(req, res, redisClient);
  });

  // GET: Signup
  router.get("/user/signup", (req, res) => {
    user.signUpGet(req, res);
  });

  // POST: Signup
  router.post("/user/signup", (req, res) => {
    user.signUp(req, res, redisClient);
  });

  // GET: Login
  router.get("/user/login", (req, res) => {
    user.loginGet(req, res, redisClient);
  });

  // POST: Login
  router.post("/user/login", (req, res) => {
    user.login(req, res, redisClient);
  });

  return router;
}

module.exports = apiRoutes;