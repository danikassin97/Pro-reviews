const express = require("express");

const RestaurantModel = require("../models/restaurants-model.js");

const router = express.Router();

const UserModel = require("../models/user-model.js");



router.get("/restaurants/new", (req, res, next) => {

  if (req.user) {
    res.render("restaurant-views/new-restaurant-view.ejs");
  } else {
    res.redirect("/login");
  }
});


const multer = require("multer");
const myUploader = multer({
  dest: __dirname + "/../public/uploads/"
});

router.post("/restaurants",
myUploader.single('restaurantImage'),
(req, res, next) => {
  const theRestaurant = new RestaurantModel({
    name: req.body.restaurantName,
    address: req.body.restaurantAddress,
    city: req.body.restaurantCity,
    state: req.body.restaurantState,
    country: req.body.restaurantCountry,
    price: req.body.restaurantPrice,
    phone: req.body.restaurantPhone,
    reserve_url: req.body.restaurantReservation,
    image_url: "/uploads/" + req.file.filename,
    owner: req.user._id
    ///////////////
  });


  theRestaurant.save((err) => {
    if (err) {
      next(err);
      return;
    }
    // console.log(theReview);

    res.redirect("/restaurants/my-restaurants");
  });
});

// router.get("/restaurants/my-restaurants", (req, res, next) => {
//   if (req.user === undefined ) {
//     res.redirect("/login");
//     return;
//   }
//
//   RestaurantModel.find(
//     { owner: req.user._id },
//     (err, restaurantResults) => {
//       if (err) {
//         next(err);
//         return;
//       }
//       // console.log(reviewResults);
//       console.log(' the restuls' + restaurantResults);
//       res.locals.restaurants = restaurantResults;
//
//       res.render("restaurant-views/restaurant-list-view.ejs");
//     }
//   );
// });


router.get("/restaurants/miami", (req, res, next) => {

  RestaurantModel.find(
    { city: 'Miami' },
    (err, restaurantResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.restaurants = restaurantResults;

      res.render("restaurants/restaurant-list-miami.ejs");
    });
  });


  router.get("/restaurants/newyork", (req, res, next) => {

    RestaurantModel.find(
      { city:"New York" },
      (err, restaurantResults) => {
        if (err) {
          next(err);
          return;
        }
        // console.log(reviewResults);
        res.locals.restaurants = restaurantResults;

        res.render("restaurants/restaurant-list-newyork.ejs");
      });
    });

router.get('/restaurants/my-restaurants' , (req, res, next ) => {
  if (req.user === undefined ) {
      res.redirect("/login");
      return;
    }
        console.log('the id ' + req.user._id);
    RestaurantModel.find({owner:req.user._id}, (err, restaurantResults) => {
      if (err) {
        next(err);
          return;
        }

        console.log('the results' + restaurantResults);
        res.locals.restaurants = restaurantResults;
        res.render("restaurant-views/restaurant-list-view.ejs");
    });
});

// router.get("/restaurants/:myId/details", (req, res, next) => {
//   // products/details?myId=5951744344d30f1783a71271
//   restaurantModel.findById(
//     req.params.myId,
//     (err, restaurantFromDb) => {
//       if (err) {
//         next (err);
//         return;
//       }
//       res.locals.restaurantDetails = restaurantFromDb;
//
//       res.render("restaurant-views/restaurant-details-view.ejs");
//     }
//   );
// });

router.get('/restaurants/:myId', (req, res, next) => {
  console.log('get in here');
//    /products/595174b1e7890a86da4f5f0b
//                       |
//                 req.params.myId

    RestaurantModel.findById(
      req.params.myId,           // 1st argument -> the id to find in the DB
      (err, restaurantFromDb) => {  // 2nd argument -> callback
          if (err) {
            // use next() to skip to the ERROR PAGE
            next(err);
            return;
          }

          res.locals.restaurants = restaurantFromDb;

          res.render('restaurant-views/restaurant-details-view.ejs');

          // Other way of transfering variables to the view:
          //
          // res.render('product-views/product-details-view.ejs', {
          //   productDetails: productFromDb
          // });
      }
    );
});


router.get("/restaurants/:myId/delete", (req, res, next) => {
  RestaurantModel.findByIdAndRemove(
    req.params.myId,

    (err, restaurantFromDb) => {
      if (err) {
        next(err);
        return;
      }
      res.redirect("/restaurants/my-restaurants");
    }
  );
});




module.exports = router;
