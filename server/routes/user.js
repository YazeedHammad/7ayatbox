const express = require("express");
const router = express.Router();
const user = require("../../DataBase/user");
const passport = require("passport");

router.use(function(res, req, next) {
  next();
});
//handling user signup route
router.route("/signup").post(function(req, res) {
  var body = req.body;
  var email = body.email;
  var password = body.password;
  var name = body.name;
  user.checkUser(email, function(result) {
    if (result.length > 0) {
      res.status(500).send("Username already exists");
    } else {
      user.addUser(name, email, password, function(err, userId) {
        if (err) {
          console.log("errr", err);
          res.status(500).send("db error");
        } else {
          res.send({ id: userId, name: name });
        }
      });
    }
  });
});

// router.post("/login", passport.authenticate("local"), function(req, res) {
//   // If this function gets called, authentication was successful.
//   // `req.user` contains the authenticated user.
//   console.log("hiiiiiii", req.body);
//   res.redirect("/");
// });
// router.post("/login", function(req, res, next) {
//   console.log("yoooooooooo", req.body);
//   passport.authenticate("local", {
//     failureRedirect: "/login",
//     successRedirect: "/reservation"
//   })(req, res, next);
// });
router.route("/logout").get(function(req, res) {
  req.logOut();
});
//handling user login route
router.route("/login").post(function(req, res) {
  user.checkPassword(req.body.email, req.body.password, function(
    isMatched,
    user,
    err
  ) {
    if (isMatched) {
      res.send({ id: user.id, name: user.name });
    } else {
      res.status(500).send("login error");
    }
  });
});

module.exports = router;
