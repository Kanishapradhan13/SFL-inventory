import express from "express";
const router = express.Router();
import Location from "../models/location.model.js";

router.get("/all", async (req, res) => {
  try {
    const locations = await Location.aggregate([
      {
        $lookup: {
          from: "sublocations",
          localField: "_id",
          foreignField: "location_id",
          as: "sublocations",
        },
      },
      {
        $addFields: {
          no_of_sublocations: { $size: "$sublocations" },
        },
      },
      {
        $lookup: {
          from: "items",
          localField: "_id",
          foreignField: "location_id",
          as: "items",
        },
      },
      {
        $addFields: {
          no_of_items: { $size: "$items" },
        },
      },
      {
        $project: {
          sublocations: 0, // exclude sublocations array from the output
          items: 0, // exclude items array from the output
        },
      },
    ]);

    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get("/select/all", async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// GET location name by location ID
router.get("/name/:id", async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (!location) {
      return res.status(404).json({ message: "Location not found" });
    }
    res.status(200).json({ location_name: location.location_name });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new location
router.post("/add", async (req, res) => {
  const location = new Location({
    location_name: req.body.location_name,
    //   no_of_sublocations: req.body.no_of_sublocations,
    //   no_of_items: req.body.no_of_items,
  });

  try {
    const newLocation = await location.save();
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
