// POST: search user
const searchUser = (req, res, redisClient) => {
  let {
    id
  } = req.body;

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
}

// GET: Add user
const addUserGet = (req, res) => {
  res.render("adduser");
}

// POST: Add user
const addUser = (req, res, redisClient) => {
  const {
    id,
    firstName,
    lastName,
    email,
    phone
  } = req.body;

  redisClient.hmset(id, [
    "first_name", firstName,
    "last_name", lastName,
    "email", email,
    "phone", phone
  ], (err, reply) => {
    if (err) throw err;
    res.redirect("/");
  });
}

// POST: Delete user
const deleteUser = (req, res, redisClient) => {
  const {
    id
  } = req.params;

  redisClient.del(id, (err, reply) => {
    if (err) throw err;
    res.redirect("/");
  });
}

module.exports = {
  addUser,
  addUserGet,
  deleteUser,
  searchUser,
}