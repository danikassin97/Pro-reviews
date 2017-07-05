// we are configuring passport in a separate file to avoid making a mess in app.js

const passport = require("passport");
const bcrypt = require("bcrypt");

const UserModel = require("../models/user-model.js");

// serializeUser (controls what goes inside the bowl)
// - save only the id in the bowl
// - happens when you login

passport.serializeUser((userFromDb, next) => {
  next(null, userFromDb._id);
  // null in first argument means no error
});

// deserializeUser (controls what you get when you check the bowl)
// - use the id in the bowl to retrieve the users information
// - happens every time you visit the site after logging in

passport.deserializeUser((idFromBowl, next) => {
  UserModel.findById(
    idFromBowl,

    (err, userFromDb) => {
      if (err) {
        next(err);
        return;
      }

      next(null, userFromDb);
    }
  );
});

// STRATEGIES------------------------------------------------------

// the different ways we can log into our app
// setup passport-local

//passport-local(login with username and password form)
const LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
  {                       // first argument: settings object
    usernameField: "loginUsername",
    passwordField: "loginPassword"
  },

  //these two below come from the form
  (formUsername, formPassword, next) => {       // second argument: callback
                          // will be called when user tries to login
    //#1 is there an account with the provided username?
    UserModel.findOne(
      {username: formUsername},
      (err, userFromDb) => {
        console.log("we finding shit");
        if (err) {
          next(err);
          return;
        }

        // if the username doesnt exist, the userFromDb variable will be empty

            // check if userFromDb is empty
            if (userFromDb === null) {
              // in passport, if you call the next() with false in second spot, that means login failed
              next(null, false);
              return;
            }
    // #2 if there is a user with that username, is the password correct?
      if (bcrypt.compareSync(formPassword, userFromDb.encryptedPassword) === false) {
          console.log(' got there 3');
        // In passport, if you call next() with false in second position, that means login failed
        next(null, false);
        return;

    }

    // if we pass those if statements, LOGIN SUCCESS
    console.log('SUCCESS IS TRUEo ');

    next(null, userFromDb);
    return;
      }
    );

  })
);

// STRATEGIES--------------------------------------------------


// passport-facebook (log in with your facebook account)

const FbStrategy = require("passport-facebook").Strategy;

passport.use(new FbStrategy(
  {           // first argument is settings object
    clientID: process.env.myFacebookClientId,
    clientSecret: process.env.myFacebookClientSecret,
    callbackURL: "/auth/facebook/callback"
  },



  (accessToken, refreshToken, profile, next) => {     // second argument is callback

            // will be called when a user allows us to log them in with facebook
          console.log("");
          console.log("-------- FACEBOOK PROFILE INFO ---------");
          console.log(profile);
          console.log("");

          UserModel.findOne(
            { facebookId: profile.id },

            (err, userFromDb) => {
                // userFromDb will be empty if this is the first time the user logs in with fb

                //check if they have logged in before
                if (userFromDb) {
                // if they have. just log them in
                  next(null, userFromDb);
                  return;
                }

                // if its the first time they log in, save them in the db
                const theUser = new UserModel({
                  fullName: profile.displayName,
                  facebookId: profile.id
                });

                theUser.save((err) => {
                  if (err) {
                    next(err);
                    return;
                  }

                  // now that they are saved, log them in
                  next(null, theUser);
                });
            }
          );

          // receiving the facebook user info and SAVING IT

        //UNLESS we have already saved their info, in which case we log them in

  }
));



// passport-google-oauth (log in with your google account)

const GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

passport.use(new GoogleStrategy(
  {           // first argument is settings object
    clientID: process.env.myGoogleClientId,
    clientSecret: process.env.myGoogleClientSecret,
    callbackURL: "/auth/google/callback"
  },


  (accessToken, refreshToken, profile, next) => {     // second argument is callback

            // will be called when a user allows us to log them in with google
          console.log("");
          console.log("-------- GOOGLE PROFILE INFO ---------");
          console.log(profile);
          console.log("");

          UserModel.findOne(
            { googleId: profile.id },

            (err, userFromDb) => {
                // userFromDb will be empty if this is the first time the user logs in with fb

                //check if they have logged in before
                if (userFromDb) {
                // if they have. just log them in
                  next(null, userFromDb);
                  return;
                }

                // if its the first time they log in, save them in the db
                const theUser = new UserModel({
                  fullName: profile.displayName,
                  googleId: profile.id
                });

                if (theUser.fullName === undefined) {
                  theUser.fullName = profile.emails[0].value;
                }

                theUser.save((err) => {
                  if (err) {
                    next(err);
                    return;
                  }

                  // now that they are saved, log them in
                  next(null, theUser);
                });
            }
          );

          // receiving the facebook user info and SAVING IT

        //UNLESS we have already saved their info, in which case we log them in

  }
));
