const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myReviewSchema = new Schema(
  {
    restaurantName: { type: String,
                      required: true },
    cuisine: { type: String,
               required: true },
    comments: { type: String },
    photoUrl: { type: String,
                required: true
              },
    rating: { type: Number,
              min:0,
              max: 5,
              required: true
            },

    // id of user who owns room
    owner: { type: Schema.Types.ObjectId }
  },

  {
    timestamps: true
  }
);

const ReviewModel = mongoose.model("Review", myReviewSchema);


module.exports = ReviewModel;

// req.locals.bleh = ratings;
//
// <% for (i = 0; i < ratings; i++) { %>
// <img src="start-image.png" style="display: flex; flex-direction: row;">
// <% } %>
