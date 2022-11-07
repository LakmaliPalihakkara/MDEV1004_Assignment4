const passport = require("passport");
const express = require("express");
var router = express.Router();
const apiCallFromNode = require("./NodeJsCall");

router.get("/", function (req, res) {
  res.render("pages/login.ejs");
});

router.get("/profile", isLoggedIn, function (req, res) {
  apiCallFromNode.callApi(function (response) {
    res.render("pages/profile.ejs", {
      user: req.user,
      groups: response,
    });
  });
});

router.get("/error", isLoggedIn, function (req, res) {
  res.render("pages/error.ejs");
});

router.get(
  "/auth/facebook",
  passport.authenticate("facebook", {
    scope: ["public_profile", "email"],
  })
);

router.get(
  "/auth/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/profile",
    failureRedirect: "/error",
  })
);

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/");
}

module.exports = router;
