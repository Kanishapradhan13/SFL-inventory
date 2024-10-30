import express from "express";
const router = express.Router();
import Category from "../models/category.model.js";
import Item from "../models/item.model.js";

// Create a new category
router.post("/add", async (req, res) => {
  try {
    const existingCategory = await Category.findOne({
      category_name: req.body.category_name,
    });
    if (existingCategory) {
      return res.status(400).send({ error: "Category name already exists" });
    }

    const category = new Category({
      category_name: req.body.category_name,
      type: req.body.type,
    });
    await category.save();
    res.status(201).send(category);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get all categories
router.get("/all", async (req, res) => {
  try {
    // Fetch all categories
    const categories = await Category.find();

    // Fetch item counts grouped by category_id
    const itemCounts = await Item.aggregate([
      {
        $group: {
          _id: "$category_id",
          count: { $sum: 1 }
        }
      }
    ]);

    // Map the item counts to a dictionary for easy access
    const itemCountMap = itemCounts.reduce((acc, cur) => {
      acc[cur._id] = cur.count;
      return acc;
    }, {});

    // Add the item count to each category
    const categoriesWithItemCount = categories.map(category => ({
      ...category._doc,
      no_of_items: itemCountMap[category._id] || 0
    }));

    res.status(200).send(categoriesWithItemCount);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a category by ID
router.delete("/:id", async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return res.status(404).send();
    }
    res.status(200).send(category);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/get-categorycount", async (req, res) => {
  try {
    const categoryCount = await Category.countDocuments();
    res.status(200).json({ categoryCount });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
export default router;
