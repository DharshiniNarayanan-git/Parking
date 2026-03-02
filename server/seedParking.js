require("dotenv").config();
const mongoose = require("mongoose");
const Parking = require("./models/Parking");

const parkingData = [
  {
    id: 1,
    name: "Velachery Zone A",
    availableSlots: 15,
    occupiedSlots: 25,
    parking_bay_type: "ev_charging",
    location: { lat: 12.9815, lng: 80.2180 },
  },
  {
    id: 2,
    name: "Guindy Hub",
    availableSlots: 0,
    occupiedSlots: 50,
    parking_bay_type: "accessibility",
    location: { lat: 13.0100, lng: 80.2200 },
  },
  {
    id: 3,
    name: "Adyar Parking",
    availableSlots: 12,
    occupiedSlots: 23,
    parking_bay_type: "ev_charging",
    location: { lat: 13.0012, lng: 80.2565 },
  },
  {
    id: 4,
    name: "Thiruvanmiyur Beach Parking",
    availableSlots: 20,
    occupiedSlots: 25,
    parking_bay_type: "accessibility",
    location: { lat: 12.9830, lng: 80.2590 },
  },
  {
    id: 5,
    name: "Taramani Tech Park Parking",
    availableSlots: 0,
    occupiedSlots: 60,
    parking_bay_type: "ev_charging",
    location: { lat: 12.9875, lng: 80.2430 },
  },
  {
    id: 6,
    name: "Chrompet Main Parking",
    availableSlots: 10,
    occupiedSlots: 20,
    parking_bay_type: "accessibility",
    location: { lat: 12.9516, lng: 80.1406 },
  },
  {
    id: 7,
    name: "Tambaram Central Parking",
    availableSlots: 18,
    occupiedSlots: 32,
    parking_bay_type: "ev_charging",
    location: { lat: 12.9249, lng: 80.1275 },
  },
  {
    id: 8,
    name: "Perungudi Parking",
    availableSlots: 0,
    occupiedSlots: 40,
    parking_bay_type: "accessibility",
    location: { lat: 12.9650, lng: 80.2460 },
  },
  {
    id: 9,
    name: "Sholinganallur Parking",
    availableSlots: 25,
    occupiedSlots: 30,
    parking_bay_type: "ev_charging",
    location: { lat: 12.8995, lng: 80.2270 },
  },
  {
    id: 10,
    name: "Navalur Parking",
    availableSlots: 5,
    occupiedSlots: 30,
    parking_bay_type: "accessibility",
    location: { lat: 12.8455, lng: 80.2265 },
  },
  {
    id: 11,
    name: "Anna Nagar Parking",
    availableSlots: 20,
    occupiedSlots: 40,
    parking_bay_type: "ev_charging",
    location: { lat: 13.0850, lng: 80.2101 },
  },
  {
    id: 12,
    name: "Koyambedu Parking",
    availableSlots: 0,
    occupiedSlots: 70,
    parking_bay_type: "accessibility",
    location: { lat: 13.0690, lng: 80.1940 },
  },
  {
    id: 13,
    name: "Porur Parking",
    availableSlots: 15,
    occupiedSlots: 35,
    parking_bay_type: "ev_charging",
    location: { lat: 13.0350, lng: 80.1565 },
  },
  {
    id: 14,
    name: "Poonamallee Parking",
    availableSlots: 10,
    occupiedSlots: 30,
    parking_bay_type: "accessibility",
    location: { lat: 13.0500, lng: 80.1080 },
  },
  {
    id: 15,
    name: "Avadi Parking",
    availableSlots: 0,
    occupiedSlots: 45,
    parking_bay_type: "ev_charging",
    location: { lat: 13.1143, lng: 80.1010 },
  },
  {
    id: 16,
    name: "Red Hills Parking",
    availableSlots: 12,
    occupiedSlots: 18,
    parking_bay_type: "accessibility",
    location: { lat: 13.1880, lng: 80.1860 },
  },
  {
    id: 17,
    name: "Ambattur Parking",
    availableSlots: 22,
    occupiedSlots: 33,
    parking_bay_type: "ev_charging",
    location: { lat: 13.0980, lng: 80.1620 },
  },
  {
    id: 18,
    name: "Madhavaram Parking",
    availableSlots: 0,
    occupiedSlots: 40,
    parking_bay_type: "accessibility",
    location: { lat: 13.1500, lng: 80.2300 },
  },
  {
    id: 19,
    name: "Royapuram Parking",
    availableSlots: 14,
    occupiedSlots: 21,
    parking_bay_type: "ev_charging",
    location: { lat: 13.1130, lng: 80.2950 },
  },
  {
    id: 20,
    name: "Marina Beach Parking",
    availableSlots: 18,
    occupiedSlots: 42,
    parking_bay_type: "accessibility",
    location: { lat: 13.0500, lng: 80.2820 },
  },
];

mongoose
  .connect(process.env.MONGO_URI)
  .then(async () => {
    console.log("MongoDB connected"); 

    await Parking.deleteMany(); // optional
    await Parking.insertMany(parkingData);

    console.log("Parking data inserted");
    process.exit();
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });