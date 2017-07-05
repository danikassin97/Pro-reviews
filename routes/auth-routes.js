const express = require("express");
const bcrypt = require("bcrypt");

const passport = require("passport");

const UserModel = require("../models/user-model.js");

const router = express.Router();


router.get("/signup", (req, res, next) => {
  res.render("auth-views/signup-view.ejs");
});

router.post("/signup", (req, res, next) => {

// if username or password is empty

  if (req.body.signupUsername === "" || req.body.signupPassword === "") {
    res.locals.messageForDumbUsers = "please provide both username and password";

    //display error

    res.render("auth-views/signup-view.ejs");
    return;
  }

//check to see if username is taken

  UserModel.findOne(
    { username: req.body.signupUsername},

    (err, userFromDb) => {

      if (err) {
        next(err);
        return;
      }

      if (userFromDb) {

// if it's taken display an error to the user

        res.locals.messageForDumbUsers = "sorry but that username is taken";
        res.render("auth-views/signup-view.ejs");
        return;
      }
      const salt = bcrypt.genSaltSync(10);
      const scrambledPassword = bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({
        fullName: req.body.signupFullName,
        username: req.body.signupUsername,
        encryptedPassword: scrambledPassword
      });

      theUser.save((err) => {
        if (err) {
          next(err);
          return;
        }
        res.redirect("/");
      });
    }
  );
});
// END REGISTRATION



// LOGIN

router.get("/login", (req, res, next) => {
  res.render("auth-views/login-view.ejs");
});




router.post("/login",
  passport.authenticate(
    "local",       // first argument is name of the strategy (determined by strategy's npm package)
{           // second argument is settings object
  successRedirect: "/",
  failureRedirect: "/login"
}
)
);

// END LOGIN

router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
});


// SOCIAL LOGINS --------------------------
                                            // determined by the strategy's npm package
                                            //
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback",
  passport.authenticate(
    "facebook",
    {
      successRedirect: "/special",
      failureRedirect: "/login"
    }
  )
);


router.get("/auth/google",
  passport.authenticate(
    "google",
    {
      scope:["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
    }
  )
);
router.get("/auth/google/callback",
  passport.authenticate(
    "google",
    {
      successRedirect: "/special",
      failureRedirect: "/login"
    }
  )
);


// END SOCIAL LOGINS ----------------------



module.exports = router;
