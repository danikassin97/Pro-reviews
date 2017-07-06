const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myRestaurantSchema = new Schema(
{
  name: {type: String},
  address: {type: String},
  city: {type: String},
  state: {type: String},
  country: {type: String},
  phone: {type: Number},
  price: {type: Number, min: 1, max: 4},
  reserve_url: {type: String},
  image_url: {type: String},
}

);


const RestaurantModel = mongoose.model("Restaurant", myRestaurantSchema);
// User -> users -> db.users.find

module.exports = RestaurantModel;
