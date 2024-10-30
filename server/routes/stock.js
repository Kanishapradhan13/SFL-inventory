import express from "express";
import Stock from "../models/stock.model.js";
import Item from "../models/item.model.js";
const router = express.Router();

// POST a new stock
router.post("/add", async (req, res) => {
  try {
    const {
      item_code,
      stock_quantity,
      expires_on,
      purchase_date,
      received_date,
      inspected_by,
      item_id,
      vendor_id,
    } = req.body;

    const stock = new Stock({
      item_code,
      stock_quantity,
      expires_on,
      purchase_date,
      received_date,
      inspected_by,
      item_id,
      vendor_id,
    });
    await stock.save();

    const item = await Item.findById(item_id);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    item.true_count = parseInt(item.true_count) + parseInt(stock_quantity);
    await item.save();

    res.status(201).json(stock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.get("/all-details/:id", async (req, res) => {
  try {
    const stocks = await Stock.find({ item_id: req.params.id })
      .populate("item_id")
      .populate("vendor_id")
      .sort({ expires_on: 1 });
    res.status(200).json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// GET all stocks
router.get("/all", async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a stock by ID
router.get("/:id", getStock, (req, res) => {
  res.json(res.stock);
});

// UPDATE a stock by ID
router.patch("/:id", getStock, async (req, res) => {
  if (req.body.item_code != null) {
    res.stock.item_code = req.body.item_code;
  }
  if (req.body.stock_quantity != null) {
    res.stock.stock_quantity = req.body.stock_quantity;
  }
  if (req.body.expires_on != null) {
    res.stock.expires_on = req.body.expires_on;
  }
  if (req.body.purchase_date != null) {
    res.stock.purchase_date = req.body.purchase_date;
  }
  if (req.body.received_date != null) {
    res.stock.received_date = req.body.received_date;
  }
  if (req.body.expired_date != null) {
    res.stock.expired_date = req.body.expired_date;
  }
  if (req.body.inspected_by != null) {
    res.stock.inspected_by = req.body.inspected_by;
  }
  try {
    const updatedStock = await res.stock.save();
    res.json(updatedStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a stock by ID
router.delete("/:id", getStock, async (req, res) => {
  try {
    await res.stock.remove();
    res.json({ message: "Stock deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware to get a single stock by ID
async function getStock(req, res, next) {
  try {
    const stock = await Stock.findById(req.params.id);
    if (stock == null) {
      return res.status(404).json({ message: "Stock not found" });
    }
    res.stock = stock;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

export default router;
