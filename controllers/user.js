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

// GET: Signup
const signUpGet = (req, res) => {
  res.render("signup");
}

// POST: Signup
const signUp = (req, res, redisClient) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password
  } = req.body;

  const id = email;

  redisClient.hmset(id, [
    "first_name", firstName,
    "last_name", lastName,
    "email", email,
    "phone", phone,
    "password", password
  ], (err, reply) => {
    if (err) throw err;

    redisClient.hgetall(id, (err, obj) => {
      res.cookie("id", obj.email);
      res.redirect("/api/user/login");
    });
  });
}

// GET: User Login
const loginGet = (req, res, redisClient) => {
  console.log(req.cookies);
  const {
    id
  } = req.cookies;

  redisClient.hgetall(id, (err, obj) => {
    if (!obj) {
      res.render("login");
    } else {
      obj.id = id;
      res.render("login", {
        user: obj
      });
    }
  });
}

// GET: Signout
const signOutGet = (req, res, redisClient) => {
  const {
    id
  } = req.cookies;
  res.clearCookie("id");
  res.redirect("/");
}

// POST: User Login
const login = (req, res, redisClient) => {
  const {
    email
  } = req.body;

  redisClient.hgetall(email, (err, obj) => {
    if (!obj) {
      res.render("Signup");
    } else {
      obj.id = email;
      obj.session = true;
      res.cookie("id", obj.id, {
        "maxAge": (new Date().getTime() * 24 * 60 * 60 * 1000).toString()
      });
      res.render("login", {
        user: obj
      });
    }
  });
}

module.exports = {
  addUser,
  addUserGet,
  deleteUser,
  searchUser,
  login,
  loginGet,
  signUp,
  signUpGet,
  signOutGet
}