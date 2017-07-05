const express = require("express");

const reviewModel = require("../models/restaurant-review-model.js");

const router = express.Router();


router.get("/reviews/new", (req, res, next) => {

  if (req.user) {
    res.render("review-views/new-review-view.ejs");
  } else {
    res.redirect("/login");
  }
});


const multer = require("multer");
const myUploader = multer({
dest: __dirname + "/../public/uploads/"
});

router.post("/reviews",
myUploader.single('restaurantPhoto'),
(req, res, next) => {
  const theReview = new reviewModel({
    restaurantName: req.body.restaurantName,
    cuisine: req.body.restaurantCuisine,
    comments: req.body.restaurantComments,
    photoUrl: "/uploads/" + req.file.filename,
    rating: req.body.restaurantRating,
    owner: req.user._id
    ///////////////
  });


  theReview.save((err) => {
    if (err) {
      next(err);
      return;
    }
    // console.log(theReview);

    res.redirect("/reviews/my-reviews");
  });
});

router.get("/reviews/my-reviews", (req, res, next) => {
  if (req.user === undefined ) {
    res.redirect("/login");
    return;
  }
  reviewModel.find(
    { owner: req.user._id },
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;

      res.render("review-views/review-list-view.ejs");
    }
  );
});


router.get("/reviews/italian", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-italian.ejs");
  });
});

router.get("/reviews/mexican", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-mexican.ejs");
  });
});

router.get("/reviews/indonesian", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-indonesian.ejs");
  });
});

router.get("/reviews/chinese", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-chinese.ejs");
  });
});

router.get("/reviews/spanish", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-spanish.ejs");
  });
});

router.get("/reviews/french", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-french.ejs");
  });
});

router.get("/reviews/japanese", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-japanese.ejs");
  });
});

router.get("/reviews/turkish", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-turkish.ejs");
  });
});

router.get("/reviews/indian", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-indian.ejs");
  });
});

router.get("/reviews/thai", (req, res, next) => {

  reviewModel.find(
    {},
    (err, reviewResults) => {
      if (err) {
        next(err);
        return;
      }
      // console.log(reviewResults);
      res.locals.reviewsAndStuff = reviewResults;
      console.log(reviewResults);

      res.render("cuisines/review-list-thai.ejs");
  });
});

module.exports = router;
