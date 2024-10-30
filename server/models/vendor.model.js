import mongoose from "mongoose";

const Schema = mongoose.Schema;

const vendorSchema = new Schema({
  vendor_name: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  status: {
    type: Boolean,
    default: true,
  },
});

const Vendor = mongoose.model("Vendor", vendorSchema);

export default Vendor;
