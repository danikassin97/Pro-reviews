const express = require("express");

const restaurantModel = require("../models/restaurants-model.js");

const router = express.Router();

router.get("/restaurants/:myId/details", (req, res, next) => {
  // products/details?myId=5951744344d30f1783a71271
  restaurantModel.findById(
    req.params.myId,
    (err, restaurantFromDb) => {
      if (err) {
        next (err);
        return;
      }
      res.locals.restaurantDetails = restaurantFromDb;

      res.render("restaurant-views/restaurant-details-view.ejs");
    }
  );
});










module.exports = router;
