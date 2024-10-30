import express from "express";
const router = express.Router();
import Bill from "../models/bill.model.js";
import { v2 as cloudinary } from "cloudinary";
import "dotenv/config";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

router.post("/add/:id", async (req, res) => {
  const file = req.files.image;
  cloudinary.uploader.upload(file.tempFilePath, (err, result) => {
    try {
      const image = req.file ? req.file.path : "";
      const vendor_id = req.params.id;

      const bill = new Bill({
        vendor_id: vendor_id,
        image: result.url,
      });
      bill.save();
      res.status(201).json(bill);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
});

router.get("/get/:vendorId", async (req, res) => {
  const vendorId = req.params.vendorId;
  try {
    const bills = await Bill.find({ vendor_id: vendorId });
    res.status(200).json(bills);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  
});

router.delete("/delete/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const deletedBill = await Bill.findByIdAndDelete(id);
    if (!deletedBill) {
      return res.status(404).json({ message: "Bill not found" });
    }
    res.status(200).json({ message: "Bills deleted successfully." });
  } catch (error) {
    console.error("Error deleting bills:", error);
    res.status(500).json({ message: "Internal server error." });
  }
});

export default router;
