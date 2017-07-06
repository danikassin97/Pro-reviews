const express = require('express');
// const reviewModel = require("../models/restaurant-review-model.js");
const RestaurantModel = require("../models/restaurants-model.js");

const UserModel = require("../models/user-model.js");

const router  = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.get("/", (req, res, next) => {

  RestaurantModel.find(
    {},
    (err, restaurantResults) => {
      if (err) {
        next(err);
        return;
      }


      console.log(res.locals.restaurants);

      if (req.user) {
        UserModel.findById(
            req.user._id,
            (err, userFromDb) => {
              if (err) {
                next (err);
                return;
              }
              res.locals.currentUser = userFromDb;
                 console.log(`RESULTS ${restaurantResults}`);
              res.render("index.ejs", {restaurants: restaurantResults});
            }
          );      } else {
        res.render("index");
      }
      });
      // console.log(restaurantsAndStuff);

      // if UserModel.find(
      //   { owner: req.user._id },
      //   (err, restaurantResults) => {
      //     if (err) {
      //       next(err);
      //       return;
      //     }
      //     // console.log(reviewResults);
      //     res.locals.restaurantsAndStuff = restaurantResults;
      //
      //     res.render("review-views/review-list-view.ejs");
      //   }
      // );

      res.render("index");
    }
  );


module.exports = router;
