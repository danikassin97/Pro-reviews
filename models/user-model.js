const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const myUserSchema = new Schema(
  {                                   //first argument -> structure object
    fullName: {type: String},
    username: {type: String},
    address: {type: String},
    city: {type: String},
    state: {type: String},
    postal_code: {type: String},


    // SIGN UP/LOG IN FORM users ---------
    encryptedPassword: {type: String },

    // GOOGLE users ----------------------
    googleId: { type: String },

    // FACEBOOK users --------------------
    facebookId: { type: String }

  },

  {                                   //second argument -> additional settings
    timestamps: true
      // timestamps creates two additional fields: "createdAt" & "updatedAt"

  }
);

const UserModel = mongoose.model("User", myUserSchema);



// User -> users -> db.users.find




module.exports = UserModel;
