import express from "express";
const router = express.Router();
import User from "../models/user.model.js";
import Item from "../models/item.model.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/reg", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully", user });
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

router.post("/toggle-favourite/:userId/:itemId", async (req, res) => {
  const { userId, itemId } = req.params;

  try {
    // Check if the item exists
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // Find the user
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the item is already in the user's favourite items
    const isFavourite = user.favourite_items.some(
      (favItemId) => favItemId.toString() === itemId
    );

    if (isFavourite) {
      // Remove the item from the user's favourite items
      user.favourite_items = user.favourite_items.filter(
        (favItemId) => favItemId.toString() !== itemId
      );
      await user.save();
      return res.status(200).json({
        message: "Item removed from favorites",
        favourite_items: user.favourite_items,
      });
    } else {
      // Add the item to the user's favourite items
      user.favourite_items.push(itemId);
      await user.save();
      return res.status(200).json({
        message: "Item added to favorites",
        favourite_items: user.favourite_items,
      });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

router.get("/:userId/favourites", async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID and populate the favourite_items array
    const user = await User.findById(userId).populate("favourite_items");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the favourite items in the response
    res.status(200).json(user.favourite_items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/all", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json("Server Error");
  }
});

router.get("/allAdmin", async (req, res) => {
  try {
    const adminUsers = await User.find({ role: "Admin" });
    res.status(200).json(adminUsers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/allUser", async (req, res) => {
  try {
    const users = await User.find({ role: "User" });
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/allStoreKeeper", async (req, res) => {
  try {
    const storeKeepers = await User.find({ role: "StoreKeeper" });
    res.status(200).json(storeKeepers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/:userId/update-role", async (req, res) => {
  const { userId } = req.params;
  const { role } = req.body;

  try {
    // Find the user by userId
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Update user role
    user.role = role;

    // Save the updated user
    await user.save();

    return res
      .status(200)
      .json({ message: "User role updated successfully", user });
  } catch (error) {
    console.error("Error updating user role:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.post("/:userId/update-user", async (req, res) => {
  const { userId } = req.params;
  const { name, email, phone_no, password, organization } = req.body;
  const file = req.files?.image;

  try {
    let imageUrl = null;
    if (file) {
      const uploadResult = await cloudinary.uploader.upload(file.tempFilePath);
      imageUrl = uploadResult.url;
    }

    // Find and update the user by userId
    const updateData = {
      name: name,
      email: email,
      phone_no: phone_no,
      password: password,
      organization: organization,
    };

    if (imageUrl) {
      updateData.image = imageUrl;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, { new: true });

    if (!user) {
      // If user is not found, return 404 status
      return res.status(404).json({ message: "User not found" });
    }
    // Return the updated user
    return res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    // If any error occurs, log the error and return 500 status
    console.error("Error updating user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.delete("/:userId/delete", async (req, res) => {
  const { userId } = req.params;

  try {
    // Find the user by userId and delete
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res
      .status(200)
      .json({ message: "User deleted successfully", deletedUser });
  } catch (error) {
    console.error("Error deleting user:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
