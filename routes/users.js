const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  //IF YOU add query param in to it
  console.log(req.query.name);
  res.render("users/index");
});

router.get("/new", (req, res) => {
  res.render("users/new", { firstName: "Test" });
});

router.post("/", (req, res) => {
  const firstName = req.body.firstName;
  const isValidName = firstName.length > 0;

  if (isValidName) {
    users.push({ name: firstName });
    res.redirect(`/users/${users.length - 1}`);
    // res.send(`Hi ${req.body.firstName}`);
  } else {
    res.render("users/new", { firstName: firstName });
  }
});

// NOTE: DYNAMIC ROUTER MUST BE BELOW YOUR STATIC ROUTER
// HTTP Methods can stack
router
  .route("/:id")
  .get((req, res) => {
    console.log(req.user);
    const id = req.params.id;
    console.log(users);
    res.send(`Get User by id ${id} Name: ${req.user.name}`);
  })
  .put((req, res) => {
    const id = req.params.id;
    res.send(`Update User by id ${id}`);
  })
  .delete((req, res) => {
    const id = req.params.id;
    res.send(`Delete User by id ${id}`);
  });

// HTTP Methods but not stack
// router.get("/:id", (req, res) => {
//   id = req.params.id;
//   res.send(`Get User by id ${id}`);
// });

// router.put("/:id", (req, res) => {
//   id = req.params.id;
//   res.send(`Update User by id ${id}`);
// });

// router.delete("/:id", (req, res) => {
//   id = req.params.id;
//   res.send(`Delete User by id ${id}`);
// });

// Middleware function that will be executed when the "id" parameter is present in the router
const users = [{ name: "Kyle" }, { name: "Sally" }];
router.param("id", (req, res, next, id) => {
  req.user = users[id];
  console.log("Authorize for userID: ", id);
  next();
});

module.exports = router;
