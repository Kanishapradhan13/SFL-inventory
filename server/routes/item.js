import express from "express";
const router = express.Router();
import Item from "../models/item.model.js";
import Stock from "../models/stock.model.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


// POST a new item
router.post("/add", async (req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, async (err, result) => {
    try {
      const {
        item_name,
        item_unit,
        model_no,
        low_stock_threshold,
        true_count,
        category_id,
        location_id,
        sublocation_id,
      } = req.body;

      const item = new Item({
        item_name,
        item_unit,
        model_no,
        low_stock_threshold,
        image: result.url,
        true_count,
        category_id,
        location_id,
        sublocation_id,
      });
      await item.save();
      res.status(201).json(item);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

router.get("/all-details", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category_id")
      .populate("location_id")
      .populate("sublocation_id");
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/low-stock", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category_id")
      .populate("location_id")
      .populate("sublocation_id");

    const lowStockItems = items.filter(
      (item) => item.true_count < item.low_stock_threshold
    );

    res.status(200).json(lowStockItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/expired-items", async (req, res) => {
  try {
    const now = new Date();
    const expiredStock = await Stock.find({ expires_on: { $lt: new Date() } });

    // Extract item IDs from expiredStock
    const itemIds = expiredStock.map((stock) => stock.item_id);

    // Find items corresponding to the extracted item IDs
    const items = await Item.find({ _id: { $in: itemIds } })
      .populate("category_id")
      .populate("location_id")
      .populate("sublocation_id");

    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET an AllItem Count

router.get("/get-itemcount", async (req, res) => {
  try {
    const itemCount = await Item.countDocuments();
    res.status(200).json({ itemCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/low-stock-count", async (req, res) => {
  try {
    const items = await Item.find()
      .populate("category_id")
      .populate("location_id")
      .populate("sublocation_id");

    const lowStockItems = items.filter(
      (item) => item.true_count < item.low_stock_threshold
    );
    const itemsCount = lowStockItems.length;
    res.status(200).json(itemsCount);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET an item by ID
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/update/:id', async (req, res) => {
  const { id } = req.params;
  const { item_name, item_unit, model_no, low_stock_threshold } = req.body;

  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(400).json({ message: 'Invalid item ID' });
  // }

  try {
    const updatedItem = await Item.findByIdAndUpdate(
      id,
      {
        item_name,
        item_unit,
        model_no,
        low_stock_threshold,
      },
      { new: true, runValidators: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
