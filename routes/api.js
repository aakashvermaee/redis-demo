const { Router } = require("express");

// controllers
const { user } = require("../controllers");

const apiRoutes = function(router, redisClient) {
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
  router.post("/user/delete/:id", (req, res) => {
    user.deleteUser(req, res, redisClient);
  });

  return router;
}

module.exports = apiRoutes;