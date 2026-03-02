const express = require("express");
const router = express.Router();
const Parking = require("../models/Parking");

// 🔹 GET all parking
router.get("/", async (req, res) => {
  try {
    const { vehicleType } = req.query;

    const filter = vehicleType ? { vehicleType } : {};

    const parkingSpots = await Parking.find(filter);

    res.json(parkingSpots);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;