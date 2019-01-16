const { Router } = require("express");

const apiRoutes = function(router, redisClient) {
  router = Router();

  // root
  router.get("/", (req, res) => res.send("Root API"));

  // POST: search user
  router.post("/user/search", (req, res) => {
    let { id } = req.body;
    
    redisClient.hgetall(id, (err, obj) => {
      if (!obj) {
        res.render("searchusers", {
          error: "User does not exist"
        });
      } else {
        obj.id = id;
        res.render('details', {
          user: obj
        });
      }
    });
  });

  // POST: add user api
  router.post("/user/add", (req, res) => {
    res.send("Add User");
  });

  return router;
}

module.exports = apiRoutes;