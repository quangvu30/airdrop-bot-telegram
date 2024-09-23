const { mongoConnector } = require("../mongo/mongoConnector");
const mongoose = require("mongoose");

// Define the user schema
const userSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  wallet: {
    type: String,
  },
  linkTwitter: {
    type: String,
  },
  referral: {
    type: Number,
    required: true,
    default: 0,
  },
  balance: {
    type: Number,
    required: true,
    default: 0,
  },
  lang: {
    type: String,
    default: "en",
  },
  status: {
    type: String,
    default: "active",
  },
  state: {
    type: String,
  },
});

// Create the user model
const UserModel = mongoConnector.db.model("User", userSchema);

exports.UserModel = UserModel;
