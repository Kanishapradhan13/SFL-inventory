import mongoose from "mongoose";

const stockSchema = new mongoose.Schema({

  item_code: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  expires_on: { type: Date },
  purchase_date: { type: Date },
  received_date: { type: Date },
  inspected_by: { type: String },
    item_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  vendor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Vendor",
    required: true,
  },
  
});

const Stock = mongoose.model("Stock", stockSchema);

export default Stock;
