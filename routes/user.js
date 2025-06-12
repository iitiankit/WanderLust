const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectURL } = require("../middleware.js");
const userController = require("../controllers/user.js");

// Signup
router
  .route("/signup")
  .get(userController.renderSignupForm)
  .post(userController.signup);

// Login
router
  .route("/login")
  .get(userController.renderLoginForm)
  .post(
    saveRedirectURL,
    passport.authenticate("local", {
      failureRedirect: "/login",
      failureFlash: true,
    }),
    userController.login
  );

// Logout
router.get("/logout", userController.logout);

module.exports = router;
