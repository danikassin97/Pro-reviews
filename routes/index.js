const express = require('express');
const reviewModel = require("../models/restaurant-review-model.js");

const router  = express.Router();

/* GET home page. */
// router.get('/', (req, res, next) => {
//   res.render('index');
// });

router.get("/", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;

      res.render("index");
    }
  );
});

module.exports = router;
