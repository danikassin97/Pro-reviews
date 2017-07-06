const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/project-2");


const Restaurant = require("../models/restaurants-model.js");

const restaurantInfoArray = [
  {
    name: "The Capital Grille",
    address: "444 Brickell Ave",
    city: "Miami",
    state: "FL",
    country: "US",
    phone: 3053744500,
    price: 4,
    reserve_url: "https://www.opentable.com/the-capital-grille-miami",
    image_url: "/images/capital-grill.png"
  },
  {
    name: "Zuma",
    address: "270 Biscayne Boulevard Way, Epic Hotel",
    city: "Miami",
    state: "FL",
    country: "US",
    phone: 3055770277,
    price: 4,
    reserve_url: "https://www.opentable.com/zuma-japanese-restaurant-miami",
    image_url: "/images/zuma.png"
  },
  {
    name: "Pubbelly",
    address: "701 S Miami Ave",
    city: "Miami",
    state: "FL",
    country: "US",
    phone: 7868995038,
    price: 3,
    reserve_url: "https://www.opentable.com/r/pubbelly-sushi-brickell-miami",
    image_url: "/images/zuma.png"
  },
  {
    name: "Daniel",
    address: "60 E 65th St",
    city: "New York",
    state: "NY",
    country: "US",
    phone: 2122880033,
    price: 4,
    reserve_url: "https://www.opentable.com/r/daniel-new-york",
    image_url: "/images/daniel.png"
  },
  {
    name: "Le Bernadin",
    address: "155 W 51st St",
    city: "New York",
    state: "NY",
    country: "US",
    phone: 2125541515,
    price: 4,
    reserve_url: "https://www.opentable.com/le-bernardin?ref=1068",
    image_url: "/images/bernadin.png"
  },
  {
    name: "J.G. Melon",
    address: "1291 3rd Ave",
    city: "New York",
    state: "NY",
    country: "US",
    phone: 2127440585,
    price: 2,
    reserve_url: "https://www.opentable.com/r/jg-melon-new-york",
    image_url: "/images/jgmelon.png"
  },
];

Restaurant.create(
  restaurantInfoArray,               // first argument --> array of product info objects

  (err, restaurantResults) => {      // second argument --> callback
    if (err) {
      console.log("problem");
      return;
    }
      restaurantResults.forEach((oneResto) => {
        console.log("new restaurant: " + oneResto.name);
      });
    }

);
