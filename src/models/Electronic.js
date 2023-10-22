const mongoose = require("mongoose");

const electronicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required !"],
    minLength: [10, "Name must be at least 10 characters long"],
  },
  type: {
    type: String,
    required: [true, "Type is required !"],
    minLength: [2, "Type must be at least 2 characters long"],
  },
  damages: {
    type: String,
    required: [true, "Damages are required !"],
    minLength: [10, "Damages must be at least 10 characters long"],
  },
  image: {
    type: String,
    required: [true, "Image is required !"],
    match: [/^(http|https):\/\//, "Invalid url"],
  },
  description: {
    type: String,
    required: [true, "Description is required !"],
    minLength: [10, "Description must be at least 10 characters long"],
    maxLength: [200, "Description can't be longer than 200 characters"],
  },
  production: {
    type: Number,
    required: [true, "Production is required !"],
    min: [1900, "Production year must be between 1900 and 2023"],
    max: [2023, "Production year must be between 1900 and 2023"],
  },
  exploitation: {
    type: Number,
    required: [true, "Exploitation is required !"],
    min: [0, "Exploitation must be positive number"],
  },
  price: {
    type: Number,
    required: [true, "Price is required !"],
    min: [0, "Price must be positive number"],
  },
  buyingList: [
    {
      user: {
        type: mongoose.Types.ObjectId,
        required: true,
      },
    },
  ],
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

const Electronic = mongoose.model("Electronic", electronicSchema);

module.exports = Electronic;
