const mongoose = require("mongoose");

const parkingSchema = new mongoose.Schema({
  id: Number,
  name: String,
  availableSlots: Number,
  occupiedSlots: Number,
  parking_bay_type: {
    type: String,
    enum: ["ev_charging", "accessibility"]
  },
  location: {
    lat: Number,
    lng: Number
  }
});

module.exports = mongoose.model("Parking", parkingSchema);