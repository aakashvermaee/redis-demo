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
        res.render("details", {
          user: obj
        });
      }
    });
  });

  // GET: Add User API
  router.get("/user/adduser", (req, res) => {
    res.render("adduser");
  });

  // POST: Add User API
  router.post("/user/adduser", (req, res) => {
    const { id, firstName, lastName, email, phone } = req.body;
    console.log(id, firstName, lastName, email, phone);

    redisClient.hmset(id, [
      "first_name", firstName,
      "last_name", lastName,
      "email", email,
      "phone", phone
    ], (err, reply) => {
      if (err) throw err;
      console.log(reply);
      res.redirect("/");
    })
  });


  // POST: Delete User API
  router.post("/user/delete/:id", (req, res) => {
    const { id } = req.params;
    console.log(id);

    redisClient.del(id, (err, reply) => {
      if (err) throw err;
      res.redirect("/");
    });
  });

  return router;
}

module.exports = apiRoutes;