import express from "express";
const router = express.Router();
import Vendor from "../models/vendor.model.js";

// Create a new vendor
router.post("/add", async (req, res) => {
  try {
    const existingVendor = await Vendor.findOne({ email: req.body.email });
    if (existingVendor) {
      return res.status(400).send({ error: "Vendor email already exists" });
    }

    const vendor = new Vendor({
      vendor_name: req.body.vendor_name,
      phone_no: req.body.phone_no,
      email: req.body.email,
      status: true,
    });
    await vendor.save();
    res.status(201).send(vendor);
  } catch (err) {
    res.status(500).send(err.msg);
  }
});

// Get all vendors
router.get("/all", async (req, res) => {
  try {
    const vendors = await Vendor.find();
    res.status(200).send(vendors);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Get all vendors with status true
router.get("/all/active", async (req, res) => {
  try {
    const activeVendors = await Vendor.find({ status: true });
    res.status(200).send(activeVendors);
  } catch (err) {
    res.status(500).send(err);
  }
});
/// GET vendor details by vendor ID
router.get("/name/:id", async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    // Return the vendor details
    res.status(200).json({
      vendor_name: vendor.vendor_name,
      phone_no: vendor.phone_no,
      email: vendor.email,
      status: vendor.status,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put("/changestatus/:id", async (req, res) => {
  try {
    const vendorId = req.params.id;
    const vendor = await Vendor.findById(vendorId);

    if (!vendor) {
      return res.status(404).send({ error: "Vendor not found" });
    }

    // Toggle the status
    vendor.status = !vendor.status;

    // Update the status in the database
    await Vendor.updateOne({ _id: vendorId }, { status: vendor.status });

    res.status(200).send(vendor);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

export default router;
